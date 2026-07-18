import { Activity, GitBranch } from 'lucide-react';

export function Footer({ siteDomain, onDomainClick }) {
  return (
    <footer className="snap-start snap-always min-h-[30vh] flex flex-col justify-center border-t border-[#1c1c1c] px-6 py-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between gap-12 text-[#666] text-xs font-mono">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* 左侧：版权与友链 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={onDomainClick} className="text-white font-semibold text-sm cursor-pointer hover:text-[#0099ff] transition-colors">{siteDomain}</button>
              <span>·</span>
              <span>© 2026 OFFICIAL GRID</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">FRIEND LINKS</span>
              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <a href="https://gotang.cn/" target="_blank" rel="noreferrer" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">GoTang (特别鸣谢)</a>
                <a href="https://react.dev/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">React</a>
                <a href="https://vuejs.org/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Vue</a>
                <a href="https://vitejs.dev/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Vite</a>
                <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Tailwind CSS</a>
              </div>
            </div>
          </div>

          {/* 右侧：开源与探针 */}
          <div className="space-y-6 md:text-right">
            <div className="flex flex-col md:items-end gap-2">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">TELEMETRY</span>
              <div className="flex flex-col gap-2">
                <a href="https://status.wled.top/status" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors w-max md:ml-auto">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Azure Node Status</span>
                </a>
                <a href="https://mirror-status.wled.top" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-purple-400 transition-colors w-max md:ml-auto">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Actions Status</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">OPEN SOURCE</span>
              <div className="flex flex-wrap items-center md:justify-end gap-4 text-[11px]">
                <a href="https://github.com/BYWled" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="https://gitee.com/BYWled" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Gitee</a>
                <a href="https://gitcode.com/BYWled" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitCode</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
