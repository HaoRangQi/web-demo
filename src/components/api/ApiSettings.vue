<template>
  <div class="api-settings p-4 bg-white rounded shadow">
    <h2 class="text-xl font-bold text-gray-700 mb-4">API 设置</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1">API 密钥</label>
        <input 
          type="password" 
          class="w-full p-2 border rounded" 
          placeholder="输入您的API密钥"
        />
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">API 端点</label>
        <input 
          type="text" 
          class="w-full p-2 border rounded" 
          value="http://areyouok.dns.army:55597/v1/chat/completions"
        />
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">模型</label>
        <select class="w-full p-2 border rounded">
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
        </select>
      </div>
      
      <div>
        <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 简化版本，移除所有复杂逻辑
</script> 