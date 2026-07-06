// Service options an editor can attach to a post as the inline mid-article CTA.
// Only services with a real dedicated page are listed as `href`-linked; the rest
// fall back to the general /services page, matching the convention used by
// lib/servicesList.js and components/RelatedServices.js elsewhere on the site.
export const SERVICE_CTA_OPTIONS = [
  { slug: 'registration', name: 'Registration & Check-in', href: '/services/registration', icon: 'fa-desktop', line: 'Branded sign-up pages with QR check-in built in from day one.' },
  { slug: 'accreditation', name: 'Accreditation & Access Control', href: '/services/accreditation', icon: 'fa-user-check', line: 'Zone-based credentials with QR-first, RFID-optional verification.' },
  { slug: 'ticketing', name: 'Ticketing', href: '/services/ticketing', icon: 'fa-ticket', line: 'Tiered pricing and secure payment through MADA, Apple Pay, and Moyasar.' },
  { slug: 'onsite-comms', name: 'On-Site Communication & CCTV', href: '/services', icon: 'fa-walkie-talkie', line: 'Staff coordination systems and event surveillance, managed on the ground.' },
];

export function getServiceCta(slug) {
  return SERVICE_CTA_OPTIONS.find(s => s.slug === slug) || null;
}

export function getPublishedPosts(store) {
  return (store.blog || [])
    .filter(p => p.published)
    .sort((a, b) => new Date(b.datePublished || b.createdAt) - new Date(a.datePublished || a.createdAt));
}

export function getFeaturedPost(store) {
  const posts = getPublishedPosts(store);
  return posts.find(p => p.pinned) || posts[0] || null;
}

export function getPostBySlug(store, slug) {
  return (store.blog || []).find(p => p.slug === slug && p.published) || null;
}

// Manual relatedPostSlugs first (in the order the editor set), then auto-fill
// remaining slots from posts sharing the same pillarTag, newest first.
export function getRelatedPosts(store, post, max = 3) {
  const all = getPublishedPosts(store).filter(p => p.slug !== post.slug);
  const manual = (post.relatedPostSlugs || [])
    .map(slug => all.find(p => p.slug === slug))
    .filter(Boolean);
  const seen = new Set(manual.map(p => p.slug));
  const autoFill = all.filter(p => !seen.has(p.slug) && p.pillarTag && p.pillarTag === post.pillarTag);
  return [...manual, ...autoFill].slice(0, max);
}

// Splits an HTML body roughly at its midpoint (by character length across
// block-level chunks) so an inline CTA card can be inserted between the two
// halves without cutting a tag in two.
export function splitContentAtMidpoint(html) {
  if (!html) return ['', ''];
  const chunks = html.split(/(<\/(?:p|h2|h3|h4|ul|ol|blockquote|figure)>)/i);
  const blocks = [];
  for (let i = 0; i < chunks.length; i += 2) {
    const block = (chunks[i] || '') + (chunks[i + 1] || '');
    if (block.trim()) blocks.push(block);
  }
  if (blocks.length < 2) return [html, ''];
  const totalLen = blocks.reduce((n, b) => n + b.length, 0);
  let running = 0;
  let cut = blocks.length - 1;
  for (let i = 0; i < blocks.length; i++) {
    running += blocks[i].length;
    if (running >= totalLen / 2) { cut = i + 1; break; }
  }
  return [blocks.slice(0, cut).join(''), blocks.slice(cut).join('')];
}
