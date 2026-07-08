const items = {
  en: [
    { n: '01', icon: 'fa-bullseye', title: 'Our Mission', text: 'To empower event organizers across Saudi Arabia with technology that makes registration, accreditation, and attendee management seamless and professional.' },
    { n: '02', icon: 'fa-eye', title: 'Our Vision', text: 'To be the trusted technology partner for events in the Kingdom, driving innovation and digital transformation in how events are planned, executed, and experienced.' },
    { n: '03', icon: 'fa-star', title: 'Aligned with Vision 2030', text: "Supporting Saudi Arabia's journey toward a vibrant society and diversified economy by enabling world-class events through local expertise and regional leadership." },
  ],
  ar: [
    { n: '01', icon: 'fa-bullseye', title: 'مهمتنا', text: 'تمكين منظمي الفعاليات في جميع أنحاء المملكة العربية السعودية بتقنية تجعل التسجيل والاعتماد وإدارة الحضور سلسة واحترافية.' },
    { n: '02', icon: 'fa-eye', title: 'رؤيتنا', text: 'أن نكون الشريك التقني الموثوق للفعاليات في المملكة، ندفع الابتكار والتحول الرقمي في طريقة التخطيط للفعاليات وتنفيذها وتجربتها.' },
    { n: '03', icon: 'fa-star', title: 'متوافقون مع رؤية 2030', text: 'دعم مسيرة المملكة العربية السعودية نحو مجتمع حيوي واقتصاد متنوع من خلال تمكين فعاليات عالمية المستوى بخبرة محلية وريادة إقليمية.' },
  ],
};

export default function MissionVisionCards({ locale = 'en' }) {
  const list = items[locale] || items.en;
  return (
    <div className="mvc-grid">
      {list.map((it, i) => (
        <div key={i} className="mvc-card" style={{ animationDelay: `${i * 0.15}s` }}>
          <span className="mvc-num">{it.n}</span>
          <div className="mvc-ic-ring"><i className={`fas ${it.icon}`} /></div>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  );
}
