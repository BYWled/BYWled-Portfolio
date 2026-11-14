// 项目数据配置 —— 功能与技术信息依据线上仓库实况核实 (2026-11)
// 展示原则：前端边缘分发的公开架构可以展示；后端节点的供应商、端口、进程与库名等
// 部署细节一律脱敏（内部拓扑以 VPS 运维文档为唯一可信源，严禁同步到展示层）
export const PROJECTS = [
  {
    id: "www",
    title: "个人前端项目",
    subtitle: "沉浸式生态大本营",
    description: "你正在浏览的门户主页。React 19 + Vite 8 + Tailwind v4 构建的单页应用：CSS Scroll Snap 全屏吸附布局、原生 Canvas 粒子引擎、3D 磁吸卡片与实时节点遥测，托管于 Cloudflare 边缘。",
    tagline: "React 19 单页应用，沉浸式极简黑画布",
    techs: ["React 19", "Vite 8", "Tailwind CSS v4", "Canvas API", "Cloudflare Workers"],
    stack: {
      frontend: ["React 19.2", "Vite 8.1", "Tailwind CSS v4", "lucide-react"],
      backend: ["无服务端 — 纯静态单页应用"],
      infra: ["Cloudflare Workers 静态资产 (ying-of-me)", "GitHub / Gitee 双远端"]
    },
    highlights: [
      { title: "CSS Scroll Snap 全屏吸附布局", detail: "html/body 强制 overflow:hidden 后滚动权移交容器，snap-mandatory 逐屏吸附；项目网格在内层容器独立溢出滚动，防止内容截断。" },
      { title: "原生 Canvas 粒子引擎", detail: "requestAnimationFrame 驱动，鼠标 200px 半径物理影响、速度上限钳位与边缘反弹；粒子数按视口面积动态配额（上限 80），60fps 无卡顿。" },
      { title: "3D 磁吸卡片与模态动画状态机", detail: "TiltCard 基于指针坐标实时计算 rotateX/Y 视差；AnimatedModal 以 isRendered 延迟卸载，保证关闭动画完整播完后再移除 DOM。" },
      { title: "实时节点遥测", detail: "消费 Upptime (GitHub Actions) 开放汇总 API，渲染各节点 24h 平均响应与在线率，失败时保留上次数据绝不显示假状态。" }
    ],
    pipeline: ["git push", "Cloudflare Workers Builds 自动构建", "wrangler deploy 边缘生效"],
    repo: "https://github.com/BYWled/BYWled-Portfolio",
    mobileFriendly: true,
    mainUrl: "https://www.wled.top",
    mirrorUrl: "https://mirror.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "ying-of-me",
      dnsProxy: true
    },
    accentGradient: "from-[#ffffff] to-[#999999]",
    themeColor: "#ffffff"
  },
  {
    id: "blog",
    title: "伴莺的小窝",
    subtitle: "个人博客生态系统",
    description: "Hexo 静态博客 + 构建期生成的 RESTful JSON 数据层：同一份 API 同时驱动 Web 端与微信小程序端，内容同源零漂移。GitHub Pages 与 Cloudflare Workers 主备双轨托管。",
    tagline: "Hexo 静态编译 + 构建期 JSON API，双端同源",
    techs: ["Hexo", "RESTful JSON API", "Vue 3", "uni-app", "GitHub Pages"],
    stack: {
      frontend: ["Hexo 静态站点", "EJS 模板主题", "search.json 全文检索索引"],
      backend: ["构建期 JSON API：/api/posts · site · tags · categories", "uni-app (Vue 3) 微信小程序端消费同一 API"],
      infra: ["GitHub Pages 镜像 (Ying-of-Me 仓库)", "Cloudflare Workers 反代主站"]
    },
    highlights: [
      { title: "构建期生成 RESTful JSON 数据层", detail: "Hexo 编译时产出 posts.json / site.json / tags.json / categories.json 等静态接口，零服务器成本为小程序端供数，天然抗流量冲击。" },
      { title: "一份数据双端复用", detail: "微信小程序端 (Vue 3 + uni-app) 直接消费 Web 端同一 JSON API，两端内容严格同源，无同步脚本、无数据漂移。" },
      { title: "主备双轨托管", detail: "GitHub Pages 承载 mirror-blog 镜像分流，Cloudflare Workers 反代主站；任一通道故障时另一通道全量兜底。" }
    ],
    pipeline: ["hexo g 编译产物", "推送 GitHub Pages", "Cloudflare Workers 反代回源"],
    repo: "https://github.com/BYWled/Ying-of-Me",
    mobileFriendly: true,
    mainUrl: "https://blog.wled.top",
    mirrorUrl: "https://mirror-blog.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers + GitHub Pages",
      workerName: "ying-of-me",
      dnsProxy: true
    },
    accentGradient: "from-[#6a4cf5] to-[#d44df0]",
    themeColor: "#6a4cf5"
  },
  {
    id: "tools",
    title: "伴莺的工具箱",
    subtitle: "纯前端文件工具集",
    description: "57 个纯前端文件工具：格式转换 / PDF / 图片 / GIF / 音视频 / OCR。基于 ffmpeg.wasm 等 WASM 引擎在浏览器本地完成全部处理，文件永不上传；多 CDN 容错加载与 Cache API 持久缓存保证离线可用。",
    tagline: "57 个纯前端工具，WASM 引擎本地处理",
    techs: ["React 19", "TypeScript", "Tailwind CSS v4", "zustand", "ffmpeg.wasm"],
    stack: {
      frontend: ["React 19 + Vite 8", "TypeScript", "Tailwind CSS v4", "zustand v5", "react-router 7"],
      backend: ["无后端 — 全部由浏览器端 WASM 引擎完成", "jSquash / pdf-lib / pdf.js / qpdf-wasm / tesseract.js / gifenc"],
      infra: ["Cloudflare Workers (ying-of-tools)", "GitHub Pages 镜像 (mirror-tools)", "多 CDN 引擎分发 + Cache API"]
    },
    highlights: [
      { title: "57 个工具，文件永不上传", detail: "格式转换（PNG/JPG/WebP/AVIF/JXL/HEIC/音视频/文档）、PDF 合并拆分压缩加密、OCR、二维码、录音与 TTS 等全部在本地浏览器完成，隐私零外泄。" },
      { title: "ffmpeg.wasm 多 CDN 容错加载", detail: "核心 wasm 依次经 fastly → testingcf → jsdelivr → unpkg 容错下载，写入 Cache API 持久缓存（首次成功后离线可用）；多线程核心失败自动回退单线程。" },
      { title: "按需动态 import 引擎", detail: "重依赖按工具分支懒加载：每个工具只下载自己需要的解析器（图片/PDF/GIF/文档引擎互不拖累），首屏体积不受 57 个工具拖累。" },
      { title: "跨源隔离解锁多线程", detail: "public/_headers 注入 COEP/COOP 响应头解锁 SharedArrayBuffer，ffmpeg 多线程在 Workers 边缘环境可用。" },
      { title: "每工具独立 SEO", detail: "构建期生成 tool/xxx.html clean URL 与专属 meta（generate-seo 脚本），配合 Workers SPA 回退实现搜索引擎收录。" }
    ],
    pipeline: ["git push", "Cloudflare Workers Builds (pnpm build + wrangler deploy)", "并行 GitHub Actions 部署 Pages 镜像"],
    repo: "https://github.com/BYWled/ying-of-tools",
    mobileFriendly: true,
    mainUrl: "https://tools.wled.top",
    mirrorUrl: "https://mirror-tools.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers + GitHub Pages",
      workerName: "ying-of-tools",
      dnsProxy: true
    },
    accentGradient: "from-[#00c896] to-[#0ea5e9]",
    themeColor: "#00c896"
  },
  {
    id: "score",
    title: "光谱平台",
    subtitle: "多维全媒体深度评测平台",
    description: "邀请制全媒体评测社区。React 19 + TanStack 系前台，Express + TypeScript 后端承载多维加权评分模型、Redis 点赞去重、TOTP 两步验证与 AI + 人工双重内容治理；后端独立节点常驻，经加密隧道回源。",
    tagline: "加权评分模型 + Redis 风控，全栈双端 TypeScript",
    techs: ["React 19", "TypeScript", "Express + TS", "MySQL 8", "Redis 7", "Cloudflare Tunnel"],
    stack: {
      frontend: ["React 19 + Vite 8 (@cloudflare/vite-plugin)", "Tailwind v4 + shadcn/ui 风格组件", "TanStack Query / Table / Virtual", "Zustand v5 + React Router v7", "Motion (Framer Motion) + dnd-kit"],
      backend: ["Express + TypeScript (Node 22)", "mysql2 连接池", "Redis 客户端 (Sets/缓存)", "bcrypt + otplib TOTP + nodemailer"],
      infra: ["前端 Cloudflare Workers (all-in-it)", "后端独立 VPS 常驻进程", "加密隧道回源 api-score.wled.top", "git push 自动化 CI 热重载"]
    },
    highlights: [
      { title: "多维加权评分引擎", detail: "可版本化的评分模板驱动加权平均公式，[0,10] 强制分值钳位；跨平台数据聚合（Bangumi / TMDB / Steam）统一同构呈现。" },
      { title: "Redis Sets 点赞去重", detail: "内存 Set 拦截并发重复点赞，脏数据定时异步回写 MySQL，避免高并发下行锁死锁。" },
      { title: "双因素安全链路", detail: "bcrypt 密码散列 + otplib TOTP 两步登录（预留 Passkey）+ nodemailer 受邀邮箱核销，邀请制全生命周期溯源。" },
      { title: "AI + 人工双重内容治理", detail: "AI 预过滤前置 + 人工审核队列兜底，豁免锁智能纠偏，管理端 7 页后台覆盖用户/评测/邀请/审计全流程。" },
      { title: "前端工程化细节", detail: "Axios 统一拦截器（Bearer 注入 / 401 全局登出 / silent 豁免）、TanStack Virtual 长列表虚拟化、图片代理签名与分享海报 Canvas 渲染。" }
    ],
    pipeline: ["git push", "CI 自动拉取与编译", "平滑热重载 · 前端边缘部署"],
    repo: "https://github.com/BYWled/all-in-it",
    mobileFriendly: false,
    mainUrl: "https://score.wled.top",
    mirrorUrl: "https://mirror-score.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers + 独立 VPS",
      workerName: "all-in-it",
      dnsProxy: true
    },
    accentGradient: "from-[#d44df0] to-[#6a4cf5]",
    themeColor: "#d44df0"
  },
  {
    id: "admin",
    title: "React Admin System",
    subtitle: "企业级通用中后台控制面板",
    description: "React 19 + Ant Design 6 + ECharts 6 前端，Express + JWT + MySQL 后端独立节点常驻。生产/演示双库数据隔离，git push 即自动构建热重载的 CI 闭环。",
    tagline: "React 19 + Antd 6 中后台，JWT 双库隔离",
    techs: ["React 19", "Vite 7", "Ant Design 6", "ECharts 6", "Express + JWT", "MySQL"],
    stack: {
      frontend: ["React 19 + Vite 7", "Ant Design 6 + Sass", "ECharts 6 数据看板", "react-router-dom 7 + axios"],
      backend: ["Express (sell-serve)", "express-jwt + jsonwebtoken 无状态鉴权", "multer / multiparty 文件上传", "EJS 服务端模板"],
      infra: ["前端 Cloudflare Workers (admin-system)", "后端独立 VPS 常驻进程", "加密隧道回源 api-admin.wled.top", "MySQL 生产/演示双库隔离"]
    },
    highlights: [
      { title: "JWT 无状态鉴权体系", detail: "express-jwt 路由守卫中间件 + js-md5 凭证摘要，登录态签发、校验与生命周期统一在中间件层闭环。" },
      { title: "生产/演示双库隔离", detail: "生产库与演示库完全隔离的独立 MySQL 实例，demo-admin.wled.top 提供沙箱演示环境。" },
      { title: "ECharts 6 统计看板与导出", detail: "运营数据可视化，html2canvas + jsPDF 报表导出链路。" },
      { title: "富媒体内容管理", detail: "@uiw/react-md-editor Markdown 编辑 + antd-img-crop 图片裁剪，配合 multer/multiparty 双通道上传。" }
    ],
    pipeline: ["git push", "CI 自动拉取与编译", "平滑热重载 · 前端边缘部署"],
    repo: "https://github.com/BYWled/admin-system",
    mobileFriendly: false,
    mainUrl: "https://admin.wled.top",
    mirrorUrl: "https://mirror-admin.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers + 独立 VPS",
      workerName: "admin-system",
      dnsProxy: true
    },
    accentGradient: "from-[#ff7a3d] to-[#ff5577]",
    themeColor: "#ff7a3d"
  },
  {
    id: "city",
    title: "智慧主城新区",
    subtitle: "数字大屏 AI 控制系统",
    description: "城市级数字大屏。Next.js 16 全栈应用经 OpenNext 适配器编译为 Cloudflare Worker 一体化部署，React Compiler 自动优化渲染，融合高德地图 JSAPI 与 Ant Design 6 态势感知组件。",
    tagline: "Next.js 16 + OpenNext 全栈大屏，边缘渲染",
    techs: ["Next.js 16", "React Compiler", "Ant Design 6", "Tailwind v4", "OpenNext Cloudflare", "高德地图 JSAPI"],
    stack: {
      frontend: ["Next.js 16 App Router", "React 19 + React Compiler (babel 插件)", "Ant Design 6 + Tailwind CSS v4", "@amap/amap-jsapi-loader 地理图层"],
      backend: ["Next.js 服务端能力 (App Router SSR)", "编译为单 Worker — 无独立后端进程"],
      infra: ["OpenNext → Cloudflare Workers (city-screen)", "nodejs_compat 兼容层", "wrangler 4 部署"]
    },
    highlights: [
      { title: "OpenNext 全栈上边缘", detail: "@opennextjs/cloudflare 适配器将 Next.js 服务端渲染能力编译为 Cloudflare Worker (nodejs_compat)，SSR 与静态资产一体化边缘交付。" },
      { title: "React Compiler 自动优化", detail: "babel-plugin-react-compiler 编译期自动 memo 化组件树，消除大屏高频数据刷新场景的手动性能优化负担。" },
      { title: "高德地图 JSAPI 城市可视化", detail: "地理数据图层与态势感知图表融合，宽屏监控中心场景适配。" },
      { title: "App Router 服务端首屏", detail: "服务端产出首屏 HTML，大屏设备弱网环境秒开。" }
    ],
    pipeline: ["git push", "opennextjs-cloudflare build", "wrangler deploy 单 Worker 边缘生效"],
    repo: "https://github.com/BYWled/city",
    mobileFriendly: false,
    mainUrl: "https://city.wled.top",
    mirrorUrl: null,
    infrastructure: {
      provider: "Cloudflare Workers (OpenNext)",
      workerName: "city-screen",
      dnsProxy: true
    },
    accentGradient: "from-[#0088ff] to-[#00ffff]",
    themeColor: "#0088ff"
  },
  {
    id: "store",
    title: "乐购商城",
    subtitle: "原生 JavaScript 电商实战项目",
    description: "不依赖任何现代视图层框架的电商闭环：fetch + JSON 数据渲染、localStorage 状态机、原生 Canvas 验证码与算法化交互细节，完整覆盖注册登录到购物车结算全流程。",
    tagline: "零框架原生 DOM 调度，级联状态联动",
    techs: ["HTML5", "CSS3", "Vanilla JS ES6+", "Swiper.js", "localStorage"],
    stack: {
      frontend: ["语义化 HTML5 多页应用", "CSS3 Flexbox + 过渡动画", "ES6+ 原生 DOM 编程", "Swiper.js 轮播"],
      backend: ["JSON 静态数据 + localStorage 模拟数据库 — 零框架零后端"],
      infra: ["静态产物 Cloudflare Workers (lego-store)", "GitHub Pages 镜像"]
    },
    highlights: [
      { title: "零框架电商闭环", detail: "注册 / 登录 / 商品浏览 / 详情 / 购物车结算全流程纯原生 DOM 调度，事件代理驱动级联状态更新。" },
      { title: "localStorage 状态机", detail: "lego-users / lego-current-user / 购物车数据持久化，模拟后端会话保持与数据层。" },
      { title: "原生 Canvas 图形验证码", detail: "随机旋转、噪色与干扰线逐像素绘制，配合正则表单校验完成注册安全链路。" },
      { title: "算法化交互细节", detail: "反比例函数缓动回到顶部、楼层电梯导航平滑跳转、吸顶搜索栏滚动阈值监听、手风琴展开收起。" }
    ],
    pipeline: ["静态产物构建", "推送 Cloudflare Workers 边缘分发"],
    repo: "https://github.com/BYWled/lego_store",
    mobileFriendly: false,
    mainUrl: "https://store.wled.top",
    mirrorUrl: "https://mirror-store.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "lego-store",
      dnsProxy: true
    },
    accentGradient: "from-[#ff5577] to-[#ff7a3d]",
    themeColor: "#ff5577"
  }
];
