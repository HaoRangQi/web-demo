<template>
  <header class="app-header bg-white dark:bg-gray-800 shadow-sm h-14 flex items-center px-4 z-20">
    <div class="flex items-center">
      <div class="text-xl font-bold text-gray-800 dark:text-white">一个小站</div>
    </div>
    
    <!-- 导航菜单 -->
    <div class="ml-8 flex-grow">
      <nav class="flex space-x-6">
        <a href="#" class="nav-link" :class="{ 'active': activeMenu === 'home' }" @click="setActiveMenu('home')" data-page="home">首页</a>
        <a href="#" class="nav-link" :class="{ 'active': activeMenu === 'chat' }" @click="setActiveMenu('chat')" data-page="chat">对话</a>
        <a href="#" class="nav-link" :class="{ 'active': activeMenu === 'analysis' }" @click="setActiveMenu('analysis')" data-page="analysis">快速分析</a>
        <a href="#" class="nav-link" :class="{ 'active': activeMenu === 'finance' }" @click="setActiveMenu('finance')" data-page="finance">金融速报</a>
        <a href="#" class="nav-link" :class="{ 'active': activeMenu === 'blog' }" @click="setActiveMenu('blog')" data-page="blog">我的博客</a>
      </nav>
    </div>
    
    <div class="ml-auto flex items-center space-x-4">
      <!-- 主题切换按钮 -->
      <button @click="$emit('toggle-theme')" class="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white rounded-full">
        <svg v-if="!isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </button>
      
      <!-- 设置按钮 -->
      <button class="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white rounded-full">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 接收主题状态和切换事件
defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

// 当前活跃菜单
const activeMenu = ref('home')

// 设置活跃菜单
function setActiveMenu(menu: string) {
  activeMenu.value = menu
  emit('menu-change', menu)
}

// 监听页面切换
onMounted(() => {
  // 监听从App.vue来的menu-change事件
  document.addEventListener('menu-change', (e: any) => {
    if (e.detail && e.detail.menu) {
      activeMenu.value = e.detail.menu;
    }
  });
});

const emit = defineEmits(['toggle-theme', 'menu-change'])
</script>

<style scoped>
.app-header {
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nav-link {
  position: relative;
  padding: 0.5rem 0;
  color: var(--text-color-secondary, #6b7280);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--text-color, #111827);
}

.dark .nav-link {
  color: #9ca3af;
}

.dark .nav-link:hover {
  color: #f3f4f6;
}

.nav-link.active {
  color: var(--primary-color, #3b82f6);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color, #3b82f6);
}

.dark .nav-link.active {
  color: #60a5fa;
}

.dark .nav-link.active::after {
  background-color: #60a5fa;
}
</style> 