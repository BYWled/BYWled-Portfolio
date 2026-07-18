import { useMemo } from 'react';

// 已知域名 → 显示名称映射
const DOMAIN_MAP = {
  'wled.top': 'WLED.TOP',
  'bywled.me': 'BYWLED.ME',
  'bywled.tech': 'BYWLED.TECH',
};

const FALLBACK = 'WLED.TOP';

/**
 * 根据当前访问域名返回对应的站点名称
 * 支持子域名（www.wled.top → WLED.TOP）
 * 未知域名兜底为 WLED.TOP
 */
export function useSiteDomain() {
  return useMemo(() => {
    const hostname = window.location.hostname;

    // localhost / IP / 开发环境
    if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return FALLBACK;
    }

    const parts = hostname.split('.');
    // 提取根域名（最后两段）
    const root = parts.length >= 2
      ? parts.slice(-2).join('.')
      : hostname;

    return DOMAIN_MAP[root] || FALLBACK;
  }, []);
}
