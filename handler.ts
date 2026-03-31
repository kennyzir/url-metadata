// ClawHub Local Skill - runs entirely in your agent, no API key required
// URL Metadata Fetcher - Get OG tags, title, description, favicon from any URL

function extractMeta(html: string, name: string): string | null {
  const propRe = new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i');
  const m = html.match(propRe);
  if (m) return m[1];
  const revRe = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${name}["']`, 'i');
  const r = html.match(revRe);
  return r ? r[1] : null;
}
function extractTag(html: string, tag: string): string | null {
  const m = html.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i'));
  return m ? m[1].trim() : null;
}
function extractFavicon(html: string, baseUrl: string): string | null {
  const m = html.match(/<link[^>]+rel=["'](?:icon|shortcut icon)["'][^>]+href=["']([^"']*)["']/i);
  if (!m) return `${new URL(baseUrl).origin}/favicon.ico`;
  const href = m[1];
  if (href.startsWith('http')) return href;
  if (href.startsWith('//')) return `https:${href}`;
  return new URL(href, baseUrl).href;
}

export async function run(input: { url: string }) {
  if (!input.url || typeof input.url !== 'string') throw new Error('url is required');
  try { new URL(input.url); } catch { throw new Error('Invalid URL format'); }
  const startTime = Date.now();
  const response = await fetch(input.url, {
    headers: { 'User-Agent': 'Claw0x-URLMeta/1.0', 'Accept': 'text/html' },
    redirect: 'follow', signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Failed to fetch URL: ${response.status}`);
  const html = await response.text();
  const canonicalLink = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const langMatch = html.match(/<html[^>]+lang=["']([^"']*)["']/i);
  return {
    url: response.url, title: extractTag(html, 'title'), description: extractMeta(html, 'description'),
    og_title: extractMeta(html, 'og:title'), og_description: extractMeta(html, 'og:description'),
    og_image: extractMeta(html, 'og:image'), og_type: extractMeta(html, 'og:type'),
    og_site_name: extractMeta(html, 'og:site_name'),
    twitter_card: extractMeta(html, 'twitter:card'), twitter_title: extractMeta(html, 'twitter:title'),
    twitter_description: extractMeta(html, 'twitter:description'), twitter_image: extractMeta(html, 'twitter:image'),
    favicon: extractFavicon(html, response.url),
    canonical: extractMeta(html, 'canonical') || (canonicalLink ? canonicalLink[1] : null),
    language: langMatch ? langMatch[1] : null, author: extractMeta(html, 'author'),
    _meta: { skill: 'url-metadata', latency_ms: Date.now() - startTime, final_url: response.url, status_code: response.status },
  };
}
export default run;
