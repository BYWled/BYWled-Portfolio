import { useState, useEffect } from 'react';
import { CloudLightning, Layers, Cpu, Activity } from 'lucide-react';

const BADGES = [
  { text: "CLOUDFLARE EDGE MULTI-DISTRIBUTION", icon: <CloudLightning className="w-3.5 h-3.5 text-[#0099ff]" /> },
  { text: "NEXT.JS 16 FULLSTACK ARCHITECTURE", icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: "REACT 19 + VITE 7 ENGINEERING", icon: <Cpu className="w-3.5 h-3.5 text-orange-400" /> },
  { text: "AZURE KUMA TELEMETRY NODE", icon: <Activity className="w-3.5 h-3.5 text-emerald-400" /> }
];

export function FlippingBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BADGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs text-[#999999] mb-10 font-mono overflow-hidden h-8">
      <div key={index} className="flex items-center gap-2 animate-flip-text whitespace-nowrap">
        {BADGES[index].icon}
        <span>{BADGES[index].text}</span>
      </div>
    </div>
  );
}
