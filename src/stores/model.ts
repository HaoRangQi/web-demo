import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface Model {
  id: string
  name: string
  description: string
  colorClass: string
  apiId: string
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  thinking?: string
  timestamp: number
  model?: string
}

export interface Conversation {
  id: string
  modelId: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export const useModelStore = defineStore('model', () => {
  // 模型列表
  const models = ref<Model[]>([
    {
      id: 'deepseek-r1',
      name: 'DeepSeek R1',
      description: 'DeepSeek的R1模型，强大的通用能力',
      colorClass: 'bg-green-500',
      apiId: 'deepseek-r1'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Anthropic的Claude模型，卓越的理解和生成能力',
      colorClass: 'bg-purple-500',
      apiId: 'claude'
    },
    {
      id: 'deepclaude',
      name: 'DeepClaude',
      description: '混合模型，结合了多种模型的优势',
      colorClass: 'bg-indigo-500',
      apiId: 'deepclaude'
    }
  ])

  // 当前选中的模型ID
  const activeModelId = ref('deepseek-r1')

  // 会话列表
  const conversations = ref<Conversation[]>([])

  // 当前活跃的会话ID
  const activeConversationId = ref<string | null>(null)

  // 获取当前选中的模型
  const activeModel = computed(() => {
    return models.value.find(model => model.id === activeModelId.value) || models.value[0]
  })

  // 获取当前活跃的会话
  const activeConversation = computed(() => {
    if (!activeConversationId.value) return null
    return conversations.value.find(conv => conv.id === activeConversationId.value) || null
  })

  // 创建新会话
  function createConversation(modelId: string) {
    const id = uuidv4()
    const now = Date.now()
    const newConversation: Conversation = {
      id,
      modelId,
      title: '新会话',
      messages: [],
      createdAt: now,
      updatedAt: now
    }
    
    conversations.value.push(newConversation)
    activeConversationId.value = id
    return id
  }

  // 添加消息到会话
  function addMessageToConversation(
    conversationId: string, 
    role: 'user' | 'assistant' | 'system', 
    content: string,
    thinking?: string
  ) {
    const conversation = conversations.value.find(conv => conv.id === conversationId)
    if (!conversation) return
    
    conversation.messages.push({
      role,
      content,
      thinking,
      timestamp: Date.now()
    })
    
    conversation.updatedAt = Date.now()
    
    // 如果是第一条用户消息，更新会话标题
    if (role === 'user' && conversation.messages.filter(m => m.role === 'user').length === 1) {
      conversation.title = content.substring(0, 30) + (content.length > 30 ? '...' : '')
    }
  }

  // 切换模型
  function setActiveModel(modelId: string) {
    activeModelId.value = modelId
  }

  // 切换会话
  function setActiveConversation(conversationId: string) {
    activeConversationId.value = conversationId
  }

  // 保存会话消息
  function saveConversation(messages: { role: string; content: string; thinking?: string }[]) {
    if (!activeConversationId.value) {
      // 如果没有活跃会话，创建新会话
      const id = createConversation(activeModelId.value)
      activeConversationId.value = id
    }
    
    const conversation = conversations.value.find(conv => conv.id === activeConversationId.value)
    if (!conversation) return
    
    // 更新会话消息
    conversation.messages = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
      thinking: msg.thinking,
      timestamp: Date.now()
    }))
    
    conversation.updatedAt = Date.now()
    
    // 如果没有标题，使用第一条用户消息作为标题
    if (conversation.title === '新会话') {
      const firstUserMessage = messages.find(m => m.role === 'user')
      if (firstUserMessage) {
        conversation.title = firstUserMessage.content.substring(0, 30) + 
          (firstUserMessage.content.length > 30 ? '...' : '')
      }
    }
  }

  return {
    models,
    activeModelId,
    conversations,
    activeConversationId,
    activeModel,
    activeConversation,
    createConversation,
    addMessageToConversation,
    setActiveModel,
    setActiveConversation,
    saveConversation
  }
}) 