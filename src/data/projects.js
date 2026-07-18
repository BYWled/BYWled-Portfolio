// Monitor ID 到 Project ID 的映射 (根据 Uptime Kuma 配置)
export const MONITOR_MAP = {
  '2': 'blog',      // 博客（主站）
  '3': 'store',     // 乐购商城
  '4': 'admin',     // 后台管理系统
  '10': 'status',   // 监控 - 服务器部署
  '13': 'score',    // All in It / 光谱平台
  '15': 'city',     // 数字大屏
};

export const PROJECTS = [
  {
    id: "www",
    title: "个人前端项目",
    subtitle: "沉浸式生态大本营",
    description: "你正在浏览的全新门户主页。基于 React 19 + Tailwind v4 构建的沉浸式项目展览馆，支持 3D 磁吸视差、极客点阵与 CSS 强制滚动层级。全栈托管于边缘节点。",
    tagline: "React 19 单页应用，沉浸式极简黑画布",
    techs: ["React 19", "Tailwind v4", "Motion", "Cloudflare Workers", "Canvas"],
    mobileFriendly: true,
    mainUrl: "https://www.wled.top",
    mirrorUrl: "https://mirror.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "ying-of-me",
      dnsProxy: true
    },
    accentGradient: "from-[#ffffff] to-[#999999]",
    themeColor: "#ffffff",
    features: ["100vh 强制层级物理吸附滚动与内层防溢出机制", "纯原生 Canvas 追踪粒子引擎", "极客终端路由分发态势感知"]
  },
  {
    id: "blog",
    title: "伴莺的小窝",
    subtitle: "个人博客生态系统",
    description: "采用轻量化前后端解耦架构构建的官方博客，其底层基于全量 RESTful 静态编译和瞬时水合机制。通过专有接口直接驱动微信小程序端的数据呈现。",
    tagline: "极简毛玻璃卡片，跨端数据映射",
    techs: ["Hexo RESTful", "Vue 3", "uni-app", "TypeScript", "UnoCSS"],
    mobileFriendly: true,
    mainUrl: "https://blog.wled.top",
    mirrorUrl: "https://mirror-blog.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "ying-of-me",
      dnsProxy: true
    },
    accentGradient: "from-[#6a4cf5] to-[#d44df0]",
    themeColor: "#6a4cf5",
    features: ["四分栏 Tab 自适应微交互网格", "基于 web-kit 滤镜优化的物理磨砂高斯模糊", "面向微信小程序的轻量化 JSON 静态路由桥接"]
  },
  {
    id: "city",
    title: "智慧主城新区",
    subtitle: "数字大屏 AI 控制系统",
    description: "专为宽屏监控中心设计开发的超大型城市智能感知系统。采用先进的 SSR 全生命周期安全守卫机制，高频对接三层 BFF 网关与态势感知组件。纯动态全栈服务部署。",
    tagline: "Next.js 16 全栈渲染，城市级态势感知",
    techs: ["Next.js 16", "React 19", "Ant Design 6", "Tailwind v4", "BFF Mock"],
    mobileFriendly: false,
    mainUrl: "https://city.wled.top",
    mirrorUrl: null,
    infrastructure: {
      provider: "Node.js Independent Container",
      workerName: "chongqing-router",
      dnsProxy: true
    },
    accentGradient: "from-[#0088ff] to-[#00ffff]",
    themeColor: "#0088ff",
    features: ["基于 Next.js App Router 的服务端认证首屏安全防线", "利用 Tailwind CSS v4 与 Antd 6 精细控制的科技蓝灰暗色主题", "高动态数据链路注入与实时感知可视化图表"]
  },
  {
    id: "admin",
    title: "React Admin System",
    subtitle: "企业级通用中后台控制面板",
    description: "高度抽象的现代化企业级中后台开发骨架。完全重写了传统的路由守卫机制，集成 JWT 安全状态机。采用最先进的 JavaScript 时间日期解决方案，确保高并发下的时间处理精准。",
    tagline: "React 19 + Vite 7 生产级脚手架",
    techs: ["React 19", "Vite 7", "Ant Design 6", "Temporal API", "Axios"],
    mobileFriendly: false,
    mainUrl: "https://admin.wled.top",
    mirrorUrl: "https://mirror-admin.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "admin-system",
      dnsProxy: true
    },
    accentGradient: "from-[#ff7a3d] to-[#ff5577]",
    themeColor: "#ff7a3d",
    features: ["引入原生 Temporal API 完成复杂时间序列建模", "高度内聚的系统自锁屏防护与凭证生命周期守护", "主备双轨道托管：支持边缘网关与镜像站并发互备"]
  },
  {
    id: "score",
    title: "光谱平台",
    subtitle: "多维全媒体深度评测平台",
    description: "引入严格受邀核销机制的强安全性私密交流平台。引入业界严苛的维度评分钳位算法，采用双重内容安全审计工作流。在后端开发上集成 Redis 内存缓存层，阻断并发数据库死锁。",
    tagline: "加权项目公式计算，系统与人工双重风控",
    techs: ["React 18", "shadcn/ui", "TypeScript", "Node.js", "Redis Sets", "MySQL"],
    mobileFriendly: false,
    mainUrl: "https://score.wled.top",
    mirrorUrl: "https://mirror-score.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers Overlay",
      workerName: "all-in-it",
      dnsProxy: true
    },
    accentGradient: "from-[#d44df0] to-[#6a4cf5]",
    themeColor: "#d44df0",
    features: ["多维度加权平均评分系统，辅以 [0, 10] 范围强制分值钳位规则", "双门禁前置 AI 过滤技术与人工豁免锁智能纠偏机制", "利用 Redis Sets 点赞去重与脏数据定时异步回写"]
  },
  {
    id: "store",
    title: "乐购商城",
    subtitle: "原生 JavaScript 电商实战项目",
    description: "不依赖任何现代视图层框架，完全采用原生 Web API 开发的 PC 端模拟电商闭环。在底层运用精细的 DOM 算法处理繁琐的数据绑定和组件生命周期，展现扎实的基础内功。",
    tagline: "零框架硬核 DOM 调度，级联状态联动控制",
    techs: ["HTML5", "CSS3", "Vanilla JS ES6", "Swiper.js", "LocalStorage"],
    mobileFriendly: false,
    mainUrl: "https://store.wled.top",
    mirrorUrl: "https://mirror-store.wled.top",
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "lego-store",
      dnsProxy: true
    },
    accentGradient: "from-[#ff5577] to-[#ff7a3d]",
    themeColor: "#ff5577",
    features: ["纯原生购物车状态管理，基于事件代理与数据流级联计算机制", "利用 Canvas 渲染带有像素级旋转、噪声干扰线的图形验证码", "基于反比例函数实现的缓动回到顶部逻辑"]
  },
  {
    id: "status",
    title: "Uptime Monitor",
    subtitle: "服务健康度监控中心",
    description: "分布式微服务监控节点。高精确度监听个人前端工程项目下的全量生产实例。主站采用部署于 Azure 的 Uptime Kuma；镜像分流站采用 Github Actions 驱动的 Upptime 架构。",
    tagline: "主备多节点探针监测，高精度可用性跟踪",
    techs: ["Azure VPS", "Uptime Kuma", "Upptime", "Node.js"],
    mobileFriendly: true,
    mainUrl: "https://status.wled.top/status",
    mirrorUrl: "https://mirror-status.wled.top",
    infrastructure: {
      provider: "Azure VPS Host",
      workerName: "uptime-kuma-node",
      dnsProxy: true
    },
    accentGradient: "from-[#22c55e] to-[#0088ff]",
    themeColor: "#22c55e",
    features: ["云服务器物理承载，完全独立于核心基建以防灾隔离", "集成实时监控大图与历史存活度折线图渲染", "提供极致压缩的健康度卡片看板"]
  }
];
