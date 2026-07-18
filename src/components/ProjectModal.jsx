import { ArrowUpRight, Check, Copy, Cpu, Terminal } from 'lucide-react';
import { AnimatedModal } from './AnimatedModal';

export function ProjectModal({ project, copiedId, onClose, onCopy }) {
  if (!project) return null;

  return (
    <AnimatedModal isOpen={!!project} onClose={onClose}>
      <div className="bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className={`h-1.5 bg-gradient-to-r ${project.accentGradient}`} />

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white tracking-tight">{project.title}</h4>
              <p className="text-xs font-mono text-[#0099ff] mt-1 uppercase tracking-wider">{project.subtitle}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[#999999] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono text-[#666] tracking-wider uppercase">CORE HIGHLIGHTS</span>
            <ul className="space-y-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#999999]">
                  <span className="text-emerald-500 mt-0.5">✔</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#666] tracking-wider uppercase">TECH STACK</span>
            <div className="flex flex-wrap gap-1.5">
              {project.techs.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-[#1c1c1c] text-white border border-[#262626] text-[10px] font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090909] border border-[#262626] font-mono text-[10px] text-[#888] space-y-1.5 relative overflow-hidden">
            <Terminal className="absolute top-2 right-2 w-12 h-12 text-white/5" />
            <div className="text-white font-semibold flex items-center gap-1.5 pb-2 border-b border-[#1c1c1c]">
              <Cpu className="w-3.5 h-3.5 text-[#0099ff]" />
              <span>DEVOPS ROUTING PROFILE</span>
            </div>
            <div className="pt-1">INFRA: <span className="text-emerald-400">{project.infrastructure.provider}</span></div>
            <div>NODE ID: <span className="text-white">{project.infrastructure.workerName}</span></div>
            {project.mirrorUrl && <div>MIRROR: <span className="text-purple-400">Github Pages Available</span></div>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={project.id === 'status' ? 'https://status.wled.top/status' : project.mainUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 text-center rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>访问独立实例</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {project.mirrorUrl ? (
              <a
                href={project.mirrorUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 text-center rounded-xl bg-[#1c1c1c] text-white font-semibold text-xs border border-[#262626] hover:bg-[#262626] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>访问 Github 镜像</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => onCopy(project.mainUrl, project.id)}
                className="flex-1 py-3 text-center rounded-xl bg-[#1c1c1c] border border-[#262626] text-white hover:text-[#0099ff] transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                {copiedId === project.id ? (
                  <><Check className="w-4 h-4 text-emerald-400" /><span>已复制路由</span></>
                ) : (
                  <><Copy className="w-4 h-4" /><span>复制直连路由</span></>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </AnimatedModal>
  );
}
