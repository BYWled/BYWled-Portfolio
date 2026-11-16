import { useState, useEffect } from 'react';
import { PLUGINS } from '../data/plugins';

// npm 批量下载量接口：一次请求返回全部包的近 30 天下载量，自带 CORS
// 注意：无下载记录的包返回 null（新发布插件常见），调用方需兼容
const BULK_DOWNLOADS_URL = `https://api.npmjs.org/downloads/point/last-month/${PLUGINS.map(p => p.pkg).join(',')}`;

// registry.npmjs.org 的 /latest 端点返回最新版 packument，自带 CORS
// 用于实时获取版本号与许可证，插件发布新版后网页自动更新，无需改代码
const latestUrl = pkg => `https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`;

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 分钟

// license 字段可能是字符串或 { type } 对象
const normalizeLicense = (l) => (typeof l === 'string' ? l : l?.type) || null;

/**
 * 实时获取全部 Koishi 插件的 npm 元数据
 * 返回 { versions: {pkg: string}, licenses: {pkg: string}, downloads: {pkg: number} }
 * 任一来源失败时保留对应字段的上次成功数据（或缺失，由调用方兜底）
 */
export function useNpmMeta() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMeta = async () => {
      try {
        // 版本/许可证（逐包并行，失败不拖累其他包）+ 下载量（单次批量）
        const [versionResults, downloadsRes] = await Promise.all([
          Promise.all(PLUGINS.map(async pkg0 => {
            try {
              const response = await fetch(latestUrl(pkg0.pkg));
              if (!response.ok) throw new Error(`HTTP ${response.status}`);
              const packument = await response.json();
              return [pkg0.pkg, { version: packument.version, license: normalizeLicense(packument.license) }];
            } catch (err) {
              console.warn(`Failed to fetch latest version for ${pkg0.pkg}:`, err.message);
              return [pkg0.pkg, null];
            }
          })),
          fetch(BULK_DOWNLOADS_URL)
            .then(r => (r.ok ? r.json() : {}))
            .catch(() => ({})),
        ]);

        if (!isMounted) return;

        const versions = {};
        const licenses = {};
        const downloads = {};
        versionResults.forEach(([pkg, data]) => {
          if (data) {
            versions[pkg] = data.version;
            licenses[pkg] = data.license;
          }
        });
        Object.entries(downloadsRes).forEach(([pkg, info]) => {
          if (info && typeof info.downloads === 'number') downloads[pkg] = info.downloads;
        });

        // 与上次成功数据合并，避免单包失败洗掉整体状态
        setMeta(prev => ({
          versions: { ...prev?.versions, ...versions },
          licenses: { ...prev?.licenses, ...licenses },
          downloads: { ...prev?.downloads, ...downloads },
        }));
      } catch (error) {
        console.warn('npm meta fetch failed:', error.message);
      }
    };

    fetchMeta();
    const interval = setInterval(fetchMeta, REFRESH_INTERVAL);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  return meta;
}
