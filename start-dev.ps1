#!/usr/bin/env pwsh

Write-Host "🚀 启动个人作品展示与智能问答平台" -ForegroundColor Green
Write-Host ""
Write-Host "项目信息:" -ForegroundColor Cyan
Write-Host "  📦 框架: Next.js + React + TypeScript" -ForegroundColor White
Write-Host "  🎨 样式: Tailwind CSS" -ForegroundColor White  
Write-Host "  🤖 AI: DeepSeek API" -ForegroundColor White
Write-Host "  💾 存储: 浏览器本地存储" -ForegroundColor White
Write-Host ""

# 检查Node.js和npm版本
Write-Host "检查环境..." -ForegroundColor Yellow
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "  Node.js: $nodeVersion" -ForegroundColor White
Write-Host "  npm: $npmVersion" -ForegroundColor White
Write-Host ""

# 检查依赖
if (!(Test-Path "node_modules")) {
    Write-Host "📦 安装依赖中..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# 查找可用端口
$ports = @(3000, 3001, 3002, 3003)
$availablePort = $null

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if (!$connection) {
        $availablePort = $port
        break
    }
}

if ($availablePort) {
    Write-Host "🌐 启动开发服务器 (端口: $availablePort)..." -ForegroundColor Green
    Write-Host ""
    Write-Host "访问地址:" -ForegroundColor Cyan
    Write-Host "  🏠 主页: http://localhost:$availablePort" -ForegroundColor White
    Write-Host "  📚 课程展示: http://localhost:$availablePort/portfolio" -ForegroundColor White
    Write-Host "  🤖 AI问答: http://localhost:$availablePort/chat" -ForegroundColor White
    Write-Host ""
    Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Red
    Write-Host ""
    
    # 启动开发服务器
    npm run dev -- --port $availablePort
} else {
    Write-Host "❌ 无法找到可用端口，请手动指定端口" -ForegroundColor Red
    Write-Host "   示例: npm run dev -- --port 4000" -ForegroundColor Yellow
} 