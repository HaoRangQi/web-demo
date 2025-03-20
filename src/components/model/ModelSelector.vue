<template>
  <div class="model-selector p-4 bg-white rounded shadow">
    <h2 class="text-xl font-bold text-gray-700 mb-4">模型选择器</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1">选择模型</label>
        <select class="w-full p-2 border rounded">
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">温度</label>
        <input type="range" min="0" max="1" step="0.1" value="0.7" class="w-full" />
        <div class="flex justify-between text-xs text-gray-500">
          <span>精确 (0)</span>
          <span>平衡 (0.7)</span>
          <span>创意 (1)</span>
        </div>
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">最大输出长度</label>
        <input type="number" min="100" max="4000" step="100" value="1000" class="w-full p-2 border rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 简化版本，移除所有复杂逻辑
</script> 