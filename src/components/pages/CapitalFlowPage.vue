<template>
  <div class="capital-flow-page bg-white dark:bg-gray-800 h-full overflow-auto p-6">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">资金动向</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">追踪市场主要资金流向与热点变化</p>
      </div>

      <!-- 时间筛选 -->
      <div class="mb-6 flex items-center">
        <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button class="px-4 py-2 rounded-md text-sm bg-blue-500 text-white">今日</button>
          <button class="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300">3日</button>
          <button class="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300">5日</button>
          <button class="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300">10日</button>
        </div>
        <div class="ml-auto flex items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">更新时间：</span>
          <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ currentTime }}</span>
        </div>
      </div>

      <!-- 资金概览卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">北向资金</h3>
          <div class="flex items-end justify-between">
            <div class="text-2xl font-bold text-red-500">+32.65亿</div>
            <div class="text-sm text-red-500 flex items-center">
              <span>+15.3%</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">南向资金</h3>
          <div class="flex items-end justify-between">
            <div class="text-2xl font-bold text-red-500">+28.12亿</div>
            <div class="text-sm text-red-500 flex items-center">
              <span>+12.8%</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">融资余额</h3>
          <div class="flex items-end justify-between">
            <div class="text-2xl font-bold text-gray-800 dark:text-white">15,483.28亿</div>
            <div class="text-sm text-red-500 flex items-center">
              <span>+0.6%</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">融券余额</h3>
          <div class="flex items-end justify-between">
            <div class="text-2xl font-bold text-gray-800 dark:text-white">453.76亿</div>
            <div class="text-sm text-green-500 flex items-center">
              <span>-1.2%</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
        </div>
      </div>

      <!-- 资金流向主图表 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">大盘资金流向 (亿元)</h2>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">净流入</button>
            <button class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md">分时</button>
            <button class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md">累计</button>
          </div>
        </div>
        <div class="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div class="text-gray-400">资金流向趋势图</div>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <div class="text-sm text-gray-600 dark:text-gray-400">主力净流入</div>
            <div class="text-xl font-bold text-red-500">+125.83亿</div>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div class="text-sm text-gray-600 dark:text-gray-400">超大单净流入</div>
            <div class="text-xl font-bold text-red-500">+68.42亿</div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div class="text-sm text-gray-600 dark:text-gray-400">大单净流入</div>
            <div class="text-xl font-bold text-red-500">+57.41亿</div>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div class="text-sm text-gray-600 dark:text-gray-400">中小单净流入</div>
            <div class="text-xl font-bold text-green-500">-36.25亿</div>
          </div>
        </div>
      </div>

      <!-- 行业资金流向 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">行业资金流向 (亿元)</h2>
          <div class="flex items-center">
            <button class="flex items-center text-sm text-blue-500">
              <span>更多行业</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 行业资金流向图表 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
            <div class="h-96 bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-center">
              <div class="text-gray-400">行业资金流向图</div>
            </div>
          </div>
          
          <!-- 行业资金流向表格 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">行业板块</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">净流入</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">净额占比</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">涨跌幅</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                <tr v-for="(flow, index) in industryFlows" :key="index">
                  <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{{ flow.name }}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right" :class="flow.netInflow > 0 ? 'text-red-500' : 'text-green-500'">
                    {{ flow.netInflow > 0 ? '+' : '' }}{{ flow.netInflow }}亿
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-800 dark:text-white">
                    {{ flow.percentage }}%
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right" :class="flow.change > 0 ? 'text-red-500' : 'text-green-500'">
                    {{ flow.change > 0 ? '+' : '' }}{{ flow.change }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 概念资金流向 & 个股资金流向 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 概念资金流向 -->
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 class="text-lg font-bold text-gray-800 dark:text-white">概念资金流向</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">概念名称</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">净流入</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">涨跌幅</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                <tr v-for="(concept, index) in conceptFlows.slice(0, 6)" :key="index">
                  <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{{ concept.name }}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right" :class="concept.netInflow > 0 ? 'text-red-500' : 'text-green-500'">
                    {{ concept.netInflow > 0 ? '+' : '' }}{{ concept.netInflow }}亿
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right" :class="concept.change > 0 ? 'text-red-500' : 'text-green-500'">
                    {{ concept.change > 0 ? '+' : '' }}{{ concept.change }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 个股资金流向 -->
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 class="text-lg font-bold text-gray-800 dark:text-white">个股资金流向</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">股票名称</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">净流入</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">涨跌幅</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                <tr v-for="(stock, index) in stockFlows.slice(0, 6)" :key="index">
                  <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{{ stock.name }}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right" :class="stock.netInflow > 0 ? 'text-red-500' : 'text-green-500'">
                    {{ stock.netInflow > 0 ? '+' : '' }}{{ stock.netInflow }}亿
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right" :class="stock.change > 0 ? 'text-red-500' : 'text-green-500'">
                    {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 免责声明 -->
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        <p>免责声明：本数据仅供参考，不构成投资建议。投资有风险，入市需谨慎。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 当前时间
const currentTime = ref('');

// 更新时间
function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleString('zh-CN', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

// 定时更新时间
let timer;

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// 模拟行业资金流向数据
const industryFlows = ref([
  { name: '新能源汽车', netInflow: 28.65, percentage: 12.8, change: 3.85 },
  { name: '电子元件', netInflow: 21.32, percentage: 9.5, change: 2.67 },
  { name: '半导体', netInflow: 18.78, percentage: 8.4, change: 3.12 },
  { name: '医药生物', netInflow: 15.43, percentage: 6.9, change: 2.45 },
  { name: '计算机', netInflow: 12.21, percentage: 5.5, change: 1.98 },
  { name: '军工', netInflow: 10.85, percentage: 4.9, change: 1.89 },
  { name: '银行', netInflow: -8.56, percentage: -3.8, change: -0.65 },
  { name: '房地产', netInflow: -12.34, percentage: -5.5, change: -1.87 }
]);

// 模拟概念资金流向数据
const conceptFlows = ref([
  { name: '人工智能', netInflow: 16.78, change: 2.32 },
  { name: '储能', netInflow: 14.56, change: 2.15 },
  { name: '光伏', netInflow: 13.28, change: 2.78 },
  { name: '大数据', netInflow: 10.15, change: 1.86 },
  { name: '半导体国产化', netInflow: 9.87, change: 2.64 },
  { name: '数字货币', netInflow: 8.92, change: 1.75 }
]);

// 模拟个股资金流向数据
const stockFlows = ref([
  { name: '比亚迪', netInflow: 8.45, change: 4.32 },
  { name: '宁德时代', netInflow: 7.23, change: 3.85 },
  { name: '中芯国际', netInflow: 6.78, change: 3.56 },
  { name: '隆基绿能', netInflow: 5.92, change: 2.78 },
  { name: '恒瑞医药', netInflow: 5.43, change: 2.45 },
  { name: '贵州茅台', netInflow: -4.56, change: -1.25 }
]);
</script>

<style scoped>
.capital-flow-page {
  min-height: 100vh;
}
</style> 