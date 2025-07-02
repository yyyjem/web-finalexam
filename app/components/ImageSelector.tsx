'use client'

import { useState, useEffect } from 'react'
import { Folder, Image as ImageIcon, RefreshCw } from 'lucide-react'

interface ImageSelectorProps {
  onSelect: (imagePath: string) => void
  currentValue: string
}

export default function ImageSelector({ onSelect, currentValue }: ImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 从API获取图片列表
  const loadAvailableImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/images')
      const data = await response.json()
      
      if (data.success) {
        setAvailableImages(data.images)
      } else {
        console.error('加载图片列表失败:', data.error)
        setAvailableImages([])
      }
    } catch (error) {
      console.error('加载图片列表失败:', error)
      setAvailableImages([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadAvailableImages()
    }
  }, [isOpen])

  const handleImageSelect = (imagePath: string) => {
    onSelect(imagePath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <Folder className="w-4 h-4 mr-1" />
        浏览图片
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-800">选择图片</h3>
              <button
                type="button"
                onClick={loadAvailableImages}
                disabled={isLoading}
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              从 public/picture/ 文件夹选择图片
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto p-3">
            {isLoading ? (
              <div className="text-center py-4 text-gray-500">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                加载中...
              </div>
            ) : availableImages.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">没有找到图片</p>
                <p className="text-xs mt-1">请将图片放在 public/picture/ 文件夹中</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {availableImages.map((imagePath) => (
                  <button
                    key={imagePath}
                    type="button"
                    onClick={() => handleImageSelect(imagePath)}
                    className={`relative group border-2 rounded-md overflow-hidden transition-all ${
                      currentValue === imagePath 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={imagePath}
                        alt={imagePath.split('/').pop()}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xs text-gray-400"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>'
                          }
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {imagePath.split('/').pop()}
                    </div>
                    {currentValue === imagePath && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                或手动输入路径
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 