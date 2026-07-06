'use client';
import { useState } from 'react';

export default function ShareRow({ url, title, compact = false }) {
  const [copied, setCopied] = useState(false);

  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={`share-row${compact ? ' compact' : ''}`}>
      {!compact && <span className="share-row-label">Share</span>}
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="share-btn linkedin" aria-label="Share on LinkedIn">
        <i className="fab fa-linkedin-in" />
      </a>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp" aria-label="Share on WhatsApp">
        <i className="fab fa-whatsapp" />
      </a>
      <button onClick={copyLink} className="share-btn copy" aria-label="Copy link">
        <i className={`fas ${copied ? 'fa-check' : 'fa-link'}`} />
      </button>
      {copied && <span className="share-copied">Copied!</span>}
    </div>
  );
}
