<template>
  <div class="finance-news-page p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">金融速报 - 首页快报</h1>
      <p class="text-gray-600 dark:text-gray-400">实时金融新闻和市场动态</p>
      <div class="w-20 h-1 bg-blue-500 mt-4"></div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 左侧：头条新闻 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 今日头条 -->
        <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              今日头条
            </h2>
          </div>
          <div class="p-6">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3">央行宣布降低存款准备金率0.5个百分点</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-3">央行今日宣布，自下月起降低金融机构存款准备金率0.5个百分点，预计将释放长期资金1.2万亿元，有助于提高金融对实体经济的支持力度。</p>
              <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>来源：央行官网</span>
                <span>发布时间：{{ formatDate(new Date()) }}</span>
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3">季度GDP数据超预期，增长6.3%</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-3">国家统计局公布的最新数据显示，第三季度GDP同比增长6.3%，超出市场预期，显示经济复苏势头良好。专家分析认为，这一增长主要得益于服务业的快速回暖和消费市场的逐步恢复。</p>
              <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>来源：国家统计局</span>
                <span>发布时间：{{ formatDate(new Date(Date.now() - 3600000)) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 市场动态 -->
        <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-green-700 px-6 py-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              市场动态
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-5">
              <div v-for="(item, index) in marketUpdates" :key="index" class="pb-4 border-b border-gray-200 dark:border-gray-600 last:border-0 last:pb-0">
                <div class="flex justify-between items-start">
                  <h3 class="text-gray-800 dark:text-white font-medium">{{ item.title }}</h3>
                  <span :class="`text-sm font-medium ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`">
                    {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：快讯和通知 -->
      <div class="space-y-6">
        <!-- 实时快讯 -->
        <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-purple-700 px-6 py-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              实时快讯
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <div v-for="(news, index) in latestNews" :key="index" class="pb-3 border-b border-gray-200 dark:border-gray-600 last:border-0 last:pb-0">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">{{ news.category }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ news.time }}</span>
                </div>
                <p class="text-gray-800 dark:text-white text-sm">{{ news.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 财经日历 -->
        <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              财经日历
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div v-for="(event, index) in financialCalendar" :key="index" class="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-600 last:border-0 last:pb-0">
                <div>
                  <p class="text-gray-800 dark:text-white font-medium">{{ event.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ event.date }}</p>
                </div>
                <div :class="`text-xs px-2 py-1 rounded-full ${getImportanceClass(event.importance)}`">
                  {{ event.importance }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 格式化日期
function formatDate(date: Date): string {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 市场动态数据
const marketUpdates = ref([
  {
    title: '上证指数',
    change: 0.82,
    description: '受政策利好影响，A股市场整体走强，上证指数收盘上涨0.82%。'
  },
  {
    title: '深证成指',
    change: 1.05,
    description: '创新科技板块表现活跃，带动深证成指上涨1.05%。'
  },
  {
    title: '创业板指',
    change: 1.56,
    description: '生物医药、新能源等新兴产业板块领涨，创业板指涨幅超过1.5%。'
  },
  {
    title: '美元/人民币',
    change: -0.27,
    description: '人民币对美元汇率小幅走强，离岸人民币上涨0.27%。'
  },
  {
    title: '黄金期货',
    change: 0.65,
    description: '受通胀数据影响，国际金价上涨0.65%，突破每盎司1950美元关口。'
  }
]);

// 实时快讯数据
const latestNews = ref([
  {
    category: '政策',
    time: '10:35',
    content: '财政部：将加大减税降费力度，预计全年为企业减负超过3.5万亿元。'
  },
  {
    category: '公司',
    time: '10:22',
    content: '腾讯控股宣布新一轮10亿美元回购计划，将于下周一启动。'
  },
  {
    category: '行业',
    time: '10:15',
    content: '芯片产业协会：国内半导体设备国产化率首次突破30%，较去年提升5个百分点。'
  },
  {
    category: '国际',
    time: '09:58',
    content: '美联储会议纪要显示，多数委员支持年内继续维持当前利率水平。'
  },
  {
    category: '公司',
    time: '09:45',
    content: '阿里巴巴宣布增加技术研发投入，未来三年将投入1000亿元用于人工智能和云计算。'
  },
  {
    category: '行业',
    time: '09:30',
    content: '新能源汽车8月销量公布，同比增长43%，连续第15个月保持增长。'
  },
  {
    category: '政策',
    time: '09:15',
    content: '住建部：加快推进保障性住房建设，预计年内新开工300万套。'
  },
  {
    category: '国际',
    time: '09:00',
    content: '欧洲央行宣布下调增长预期，但维持当前利率不变。'
  }
]);

// 财经日历数据
const financialCalendar = ref([
  {
    title: '美国非农就业数据公布',
    date: '明天 20:30',
    importance: '高'
  },
  {
    title: '中国8月PPI、CPI数据',
    date: '后天 09:30',
    importance: '中'
  },
  {
    title: '欧盟央行利率决议',
    date: '本周四 19:45',
    importance: '高'
  },
  {
    title: '日本央行货币政策会议',
    date: '本周五 11:00',
    importance: '中'
  },
  {
    title: '中国工业增加值数据',
    date: '下周一 10:00',
    importance: '低'
  }
]);

// 获取重要性对应的样式类
function getImportanceClass(importance: string): string {
  switch (importance) {
    case '高':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    case '中':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    case '低':
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
  }
}
</script>

<style scoped>
.finance-news-page {
  min-height: calc(100vh - 64px);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style> 