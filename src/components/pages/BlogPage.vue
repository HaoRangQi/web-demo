<template>
  <div class="blog-page bg-white dark:bg-gray-800 h-full overflow-auto p-4">
    <div class="max-w-4xl mx-auto py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">我的博客</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">分享技术、思考和生活的点滴</p>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8 mb-12">
        <div class="md:w-2/3">
          <div class="mb-8">
            <div class="relative">
              <img src="https://via.placeholder.com/800x400" alt="博客封面" class="w-full h-64 object-cover rounded-lg shadow-md" />
              <div class="absolute top-4 left-4 bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">技术</div>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-2">开始使用Vue 3和TDD构建现代Web应用</h2>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
              <span>2023年12月20日</span>
              <span class="mx-2">•</span>
              <span>10分钟阅读</span>
              <span class="mx-2">•</span>
              <span>作者：站长</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              本文将带你探索如何使用Vue 3和TDD（测试驱动开发）方法构建一个现代化的Web应用程序。我们将从设置项目环境开始，到编写第一个测试和组件，最终构建一个完整的应用。
            </p>
            <a href="#" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              阅读全文
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          <div class="mb-8">
            <div class="relative">
              <img src="https://via.placeholder.com/800x400" alt="博客封面" class="w-full h-64 object-cover rounded-lg shadow-md" />
              <div class="absolute top-4 left-4 bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-full">AI</div>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-2">大型语言模型在实际项目中的应用</h2>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
              <span>2023年12月15日</span>
              <span class="mx-2">•</span>
              <span>15分钟阅读</span>
              <span class="mx-2">•</span>
              <span>作者：站长</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              随着大型语言模型（LLM）的快速发展，它们在实际项目中的应用也越来越广泛。本文将分享几个真实案例，展示如何将LLM集成到日常工作流程中，提高开发效率和创新能力。
            </p>
            <a href="#" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              阅读全文
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          <div class="mb-8">
            <div class="relative">
              <img src="https://via.placeholder.com/800x400" alt="博客封面" class="w-full h-64 object-cover rounded-lg shadow-md" />
              <div class="absolute top-4 left-4 bg-purple-500 text-white text-sm font-medium py-1 px-3 rounded-full">思考</div>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-2">技术社区与开源精神</h2>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
              <span>2023年12月10日</span>
              <span class="mx-2">•</span>
              <span>8分钟阅读</span>
              <span class="mx-2">•</span>
              <span>作者：站长</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              开源社区是技术发展的重要驱动力，也是技术人共同学习和成长的平台。本文将探讨开源精神的本质，以及如何更好地参与和贡献开源项目，共同推动技术生态的发展。
            </p>
            <a href="#" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              阅读全文
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          <div class="flex justify-center mt-8">
            <button class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              加载更多
            </button>
          </div>
        </div>
        
        <div class="md:w-1/3">
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">分类</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>技术</span>
                  <span class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">8</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>AI</span>
                  <span class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">5</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>思考</span>
                  <span class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">3</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>生活</span>
                  <span class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">2</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>项目</span>
                  <span class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">4</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">热门文章</h3>
            <ul class="space-y-4">
              <li>
                <a href="#" class="flex items-start group">
                  <img src="https://via.placeholder.com/100" alt="热门文章" class="w-16 h-16 object-cover rounded" />
                  <div class="ml-3">
                    <h4 class="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Vue 3组合式API实战指南</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">2023年11月28日</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-start group">
                  <img src="https://via.placeholder.com/100" alt="热门文章" class="w-16 h-16 object-cover rounded" />
                  <div class="ml-3">
                    <h4 class="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">如何提高代码质量和可维护性</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">2023年11月20日</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-start group">
                  <img src="https://via.placeholder.com/100" alt="热门文章" class="w-16 h-16 object-cover rounded" />
                  <div class="ml-3">
                    <h4 class="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">前端性能优化实践</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">2023年11月15日</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">订阅更新</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">输入您的邮箱，获取最新博客更新通知</p>
            <div class="flex">
              <input type="email" placeholder="您的邮箱地址" class="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 博客文章列表可以从API获取或本地存储
const blogPosts = ref([
  // 这里可以放实际的博客数据
]);

// 这里可以添加实际功能，如过滤文章、分页等
</script>

<style scoped>
.blog-page a {
  transition: all 0.3s ease;
}

.blog-page img {
  transition: transform 0.3s ease;
}

.blog-page a:hover img {
  transform: scale(1.02);
}
</style> 