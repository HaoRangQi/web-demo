<template>
  <div class="finance-page bg-white dark:bg-gray-800 h-full overflow-auto flex">
    <!-- 左侧导航 -->
    <div class="finance-sidebar w-64 bg-gray-100 dark:bg-gray-900 p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">金融速报</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">实时财经数据分析</p>
      </div>
      
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <a href="#" class="nav-item" :class="{ 'active': activeNav === 'home' }" @click="activeNav = 'home'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>首页快报</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ 'active': activeNav === 'market' }" @click="activeNav = 'market'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>全图</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ 'active': activeNav === 'capital' }" @click="activeNav = 'capital'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>资金动向</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ 'active': activeNav === 'sector' }" @click="activeNav = 'sector'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span>板块分析</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ 'active': activeNav === 'ai' }" @click="activeNav = 'ai'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>AI分析</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>更新时间</p>
          <p class="font-mono">{{ currentTime }}</p>
        </div>
      </div>
    </div>
    
    <!-- 主内容区域 -->
    <div class="flex-1 overflow-auto">
      <!-- 显示对应的子菜单页面组件 -->
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import MarketOverviewPage from './MarketOverviewPage.vue';
import CapitalFlowPage from './CapitalFlowPage.vue';
import SectorAnalysisPage from './SectorAnalysisPage.vue';
import AiAnalysisPage from './AiAnalysisPage.vue';
import FinanceNewsPage from './FinanceNewsPage.vue';

const activeNav = ref('home');
const currentTime = ref('');

// 计算当前应该显示的组件
const currentComponent = computed(() => {
  switch (activeNav.value) {
    case 'market':
      return MarketOverviewPage;
    case 'capital':
      return CapitalFlowPage;
    case 'sector':
      return SectorAnalysisPage;
    case 'ai':
      return AiAnalysisPage;
    case 'home':
      return FinanceNewsPage;
    default:
      return FinanceNewsPage; // 默认显示金融首页快报内容
  }
});

// 更新时间
function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

// 定时更新时间
let timer: number;

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// 原有的数据加载逻辑
const isLoading = ref(false);

function loadFinanceData() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    console.log('金融数据加载完成');
  }, 1000);
}

onMounted(() => {
  loadFinanceData();
});
</script>

<style scoped>
.finance-page {
  min-height: 100vh;
}

.finance-sidebar {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.finance-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%);
  pointer-events: none;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: rgba(75, 85, 99, 0.9);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-bottom: 0.5rem;
}

.dark .nav-item {
  color: rgba(209, 213, 219, 0.9);
}

.nav-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: rgba(31, 41, 55, 1);
  transform: translateX(5px);
}

.dark .nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 1);
}

.nav-item.active {
  background: rgba(0, 0, 0, 0.07);
  color: rgba(31, 41, 55, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.dark .nav-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-item svg {
  margin-right: 0.75rem;
  transition: transform 0.3s ease;
}

.nav-item:hover svg {
  transform: scale(1.1);
}

/* 添加动画效果 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-item {
  animation: slideIn 0.3s ease forwards;
}

/* 为每个导航项添加延迟动画 */
.nav-item:nth-child(1) { animation-delay: 0.1s; }
.nav-item:nth-child(2) { animation-delay: 0.2s; }
.nav-item:nth-child(3) { animation-delay: 0.3s; }
.nav-item:nth-child(4) { animation-delay: 0.4s; }
.nav-item:nth-child(5) { animation-delay: 0.5s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .finance-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
  }
  
  .finance-page {
    flex-direction: column;
  }
}
</style> 