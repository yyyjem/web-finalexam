'use client'

import Link from 'next/link'
import { BookOpen, MessageCircle, User, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            欢迎来到袁畅的个人空间
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            这里展示我的学习成果和课程练习，同时提供AI智能问答服务
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 课程展示卡片 */}
          <Link href="/portfolio" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                个人课程展示
              </h2>
              <p className="text-gray-600 text-center mb-6">
                浏览我的学习作品集，包含图片、链接和详细描述
              </p>
              <div className="flex items-center justify-center text-blue-600 font-medium">
                <span>进入展示页面</span>
                <User className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* AI问答卡片 */}
          <Link href="/chat" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                AI智能问答
              </h2>
              <p className="text-gray-600 text-center mb-6">
                您可以问AI小助手任何问题，来获得智能回答和建议
              </p>
              <div className="flex items-center justify-center text-purple-600 font-medium">
                <span>开始对话</span>
                <Sparkles className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            选择上方功能开始探索吧～ ✨
          </p>
        </div>
      </div>
    </div>
  )
} 