<template>
  <div class="home-page">
    <!-- 返回顶部按钮 - 明显版 -->
    <div class="back-to-top-container">
      <button 
        @click="scrollToSection('hero')" 
        class="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 back-to-top-btn"
        :class="{ 'scale-100 opacity-100': showNavbar, 'scale-0 opacity-0': !showNavbar }"
        title="回到顶部"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <!-- 第一屏 - 全屏哲学风格 -->
    <div id="hero" class="h-screen w-full flex items-center justify-center relative philosophy-hero min-h-[100vh]">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800/50"></div>
      <div class="text-center relative z-10 px-6 max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">探寻生活的<span class="text-blue-400">真谛</span></h1>
        <p class="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
          "人类最伟大的成就不在于其知识的获取，而在于对价值与意义的理解。"
        </p>
        <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
          <a href="#" class="group px-8 py-3 bg-transparent backdrop-blur-sm border border-blue-400 text-blue-300 rounded-full text-lg hover:bg-blue-500/20 transition-all duration-300 flex items-center" @click.prevent="$emit('navigate', 'chat')">
            开始探索
            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
          <a href="#" class="group px-8 py-3 bg-transparent backdrop-blur-sm border border-white/30 text-gray-200 rounded-full text-lg hover:border-white/50 hover:text-white transition-all duration-300" @click.prevent="$emit('navigate', 'blog')">
            了解更多
          </a>
        </div>
        
        <!-- 往下滚动按钮 -->
        <button @click="scrollToThoughts" @mousedown="forceScroll" data-scroll="thoughts" class="group px-8 py-3 bg-transparent backdrop-blur-sm border border-blue-400 text-blue-300 rounded-full text-lg hover:bg-blue-500/20 transition-all duration-300 inline-flex items-center animate-pulse">
          往下滚动探索
          <svg class="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
        
        <!-- 传统锚点链接（隐藏但可用于滚动） -->
        <a href="#thoughts" class="hidden">滚动到思想</a>
      </div>
    </div>

    <!-- 第二屏 - 哲学思考内容 -->
    <div id="thoughts" class="bg-gray-50 dark:bg-gray-800 py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">思想的旅程</h2>
          <div class="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- 哲学卡片 1 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">认识论</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              我们如何获取知识？感官经验与理性思考在理解世界中扮演着什么角色？认识的界限与可能性是什么？
            </p>
      </div>
      
          <!-- 哲学卡片 2 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">伦理学</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              什么是善？如何定义正义？人类行为的道德准则从何而来？个体与社会之间的道德关系如何构建？
            </p>
          </div>

          <!-- 哲学卡片 3 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">存在论</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              什么是存在的本质？我们如何理解时间、空间与意识？人类在宇宙中的位置与意义是什么？
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三屏 - 哲学名言 -->
    <div id="quotes" class="bg-white dark:bg-gray-900 py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">智者箴言</h2>
          <div class="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="space-y-12">
          <!-- 名言 1 -->
          <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
              "未经省察的生活不值得过。"
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4 flex items-center justify-center">
                <span class="text-blue-600 dark:text-blue-300 font-bold">苏</span>
              </div>
              <div>
                <div class="font-bold text-gray-800 dark:text-white">苏格拉底</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">古希腊哲学家</div>
              </div>
            </div>
          </div>

          <!-- 名言 2 -->
          <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
              "人是衡量万物的尺度：存在者存在，不存在者不存在。"
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4 flex items-center justify-center">
                <span class="text-blue-600 dark:text-blue-300 font-bold">普</span>
              </div>
              <div>
                <div class="font-bold text-gray-800 dark:text-white">普罗泰戈拉</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">古希腊智者派哲学家</div>
              </div>
            </div>
          </div>
          
          <!-- 名言 3 -->
          <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
              "我思故我在。"
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4 flex items-center justify-center">
                <span class="text-blue-600 dark:text-blue-300 font-bold">笛</span>
              </div>
              <div>
                <div class="font-bold text-gray-800 dark:text-white">笛卡尔</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">法国哲学家、数学家</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增部分：哲学的时代意义 -->
    <div id="modern-philosophy" class="bg-gradient-to-br from-indigo-900 to-purple-900 py-20 px-6 text-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">哲学的现代旅程</h2>
          <div class="w-24 h-1 bg-blue-400 mx-auto"></div>
          <p class="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            在这个充满不确定性与快速变化的时代，哲学思考比以往任何时候都更加重要。
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- 左侧内容 -->
          <div class="space-y-6">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 transform transition hover:bg-white/15 hover:scale-[1.02]">
              <h3 class="text-2xl font-bold mb-4">科技与人文的融合</h3>
              <p class="text-blue-100">
                人工智能、大数据、生物科技的发展不仅改变了我们的生活方式，也引发了深刻的哲学思考：意识的本质是什么？人与机器的界限在哪里？我们如何在科技变革中保持人性的核心价值？
              </p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 transform transition hover:bg-white/15 hover:scale-[1.02]">
              <h3 class="text-2xl font-bold mb-4">全球化与身份认同</h3>
              <p class="text-blue-100">
                在全球互联的世界中，个体如何平衡自身文化认同与全球公民意识？多元文化共存中的价值冲突如何调和？哲学为这些问题提供了思考框架。
              </p>
            </div>
          </div>
          
          <!-- 右侧内容 -->
          <div class="space-y-6">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 transform transition hover:bg-white/15 hover:scale-[1.02]">
              <h3 class="text-2xl font-bold mb-4">生态危机与伦理重构</h3>
              <p class="text-blue-100">
                面对气候变化与生态退化，传统的人类中心主义受到挑战。环境伦理学探讨人与自然的关系重建，思考跨代正义与可持续发展的哲学基础。
              </p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 transform transition hover:bg-white/15 hover:scale-[1.02]">
              <h3 class="text-2xl font-bold mb-4">幸福与生活的意义</h3>
              <p class="text-blue-100">
                在物质丰富但精神焦虑的时代，什么是真正的幸福？如何找到生活的意义和目的？古老的哲学智慧如何帮助我们应对现代生活的挑战？
              </p>
            </div>
          </div>
        </div>
        
        <div class="mt-16 text-center">
          <a href="#" @click.prevent="$emit('navigate', 'chat')" class="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            与AI探讨哲学问题
          </a>
        </div>
      </div>
    </div>

    <!-- 第四屏 - 邀请思考 -->
    <div id="journey" class="bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">开启你的哲学之旅</h2>
        <p class="text-xl text-blue-100 mb-10 leading-relaxed">
          探索永恒的问题，寻找属于自己的答案
        </p>
        <button class="px-8 py-3 bg-white text-blue-600 rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transition-shadow duration-300">
          加入讨论
        </button>
      </div>
    </div>

    <!-- 新增部分：哲学书斋 -->
    <div id="library" class="bg-gray-50 dark:bg-gray-800 py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">哲学书斋</h2>
          <div class="w-24 h-1 bg-blue-500 mx-auto"></div>
          <p class="text-gray-600 dark:text-gray-300 mt-6 max-w-3xl mx-auto">
            探索经典哲学著作，拓展思想边界。这里收录了从古希腊到现代的重要哲学著作，带您踏上智慧之旅。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 书籍卡片 1 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-xl overflow-hidden group">
            <div class="h-48 bg-blue-100 dark:bg-blue-900/30 relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-blue-800 dark:text-blue-300 text-5xl font-serif">P</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-4 text-white">
                  <p class="font-medium">古希腊哲学奠基之作</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">《理想国》</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">柏拉图</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                柏拉图的代表作，探讨理想社会的构建、正义的本质、教育的意义，以及哲学家治国的理念。通过对话形式呈现的哲学经典。
              </p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-xs text-gray-400 dark:text-gray-500">公元前 380 年</span>
                <button class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                  了解更多
                </button>
              </div>
            </div>
          </div>

          <!-- 书籍卡片 2 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-xl overflow-hidden group">
            <div class="h-48 bg-blue-100 dark:bg-blue-900/30 relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-blue-800 dark:text-blue-300 text-5xl font-serif">E</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-4 text-white">
                  <p class="font-medium">西方伦理学奠基之作</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">《尼各马可伦理学》</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">亚里士多德</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                亚里士多德关于伦理学的重要著作，探讨了善、美德、幸福、快乐、友谊等伦理概念，影响了西方伦理思想两千多年。
              </p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-xs text-gray-400 dark:text-gray-500">公元前 350 年</span>
                <button class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                  了解更多
          </button>
              </div>
            </div>
          </div>

          <!-- 书籍卡片 3 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-xl overflow-hidden group">
            <div class="h-48 bg-blue-100 dark:bg-blue-900/30 relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-blue-800 dark:text-blue-300 text-5xl font-serif">M</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-4 text-white">
                  <p class="font-medium">存在主义代表作</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">《存在与时间》</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">马丁·海德格尔</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                海德格尔的重要著作，从现象学角度探讨人类存在的本质，思考"此在"、"世界性"、"时间性"等基本概念，开创了现代存在主义哲学。
              </p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-xs text-gray-400 dark:text-gray-500">1927 年</span>
                <button class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                  了解更多
          </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <button class="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg">
            浏览更多书籍
          </button>
        </div>
      </div>
    </div>
    
    <!-- 新增部分：哲学讨论区 -->
    <div id="discussion" class="bg-gray-900 text-white py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">思想碰撞</h2>
          <div class="w-24 h-1 bg-blue-500 mx-auto"></div>
          <p class="text-gray-300 mt-6 max-w-3xl mx-auto">
            加入哲学讨论，与志同道合者共同探讨宇宙、生命与意识的终极问题。
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="space-y-6">
              <!-- 讨论主题 1 -->
              <div class="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span class="font-bold text-blue-800">知</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2">意识的本质：我们如何理解主观体验？</h3>
                    <p class="text-gray-300 mb-4">
                      关于意识难题的讨论：物理脑如何产生主观体验？意识是否可以通过物理过程完全解释？探讨心灵哲学中最具挑战性的问题。
                    </p>
                    <div class="flex justify-between items-center text-sm">
                      <div class="flex items-center gap-4">
                        <span class="text-gray-400">32 个回复</span>
                        <span class="text-gray-400">最后更新于 2 小时前</span>
                      </div>
                      <button class="text-blue-400 hover:text-blue-300 transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 讨论主题 2 -->
              <div class="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span class="font-bold text-blue-800">善</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2">道德相对主义与普遍价值</h3>
                    <p class="text-gray-300 mb-4">
                      道德价值是否具有普遍性？不同文化的道德体系如何评价？探讨伦理学中相对主义与绝对主义的争论，以及跨文化道德判断的可能性。
                    </p>
                    <div class="flex justify-between items-center text-sm">
                      <div class="flex items-center gap-4">
                        <span class="text-gray-400">48 个回复</span>
                        <span class="text-gray-400">最后更新于 1 天前</span>
                      </div>
                      <button class="text-blue-400 hover:text-blue-300 transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div class="bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold mb-4">热门标签</h3>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#存在主义</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#人工智能伦理</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#意识哲学</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#自由意志</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#现象学</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#形而上学</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#逻辑学</span>
                <span class="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">#知识论</span>
              </div>
              
              <h3 class="text-xl font-bold mb-4">加入讨论</h3>
              <p class="text-gray-300 mb-4">
                与志同道合者一起探讨哲学问题，分享您的思考与见解。
              </p>
              <button class="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                创建话题
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="bg-black text-gray-400 py-10 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <div class="mb-4">
          <span class="text-xl font-semibold text-white">哲学殿堂</span>
        </div>
        <div class="flex justify-center space-x-6 mb-4">
          <a href="#" class="text-gray-400 hover:text-white transition-colors">关于我们</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">使用条款</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">隐私政策</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">联系我们</a>
        </div>
        <p>© 2023 哲学殿堂 | 思想的艺术</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// 路由器
