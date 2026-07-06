'use client';
import { useState, useEffect, useRef } from 'react';

const QR = [
  '111010111',
  '101000101',
  '111010111',
  '000101000',
  '110101011',
  '010101010',
  '111010111',
  '101000101',
  '111010111',
];

export default function TicketReveal() {
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
    <div ref={ref} className={`tkviz${run ? ' run' : ''}`}>
      <div className="tkviz-ticket">
        <div className="tkviz-main">
          <div className="tkviz-stamp">PAID</div>
          <div className="tkviz-ev">E-TICKET</div>
          <div className="tkviz-name">Riyadh Business Forum</div>
          <div className="tkviz-row">
            <div>
              <div className="tkviz-lbl">Tier</div>
              <div className="tkviz-val gold">VIP</div>
            </div>
            <div>
              <div className="tkviz-lbl">Seat</div>
              <div className="tkviz-val">A-14</div>
            </div>
            <div>
              <div className="tkviz-lbl">Price</div>
              <div className="tkviz-val">SAR 950</div>
            </div>
          </div>
        </div>
        <div className="tkviz-perf" />
        <div className="tkviz-stub">
          <div className="tkviz-qr">
            <div className="tkviz-qr-grid">
              {QR.map((row, ri) => row.split('').map((cell, ci) => (
                <span key={`${ri}-${ci}`} className={cell === '1' ? 'on' : ''} />
              )))}
            </div>
          </div>
          <div className="tkviz-admit">
            SCAN AT GATE
            <b>ADMIT ONE</b>
          </div>
        </div>
      </div>
    </div>
  );
}
