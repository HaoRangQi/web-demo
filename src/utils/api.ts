import axios from 'axios'
import { ChatMessage } from '../stores/model'

interface ChatCompletionRequest {
  model: string
  messages: { role: string, content: string }[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
}

interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// 创建一个带请求拦截器的axios实例
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

// 处理API请求
export const sendChatRequest = async (
  endpoint: string,
  model: string,
  messages: { role: string, content: string }[],
  temperature: number = 0.7,
  maxTokens: number = 1000,
  stream: boolean = false,
  onChunk?: (chunk: any) => void
) => {
  const requestData: ChatCompletionRequest = {
    model,
    messages,
    temperature,
    max_tokens: maxTokens
  }
  
  // 创建标准请求记录
  const requestLog = {
    timestamp: Date.now(),
    endpoint,
    data: requestData,
    curl: generateCurlCommand(endpoint, requestData)
  }
  
  // 非流式请求
  if (!stream) {
    const response = await apiClient.post<ChatCompletionResponse>(endpoint, requestData)
    
    return {
      request: requestLog,
      response: {
        timestamp: Date.now(),
        data: response.data,
        status: response.status
      }
    }
  }
  
  // 流式请求处理
  requestData.stream = true
  
  return new Promise((resolve, reject) => {
    let responseLog = {
      timestamp: Date.now(),
      chunks: [] as any[],
      status: 0,
      fullContent: '',
      thinking: ''
    }
    
    apiClient.post(endpoint, requestData, {
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        const responseText = progressEvent.event.target?.response || ''
        const chunks = responseText
          .split('\n')
          .filter(line => line.trim().startsWith('data:') && line.trim() !== 'data: [DONE]')
          .map(line => {
            try {
              return JSON.parse(line.substring(5).trim())
            } catch (e) {
              return null
            }
          })
          .filter(Boolean)
        
        // 更新响应日志
        responseLog.chunks = chunks
        
        // 处理每个数据块
        if (chunks.length > 0 && onChunk) {
          const lastChunk = chunks[chunks.length - 1]
          
          // 提取思考过程和内容
          if (lastChunk.choices && lastChunk.choices[0].delta.content) {
            const content = lastChunk.choices[0].delta.content
            
            // 检测是否包含思考过程标记
            if (content.includes('<思考过程>')) {
              const thinkingMatches = content.match(/<思考过程>([\s\S]*?)<\/思考过程>/m)
              if (thinkingMatches && thinkingMatches[1]) {
                responseLog.thinking += thinkingMatches[1]
              }
              
              // 从显示内容中移除思考过程标记
              const cleanContent = content.replace(/<思考过程>[\s\S]*?<\/思考过程>/m, '')
              responseLog.fullContent += cleanContent
            } else {
              responseLog.fullContent += content
            }
          }
          
          onChunk(lastChunk)
        }
      }
    })
    .then(response => {
      responseLog.status = response.status
      resolve({
        request: requestLog,
        response: responseLog
      })
    })
    .catch(error => {
      reject(error)
    })
  })
}

// 生成用于展示的curl命令
export const generateCurlCommand = (endpoint: string, data: any): string => {
  const dataString = JSON.stringify(data, null, 2)
  return `curl ${endpoint} \\
  -H "Content-Type: application/json" \\
  -d '${dataString}'`
}

// 将聊天记录转换为API请求格式
export const formatMessagesForApi = (messages: ChatMessage[]): { role: string, content: string }[] => {
  return messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }))
} 