export default function Breadcrumb({ items = [], locale = 'en' }) {
  return (
    <div className="phero-crumbs" role="navigation" aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}>
      {items.map((c, i) => (
        <span key={i}>
          {c.href ? <a href={c.href}>{c.label}</a> : <span className="cur">{c.label}</span>}
          {i < items.length - 1 && <i className="fas fa-chevron-right" />}
        </span>
      ))}
    </div>
  );
}
