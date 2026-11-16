# AGENT.md - AI 辅助开发指南

> 本文档为 AI 助手提供项目上下文，便于高效协助开发。

## 📋 项目概览

**项目名称**: BYWLED Portfolio
**项目类型**: 个人作品集/门户主页
**技术栈**: React 19 + Vite 8 + Tailwind CSS v4
**部署平台**: Cloudflare Workers

## 🏗️ 架构说明

### 文件职责划分

```
src/
├── App.jsx                    # 主应用：组装组件、布局、全局样式
├── main.jsx                   # 入口：挂载 React 根组件
├── index.css                  # 全局 CSS：Tailwind 导入
├── data/
│   ├── projects.js            # 静态数据：项目列表、架构分层、核心实现、部署链路
│   └── plugins.js             # 静态数据：Koishi 插件列表（npm 包名/特性/仓库）
├── hooks/
│   ├── useStatusData.js       # 数据逻辑：Upptime 汇总 API 请求、状态管理
│   ├── useNpmMeta.js          # 数据逻辑：npm 版本/许可证/下载量（30 分钟轮询）
│   └── useSiteDomain.js       # 域名识别：按 hostname 返回站点名
└── components/
    ├── index.js               # 统一导出
    ├── Header.jsx             # 布局：顶部导航栏
    ├── Footer.jsx             # 布局：页脚
    ├── ParticleCanvas.jsx     # 交互：Canvas 粒子动画
    ├── FlippingBadge.jsx      # 展示：3D 翻转徽章
    ├── TypingSubtitle.jsx     # 展示：打字机效果
    ├── TiltCard.jsx           # 交互：3D 倾斜卡片
    ├── AnimatedModal.jsx      # 交互：动画模态框
    ├── ProjectCard.jsx        # 业务：项目卡片组件
    ├── ProjectModal.jsx       # 业务：项目详情弹窗（架构/实现/链路/仓库）
    ├── DemoComponents.jsx     # 业务：各项目微缩 Demo
    ├── KoishiPlugins.jsx      # 业务：Koishi 插件生态区块（统计 + 网格）
    ├── PluginCard.jsx         # 业务：插件卡片（实时版本/Demo/双链接）
    └── PluginDemos.jsx        # 业务：各插件微缩 Demo
```

### 数据流

```
[projects.js] → [useStatusData.js] → [App.jsx] → [ProjectCard/ProjectModal]
                      ↓
        [wled-status 仓库 summary.json]
        (Upptime · GitHub Actions 自动更新 · raw.githubusercontent 直连)

[plugins.js] → [useNpmMeta.js] → [KoishiPlugins] → [PluginCard]
                     ↓
        [registry.npmjs.org/<pkg>/latest] → 版本/许可证（逐包并行，自带 CORS）
        [api.npmjs.org/downloads/point/last-month/...] → 月下载量（单次批量）
```

## 🔑 关键配置

### 1. 项目数据 (data/projects.js)

```javascript
// PROJECTS: 项目配置数组（status 站已下线，tools 为新增）
const PROJECTS = [
  {
    id: "www",               // 唯一标识
    title: "项目标题",
    subtitle: "副标题",
    description: "描述",
    tagline: "一句话标签",
    techs: ["Tech1"],        // 顶层技术标签（卡片展示）
    stack: {                 // 架构分层（弹窗展示）
      frontend: ["..."],
      backend: ["..."],
      infra: ["..."]
    },
    highlights: [            // 核心技术实现（title + detail）
      { title: "...", detail: "..." }
    ],
    pipeline: ["git push", "CI", "部署生效"],  // 部署链路
    repo: "https://github.com/BYWled/...",     // 源码仓库
    mobileFriendly: true,
    mainUrl: "https://",
    mirrorUrl: null,         // 镜像 URL（可选）
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "worker-name"
    },
    accentGradient: "from-[#fff] to-[#000]",
    themeColor: "#ffffff"
  }
];

// 当前项目清单（7 个）:
// www    → https://www.wled.top    (BYWled-Portfolio, Workers)
// blog   → https://blog.wled.top   (Ying-of-Me, Workers + GitHub Pages)
// tools  → https://tools.wled.top  (ying-of-tools, Workers + GitHub Pages)
// score  → https://score.wled.top  (all-in-it 前端 Workers + 独立 VPS 后端)
// admin  → https://admin.wled.top  (admin-system 前端 Workers + 独立 VPS 后端)
// city   → https://city.wled.top   (city, OpenNext → Workers)
// store  → https://store.wled.top  (lego_store, Workers 静态)
```

### 2. 状态数据 Hook (hooks/useStatusData.js)

```javascript
// 数据源：Upptime (GitHub Actions) 自动生成的开放汇总 JSON
const STATUS_SUMMARY_URL = 'https://raw.githubusercontent.com/BYWled/wled-status/main/history/summary.json';
// 响应字段: [{ name, url, status: 'up'|'down', uptimeDay, timeDay(24h 平均响应 ms), ... }]

// 项目 ID → 被监控站点 URL 映射（tools 尚未纳入 Upptime 监控）
export const MONITOR_MAP = {
  www: 'https://www.wled.top',
  blog: 'https://blog.wled.top',
  store: 'https://store.wled.top',
  admin: 'https://admin.wled.top',
  score: 'https://score.wled.top',
  city: 'https://city.wled.top',
};

// 返回值
{
  statusData: {
    blog: { ping: 78, status: 'up', uptime: '100.00%' },
    // ...
  },
  overallUptime: '100.0'  // 主站全在线率
}
```

