const LABELS = {
  en: { badge: 'Vision 2030', society: 'Vibrant Society', economy: 'Thriving Economy', nation: 'Ambitious Nation' },
  ar: { badge: 'رؤية 2030', society: 'مجتمع حيوي', economy: 'اقتصاد مزدهر', nation: 'وطن طموح' },
};

export default function Vision2030Visual({ locale = 'en' }) {
  const t = LABELS[locale] || LABELS.en;
  return (
    <div className="v30vz">
      <div className="v30vz-mark">
        <svg className="v30vz-ring" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#v30grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="90" transform="rotate(-90 60 60)" />
          <defs>
            <linearGradient id="v30grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#00D4B4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="v30vz-num">2030</div>
      </div>
      <div className="v30vz-badge"><i className="fas fa-star" /> {t.badge}</div>
      <div className="v30vz-bus" />
      <div className="v30vz-pillars">
        <div className="v30vz-pillar"><i className="fas fa-users" /><span>{t.society}</span></div>
        <div className="v30vz-pillar"><i className="fas fa-chart-line" /><span>{t.economy}</span></div>
        <div className="v30vz-pillar"><i className="fas fa-bullseye" /><span>{t.nation}</span></div>
      </div>
    </div>
  );
}
