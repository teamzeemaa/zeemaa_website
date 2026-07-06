import { readStore } from '../../lib/store';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

export const metadata = {
  title: 'Privacy Policy | Zeemaa Event Technology',
  description: 'How Zeemaa collects, uses, and protects attendee and client data across registration, ticketing, accreditation, and event communications.',
  alternates: { canonical: 'https://zeemaa.com/privacy-policy' },
};

const sections = [
  {
    h: '1. What This Policy Covers',
    p: [
      'This policy explains how Zeemaa collects, uses, and protects information when you visit zeemaa.com, register for an event run on our platform, buy a ticket, or contact us directly. It applies to event organizers who engage us and to attendees who register or check in through a Zeemaa-managed event.',
    ],
  },
  {
    h: '2. Information We Collect',
    p: [
      'From event organizers: company name, contact details, event requirements, and billing information needed to scope and deliver our services.',
      'From attendees: name, email, phone number, organization, job title, and attendee category, collected through registration forms, ticketing checkout, or invitation and RSVP flows, only as required by the specific event.',
      'From website visitors: standard analytics data such as pages visited and general location, collected through Google Analytics and similar tools, and information submitted through contact or demo request forms.',
    ],
  },
  {
    h: '3. How We Use Information',
    p: [
      'To run the registration, ticketing, accreditation, and check-in systems for the event you are attending or organizing.',
      'To send invitations, reminders, confirmations, e-badges, and e-tickets by email, WhatsApp, or both, depending on what the event organizer has configured.',
      'To process payments securely through certified Saudi payment gateways, including MADA, Moyasar, Visa, Mastercard, and Apple Pay.',
      'To respond to enquiries submitted through our contact or demo request forms, and to improve our website and services.',
    ],
  },
  {
    h: '4. Payment Information',
    p: [
      'Zeemaa does not store full card numbers. Payments made through our ticketing and registration platform are processed directly by certified, PCI-DSS compliant payment gateways such as Moyasar. We receive confirmation of payment status, not raw card details.',
    ],
  },
  {
    h: '5. Data Sharing',
    p: [
      'Attendee data collected for a specific event is shared with that event\'s organizer, since it is their event and their attendee list. We do not sell attendee or client data to third parties. Data may be shared with payment gateways and communication providers (email and WhatsApp delivery) strictly to deliver the services requested.',
    ],
  },
  {
    h: '6. Data Retention and Ownership',
    p: [
      'Event data belongs to the organizer who ran the event. At the end of an engagement, full attendee data is handed over to the organizer in a clean, exportable format. We retain data only as long as needed to deliver the service or as required by law.',
    ],
  },
  {
    h: '7. Cookies and Analytics',
    p: [
      'Our website uses cookies and similar technologies for essential functionality and for analytics through Google Analytics and Google Ads, so we can understand how the site is used and measure the performance of our marketing. You can control cookies through your browser settings.',
    ],
  },
  {
    h: '8. Your Rights',
    p: [
      'You can request access to, correction of, or deletion of your personal data by contacting us directly. For data tied to a specific event, we will coordinate with the event organizer where required, since they are the data controller for their attendee list.',
    ],
  },
  {
    h: '9. Contact',
    p: [
      'Questions about this policy can be sent to hello@zeemaa.com or +966 55 299 5295. Zeemaa is headquartered in Riyadh, Saudi Arabia, with operations in the Eastern Province.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  const store = readStore();

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          ghost="PRIVACY"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
          maxWidth={800}
        />
        <section style={{ maxWidth: 800, margin: '0 auto', padding: '10px 32px 100px' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>Last updated: July 2026</p>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{s.h}</h2>
              {s.p.map((para, pi) => (
                <p key={pi} style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: pi < s.p.length - 1 ? 12 : 0, textAlign: 'justify' }}>{para}</p>
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
