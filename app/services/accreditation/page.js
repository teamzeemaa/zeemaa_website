import { readStore } from '../../../lib/store';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Breadcrumb from '../../../components/Breadcrumb';
import RelatedServices from '../../../components/RelatedServices';
import AccessControlReveal from './AccessControlReveal';

export const metadata = {
  title: 'Event Accreditation Services in Saudi Arabia | QR and RFID | Zeemaa',
  description: 'Event accreditation services and an access control platform for Saudi Arabia. QR-coded badges by default, with RFID wristbands and cards available for high-volume gates and cashless on-site spending, fully managed by Zeemaa.',
  alternates: { canonical: 'https://zeemaa.com/services/accreditation' },
};

export default async function AccreditationPage() {
  const store = await readStore();

  const features = [
    { icon:'fa-layer-group', t:'Multi-Tier Accreditation', d:'VIP, speaker, exhibitor, staff, and media categories, each with its own access rules and privileges.' },
    { icon:'fa-qrcode', t:'QR Badges by Default', d:'Every attendee gets a QR-coded credential as standard, scanned at every checkpoint with no extra hardware.' },
    { icon:'fa-wave-square', t:'RFID as an Option', d:'Tap-to-enter wristbands or cards available alongside QR for high-volume gates or cashless on-site payments, never as a replacement.' },
    { icon:'fa-door-open', t:'Zone-Based Access Control', d:'Entry points and session gates enforce each attendee tier automatically, so restricted areas stay restricted.' },
    { icon:'fa-bolt', t:'Real-Time Verification', d:'Credential checks happen instantly, with unauthorized attempts flagged the moment they occur, no manual guest lists.' },
    { icon:'fa-headset', t:'On-Site Credential Support', d:'Our team manages accreditation desks, reprints, and reissues throughout the event, in Riyadh and across the Kingdom.' },
  ];

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Accreditation' }]} />
              <span className="isp-tag">Access Control</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">Core Product</p>
                <h1 className="st2 isp-h1">Event Accreditation Services in Saudi Arabia</h1>
                <p className="isp-desc">
                  Zeemaa runs the full accreditation and access control layer for your event, built QR-first with RFID available as an optional credential format. Multi-tier credentials, zone-based gates, and real-time verification, fully managed by our team in Riyadh and across the Kingdom.
                </p>
                <div className="isp-cta-row">
                  <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
                  <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">QR-First Credentials</span>
                <span className="isp-chip isp-chip-b">RFID Optional</span>
                <div className="isp-panel">
                  <AccessControlReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">What You Get</p>
            <h2 className="st2">Everything Accreditation Should Do</h2>
            <p className="sst">One access control platform that handles credentials, verification, and zone enforcement, whether you run QR only or QR with RFID.</p>
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
          <h2 className="st2">From Setup to Gate Verification</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'We set up your accreditation tiers', d:'You share your categories and access rules. Our team sets up multi-tier accreditation and lets you choose QR, RFID, or both.' },
              { n:'2', t:'Attendees receive their credential at check-in', d:'A QR-coded badge is issued by default. If you have selected RFID, wristbands or cards are issued alongside it.' },
              { n:'3', t:'Access is verified in real time', d:'Every checkpoint checks the credential instantly against the attendee tier, flagging anything outside their access.' },
              { n:'4', t:'Our team manages accreditation on event day', d:'Accreditation desks, reprints, and reissues are handled on-site, so gate control never slows down.' },
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

        <RelatedServices currentHref="/services/accreditation" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Need accreditation and access control for your event?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Tell us your access tiers and we will scope the right QR and RFID setup for you.</p>
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
