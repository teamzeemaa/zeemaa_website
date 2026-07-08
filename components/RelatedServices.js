import { servicesList, servicesListAr } from '../lib/servicesList';

const I18N = {
  en: { explore: 'Explore More', heading: 'Other Services You May Need', viewAll: 'View All Services', platform: 'Platform', onsite: 'On-Site', viewService: 'View Service', servicesHref: '/services' },
  ar: { explore: 'المزيد', heading: 'خدمات أخرى قد تحتاجها', viewAll: 'عرض جميع الخدمات', platform: 'المنصة', onsite: 'ميداني', viewService: 'عرض الخدمة', servicesHref: '/ar/services' },
};

export default function RelatedServices({ currentHref, count = 3, locale = 'en' }) {
  const t = I18N[locale] || I18N.en;
  const list = locale === 'ar' ? servicesListAr : servicesList;
  const pool = list.filter(s => s.href !== currentHref);
  const dedicated = pool.filter(s => s.href !== t.servicesHref);
  const generic = pool.filter(s => s.href === t.servicesHref);
  const picks = [...dedicated, ...generic]
    .slice(0, count)
    .sort((a, b) => (a.cat === b.cat ? 0 : a.cat === 'platform' ? -1 : 1));

  return (
    <section className="relsvc">
      <div className="relsvc-in">
        <div className="relsvc-head">
          <div>
            <p className="sey">{t.explore}</p>
            <h2 className="st2" style={{ marginBottom: 0 }}>{t.heading}</h2>
          </div>
          <a href={t.servicesHref} className="bgh relsvc-all">
            <i className="fas fa-arrow-right" /> {t.viewAll}
          </a>
        </div>
        <div className="relsvc-grid">
          {picks.map((s, i) => {
            const linked = s.href && s.href !== t.servicesHref;
            const Tag = linked ? 'a' : 'div';
            return (
              <Tag key={s.t} href={linked ? s.href : undefined} className={`relsvc-card ${s.cat}${linked ? '' : ' static'}`}>
                <span className="relsvc-tag">{s.cat === 'platform' ? t.platform : t.onsite}</span>
                <div className="relsvc-ic"><i className={`fas ${s.icon}`} /></div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                {linked && <span className="relsvc-cta">{t.viewService} <i className="fas fa-arrow-right" /></span>}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
