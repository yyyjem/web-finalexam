import { NextRequest, NextResponse } from 'next/server'

const DEEPSEEK_API_KEY = 'sk-3cfefa26ccc44561a6014aa01da5859f'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // 构建消息历史
    const messages = [
      {
        role: 'system',
        content: '你是一个友善且有帮助的AI助手。请用中文回答问题，保持回答有深度。'
      },
      // 添加历史消息（保留最近10条对话）
      ...history.slice(-10).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      // 添加当前用户消息
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('DeepSeek API Error:', errorData)
      throw new Error(`API请求失败: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('API返回数据格式错误')
    }

    const assistantMessage = data.choices[0].message.content

    return NextResponse.json({
      message: assistantMessage,
      success: true
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    return NextResponse.json({
      message: '抱歉，我现在无法回答您的问题。请稍后再试。',
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
} 