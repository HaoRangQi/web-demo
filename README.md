# 大模型聊天展示平台

这是一个基于Vue 3和TypeScript的大模型聊天展示平台，支持多种大模型API的调用和展示。

## 功能特点

- 支持多种大模型（Claude, DeepSeek, DeepClaude等）
- 流式输出展示
- 思考过程可视化（对支持的模型）
- API请求构建和查看
- 暗色/亮色主题切换
- 响应式设计

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Pinia 状态管理
- Element Plus UI组件库
- TailwindCSS
- Axios HTTP客户端
- Marked + Prism.js 代码高亮
