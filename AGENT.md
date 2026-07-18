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
│   └── projects.js            # 静态数据：项目列表、Monitor 映射
├── hooks/
│   └── useStatusData.js       # 数据逻辑：API 请求、状态管理
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
    ├── ProjectModal.jsx       # 业务：项目详情弹窗
    └── DemoComponents.jsx     # 业务：各项目微缩 Demo
```

### 数据流

```
[projects.js] → [useStatusData.js] → [App.jsx] → [ProjectCard/ProjectModal]
                      ↓
              [Uptime Kuma API]
              (Badge API, 无需认证)
```

## 🔑 关键配置

### 1. 项目数据 (data/projects.js)

```javascript
// MONITOR_MAP: Uptime Kuma Monitor ID → Project ID 映射
const MONITOR_MAP = {
  '2': 'blog',
  '3': 'store',
  '4': 'admin',
  '10': 'status',
  '13': 'score',
  '15': 'city',
};

// PROJECTS: 项目配置数组
const PROJECTS = [
  {
    id: "www",           // 唯一标识
    title: "项目标题",
    subtitle: "副标题",
    description: "描述",
    techs: ["Tech1"],    // 技术栈
    mobileFriendly: true, // 是否移动端适配
    mainUrl: "https://", // 主站 URL
    mirrorUrl: null,     // 镜像 URL（可选）
    infrastructure: {
      provider: "Cloudflare Workers",
      workerName: "worker-name"
    },
    accentGradient: "from-[#fff] to-[#000]", // 渐变色
    themeColor: "#ffffff",                   // 主题色
    features: ["特性1", "特性2"]             // 核心特性
  }
];
```

### 2. 状态数据 Hook (hooks/useStatusData.js)

```javascript
// API 端点
const UPTIME_KUMA_URL = 'https://status.wled.top';

// Badge API 格式（无需认证）
// 状态: /api/badge/:monitorId/status → SVG
// 延迟: /api/badge/:monitorId/ping → SVG

// 返回值
{
  statusData: {
    blog: { ping: 131, status: 'up' },
    store: { ping: 109, status: 'up' },
    // ...
  },
  overallUptime: '100.0' // 整体在线率
}
```

### 3. 全局样式 (App.jsx GLOBAL_STYLES)

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
// 步骤 1: data/projects.js 添加项目配置
{
  id: "new-project",
  title: "新项目",
  // ...其他配置
}

// 步骤 2: hooks/useStatusData.js 添加 Monitor 映射
const MONITOR_MAP = {
  // ...现有映射
  '16': 'new-project', // 新 Monitor ID
};

// 步骤 3: components/DemoComponents.jsx 添加 Demo
export function NewProjectDemo() {
  return <div>...</div>;
}

// 步骤 4: components/ProjectCard.jsx 注册 Demo
import { NewProjectDemo } from './DemoComponents';
// 在 JSX 中添加
{project.id === 'new-project' && <NewProjectDemo />}
```

### 2. 修改粒子动画

文件: `components/ParticleCanvas.jsx`

```javascript
// 关键参数
const INFLUENCE_RADIUS = 200;  // 鼠标影响半径
const MAX_SPEED = 1.5;         // 粒子最大速度
const CONNECTION_DIST = 120;   // 连线距离阈值

// 粒子类
class Particle {
  update(mouseX, mouseY, isInCanvas) {
    // 1. 基础运动
    // 2. 边缘反弹
    // 3. 鼠标影响计算
    // 4. 速度限制
  }
  draw(ctx) {
    // 绘制粒子
  }
}
```

### 3. 修改状态监控

文件: `hooks/useStatusData.js`

```javascript
// 修改刷新间隔
const interval = setInterval(fetchStatus, 30000); // 30秒

// 修改降级数据
const simulated = {};
PROJECTS.forEach(p => {
  simulated[p.id] = { ping: 20, status: 'up' };
});
```

### 4. 修改 Header 状态显示

文件: `components/Header.jsx`

```jsx
<span className="text-[10px] text-emerald-500">
  {overallUptime || '...'}%
</span>
```

## ⚠️ 注意事项

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

## 🐛 常见问题

### Q: 状态数据不显示？
A: 检查 `MONITOR_MAP` 配置是否正确，Monitor ID 是否存在。

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
- [Uptime Kuma API](https://github.com/louislam/uptime-kuma)

## 🔄 更新日志

### 2026-07-18
- 初始版本
- 拆分组件结构
- 集成 Uptime Kuma Badge API
- 实现粒子画布交互
- 添加 GitHub Actions Status 链接
