import { getServiceCta } from '../../lib/blog';

export default function ServiceCTACard({ slug }) {
  const svc = getServiceCta(slug);
  if (!svc) return null;
  return (
    <a href={svc.href} className="postcta">
      <div className="postcta-ic"><i className={`fas ${svc.icon}`} /></div>
      <div className="postcta-body">
        <div className="postcta-label">Related Service</div>
        <div className="postcta-name">{svc.name}</div>
        <div className="postcta-line">{svc.line}</div>
      </div>
      <i className="fas fa-arrow-right postcta-arr" />
    </a>
  );
}