const router = useRouter();

// 返回顶部按钮显示状态
const showNavbar = ref(false);

// 当前时间
const displayTime = ref('15:03:45');
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

// 强制页面滚动（兜底方案）
function forceScroll() {
  // 创建一个标记点并滚动到该位置
  const thoughtsSection = document.getElementById('thoughts');
  if (thoughtsSection) {
    // 尝试多种滚动方式
    setTimeout(() => {
      // 方法1: scrollIntoView
      thoughtsSection.scrollIntoView({ behavior: 'smooth' });
      
      // 方法2: 设置滚动位置
      setTimeout(() => {
        if (window.scrollY < 10) {
          const offset = thoughtsSection.getBoundingClientRect().top;
          window.scrollTo(0, offset);
        }
      }, 100);
      
      // 方法3: 使用锚点链接
      setTimeout(() => {
        if (window.scrollY < 10) {
          window.location.hash = 'thoughts';
          // 移除哈希以防止URL改变
          setTimeout(() => {
            history.replaceState("", document.title, window.location.pathname + window.location.search);
          }, 100);
        }
      }, 200);
    }, 0);
  } else {
    // 如果找不到元素，至少滚动一个屏幕高度
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }
}

// 滚动到指定区域
function scrollToSection(sectionId) {
  if (sectionId === 'hero' || sectionId === 'top') {
    // 如果是回到顶部，直接滚动到0位置
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }
}

