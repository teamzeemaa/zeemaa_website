import { LogoIcon, LogoText } from './Logo';

const I18N = {
  en: {
    blurb: 'Event technology solutions for Saudi Arabia. Registration, accreditation, badges, certificates, ticketing, and on-site support.',
    platform: 'Platform',
    company: 'Company',
    contact: 'Contact',
    offices: 'Offices',
    registration: 'Registration System',
    badges: 'Badge Printing',
    certificates: 'Certificate Generator',
    checkin: 'QR Check-in',
    payments: 'Payment Integration',
    home: 'Home',
    about: 'About',
    services: 'Services',
    industries: 'Industries',
    profile: 'Company Profile',
    viewProfile: 'View Company Profile',
    contactLink: 'Contact',
    riyadh: 'Riyadh, KSA (HQ)',
    dammam: 'Dammam, KSA',
    rights: '2025 Zeemaa. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms',
  },
  ar: {
    blurb: 'حلول تقنية الفعاليات في المملكة العربية السعودية: التسجيل، الاعتماد، الشارات، الشهادات، التذاكر، والدعم الميداني.',
    platform: 'المنصة',
    company: 'الشركة',
    contact: 'التواصل',
    offices: 'المكاتب',
    registration: 'نظام التسجيل',
    badges: 'طباعة الشارات',
    certificates: 'مولد الشهادات',
    checkin: 'تسجيل الدخول عبر QR',
    payments: 'تكامل المدفوعات',
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    industries: 'القطاعات',
    profile: 'ملف الشركة',
    viewProfile: 'عرض ملف الشركة',
    contactLink: 'تواصل معنا',
    riyadh: 'الرياض، السعودية (المقر الرئيسي)',
    dammam: 'الدمام، السعودية',
    rights: '2025 زيماء. جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
  },
};

export default function Footer({ locale = 'en' }) {
  const t = I18N[locale] || I18N.en;
  const p = locale === 'ar' ? '/ar' : '';
  const iconStyle = locale === 'ar' ? { color:'#D4AF37', marginLeft:8, fontSize:11 } : { color:'#D4AF37', marginRight:8, fontSize:11 };

  return (
    <footer>
      <div className="fgrid">
        <div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:16}}>
            <LogoIcon height={28}/>
            <span style={{fontWeight:700,fontSize:16}}>Zeemaa</span>
          </div>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.35)',lineHeight:1.75,marginBottom:20,maxWidth:280}}>
            {t.blurb}
          </p>
          <div style={{display:'flex',gap:8,marginBottom:20}}>
            <a href="https://www.linkedin.com/company/zeemaa" target="_blank" rel="noopener noreferrer" className="sic"><i className="fab fa-linkedin-in"/></a>
            <a href="https://www.instagram.com/zeemaa.ksa" target="_blank" rel="noopener noreferrer" className="sic"><i className="fab fa-instagram"/></a>
          </div>
          <a href="/profile" className="bg-profile" style={{padding:'9px 18px',fontSize:13}}>
            <i className="fas fa-file-lines" /> {t.viewProfile}
          </a>
        </div>
        <div>
          <div className="ftitle">{t.platform}</div>
          <a className="flink" href={`${p}/services`}>{t.registration}</a>
          <a className="flink" href={`${p}/services`}>{t.badges}</a>
          <a className="flink" href={`${p}/services`}>{t.certificates}</a>
          <a className="flink" href={`${p}/services`}>{t.checkin}</a>
          <a className="flink" href={`${p}/services`}>{t.payments}</a>
        </div>
        <div>
          <div className="ftitle">{t.company}</div>
          <a className="flink" href={p || '/'}>{t.home}</a>
          <a className="flink" href={`${p}/about`}>{t.about}</a>
          <a className="flink" href={`${p}/services`}>{t.services}</a>
          <a className="flink" href={`${p}/industries`}>{t.industries}</a>
          <a className="flink" href="/profile">{t.profile}</a>
          <a className="flink" href={`${p}/contact`}>{t.contactLink}</a>
        </div>
        <div>
          <div className="ftitle">{t.contact}</div>
          <div className="flink"><i className="fas fa-phone" style={iconStyle}/> <span className="ltr-num">+966 55 299 5295</span></div>
          <div className="flink"><i className="fas fa-envelope" style={iconStyle}/> <span className="ltr-num">hello@zeemaa.com</span></div>
          <div style={{marginTop:16}}>
            <div className="ftitle">{t.offices}</div>
            <div className="flink">{t.riyadh}</div>
            <div className="flink">{t.dammam}</div>
          </div>
        </div>
      </div>
      <div className="fbot">
        <span>{t.rights}</span>
        <div style={{display:'flex',gap:16}}>
          <a className="flink" href="/privacy-policy" style={{margin:0}}>{t.privacy}</a>
          <a className="flink" href="/terms-of-service" style={{margin:0}}>{t.terms}</a>
        </div>
      </div>
    </footer>
  );
}
