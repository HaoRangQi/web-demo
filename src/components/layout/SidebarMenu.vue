<template>
  <div class="sidebar-menu">
    <!-- 会话列表 -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 px-3">会话列表</h3>
        <!-- 新建会话按钮移到标题栏右侧 -->
        <button 
          class="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 px-2 py-1 rounded"
          @click="createNewConversation"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>新建</span>
        </button>
      </div>
      <div class="space-y-1">
        <div 
          v-for="(conversation, index) in store.conversations" 
          :key="conversation.id"
          class="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
          :class="{ 'bg-blue-100 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-900': conversation.id === store.activeConversationId }"
          @click="selectConversation(conversation.id)"
        >
          <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <span class="truncate text-gray-700 dark:text-gray-300">{{ conversation.title || `会话 ${index + 1}` }}</span>
        </div>
        
        <!-- 移除这里的新建会话按钮，因为已经移到顶部 -->
      </div>
    </div>
    
    <!-- 模型选择 -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-3">选择模型</h3>
      <div class="space-y-1">
        <div 
          v-for="model in store.models" 
          :key="model.id"
          class="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
          :class="{ 'bg-blue-100 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-900': model.id === store.activeModelId }"
          @click="selectModel(model.id)"
        >
          <div class="w-4 h-4 mr-2 rounded-full" :class="model.colorClass"></div>
          <span class="truncate text-gray-700 dark:text-gray-300">{{ model.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 底部按钮 -->
    <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center text-gray-700 dark:text-gray-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>设置</span>
      </div>
      
      <div class="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center text-gray-700 dark:text-gray-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>帮助</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModelStore } from '../../stores/model'

const store = useModelStore();

// 选择模型
function selectModel(modelId: string) {
  store.setActiveModel(modelId);
}

// 选择会话
function selectConversation(conversationId: string) {
  store.setActiveConversation(conversationId);
}

// 创建新会话
function createNewConversation() {
  const conversationId = store.createConversation(store.activeModelId);
  store.setActiveConversation(conversationId);
}
</script> 