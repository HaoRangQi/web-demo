import axios from 'axios';
import { 
  logApiRequest, 
  logApiResponse, 
  logApiError, 
  logApiRetry 
} from '../utils/logger';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  thinking?: boolean;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      thinking?: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role?: string;
      content?: string;
      thinking?: string;
    };
    finish_reason: string | null;
  }[];
}

const API_BASE_URL = 'http://youok.dns.army:5597/v1';


// 提取用于记录和监控的模型名称
function getModelDisplayName(modelId: string): string {
  const modelMap: Record<string, string> = {
    'deepseek-r1': 'DeepSeek R1',
    'claude': 'Claude',
    'deepclaude': 'DeepClaude'
  };
  
  // 尝试按精确匹配查找
  if (modelId in modelMap) {
    return modelMap[modelId];
  }
  
  // 尝试按子字符串匹配
  for (const [key, name] of Object.entries(modelMap)) {
    if (modelId.includes(key)) {
      return name;
    }
  }
  
  // 默认返回原始ID
  return modelId;
}

// 分析思考过程格式，提取有效内容
function analyzeThinkingFormat(modelId: string, thinking?: string): {formatted: string, format: string} {
  if (!thinking) {
    return { formatted: '', format: 'none' };
  }
  
  // 检查是否包含<思考过程>标签
  if (thinking.includes('<思考过程>') && thinking.includes('</思考过程>')) {
    const match = thinking.match(/<思考过程>(.*?)<\/思考过程>/s);
    if (match && match[1]) {
      return { 
        formatted: match[1].trim(),
        format: 'tagged'
      };
    }
  }
  
  // 如果没有特殊标记，返回原始内容
  return {
    formatted: thinking,
    format: 'plain'
  };
}

// 安全地获取消息内容
function getMessageContent(message: Message | undefined): string {
  return message?.content || '';
}

// 安全地获取思考过程内容
function getThinkingContent(message: { thinking?: string } | undefined): string {
  return message?.thinking || '';
}

// 重试配置
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 5000
};

// 计算重试延迟时间
function calculateRetryDelay(retryCount: number): number {
  const delay = Math.min(
    RETRY_CONFIG.baseDelay * Math.pow(2, retryCount),
    RETRY_CONFIG.maxDelay
  );
  return delay + Math.random() * 1000; // 添加随机抖动
}

// 处理SSE流响应
async function handleSSEResponse(
  response: any,
  onChunk: (chunk: string) => void
): Promise<ChatCompletionResponse> {
  let collectedResponse: ChatCompletionResponse = {
    id: '',
    object: 'chat.completion',
    created: Date.now(),
    model: '',
    choices: [{
      index: 0,
      message: {
        role: 'assistant',
        content: '',
        thinking: ''
      },
      finish_reason: 'stop'
    }],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0
    }
  };

  return new Promise((resolve, reject) => {
    let buffer = '';
    
    // 监听数据流
    response.data.on('data', (chunk: Uint8Array) => {
      // 将Uint8Array转换为字符串
      buffer += new TextDecoder().decode(chunk);
      
      // 处理所有完整的数据行
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            // 流结束
            continue;
          }
          
          try {
            const chunk: StreamChunk = JSON.parse(data);
            
            // 设置ID和模型
            if (!collectedResponse.id && chunk.id) {
              collectedResponse.id = chunk.id;
            }
            
            if (!collectedResponse.model && chunk.model) {
              collectedResponse.model = chunk.model;
            }
            
            // 处理每个delta
            const delta = chunk.choices[0]?.delta;
            if (delta) {
              if (delta.role) {
                collectedResponse.choices[0].message.role = delta.role;
              }
              
              if (delta.content) {
                collectedResponse.choices[0].message.content += delta.content;
                onChunk(delta.content);
              }
              
              if (delta.thinking) {
                collectedResponse.choices[0].message.thinking += delta.thinking;
                onChunk(delta.thinking);
              }
            }
            
            // 检查是否流结束
            if (chunk.choices[0]?.finish_reason) {
              collectedResponse.choices[0].finish_reason = chunk.choices[0].finish_reason;
            }
            
          } catch (e) {
            console.error('解析流数据时出错:', e, '原始数据:', data);
            reject(e);
          }
        }
      }
    });
    
    // 监听错误
    response.data.on('error', (error: Error) => {
      console.error('流处理错误:', error);
      reject(error);
    });
    
    // 监听结束
    response.data.on('end', () => {
      resolve(collectedResponse);
    });
  });
}

