'use client';
import { useState, useEffect, useRef } from 'react';

export default function AccessControlReveal() {
  const [run, setRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`acviz${run ? ' run' : ''}`}>
      <div className="acviz-head">
        <div className="acviz-title">Live Access Control</div>
        <div className="acviz-live"><span className="acviz-dot" /> Live</div>
      </div>
      <div className="acviz-stage">
        <div className="acviz-scene qr">
          <div className="acviz-method"><i className="fas fa-qrcode" /> QR Badge Scan</div>
          <div className="acviz-person">
            <div className="acviz-av gold"><i className="fas fa-user" /></div>
            <div>
              <div className="acviz-name">Ahmed Al-Rashidi</div>
              <div className="acviz-zone">VIP &middot; Main Hall</div>
            </div>
          </div>
          <div className="acviz-status"><i className="fas fa-check-circle" /> Access Granted</div>
        </div>
        <div className="acviz-scene rfid">
          <div className="acviz-method"><i className="fas fa-wave-square" /> RFID Tap Read</div>
          <div className="acviz-person">
            <div className="acviz-av teal"><i className="fas fa-user" /></div>
            <div>
              <div className="acviz-name">Sara Al-Mutairi</div>
              <div className="acviz-zone">Speaker &middot; Session B</div>
            </div>
          </div>
          <div className="acviz-status"><i className="fas fa-check-circle" /> Access Granted</div>
        </div>
      </div>
      <div className="acviz-foot">
        <span className="acviz-tag qr"><i className="fas fa-qrcode" /> QR-First</span>
        <span className="acviz-tag rfid"><i className="fas fa-wave-square" /> RFID Optional</span>
      </div>
    </div>
  );
}
