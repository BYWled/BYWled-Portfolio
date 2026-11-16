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
│   │   ├── DemoComponents.jsx # 各项目 Demo
│   │   ├── KoishiPlugins.jsx # Koishi 插件生态区块
│   │   ├── PluginCard.jsx    # 插件卡片
│   │   └── PluginDemos.jsx   # 各插件微缩 Demo
│   ├── data/
│   │   ├── projects.js       # 项目数据配置（含架构分层/核心实现/部署链路）
│   │   └── plugins.js        # Koishi 插件数据配置
│   └── hooks/
│       ├── useStatusData.js  # 状态数据 hook（Upptime 开放 API）
│       ├── useNpmMeta.js     # npm 元数据 hook（版本/许可证/月下载量，30 分钟轮询）
│       └── useSiteDomain.js  # 域名识别 hook
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
- **实时状态监控**: 消费 Upptime (GitHub Actions) 开放汇总 API，展示 24h 平均响应与状态
- **专属 Demo**: 每个项目展示独特的交互式微缩 Demo
- **深度详情弹窗**: 技术架构分层（前端/后端/基建）、核心技术实现、部署链路、GitHub 仓库直达

### 3. Koishi 插件生态
- **插件卡片**: 10 个已发布 npm 的 Koishi 插件，含实时版本、许可证、特性标签
- **实时 npm 元数据**: `registry.npmjs.org/<pkg>/latest` 取版本/许可证 + `api.npmjs.org` 批量接口取月下载量，30 分钟轮询；新版发布后网页自动更新
- **专属微缩 Demo**: K 线引擎、答题倒计时、流式下载、利息结算、排行榜轮换、任务状态流转、兑换码生成、聊天气泡掉币、抽奖概率条、信用分仪表盘
- **双出口链接**: 每卡片直达 npm 主页与 GitHub 源码

### 4. 路由拓扑系统
- **别名切换**: 演示 bywled.me / bywled.tech 别名路由
- **重写引擎列表**: 展示 Cloudflare Rules 代理配置

### 5. 状态监控集成
- **数据源**: [wled-status 仓库](https://github.com/BYWled/wled-status) (Upptime) 的 `history/summary.json`，GitHub Actions 每日自动更新
- **刷新频率**: 每 5 分钟（raw.githubusercontent CDN 缓存约 5 分钟）
- **降级策略**: API 失败时保留上次成功数据，绝不展示模拟状态
- **覆盖范围**: www / blog / store / admin / score / city 六个主站（tools 尚未纳入监控，卡片显示 NO MONITOR）

## 📊 项目清单

| 项目 | 线上地址 | 源码仓库 | 部署形态 |
|------------|------|-----|------|
| 个人前端项目 | https://www.wled.top | [BYWled-Portfolio](https://github.com/BYWled/BYWled-Portfolio) | Cloudflare Workers |
| 伴莺的小窝 | https://blog.wled.top | [Ying-of-Me](https://github.com/BYWled/Ying-of-Me) | Workers + GitHub Pages |
| 伴莺的工具箱 | https://tools.wled.top | [ying-of-tools](https://github.com/BYWled/ying-of-tools) | Workers + GitHub Pages |
| 光谱平台 | https://score.wled.top | [all-in-it](https://github.com/BYWled/all-in-it) | Workers + VPS 后端 (api-score) |
| React Admin System | https://admin.wled.top | [admin-system](https://github.com/BYWled/admin-system) | Workers + VPS 后端 (api-admin) |
| 智慧主城新区 | https://city.wled.top | [city](https://github.com/BYWled/city) | Workers (OpenNext) |
| 乐购商城 | https://store.wled.top | [lego_store](https://github.com/BYWled/lego_store) | Cloudflare Workers |

> 状态站已收敛为 GitHub Actions 驱动的 Upptime（https://mirror-status.wled.top ），原 Uptime Kuma 自建节点已下线。

## 🧩 Koishi 插件清单

| 插件 | npm 包 | 许可证 |
|------|--------|--------|
| Monetary Bourse | koishi-plugin-monetary-bourse | GPL-3.0 |
| Driver Exam | koishi-plugin-driver-exam | MIT |
| Anime RSS | koishi-plugin-anime-rss | MIT |
| Monetary Bank | koishi-plugin-monetary-bank | MIT |
| Jrys-Fix Ranks | koishi-plugin-jrys-fix-ranks | MIT |
| Monetary Mission | koishi-plugin-monetary-mission | MIT |
| Monetary CDK | koishi-plugin-monetary-cdk | MIT |
| Chat Reward | koishi-plugin-monetary-chat-reward | MIT |
| Monetary Lottery | koishi-plugin-monetary-lottery | MIT |
| Monetary Extra | koishi-plugin-monetary-extra | MIT |

> **版本号与下载量均为实时数据**：由 `useNpmMeta` 从 npm Registry 拉取（`registry.npmjs.org/<pkg>/latest` 取版本/许可证，`api.npmjs.org` 批量接口取月下载量），30 分钟轮询；插件发布新版后网页自动更新，无需改代码。`plugins.js` 中的 `fallbackVersion` 仅在 npm 拉取失败时兜底展示。
> 插件实现详情见各 GitHub 仓库或本地 `E:\koishi-app\external\`。

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
- **状态刷新**: 5min 间隔

## 🔧 配置说明

### 项目数据配置
在 `src/data/projects.js` 中配置项目信息：

```javascript
{
  id: "project-id",
  title: "项目标题",
  subtitle: "项目副标题",
  description: "项目描述",
  tagline: "一句话标签",
  techs: ["Tech1", "Tech2"],
  stack: {                          // 架构分层（弹窗展示）
    frontend: ["..."],
    backend: ["..."],               // 无后端项目填说明性条目
    infra: ["..."]
  },
  highlights: [                     // 核心技术实现（title + detail）
    { title: "...", detail: "..." }
  ],
  pipeline: ["git push", "CI 构建", "部署生效"],  // 部署链路
  repo: "https://github.com/...",   // 源码仓库
  mobileFriendly: true,
  mainUrl: "https://example.com",
  mirrorUrl: "https://mirror.example.com",
  infrastructure: {
    provider: "Cloudflare Workers",
    workerName: "worker-name"
  },
  accentGradient: "from-[#fff] to-[#000]",
  themeColor: "#ffffff"
}
```

### 监控配置
在 `src/hooks/useStatusData.js` 中配置监控映射：

```javascript
const STATUS_SUMMARY_URL = 'https://raw.githubusercontent.com/BYWled/wled-status/main/history/summary.json';

// 项目 ID → 被监控站点 URL
export const MONITOR_MAP = {
  www: 'https://www.wled.top',
  blog: 'https://blog.wled.top',
  // ...
};
```

## 📝 开发指南

### 添加新项目
1. 在 `src/data/projects.js` 添加项目数据（含 stack / highlights / pipeline / repo）
2. 在 `src/components/DemoComponents.jsx` 添加专属 Demo
3. 在 `src/components/ProjectCard.jsx` 注册 Demo
4. 如纳入监控：在 `wled-status` 仓库的 `.upptimerc.yml` 添加站点，并在 `useStatusData.js` 的 `MONITOR_MAP` 添加 URL 映射

### 修改样式
- 全局样式: `src/index.css`
- 组件样式: 使用 Tailwind CSS 类名
- 动画样式: `src/App.jsx` 中的 `GLOBAL_STYLES`

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
- **状态监控**: https://mirror-status.wled.top（GitHub Actions · Upptime）
- **GitHub**: https://github.com/BYWled
