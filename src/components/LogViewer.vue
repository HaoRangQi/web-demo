<template>
  <div class="log-viewer">
    <div class="log-header">
      <h2>API日志监控</h2>
      <div class="log-controls">
        <button @click="loadLogs" class="refresh-button">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          刷新
        </button>
        <button @click="clearLogs" class="clear-button">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"></path>
          </svg>
          清除
        </button>
        <button @click="exportLogsToFile" class="export-button">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          导出
        </button>
      </div>
    </div>
    
    <div class="log-filters">
      <div class="filter-group">
        <label>模型：</label>
        <select v-model="selectedModel" @change="filterLogs">
          <option value="">所有模型</option>
          <option v-for="model in models" :key="model" :value="model">
            {{ model }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>类型：</label>
        <select v-model="selectedType" @change="filterLogs">
          <option value="">所有类型</option>
          <option value="API_REQUEST">请求</option>
          <option value="API_RESPONSE">响应</option>
          <option value="API_ERROR">错误</option>
          <option value="API_RETRY">重试</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>级别：</label>
        <select v-model="selectedLevel" @change="filterLogs">
          <option value="">所有级别</option>
          <option value="INFO">信息</option>
          <option value="WARN">警告</option>
          <option value="ERROR">错误</option>
          <option value="DEBUG">调试</option>
        </select>
      </div>
    </div>
    
    <div class="log-summary">
      <div class="summary-item">
        <span class="summary-label">总请求数：</span>
        <span class="summary-value">{{ stats.totalRequests }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">总响应数：</span>
        <span class="summary-value">{{ stats.totalResponses }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">总错误数：</span>
        <span class="summary-value">{{ stats.totalErrors }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">平均响应时间：</span>
        <span class="summary-value">{{ stats.averageResponseTime }}ms</span>
      </div>
    </div>
    
    <div class="log-table-wrapper">
      <table class="log-table">
        <thead>
          <tr>
            <th>时间</th>
            <th>类型</th>
            <th>级别</th>
            <th>模型</th>
            <th>消息</th>
            <th>详情</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in filteredLogs" :key="index" :class="getLogClass(log)">
            <td>{{ formatTime(log.timestamp) }}</td>
            <td>{{ formatType(log.type) }}</td>
            <td>{{ formatLevel(log.level) }}</td>
            <td>{{ log.modelName || log.modelId || '-' }}</td>
            <td>{{ log.message }}</td>
            <td>
              <button 
                v-if="log.data" 
                @click="toggleDetails(index)" 
                class="details-button"
              >
                {{ expandedDetails === index ? '收起' : '详情' }}
              </button>
            </td>
          </tr>
          <tr v-if="expandedDetails !== null && filteredLogs[expandedDetails]?.data">
            <td colspan="6" class="log-details">
              <pre>{{ formatData(filteredLogs[expandedDetails].data) }}</pre>
            </td>
          </tr>
          <tr v-if="filteredLogs.length === 0">
            <td colspan="6" class="no-logs">暂无日志</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="showReport" class="log-report">
      <div class="report-header">
        <h3>日志分析报告</h3>
        <button @click="showReport = false" class="close-button">关闭</button>
      </div>
      <div class="report-content">
        <pre>{{ report }}</pre>
      </div>
    </div>
    
    <div class="log-footer">
      <button @click="generateAndShowReport" class="generate-report-button">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        生成报告
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  getLogs, 
  clearLogs as clearAllLogs, 
  generateReport as generateLogReport, 
  analyzeApiCalls, 
  exportLogs,
  LogType,
  LogLevel,
  LogEntry
} from '../utils/logger';

// 状态
const logs = ref<LogEntry[]>([]);
const selectedModel = ref('');
const selectedType = ref('');
const selectedLevel = ref('');
const expandedDetails = ref<number | null>(null);
const showReport = ref(false);
const report = ref('');
const stats = ref({
  totalRequests: 0,
  totalResponses: 0,
  totalErrors: 0,
  totalRetries: 0,
  averageResponseTime: 0,
});

// 计算属性
const models = computed(() => {
  const modelSet = new Set<string>();
  logs.value.forEach(log => {
    if (log.modelName) modelSet.add(log.modelName);
    else if (log.modelId) modelSet.add(log.modelId);
  });
  return Array.from(modelSet);
});

const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    let matches = true;
    
    if (selectedModel.value && log.modelName !== selectedModel.value && log.modelId !== selectedModel.value) {
      matches = false;
    }
    
    if (selectedType.value && log.type !== selectedType.value) {
      matches = false;
    }
    
    if (selectedLevel.value && log.level !== selectedLevel.value) {
      matches = false;
    }
    
    return matches;
  });
});

