<template>
  <div class="app w-full min-h-screen flex flex-col" :class="{ 'dark': isDarkMode, 'home-mode': currentPage === 'home' }">
    <!-- 顶部进度条 -->
    <div v-if="isLoading" class="loading-bar"></div>
    
    <AppHeader 
      @toggle-theme="toggleTheme" 
      :is-dark-mode="isDarkMode"
      @menu-change="handleMenuChange" 
    />
    
    <div class="flex-grow flex flex-col md:flex-row" :class="{ 'overflow-visible h-auto': currentPage === 'home' }">
      <Sidebar v-if="currentPage === 'chat'" class="md:h-full" />
      
      <div class="flex-grow flex flex-col">
        <!-- 根据当前页面显示不同内容 -->
        <div v-if="currentPage === 'home'" class="w-full h-auto min-h-full overflow-visible">
          <HomePage @navigate="handleNavigate" />
        </div>
        
        <div v-else-if="currentPage === 'chat'" class="w-full h-full">
          <div class="tabs flex overflow-x-auto">
            <div 
              class="tab whitespace-nowrap" 
              :class="{ 'active': activeTab === 'chat' }"
              @click="activeTab = 'chat'"
            >
              <span>聊天</span>
            </div>
            <div 
              class="tab whitespace-nowrap" 
              :class="{ 'active': activeTab === 'logs' }"
              @click="activeTab = 'logs'"
            >
              <span>日志</span>
            </div>
            <div 
              class="tab whitespace-nowrap" 
              :class="{ 'active': activeTab === 'api' }"
              @click="activeTab = 'api'"
            >
              <span>API</span>
            </div>
          </div>
          
          <div class="tab-content">
            <ChatWindow v-if="activeTab === 'chat'" class="w-full h-full" @loading-state-change="handleLoadingState" />
            <LogViewer v-if="activeTab === 'logs'" class="w-full h-full" />
            <ApiViewer v-if="activeTab === 'api'" class="w-full h-full" />
          </div>
        </div>
        
        <div v-else-if="currentPage === 'analysis'" class="w-full h-full">
          <AnalysisPage />
        </div>
        
        <div v-else-if="currentPage === 'finance'" class="w-full h-full">
          <FinancePage />
        </div>
        
        <div v-else-if="currentPage === 'blog'" class="w-full h-full">
          <BlogPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import Sidebar from './components/layout/Sidebar.vue'
import ChatWindow from './components/chat/ChatWindow.vue'
import ApiViewer from './components/api/ApiViewer.vue'
import LogViewer from './components/LogViewer.vue'
import { useModelStore } from './stores/model'
import HomePage from './components/pages/HomePage.vue'
import AnalysisPage from './components/pages/AnalysisPage.vue'
import FinancePage from './components/pages/FinancePage.vue'
import BlogPage from './components/pages/BlogPage.vue'

const store = useModelStore()
const isDarkMode = ref(false)
const activeTab = ref('chat')
const isLoading = ref(false)
const currentPage = ref('home') // 默认显示首页

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function handleLoadingState(loading: boolean) {
  isLoading.value = loading
}

function handleMenuChange(menu: string) {
  currentPage.value = menu
  console.log('当前页面切换至:', menu)
}

// 处理来自HomePage的导航请求
function handleNavigate(page: string) {
  currentPage.value = page;
  console.log('从HomePage导航至:', page);
  
  // 通知顶部菜单更新状态
  const appHeader = document.querySelector('header');
  if (appHeader) {
    // 创建并分发自定义事件
    const event = new CustomEvent('menu-change', { detail: { menu: page } });
    appHeader.dispatchEvent(event);
  }
}

// 在watch中监听currentPage变化
watch(currentPage, (newPage) => {
  // 向AppHeader发送更新菜单的事件
  const appHeader = document.querySelector('header');
  if (appHeader) {
    const event = new CustomEvent('menu-change', { detail: { menu: newPage } });
    appHeader.dispatchEvent(event);
  }
});

onMounted(() => {
  console.log('App组件已挂载');
  console.log('Store状态:', store.$state);
  
  // 确保创建初始会话
  if (!store.activeConversationId && store.conversations.length === 0) {
    store.createConversation(store.activeModelId)
  }
  
  // 检查系统主题偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
/* 基础样式 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* 确保 app 容器占满整个视口 */
.app {
  min-height: 100vh;
  width: 100%;
  overflow: visible; /* 修改为visible允许滚动 */
}

/* 顶部加载进度条 */
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
  background-size: 200% 100%;
  animation: loading-bar-animation 1.5s ease-in-out infinite;
  z-index: 9999;
}

@keyframes loading-bar-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 调试样式 */
.debug-info {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

/* 当页面为首页时隐藏导航栏 */
.app:has(> div[class*="flex-grow"] > div > div.home-page) header,
.app:has(.home-page) header {
  display: none;
}

/* 首页时允许内容滚动 */
.app:has(> div[class*="flex-grow"] > div > div.home-page) {
  overflow: visible !important;
  height: auto !important;
}

.app:has(> div[class*="flex-grow"] > div > div.home-page) > div.flex-grow {
  min-height: 100vh;
  height: auto;
  overflow: visible;
}

/* 暗色模式样式 */
.dark {
  color-scheme: dark;
}

.dark body {
  background-color: #1a1a1a;
  color: #f3f4f6;
}

/* 自定义CSS变量 */
:root {
  --text-color: #111827;
  --text-color-secondary: #6b7280;
  --bg-color: #ffffff;
  --bg-color-secondary: #f9fafb;
  --primary-color: #3b82f6;
  --primary-color-light: #60a5fa;
  --primary-color-dark: #2563eb;
  --border-color: #e5e7eb;
  --hover-color: #f3f4f6;
  --danger-color: #ef4444;
  --success-color: #10b981;
  --warning-color: #f59e0b;
}

.dark {
  --text-color: #f3f4f6;
  --text-color-secondary: #9ca3af;
  --bg-color: #1f2937;
  --bg-color-secondary: #111827;
  --primary-color: #3b82f6;
  --primary-color-light: #60a5fa;
  --primary-color-dark: #2563eb;
  --border-color: #374151;
  --hover-color: #374151;
  --danger-color: #ef4444;
  --success-color: #10b981;
  --warning-color: #f59e0b;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
}

.tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-color-secondary);
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  user-select: none;
}

.tab:hover {
  color: var(--text-color);
  background-color: var(--hover-color);
}

.tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background-color: var(--bg-color);
}

.tab-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  height: calc(100% - 49px); /* 减去tabs高度 */
  width: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tabs {
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
  }
  
  .tabs::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
  
  .tab {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* 首页特殊样式 */
.home-mode {
  height: auto !important;
  overflow: visible !important;
}

.home-mode > div {
  height: auto !important;
  overflow: visible !important;
}

.home-mode .home-page {
  min-height: 100vh;
  overflow-y: auto !important;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.5);
}

/* Firefox滚动条 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 116, 139, 0.3) transparent;
}
</style>
