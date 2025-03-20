<template>
  <div class="analysis-page bg-white dark:bg-gray-800 h-full overflow-auto p-4">
    <div class="max-w-4xl mx-auto py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">快速分析</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">使用AI助力，高效分析数据并获取洞察</p>
      </div>
      
      <div class="mb-12">
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">上传数据</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">选择一个数据文件进行分析，支持CSV、Excel、JSON等格式</p>
          
          <div class="mb-8">
            <div class="file-upload-area border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-gray-600 dark:text-gray-400 mb-2">拖拽文件到此处或</p>
              <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                选择文件
              </button>
              <input type="file" class="hidden" @change="handleFileUpload" accept=".csv,.xlsx,.json,.txt" />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">最大文件大小: 10MB</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">数据概览</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">上传数据后，这里将显示数据的基本信息</p>
          <div class="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-600 rounded-lg">
            <p class="text-gray-500 dark:text-gray-400">暂无数据</p>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">分析选项</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">选择您需要的分析类型</p>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <input type="checkbox" id="basic-stats" class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <label for="basic-stats" class="ml-2 text-gray-700 dark:text-gray-300">基础统计分析</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="correlation" class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <label for="correlation" class="ml-2 text-gray-700 dark:text-gray-300">相关性分析</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="trends" class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <label for="trends" class="ml-2 text-gray-700 dark:text-gray-300">趋势分析</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="visualization" class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <label for="visualization" class="ml-2 text-gray-700 dark:text-gray-300">数据可视化</label>
            </div>
          </div>
          
          <button class="w-full mt-6 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            开始分析
          </button>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-6 mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">常用分析模板</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">选择一个预设模板，快速开始分析</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="template-card">
            <div class="icon-wrapper">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
            </div>
            <h4 class="font-bold">销售数据分析</h4>
            <p class="text-sm">分析销售趋势、产品表现和客户行为</p>
          </div>
          
          <div class="template-card">
            <div class="icon-wrapper">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="font-bold">网站流量分析</h4>
            <p class="text-sm">分析访问来源、用户行为和转化率</p>
          </div>
          
          <div class="template-card">
            <div class="icon-wrapper">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h4 class="font-bold">财务报表分析</h4>
            <p class="text-sm">分析收入、支出和财务健康状况</p>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4">正在开发更多高级分析功能，敬请期待！</p>
        <button class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          提供反馈
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 上传的文件
const uploadedFile = ref<File | null>(null);

// 处理文件上传
function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    uploadedFile.value = input.files[0];
    console.log('文件已上传:', uploadedFile.value.name);
    // 这里可以添加文件处理逻辑
  }
}
</script>

<style scoped>
.file-upload-area {
  transition: all 0.3s ease;
}

.file-upload-area:hover {
  background-color: rgba(59, 130, 246, 0.05);
}

.template-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.dark .template-card {
  background-color: #374151;
  color: #e5e7eb;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  color: #6366f1;
}

.dark .icon-wrapper {
  background-color: #4b5563;
  color: #a5b4fc;
}
</style> 