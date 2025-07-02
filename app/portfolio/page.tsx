'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Calendar, Link as LinkIcon, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'
import ImageSelector from '../components/ImageSelector'

interface PortfolioItem {
  id: string
  imageUrl?: string
  linkUrl?: string
  description: string
  uploadTime: string
}

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 从本地存储加载数据
  useEffect(() => {
    const savedItems = localStorage.getItem('portfolioItems')
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  // 保存到本地存储
  const saveToLocalStorage = (newItems: PortfolioItem[]) => {
    localStorage.setItem('portfolioItems', JSON.stringify(newItems))
  }

  // 提交新项目
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 验证至少有一个字段不为空
    if (!imageUrl.trim() && !linkUrl.trim() && !description.trim()) {
      alert('请至少填写一个字段')
      setIsSubmitting(false)
      return
    }

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      imageUrl: imageUrl.trim() || undefined,
      linkUrl: linkUrl.trim() || undefined,
      description: description.trim(),
      uploadTime: new Date().toLocaleString('zh-CN')
    }

    const newItems = [newItem, ...items]
    setItems(newItems)
    saveToLocalStorage(newItems)

    // 清空表单
    setImageUrl('')
    setLinkUrl('')
    setDescription('')
    setIsSubmitting(false)
  }

  // 删除项目
  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个项目吗？')) {
      const newItems = items.filter(item => item.id !== id)
      setItems(newItems)
      saveToLocalStorage(newItems)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回主页
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 ml-8">个人课程展示</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 上传表单 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            添加新作品
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* 图片链接输入 */}
                                      <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <ImageIcon className="w-4 h-4 inline mr-1" />
                                图片路径 (可选)
                            </label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="/picture/your-image.jpg"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-gray-500 flex-1">
                                    将图片放在 public/picture/ 文件夹中，然后输入如：/picture/image.jpg
                                </p>
                                <ImageSelector 
                                    onSelect={setImageUrl} 
                                    currentValue={imageUrl} 
                                />
                            </div>
                            {imageUrl && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-600 mb-1">预览：</p>
                                    <div className="w-32 h-20 border rounded overflow-hidden bg-gray-100">
                                        <img
                                            src={imageUrl}
                                            alt="预览"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement
                                                target.style.display = 'none'
                                                const parent = target.parentElement
                                                if (parent) {
                                                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xs text-red-500">图片无法加载</div>'
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

              {/* 网址链接输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-1" />
                  相关链接 (可选)
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 描述输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目描述
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请描述这个项目..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                '添加中...'
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  添加项目
                </>
              )}
            </button>
          </form>
        </div>

        {/* 项目展示 */}
        <div className="grid gap-6">
          <h2 className="text-xl font-semibold text-gray-800">
            我的作品集 ({items.length} 个项目)
          </h2>
          
          {items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="text-gray-400 mb-2">
                <Upload className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">还没有添加任何作品，请使用上方表单添加您的第一个项目</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* 图片展示 */}
                  {item.imageUrl && (
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={item.imageUrl}
                        alt="项目图片"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    {/* 描述 */}
                    {item.description && (
                      <p className="text-gray-800 mb-3 line-clamp-3">{item.description}</p>
                    )}
                    
                    {/* 链接 */}
                    {item.linkUrl && (
                      <div className="mb-3">
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <LinkIcon className="w-4 h-4 mr-1" />
                          访问链接
                        </a>
                      </div>
                    )}
                    
                    {/* 时间和操作 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.uploadTime}
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="删除项目"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 