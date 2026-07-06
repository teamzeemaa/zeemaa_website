'use client';
import { useState, useEffect, useRef } from 'react';

const QR = [
  '111010111',
  '101000101',
  '111010111',
  '000101000',
  '101010101',
  '010101010',
  '111010111',
  '101000101',
  '111010111',
];

export default function BadgePrintReveal() {
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
    <div ref={ref} className={`bpviz${run ? ' run' : ''}`}>
      <div className="bpviz-printer">
        <span className="bpviz-led" />
        <div className="bpviz-slot" />
      </div>
      <div className="bpviz-slotmask">
        <div className="bpviz-card">
          <div className="bpviz-cardhead">
            <div className="bpviz-avatar"><i className="fas fa-user" /></div>
            <div>
              <div className="bpviz-name">Sarah Al-Faisal</div>
              <div className="bpviz-role">SPEAKER</div>
            </div>
          </div>
          <div className="bpviz-qr">
            <div className="bpviz-qr-grid">
              {QR.map((row, ri) => row.split('').map((cell, ci) => (
                <span key={`${ri}-${ci}`} className={cell === '1' ? 'on' : ''} />
              )))}
            </div>
            <div className="bpviz-scanline" />
          </div>
          <div className="bpviz-status"><i className="fas fa-check-circle" /> Access Granted</div>
          <div className="bpviz-foot">
            <span className="bpviz-footlogo">Z</span> ZEEMAA EVENT PASS
          </div>
        </div>
      </div>
    </div>
  );
}
