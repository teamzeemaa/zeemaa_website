import Breadcrumb from './Breadcrumb';

export default function PageHero({ eyebrow, title, ghost, crumbs = [], maxWidth = 1200, locale = 'en' }) {
  return (
    <section className="phero" style={{ maxWidth, margin: '0 auto', padding: '48px 32px 44px' }}>
      {ghost && <div className="phero-ghost" aria-hidden="true">{ghost}</div>}
      <div className="phero-content">
        {crumbs.length > 0 && <Breadcrumb items={crumbs} locale={locale} />}
        <p className="sey">{eyebrow}</p>
        <h1 className="st2" style={{ fontSize: 'clamp(28px,3.4vw,42px)', marginBottom: 0 }}>{title}</h1>
      </div>
      <div className="phero-divider" />
    </section>
  );
}
