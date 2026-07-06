import { servicesList } from '../lib/servicesList';

export default function RelatedServices({ currentHref, count = 3 }) {
  const pool = servicesList.filter(s => s.href !== currentHref);
  const dedicated = pool.filter(s => s.href !== '/services');
  const generic = pool.filter(s => s.href === '/services');
  const picks = [...dedicated, ...generic]
    .slice(0, count)
    .sort((a, b) => (a.cat === b.cat ? 0 : a.cat === 'platform' ? -1 : 1));

  return (
    <section className="relsvc">
      <div className="relsvc-in">
        <div className="relsvc-head">
          <div>
            <p className="sey">Explore More</p>
            <h2 className="st2" style={{ marginBottom: 0 }}>Other Services You May Need</h2>
          </div>
          <a href="/services" className="bgh relsvc-all">
            <i className="fas fa-arrow-right" /> View All Services
          </a>
        </div>
        <div className="relsvc-grid">
          {picks.map((s, i) => {
            const linked = s.href && s.href !== '/services';
            const Tag = linked ? 'a' : 'div';
            return (
              <Tag key={s.t} href={linked ? s.href : undefined} className={`relsvc-card ${s.cat}${linked ? '' : ' static'}`}>
                <span className="relsvc-tag">{s.cat === 'platform' ? 'Platform' : 'On-Site'}</span>
                <div className="relsvc-ic"><i className={`fas ${s.icon}`} /></div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                {linked && <span className="relsvc-cta">View Service <i className="fas fa-arrow-right" /></span>}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
