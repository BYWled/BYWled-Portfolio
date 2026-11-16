import { useState, useEffect } from 'react';

// ============ 交易所：迷你 K 线引擎 ============
const CANDLE_PATTERNS = [
  [42, 58, 30, 62], [55, 70, 50, 78], [68, 82, 60, 88], // 红三兵
  [75, 80, 55, 85], [60, 66, 40, 70], [45, 58, 35, 62], // 黑三鸦
  [38, 52, 30, 56], [48, 64, 42, 70],                   // 收敛三角
];

function genCandles() {
  const base = Math.random() * 40 + 30;
  return CANDLE_PATTERNS.slice(0, 8).map(([o, h, l, c]) => {
    const drift = (Math.random() - 0.5) * 12;
    return [o + drift, h + drift, l + drift, c + drift + (Math.random() - 0.45) * 10];
  });
}

export function BourseDemo() {
  const [candles, setCandles] = useState(genCandles);
  useEffect(() => {
    const timer = setInterval(() => setCandles(genCandles()), 2400);
    return () => clearInterval(timer);
  }, []);
  const w = 100 / 8;
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] font-mono text-amber-400 flex justify-between">
        <span>K-LINE ENGINE</span><span className="text-[#666]">25 PATTERNS</span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-9 mt-1">
        {candles.map(([o, h, l, c], i) => {
          const up = c >= o;
          const color = up ? '#22c55e' : '#ef4444';
          const top = Math.min(o, c), bot = Math.max(o, c);
          return (
            <g key={i} className="transition-all duration-1000 ease-in-out">
              <line x1={i * w + w / 2} x2={i * w + w / 2} y1={100 - h} y2={100 - l} stroke={color} strokeWidth="1" />
              <rect x={i * w + w * 0.22} y={100 - bot} width={w * 0.56} height={Math.max(bot - top, 2)} fill={color} rx="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============ 驾考：答题倒计时 ============
const EXAM_QUESTIONS = [
  '夜间会车应当在距相对方向来车多少米外改用近光灯？',
  '驾驶机动车在高速公路上倒车是否记 12 分？',
  '行车中遇到执行紧急任务的救护车应当如何避让？',
];

export function DriverExamDemo() {
  const [qi, setQi] = useState(0);
  const [left, setLeft] = useState(100);
  useEffect(() => {
    const timer = setInterval(() => {
      setLeft(prev => {
        if (prev <= 4) { setQi(q => (q + 1) % EXAM_QUESTIONS.length); return 100; }
        return prev - 4;
      });
    }, 180);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] font-mono text-[#0099ff] flex justify-between">
        <span>科目四 · 限时作答</span><span className={left < 30 ? 'text-red-400 animate-pulse' : ''}>{Math.ceil(left / 5)}s</span>
      </div>
      <div className="text-[10px] text-[#ccc] leading-snug line-clamp-1 mt-1">{EXAM_QUESTIONS[qi]}</div>
      <div className="h-1 rounded-full bg-[#1c1c1c] mt-1.5 overflow-hidden">
        <div className="h-full bg-[#0099ff] transition-all duration-150 ease-linear" style={{ width: `${left}%` }}></div>
      </div>
    </div>
  );
}

// ============ 番剧 RSS：零堆内存流式下载 ============
export function AnimeRssDemo() {
  const [progress, setProgress] = useState(12);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + Math.random() * 9));
    }, 500);
    return () => clearInterval(timer);
  }, []);
  const speed = (8 + progress / 8).toFixed(1);
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] font-mono text-[#d44df0] flex justify-between">
        <span>ARIA2 STREAM</span><span className="text-[#666]">ZERO-HEAP</span>
      </div>
      <div className="flex justify-between items-baseline text-[10px] font-mono mt-1">
        <span className="text-white">[LilithRaws] 迷家 第 08话</span>
        <span className="text-emerald-400">{speed} MB/s</span>
      </div>
      <div className="h-1 rounded-full bg-[#1c1c1c] mt-1.5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#6a4cf5] to-[#d44df0] transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

// ============ 银行：利息实时结算 ============
export function BankDemo() {
  const [balance, setBalance] = useState(12860.0);
  useEffect(() => {
    const timer = setInterval(() => setBalance(b => b + Math.random() * 0.4 + 0.05), 900);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-full flex flex-col justify-center gap-1.5">
      <div className="text-[10px] font-mono text-emerald-400 flex justify-between">
        <span>活期 · 日息结算</span><span className="text-emerald-500 animate-pulse">+0.06/s</span>
      </div>
      <div className="text-lg font-mono text-white tabular-nums leading-none">
        ¥ {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
}

// ============ 排行榜：段位名次轮换 ============
const RANK_ROWS = [
  { name: '伴莺', score: 9821, tier: '钻石', color: '#6a4cf5' },
  { name: '星野', score: 8455, tier: '铂金', color: '#0ea5e9' },
  { name: '柚子', score: 7130, tier: '黄金', color: '#f59e0b' },
  { name: '阿澄', score: 6488, tier: '白银', color: '#94a3b8' },
];

export function RanksDemo() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setOffset(o => o + 1), 2200);
    return () => clearInterval(timer);
  }, []);
  const rows = RANK_ROWS.map((_, i) => RANK_ROWS[(i + offset) % RANK_ROWS.length]);
  return (
    <div className="h-full flex flex-col justify-center gap-1">
      {rows.slice(0, 3).map((r, i) => (
        <div key={r.name} className="flex items-center gap-2 text-[10px] font-mono transition-all duration-500">
          <span className={`w-3 text-center ${i === 0 ? 'text-amber-400' : 'text-[#666]'}`}>{i + 1}</span>
          <span className="text-white w-8">{r.name}</span>
          <span className="px-1 rounded text-[8px]" style={{ color: r.color, background: `${r.color}1a` }}>{r.tier}</span>
          <span className="text-[#666] ml-auto tabular-nums">{r.score}</span>
        </div>
      ))}
    </div>
  );
}