export async function createChatCompletion(
  request: ChatCompletionRequest,
  onStream?: (chunk: string) => void
): Promise<ChatCompletionResponse> {
  let retryCount = 0;
  
  while (retryCount <= RETRY_CONFIG.maxRetries) {
    try {
      // 获取可读的模型名称
      const modelName = getModelDisplayName(request.model);
      logApiRequest(request.model, modelName, '开始请求', { 
        messageCount: request.messages.length,
        thinking: request.thinking,
        temperature: request.temperature,
        max_tokens: request.max_tokens,
        stream: request.stream
      });
      
      // 确保请求格式正确
      const requestWithDefaults = {
        ...request,
        thinking: request.thinking !== undefined ? request.thinking : true,
        stream: request.stream || (onStream !== undefined) // 如果提供了onStream回调，则强制使用流式输出
      };
      
      // 移除可能导致问题的空消息
      requestWithDefaults.messages = requestWithDefaults.messages.filter(
        msg => msg.content.trim() !== ''
      );
      
      // 确保至少有一条消息
      if (requestWithDefaults.messages.length === 0) {
        throw new Error('消息列表不能为空');
      }
      
      // 获取最后一条用户消息
      const lastUserMessage = requestWithDefaults.messages
        .filter(m => m.role === 'user')
        .pop();
      
      // 记录最后一条用户消息
      if (lastUserMessage) {
        const contentPreview = getMessageContent(lastUserMessage).substring(0, 50) + 
          (getMessageContent(lastUserMessage).length > 50 ? '...' : '');
        logApiRequest(request.model, modelName, `最后一条用户消息: "${contentPreview}"`, null);
      }
      
      // 记录请求开始时间
      const startTime = performance.now();
      
      let response;
      if (requestWithDefaults.stream && onStream) {
        // 流式请求
        logApiRequest(request.model, modelName, '使用流式输出', null);
        
        // 使用fetch代替axios来处理流式响应
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
        
        const fetchResponse = await fetch(`${API_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
          },
          body: JSON.stringify(requestWithDefaults),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!fetchResponse.ok) {
          throw new Error(`API请求失败: ${fetchResponse.status} ${fetchResponse.statusText}`);
        }
        
        if (!fetchResponse.body) {
          throw new Error('响应没有可读流');
        }
        
        // 处理流式响应
        return await processStreamResponse(fetchResponse.body, onStream);
      } else {
        // 非流式请求
        response = await axios.post(`${API_BASE_URL}/chat/completions`, requestWithDefaults, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      
      // 计算请求耗时
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      // 记录请求完成
      logApiResponse(request.model, modelName, `请求完成，耗时: ${duration}ms`, null);
      
      // 返回响应数据
      return response.data;
    } catch (error) {
      const modelName = getModelDisplayName(request.model);
      logApiError(
        request.model, 
        modelName, 
        `请求失败 (尝试 ${retryCount + 1}/${RETRY_CONFIG.maxRetries + 1})`, 
        error
      );
      
      // 如果是最后一次尝试，抛出错误
      if (retryCount === RETRY_CONFIG.maxRetries) {
        throw error;
      }
      
      // 计算重试延迟
      const delay = calculateRetryDelay(retryCount);
      logApiRetry(request.model, modelName, `等待 ${delay}ms 后重试`, null);
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, delay));
      retryCount++;
    }
  }
  
  throw new Error('达到最大重试次数');
}

// 使用原生fetch API处理流式响应
async function processStreamResponse(
  stream: ReadableStream<Uint8Array>,
  onChunk: (chunk: string) => void
): Promise<ChatCompletionResponse> {
  let collectedResponse: ChatCompletionResponse = {
    id: '',
    object: 'chat.completion',
    created: Date.now(),
    model: '',
    choices: [{
      index: 0,
      message: {
        role: 'assistant',
        content: '',
        thinking: ''
      },
      finish_reason: 'stop'
    }],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0
    }
  };

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }
      
      // 解码数据块
      buffer += decoder.decode(value, { stream: true });
      
      // 处理所有完整的数据行
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            continue;
          }
          
          try {
            const chunk: StreamChunk = JSON.parse(data);
            
            // 设置ID和模型
            if (!collectedResponse.id && chunk.id) {
              collectedResponse.id = chunk.id;
            }
            
            if (!collectedResponse.model && chunk.model) {
              collectedResponse.model = chunk.model;
            }
            
            // 处理每个delta
            const delta = chunk.choices[0]?.delta;
            if (delta) {
              if (delta.role) {
                collectedResponse.choices[0].message.role = delta.role;
              }
              
              if (delta.content) {
                collectedResponse.choices[0].message.content += delta.content;
                onChunk(delta.content);
                console.log('流数据片段:', delta.content);
              }
              
              if (delta.thinking) {
                collectedResponse.choices[0].message.thinking += delta.thinking;
                onChunk(delta.thinking);
                console.log('思考过程片段:', delta.thinking);
              }
            }
            
            // 检查是否流结束
            if (chunk.choices[0]?.finish_reason) {
              collectedResponse.choices[0].finish_reason = chunk.choices[0].finish_reason;
            }
            
          } catch (e) {
            console.error('解析流数据时出错:', e, '原始数据:', data);
          }
        }
      }
    }
    
    // 确保解码任何剩余数据
    buffer += decoder.decode();
    
    return collectedResponse;
  } catch (error) {
    console.error('处理流响应时出错:', error);
    throw error;
  } finally {
    reader.releaseLock();
  }
}

// 生成curl命令用于调试
export function generateCurlCommand(endpoint: string, data: any): string {
  const headers = "Content-Type: application/json";
  const jsonData = JSON.stringify(data, null, 2);
  
  return `curl ${endpoint} \\
  -H "${headers}" \\
  -d '${jsonData}'`;
} 