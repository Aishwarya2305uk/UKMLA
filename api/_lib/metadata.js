// Server-side metadata enrichment for lead submissions.
// Pure Node + fetch (Node 18+ on Vercel). No external dependencies.

import dns from 'node:dns/promises';

/** First hop from the proxy chain is the real client IP. */
export function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return (
    req.headers['x-real-ip'] ||
    req.headers['x-vercel-forwarded-for'] ||
    req.socket?.remoteAddress ||
    ''
  );
}

/** Geo headers Vercel injects at the edge (free, no API call). */
export function getVercelGeo(req) {
  const h = req.headers;
  const dec = (v) => {
    if (!v) return '';
    try { return decodeURIComponent(v); } catch { return v; }
  };
  return {
    country: h['x-vercel-ip-country'] || '',
    countryRegion: dec(h['x-vercel-ip-country-region']),
    city: dec(h['x-vercel-ip-city']),
    latitude: h['x-vercel-ip-latitude'] || '',
    longitude: h['x-vercel-ip-longitude'] || '',
    timezone: h['x-vercel-ip-timezone'] || '',
  };
}

/** Lightweight user-agent parser → browser / OS / device. */
export function parseUserAgent(ua = '') {
  const out = { browser: 'Unknown', os: 'Unknown', device: 'Unknown', deviceType: 'desktop' };
  if (!ua) return out;
  let m;

  // Browser (order matters: Edge/Opera masquerade as Chrome)
  if ((m = ua.match(/Edg(?:e|A|iOS)?\/([\d.]+)/))) out.browser = `Edge ${m[1]}`;
  else if ((m = ua.match(/OPR\/([\d.]+)/))) out.browser = `Opera ${m[1]}`;
  else if ((m = ua.match(/SamsungBrowser\/([\d.]+)/))) out.browser = `Samsung Internet ${m[1]}`;
  else if ((m = ua.match(/Chrome\/([\d.]+)/))) out.browser = `Chrome ${m[1]}`;
  else if ((m = ua.match(/Firefox\/([\d.]+)/))) out.browser = `Firefox ${m[1]}`;
  else if ((m = ua.match(/Version\/([\d.]+).*Safari/))) out.browser = `Safari ${m[1]}`;
  else if (/Safari/.test(ua)) out.browser = 'Safari';

  // OS
  if ((m = ua.match(/Windows NT ([\d.]+)/))) {
    const map = { '10.0': '10/11', '6.3': '8.1', '6.2': '8', '6.1': '7' };
    out.os = `Windows ${map[m[1]] || m[1]}`;
  } else if ((m = ua.match(/Mac OS X (\d+[_.]\d+[_.]?\d*)/))) {
    out.os = `macOS ${m[1].replace(/_/g, '.')}`;
  } else if (/iPhone|iPad|iPod/.test(ua) && (m = ua.match(/OS (\d+_\d+_?\d*)/))) {
    out.os = `iOS ${m[1].replace(/_/g, '.')}`;
  } else if ((m = ua.match(/Android ([\d.]+)/))) {
    out.os = `Android ${m[1]}`;
  } else if (/CrOS/.test(ua)) {
    out.os = 'ChromeOS';
  } else if (/Linux/.test(ua)) {
    out.os = 'Linux';
  }

  // Device name + type
  if (/iPhone/.test(ua)) { out.device = 'Apple iPhone'; out.deviceType = 'mobile'; }
  else if (/iPad/.test(ua)) { out.device = 'Apple iPad'; out.deviceType = 'tablet'; }
  else if (/Macintosh/.test(ua)) { out.device = 'Apple Macintosh'; out.deviceType = 'desktop'; }
  else if (/Android/.test(ua)) {
    out.deviceType = /Mobile/.test(ua) ? 'mobile' : 'tablet';
    const md = ua.match(/;\s*([^;)]+?)\s+Build\//);
    out.device = md ? md[1].trim() : 'Android device';
  } else if (/Windows/.test(ua)) { out.device = 'Windows PC'; out.deviceType = 'desktop'; }
  else if (/CrOS/.test(ua)) { out.device = 'Chromebook'; out.deviceType = 'desktop'; }
  else if (/Linux/.test(ua)) { out.device = 'Linux device'; out.deviceType = 'desktop'; }

  return out;
}

/** Reverse DNS (PTR) lookup — best effort, never throws. */
export async function reverseDns(ip) {
  if (!ip) return '';
  try {
    const names = await dns.reverse(ip);
    return (names && names[0]) || '';
  } catch {
    return '';
  }
}

/**
 * IP intelligence via ipinfo.io. Works without a token (rate-limited);
 * set IPINFO_TOKEN for full/reliable data. Never throws.
 * org looks like "AS24560 Bharti Airtel Ltd." — matches the ISP column.
 */
export async function ipIntel(ip) {
  const out = { isp: '', org: '', asn: '', hostname: '', city: '', region: '', country: '', loc: '' };
  if (!ip) return out;
  try {
    const token = process.env.IPINFO_TOKEN;
    const url = `https://ipinfo.io/${encodeURIComponent(ip)}/json${token ? `?token=${token}` : ''}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return out;
    const d = await res.json();
    out.org = d.org || '';
    out.isp = d.org || '';
    out.asn = (d.org || '').split(' ')[0] || '';
    out.hostname = d.hostname || '';
    out.city = d.city || '';
    out.region = d.region || '';
    out.country = d.country || '';
    out.loc = d.loc || '';
  } catch {
    /* ignore — enrichment is optional */
  }
  return out;
}
