<template>
  <div class="market-overview-page bg-white dark:bg-gray-800 h-full overflow-auto p-6">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">市场全图</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">全面展示市场各维度数据，直观把握市场整体情况</p>
      </div>
      
      <!-- 时间筛选 -->
      <div class="mb-6 flex items-center">
        <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button class="px-4 py-2 rounded-md text-sm bg-blue-500 text-white">今日</button>
          <button class="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300">1周</button>
          <button class="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300">1月</button>
          <button class="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300">1年</button>
        </div>
        <div class="ml-auto flex items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">更新时间：</span>
          <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ currentTime }}</span>
        </div>
      </div>
      
      <!-- 主要指数概览 -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">主要指数</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(index, i) in mainIndices" :key="i" class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-bold text-gray-800 dark:text-white text-base">{{ index.name }}</h3>
                <div class="text-2xl font-bold" :class="index.change > 0 ? 'text-red-500' : 'text-green-500'">
                  {{ index.value }}
                </div>
              </div>
              <div :class="index.change > 0 ? 'text-red-500' : 'text-green-500'" class="flex flex-col items-end">
                <div class="flex items-center">
                  <span>{{ index.change > 0 ? '+' : '' }}{{ index.change }}%</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="index.change > 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <div class="text-xs mt-1">{{ index.changeValue }}</div>
              </div>
            </div>
            <div class="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            <div class="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div>
                <div class="text-gray-500 dark:text-gray-400">开盘</div>
                <div class="text-gray-800 dark:text-white font-medium">{{ index.open }}</div>
              </div>
              <div>
                <div class="text-gray-500 dark:text-gray-400">最高</div>
                <div class="text-gray-800 dark:text-white font-medium">{{ index.high }}</div>
              </div>
              <div>
                <div class="text-gray-500 dark:text-gray-400">最低</div>
                <div class="text-gray-800 dark:text-white font-medium">{{ index.low }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 市场热力图 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">市场热力图</h2>
          <div class="flex space-x-2">
            <button class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">板块</button>
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm">概念</button>
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm">个股</button>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div class="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div class="text-gray-400 dark:text-gray-500">市场热力图</div>
          </div>
          <div class="mt-4 flex justify-center space-x-6">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-700 rounded-sm mr-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">大涨 (5%+)</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-400 rounded-sm mr-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">上涨 (0-5%)</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">平盘 (0%)</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-400 rounded-sm mr-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">下跌 (0-5%)</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-700 rounded-sm mr-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">大跌 (5%+)</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 涨跌分布 -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">涨跌分布</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 大盘涨跌分布 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <h3 class="font-bold text-gray-800 dark:text-white mb-3 text-base">沪深两市涨跌分布</h3>
            <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div class="text-gray-400 dark:text-gray-500">涨跌分布图</div>
            </div>
            <div class="mt-4 grid grid-cols-5 gap-2 text-center">
              <div class="text-xs">
                <div class="text-gray-500 dark:text-gray-400">涨停</div>
                <div class="text-red-500 font-medium">{{ distribution.limit_up }}</div>
              </div>
              <div class="text-xs">
                <div class="text-gray-500 dark:text-gray-400">上涨</div>
                <div class="text-red-500 font-medium">{{ distribution.up }}</div>
              </div>
              <div class="text-xs">
                <div class="text-gray-500 dark:text-gray-400">平盘</div>
                <div class="text-gray-800 dark:text-white font-medium">{{ distribution.flat }}</div>
              </div>
              <div class="text-xs">
                <div class="text-gray-500 dark:text-gray-400">下跌</div>
                <div class="text-green-500 font-medium">{{ distribution.down }}</div>
              </div>
              <div class="text-xs">
                <div class="text-gray-500 dark:text-gray-400">跌停</div>
                <div class="text-green-500 font-medium">{{ distribution.limit_down }}</div>
              </div>
            </div>
          </div>
          
          <!-- 行业涨跌分布 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <h3 class="font-bold text-gray-800 dark:text-white mb-3 text-base">行业涨跌分布</h3>
            <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div class="text-gray-400 dark:text-gray-500">行业涨跌分布图</div>
            </div>
            <div class="mt-4 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">上涨行业：<span class="text-red-500 font-medium">{{ sectorDistribution.up }}</span></span>
                <span class="text-gray-500 dark:text-gray-400">下跌行业：<span class="text-green-500 font-medium">{{ sectorDistribution.down }}</span></span>
                <span class="text-gray-500 dark:text-gray-400">平盘行业：<span class="text-gray-800 dark:text-white font-medium">{{ sectorDistribution.flat }}</span></span>
              </div>
              <div class="mt-2 flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">领涨：<span class="text-red-500 font-medium">{{ sectorDistribution.leading_up }}</span></span>
                <span class="text-gray-500 dark:text-gray-400">领跌：<span class="text-green-500 font-medium">{{ sectorDistribution.leading_down }}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 市场交易数据 -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">市场交易数据</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- 成交量 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <h3 class="font-bold text-gray-800 dark:text-white mb-2 text-base">两市成交量</h3>
            <div class="text-xl font-bold text-gray-800 dark:text-white">{{ marketData.volume }}亿股</div>
            <div class="flex items-center text-sm" :class="marketData.volumeChange > 0 ? 'text-red-500' : 'text-green-500'">
              <span>{{ marketData.volumeChange > 0 ? '+' : '' }}{{ marketData.volumeChange }}%</span>
              <span class="ml-1 text-gray-500 dark:text-gray-400">较前一日</span>
            </div>
            <div class="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mt-3"></div>
          </div>
          
          <!-- 成交额 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <h3 class="font-bold text-gray-800 dark:text-white mb-2 text-base">两市成交额</h3>
            <div class="text-xl font-bold text-gray-800 dark:text-white">{{ marketData.turnover }}亿元</div>
            <div class="flex items-center text-sm" :class="marketData.turnoverChange > 0 ? 'text-red-500' : 'text-green-500'">
              <span>{{ marketData.turnoverChange > 0 ? '+' : '' }}{{ marketData.turnoverChange }}%</span>
              <span class="ml-1 text-gray-500 dark:text-gray-400">较前一日</span>
            </div>
            <div class="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mt-3"></div>
          </div>
          
          <!-- 换手率 -->
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <h3 class="font-bold text-gray-800 dark:text-white mb-2 text-base">市场平均换手率</h3>
            <div class="text-xl font-bold text-gray-800 dark:text-white">{{ marketData.turnoverRate }}%</div>
            <div class="flex items-center text-sm" :class="marketData.turnoverRateChange > 0 ? 'text-red-500' : 'text-green-500'">
              <span>{{ marketData.turnoverRateChange > 0 ? '+' : '' }}{{ marketData.turnoverRateChange }}%</span>
              <span class="ml-1 text-gray-500 dark:text-gray-400">较前一日</span>
            </div>
            <div class="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mt-3"></div>
          </div>
        </div>
      </div>
      
      <!-- 龙虎榜 -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">龙虎榜</h2>
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">股票名称</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">价格</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">涨跌幅</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">成交额(万)</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">净买入(万)</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">上榜原因</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="(stock, index) in topStocks" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{{ stock.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800 dark:text-white">{{ stock.price }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right" :class="stock.change > 0 ? 'text-red-500' : 'text-green-500'">
                  {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800 dark:text-white">{{ stock.turnover }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right" :class="stock.netBuy > 0 ? 'text-red-500' : 'text-green-500'">
                  {{ stock.netBuy > 0 ? '+' : '' }}{{ stock.netBuy }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600 dark:text-gray-300">{{ stock.reason }}</td>
              </tr>
            </tbody>
          </table>
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

// 模拟主要指数数据
const mainIndices = ref([
  { 
    name: '上证指数', 
    value: '3,128.30',
    change: 1.04, 
    changeValue: '+32.15',
    open: '3,096.15',
    high: '3,135.92',
    low: '3,090.38'
  },
  { 
    name: '深证成指', 
    value: '11,263.08',
    change: 1.15, 
    changeValue: '+128.45',
    open: '11,134.63',
    high: '11,285.73',
    low: '11,105.90'
  },
  { 
    name: '创业板指', 
    value: '2,287.92',
    change: -0.54, 
    changeValue: '-12.35',
    open: '2,300.27',
    high: '2,303.85',
    low: '2,278.43'
  },
  { 
    name: '沪深300', 
    value: '3,985.64',
    change: 0.78, 
    changeValue: '+30.87',
    open: '3,954.77',
    high: '3,991.25',
    low: '3,945.33'
  }
]);

// 模拟涨跌分布数据
const distribution = ref({
  limit_up: 43,
  up: 2120,
  flat: 112,
  down: 1358,
  limit_down: 8
});

// 模拟行业涨跌分布
const sectorDistribution = ref({
  up: 28,
  flat: 3,
  down: 14,
  leading_up: '新能源汽车 +3.85%',
  leading_down: '白酒 -1.25%'
});

// 模拟市场交易数据
const marketData = ref({
  volume: 845.32,
  volumeChange: 12.5,
  turnover: 9568.76,
  turnoverChange: 15.3,
  turnoverRate: 2.86,
  turnoverRateChange: 0.45
});

// 模拟龙虎榜数据
const topStocks = ref([
  { name: '比亚迪', price: '241.85', change: 4.32, turnover: 152387, netBuy: 23456, reason: '换手率达20%' },
  { name: '宁德时代', price: '178.65', change: 3.85, turnover: 136542, netBuy: 18945, reason: '振幅达15%' },
  { name: '隆基绿能', price: '52.37', change: 2.78, turnover: 98754, netBuy: 12356, reason: '日涨幅偏离值达7%' },
  { name: '恒瑞医药', price: '34.56', change: 2.45, turnover: 85423, netBuy: 9875, reason: '日换手率达到15%' },
  { name: '贵州茅台', price: '1876.50', change: -1.25, turnover: 65432, netBuy: -5643, reason: '日跌幅偏离值达到7%' }
]);
</script>

<style scoped>
.market-overview-page {
  min-height: 100vh;
}
</style> 