**降级策略**：fetch 失败时保留上次成功数据（或空态），**绝不展示模拟状态**。
**刷新间隔**：5 分钟（raw.githubusercontent CDN 缓存约 5 分钟）。
**状态站链入口**：Header / Hero / Footer 均指向 `https://mirror-status.wled.top`（Upptime 站点），原 `status.wled.top` (Uptime Kuma) 已永久下线。

### 3. 插件数据 (data/plugins.js)

```javascript
// PLUGINS: Koishi 插件配置数组（当前 10 个）
// 注意：version/license 不在此硬编码维护，由 useNpmMeta 实时获取
const PLUGINS = [
  {
    id: 'bourse',            // 唯一标识（同时用于 Demo 注册）
    name: 'Monetary Bourse', // 展示名
    pkg: 'koishi-plugin-monetary-bourse', // npm 包名（拼接 npm 主页链接）
    fallbackVersion: '3.0.2', // 仅 npm 拉取失败时兜底，格式与 npm 一致（不带 v）
    license: 'GPL-3.0',       // 同上，兜底用
    accent: '#f59e0b',       // 主题色（下载量徽章着色）
    description: '...',
    features: ['特性1', '特性2', '特性3'],
    repo: 'https://github.com/BYWled/...',
  }
];

// 新增插件三步：
// 1. plugins.js 添加配置（含 repo）
// 2. PluginDemos.jsx 编写 Demo（容器 h-[76px] - p-3 ≈ 52px 内容高度，需实测不溢出）
// 3. PluginCard.jsx 的 DEMOS 映射注册
```

### 4. npm 元数据 Hook (hooks/useNpmMeta.js)

```javascript
// 版本/许可证：registry.npmjs.org/<pkg>/latest（自带 CORS），逐包并行，单包失败不影响其他
// 下载量：api.npmjs.org/downloads/point/last-month/<pkg1,pkg2,...> 单次批量
// 注意：无下载记录的包返回 null（新发布插件），调用方需兼容
const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 分钟

// 返回 { versions: {pkg: string}, licenses: {pkg: string}, downloads: {pkg: number} }
// 与上次成功数据逐字段合并，单包失败不洗掉整体状态
```

### 5. 全局样式 (App.jsx GLOBAL_STYLES)

```javascript
const GLOBAL_STYLES = `
  html, body { overflow: hidden; }  // 防止 body 滚动
  .custom-scrollbar { ... }          // 自定义滚动条
  .no-scrollbar { ... }              // 隐藏滚动条
  @keyframes flip { ... }            // 徽章翻转动画
`;
```

## 🎨 样式约定

### Tailwind 类名规范

```jsx
// 颜色
bg-[#090909]        // 主背景
bg-[#141414]        // 卡片背景
border-[#262626]    // 边框
text-[#0099ff]      // 强调色
text-emerald-500    // 成功色

// 间距
p-6 md:p-8          // 响应式内边距
gap-3               // 间距

// 动画
transition-all duration-300 ease-out
animate-pulse
hover:scale-105
```

### 响应式断点

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px

## 🔧 常见开发任务

### 1. 添加新项目

```javascript
// 步骤 1: data/projects.js 添加项目配置（含 stack/highlights/pipeline/repo）
// 步骤 2: components/DemoComponents.jsx 添加 Demo
export function NewProjectDemo() {
  return <div>...</div>;
}
// 步骤 3: components/ProjectCard.jsx 注册 Demo
{project.id === 'new-project' && <NewProjectDemo />}
// 步骤 4 (可选): 在 wled-status 仓库 .upptimerc.yml 添加站点监控，
//               并在 useStatusData.js 的 MONITOR_MAP 添加 URL 映射
```

### 2. 添加新 Koishi 插件

```javascript
// 步骤 1: data/plugins.js 添加插件配置（pkg/version/license/accent/features/repo）
// 步骤 2: components/PluginDemos.jsx 添加专属微缩 Demo
export function NewPluginDemo() { /* h-[70px] 容器内自适应 */ }
// 步骤 3: components/PluginCard.jsx 的 DEMOS 映射注册
const DEMOS = { ..., 'new-plugin': NewPluginDemo };
```

### 3. 修改粒子动画

文件: `components/ParticleCanvas.jsx`

```javascript
// 关键参数
const INFLUENCE_RADIUS = 200;  // 鼠标影响半径
const MAX_SPEED = 1.5;         // 粒子最大速度
const CONNECTION_DIST = 120;   // 连线距离阈值
```

### 3. 修改状态监控

文件: `hooks/useStatusData.js`

```javascript
// 修改刷新间隔
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 分钟，与 raw CDN 缓存对齐
```

### 4. 修改状态监控

文件: `hooks/useStatusData.js`

