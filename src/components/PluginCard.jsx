import { Download, GitBranch, Package } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { BourseDemo, DriverExamDemo, AnimeRssDemo, BankDemo, RanksDemo, MissionDemo, CdkDemo, ChatRewardDemo, LotteryDemo, ExtraDemo } from './PluginDemos';

const DEMOS = {
  bourse: BourseDemo,
  'driver-exam': DriverExamDemo,
  'anime-rss': AnimeRssDemo,
  bank: BankDemo,
  'jrys-fix-ranks': RanksDemo,
  mission: MissionDemo,
  cdk: CdkDemo,
  'chat-reward': ChatRewardDemo,
  lottery: LotteryDemo,
  extra: ExtraDemo,
};

// 月下载量格式化：1200 → 1.2K
export function formatDownloads(n) {
  if (typeof n !== 'number') return null;
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
}

export function PluginCard({ plugin, meta }) {
  const Demo = DEMOS[plugin.id];

  // 版本/许可证：npm 实时数据优先，静态值仅作拉取失败兜底
  const version = meta?.versions?.[plugin.pkg] || plugin.fallbackVersion;
  const license = meta?.licenses?.[plugin.pkg] || plugin.license;
  const dlText = formatDownloads(meta?.downloads?.[plugin.pkg]);

  return (
    <TiltCard className="bg-[#141414] border border-[#262626] overflow-hidden hover:border-[#333]">
      <div className="p-6 md:p-8 flex flex-col justify-between min-h-[395px] relative">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono text-[#999999]">{version} · {license}</span>
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-medium tracking-tight"
              style={{ background: `${plugin.accent}14`, color: plugin.accent, borderColor: `${plugin.accent}33` }}
            >
              <Download className="w-2.5 h-2.5" />
              {dlText ? `${dlText}/月` : 'npm'}
            </div>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-white mb-1.5">{plugin.name}</h3>
          <div className="text-[11px] font-mono text-[#666] truncate mb-4 flex items-center gap-1">
            <Package className="w-3 h-3 flex-shrink-0" />
            {plugin.pkg}
          </div>
          <p className="text-xs text-[#999999] leading-relaxed line-clamp-3 mb-6">
            {plugin.description}
          </p>

          {/* 专属微缩 Demo 展示 */}
          <div className="bg-[#090909] rounded-xl p-3 border border-[#1c1c1c] mb-3 h-[76px]">
            {Demo && <Demo />}
          </div>

          {/* 特性标签 */}
          <div className="flex flex-wrap gap-1.5">
            {plugin.features.map((feat, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-[#1c1c1c] text-[#aaa] border border-[#262626] text-[9px] font-mono">
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* 卡片内跳转区 */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#1c1c1c]">
          <a
            href={`https://www.npmjs.com/package/${plugin.pkg}`}
            target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()} // 防止触发倾斜卡片的父级交互
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-[11px] font-semibold relative z-20"
          >
            <Package className="w-3 h-3" />
            <span>npm 主页</span>
          </a>
          <a
            href={plugin.repo}
            target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#090909] border border-[#262626] text-[#999999] hover:text-white transition-colors text-[11px] relative z-20"
          >
            <GitBranch className="w-3 h-3" />
            <span>GitHub 源码</span>
          </a>
        </div>

      </div>
    </TiltCard>
  );
}
