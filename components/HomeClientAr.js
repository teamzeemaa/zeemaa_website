'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Nav from './Nav';
import Footer from './Footer';
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

export default function HomeClientAr({ store }) {
  const { sections, stats, testimonials, gallery, faq, locations, partners } = store;
  const latestPosts = getPublishedPosts(store).slice(0, 3);
  const qrRef      = useRef(null);
  const [showTop, setShowTop]   = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ fullName:'', email:'', phone:'', countryCode:'+966', message:'' });
  const [demoForm,    setDemoForm]    = useState({ fullName:'', email:'', phone:'', countryCode:'+966', company:'', eventType:'', demoPreference:'', message:'' });
  const [submitting, setSubmitting]   = useState(false);

  useEffect(() => { captureUtm(); }, []);

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

  useEffect(() => { document.body.style.overflow = demoOpen ? 'hidden' : 'auto'; }, [demoOpen]);

  const toggleFaq = useCallback((e) => {
    const q = e.currentTarget;
    q.classList.toggle('open');
    q.nextElementSibling.classList.toggle('open');
  }, []);

  const submitContact = useCallback(async () => {
    if (!contactForm.fullName || !contactForm.email || !contactForm.phone) {
      alert('يرجى تعبئة جميع الحقول المطلوبة.');
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
      window.location.href = '/ar/thank-you';
    } else {
      alert('حدث خطأ ما. يرجى المحاولة عبر واتساب أو مراسلتنا مباشرة عبر البريد الإلكتروني.');
    }
  }, [contactForm]);

  const submitDemo = useCallback(async () => {
    if (!demoForm.fullName || !demoForm.email || !demoForm.phone) {
      alert('يرجى تعبئة جميع الحقول المطلوبة.');
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
      window.location.href = '/ar/thank-you';
    } else {
      alert('حدث خطأ ما. يرجى التواصل معنا عبر واتساب.');
    }
  }, [demoForm]);

  const ccOptions = countries.map((c,i) => <option key={i} value={c[1]}>{c[0]} {c[1]}</option>);
  const enabledStats = stats?.filter(s => s.enabled) || [];
  const enabledFaq   = faq?.filter(f => f.enabled) || [];
  const enabledTestimonials = testimonials?.filter(t => t.enabled) || [];
  const enabledGallery = gallery?.filter(g => g.enabled) || [];
  const enabledLocations = locations?.filter(l => l.enabled) || [];
  const enabledPartners = partners?.filter(p => p.enabled) || [];

  return (
    <>
      <Nav store={store} locale="ar" />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-content">
          <div className="htag"><div className="pd" />حلول تقنية الفعاليات</div>
          <h1>نحن نتولى التقنية.<br /><span className="gold">وأنتم تقدّمون الفعالية.</span></h1>
          <p className="hdesc">فريق تقني متكامل الإدارة حاضر ميدانياً في فعاليتكم. تسجيل، تسجيل دخول عبر QR، شارات، اعتماد، تذاكر، ودعم ميداني. شريك واحد يغطي كل شيء.</p>
          <div className="hbtns">
            <button className="bg" onClick={() => { trackDemoOpen('hero'); setDemoOpen(true); }}>
              <i className="fas fa-calendar-check" /> احجز عرضاً تجريبياً
            </button>
            <button className="bgh" onClick={() => document.getElementById('platform')?.scrollIntoView({behavior:'smooth'})}>
              <i className="fas fa-arrow-right" /> استكشف المنصة
            </button>
          </div>

          {sections?.stats && enabledStats.length > 0 && (
            <div className="stats">
              {enabledStats.map(s => (
                <div key={s.id}><div className="sn">{s.number}</div><div className="sl">{s.label}</div></div>
              ))}
            </div>
          )}
        </div>

        <div className="hv">
          {[
            { cls:'rc1', bg:'#D4AF37',              init:'س م', name:'سارة المطيري',  role:'مديرة التسويق',  cat:'VIP',     catBg:'rgba(212,175,55,0.15)',   catColor:'#D4AF37' },
            { cls:'rc2', bg:'#00D4B4',              init:'م خ', name:'محمد خالد', role:'متحدث رئيسي',    cat:'متحدث', catBg:'rgba(0,212,180,0.15)',    catColor:'#00D4B4' },
            { cls:'rc3', bg:'rgba(255,255,255,0.15)',init:'ن ق', name:'نورة القحطاني',role:'مديرة منتج',    cat:'عام', catBg:'rgba(255,255,255,0.06)', catColor:'rgba(255,255,255,0.4)' },
            { cls:'rc4', bg:'#D4AF37',              init:'أ ر', name:'أحمد الراشدي', role:'الرئيس التنفيذي',               cat:'VIP',     catBg:'rgba(212,175,55,0.15)',   catColor:'#D4AF37' },
            { cls:'rc5', bg:'rgba(255,255,255,0.15)',init:'ف ح', name:'فاطمة الحربي', role:'مندوبة',          cat:'عام', catBg:'rgba(255,255,255,0.06)', catColor:'rgba(255,255,255,0.4)' },
          ].map((c,i) => (
            <div key={i} className={`rc ${c.cls}`}>
              <div className="av" style={{background:c.bg}}>{c.init}</div>
              <div><div className="nm">{c.name}</div><div className="rl">{c.role}</div>
              <div className="tg" style={{background:c.catBg,color:c.catColor}}>{c.cat}</div></div>
            </div>
          ))}
          <div className="idb">
            <div className="lan"><div className="lhole" /><div className="lstrap" /></div>
            <div className="bstr" /><div className="bev">قمة التقنية العالمية 2025</div>
            <div className="bnm">أحمد الراشدي</div><div className="bttl">الرئيس التنفيذي</div>
            <div className="bvip">VIP</div>
            <div className="bqr"><canvas ref={qrRef} width={90} height={90} /></div>
            <div className="bft"><span style={{color:'#D4AF37',fontWeight:700}}>zeemaa</span><span style={{color:'rgba(0,212,180,0.6)'}}>امسح لتسجيل الدخول</span></div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="sec" id="about"><div className="si2">
        <div className="sey">من نحن</div>
        <h2 className="st2">الشركة الرائدة في حلول تقنية الفعاليات في المملكة العربية السعودية</h2>
        <p className="sst">صُممت لتشغيل الجيل القادم من الفعاليات في المملكة، بالجمع بين الخبرة التقنية والفهم العميق للسوق المحلي.</p>
        <MissionVisionCards locale="ar" />
      </div></section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="sec alt zpattern"><div className="si2">
        <div className="sey">كيف نعمل</div><h2 className="st2">ثلاث خطوات بسيطة</h2>
        <p className="sst">من أول محادثة وحتى يوم الفعالية، نتولى كل شيء.</p>
        <div className="steps">
          {[
            { n:1, t:'أخبرنا عن فعاليتك', d:'شاركنا تفاصيل فعاليتك والتواريخ وعدد الحضور المتوقع ومتطلباتك.' },
            { n:2, t:'نبني منصتك', d:'يصمم فريقنا نظام التسجيل والشارات والشهادات بهويتك التجارية.' },
            { n:3, t:'انطلق بدعم كامل', d:'انطلق بدعم تقني كامل وفريق ميداني وإدارة لحظية.' },
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
        <div className="sey">المنتج الأساسي</div><h2 className="st2">نظام إدارة تسجيل الفعاليات</h2>
        <p className="sst">مصمم خصيصاً لفعاليات المملكة العربية السعودية. مُصمم بهويتكم التجارية، وتديره فرقتنا المتخصصة من الألف إلى الياء.</p>
        <div className="pgrid">
          {[
            { icon:'fa-desktop',     t:'صفحات تسجيل مخصصة',   d:'صفحات تسجيل مصممة بهويتكم ومحسّنة لكل فعالية بدعم متعدد اللغات' },
            { icon:'fa-chart-line',  t:'لوحة تحليلات لحظية',     d:'تتبع لحظي لعمليات التسجيل وأنماط الحضور وأداء الفعالية' },
            { icon:'fa-qrcode',      t:'تسجيل الدخول عبر رمز QR',            d:'إدارة دخول سريعة وآمنة للحضور بتقنية مسح رمز QR' },
            { icon:'fa-id-badge',    t:'طباعة الشارات',              d:'طباعة شارات فورية ومخصصة تشمل فئات الحضور والهوية البصرية ورموز QR' },
            { icon:'fa-certificate', t:'مولد الشهادات',        d:'إصدار وتوزيع آلي للشهادات للحضور والمتحدثين والمشاركين' },
            { icon:'fa-user-check',  t:'إدارة الاعتماد',    d:'مسارات اعتماد مبسطة للوفود والإعلاميين والعارضين والفريق' },
            { icon:'fa-palette',     t:'منصة بهوية بصرية خاصة',        d:'تجربة متكاملة بهويتكم البصرية ومعاييركم المؤسسية' },
            { icon:'fa-credit-card', t:'مدفوعات متكاملة',         d:'تحصيل مدفوعات آمن عبر مدى وApple Pay وفيزا وماستركارد من خلال بوابات معتمدة' },
          ].map((c,i) => (
            <div key={i} className="pc"><div className="pci"><i className={`fas ${c.icon}`} /></div><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </div></section>

      {/* ===== EVENT TYPES ===== */}
      <section className="sec alt"><div className="si2">
        <div className="sey">القطاعات التي نخدمها</div><h2 className="st2">فعاليات بجميع الأحجام والأنواع</h2>
        <p className="sst">من ورش العمل الصغيرة إلى المعارض التي تضم الآلاف، لدينا التقنية والفريق.</p>
        <div className="etg">
          {[
            { icon:'fa-microphone-lines', t:'المؤتمرات والقمم',   d:'أجندات متعددة المسارات وإدارة المتحدثين' },
            { icon:'fa-store',            t:'المعارض والمعارض التجارية', d:'بوابات العارضين ومخططات الأرضية والكتالوجات' },
            { icon:'fa-building',         t:'الفعاليات المؤسسية',          d:'قمم داخلية وإطلاقات واجتماعات عامة' },
            { icon:'fa-trophy',           t:'حفلات توزيع الجوائز',         d:'إدارة كبار الشخصيات ودخول بالتذاكر' },
            { icon:'fa-landmark',         t:'الفعاليات الحكومية',        d:'اعتماد عالي الأمان وبروتوكولات' },
            { icon:'fa-chalkboard-user',  t:'ورش العمل والندوات',     d:'شهادات وتتبع الحضور' },
          ].map((c,i) => (
            <div key={i} className="etc"><div className="eti"><i className={`fas ${c.icon}`} /></div><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </div></section>

      {/* ===== SERVICES ===== */}
      <section className="sec" id="services"><div className="si2">
        <div className="sey">خدمات مكمّلة</div><h2 className="st2">ما وراء المنصة</h2>
        <p className="sst">حلول تقنية شاملة للفعاليات، من المنصات الرقمية إلى العمليات الميدانية.</p>
        <div className="sgrid">
          {[
            { icon:'fa-ticket',       t:'منصة التذاكر',           d:'نظام تذاكر مخصص بأسعار متدرجة وعروض حجز مبكر ومعالجة مدفوعات آمنة', cat:'platform', href:'/ar/services/ticketing' },
            { icon:'fa-envelope-open-text', t:'الدعوات والتذكيرات', d:'دعوات وتذكيرات وتأكيدات رقمية عبر البريد الإلكتروني والواتساب لكل فعالية', cat:'platform', href:'/ar/services/invitations' },
            { icon:'fa-store',        t:'بوابات العارضين',            d:'أدلة وكتالوجات مخصصة ومتعددة اللغات للمعارض', cat:'platform', href:'/ar/services' },
            { icon:'fa-globe',        t:'مواقع إلكترونية للفعاليات',               d:'مواقع إلكترونية احترافية ومتجاوبة بالكامل لمؤتمركم أو معرضكم', cat:'platform', href:'/ar/services' },
            { icon:'fa-headset',      t:'الدعم الميداني',              d:'فريق متخصص ميدانياً يدير تسجيل الدخول والتقنية وتجربة الحضور', cat:'onsite', href:'/ar/services' },
            { icon:'fa-print',        t:'الأجهزة والمعدات',         d:'طابعات شارات وأجهزة مسح QR وأجهزة لوحية وأكشاك ذاتية الخدمة', cat:'onsite', href:'/ar/services' },
            { icon:'fa-chart-bar',    t:'تقارير ما بعد الفعالية',           d:'تحليلات مفصلة عن الحضور والتفاعل والفئات الديموغرافية والعائد على الاستثمار', cat:'onsite', href:'/ar/services' },
            { icon:'fa-walkie-talkie',t:'أنظمة التواصل الميداني',d:'أنظمة تنسيق لتشغيل سلس للفعالية', cat:'onsite', href:'/ar/services' },
            { icon:'fa-video',        t:'أنظمة المراقبة والأمن',      d:'مراقبة أمنية للفعالية ورصد الحشود وتركيب وإدارة كاميرات المراقبة', cat:'onsite', href:'/ar/services' },
          ].map((c,i) => {
            const linked = c.href && c.href !== '/ar/services';
            const Tag = linked ? 'a' : 'div';
            return (
              <Tag key={i} href={linked ? c.href : undefined} className={`relsvc-card ${c.cat}${linked ? '' : ' static'}`}>
                <span className="relsvc-tag">{c.cat === 'platform' ? 'المنصة' : 'ميداني'}</span>
                <div className="relsvc-ic"><i className={`fas ${c.icon}`} /></div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                {linked && <span className="relsvc-cta">عرض الخدمة <i className="fas fa-arrow-right" /></span>}
              </Tag>
            );
          })}
        </div>
      </div></section>

      {/* ===== TESTIMONIALS (dynamic, admin-controlled, English content) ===== */}
      {sections?.testimonials && enabledTestimonials.length > 0 && (
        <section className="sec alt"><div className="si2">
          <div className="sey">ماذا يقول عملاؤنا</div><h2 className="st2">موثوق من قبل محترفي الفعاليات</h2>
          <p className="sst">استمع لمنظمي الفعاليات الذين جربوا فرق زيماء.</p>
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
          <div className="sey">معرض الصور</div><h2 className="st2">فعاليات قمنا بتشغيلها</h2>
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
                عرض جميع الصور <i className="fas fa-arrow-right" />
              </a>
            </div>
          )}
        </div></section>
      )}

      {/* ===== PARTNERS ===== */}
      {sections?.partners && enabledPartners.length > 0 && (
        <section className="sec"><div className="si2" style={{textAlign:'center'}}>
          <div className="sey">مدعوم بواسطة</div><h2 className="st2">مبني على أدوات تثقون بها</h2>
          <p className="sst" style={{margin:'0 auto 40px'}}>متكامل مع أفضل المنصات للمدفوعات والتواصل والتحليلات والأتمتة.</p>
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
          <div className="sey">المقالات</div><h2 className="st2">رؤى وأدلة</h2>
          <p className="sst">رؤى الخبراء حول تقنية الفعاليات ومشهد الفعاليات في السعودية.</p>
          <div className="postgrid">
            {latestPosts.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
          <div className="bc-foot"><a href="/blog" className="bgh">عرض جميع المقالات <i className="fas fa-arrow-right" /></a></div>
        </div></section>
      )}

      {/* ===== FAQ (dynamic, admin-controlled, English content) ===== */}
      {sections?.faq && enabledFaq.length > 0 && (
        <section className="sec" id="faq"><div className="si2 faq-center">
          <div className="sey">أسئلة شائعة</div><h2 className="st2">الأسئلة الشائعة</h2>
          <p className="sst">كل ما تحتاج معرفته عن العمل مع زيماء.</p>
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
          <div className="sey">تواجدنا</div><h2 className="st2">مقرنا في المملكة العربية السعودية</h2>
          <p className="sst">مقرنا الرئيسي في الرياض ونعمل في جميع أنحاء المملكة، مع تواجد ميداني في المنطقة الشرقية.</p>
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
        <div className="sey">تواصل معنا</div><h2 className="st2">لنتحدث عن فعاليتك القادمة</h2>
        <p className="sst">تواصل معنا ولنجعل فعاليتك استثنائية.</p>
        <div className="cgrid">
          <div className="cform">
            <h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>أرسل لنا رسالة</h3>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.35)',marginBottom:24}}>سنرد عليك خلال 24 ساعة.</p>
            <div className="fg"><label>الاسم الكامل *</label><input className="fi" placeholder="أدخل اسمك الكامل" value={contactForm.fullName} onChange={e=>setContactForm(f=>({...f,fullName:e.target.value}))} /></div>
            <div className="fg"><label>البريد الإلكتروني *</label><input type="email" className="fi" placeholder="your@email.com" value={contactForm.email} onChange={e=>setContactForm(f=>({...f,email:e.target.value}))} /></div>
            <div className="fg"><label>رقم الهاتف *</label><div className="phr"><select className="fi phc" value={contactForm.countryCode} onChange={e=>setContactForm(f=>({...f,countryCode:e.target.value}))}>{ccOptions}</select><input type="tel" className="fi ltr-num" placeholder="55 XXX XXXX" value={contactForm.phone} onChange={e=>setContactForm(f=>({...f,phone:e.target.value}))} /></div></div>
            <div className="fg"><label>الرسالة *</label><textarea className="fi" placeholder="أخبرنا عن فعاليتك: التواريخ والموقع والمتطلبات الخاصة..." value={contactForm.message} onChange={e=>setContactForm(f=>({...f,message:e.target.value}))} /></div>
            <button className="bg" onClick={submitContact} disabled={submitting} style={{width:'100%',justifyContent:'center'}}>
              <i className="fas fa-paper-plane" /> {submitting ? 'جارٍ الإرسال…' : 'إرسال الرسالة'}
            </button>
          </div>
          <div className="cinfo">
            <div className="cic"><div className="cii"><i className="fas fa-phone" /></div><div><div className="cil">الهاتف والواتساب</div><div className="civ"><a href="tel:+966552995295" onClick={trackPhone} className="ltr-num">+966 55 299 5295</a></div></div></div>
            <div className="cic"><div className="cii"><i className="fas fa-envelope" /></div><div><div className="cil">البريد الإلكتروني</div><div className="civ"><a href="mailto:hello@zeemaa.com" className="ltr-num">hello@zeemaa.com</a></div></div></div>
            <div className="cic"><div className="cii"><i className="fas fa-map-marker-alt" /></div><div><div className="cil">مكاتبنا</div><div className="ofl">
              {enabledLocations.map(l => (
                <div key={l.id} className="ofi"><i className="fas fa-circle" /> {l.city}, {l.country}{l.type === 'Headquarters' ? <span className="ohq">HQ</span> : null}</div>
              ))}
            </div></div></div>
            <div className="cic"><div className="cii"><i className="fas fa-share-nodes" /></div><div><div className="cil">تابعنا</div><div style={{display:'flex',gap:8,marginTop:6}}>
              <a href={store.site?.linkedinUrl || '#'} target="_blank" rel="noopener noreferrer" className="sic" style={{width:36,height:36,fontSize:14}}><i className="fab fa-linkedin-in" /></a>
              <a href={store.site?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="sic" style={{width:36,height:36,fontSize:14}}><i className="fab fa-instagram" /></a>
            </div></div></div>
          </div>
        </div>
      </div></section>

      <Footer locale="ar" />
    </>
  );
}
