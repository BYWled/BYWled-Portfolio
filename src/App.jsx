import { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, Activity, ArrowUpRight, Globe, CloudLightning, Server, Layers } from 'lucide-react';
import { PROJECTS } from './data/projects';
import { useStatusData } from './hooks/useStatusData';
import { useSiteDomain } from './hooks/useSiteDomain';
import {
  FlippingBadge,
  TypingSubtitle,
  ParticleCanvas,
  Header,
  Footer,
  ProjectCard,
  ProjectModal
} from './components';

const GLOBAL_STYLES = `
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #090909;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #262626;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #404040;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @keyframes flip {
    0% { transform: rotateX(90deg); opacity: 0; }
    10% { transform: rotateX(0deg); opacity: 1; }
    90% { transform: rotateX(0deg); opacity: 1; }
    100% { transform: rotateX(-90deg); opacity: 0; }
  }
  .animate-flip-text {
    animation: flip 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default function App() {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAlias, setSelectedAlias] = useState('bywled.me');

  const mainScrollRef = useRef(null);

  // 使用自定义 hook 获取状态数据
  const { statusData, overallUptime } = useStatusData();

  // 域名检测
  const siteDomain = useSiteDomain();

  // 回到顶部
  const scrollToTop = () => {
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 监听页面内部容器的滚动，控制 Header 毛玻璃
  useEffect(() => {
    const scroller = mainScrollRef.current;
    if (!scroller) return;
    const handleScroll = (e) => {
      setIsScrolled(e.target.scrollTop > 80);
    };
    scroller.addEventListener('scroll', handleScroll);
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  // 拦截锚点点击，实现平滑滚动动画
  useEffect(() => {
    const scroller = mainScrollRef.current;
    if (!scroller) return;
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scroller.addEventListener('click', handleClick);
    return () => scroller.removeEventListener('click', handleClick);
  }, []);

  // 页面可见性变化时切换标题，增加互动感
  useEffect(() => {
    const originalTitle = 'WLED.TOP';
    const hiddenTitle = '等你回来 ~~ WLED.TOP';
    const handleVisibility = () => {
      document.title = document.hidden ? hiddenTitle : originalTitle;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const copyToClipboard = (text, id) => {
    try {
      const dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) { }
  };

  const filteredProjects = PROJECTS.filter(p => {
    if (activeTab === 'mobile') return p.mobileFriendly;
    if (activeTab === 'desktop') return !p.mobileFriendly;
    return true;
  });

  return (
    // 外层容器：接管系统滚动条，实施 CSS Scroll Snap (层级吸附)
    <div
      ref={mainScrollRef}
      className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-[#090909] text-white font-sans selection:bg-[#0099ff]/30 selection:text-[#0099ff] custom-scrollbar relative"
    >
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      {/* 全局 Header */}
      <Header isScrolled={isScrolled} overallUptime={overallUptime} siteDomain={siteDomain} onDomainClick={scrollToTop} />

      {/* SECTION 1: 100vh Hero (Snap 节点) */}
      <section className="h-screen w-full snap-start snap-always relative flex flex-col justify-center items-center z-10 overflow-hidden">
        <ParticleCanvas />

        <div className="text-center px-4 z-10 max-w-5xl select-none mt-10 pointer-events-none">
          <FlippingBadge />

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-[-0.05em] leading-[0.85] uppercase mb-8 drop-shadow-2xl">
            BYWLED <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-[#333333]">PORTFOLIO</span>
          </h1>

          <TypingSubtitle />

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 pointer-events-auto">
            <a href="#projects" className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full sm:w-auto">
              进入项目展示
            </a>
            <a href="https://status.wled.top/status" target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-full bg-[#141414] border border-[#262626] text-sm text-white hover:bg-[#1c1c1c] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto group">
              <Activity className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
              查看节点状态
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 z-10 flex flex-col items-center gap-3 text-[10px] text-[#666] tracking-widest font-mono pointer-events-none">
          <span className="animate-pulse">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#666] to-transparent"></div>
        </div>
      </section>

      {/* SECTION 2: 项目展示 (Snap 节点, 内部支持溢出滚动) */}
      <section id="projects" className="h-screen w-full snap-start snap-always pt-24 pb-12 px-6 flex flex-col relative z-10 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 flex-shrink-0">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#0099ff] tracking-widest uppercase">THE GALLERY</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">生产级项目项目</h2>
            </div>

            <div className="flex p-1 bg-[#141414] rounded-full border border-[#262626] self-start md:self-auto font-mono text-[11px]">
              <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-full transition-all ${activeTab === 'all' ? 'bg-[#1c1c1c] text-white shadow-sm' : 'text-[#666] hover:text-white'}`}>ALL COMPACT</button>
              <button onClick={() => setActiveTab('mobile')} className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'mobile' ? 'bg-[#1c1c1c] text-white shadow-sm' : 'text-[#666] hover:text-white'}`}>
                <Smartphone className="w-3 h-3" /> ADAPTIVE
              </button>
              <button onClick={() => setActiveTab('desktop')} className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'desktop' ? 'bg-[#1c1c1c] text-white shadow-sm' : 'text-[#666] hover:text-white'}`}>
                <Monitor className="w-3 h-3" /> DESKTOP
              </button>
            </div>
          </div>

          {/* 内部滚动区 */}
          <div className="flex-1 overflow-y-auto pr-2 pb-10 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  status={statusData[project.id]}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 路由拓扑 (Snap 节点, 内部支持溢出滚动) */}
      <section id="infrastructure" className="h-screen w-full snap-start snap-always pt-24 pb-12 px-6 flex flex-col relative z-10 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* 左侧说明 */}
            <div className="lg:col-span-5 space-y-6 flex-shrink-0">
              <div className="text-xs font-mono text-[#0099ff] tracking-widest uppercase">ROUTING TOPOLOGY</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-none">
                域名重写，<br />同源无感分发。
              </h2>
              <p className="text-[#999999] text-sm leading-relaxed">
                在下方切换别名域名，将为你演示如何通过 Cloudflare Rules，将 `bywled.me` 与 `bywled.tech` 别名路由透明映射回主域名，客户端地址栏岿然不动。
              </p>

              <div className="flex bg-[#141414] p-1.5 rounded-xl border border-[#262626] w-max">
                {['bywled.me', 'bywled.tech'].map(alias => (
                  <button
                    key={alias}
                    onClick={() => setSelectedAlias(alias)}
                    className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${selectedAlias === alias ? 'bg-[#262626] text-white shadow-md' : 'text-[#666] hover:text-[#999]'}`}
                  >
                    {alias}
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧列表区 */}
            <div className="lg:col-span-7 bg-[#141414] border border-[#262626] rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-1000 group-hover:scale-150"></div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#262626]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/80"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]/80"></div>
                </div>
                <span className="text-[10px] font-mono text-[#666] animate-pulse">REWRITE ENGINE LIST</span>
              </div>

              <div className="space-y-3 z-10 relative">
                {PROJECTS.map(p => (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#090909] border border-[#1c1c1c] hover:border-[#333] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-mono text-xs text-white">
                        {p.id.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{p.title}</div>
                        <div className="text-[10px] text-[#666] font-mono">
                          https://{p.id}.{selectedAlias}{p.id === 'status' ? '/status' : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 sm:mt-0">
                      <a
                        href={`https://${p.id === 'www' ? 'www' : p.id}.${selectedAlias}${p.id === 'status' ? '/status' : ''}`}
                        target="_blank" rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#1c1c1c] border border-[#262626] rounded-lg text-[10px] font-mono text-[#999] hover:text-white hover:bg-[#262626] transition-all"
                      >
                        <span>访问 URL</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>

                      {p.mirrorUrl && (
                        <a
                          href={`https://${p.id === 'www' ? 'mirror' : `mirror-${p.id}`}.${selectedAlias}`}
                          target="_blank" rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#090909] border border-[#262626] rounded-lg text-[10px] font-mono text-[#999] hover:text-white hover:border-[#666] transition-all"
                        >
                          <span>Mirror</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Footer */}
      <Footer siteDomain={siteDomain} onDomainClick={scrollToTop} />

      {/* 项目详情弹窗 */}
      <ProjectModal
        project={selectedProject}
        copiedId={copiedId}
        onClose={() => setSelectedProject(null)}
        onCopy={copyToClipboard}
      />

    </div>
  );
}
