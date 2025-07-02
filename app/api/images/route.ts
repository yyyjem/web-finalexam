import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const pictureDir = join(process.cwd(), 'public', 'picture')
    
    try {
      const files = await readdir(pictureDir)
      
      // 过滤出图片文件
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
      const imageFiles = files
        .filter(file => {
          const ext = file.toLowerCase().substring(file.lastIndexOf('.'))
          return imageExtensions.includes(ext)
        })
        .map(file => `/picture/${file}`)
        .sort()
      
      return NextResponse.json({
        images: imageFiles,
        success: true
      })
    } catch (dirError) {
      // 如果目录不存在，返回空数组
      return NextResponse.json({
        images: [],
        success: true,
        message: 'Picture directory not found'
      })
    }
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json({
      images: [],
      success: false,
      error: 'Failed to read images'
    }, { status: 500 })
  }
} 