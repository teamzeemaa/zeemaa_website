'use client';
import { useState, useEffect, useRef } from 'react';

function useCountUp(target, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      setVal(cur);
    }, 30);
    return () => clearInterval(t);
  }, [target, run]);
  return val;
}

export default function RegDashboard() {
  const [run, setRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = useCountUp(2847, run);
  const checked = useCountUp(1256, run);
  const sessions = useCountUp(18, run);

  return (
    <div ref={ref} className="regdash">
      <div className="regdash-head">
        <div className="regdash-title">Live Registration Dashboard</div>
        <div className="regdash-live"><span className="regdash-dot" /> Live</div>
      </div>
      <div className="regdash-grid">
        <div className="regdash-stat">
          <div className="regdash-lbl">Total Registrations</div>
          <div className="regdash-num gold">{total.toLocaleString()}</div>
        </div>
        <div className="regdash-stat">
          <div className="regdash-lbl">Checked In Today</div>
          <div className="regdash-num teal">{checked.toLocaleString()}</div>
        </div>
        <div className="regdash-stat">
          <div className="regdash-lbl">Active Sessions</div>
          <div className="regdash-num gold">{sessions}</div>
        </div>
        <div className="regdash-stat">
          <div className="regdash-lbl">Check-in Rate</div>
          <div className="regdash-num teal">{run ? '94%' : '0%'}</div>
        </div>
      </div>
      <div className="regdash-barwrap">
        <div className="regdash-barlbl"><span>Capacity</span><span>{run ? '71%' : '0%'}</span></div>
        <div className="regdash-bar"><div className="regdash-fill" style={{ width: run ? '71%' : '0%' }} /></div>
      </div>
    </div>
  );
}