```javascript
// 修改刷新间隔
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 分钟，与 raw CDN 缓存对齐
```

### 5. 修改 Header 状态显示
文件: `components/Header.jsx`

```jsx
<span className="text-[10px] text-emerald-500">
  {overallUptime || '...'}%
</span>
```

## ⚠️ 注意事项

### 0. 信息暴露面（重要）
- 展示层（projects.js / plugins.js / 弹窗 / 部署链路）**严禁**出现：云供应商名、内部端口、进程名（PM2 条目）、数据库名、自托管 Runner 细节
- 后端拓扑只允许表述为"独立 VPS 常驻进程 + 加密隧道回源"；内部细节以 `E:\懒鬼，这些东西打算放一辈子？\VPS\` 运维文档为唯一可信源，不要同步进本仓库

### 1. Canvas 性能
- 粒子数量: `Math.min(80, 面积 / 15000)`
- 使用 `requestAnimationFrame` 循环
- 避免在循环中创建新对象

### 2. 状态管理
- `statusData` 使用 `useState` 管理
- API 请求使用 `useEffect` + `setInterval`
- 组件卸载时清理定时器

### 3. 事件处理
- Canvas 事件: `pointer-events: auto` 覆盖父级
- 卡片点击: `e.stopPropagation()` 防止冒泡
- 滚动监听: 使用容器内部滚动，非 window

### 4. 样式冲突
- 全局样式通过 `<style>` 标签注入
- Tailwind 类名优先于全局样式
- 使用 `!important` 谨慎

### 5. 图标选择
- lucide-react v1.x 已移除品牌图标（Github 等），仓库链接用 `GitBranch` 代替

## 🐛 常见问题

### Q: 卡片显示 NO MONITOR？
A: 该项目尚未加入 `wled-status` 仓库的 `.upptimerc.yml` 监控列表（如 tools）。加入后自动获取数据。

### Q: 状态数据不显示？
A: 检查 `MONITOR_MAP` 中的 URL 是否与 `.upptimerc.yml` 中站点 URL 完全一致（按 URL 精确匹配）。

### Q: 粒子动画卡顿？
A: 减少粒子数量或增大 `Math.min` 的分母值。

### Q: 卡片点击触发弹窗和链接？
A: 在链接上添加 `onClick={(e) => e.stopPropagation()}`。

### Q: 模态框关闭动画不生效？
A: 检查 `AnimatedModal` 的 `isRendered` 状态延迟逻辑。

## 📚 相关文档

- [React 文档](https://react.dev)
- [Vite 文档](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide React 图标](https://lucide.dev)
- [Upptime](https://github.com/upptime/upptime)
- [wled-status 状态仓库](https://github.com/BYWled/wled-status)

## 🔄 更新日志

### 2026-11-16
- 新增 3 个 Koishi 插件：Monetary CDK / Chat Reward / Monetary Lottery（共 10 个）
- 版本号与许可证改为实时获取：`useNpmMeta` 从 registry.npmjs.org/<pkg>/latest 拉取（30 分钟轮询），`plugins.js` 仅保留 fallbackVersion 兜底；移除静态 version 维护
- useNpmDownloads 合并入 useNpmMeta（版本/许可证/下载量一次拉齐）
- 新增 3 个微缩 Demo（口令生成/聊天气泡掉币/概率条轮播）；Demo 盒 70px→76px 并量化验证无溢出

### 2026-11-15
- 脱敏修复：部署链路/架构数据移除云供应商、内部端口、进程名、库名与自托管 Runner 细节
- 弹窗滚动条修复：`custom-scrollbar`（未定义的幽灵类）→ `no-scrollbar`
- 插件卡片底部间距修复：固定 `h-[395px]` → `min-h-[395px]`（特性标签行高可变，固定高度被 justify-between 吃掉底部内边距）

### 2026-11-14 (二)
- 新增"Koishi 插件生态"Snap 区块（KoishiPlugins / PluginCard / PluginDemos / plugins.js / useNpmDownloads）
- 7 个已发布 npm 插件展示：实时月下载量（npm 批量接口 30 分钟轮询）+ 专属微缩 Demo（K 线/答题/流式下载/利息/排行榜/任务/信用分仪表盘）
- Header 导航新增"插件生态"锚点；首屏徽章新增 "7 NPM PLUGINS · KOISHI ECOSYSTEM"

### 2026-11-14
- 状态数据源切换：Uptime Kuma Badge API（已下线）→ Upptime `summary.json` 开放 API
- 移除 Uptime Monitor 项目卡片；状态站入口统一切换至 mirror-status.wled.top
- 新增"伴莺的工具箱"（tools.wled.top）项目与专属 Demo
- 项目详情大改版：架构分层（stack）、核心技术实现（highlights）、部署链路（pipeline）、GitHub 仓库直达
- 全部项目数据按线上仓库实况重写（Vite 8 / OpenNext / TanStack / WASM 引擎等）
- 移除模拟状态降级数据，失败时保留上次真实数据

### 2026-07-18
- 初始版本
- 拆分组件结构
- 集成 Uptime Kuma Badge API
- 实现粒子画布交互
