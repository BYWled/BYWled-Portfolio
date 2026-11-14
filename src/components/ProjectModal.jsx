import { ArrowUpRight, Check, Copy, Cpu, GitBranch, Layers, Server, Terminal, Workflow, X } from 'lucide-react';
import { AnimatedModal } from './AnimatedModal';

// 架构分层元数据：图标 + 标签色
const STACK_LAYERS = [
  { key: 'frontend', label: 'FRONTEND', icon: Layers, className: 'text-[#0099ff] border-[#0099ff]/20 bg-[#0099ff]/5' },
  { key: 'backend', label: 'BACKEND', icon: Server, className: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
  { key: 'infra', label: 'INFRASTRUCTURE', icon: Cpu, className: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
];

export function ProjectModal({ project, copiedId, onClose, onCopy }) {
  if (!project) return null;

  const stackLayers = STACK_LAYERS.filter(layer => project.stack?.[layer.key]?.length);

  return (
    <AnimatedModal isOpen={!!project} onClose={onClose}>
      <div className="bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className={`h-1.5 bg-gradient-to-r ${project.accentGradient}`} />

        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">

          {/* 头部 */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white tracking-tight">{project.title}</h4>
              <p className="text-xs font-mono text-[#0099ff] mt-1 uppercase tracking-wider">{project.subtitle}</p>
              {project.tagline && (
                <p className="text-[11px] text-[#666] mt-2 font-mono">{project.tagline}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#262626] flex items-center justify-center text-[#666] hover:text-white hover:bg-[#262626] transition-all cursor-pointer flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#999999] leading-relaxed">
            {project.description}
          </p>

          {/* 架构分层 */}
          {stackLayers.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#666] tracking-wider uppercase flex items-center gap-1.5">
                <Layers className="w-3 h-3" /> ARCHITECTURE · 技术架构
              </span>
              <div className="space-y-2.5">
                {stackLayers.map(layer => (
                  <div key={layer.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[9px] font-mono tracking-wider flex-shrink-0 sm:w-32 ${layer.className}`}>
                      <layer.icon className="w-3 h-3" />
                      {layer.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack[layer.key].map((item, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#1c1c1c] text-[#ccc] border border-[#262626] text-[10px] font-mono">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 核心技术实现 */}
          {project.highlights?.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#666] tracking-wider uppercase">CORE IMPLEMENTATIONS · 核心技术实现</span>
              <ul className="space-y-2.5">
                {project.highlights.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#090909] border border-[#1c1c1c]">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✔</span>
                    <div>
                      <div className="text-xs text-white font-medium">{feat.title}</div>
                      <div className="text-[11px] text-[#888] leading-relaxed mt-1">{feat.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 部署链路 */}
          {project.pipeline?.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#666] tracking-wider uppercase flex items-center gap-1.5">
                <Workflow className="w-3 h-3" /> DEPLOY PIPELINE · 部署链路
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.pipeline.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1.5 rounded-lg bg-[#1c1c1c] border border-[#262626] text-[10px] font-mono text-[#ccc]">
                      {step}
                    </span>
                    {i < project.pipeline.length - 1 && (
                      <span className="text-[#444] font-mono text-[10px]">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DevOps 档案 */}
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

          {/* 操作区 */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={project.mainUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 text-center rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>访问独立实例</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 text-center rounded-xl bg-[#1c1c1c] text-white font-semibold text-xs border border-[#262626] hover:bg-[#262626] transition-colors flex items-center justify-center gap-1.5"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub 源码仓库</span>
              </a>
            )}

            {!project.repo && (project.mirrorUrl ? (
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
            ))}
          </div>

        </div>
      </div>
    </AnimatedModal>
  );
}
