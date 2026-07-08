const LABELS = {
  en: { register: 'Register', badge: 'Badge & Check-in', live: 'Live Event', cap: 'One team, one platform, managed end to end' },
  ar: { register: 'التسجيل', badge: 'الشارة وتسجيل الدخول', live: 'الفعالية المباشرة', cap: 'فريق واحد، منصة واحدة، إدارة متكاملة من الألف إلى الياء' },
};

export default function MissionVisual({ locale = 'en' }) {
  const t = LABELS[locale] || LABELS.en;
  return (
    <div className="msvz">
      <div className="msvz-row">
        <div className="msvz-node">
          <div className="msvz-ic"><i className="fas fa-user-plus" /></div>
          <span>{t.register}</span>
        </div>
        <div className="msvz-track"><i className="msvz-dot" /></div>
        <div className="msvz-node">
          <div className="msvz-ic"><i className="fas fa-id-badge" /></div>
          <span>{t.badge}</span>
        </div>
        <div className="msvz-track"><i className="msvz-dot" style={{ animationDelay: '1.2s' }} /></div>
        <div className="msvz-node">
          <div className="msvz-ic"><i className="fas fa-check-circle" /></div>
          <span>{t.live}</span>
        </div>
      </div>
      <p className="msvz-cap">{t.cap}</p>
    </div>
  );
}
