'use client';
import { useState, useEffect } from 'react';

export default function FloatingButtons({ whatsapp = '966552995295' }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waLink = `https://wa.me/${whatsapp}?text=Hi%20Zeemaa%2C%20I%20am%20planning%20an%20event%20and%20would%20like%20to%20discuss%20your%20solutions.`;

  return (
    <div className="fbtn-wrap">
      {showTop && (
        <button className="fbtn fbtn-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <i className="fas fa-arrow-up" />
        </button>
      )}
      <a className="fbtn fbtn-wa" href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  );
}