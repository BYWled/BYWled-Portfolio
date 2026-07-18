import { useState, useEffect, useRef } from 'react';

// 个人前端项目 Demo
export function WwwDemo() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-[10px] text-white font-mono absolute top-0 left-0 w-full flex justify-between">
        <span>PORTAL CORE</span><span className="animate-pulse text-[#999]">SYNC</span>
      </div>
      <div className="relative flex items-center justify-center mt-3">
        <div className="absolute w-8 h-8 border border-white/30 rounded-full animate-[ping_3s_ease-in-out_infinite]"></div>
        <div className="absolute w-12 h-12 border border-white/10 rounded-full animate-[spin_4s_linear_infinite] border-t-white/40"></div>
        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
      </div>
    </div>
  );
}

// 博客 Demo
const BLOG_FALLBACK_TITLES = ["React 19 Hooks 解析", "Hexo 水合机制探究", "uni-app 最佳实践"];

const BLOG_URL = "https://blog.wled.top";

export function BlogDemo() {
  const [text, setText] = useState("");
  const titlesRef = useRef(BLOG_FALLBACK_TITLES);

  useEffect(() => {
    // 拉取真实博客文章标题（本地 dev 走 vite proxy，生产走直连）
    fetch(import.meta.env.DEV ? '/blog-api/posts.json' : `${BLOG_URL}/api/posts.json`)
      .then(r => r.json())
      .then(data => {
        if (data?.data?.length) {
          titlesRef.current = data.data.map(p => p.title);
        }
      })
      .catch(() => { /* 降级使用默认标题 */ });
  }, []);

  useEffect(() => {
    let i = 0, c = 0, isDeleting = false;
    const timer = setInterval(() => {
      const titles = titlesRef.current;
      const cur = titles[i % titles.length];
      if (!isDeleting && c < cur.length) {
        c++; setText(cur.substring(0, c));
      } else if (!isDeleting && c === cur.length) {
        isDeleting = true;
      } else if (isDeleting && c > 0) {
        c--; setText(cur.substring(0, c));
      } else {
        isDeleting = false; i = (i + 1) % titles.length;
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-[10px] text-[#6a4cf5] font-mono mb-1">RESTFUL FEED</div>
      <div className="text-xs text-white font-mono h-4">{text}<span className="animate-pulse text-[#6a4cf5]">_</span></div>
    </div>
  );
}

// 后台管理 Demo
export function AdminDemo() {
  const [data, setData] = useState(Array.from({ length: 20 }, () => 30));
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const next = [...prev.slice(1), Math.max(10, Math.min(90, prev[prev.length - 1] + (Math.random() - 0.5) * 40))];
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);
  const points = data.map((d, i) => `${i * (100 / 19)},${100 - d}`).join(' ');
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] text-orange-400 font-mono flex justify-between">
        <span>CPU LOAD</span><span>{data[data.length - 1].toFixed(0)}%</span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-8 mt-1">
        <polyline points={points} fill="none" stroke="#ff7a3d" strokeWidth="2" className="transition-all duration-700 ease-linear" />
      </svg>
    </div>
  )
}

// 光谱平台 Demo
export function ScoreDemo() {
  const [hover, setHover] = useState(false);
  return (
    <div className="h-full flex flex-col items-center justify-center relative"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="text-[10px] text-[#d44df0] font-mono absolute top-0 left-0 w-full flex justify-between">
        <span>5D RADAR</span><span className="animate-pulse">INTERACT</span>
      </div>
      <svg viewBox="0 0 100 100" className={`w-12 h-12 mt-3 transition-transform duration-500 ease-out ${hover ? 'scale-[1.2] rotate-[10deg]' : 'scale-100 rotate-0'}`}>
        <polygon points="50,5 95,38 78,95 22,95 5,38" fill="none" stroke="#333" strokeWidth="2" />
        <polygon points={hover ? "50,15 85,40 70,85 30,85 15,40" : "50,25 75,45 65,75 35,75 25,45"} fill="rgba(212, 77, 240, 0.4)" stroke="#d44df0" strokeWidth="2" className="transition-all duration-500 ease-out" />
      </svg>
    </div>
  )
}

// 乐购商城 Demo
export function StoreDemo() {
  const [count, setCount] = useState(0);
  const handleAdd = (e) => {
    e.stopPropagation(); // 阻止卡片点击冒泡
    e.preventDefault();
    setCount(c => c + 1);
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between text-[10px] text-pink-400 font-mono">
        <span>CART ({count})</span>
        <span>¥ {(count * 299).toFixed(2)}</span>
      </div>
      <button
        onClick={handleAdd}
        className="w-full mt-2 py-1 rounded bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 transition-colors text-[10px] font-mono cursor-pointer relative z-20"
      >
        + ADD TO CART
      </button>
    </div>
  );
}

// 数字大屏 Demo
export function CityDemo() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const generate = () => {
      const pts = [];
      for (let i = 0; i <= 10; i++) pts.push(`${i * 10},${100 - (20 + Math.random() * 70)}`);
      setPoints(pts);
    };
    generate();
    const t = setInterval(generate, 2000);
    return () => clearInterval(t);
  }, []);
  const polylineStr = points.join(' ');
  const polygonStr = `0,100 ${polylineStr} 100,100`;

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col justify-between">
      <div className="text-[10px] text-cyan-400 font-mono z-10 flex justify-between">
        <span>BFF ECHARTS</span>
        <span className="text-[9px] text-[#666]">ECharts</span>
      </div>
      <div className="absolute inset-0 mt-4 pointer-events-none">
        <div className="w-full border-b border-[#262626] h-[33%]"></div>
        <div className="w-full border-b border-[#262626] h-[33%]"></div>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[85%]">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={polygonStr} fill="url(#g)" className="transition-all duration-1000 ease-in-out" />
        <polyline points={polylineStr} fill="none" stroke="#00ffff" strokeWidth="1.5" className="transition-all duration-1000 ease-in-out" />
        {points.map((pt, i) => {
          const [x, y] = pt.split(',');
          return <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" className="transition-all duration-1000 ease-in-out" />
        })}
      </svg>
    </div>
  );
}
