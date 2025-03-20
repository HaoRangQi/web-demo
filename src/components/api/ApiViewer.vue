<template>
  <div class="api-viewer border-l border-gray-200 dark:border-gray-700 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all duration-300" :class="[isCollapsed ? 'w-12' : 'w-96']">
    <!-- 收起/展开按钮 -->
    <div class="absolute top-4 -left-3 z-10">
      <button @click="toggleApiViewer" class="bg-white dark:bg-gray-800 rounded-full p-1 shadow-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path v-if="!isCollapsed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
        </svg>
      </button>
    </div>
    
    <!-- 收起时显示的垂直文字 -->
    <div v-if="isCollapsed" class="h-full flex items-center justify-center">
      <div class="transform rotate-90 whitespace-nowrap text-gray-500 dark:text-gray-400 font-medium">API 查看器</div>
    </div>
    
    <!-- 展开时显示的内容 -->
    <div v-else class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-700 dark:text-gray-200">API 查看器</h2>
      </div>
      
      <!-- API请求构建器 -->
      <div class="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">请求构建器</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">API端点</label>
            <input 
              v-model="apiEndpoint" 
              type="text" 
              class="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
            />
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">模型</label>
            <select 
              v-model="selectedModel" 
              class="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option v-for="model in store.models" :key="model.id" :value="model.apiId">
                {{ model.name }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">消息内容</label>
            <textarea
              v-model="messageContent"
              class="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              rows="3"
              placeholder="输入消息内容..."
            ></textarea>
          </div>
          
          <div class="flex space-x-4">
            <div class="flex-1">
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">温度</label>
              <input 
                v-model="temperature" 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{{ temperature }}</span>
                <span>1</span>
              </div>
            </div>
            
            <div class="flex-1">
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">最大Tokens</label>
              <input 
                v-model="maxTokens" 
                type="number" 
                min="50" 
                max="4000" 
                step="50" 
                class="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          
          <div>
            <button
              @click="generateCurlCommand"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              生成 curl 命令
            </button>
          </div>
        </div>
      </div>
      
      <!-- curl命令 -->
      <div v-if="curlCommand" class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">curl 命令</h3>
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="whitespace-pre-wrap">{{ curlCommand }}</pre>
        </div>
        <button
          @click="copyCurlCommand"
          class="mt-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-sm"
        >
          复制
        </button>
        <button
          @click="executeRequest"
          class="mt-2 ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
        >
          执行请求
        </button>
      </div>
      
      <!-- API响应 -->
      <div v-if="apiResponse" class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">API 响应</h3>
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div v-if="errorMessage" class="mb-6">
        <h3 class="text-lg font-semibold text-red-500 mb-3">错误</h3>
        <div class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg overflow-x-auto">
          <pre class="whitespace-pre-wrap">{{ errorMessage }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModelStore } from '../../stores/model'
import { generateCurlCommand as genCurl, createChatCompletion } from '../../services/api'

const store = useModelStore()
const isCollapsed = ref(true)

// API请求相关状态
const apiEndpoint = ref('http://areyouok.dns.army:55597/v1/chat/completions')
const selectedModel = ref(store.activeModel?.apiId || 'deepclaude')
const messageContent = ref('你好，介绍一下自己，10字')
const temperature = ref(0.7)
const maxTokens = ref(1000)
const curlCommand = ref('')
const apiResponse = ref(null)
const errorMessage = ref('')

// 切换API查看器
function toggleApiViewer() {
  isCollapsed.value = !isCollapsed.value
}

// 生成curl命令
function generateCurlCommand() {
  const data = {
    model: selectedModel.value,
    messages: [
      { role: 'user', content: messageContent.value }
    ],
    temperature: parseFloat(temperature.value.toString()),
    max_tokens: parseInt(maxTokens.value.toString())
  }
  
  curlCommand.value = genCurl(apiEndpoint.value, data)
}

// 复制curl命令
function copyCurlCommand() {
  navigator.clipboard.writeText(curlCommand.value)
    .then(() => {
      alert('已复制到剪贴板')
    })
    .catch(err => {
      console.error('复制失败:', err)
      alert('复制失败')
    })
}

// 执行API请求
async function executeRequest() {
  try {
    errorMessage.value = ''
    apiResponse.value = null
    
    const response = await createChatCompletion({
      model: selectedModel.value,
      messages: [{ role: 'user', content: messageContent.value }],
      temperature: parseFloat(temperature.value.toString()),
      max_tokens: parseInt(maxTokens.value.toString())
    })
    
    apiResponse.value = response
  } catch (error) {
    console.error('API请求失败:', error)
    errorMessage.value = error.message || '请求失败，请检查API端点和参数'
  }
}
</script>

<style scoped>
.api-viewer {
  position: relative;
  transition: all 0.3s ease;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}
</style> 