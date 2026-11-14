import { Plug } from 'lucide-react';
import { PLUGINS } from '../data/plugins';
import { useNpmDownloads } from '../hooks/useNpmDownloads';
import { PluginCard, formatDownloads } from './PluginCard';

// 统计小方块：与全局卡片语言一致
function StatChip({ label, value, accent = '#0099ff' }) {
  return (
    <div className="px-4 py-2.5 rounded-xl bg-[#141414] border border-[#262626] flex flex-col gap-0.5 min-w-[104px]">
      <span className="text-[9px] font-mono text-[#666] tracking-wider uppercase">{label}</span>
      <span className="text-sm font-mono font-semibold tabular-nums" style={{ color: accent }}>{value}</span>
    </div>
  );
}

export function KoishiPlugins() {
  const downloads = useNpmDownloads();

  const total = downloads
    ? Object.values(downloads).reduce((sum, n) => sum + n, 0)
    : null;

  return (
    <section id="plugins" className="h-screen w-full snap-start snap-always pt-24 pb-12 px-6 flex flex-col relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 flex-shrink-0">
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#0099ff] tracking-widest uppercase flex items-center gap-2">
                <Plug className="w-3.5 h-3.5" />
                PLUGIN FORGE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Koishi 插件生态</h2>
            <p className="text-[#999999] text-sm leading-relaxed max-w-xl">
              已发布至 npm 的 Koishi v4 机器人插件：涵盖拟真金融、群治理、番剧订阅与信用体系，下载量来自 npm Registry 实时数据。
            </p>
          </div>

          {/* 实时统计 */}
          <div className="flex gap-3 self-start md:self-auto flex-shrink-0">
            <StatChip label="月下载" value={total !== null ? formatDownloads(total) : '...'} accent="#f59e0b" />
            <StatChip label="已发布" value={`${PLUGINS.length} pkgs`} />
            <StatChip label="框架" value="Koishi v4" accent="#22c55e" />
          </div>
        </div>

        {/* 内部滚动区 */}
        <div className="flex-1 overflow-y-auto pb-10 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLUGINS.map(plugin => (
              <PluginCard
                key={plugin.id}
                plugin={plugin}
                downloads={downloads?.[plugin.pkg]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
