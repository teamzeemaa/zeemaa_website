/* ─────────────────────────────────────────────────────────────
   Zeemaa tracking utility
   All GA4 events + Google Ads conversion fires go through here.
   Import and call from form submit handlers and CTA clicks.
───────────────────────────────────────────────────────────── */

function gtag(...args) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/* ── Inject GCLID from sessionStorage into a hidden form field ── */
export function injectGclid(formElement) {
  if (typeof window === 'undefined') return;
  try {
    const gclid = sessionStorage.getItem('_gclid');
    if (!gclid) return;
    let input = formElement.querySelector('input[name="gclid"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'gclid';
      formElement.appendChild(input);
    }
    input.value = gclid;
  } catch {}
}

/* ── Capture UTM params from URL into sessionStorage ── */
export function captureUtm() {
  if (typeof window === 'undefined') return;
  try {
    const u = new URL(window.location.href);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k => {
      const v = u.searchParams.get(k);
      if (v) sessionStorage.setItem(k, v);
    });
  } catch {}
}

/* ── Read stored UTMs as an object (inject into forms) ── */
export function getUtms() {
  if (typeof window === 'undefined') return {};
  const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];
  return keys.reduce((acc, k) => {
    const v = sessionStorage.getItem(k === 'gclid' ? '_gclid' : k);
    if (v) acc[k] = v;
    return acc;
  }, {});
}

/* ── Demo form submitted ── */
export function trackDemoSubmit() {
  gtag('event', 'conversion', {
    send_to: window._GADS_CONV_DEMO,
    event_callback: () => {},
  });
  gtag('event', 'generate_lead', {
    event_category: 'Lead',
    event_label: 'Demo Request',
    value: 1,
  });
}

/* ── Contact form submitted ── */
export function trackContactSubmit() {
  gtag('event', 'conversion', {
    send_to: window._GADS_CONV_CONTACT,
    event_callback: () => {},
  });
  gtag('event', 'generate_lead', {
    event_category: 'Lead',
    event_label: 'Contact Form',
    value: 1,
  });
}

/* ── WhatsApp click ── */
export function trackWhatsApp() {
  gtag('event', 'click', { event_category: 'Contact', event_label: 'WhatsApp' });
}

/* ── Phone click ── */
export function trackPhone() {
  gtag('event', 'click', { event_category: 'Contact', event_label: 'Phone' });
}

/* ── Profile download ── */
export function trackProfileDownload() {
  gtag('event', 'file_download', { event_category: 'Engagement', event_label: 'Company Profile' });
}

/* ── CTA / Book Demo button click (before form open) ── */
export function trackDemoOpen(source) {
  gtag('event', 'click', { event_category: 'CTA', event_label: `Demo Open – ${source}` });
}

/* ── Scroll depth (call once per threshold) ── */
export function trackScrollDepth(pct) {
  gtag('event', 'scroll', { event_category: 'Engagement', event_label: `${pct}%`, value: pct });
}
