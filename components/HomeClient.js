'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { LogoIcon, LogoText } from './Logo';
import { countries } from '../lib/countries';
import { getPublishedPosts } from '../lib/blog';
import PostCard from './blog/PostCard';
import MissionVisionCards from './MissionVisionCards';
import {
  captureUtm, getUtms,
  trackWhatsApp, trackPhone,
  trackDemoOpen,
  trackScrollDepth,
} from '../lib/tracking';

export default function HomeClient({ store }) {
  const { sections, stats, testimonials, gallery, faq, locations, partners } = store;
  const latestPosts = getPublishedPosts(store).slice(0, 3);
  const qrRef      = useRef(null);
  const [showTop, setShowTop]   = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ fullName:'', email:'', phone:'', countryCode:'+966', message:'' });
  const [demoForm,    setDemoForm]    = useState({ fullName:'', email:'', phone:'', countryCode:'+966', company:'', eventType:'', demoPreference:'', message:'' });
  const [submitting, setSubmitting]   = useState(false);

  /* ── UTM capture on mount ── */
  useEffect(() => { captureUtm(); }, []);

  /* ── QR canvas ── */
  useEffect(() => {
    const c = qrRef.current; if (!c) return;
    const x = c.getContext('2d');
    x.fillStyle = '#0a1220'; x.fillRect(0,0,90,90);
    const drawFinder = (a,b) => {
      x.fillStyle='#00D4B4'; x.fillRect(a,b,18,18);
      x.fillStyle='#0a1220'; x.fillRect(a+3,b+3,12,12);
      x.fillStyle='#00D4B4'; x.fillRect(a+6,b+6,6,6);
    };
    drawFinder(6,6); drawFinder(66,6); drawFinder(6,66);
    x.fillStyle='rgba(255,255,255,0.5)';
    [[30,6],[36,12],[42,6],[48,12],[54,6],[30,18],[36,24],[42,18],[48,24],[54,18],[60,24],[30,30],[36,36],[42,30],[48,36],[54,30],[60,36],[66,30],[72,36],[30,42],[36,48],[42,42],[48,48],[54,42],[60,48],[66,42],[72,48],[30,54],[36,60],[42,54],[48,60],[54,54],[60,60],[66,54],[72,60],[66,66],[72,72],[78,66],[78,78]].forEach(p=>x.fillRect(p[0],p[1],4,4));
    x.fillStyle='#D4AF37';
    for(let i=24;i<66;i+=6){x.fillRect(i,30,3,3);x.fillRect(30,i,3,3);}
  }, []);

  /* ── Scroll listener ── */
  useEffect(() => {
    const depths = [25, 50, 75, 90];
    const fired  = new Set();
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      depths.forEach(d => { if (pct >= d && !fired.has(d)) { fired.add(d); trackScrollDepth(d); } });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => { document.body.style.overflow = demoOpen ? 'hidden' : 'auto'; }, [demoOpen]);

  /* ── FAQ toggle ── */
  const toggleFaq = useCallback((e) => {
    const q = e.currentTarget;
    q.classList.toggle('open');
    q.nextElementSibling.classList.toggle('open');
  }, []);

  /* ── Contact submit ── */
  const submitContact = useCallback(async () => {
    if (!contactForm.fullName || !contactForm.email || !contactForm.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    const utms = getUtms();
    sessionStorage.setItem('_zm_last_conv', 'contact');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contactForm, ...utms }),
    });
    setSubmitting(false);
    if (res.ok) {
      window.location.href = '/thank-you';
    } else {
      alert('Something went wrong. Please try WhatsApp or email us directly.');
    }
  }, [contactForm]);

  /* ── Demo submit ── */
  const submitDemo = useCallback(async () => {
    if (!demoForm.fullName || !demoForm.email || !demoForm.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    const utms = getUtms();
    sessionStorage.setItem('_zm_last_conv', 'demo');
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...demoForm, ...utms }),
    });
    setSubmitting(false);
    if (res.ok) {
      setDemoOpen(false);
      window.location.href = '/thank-you';
    } else {
      alert('Something went wrong. Please reach us via WhatsApp.');
    }
  }, [demoForm]);

  const ccOptions = countries.map((c,i) => <option key={i} value={c[1]}>{c[0]} {c[1]}</option>);
  const tickerItems = ['Now accepting bookings for 2026 to 2027 events','Registration Management','Badge Printing','Certificate Generation','QR Check-in & Accreditation','Ticketing Platform','On-site Tech & Communication','Fully Managed On-Site Operations'];
  const enabledStats = stats?.filter(s => s.enabled) || [];
  const enabledFaq   = faq?.filter(f => f.enabled) || [];
  const enabledTestimonials = testimonials?.filter(t => t.enabled) || [];
  const enabledGallery = gallery?.filter(g => g.enabled) || [];
  const enabledLocations = locations?.filter(l => l.enabled) || [];
  const enabledPartners = partners?.filter(p => p.enabled) || [];

  return (
    <>
      <Nav store={store} />

      {/* ===== HERO ===== */}{/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-content">
          <div className="htag"><div className="pd" />Event Technology Solutions</div>
          <h1>We Handle the Tech.<br /><span className="gold">You Deliver the Event.</span></h1>
          <p className="hdesc">A fully managed technology team on the ground at your event. Registration, QR check-in, badges, accreditation, ticketing, and on-site support. One partner, everything covered.</p>
          <div className="hbtns">
            <button className="bg" onClick={() => { trackDemoOpen('hero'); setDemoOpen(true); }}>
              <i className="fas fa-calendar-check" /> Book a Demo
            </button>
            <button className="bgh" onClick={() => document.getElementById('platform')?.scrollIntoView({behavior:'smooth'})}>
              <i className="fas fa-arrow-right" /> Explore Platform
            </button>
          </div>

          {/* Dynamic stats: only rendered when section is on AND items exist */}
          {sections?.stats && enabledStats.length > 0 && (
            <div className="stats">
              {enabledStats.map(s => (
                <div key={s.id}><div className="sn">{s.number}</div><div className="sl">{s.label}</div></div>
              ))}
            </div>
          )}
        </div>

        {/* Hero visual: decorative badge mock (UI illustration, not a claim) */}
        <div className="hv">
          
          {[
            { cls:'rc1', bg:'#D4AF37',              init:'SA', name:'Sara Al-Mutairi',  role:'Marketing Director',  cat:'VIP',     catBg:'rgba(212,175,55,0.15)',   catColor:'#D4AF37' },
            { cls:'rc2', bg:'#00D4B4',              init:'MK', name:'Mohammed Khalid', role:'Keynote Speaker',    cat:'Speaker', catBg:'rgba(0,212,180,0.15)',    catColor:'#00D4B4' },
            { cls:'rc3', bg:'rgba(255,255,255,0.15)',init:'NQ', name:'Noura Al-Qahtani',role:'Product Manager',    cat:'General', catBg:'rgba(255,255,255,0.06)', catColor:'rgba(255,255,255,0.4)' },
            { cls:'rc4', bg:'#D4AF37',              init:'AR', name:'Ahmed Al-Rashidi', role:'CEO',               cat:'VIP',     catBg:'rgba(212,175,55,0.15)',   catColor:'#D4AF37' },
            { cls:'rc5', bg:'rgba(255,255,255,0.15)',init:'FH', name:'Fatima Al-Harbi', role:'Delegate',          cat:'General', catBg:'rgba(255,255,255,0.06)', catColor:'rgba(255,255,255,0.4)' },
          ].map((c,i) => (
            <div key={i} className={`rc ${c.cls}`}>
              <div className="av" style={{background:c.bg}}>{c.init}</div>
              <div><div className="nm">{c.name}</div><div className="rl">{c.role}</div>
              <div className="tg" style={{background:c.catBg,color:c.catColor}}>{c.cat}</div></div>
            </div>
          ))}
          <div className="idb">
            <div className="lan"><div className="lhole" /><div className="lstrap" /></div>
            <div className="bstr" /><div className="bev">Global Tech Summit 2025</div>
            <div className="bnm">Ahmed Al-Rashidi</div><div className="bttl">Chief Executive Officer</div>
            <div className="bvip">VIP</div>
            <div className="bqr"><canvas ref={qrRef} width={90} height={90} /></div>
            <div className="bft"><span style={{color:'#D4AF37',fontWeight:700}}>zeemaa</span><span style={{color:'rgba(0,212,180,0.6)'}}>Scan to Check In</span></div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="sec" id="about"><div className="si2">
        <div className="sey">Who We Are</div>
        <h2 className="st2">Leading Event Technology Solutions Provider in Saudi Arabia</h2>
        <p className="sst">Built to power the next generation of events in the Kingdom, combining technology expertise with deep regional understanding.</p>
        <MissionVisionCards />
      </div></section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="sec alt zpattern"><div className="si2">
        <div className="sey">How It Works</div><h2 className="st2">Three Simple Steps</h2>
        <p className="sst">From first conversation to event day, we handle everything.</p>
        <div className="steps">
          {[
            { n:1, t:'Tell Us About Your Event', d:'Share your event details, dates, expected attendees, and requirements.' },
            { n:2, t:'We Build Your Platform', d:'Our team designs your branded registration system, badges, and certificates.' },
            { n:3, t:'Go Live with Full Support', d:'Launch with complete technical support, on-site team, and real-time management.' },
          ].map((s,i) => (
            <div key={i} className="step">
              {i < 2 && <div className="step-l" />}
              <div className="step-n">{s.n}</div>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* ===== PLATFORM ===== */}
      <section className="sec" id="platform"><div className="si2">
        <div className="sey">Core Product</div><h2 className="st2">Event Registration Management System</h2>
        <p className="sst">Purpose-built for events in Saudi Arabia. Custom designed for your brand, managed end-to-end by our expert team.</p>
        <div className="pgrid">
          {[
            { icon:'fa-desktop',     t:'Custom Registration Pages',   d:'Branded landing pages built and optimized for each event with multi-language support' },
            { icon:'fa-chart-line',  t:'Live Analytics Dashboard',     d:'Real-time tracking of registrations, attendance patterns, and event performance' },
            { icon:'fa-qrcode',      t:'QR Code Check-in',            d:'Fast, secure attendee entry management powered by QR scanning technology' },
            { icon:'fa-id-badge',    t:'Badge Printing',              d:'Instant, customized badge printing with attendee categories, branding, and QR codes' },
            { icon:'fa-certificate', t:'Certificate Generator',        d:'Automated certificate creation and distribution for attendees, speakers, and participants' },
            { icon:'fa-user-check',  t:'Accreditation Management',    d:'Streamlined accreditation workflows for delegates, media, exhibitors, and staff' },
            { icon:'fa-palette',     t:'White-Label Platform',        d:'Fully branded experience reflecting your event identity and corporate standards' },
            { icon:'fa-credit-card', t:'Integrated Payments',         d:'Secure payment collection via MADA, Apple Pay, Visa, and Mastercard through certified gateways' },
          ].map((c,i) => (
            <div key={i} className="pc"><div className="pci"><i className={`fas ${c.icon}`} /></div><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </div></section>

      {/* ===== EVENT TYPES ===== */}
      <section className="sec alt"><div className="si2">
        <div className="sey">Industries We Serve</div><h2 className="st2">Events of Every Scale and Type</h2>
        <p className="sst">From intimate workshops to exhibitions with thousands, we have the technology and the team.</p>
        <div className="etg">
          {[
            { icon:'fa-microphone-lines', t:'Conferences & Summits',   d:'Multi-track agendas, speaker management' },
            { icon:'fa-store',            t:'Exhibitions & Trade Shows', d:'Exhibitor portals, floor plans, catalogues' },
            { icon:'fa-building',         t:'Corporate Events',          d:'Internal summits, launches, townhalls' },
            { icon:'fa-trophy',           t:'Award Ceremonies',         d:'VIP management, ticketed entry' },
            { icon:'fa-landmark',         t:'Government Events',        d:'High-security accreditation, protocols' },
            { icon:'fa-chalkboard-user',  t:'Workshops & Seminars',     d:'Certificates, attendance tracking' },
          ].map((c,i) => (
            <div key={i} className="etc"><div className="eti"><i className={`fas ${c.icon}`} /></div><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </div></section>

      {/* ===== SERVICES ===== */}
      <section className="sec" id="services"><div className="si2">
        <div className="sey">Complementary Services</div><h2 className="st2">Beyond the Platform</h2>
        <p className="sst">Comprehensive event technology solutions, from digital platforms to on-site operations.</p>
        <div className="sgrid">
          {[
            { icon:'fa-ticket',       t:'Ticketing Platform',           d:'Custom event ticketing with tiered pricing, early-bird offers, and secure payment processing', cat:'platform', href:'/services/ticketing' },
            { icon:'fa-envelope-open-text', t:'Invitations & Reminders', d:'Digital invitations, reminders, and confirmations by email and WhatsApp, for every event', cat:'platform', href:'/services/invitations' },
            { icon:'fa-store',        t:'Exhibitor Portals',            d:'Custom multilingual directories and catalogues for exhibitions and trade shows', cat:'platform', href:'/services' },
            { icon:'fa-globe',        t:'Event Websites',               d:'Professional, fully responsive websites for your conference or exhibition', cat:'platform', href:'/services' },
            { icon:'fa-headset',      t:'On-site Support',              d:'Expert team on-ground managing check-in, tech, and attendee experience', cat:'onsite', href:'/services' },
            { icon:'fa-print',        t:'Hardware & Equipment',         d:'Badge printers, QR scanners, tablets, and self-service kiosks', cat:'onsite', href:'/services' },
            { icon:'fa-chart-bar',    t:'Post-Event Reports',           d:'Detailed analytics on attendance, engagement, demographics, and ROI', cat:'onsite', href:'/services' },
            { icon:'fa-walkie-talkie',t:'On-Site Communication Systems',d:'Coordination systems for seamless event operations', cat:'onsite', href:'/services' },
            { icon:'fa-video',        t:'CCTV & Security Systems',      d:'Event surveillance, crowd monitoring, and security camera setup and management', cat:'onsite', href:'/services' },
          ].map((c,i) => {
            const linked = c.href && c.href !== '/services';
            const Tag = linked ? 'a' : 'div';
            return (
              <Tag key={i} href={linked ? c.href : undefined} className={`relsvc-card ${c.cat}${linked ? '' : ' static'}`}>
                <span className="relsvc-tag">{c.cat === 'platform' ? 'Platform' : 'On-Site'}</span>
                <div className="relsvc-ic"><i className={`fas ${c.icon}`} /></div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                {linked && <span className="relsvc-cta">View Service <i className="fas fa-arrow-right" /></span>}
              </Tag>
            );
          })}
        </div>
      </div></section>

      {/* ===== TESTIMONIALS (dynamic, admin-controlled) ===== */}
      {sections?.testimonials && enabledTestimonials.length > 0 && (
        <section className="sec alt"><div className="si2">
          <div className="sey">What Clients Say</div><h2 className="st2">Trusted by Event Professionals</h2>
          <p className="sst">Hear from organizers who have experienced the Zeemaa difference.</p>
          <div className="tgrid">
            {enabledTestimonials.map(t => (
              <div key={t.id} className="tc">
                <div className="tcq">&ldquo;</div>
                <p>{t.quote}</p>
                <div className="tca">{t.author}{t.role ? ` · ${t.role}` : ''}</div>
                {t.company && <div className="tcr">{t.company}</div>}
              </div>
            ))}
          </div>
        </div></section>
      )}

      {/* ===== GALLERY STRIP (dynamic) ===== */}
      {sections?.gallery && enabledGallery.length > 0 && (
        <section className="sec"><div className="si2">
          <div className="sey">Gallery</div><h2 className="st2">Events We Have Powered</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16, marginTop:32 }}>
            {enabledGallery.slice(0,6).map(g => (
              <div key={g.id} style={{ borderRadius:10, overflow:'hidden', aspectRatio:'4/3', background:'rgba(255,255,255,0.04)' }}>
                <img src={g.url} alt={g.alt || g.caption || 'Zeemaa event'} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>
            ))}
          </div>
          {enabledGallery.length > 6 && (
            <div style={{ textAlign:'center', marginTop:24 }}>
              <a href="/gallery" className="bgh" style={{ display:'inline-flex', alignItems:'center', gap:8, textDecoration:'none' }}>
                View All Photos <i className="fas fa-arrow-right" />
              </a>
            </div>
          )}
        </div></section>
      )}

      {/* ===== PARTNERS ===== */}
      {sections?.partners && enabledPartners.length > 0 && (
        <section className="sec"><div className="si2" style={{textAlign:'center'}}>
          <div className="sey">Powered By</div><h2 className="st2">Built on Tools You Trust</h2>
          <p className="sst" style={{margin:'0 auto 40px'}}>Integrated with leading platforms for payments, communication, analytics, and automation.</p>
          <div className="ptgrid">
            {enabledPartners.map(p => (
              <div key={p.id} className="ptc"><i className={p.icon} /><span>{p.name}</span></div>
            ))}
          </div>
        </div></section>
      )}

      {/* ===== RESOURCES ===== */}
      {sections?.resources && store.pages?.blog && latestPosts.length > 0 && (
        <section className="sec alt" id="resources"><div className="si2">
          <div className="sey">Resources</div><h2 className="st2">Insights & Guides</h2>
          <p className="sst">Expert perspectives on event technology and the Saudi events landscape.</p>
          <div className="postgrid">
            {latestPosts.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
          <div className="bc-foot"><a href="/blog" className="bgh">View All Articles <i className="fas fa-arrow-right" /></a></div>
        </div></section>
      )}

      {/* ===== FAQ ===== */}
      {sections?.faq && enabledFaq.length > 0 && (
        <section className="sec" id="faq"><div className="si2 faq-center">
          <div className="sey">Common Questions</div><h2 className="st2">Frequently Asked Questions</h2>
          <p className="sst">Everything you need to know about working with Zeemaa.</p>
          <div className="fql">
            {enabledFaq.map(f => (
              <div key={f.id} className="fqi">
                <div className="fqq" onClick={toggleFaq}>{f.q}<i className="fas fa-chevron-down" /></div>
                <div className="fqa">{f.a}</div>
              </div>
            ))}
          </div>
        </div></section>
      )}

      {/* ===== LOCATIONS ===== */}
      {sections?.locations && enabledLocations.length > 0 && (
        <section className="sec alt" id="locations"><div className="si2">
          <div className="sey">Our Presence</div><h2 className="st2">Based in Saudi Arabia</h2>
          <p className="sst">Headquartered in Riyadh and operating across the Kingdom, with on-ground presence in the Eastern Province.</p>
          <div className="lgrid">
            {enabledLocations.map(l => (
              <div key={l.id} className="lc">
                <i className="fas fa-map-marker-alt" />
                <h3>{l.city}</h3>
                <div className="cy">{l.country}</div>
                <div className="lt">{l.type}</div>
              </div>
            ))}
          </div>
        </div></section>
      )}

      {/* ===== CONTACT ===== */}
      <section className="sec zpattern" id="contact"><div className="si2">
        <div className="sey">Get In Touch</div><h2 className="st2">Let&apos;s Discuss Your Next Event</h2>
        <p className="sst">Reach out and let&apos;s make your event exceptional.</p>
        <div className="cgrid">
          <div className="cform">
            <h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>Send Us a Message</h3>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.35)',marginBottom:24}}>We&apos;ll get back to you within 24 hours.</p>
            <div className="fg"><label>Full Name *</label><input className="fi" placeholder="Enter your full name" value={contactForm.fullName} onChange={e=>setContactForm(f=>({...f,fullName:e.target.value}))} /></div>
            <div className="fg"><label>Email Address *</label><input type="email" className="fi" placeholder="your@email.com" value={contactForm.email} onChange={e=>setContactForm(f=>({...f,email:e.target.value}))} /></div>
            <div className="fg"><label>Phone Number *</label><div className="phr"><select className="fi phc" value={contactForm.countryCode} onChange={e=>setContactForm(f=>({...f,countryCode:e.target.value}))}>{ccOptions}</select><input type="tel" className="fi" placeholder="55 XXX XXXX" value={contactForm.phone} onChange={e=>setContactForm(f=>({...f,phone:e.target.value}))} /></div></div>
            <div className="fg"><label>Message *</label><textarea className="fi" placeholder="Tell us about your event: dates, location, and specific requirements..." value={contactForm.message} onChange={e=>setContactForm(f=>({...f,message:e.target.value}))} /></div>
            <button className="bg" onClick={submitContact} disabled={submitting} style={{width:'100%',justifyContent:'center'}}>
              <i className="fas fa-paper-plane" /> {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </div>
          <div className="cinfo">
            <div className="cic"><div className="cii"><i className="fas fa-phone" /></div><div><div className="cil">Phone &amp; WhatsApp</div><div className="civ"><a href="tel:+966552995295" onClick={trackPhone}>+966 55 299 5295</a></div></div></div>
            <div className="cic"><div className="cii"><i className="fas fa-envelope" /></div><div><div className="cil">Email</div><div className="civ"><a href="mailto:hello@zeemaa.com">hello@zeemaa.com</a></div></div></div>
            <div className="cic"><div className="cii"><i className="fas fa-map-marker-alt" /></div><div><div className="cil">Our Offices</div><div className="ofl">
              {enabledLocations.map(l => (
                <div key={l.id} className="ofi"><i className="fas fa-circle" /> {l.city}, {l.country}{l.type === 'Headquarters' ? <span className="ohq">HQ</span> : null}</div>
              ))}
            </div></div></div>
            <div className="cic"><div className="cii"><i className="fas fa-share-nodes" /></div><div><div className="cil">Follow Us</div><div style={{display:'flex',gap:8,marginTop:6}}>
              <a href={store.site?.linkedinUrl || '#'} target="_blank" rel="noopener noreferrer" className="sic" style={{width:36,height:36,fontSize:14}}><i className="fab fa-linkedin-in" /></a>
              <a href={store.site?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="sic" style={{width:36,height:36,fontSize:14}}><i className="fab fa-instagram" /></a>
            </div></div></div>
          </div>
        </div>
      </div></section>

      <Footer />
    </>
  );
}
