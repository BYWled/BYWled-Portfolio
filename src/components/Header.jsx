import { Activity } from 'lucide-react';

const HEADER_STYLES = `
  @keyframes domainHighlight {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .domain-highlight {
    background-image: linear-gradient(
      90deg,
      rgba(255,255,255,0.4) 0%,
      rgba(0,153,255,0.8) 40%,
      rgba(255,255,255,1) 50%,
      rgba(0,153,255,0.8) 60%,
      rgba(255,255,255,0.4) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: domainHighlight 4s ease-in-out infinite;
  }
`;

export function Header({ isScrolled, overallUptime, siteDomain, onDomainClick }) {
  return (
    <header className={`fixed top-0 left-0 w-full flex justify-center z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#090909]/70 backdrop-blur-xl border-b border-[#262626]' : 'bg-transparent'}`}>
      <style dangerouslySetInnerHTML={{ __html: HEADER_STYLES }} />
      <div className="w-full max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onDomainClick} className="font-bold tracking-[-1px] text-lg domain-highlight cursor-pointer">
            {siteDomain}
          </button>
        </div>
        <nav className="flex items-center gap-6 text-sm text-[#999999]">
          <a href="#projects" className="hover:text-white transition-colors">项目展示</a>
          <a href="#infrastructure" className="hover:text-white transition-colors hidden md:inline">节点分布</a>
          <a href="https://status.wled.top/status" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Status <span className="text-[10px] text-emerald-500">{overallUptime || '...'}%</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
