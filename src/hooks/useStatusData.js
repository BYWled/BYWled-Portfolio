import { useState, useEffect } from 'react';

// 状态数据源：GitHub Actions (Upptime) 自动生成的开放汇总 JSON
// 仓库: https://github.com/BYWled/wled-status → history/summary.json
// 字段: { name, url, status: 'up'|'down', uptimeDay, timeDay(24h 平均响应 ms), ... }
// raw.githubusercontent.com 自带 CORS 且约 5 分钟 CDN 缓存，轮询间隔与之对齐
const STATUS_SUMMARY_URL = 'https://raw.githubusercontent.com/BYWled/wled-status/main/history/summary.json';
const REFRESH_INTERVAL = 5 * 60 * 1000;

// 项目 ID → 被监控站点 URL 映射（tools 尚未加入 Upptime 监控列表，暂无状态数据）
export const MONITOR_MAP = {
  www: 'https://www.wled.top',
  blog: 'https://blog.wled.top',
  store: 'https://store.wled.top',
  admin: 'https://admin.wled.top',
  score: 'https://score.wled.top',
  city: 'https://city.wled.top',
};

export function useStatusData() {
  const [statusData, setStatusData] = useState({});
  const [overallUptime, setOverallUptime] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        const response = await fetch(STATUS_SUMMARY_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const sites = await response.json();

        const byUrl = new Map(sites.map(site => [site.url, site]));
        const metrics = {};

        Object.entries(MONITOR_MAP).forEach(([projectId, url]) => {
          const site = byUrl.get(url);
          if (!site) return;
          metrics[projectId] = {
            ping: site.timeDay || 0, // 24h 平均响应时间 (ms)
            status: site.status === 'up' ? 'up' : site.status === 'down' ? 'down' : 'pending',
            uptime: site.uptimeDay, // 24h 在线率，如 "100.00%"
          };
        });

        if (!isMounted) return;
        setStatusData(metrics);

        const monitored = Object.values(metrics);
        const upCount = monitored.filter(m => m.status === 'up').length;
        setOverallUptime(monitored.length ? ((upCount / monitored.length) * 100).toFixed(1) : null);
      } catch (error) {
        // 拉取失败：保留上次成功数据（或空态），绝不展示模拟数据
        console.warn('Status summary fetch failed:', error.message);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, REFRESH_INTERVAL);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  return { statusData, overallUptime };
}
