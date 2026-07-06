'use client';
import { useState, useEffect, useRef } from 'react';

export default function InviteReveal() {
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
    <div ref={ref} className={`invviz${run ? ' run' : ''}`}>
      <div className="invviz-head">
        <div className="invviz-title">Guest Communications</div>
        <div className="invviz-live"><span className="invviz-dot" /> Live</div>
      </div>
      <div className="invviz-stage">
        <div className="invviz-scene email">
          <div className="invviz-method"><i className="fas fa-envelope-open-text" /> Email Invitation</div>
          <div className="invviz-person">
            <div className="invviz-av gold"><i className="fas fa-user" /></div>
            <div>
              <div className="invviz-name">Layla Al-Zahrani</div>
              <div className="invviz-zone">Gala Dinner &middot; Riyadh</div>
            </div>
          </div>
          <div className="invviz-status"><i className="fas fa-paper-plane" /> Invitation Sent</div>
        </div>
        <div className="invviz-scene reminder">
          <div className="invviz-method"><i className="fab fa-whatsapp" /> WhatsApp Reminder</div>
          <div className="invviz-person">
            <div className="invviz-av teal"><i className="fas fa-user" /></div>
            <div>
              <div className="invviz-name">Omar Al-Qahtani</div>
              <div className="invviz-zone">3 Days to Go</div>
            </div>
          </div>
          <div className="invviz-status"><i className="fas fa-bell" /> Reminder Delivered</div>
        </div>
        <div className="invviz-scene confirm">
          <div className="invviz-method"><i className="fas fa-circle-check" /> RSVP Confirmed</div>
          <div className="invviz-person">
            <div className="invviz-av gold"><i className="fas fa-user" /></div>
            <div>
              <div className="invviz-name">Sara Al-Mutairi</div>
              <div className="invviz-zone">E-Badge Issued</div>
            </div>
          </div>
          <div className="invviz-status"><i className="fas fa-check-circle" /> Confirmation Sent</div>
        </div>
      </div>
      <div className="invviz-foot">
        <span className="invviz-tag email"><i className="fas fa-envelope" /> Email</span>
        <span className="invviz-tag wa"><i className="fab fa-whatsapp" /> WhatsApp</span>
      </div>
    </div>
  );
}
