<template>
  <div class="sector-analysis-page bg-white dark:bg-gray-800 h-full overflow-auto p-6">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">板块分析</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">全面分析市场各个板块的表现与趋势</p>
      </div>

      <!-- 过滤和筛选控件 -->
      <div class="mb-6 flex flex-wrap items-center gap-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">时间范围:</span>
          <select class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5">
            <option>今日</option>
            <option>5日</option>
            <option>30日</option>
            <option>半年</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">排序:</span>
          <select class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5">
            <option>涨幅</option>
            <option>跌幅</option>
            <option>成交量</option>
            <option>股票数量</option>
          </select>
        </div>
        <div class="flex-grow"></div>
        <div class="flex items-center">
          <input type="text" placeholder="搜索板块名称..." class="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md px-3 py-1.5 text-sm w-48">
          <button class="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm transition-colors">搜索</button>
        </div>
      </div>

      <!-- 板块概览图表 -->
      <div class="mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">板块涨跌分布</h2>
        <div class="h-80 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div class="text-gray-400 dark:text-gray-500">板块涨跌分布图表</div>
        </div>
        <div class="mt-4 grid grid-cols-4 gap-4 text-center">
          <div class="p-2 rounded-md bg-red-50 dark:bg-red-900/20">
            <div class="font-medium text-gray-800 dark:text-white">上涨板块</div>
            <div class="text-xl font-bold text-red-500">28</div>
          </div>
          <div class="p-2 rounded-md bg-green-50 dark:bg-green-900/20">
            <div class="font-medium text-gray-800 dark:text-white">下跌板块</div>
            <div class="text-xl font-bold text-green-500">14</div>
          </div>
          <div class="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20">
            <div class="font-medium text-gray-800 dark:text-white">领涨板块</div>
            <div class="text-xl font-bold text-blue-500">新能源</div>
          </div>
          <div class="p-2 rounded-md bg-purple-50 dark:bg-purple-900/20">
            <div class="font-medium text-gray-800 dark:text-white">领跌板块</div>
            <div class="text-xl font-bold text-purple-500">白酒</div>
          </div>
        </div>
      </div>

      <!-- 板块详情表格 -->
      <div class="mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div class="p-4 border-b border-gray-200 dark:border-gray-600">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">板块详情</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">板块名称</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">涨跌幅</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">成交额(亿)</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">领涨股</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="(sector, index) in sectors" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{{ sector.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right" :class="sector.change > 0 ? 'text-red-500' : 'text-green-500'">
                  {{ sector.change > 0 ? '+' : '' }}{{ sector.change }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white text-right">{{ sector.volume }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white text-right">{{ sector.leadingStock }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button @click="viewSectorDetail(sector)" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                    详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页控件 -->
        <div class="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 共 <span class="font-medium">42</span> 条记录
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">上一页</button>
            <button class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">1</button>
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">2</button>
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">3</button>
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">下一页</button>
          </div>
        </div>
      </div>

      <!-- 板块热度分析 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">板块热度分析</h2>
          <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div class="text-gray-400 dark:text-gray-500">热度分析图表</div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">资金流向分析</h2>
          <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div class="text-gray-400 dark:text-gray-500">资金流向图表</div>
          </div>
        </div>
      </div>

      <!-- 板块相关性分析 -->
      <div class="mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">板块相关性分析</h2>
        <div class="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div class="text-gray-400 dark:text-gray-500">板块相关性热力图</div>
        </div>
      </div>

      <!-- 免责声明 -->
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        <p>免责声明：本分析仅供参考，不构成投资建议。投资有风险，入市需谨慎。数据更新时间：{{ currentTime }}</p>
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

// 模拟板块数据
const sectors = ref([
  { name: '新能源汽车', change: 3.85, volume: 325.67, leadingStock: '比亚迪' },
  { name: '半导体', change: 3.12, volume: 215.42, leadingStock: '中芯国际' },
  { name: '光伏产业', change: 2.78, volume: 198.33, leadingStock: '隆基绿能' },
  { name: '医药生物', change: 2.45, volume: 176.58, leadingStock: '恒瑞医药' },
  { name: '人工智能', change: 2.32, volume: 165.21, leadingStock: '科大讯飞' },
  { name: '军工', change: 1.89, volume: 145.76, leadingStock: '中航沈飞' },
  { name: '数字经济', change: 1.56, volume: 123.45, leadingStock: '浪潮信息' },
  { name: '白酒', change: -1.25, volume: 98.67, leadingStock: '贵州茅台' },
  { name: '房地产', change: -1.87, volume: 87.54, leadingStock: '万科A' },
  { name: '银行', change: -0.65, volume: 156.89, leadingStock: '工商银行' }
]);

// 查看板块详情
function viewSectorDetail(sector) {
  console.log('查看板块详情:', sector.name);
  // 实际应用中可以跳转到板块详情页或显示详情弹窗
}
</script>

<style scoped>
.sector-analysis-page {
  min-height: 100vh;
}
</style> 