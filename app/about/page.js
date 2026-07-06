import { readStore } from '../../lib/store';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { LogoIcon, LogoText } from '../../components/Logo';
import PageHero from '../../components/PageHero';
import MissionVisual from './MissionVisual';
import VisionVisual from './VisionVisual';
import Vision2030Visual from './Vision2030Visual';

export const metadata = {
  title: 'About | Zeemaa Event Technology',
  description: 'Zeemaa is Saudi Arabia fully managed event technology partner, headquartered in Riyadh with operations across the Kingdom.',
  alternates: { canonical: 'https://zeemaa.com/about' },
};

export default async function AboutPage() {
  const store = await readStore();
  const locations = (store.locations || []).filter(l => l.enabled);

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <PageHero
          eyebrow="Who We Are"
          title="Saudi Arabia's Fully Managed Event Technology Partner"
          ghost="ABOUT"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        />

        {/* Our Mission */}
        <section className="svcx" id="mission">
          <div className="svcx-in">
            <div className="svcx-row">
              <div className="svcx-copy">
                <p className="sey">What Drives Us</p>
                <h2 className="st2">Our Mission</h2>
                <p className="svcx-sub">To empower event organizers across Saudi Arabia with technology that makes registration, accreditation, and attendee management seamless and professional.</p>
                <p className="svcx-sub">We do not sell software and leave. Our team stays involved from the first conversation through event day, managing badge printing, check-in, and on-site support so organizers can focus on the event itself, not the technology behind it.</p>
              </div>
              <div className="svcx-media svcx-media-bare"><MissionVisual /></div>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="svcx" id="vision">
          <div className="svcx-in">
            <div className="svcx-row flip">
              <div className="svcx-copy">
                <p className="sey">Where We Are Headed</p>
                <h2 className="st2">Our Vision</h2>
                <p className="svcx-sub">To be the most trusted technology partner for events in the Kingdom, driving innovation and digital transformation in how events are planned, executed, and experienced across KSA.</p>
                <p className="svcx-sub">That means tools that work the same way in Riyadh as they do in Dammam, backed by a local team that understands how events actually run on the ground, across conferences, exhibitions, corporate events, and government programs alike.</p>
              </div>
              <div className="svcx-media svcx-media-bare"><VisionVisual /></div>
            </div>
          </div>
        </section>

        {/* Vision 2030 alignment: distinct centered showcase, not the alternating copy/media layout above */}
        <section className="svcx v30band" id="vision2030">
          <div className="svcx-in" style={{ maxWidth: 760, textAlign: 'center' }}>
            <p className="sey" style={{ justifyContent: 'center' }}>National Alignment</p>
            <h2 className="st2" style={{ textAlign: 'center' }}>Aligned with Saudi Vision 2030</h2>
            <p className="svcx-sub" style={{ textAlign: 'center' }}>Supporting Saudi Arabia&apos;s journey toward a vibrant society and diversified economy by enabling world-class events through local expertise, innovation, and regional leadership.</p>
          </div>
          <div style={{ maxWidth: 520, margin: '32px auto 0' }}>
            <Vision2030Visual />
          </div>
          <div className="svcx-in" style={{ maxWidth: 760, textAlign: 'center', margin: '28px auto 0' }}>
            <p className="svcx-sub" style={{ textAlign: 'center', marginBottom: 0 }}>Every conference, exhibition, and ceremony we support adds to a growing events sector in the Kingdom, one of the pillars Vision 2030 identifies as central to a more vibrant, connected society and a more diversified, ambitious economy.</p>
          </div>
        </section>

        {/* Story: split layout, main text + sidebar card */}
        <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <p className="sey">Our Story</p>
              <h2 className="st2">Built in Riyadh. Built for KSA.</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 16, textAlign: 'justify' }}>
                Zeemaa started with a clear observation. Event organizers in Saudi Arabia were either relying on expensive international vendors or patching together multiple local tools that did not speak to each other. Neither worked well.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 16, textAlign: 'justify' }}>
                We built Zeemaa to be the opposite. One company. One team. One platform that handles registration, check-in, badging, accreditation, ticketing, certificates, communications, and security. Fully managed, so the organizer can focus on the event itself.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, textAlign: 'justify' }}>
                We are QR-first by design. QR codes work on every device, print on every badge, and require no special wristband or card infrastructure. Fast, cost-effective, and reliable for conferences, exhibitions, and corporate events of every scale.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: 16, textAlign: 'justify' }}>
                Headquartered in Riyadh, we run fully managed operations across the Kingdom, with on-ground presence in the Eastern Province.
              </p>
            </div>
            <aside style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, position: 'sticky', top: 100 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#00D4B4', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 20 }}>At a Glance</div>
              {[
                { label: 'Headquarters', value: 'Riyadh, Saudi Arabia' },
                { label: 'Operations', value: 'Across KSA, Eastern Province presence' },
                { label: 'Focus', value: 'Conferences, exhibitions, corporate events' },
                { label: 'Technology', value: 'QR-first, fast and reliable' },
                { label: 'Model', value: 'Fully managed on-site operations' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '14px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{item.value}</div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* Why QR */}
        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '80px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">Our Technology Choice</p>
            <h2 className="st2">Why We Lead With QR</h2>
            <p className="sst">QR is our default because it is fast, flexible, and works everywhere. Here is what that means for your event.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[
                { icon: 'fa-bolt', title: 'Faster check-in', text: 'QR scanning is instantaneous on any smartphone camera. Attendees move through the gate quickly, with no queues building up on event day.' },
                { icon: 'fa-dollar-sign', title: 'Lower cost', text: 'QR codes print on any badge from any printer. No special card stock and no extra hardware, which keeps event technology costs down.' },
                { icon: 'fa-shield-halved', title: 'Works everywhere', text: 'A QR code on a badge is simple and dependable. It scans on phones, tablets, and dedicated scanners, and works as long as the badge exists.' },
              ].map((c, i) => (
                <div key={i} className="pc">
                  <div className="pci"><i className={`fas ${c.icon}`} /></div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        {locations.length > 0 && (
          <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}>
            <p className="sey">Our Presence</p>
            <h2 className="st2">Based in Saudi Arabia</h2>
            <p className="sst">Headquartered in Riyadh and operating across the Kingdom, with on-ground presence in the Eastern Province.</p>
            <div className="lgrid">
              {locations.map(l => (
                <div key={l.id} className="lc">
                  <i className="fas fa-map-marker-alt" />
                  <h3>{l.city}</h3>
                  <div className="cy">{l.country}</div>
                  <div className="lt">{l.type}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="zpattern" style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to work with us?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Tell us about your next event and we will take it from there.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
            <a href="/profile" className="bg-profile"><i className="fas fa-file-lines" /> View Company Profile</a>
            <a href="/services" className="bgh"><i className="fas fa-arrow-right" /> See Our Services</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="fbot" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px' }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>2025 Zeemaa. All rights reserved.</span>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Back to Home</a>
        </div>
      </footer>
    <Footer /></>
  );
}
