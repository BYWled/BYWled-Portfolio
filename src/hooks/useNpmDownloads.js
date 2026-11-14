import { useState, useEffect } from 'react';
import { PLUGINS } from '../data/plugins';

// npm 批量下载量接口：一次请求返回全部包的近 30 天下载量，自带 CORS
const BULK_URL = `https://api.npmjs.org/downloads/point/last-month/${PLUGINS.map(p => p.pkg).join(',')}`;
const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 分钟

/**
 * 实时获取全部 Koishi 插件的 npm 月下载量
 * 返回 { [pkg]: number }；拉取失败时保留上次成功数据（或 null）
 */
export function useNpmDownloads() {
  const [downloads, setDownloads] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDownloads = async () => {
      try {
        const response = await fetch(BULK_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const map = {};
        Object.entries(data).forEach(([pkg, info]) => {
          if (info && typeof info.downloads === 'number') map[pkg] = info.downloads;
        });
        if (isMounted && Object.keys(map).length > 0) setDownloads(map);
      } catch (error) {
        console.warn('npm downloads fetch failed:', error.message);
      }
    };

    fetchDownloads();
    const interval = setInterval(fetchDownloads, REFRESH_INTERVAL);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  return downloads;
}
