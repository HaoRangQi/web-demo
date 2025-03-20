<template>
  <div class="chat-interface flex flex-col h-full">
    <!-- 聊天消息区域 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 用户消息 -->
      <div class="flex justify-end mb-4">
        <div class="bg-blue-500 text-white p-3 rounded-lg max-w-md">
          你好，请介绍一下你自己。
        </div>
      </div>
      
      <!-- AI消息 -->
      <div class="flex mb-4">
        <div class="bg-gray-200 p-3 rounded-lg max-w-md">
          你好！我是一个AI助手，可以回答问题、提供信息和帮助完成各种任务。我可以讨论各种主题，提供建议，或者只是聊天。有什么我可以帮助你的吗？
        </div>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="border-t p-4">
      <div class="flex">
        <textarea 
          class="flex-1 p-2 border rounded-l resize-none"
          placeholder="输入消息..."
          rows="2"
        ></textarea>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 简化版本，移除所有复杂逻辑
</script> 