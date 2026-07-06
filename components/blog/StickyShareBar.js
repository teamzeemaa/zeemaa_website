'use client';
import { useState, useEffect } from 'react';
import ShareRow from './ShareRow';

export default function StickyShareBar({ url, title }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="sticky-share">
      <ShareRow url={url} title={title} compact />
      <button className="sticky-share-close" aria-label="Dismiss share bar" onClick={() => setDismissed(true)}>
        <i className="fas fa-xmark" />
      </button>
    </div>
  );
}
