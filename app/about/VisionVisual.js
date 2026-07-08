const LABELS = {
  en: { conferences: 'Conferences', exhibitions: 'Exhibitions', corporate: 'Corporate', government: 'Government' },
  ar: { conferences: 'المؤتمرات', exhibitions: 'المعارض', corporate: 'الشركات', government: 'الحكومة' },
};

export default function VisionVisual({ locale = 'en' }) {
  const t = LABELS[locale] || LABELS.en;
  return (
    <div className="vnvz">
      <div className="vnvz-ring r1" />
      <div className="vnvz-ring r2" />
      <div className="vnvz-hub"><i className="fas fa-eye" /></div>
      <div className="vnvz-node n1"><i className="fas fa-microphone-lines" /><span>{t.conferences}</span></div>
      <div className="vnvz-node n2"><i className="fas fa-store" /><span>{t.exhibitions}</span></div>
      <div className="vnvz-node n3"><i className="fas fa-building" /><span>{t.corporate}</span></div>
      <div className="vnvz-node n4"><i className="fas fa-landmark" /><span>{t.government}</span></div>
    </div>
  );
}