// ============ 任务系统：状态流转 ============
const MISSION_STATES = [
  { label: '审核中', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { label: '招募中', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { label: '进行中', cls: 'bg-[#0099ff]/10 text-[#0099ff] border-[#0099ff]/20' },
  { label: '已完成', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
];

export function MissionDemo() {
  const [si, setSi] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSi(s => (s + 1) % MISSION_STATES.length), 1800);
    return () => clearInterval(timer);
  }, []);
  const state = MISSION_STATES[si];
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] font-mono text-[#0ea5e9] flex justify-between">
        <span>悬赏任务</span><span className="text-white">+ 2,500 信用点</span>
      </div>
      <div className="text-[10px] text-[#ccc] font-mono">完成条件：关键词 「截图回执」</div>
      <div className={`w-max px-2 py-0.5 rounded-full border text-[9px] font-mono transition-all ${state.cls}`}>{state.label}</div>
    </div>
  );
}

// ============ 兑换码：口令逐字符生成 + 事务入账 ============
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 剔除易混淆字符

export function CdkDemo() {
  const [code, setCode] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let timer;
    const gen = () => {
      setDone(false);
      let i = 0;
      const build = () => {
        i++;
        setCode(Array.from({ length: 8 }, (_, k) =>
          k < i ? CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)] : '·'
        ).join(''));
        if (i < 8) {
          timer = setTimeout(build, 70);
        } else {
          setDone(true);
          timer = setTimeout(gen, 1500);
        }
      };
      build();
    };
    gen();
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] font-mono text-[#f43f5e] flex justify-between">
        <span>CDK CREATE</span>
        <span className={done ? 'text-emerald-400' : 'text-[#666]'}>{done ? '✓ 事务入账' : '生成中'}</span>
      </div>
      <div className="text-[13px] text-white font-mono tracking-[0.2em] mt-1">{code || '········'}</div>
      <div className="flex justify-between text-[9px] font-mono text-[#666]">
        <span>×500 份 · 有效期 7d</span>
        <span className="text-rose-400">cdk VIP2026</span>
      </div>
    </div>
  );
}

// ============ 聊天奖励：消息掉落货币 ============
const CHATTERS = ['星野', '柚子', '阿澄', '小满', 'Neko'];

