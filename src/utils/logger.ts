/**
 * 简单的日志服务
 * 用于记录和分析API请求和响应
 */

// 验证模块加载
console.log('[Logger] 日志服务模块已加载');

// 日志类型
export enum LogType {
  ApiRequest = 'API_REQUEST',
  ApiResponse = 'API_RESPONSE',
  ApiError = 'API_ERROR',
  ApiRetry = 'API_RETRY'
}

// 日志级别
export enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR'
}

// 日志条目接口
export interface LogEntry {
  timestamp: number;
  type: LogType;
  level: LogLevel;
  modelId?: string;
  modelName?: string;
  message: string;
  data?: any;
}

// 简单的内存存储
const logs: LogEntry[] = [];
const MAX_LOGS = 1000; // 最多保存1000条日志

// 添加日志
export function addLog(entry: Omit<LogEntry, 'timestamp'>): void {
  const logEntry: LogEntry = {
    timestamp: Date.now(),
    ...entry
  };
  
  // 添加到内存
  logs.unshift(logEntry); // 新日志在前面
  
  // 保持日志数量不超过最大值
  if (logs.length > MAX_LOGS) {
    logs.length = MAX_LOGS;
  }
  
  // 同时输出到控制台
  const timeStr = new Date(logEntry.timestamp).toISOString();
  const modelInfo = logEntry.modelName ? `[${logEntry.modelName}] ` : '';
  
  console.log(`[${timeStr}] [${logEntry.level}] [${logEntry.type}] ${modelInfo}${logEntry.message}`);
  
  // 如果有数据，以较小的格式打印
  if (logEntry.data) {
    const compactData = typeof logEntry.data === 'object' 
      ? JSON.stringify(logEntry.data).substring(0, 500) + (JSON.stringify(logEntry.data).length > 500 ? '...' : '')
      : logEntry.data;
    console.log(`  Data: ${compactData}`);
  }
  
  // 如果是错误，打印堆栈
  if (logEntry.level === LogLevel.Error && logEntry.data instanceof Error) {
    console.error(logEntry.data);
  }
}

// 记录API请求
export function logApiRequest(modelId: string, modelName: string, message: string, data?: any): void {
  addLog({
    type: LogType.ApiRequest,
    level: LogLevel.Info,
    modelId,
    modelName,
    message,
    data
  });
}

// 记录API响应
export function logApiResponse(modelId: string, modelName: string, message: string, data?: any): void {
  addLog({
    type: LogType.ApiResponse,
    level: LogLevel.Info,
    modelId,
    modelName,
    message,
    data
  });
}

// 记录API错误
export function logApiError(modelId: string, modelName: string, message: string, error?: any): void {
  addLog({
    type: LogType.ApiError,
    level: LogLevel.Error,
    modelId,
    modelName,
    message,
    data: error
  });
}

// 记录API重试
export function logApiRetry(modelId: string, modelName: string, message: string, data?: any): void {
  addLog({
    type: LogType.ApiRetry,
    level: LogLevel.Warn,
    modelId,
    modelName,
    message,
    data
  });
}

// 获取所有日志
export function getLogs(): LogEntry[] {
  return [...logs];
}

// 获取特定模型的日志
export function getModelLogs(modelId: string): LogEntry[] {
  return logs.filter(log => log.modelId === modelId);
}

// 分析API调用情况
export function analyzeApiCalls(): Record<string, any> {
  // 基本统计信息
  const stats: Record<string, any> = {
    totalRequests: 0,
    totalResponses: 0,
    totalErrors: 0,
    totalRetries: 0,
    averageResponseTime: 0,
    modelStats: {}
  };
  
  // 请求-响应映射（用于计算响应时间）
  const requestTimestamps: Record<string, number> = {};
  let totalResponseTime = 0;
  let responseCount = 0;
  
  // 分析日志
  logs.forEach(log => {
    switch (log.type) {
      case LogType.ApiRequest:
        stats.totalRequests++;
        // 记录请求时间戳，用于计算响应时间
        if (log.modelId) {
          requestTimestamps[log.modelId + '-' + log.timestamp] = log.timestamp;
        }
        break;
      case LogType.ApiResponse:
        stats.totalResponses++;
        // 查找对应的请求，计算响应时间
        if (log.modelId) {
          // 简单查找最近的请求（不是完全准确，但足够用于统计）
          const recentRequests = Object.entries(requestTimestamps)
            .filter(([key]) => key.startsWith(log.modelId + '-'))
            .sort(([, a], [, b]) => b - a);
            
          if (recentRequests.length > 0) {
            const [key, requestTime] = recentRequests[0];
            const responseTime = log.timestamp - requestTime;
            totalResponseTime += responseTime;
            responseCount++;
            // 移除已匹配的请求
            delete requestTimestamps[key];
          }
        }
        break;
      case LogType.ApiError:
        stats.totalErrors++;
        break;
      case LogType.ApiRetry:
        stats.totalRetries++;
        break;
    }
    
    // 按模型统计
    if (log.modelId) {
      if (!stats.modelStats[log.modelId]) {
        stats.modelStats[log.modelId] = {
          modelName: log.modelName || log.modelId,
          requests: 0,
          responses: 0,
          errors: 0,
          retries: 0
        };
      }
      
      switch (log.type) {
        case LogType.ApiRequest:
          stats.modelStats[log.modelId].requests++;
          break;
        case LogType.ApiResponse:
          stats.modelStats[log.modelId].responses++;
          break;
        case LogType.ApiError:
          stats.modelStats[log.modelId].errors++;
          break;
        case LogType.ApiRetry:
          stats.modelStats[log.modelId].retries++;
          break;
      }
    }
  });
  
  // 计算平均响应时间
  if (responseCount > 0) {
    stats.averageResponseTime = Math.round(totalResponseTime / responseCount);
  }
  
  return stats;
}

// 导出日志为JSON字符串
export function exportLogs(): string {
  return JSON.stringify(logs, null, 2);
}

// 清除所有日志
export function clearLogs(): void {
  logs.length = 0;
}

// 创建简单的日志分析报告
export function generateReport(): string {
  const stats = analyzeApiCalls();
  const now = new Date().toISOString();
  
  let report = `# API调用分析报告 (${now})\n\n`;
  
  report += `## 总体统计\n`;
  report += `- 总请求数: ${stats.totalRequests}\n`;
  report += `- 总响应数: ${stats.totalResponses}\n`;
  report += `- 总错误数: ${stats.totalErrors}\n`;
  report += `- 总重试数: ${stats.totalRetries}\n`;
  report += `- 平均响应时间: ${stats.averageResponseTime}ms\n\n`;
  
  report += `## 模型统计\n`;
  Object.values(stats.modelStats).forEach((modelStat: any) => {
    report += `### ${modelStat.modelName}\n`;
    report += `- 请求数: ${modelStat.requests}\n`;
    report += `- 响应数: ${modelStat.responses}\n`;
    report += `- 错误数: ${modelStat.errors}\n`;
    report += `- 重试数: ${modelStat.retries}\n`;
    
    // 计算成功率
    const successRate = modelStat.responses > 0 
      ? Math.round((modelStat.responses / modelStat.requests) * 100) 
      : 0;
    report += `- 成功率: ${successRate}%\n\n`;
  });
  
  return report;
}

// 获取日志数量统计 
export function getLogsCount(): number {
  return logs.length;
} 