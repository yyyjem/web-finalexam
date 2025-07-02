# 个人作品展示与AI智能问答平台

这是一个基于 Next.js 构建的个人作品展示平台，集成了 DeepSeek AI 智能问答功能。

主页面展示：

<img width="1209" alt="截屏2025-06-30 22 00 41" src="https://github.com/user-attachments/assets/aa36f83e-bd00-4105-be57-97c845499afa" />

AI大模型对话页面展示(接入Deepseek，可以问任何问题)：

<img width="1224" alt="截屏2025-06-30 22 01 24" src="https://github.com/user-attachments/assets/9068a9c9-6211-42cd-a18f-e59362baa925" />

作业展示页面(可随时上传新的作业，所有作业已部署至Github可点击链接查看)：

<img width="1169" alt="截屏2025-07-01 14 48 53" src="https://github.com/user-attachments/assets/20edb3b4-c11b-40b1-a61c-939fe5f18e43" />

## 功能特性

### 🎨 个人课程展示
- 支持本地图片展示（从 public/picture/ 文件夹）
- 图片路径输入和可视化选择器
- 支持相关网址链接
- 可添加详细的项目描述
- 实时图片预览功能
- 自动记录上传时间
- 响应式卡片展示布局
- 支持删除项目功能
- 数据本地存储，无需数据库

### 🤖 AI智能问答
- 集成 DeepSeek AI 模型
- 实时对话界面
- 消息历史记录
- 自动滚动到最新消息
- 清空聊天记录功能

## 技术栈

- **前端框架**: Next.js 14 + React 18
- **样式**: Tailwind CSS
- **UI图标**: Lucide React
- **语言**: TypeScript
- **AI模型**: DeepSeek API

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

**方式一：使用PowerShell脚本**
```powershell
.\start-dev.ps1
```

**方式二：！！推荐！！手动启动(终端输入)**
使用traeAI提供部署环境，然后在终端输入口令
```bash
npx next dev
```

**方式三：指定端口启动**
```bash
npm run dev -- --port 3001
```

### 3. 访问应用

开发服务器启动后，脚本会自动显示访问地址，通常为：
- 主页: [http://localhost:3000](http://localhost:3000) 或其他可用端口
- 课程展示: [http://localhost:3000/portfolio](http://localhost:3000/portfolio)
- AI问答: [http://localhost:3000/chat](http://localhost:3000/chat)

## 项目结构

```
├── app/
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 主页面
│   ├── components/
│   │   └── ImageSelector.tsx # 图片选择器组件
│   ├── portfolio/
│   │   └── page.tsx         # 课程展示页面
│   ├── chat/
│   │   └── page.tsx         # AI聊天页面
│   └── api/
│       ├── chat/
│       │   └── route.ts     # DeepSeek API路由
│       └── images/
│           └── route.ts     # 图片列表API路由
├── public/
│   └── picture/             # 项目图片存放目录
│       ├── README.md        # 图片文件夹说明
│       └── sample-images.md # 示例图片说明
├── package.json
├── next.config.js
├── tailwind.config.js
├── start-dev.ps1            # PowerShell启动脚本
├── start.bat                # 批处理启动脚本
├── status.bat               # 项目状态检查脚本
└── tsconfig.json
```

## 使用说明

### 个人课程展示

1. 点击主页的"个人课程展示"卡片
2. 在上传表单中填写：
   - **图片路径**（可选）：
     - 将图片文件放在 `public/picture/` 文件夹中
     - 手动输入路径如：`/picture/your-image.jpg`
     - 或点击"浏览图片"按钮选择已上传的图片
   - **相关链接**（可选）：项目相关的网址
   - **项目描述**：详细描述项目内容
3. 点击"添加项目"提交
4. 项目将显示在下方的作品集中，包含图片预览

### AI智能问答

1. 点击主页的"AI智能问答"卡片
2. 在输入框中输入您的问题
3. 点击发送按钮或按回车键
4. AI将为您提供智能回答

## API配置

项目使用 DeepSeek API，API密钥已配置在 `app/api/chat/route.ts` 文件中。

```typescript
const DEEPSEEK_API_KEY = 'sk-12944905b2974fe2af63a3cbe8c3e238'
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

```bash
npm run build
npm start
```

## 图片功能使用

### 添加图片到项目

1. **准备图片文件**
   - 支持格式：jpg, jpeg, png, gif, webp, svg
   - 建议大小：不超过5MB
   - 文件名建议使用英文和数字

2. **上传图片**
   - 将图片文件复制到 `public/picture/` 文件夹
   - 例如：`public/picture/project1.jpg`

3. **在表单中使用**
   - 手动输入：`/picture/project1.jpg`
   - 或使用"浏览图片"按钮可视化选择

### 图片管理

- 项目会自动扫描 `public/picture/` 文件夹
- 删除项目不会删除图片文件
- 可以重复使用同一张图片

## 注意事项

- 图片路径格式：`/picture/filename.jpg`
- 项目数据存储在浏览器本地存储中
- AI聊天需要网络连接才能正常工作
- 建议使用现代浏览器以获得最佳体验

## 开发

如需进一步开发或自定义，可以修改：

- `app/globals.css` - 调整全局样式
- `tailwind.config.js` - 自定义 Tailwind 配置
- `app/api/chat/route.ts` - 修改 AI API 配置
- 各页面组件 - 添加新功能或修改界面

## 许可证

MIT License 
