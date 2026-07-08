import { readStore } from '../../../lib/store';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Breadcrumb from '../../../components/Breadcrumb';
import RelatedServices from '../../../components/RelatedServices';
import BadgePrintReveal from './BadgePrintReveal';

export const metadata = {
  title: 'Badge Printing and Accreditation in Saudi Arabia | Zeemaa',
  description: 'On-site badge printing and zone-based accreditation for conferences, exhibitions, and corporate events across Saudi Arabia. QR-coded badges, role-based access, and real-time gate control, fully managed by Zeemaa.',
  alternates: {
    canonical: 'https://zeemaa.com/services/badge-printing',
    languages: { en: 'https://zeemaa.com/services/badge-printing', ar: 'https://zeemaa.com/ar/services/badge-printing' },
  },
};

export default async function BadgePrintingPage() {
  const store = await readStore();

  const features = [
    { icon:'fa-print', t:'On-Demand Badge Printing', d:'Attendees get their badge the moment they check in, printed on-site with no pre-printing or manual sorting required.' },
    { icon:'fa-qrcode', t:'QR-Coded Badges', d:'Every badge carries a unique QR code tied to the attendee profile, used for entry, session access, and lead capture.' },
    { icon:'fa-id-badge', t:'Custom Badge Design', d:'Branded templates with attendee photo, name, company, and category, matched to your event identity.' },
    { icon:'fa-user-shield', t:'Role-Based Accreditation', d:'Set access tiers such as VIP, speaker, exhibitor, staff, and media, enforced directly through the badge itself.' },
    { icon:'fa-door-open', t:'Real-Time Access Control', d:'QR scans at entry points and zone checkpoints verify access instantly and flag anything outside the attendee’s tier.' },
    { icon:'fa-headset', t:'On-Site Support Team', d:'Our team runs the printing stations and accreditation desks throughout the event, handling reprints and edge cases on the spot.' },
  ];

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Badge Printing' }]} />
              <span className="isp-tag">On-Site</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">Core Product</p>
                <h1 className="st2 isp-h1">Badge Printing and Accreditation for Saudi Arabia</h1>
                <p className="isp-desc">
                  Zeemaa handles badge printing and accreditation on-site, from a branded badge design to zone-based access control at the gate. Built for conferences, exhibitions, and corporate events across the Kingdom, and fully managed by our team so check-in never slows down.
                </p>
                <div className="isp-cta-row">
                  <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
                  <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">QR-Coded Access</span>
                <span className="isp-chip isp-chip-b">Instant Printing</span>
                <div className="isp-panel">
                  <BadgePrintReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">What You Get</p>
            <h2 className="st2">Everything Badge Printing Should Do</h2>
            <p className="sst">One system that handles design, printing, and access control, without separate vendors or manual check-in lists.</p>
            <div className="pgrid">
              {features.map((c, i) => (
                <div key={i} className="pc">
                  <div className="pci"><i className={`fas ${c.icon}`} /></div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '70px 32px', maxWidth: 1000, margin: '0 auto' }}>
          <p className="sey">How It Works</p>
          <h2 className="st2">From Design to Gate Control</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'We design your badge and access tiers', d:'You share your event details and categories. Our team designs branded badge templates and sets up access tiers such as VIP, speaker, exhibitor, and staff.' },
              { n:'2', t:'Attendees get instant, QR-coded badges', d:'On check-in, each badge prints on demand with a QR code tied to the attendee’s profile and access level.' },
              { n:'3', t:'QR scans control access at every checkpoint', d:'Entry points, VIP areas, and sessions are gated by real-time QR verification, with unauthorized attempts flagged instantly.' },
              { n:'4', t:'Our team runs the stations on event day', d:'Printing, distribution, and reprints are handled on-site by Zeemaa staff, so check-in and access control never bottleneck.' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.t}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, textAlign: 'justify' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <RelatedServices currentHref="/services/badge-printing" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Need badge printing and accreditation for your event?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Tell us your access tiers and we will scope the right badge and accreditation setup for you.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
            <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
