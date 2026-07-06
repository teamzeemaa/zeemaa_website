const items = [
  { n: '01', icon: 'fa-bullseye', title: 'Our Mission', text: 'To empower event organizers across Saudi Arabia with technology that makes registration, accreditation, and attendee management seamless and professional.' },
  { n: '02', icon: 'fa-eye', title: 'Our Vision', text: 'To be the trusted technology partner for events in the Kingdom, driving innovation and digital transformation in how events are planned, executed, and experienced.' },
  { n: '03', icon: 'fa-star', title: 'Aligned with Vision 2030', text: "Supporting Saudi Arabia's journey toward a vibrant society and diversified economy by enabling world-class events through local expertise and regional leadership." },
];

export default function MissionVisionCards() {
  return (
    <div className="mvc-grid">
      {items.map((it, i) => (
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
