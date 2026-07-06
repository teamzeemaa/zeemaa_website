'use client';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

const industries = [
  {
    icon: 'fa-microphone-lines',
    title: 'Conferences and Summits',
    desc: 'Multi-track conferences with hundreds or thousands of delegates require a registration system that handles complexity without showing it. Zeemaa manages speaker registration, delegate categories, session access, badge printing, and on-site check-in for conferences of any scale across KSA.',
    features: ['Multi-category registration', 'Session-level access control', 'Speaker and VIP management', 'Real-time attendance tracking', 'Certificate generation for CPD'],
  },
  {
    icon: 'fa-store',
    title: 'Exhibitions and Trade Shows',
    desc: 'Exhibitions involve exhibitors, visitors, and organizer staff, each with different access requirements and registration flows. We handle exhibitor portals, visitor registration, badge printing on entry, floor plan integration, and full post-event attendance reports.',
    features: ['Exhibitor portal and management', 'Visitor pre-registration and walk-in', 'Zoned access control', 'Digital exhibitor catalogues', 'Footfall analytics by zone'],
  },
  {
    icon: 'fa-building',
    title: 'Corporate Events',
    desc: 'Corporate events demand precision, discretion, and professional execution. Whether an internal town hall, product launch, investor summit, or partner conference, Zeemaa manages the full technology layer so your team can focus on the agenda.',
    features: ['Invitation-only registration', 'Employee and guest credential management', 'Compliance and audit trail', 'Multi-venue support', 'Post-event reporting for leadership'],
  },
  {
    icon: 'fa-trophy',
    title: 'Award Ceremonies',
    desc: 'Award ceremonies are high-visibility events where every attendee experience matters. Zeemaa handles ticketing, VIP management, seating integration, and on-site badging to ensure smooth entry and a professional first impression for every guest.',
    features: ['Tiered ticketing with VIP lanes', 'Seating and table management', 'Nominee and guest credential management', 'On-site badge and lanyard printing', 'Live entry tracking'],
  },
  {
    icon: 'fa-landmark',
    title: 'Government Events',
    desc: 'Government events carry unique requirements around security, protocol, and compliance. Zeemaa supports high-security accreditation with multi-tier access, media and press management, and full audit-ready reporting aligned with Saudi government event standards.',
    features: ['Multi-tier security accreditation', 'Media and press credential management', 'Real-time security monitoring', 'Full compliance documentation', 'SCEGA-aligned workflows'],
  },
  {
    icon: 'fa-chalkboard-user',
    title: 'Workshops and Seminars',
    desc: 'Workshops and training seminars often require attendance certificates, sign-in sheets, and CPD documentation. Zeemaa automates all of this, from pre-event registration through on-site check-in to post-event certificate distribution.',
    features: ['Pre-registration and confirmation', 'On-site digital check-in', 'Automated certificate generation', 'Attendance reports for CPD', 'Small and large group support'],
  },
];

export default function IndustriesClient({ store }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <PageHero
          eyebrow="Who We Serve"
          title="Events of Every Scale and Type"
          ghost="INDUSTRIES"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        />

        <section style={{ padding: '0 32px 80px', maxWidth: 900, margin: '0 auto' }}>
          <div className="acc">
            {industries.map((ind, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`acc-item ${isOpen ? 'open' : ''}`}>
                  <button className="acc-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="acc-ic"><i className={`fas ${ind.icon}`} /></span>
                    <span className="acc-title">{ind.title}</span>
                    <span className="acc-chev"><i className="fas fa-chevron-down" /></span>
                  </button>
                  <div className="acc-body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="acc-inner">
                      <p className="acc-desc">{ind.desc}</p>
                      <div className="acc-feat-label">What we handle</div>
                      <div className="acc-feats">
                        {ind.features.map((f, j) => (
                          <div key={j} className="acc-feat">
                            <i className="fas fa-check" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Not sure if we cover your event type?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Contact us and we will tell you honestly whether we are the right fit.</p>
          <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
        </section>
      </main>
      <Footer />
    </>
  );
}