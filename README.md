# BYWLED Portfolio - 个人作品集/门户主页

> 融合现代系统架构的前端主页，专注于打造流畅、高响应强防护的前端工程项目。

## 🚀 技术栈

- **框架**: React 19 + Vite 8
- **样式**: Tailwind CSS v4
- **图标**: Lucide React
- **部署**: Cloudflare Workers

## 📦 安装与运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 🏗️ 项目结构

```
www/
├── public/                    # 静态资源
├── src/
│   ├── App.jsx               # 主应用入口
│   ├── main.jsx              # 入口文件
│   ├── index.css             # 全局样式
│   ├── components/           # 组件目录
│   │   ├── index.js          # 统一导出
│   │   ├── Header.jsx        # 头部导航
│   │   ├── Footer.jsx        # 页脚
│   │   ├── ParticleCanvas.jsx # 粒子画布
│   │   ├── FlippingBadge.jsx # 动态徽章
│   │   ├── TypingSubtitle.jsx # 打字机组件
│   │   ├── TiltCard.jsx      # 3D 磁吸卡片
│   │   ├── AnimatedModal.jsx # 动画模态框
│   │   ├── ProjectCard.jsx   # 项目卡片
│   │   ├── ProjectModal.jsx  # 项目详情弹窗
│   │   └── DemoComponents.jsx # 各项目 Demo
│   ├── data/
│   │   └── projects.js       # 项目数据配置
│   └── hooks/
│       └── useStatusData.js  # 状态数据 hook
├── docs/                     # 文档与参考
├── package.json
├── vite.config.js
├── postcss.config.js
└── tailwind.config.js
```

## 🎯 核心功能

### 1. 沉浸式首屏体验
- **粒子画布**: 基于 Canvas 的交互式粒子系统，光标影响附近粒子物理效果
- **动态徽章**: 3D 翻转动画展示技术栈信息
- **打字机效果**: 中英文循环打字动画

### 2. 项目展示
- **3D 磁吸卡片**: 鼠标追踪的 3D 倾斜效果
- **实时状态监控**: 通过 Uptime Kuma Badge API 获取真实延迟数据
- **专属 Demo**: 每个项目展示独特的交互式微缩 Demo

### 3. 路由拓扑系统
- **别名切换**: 演示 bywled.me / bywled.tech 别名路由
- **重写引擎列表**: 展示 Cloudflare Rules 代理配置

### 4. 状态监控集成
- **数据源**: Uptime Kuma Badge API（无需认证）
- **刷新频率**: 每 30 秒自动刷新
- **降级策略**: API 失败时使用模拟数据

## 📊 监控项目映射

| Monitor ID | 项目 | URL |
|------------|------|-----|
| 2 | 博客（主站） | https://blog.wled.top |
| 3 | 乐购商城 | https://store.wled.top |
| 4 | 后台管理系统 | https://admin.wled.top |
| 10 | 监控 - 服务器部署 | https://status.wled.top |
| 13 | 光谱平台 | https://score.wled.top |
| 15 | 数字大屏 | https://city.wled.top |

## 🎨 设计规范

### 色彩系统
- **主背景**: `#090909`
- **卡片背景**: `#141414`
- **边框**: `#262626`
- **强调色**: `#0099ff`（蓝色）
- **成功色**: `#22c55e`（绿色）

### 动画规范
- **过渡时间**: 300ms ease-out
- **粒子刷新**: 60fps
- **状态刷新**: 30s 间隔

## 🔧 配置说明

### 项目数据配置
在 `src/data/projects.js` 中配置项目信息：

```javascript
{
  id: "project-id",
  title: "项目标题",
  subtitle: "项目副标题",
  description: "项目描述",
  techs: ["Tech1", "Tech2"],
  mobileFriendly: true,
  mainUrl: "https://example.com",
  mirrorUrl: "https://mirror.example.com",
  infrastructure: {
    provider: "Cloudflare Workers",
    workerName: "worker-name"
  }
}
```

### 监控配置
在 `src/hooks/useStatusData.js` 中配置 Uptime Kuma 地址：

```javascript
const UPTIME_KUMA_URL = 'https://status.wled.top';
```

## 📝 开发指南

### 添加新项目
1. 在 `src/data/projects.js` 添加项目数据
2. 在 `src/components/DemoComponents.jsx` 添加专属 Demo
3. 在 `src/hooks/useStatusData.js` 添加 Monitor ID 映射

### 修改样式
- 全局样式: `src/index.css`
- 组件样式: 使用 Tailwind CSS 类名
- 动画样式: `src/App.jsx` 中的 `GLOBAL_STYLES`

### 调试状态数据
- 打开浏览器控制台查看 API 请求
- 检查 `statusData` 状态对象
- 验证 Monitor ID 映射是否正确

## 🚀 部署

### Cloudflare Workers
```bash
# 构建
pnpm build

# 部署到 Cloudflare Workers
wrangler deploy
```

### 其他平台
```bash
# 构建
pnpm build

# 上传 dist 目录到任何静态托管服务
```

## 📄 许可证

Copyright © 2026 BYWLED. All rights reserved.

## 🔗 链接

- **主站**: https://www.wled.top
- **状态监控**: https://status.wled.top
- **GitHub**: https://github.com/BYWled