// 处理滚动事件
function handleScroll() {
  // 只有滚动超过一定距离时才显示返回顶部按钮
  if (window.scrollY > 200) {
    showNavbar.value = true;
  } else {
    showNavbar.value = false;
  }
}

// 定时更新时间
let timer;

// 隐藏加载消息
function hideLoadingMessages() {
  const messages = document.querySelectorAll('.error-message, [class*="error-"], div[role="alert"]');
  messages.forEach(message => {
    if (message) {
      message.style.display = 'none';
    }
  });
}

// 显式滚动到思想区域
function scrollToThoughts() {
  // 滚动一个屏幕高度
  try {
    // 方法1: 使用scrollTo
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
    
    // 方法2: 直接滚动到thoughts区域
    setTimeout(() => {
      const thoughtsSection = document.getElementById('thoughts');
      if (thoughtsSection && window.scrollY < 10) {
        thoughtsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    
    // 方法3: 强制设置scrollTop
    setTimeout(() => {
      if (window.scrollY < 10) {
        document.documentElement.scrollTop = window.innerHeight;
        document.body.scrollTop = window.innerHeight; // Safari兼容
      }
    }, 200);
  } catch (e) {
    console.error('滚动失败:', e);
    // 降级方案
    const thoughtsSection = document.getElementById('thoughts');
    if (thoughtsSection) {
      thoughtsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScroll);
  
  // 确保滚动行为正常
  document.documentElement.style.scrollBehavior = 'smooth';
  document.body.style.overflowY = 'auto';
  document.documentElement.style.overflowY = 'auto';
  
  // 强制启用滚动
  document.body.style.height = 'auto';
  document.documentElement.style.height = 'auto';
  document.body.style.overflow = 'visible';
  document.documentElement.style.overflow = 'visible';
  
  // 重置可能的阻止滚动的样式
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = 'visible';
    appElement.style.height = 'auto';
  }
  
  // 添加锚点处理
  if (window.location.hash === '#thoughts') {
    setTimeout(() => {
      const thoughtsSection = document.getElementById('thoughts');
      if (thoughtsSection) {
        thoughtsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }
  
  // 监听点击事件，防止滚动阻塞
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-scroll]') || e.target.closest('button') || e.target.closest('a')) {
      // 尝试模拟wheel事件触发滚动
      const wheelEvent = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: 100
      });
      window.dispatchEvent(wheelEvent);
    }
  });
  
  // 隐藏加载消息
  hideLoadingMessages();
  
  // 确保页面可以正常滚动
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    hideLoadingMessages(); // 确保效果
    
    // 再次确保滚动可用
    document.body.style.overflow = 'visible';
    document.documentElement.style.overflow = 'visible';
  }, 500);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  
  // 移除滚动事件监听
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* 仅当显示错误信息时隐藏 */
.error-message, 
[class*="error-"], 
div[role="alert"] {
  display: none !important;
}

