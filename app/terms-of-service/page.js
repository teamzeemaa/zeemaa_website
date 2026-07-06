import { readStore } from '../../lib/store';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

export const metadata = {
  title: 'Terms of Service | Zeemaa Event Technology',
  description: 'The terms that govern use of Zeemaa event technology services, including registration, ticketing, accreditation, badge printing, and on-site support.',
  alternates: { canonical: 'https://zeemaa.com/terms-of-service' },
};

const sections = [
  {
    h: '1. Agreement to Terms',
    p: [
      'These terms govern the use of zeemaa.com and any event technology services provided by Zeemaa, including registration, ticketing, accreditation, badge printing, invitations and reminders, and on-site support. By engaging Zeemaa for an event or using our platform, you agree to these terms.',
    ],
  },
  {
    h: '2. Our Services',
    p: [
      'Zeemaa provides fully managed event technology services for conferences, exhibitions, corporate events, government events, award ceremonies, and workshops across Saudi Arabia. The specific scope, deliverables, and timeline for each engagement are confirmed in a proposal agreed with the client before work begins.',
    ],
  },
  {
    h: '3. Client Responsibilities',
    p: [
      'Clients are responsible for providing accurate event details, branding assets, attendee categories, and requirements in good time, and for reviewing and approving registration pages, badges, and communications before they go live. Delays in providing this information may affect delivery timelines.',
    ],
  },
  {
    h: '4. Payments',
    p: [
      'Fees for our services are set out in the agreed proposal. Payments made by attendees through our ticketing platform are processed via certified Saudi payment gateways, including MADA, Moyasar, Visa, Mastercard, and Apple Pay. Refunds and ticket transfers are handled according to the policy set by the event organizer for their event.',
    ],
  },
  {
    h: '5. Cancellations and Rescheduling',
    p: [
      'If an event is cancelled or rescheduled, please notify us as early as possible. Any costs already committed on your behalf, such as hardware booking or on-site staffing, may not be fully recoverable depending on timing.',
    ],
  },
  {
    h: '6. Intellectual Property',
    p: [
      'Event branding, logos, and content provided by the client remain the client\'s property. Zeemaa retains ownership of its own platform, software, and underlying technology used to deliver the service.',
    ],
  },
  {
    h: '7. On-Site Conduct',
    p: [
      'When our team is on-ground at your event, we operate under reasonable venue rules and safety requirements communicated in advance. We expect the same professional conduct from client staff and attendees toward our team.',
    ],
  },
  {
    h: '8. Limitation of Liability',
    p: [
      'Zeemaa works to deliver every event without disruption, but we are not liable for delays or issues caused by factors outside our reasonable control, including venue infrastructure failures, third-party payment gateway outages, or force majeure events. Our liability for any claim is limited to the fees paid for the specific engagement in question.',
    ],
  },
  {
    h: '9. Governing Law',
    p: [
      'These terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes will be subject to the jurisdiction of the competent courts of Saudi Arabia.',
    ],
  },
  {
    h: '10. Contact',
    p: [
      'Questions about these terms can be sent to hello@zeemaa.com or +966 55 299 5295. Zeemaa is headquartered in Riyadh, Saudi Arabia, with operations in the Eastern Province.',
    ],
  },
];

export default function TermsOfServicePage() {
  const store = readStore();

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>
        <PageHero
          eyebrow="Legal"
          title="Terms of Service"
          ghost="TERMS"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
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
