import { SERVICE_CTA_OPTIONS } from '../../lib/blog';

export default function ServicesStrip() {
  return (
    <section className="blogsvc">
      <div className="blogsvc-in">
        {SERVICE_CTA_OPTIONS.map(s => (
          <a key={s.slug} href={s.href} className="blogsvc-card">
            <div className="blogsvc-ic"><i className={`fas ${s.icon}`} /></div>
            <div>
              <div className="blogsvc-t">{s.name}</div>
              <div className="blogsvc-d">{s.line}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
