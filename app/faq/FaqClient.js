'use client';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

export default function FaqClient({ store, faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif', minHeight: '100vh' }}>

        <PageHero
          eyebrow="Questions and Answers"
          title="Frequently Asked Questions"
          ghost="FAQ"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
          maxWidth={900}
        />

        <section style={{ padding: '0 32px 60px', maxWidth: 900, margin: '0 auto' }}>
          <div className="acc">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.id} className={`acc-item ${isOpen ? 'open' : ''}`}>
                  <button className="acc-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="acc-ic"><i className="fas fa-question" /></span>
                    <span className="acc-title">{item.q}</span>
                    <span className="acc-chev"><i className="fas fa-chevron-down" /></span>
                  </button>
                  <div className="acc-body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="acc-inner">
                      <p className="acc-desc">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Still have a question?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Reach out and our team will answer directly, usually within 24 hours.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
            <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}