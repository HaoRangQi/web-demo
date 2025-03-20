<template>
  <aside class="sidebar h-auto md:h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700" :class="[isCollapsed ? 'w-16' : 'w-64', mobileView ? 'absolute z-10 left-0 top-0 bottom-0' : '']">
    <div class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-700 dark:text-gray-200" :class="{ 'hidden': isCollapsed }">模型列表</h2>
        <button @click="toggleSidebar" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!isCollapsed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- 展开时显示菜单 -->
      <div v-if="!isCollapsed" class="flex-grow">
        <SidebarMenu />
      </div>
      
      <!-- 收起时显示的图标 -->
      <div v-else class="flex flex-col items-center space-y-4 mt-4">
        <div v-for="(model, index) in store.models.slice(0, 5)" :key="index" 
             class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800">
          {{ model.name.charAt(0) }}
        </div>
      </div>
    </div>
    
    <!-- 收起时的底部按钮 -->
    <div v-if="isCollapsed" class="mt-auto p-4 flex flex-col items-center space-y-4">
      <button class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </button>
      
      <button class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>
    </div>
  </aside>
  
  <!-- 移动端遮罩层 -->
  <div v-if="mobileView && !isCollapsed" class="fixed inset-0 bg-black bg-opacity-50 z-0" @click="toggleSidebar"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useModelStore } from '../../stores/model'
import SidebarMenu from './SidebarMenu.vue'

const store = useModelStore()
const isCollapsed = ref(false)
const mobileView = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

function checkMobileView() {
  mobileView.value = window.innerWidth < 768
  // 在移动视图下默认收起侧边栏
  if (mobileView.value && !isCollapsed.value) {
    isCollapsed.value = true
  }
}

// 监听窗口大小变化
onMounted(() => {
  checkMobileView()
  window.addEventListener('resize', checkMobileView)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileView)
})

// 观察移动视图状态变化
watch(mobileView, (newValue) => {
  if (newValue && !isCollapsed.value) {
    isCollapsed.value = true
  }
})
</script>

<style scoped>
/* 移动端侧边栏动画 */
.sidebar {
  transition: transform 0.3s ease, width 0.3s ease;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar:not(.w-16) {
    transform: translateX(0);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
}
</style> 