// 方法
const loadLogs = () => {
  logs.value = getLogs();
  updateStats();
};

const clearLogs = () => {
  clearAllLogs();
  logs.value = [];
  expandedDetails.value = null;
  updateStats();
};

const updateStats = () => {
  const apiStats = analyzeApiCalls();
  stats.value = {
    totalRequests: apiStats.totalRequests,
    totalResponses: apiStats.totalResponses,
    totalErrors: apiStats.totalErrors,
    totalRetries: apiStats.totalRetries,
    averageResponseTime: apiStats.averageResponseTime,
  };
};

const filterLogs = () => {
  expandedDetails.value = null;
};

const toggleDetails = (index: number) => {
  expandedDetails.value = expandedDetails.value === index ? null : index;
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString();
};

const formatType = (type: LogType) => {
  switch (type) {
    case LogType.ApiRequest: return '请求';
    case LogType.ApiResponse: return '响应';
    case LogType.ApiError: return '错误';
    case LogType.ApiRetry: return '重试';
    default: return type;
  }
};

const formatLevel = (level: LogLevel) => {
  switch (level) {
    case LogLevel.Info: return '信息';
    case LogLevel.Warn: return '警告';
    case LogLevel.Error: return '错误';
    case LogLevel.Debug: return '调试';
    default: return level;
  }
};

const formatData = (data: any) => {
  if (data instanceof Error) {
    return data.message + (data.stack ? `\n${data.stack}` : '');
  }
  
  try {
    return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  } catch (e) {
    return String(data);
  }
};

const getLogClass = (log: LogEntry) => {
  switch (log.level) {
    case LogLevel.Error: return 'log-error';
    case LogLevel.Warn: return 'log-warn';
    case LogLevel.Info: return 'log-info';
    case LogLevel.Debug: return 'log-debug';
    default: return '';
  }
};

const exportLogsToFile = () => {
  const data = exportLogs();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  
  a.href = url;
  a.download = `api-logs-${timestamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const generateAndShowReport = () => {
  report.value = generateLogReport();
  showReport.value = true;
};

// 生命周期
onMounted(() => {
  loadLogs();
});
</script>

<style scoped>
.log-viewer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  color: var(--text-color);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.log-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.log-controls {
  display: flex;
  gap: 0.5rem;
}

.log-controls button {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-button {
  background: var(--primary-color);
  color: white;
}

.refresh-button:hover {
  background: var(--primary-color-dark);
}

.clear-button {
  background: var(--danger-color);
  color: white;
}

.clear-button:hover {
  background: var(--danger-color-dark);
}

.export-button {
  background: var(--success-color);
  color: white;
}

.export-button:hover {
  background: var(--success-color-dark);
}

.log-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-color-secondary);
  border-radius: 4px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.9rem;
  white-space: nowrap;
}

.filter-group select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.9rem;
}

.log-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-color-secondary);
  border-radius: 4px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.summary-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
}

.log-table-wrapper {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.log-table {
  width: 100%;
  border-collapse: collapse;
}

.log-table th,
.log-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
}

.log-table th {
  position: sticky;
  top: 0;
  background: var(--bg-color-secondary);
  font-weight: 600;
  z-index: 1;
}

.log-info {
  background: transparent;
}

.log-error {
  background: rgba(255, 0, 0, 0.05);
}

.log-warn {
  background: rgba(255, 165, 0, 0.05);
}

.log-debug {
  background: rgba(0, 0, 255, 0.05);
}

.log-details {
  background: var(--bg-color-secondary);
  white-space: pre-wrap;
  word-break: break-word;
}

.log-details pre {
  margin: 0;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.details-button {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: transparent;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-button:hover {
  background: var(--bg-color-secondary);
}

.no-logs {
  text-align: center;
  color: var(--text-color-secondary);
  padding: 2rem;
}

.log-footer {
  display: flex;
  justify-content: flex-end;
}

.generate-report-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.generate-report-button:hover {
  background: var(--primary-color-dark);
}

.log-report {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.report-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.close-button {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: transparent;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: var(--bg-color-secondary);
}

.report-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.report-content pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style> 