'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LogoIcon, LogoText } from './Logo';

const AR_ROUTES = ['/', '/about', '/services', '/industries', '/contact', '/demo'];

const I18N = {
  en: {
    tagline: 'Fully Managed Event Technology',
    online: 'Online',
    offline: 'Offline',
    login: 'Login',
    bookDemo: 'Book a Demo',
    watchDemo: 'Watch Demo',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    viewAll: 'View all',
    adminLogin: 'Admin Login',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter username',
    enterPassword: 'Enter password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    loginError: 'Incorrect username or password',
    ticker: [
      'Now accepting bookings for 2026 to 2027 events',
      'Registration Management',
      'Badge Printing',
      'Certificate Generation',
      'QR Check-in and Accreditation',
      'Ticketing Platform',
      'Invitations, Reminders, and Confirmations',
      'On-site Tech and Communication',
      'Fully Managed On-Site Operations',
    ],
    navLinks: (pages) => [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/services', label: 'Services', id: 'services' },
      { href: '/industries', label: 'Industries', id: 'industries' },
      pages?.blog && { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ].filter(Boolean),
    serviceMenu: [
      { href: '/services/registration', icon: 'fa-desktop', t: 'Registration System', d: 'QR check-in' },
      { href: '/services/badge-printing', icon: 'fa-id-badge', t: 'Badge Printing', d: 'On-site, QR zones' },
      { href: '/services/accreditation', icon: 'fa-user-check', t: 'Accreditation', d: 'QR + RFID access' },
      { href: '/services/ticketing', icon: 'fa-ticket', t: 'Ticketing Platform', d: 'Secure payments' },
      { href: '/services/invitations', icon: 'fa-envelope-open-text', t: 'Invitations & Reminders', d: 'Email + WhatsApp' },
      { href: '/services', icon: 'fa-certificate', t: 'Certificate Generator', d: 'Automated, branded' },
      { href: '/services', icon: 'fa-chart-line', t: 'Live Analytics', d: 'Real-time reports' },
      { href: '/services', icon: 'fa-headset', t: 'On-site Support', d: 'Event day team' },
    ],
    industryMenu: [
      { href: '/industries', icon: 'fa-microphone-lines', t: 'Conferences & Summits', d: 'Multi-track delegates' },
      { href: '/industries', icon: 'fa-store', t: 'Exhibitions & Trade Shows', d: 'Exhibitor + visitor flow' },
      { href: '/industries', icon: 'fa-building', t: 'Corporate Events', d: 'Town halls, launches' },
      { href: '/industries', icon: 'fa-trophy', t: 'Award Ceremonies', d: 'VIP + ticketing' },
      { href: '/industries', icon: 'fa-landmark', t: 'Government Events', d: 'Secure accreditation' },
      { href: '/industries', icon: 'fa-chalkboard-user', t: 'Workshops & Seminars', d: 'Certificates, check-in' },
    ],
  },
  ar: {
    tagline: 'تقنية فعاليات متكاملة الإدارة',
    online: 'متصل',
    offline: 'غير متصل',
    login: 'تسجيل الدخول',
    bookDemo: 'احجز عرضاً تجريبياً',
    watchDemo: 'مشاهدة العرض',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    viewAll: 'عرض الكل',
    adminLogin: 'تسجيل دخول المشرف',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    enterUsername: 'أدخل اسم المستخدم',
    enterPassword: 'أدخل كلمة المرور',
    signIn: 'تسجيل الدخول',
    signingIn: 'جارٍ تسجيل الدخول...',
    loginError: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    ticker: [
      'نستقبل الآن حجوزات فعاليات 2026 و2027',
      'إدارة التسجيل',
      'طباعة الشارات',
      'إصدار الشهادات',
      'تسجيل الدخول والاعتماد عبر QR',
      'منصة التذاكر',
      'الدعوات والتذكيرات والتأكيدات',
      'التقنية والتواصل الميداني',
      'إدارة ميدانية متكاملة للفعاليات',
    ],
    navLinks: (pages) => [
      { href: '/ar', label: 'الرئيسية' },
      { href: '/ar/about', label: 'من نحن' },
      { href: '/ar/services', label: 'الخدمات', id: 'services' },
      { href: '/ar/industries', label: 'القطاعات', id: 'industries' },
      pages?.blog && { href: '/blog', label: 'المدونة' },
      { href: '/faq', label: 'الأسئلة الشائعة' },
      { href: '/ar/contact', label: 'تواصل معنا' },
    ].filter(Boolean),
    serviceMenu: [
      { href: '/ar/services/registration', icon: 'fa-desktop', t: 'نظام التسجيل', d: 'تسجيل دخول عبر QR' },
      { href: '/ar/services/badge-printing', icon: 'fa-id-badge', t: 'طباعة الشارات', d: 'ميدانياً، مناطق QR' },
      { href: '/ar/services/accreditation', icon: 'fa-user-check', t: 'الاعتماد', d: 'دخول عبر QR وRFID' },
      { href: '/ar/services/ticketing', icon: 'fa-ticket', t: 'منصة التذاكر', d: 'مدفوعات آمنة' },
      { href: '/ar/services/invitations', icon: 'fa-envelope-open-text', t: 'الدعوات والتذكيرات', d: 'بريد إلكتروني وواتساب' },
      { href: '/ar/services', icon: 'fa-certificate', t: 'مولد الشهادات', d: 'آلي ومصمم بهويتكم' },
      { href: '/ar/services', icon: 'fa-chart-line', t: 'التحليلات الفورية', d: 'تقارير لحظية' },
      { href: '/ar/services', icon: 'fa-headset', t: 'الدعم الميداني', d: 'فريق يوم الفعالية' },
    ],
    industryMenu: [
      { href: '/ar/industries', icon: 'fa-microphone-lines', t: 'المؤتمرات والقمم', d: 'وفود متعددة المسارات' },
      { href: '/ar/industries', icon: 'fa-store', t: 'المعارض والمعارض التجارية', d: 'تدفق العارضين والزوار' },
      { href: '/ar/industries', icon: 'fa-building', t: 'الفعاليات المؤسسية', d: 'اجتماعات وإطلاقات' },
      { href: '/ar/industries', icon: 'fa-trophy', t: 'حفلات توزيع الجوائز', d: 'كبار الشخصيات والتذاكر' },
      { href: '/ar/industries', icon: 'fa-landmark', t: 'الفعاليات الحكومية', d: 'اعتماد آمن' },
      { href: '/ar/industries', icon: 'fa-chalkboard-user', t: 'ورش العمل والندوات', d: 'شهادات وتسجيل دخول' },
    ],
  },
};

function LanguageSwitch({ locale, otherHref }) {
  const router = useRouter();
  const [switching, setSwitching] = useState(false);
  const isAr = locale === 'ar';
  const showAr = switching ? !isAr : isAr;

  const handleClick = (e) => {
    e.preventDefault();
    if (switching) return;
    setSwitching(true);
    setTimeout(() => router.push(otherHref), 320);
  };

  return (
    <a
      href={otherHref}
      onClick={handleClick}
      className={`lang-switch ${showAr ? 'is-ar' : 'is-en'} ${switching ? 'is-switching' : ''}`}
      aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span className="lang-switch-code" aria-hidden="true">{showAr ? 'EN' : 'العربية'}</span>
      <span className="lang-switch-thumb" aria-hidden="true" />
    </a>
  );
}

export default function Nav({ store, locale = 'en' }) {
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [logging, setLogging] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const dict = I18N[locale] || I18N.en;
  const site = store?.site || {};
  const pages = store?.pages || {};
  const homeHref = locale === 'ar' ? '/ar' : '/';
  const demoHref = locale === 'ar' ? '/ar/demo' : '/demo';

  const otherHref = pathname.startsWith('/ar')
    ? (pathname.slice(3) || '/')
    : (AR_ROUTES.some(p => pathname === p || pathname.startsWith(p + '/')) ? ('/ar' + (pathname === '/' ? '' : pathname)) : '/ar');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!site.businessHoursEnabled) return;
    const check = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      setIsOnline(day >= 0 && day <= 4 && hour >= (site.businessHoursStart || 9) && hour < (site.businessHoursEnd || 18));
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [site.businessHoursEnabled, site.businessHoursStart, site.businessHoursEnd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLogging(true);
    setLoginErr('');
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', payload: { username, password } }),
    });
    const data = await res.json();
    setLogging(false);
    if (data.ok) { setLoginOpen(false); window.location.href = '/admin/dashboard'; }
    else setLoginErr(data.error || dict.loginError);
  };

  const navLinks = dict.navLinks(pages);
  const serviceMenu = dict.serviceMenu;
  const industryMenu = dict.industryMenu;
  const navDropdowns = {
    services: { items: serviceMenu, allHref: locale === 'ar' ? '/ar/services' : '/services', allLabel: dict.viewAll },
    industries: { items: industryMenu, allHref: locale === 'ar' ? '/ar/industries' : '/industries', allLabel: dict.viewAll },
  };

  const socials = [
    site.linkedinUrl && { href: site.linkedinUrl, icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    site.instagramUrl && { href: site.instagramUrl, icon: 'fab fa-instagram', label: 'Instagram' },
    site.facebookUrl && { href: site.facebookUrl, icon: 'fab fa-facebook-f', label: 'Facebook' },
    site.youtubeUrl && { href: site.youtubeUrl, icon: 'fab fa-youtube', label: 'YouTube' },
    site.xUrl && { href: site.xUrl, icon: 'fab fa-x-twitter', label: 'X' },
  ].filter(Boolean);

  const isActive = (href) => {
    if (href === '/' || href === '/ar') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-left">
          <span style={{fontSize:12,color:'rgba(255,255,255,0.35)'}}>{dict.tagline}</span>
        </div>

        <div className="topbar-right">
          {site.businessHoursEnabled && (
            <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:isOnline?'#00D4B4':'rgba(255,255,255,0.25)'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:isOnline?'#00D4B4':'rgba(255,255,255,0.2)',display:'inline-block',boxShadow:isOnline?'0 0 6px #00D4B4':''}}/>
              {isOnline ? dict.online : dict.offline}
            </div>
          )}
          <div className="divider" />
          <div className="topbar-contact">
            <a href={`tel:${site.phone || '+966552995295'}`} style={{display:'flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.5)',textDecoration:'none',fontSize:12,transition:'color .2s'}}
              onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
              <i className="fas fa-phone" style={{fontSize:11}}/>
              <span className="ltr-num">{site.phone || '+966 55 299 5295'}</span>
            </a>
          </div>
          <div className="divider" />
          <div className="si">
            {socials.length > 0 ? socials.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="sic" aria-label={s.label}>
                <i className={s.icon} />
              </a>
            )) : (
              <>
                <a href="https://www.linkedin.com/company/zeemaa" target="_blank" rel="noopener noreferrer" className="sic"><i className="fab fa-linkedin-in"/></a>
                <a href="https://www.instagram.com/zeemaa.ksa" target="_blank" rel="noopener noreferrer" className="sic"><i className="fab fa-instagram"/></a>
              </>
            )}
          </div>
          <div className="divider" />
          <button onClick={() => setLoginOpen(true)} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',color:'rgba(255,255,255,0.45)',fontSize:12,cursor:'pointer',padding:'4px 8px',borderRadius:6,transition:'all .2s'}}
            onMouseOver={e=>e.currentTarget.style.color='#D4AF37'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
            <i className="fas fa-lock" style={{fontSize:10}}/>
            <span>{dict.login}</span>
          </button>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav style={{boxShadow:scrolled?'0 4px 24px rgba(0,0,0,0.4)':'none',transition:'box-shadow .3s'}}>
        <a href={homeHref} className="logo">
          <LogoIcon height={32} />
          <LogoText height={16} />
        </a>
        <div className="nav-links">
          {navLinks.map(link => {
            const dd = link.id && navDropdowns[link.id];
            return dd ? (
              <div key={link.href} className="nav-dd">
                <a href={link.href} className={`nav-dd-trigger ${isActive(link.href) ? 'active' : ''}`}>
                  {link.label} <i className="fas fa-chevron-down nav-dd-caret" />
                </a>
                <div className="nav-dd-panel">
                  <div className="nav-dd-grid">
                    {dd.items.map((s, i) => (
                      <a key={i} href={s.href} className="nav-dd-item">
                        <span className="nav-dd-ic"><i className={`fas ${s.icon}`} /></span>
                        <span className="nav-dd-txt">
                          <span className="nav-dd-t">{s.t}</span>
                          <span className="nav-dd-d">{s.d}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                  <a href={dd.allHref} className="nav-dd-all">{dd.allLabel} <i className="fas fa-arrow-right" /></a>
                </div>
              </div>
            ) : (
              <a key={link.href} href={link.href} className={isActive(link.href) ? 'active' : ''}>
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="nav-cta-desktop">
          <LanguageSwitch locale={locale} otherHref={otherHref} />
          {site.demoMode === 'watch' && site.demoLink ? (
            <a href={site.demoLink} target="_blank" rel="noopener noreferrer" className="bgh" style={{padding:'9px 18px',fontSize:13}}>
              <i className="fas fa-play"/> {dict.watchDemo}
            </a>
          ) : (
            <a href={demoHref} className="bg" style={{padding:'9px 18px',fontSize:13}}>
              <i className="fas fa-calendar-check"/> {dict.bookDemo}
            </a>
          )}
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label={dict.openMenu}
          aria-expanded={mobileOpen}
        >
          <i className="fas fa-bars" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-backdrop ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mdl-head">
          <a href={homeHref} className="logo" onClick={() => setMobileOpen(false)}>
            <LogoIcon height={28} />
            <LogoText height={14} />
          </a>
          <button className="mdl-close" onClick={() => setMobileOpen(false)} aria-label={dict.closeMenu}>
            <i className="fas fa-xmark" />
          </button>
        </div>

        <div className="mdl-lang-row">
          <LanguageSwitch locale={locale} otherHref={otherHref} />
        </div>

        <a href={demoHref} className="bg mdl-cta" onClick={() => setMobileOpen(false)}>
          <i className="fas fa-calendar-check" /> {dict.bookDemo}
        </a>

        <div className="mdl-links">
          {navLinks.map(link => {
            const dd = link.id && navDropdowns[link.id];
            if (!dd) {
              return (
                <a key={link.href} href={link.href} className={`mdl-link ${isActive(link.href) ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              );
            }
            const isExpanded = mobileExpanded === link.label;
            return (
              <div key={link.href} className="mdl-acc">
                <button className="mdl-acc-head" onClick={() => setMobileExpanded(isExpanded ? null : link.label)} aria-expanded={isExpanded}>
                  <span className={isActive(link.href) ? 'active' : ''}>{link.label}</span>
                  <i className={`fas fa-chevron-down ${isExpanded ? 'open' : ''}`} />
                </button>
                <div className="mdl-acc-body" style={{ maxHeight: isExpanded ? '480px' : '0px' }}>
                  {dd.items.map((s, i) => (
                    <a key={i} href={s.href} className="mdl-acc-item" onClick={() => setMobileOpen(false)}>
                      <i className={`fas ${s.icon}`} /> {s.t}
                    </a>
                  ))}
                  <a href={dd.allHref} className="mdl-acc-item mdl-acc-all" onClick={() => setMobileOpen(false)}>
                    {dd.allLabel} <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mdl-foot">
          <a href={`tel:${site.phone || '+966552995295'}`} className="mdl-foot-phone">
            <i className="fas fa-phone" /> <span className="ltr-num">{site.phone || '+966 55 299 5295'}</span>
          </a>
          <div className="si">
            {(socials.length > 0 ? socials : [
              { href: 'https://www.linkedin.com/company/zeemaa', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
              { href: 'https://www.instagram.com/zeemaa.ksa', icon: 'fab fa-instagram', label: 'Instagram' },
            ]).map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="sic" aria-label={s.label}>
                <i className={s.icon} />
              </a>
            ))}
          </div>
          <button className="mdl-foot-login" onClick={() => { setMobileOpen(false); setLoginOpen(true); }}>
            <i className="fas fa-lock" /> {dict.adminLogin}
          </button>
        </div>
      </div>

      {/* BOTTOM TICKER */}
      <div className="bottom-ticker">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...dict.ticker, ...dict.ticker].map((tk, i) => (
              <span key={i}><span className="d">✦</span> {tk}</span>
            ))}
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setLoginOpen(false); }}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',backdropFilter:'blur(10px)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
          <div style={{background:'linear-gradient(160deg,#0d1b2e,#0a1520)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:18,padding:40,width:'100%',maxWidth:380,position:'relative',boxShadow:'0 40px 80px rgba(0,0,0,0.6)'}}>
            <button onClick={() => setLoginOpen(false)}
              style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.06)',border:'none',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:13,transition:'all .2s'}}
              onMouseOver={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.transform='rotate(90deg)';}}
              onMouseOut={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.transform='rotate(0)';}}>
              <i className="fas fa-times"/>
            </button>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:28}}>
              <LogoIcon height={26}/>
              <span style={{fontWeight:700,fontSize:16}}>{dict.adminLogin}</span>
            </div>
            <form onSubmit={handleLogin}>
              <div style={{marginBottom:14}}>
                <label style={{display:'block',fontSize:11,color:'rgba(255,255,255,0.45)',marginBottom:7,textTransform:'uppercase',letterSpacing:'.07em',fontWeight:600}}>{dict.username}</label>
                <input className="fi" type="text" placeholder={dict.enterUsername} value={username} onChange={e=>setUsername(e.target.value)} required autoFocus/>
              </div>
              <div style={{marginBottom:loginErr?8:22}}>
                <label style={{display:'block',fontSize:11,color:'rgba(255,255,255,0.45)',marginBottom:7,textTransform:'uppercase',letterSpacing:'.07em',fontWeight:600}}>{dict.password}</label>
                <input className="fi" type="password" placeholder={dict.enterPassword} value={password} onChange={e=>setPassword(e.target.value)} required/>
              </div>
              {loginErr && <p style={{color:'#ff6b6b',fontSize:13,marginBottom:16}}>{loginErr}</p>}
              <button type="submit" className="bg" disabled={logging} style={{width:'100%',justifyContent:'center'}}>
                {logging ? dict.signingIn : dict.signIn}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