/* 确保body可以滚动 */
html, body {
  height: auto !important;
  min-height: 100%;
  overflow: visible !important;
  overflow-y: auto !important;
  scroll-behavior: smooth !important;
}

/* 确保主容器不限制滚动 */
#app, 
#root, 
.app-container, 
main, 
.main-content,
.home-page,
.home-page > * {
  height: auto !important;
  min-height: 100vh;
  overflow: visible !important;
  overflow-y: auto !important;
}
</style>

<style scoped>
.philosophy-hero {
  background-image: url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh; /* 确保首屏占满视口高度 */
  min-height: 100vh;
  position: relative;
}

.home-page {
  min-height: 100vh;
  height: auto !important;
  overflow-y: auto !important;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  display: block;
}

/* 确保z-index足够高但不至于过高 */
button.fixed {
  z-index: 10;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 添加滚动动画 */
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
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

button.back-to-top-btn {
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  max-width: 48px !important;
  max-height: 48px !important;
  border-radius: 50% !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: #2563eb !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  border: none !important;
  outline: none !important;
  transform-origin: center !important;
  transition: all 0.3s ease !important;
}

/* 确保按钮容器始终固定在右下角 */
.back-to-top-container {
  position: fixed !important;
  bottom: 2rem !important;
  right: 2rem !important;
  z-index: 9999 !important;
  pointer-events: auto !important;
}
</style> 