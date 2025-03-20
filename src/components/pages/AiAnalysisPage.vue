<template>
  <div class="ai-analysis-page bg-white dark:bg-gray-800 h-full overflow-auto p-6">
    <div class="max-w-6xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">AI 市场分析</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">智能算法分析市场动态与投资机会</p>
      </div>
      
      <!-- AI 市场洞察概览 -->
      <div class="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-sm">
        <div class="flex items-start">
          <div class="flex-shrink-0 bg-blue-100 dark:bg-blue-800/30 p-3 rounded-lg mr-5">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">今日市场洞察</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ currentDate }} · AI智能分析</p>
            <div class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm mb-4">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                今日市场整体呈现震荡上行态势，沪指上涨1.04%，创业板指小幅下跌0.54%。北向资金流入32.65亿元，
                新能源汽车、半导体、光伏等板块表现强势。资金持续流入科技成长赛道，市场风格有所转变。
                短期来看，市场有望延续结构性行情，建议关注高景气度、低估值的优质个股。
              </p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">市场情绪</div>
                <div class="flex justify-center">
                  <span class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">谨慎乐观</span>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">市场热点</div>
                <div class="flex justify-center">
                  <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">科技成长</span>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">资金流向</div>
                <div class="flex justify-center">
                  <span class="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm">净流入</span>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">波动性</div>
                <div class="flex justify-center">
                  <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">中等</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI 指数预测 -->
      <div class="mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">AI指数预测</h2>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">5日</button>
            <button class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md">10日</button>
            <button class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md">30日</button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-800 dark:text-white">上证指数</h3>
                  <div class="text-2xl font-bold text-gray-800 dark:text-white">3,128.30</div>
                </div>
                <div class="flex items-center text-red-500">
                  <span class="text-sm">+1.04%</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <div class="h-40 bg-white dark:bg-gray-700 rounded-lg mb-3"></div>
              <div class="flex justify-between items-center text-sm">
                <div class="text-gray-600 dark:text-gray-400">预测区间</div>
                <div class="font-medium text-gray-800 dark:text-white">3,080 - 3,180</div>
              </div>
              <div class="flex justify-between items-center text-sm mt-1">
                <div class="text-gray-600 dark:text-gray-400">准确率</div>
                <div class="font-medium text-green-500">87%</div>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-800 dark:text-white">深证成指</h3>
                  <div class="text-2xl font-bold text-gray-800 dark:text-white">11,263.08</div>
                </div>
                <div class="flex items-center text-red-500">
                  <span class="text-sm">+1.15%</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <div class="h-40 bg-white dark:bg-gray-700 rounded-lg mb-3"></div>
              <div class="flex justify-between items-center text-sm">
                <div class="text-gray-600 dark:text-gray-400">预测区间</div>
                <div class="font-medium text-gray-800 dark:text-white">11,150 - 11,350</div>
              </div>
              <div class="flex justify-between items-center text-sm mt-1">
                <div class="text-gray-600 dark:text-gray-400">准确率</div>
                <div class="font-medium text-green-500">85%</div>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-800 dark:text-white">创业板指</h3>
                  <div class="text-2xl font-bold text-gray-800 dark:text-white">2,287.92</div>
                </div>
                <div class="flex items-center text-green-500">
                  <span class="text-sm">-0.54%</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <div class="h-40 bg-white dark:bg-gray-700 rounded-lg mb-3"></div>
              <div class="flex justify-between items-center text-sm">
                <div class="text-gray-600 dark:text-gray-400">预测区间</div>
                <div class="font-medium text-gray-800 dark:text-white">2,250 - 2,320</div>
              </div>
              <div class="flex justify-between items-center text-sm mt-1">
                <div class="text-gray-600 dark:text-gray-400">准确率</div>
                <div class="font-medium text-green-500">82%</div>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
            <div class="font-medium text-gray-800 dark:text-white mb-2">AI预测说明:</div>
            <p>以上预测基于机器学习算法对历史数据的分析，综合考虑市场趋势、交易量、资金流向、宏观经济等多维度因素。预测结果仅供参考，不构成投资建议。</p>
          </div>
        </div>
      </div>
      
      <!-- AI 行业分析 -->
      <div class="mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">行业AI分析</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 行业增长潜力评估 -->
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white mb-3">行业增长潜力评估</h3>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div class="space-y-4">
                  <div v-for="(industry, index) in industries" :key="index">
                    <div class="flex justify-between items-center mb-1">
                      <div class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ industry.name }}</div>
                      <div class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ industry.score }}/10</div>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :style="{ width: `${industry.score * 10}%`, backgroundColor: industry.score >= 7 ? '#ef4444' : industry.score >= 5 ? '#3b82f6' : '#10b981' }"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                <p>* 增长潜力评分基于行业景气度、政策支持、技术突破等因素综合评估</p>
              </div>
            </div>
            
            <!-- AI选股推荐 -->
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white mb-3">AI选股关注</h3>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">股票</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI评分</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">关注理由</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="(stock, index) in aiStocks" :key="index">
                      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{{ stock.name }}</td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span :class="stock.score >= 80 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                          stock.score >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'" 
                          class="px-2 py-1 rounded-full text-xs">{{ stock.score }}</span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{{ stock.reason }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>* AI选股基于量化模型，关注基本面、技术面、资金面等多维度分析</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI 热点追踪 -->
      <div class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 近期热点事件 -->
        <div class="md:col-span-2 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">市场热点事件追踪</h2>
          <div class="space-y-4">
            <div v-for="(event, index) in hotEvents" :key="index" class="border-l-4 pl-4 py-1" :class="event.impact === '利好' ? 'border-red-500' : event.impact === '利空' ? 'border-green-500' : 'border-gray-400'">
              <div class="flex items-center mb-1">
                <h3 class="text-base font-medium text-gray-800 dark:text-white">{{ event.title }}</h3>
                <span :class="event.impact === '利好' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 
                  event.impact === '利空' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'"
                  class="ml-3 px-2 py-0.5 rounded text-xs">{{ event.impact }}</span>
                <span class="ml-auto text-xs text-gray-500 dark:text-gray-400">{{ event.date }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ event.description }}</p>
              <div class="mt-1 text-sm">
                <span class="text-gray-500 dark:text-gray-400">相关板块: </span>
                <span v-for="(sector, sIndex) in event.sectors" :key="sIndex" class="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs mr-1 mb-1">{{ sector }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 情绪指标 -->
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">市场情绪指标</h2>
          <div class="h-48 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            <div class="text-gray-400">情绪指标图</div>
          </div>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between items-center mb-1">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">恐慌/贪婪指数</div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">62 (贪婪)</div>
              </div>
              <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div class="h-full bg-orange-500 rounded-full" style="width: 62%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">市场情绪指数</div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">58 (中性偏多)</div>
              </div>
              <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: 58%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">市场风险指数</div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">45 (中等)</div>
              </div>
              <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 45%"></div>
              </div>
            </div>
          </div>
          <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>* 市场情绪指标基于交易量、波动率、多空比、资金流向等多维数据分析</p>
          </div>
        </div>
      </div>
      
      <!-- AI 分析总结 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          AI分析总结
        </h2>
        <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p>根据多维度数据分析，当前市场处于震荡上行通道，整体呈现结构性行情。市场情绪稳步恢复，但风险偏好分化明显。北向资金持续流入，外资对A股长期价值认可度提升。</p>
          <p>行业方面，科技成长方向表现较强，新能源汽车、半导体、光伏等行业获得资金青睐。传统消费相对低迷，金融地产维持震荡。</p>
          <p>短期策略建议关注：</p>
          <ol>
            <li>高景气度科技板块的低估值优质个股</li>
            <li>受益于政策支持的新能源产业链</li>
            <li>具备技术创新与竞争壁垒的半导体企业</li>
          </ol>
          <p>需关注的风险因素：海外市场波动加剧可能影响A股市场情绪；经济数据波动可能导致市场预期变化；流动性边际收紧需关注央行政策动向。</p>
        </div>
      </div>
      
      <!-- 免责声明 -->
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        <p>免责声明：本AI分析仅供参考，不构成投资建议。投资有风险，入市需谨慎。数据更新时间：{{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 当前时间
const currentTime = ref('');
const currentDate = ref('');

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
  
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
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

// 模拟行业增长潜力数据
const industries = ref([
  { name: '新能源汽车', score: 8.5 },
  { name: '半导体', score: 8.2 },
  { name: '光伏产业', score: 7.8 },
  { name: '医药生物', score: 6.5 },
  { name: '军工', score: 6.3 },
  { name: '人工智能', score: 8.7 },
  { name: '消费电子', score: 5.8 },
  { name: '白酒', score: 4.3 }
]);

// 模拟AI选股数据
const aiStocks = ref([
  { name: '比亚迪', score: 87, reason: '业绩增长' },
  { name: '宁德时代', score: 82, reason: '行业龙头' },
  { name: '中芯国际', score: 85, reason: '政策支持' },
  { name: '隆基绿能', score: 78, reason: '成本优势' },
  { name: '科大讯飞', score: 80, reason: 'AI技术' }
]);

// 模拟热点事件数据
const hotEvents = ref([
  { 
    title: '央行降准0.5个百分点', 
    impact: '利好', 
    date: '2023-09-15', 
    description: '央行宣布全面降准0.5个百分点，释放长期资金约1万亿元，支持实体经济发展。',
    sectors: ['银行', '地产', '基建']
  },
  { 
    title: '新能源汽车补贴政策延续', 
    impact: '利好', 
    date: '2023-09-10', 
    description: '国家发改委宣布新能源汽车补贴政策延续，并加大充电基础设施建设力度。',
    sectors: ['新能源汽车', '锂电池', '充电桩']
  },
  { 
    title: '美联储加息25个基点', 
    impact: '中性', 
    date: '2023-09-05', 
    description: '美联储宣布加息25个基点，符合市场预期，但暗示年内可能还有一次加息。',
    sectors: ['金融', '大宗商品', '科技']
  },
  { 
    title: '欧洲能源危机加剧', 
    impact: '利空', 
    date: '2023-08-28', 
    description: '欧洲能源价格持续攀升，多国工业生产受到影响，全球供应链面临挑战。',
    sectors: ['能源', '化工', '出口']
  }
]);
</script>

<style scoped>
.ai-analysis-page {
  min-height: 100vh;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
}

.prose li {
  margin-top: 0.5rem;
}
</style> 