export function ChatRewardDemo() {
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    let timer;
    const tick = () => {
      const next = {
        key: Math.random(),
        user: CHATTERS[Math.floor(Math.random() * CHATTERS.length)],
        amount: Math.floor(Math.random() * 30) + 3,
      };
      setRewards(prev => [...prev, next].slice(-3));
      timer = setTimeout(tick, 1100);
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative h-full flex flex-col justify-end gap-1 pt-3">
      <div className="text-[10px] font-mono text-[#14b8a6] absolute top-0 left-0 w-full flex justify-between">
        <span>CHAT DROP</span><span className="text-[#666]">防刷 · 冷却 · 预算</span>
      </div>
      {rewards.slice(-2).map((r, i, arr) => (
        <div
          key={r.key}
          className="flex items-center justify-between text-[10px] font-mono transition-all duration-500"
          style={{ opacity: 0.45 + (i / Math.max(arr.length - 1, 1)) * 0.55 }}
        >
          <span className="text-[#999] truncate max-w-[70px]">{r.user}: 发言</span>
          <span className="text-emerald-400">+{r.amount}</span>
        </div>
      ))}
    </div>
  );
}

// ============ 抽奖：奖项概率条轮播 ============
const LOTTERY_PRIZES = [
  { name: '一等奖', amount: '×5000', p: 1 },
  { name: '二等奖', amount: '×500', p: 9 },
  { name: '三等奖', amount: '×50', p: 30 },
];
const LOTTERY_MAX_P = Math.max(...LOTTERY_PRIZES.map(p => p.p));

export function LotteryDemo() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % LOTTERY_PRIZES.length), 650);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-[10px] font-mono text-[#a855f7] flex justify-between">
        <span>ROLL · 概率抽取</span><span className="text-[#666]">保底 10 次必中</span>
      </div>
      <div className="flex flex-col gap-0.5 mt-0.5">
        {LOTTERY_PRIZES.map((prize, i) => (
          <div key={prize.name} className="flex items-center gap-2">
            <span className={`text-[9px] font-mono w-8 ${i === active ? 'text-purple-300' : 'text-[#666]'}`}>{prize.name}</span>
            <div className="flex-1 h-1 rounded-full bg-[#1c1c1c] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${i === active ? 'bg-purple-400' : 'bg-purple-400/30'}`}
                style={{ width: `${(prize.p / LOTTERY_MAX_P) * 100}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-[#888] w-10 text-right">{prize.amount}</span>
            <span className={`text-[9px] font-mono w-7 text-right ${i === active ? 'text-purple-300' : 'text-[#666]'}`}>{prize.p}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ 信用分：半圆环仪表盘 ============
export function ExtraDemo() {
  const [score, setScore] = useState(620);
  useEffect(() => {
    const timer = setInterval(() => setScore(s => {
      const next = s + (Math.random() - 0.4) * 30;
      return Math.min(820, Math.max(580, next));
    }), 1200);
    return () => clearInterval(timer);
  }, []);
  const ratio = Math.min(1, Math.max(0, (score - 350) / 500)); // 350~850 映射
  const angle = Math.PI * ratio;
  const cx = 50, cy = 46, r = 34;
  const nx = cx - r * Math.cos(angle), ny = cy - r * Math.sin(angle);
  const arc = (from, to) => {
    const x1 = cx - r * Math.cos(Math.PI * from), y1 = cy - r * Math.sin(Math.PI * from);
    const x2 = cx - r * Math.cos(Math.PI * to), y2 = cy - r * Math.sin(Math.PI * to);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };
  return (
    <div className="h-full flex items-center justify-between">
      <div className="text-[10px] font-mono">
        <div className="text-[#ff7a3d]">CREDIT SCORE</div>
        <div className="text-[#666] mt-0.5">签到 × 存款 加权评估</div>
      </div>
      <svg viewBox="0 0 100 52" className="h-full w-24">
        <path d={arc(0, 1)} fill="none" stroke="#1c1c1c" strokeWidth="6" strokeLinecap="round" />
        <path d={arc(0, ratio)} fill="none" stroke="#ff7a3d" strokeWidth="6" strokeLinecap="round" className="transition-all duration-700 ease-out" />
        <circle cx={nx} cy={ny} r="3" fill="#fff" className="transition-all duration-700 ease-out" />
        <text x="50" y="48" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="monospace" className="transition-all">{Math.round(score)}</text>
      </svg>
    </div>
  );
}
