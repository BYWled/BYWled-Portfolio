import { Smartphone, Monitor, ArrowUpRight, Info } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { WwwDemo, BlogDemo, AdminDemo, ScoreDemo, StoreDemo, CityDemo, ToolsDemo } from './DemoComponents';

// 状态指示点颜色：up 绿 / down 红 / 其他琥珀
const STATUS_DOT = {
  up: 'bg-emerald-500',
  down: 'bg-red-500',
  pending: 'bg-amber-500',
};

export function ProjectCard({ project, status, onClick }) {
  return (
    <TiltCard className="bg-[#141414] border border-[#262626] overflow-hidden hover:border-[#333]" onClick={onClick}>
      <div className="p-6 md:p-8 flex flex-col justify-between h-[395px] relative">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {status ? (
                <>
                  <span className={`w-2 h-2 rounded-full ${STATUS_DOT[status.status] || 'bg-amber-500'} animate-pulse`}></span>
                  <span className="text-[10px] font-mono text-[#999999]">
                    {status.status === 'up' ? `${status.ping}ms` : status.status === 'down' ? 'DOWN' : '...'}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#444]"></span>
                  <span className="text-[10px] font-mono text-[#666]">NO MONITOR</span>
                </>
              )}
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-medium tracking-tight ${project.mobileFriendly ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
              {project.mobileFriendly ? <><Smartphone className="w-2.5 h-2.5" />适配</> : <><Monitor className="w-2.5 h-2.5" />宽屏</>}
            </div>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-white mb-1.5">{project.title}</h3>
          <div className="text-[11px] font-mono text-[#0099ff] uppercase tracking-wider mb-4">{project.subtitle}</div>
          <p className="text-xs text-[#999999] leading-relaxed line-clamp-3 mb-6">
            {project.description}
          </p>

          {/* 专属微缩 Demo 展示 */}
          <div className="bg-[#090909] rounded-xl p-3 border border-[#1c1c1c] mb-4 h-[70px]">
            {project.id === 'www' && <WwwDemo />}
            {project.id === 'city' && <CityDemo />}
            {project.id === 'blog' && <BlogDemo />}
            {project.id === 'admin' && <AdminDemo />}
            {project.id === 'score' && <ScoreDemo />}
            {project.id === 'store' && <StoreDemo />}
            {project.id === 'tools' && <ToolsDemo />}
          </div>
        </div>

        {/* 卡片内直接跳转区 */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#1c1c1c]">
          <a
            href={project.mainUrl}
            target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()} // 防止触发弹窗
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-[11px] font-semibold relative z-20"
          >
            <span>访问主线</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#090909] border border-[#262626] text-[#999999] hover:text-white transition-colors text-[11px] pointer-events-none"
          >
            <Info className="w-3 h-3" />
            <span>点击架构分析</span>
          </button>
        </div>

      </div>
    </TiltCard>
  );
}
