import { readStore } from '../../lib/store';
import ServicesClient from './ServicesClient';


export const metadata = {
  title: 'Services | Zeemaa Event Technology',
  description: 'Full-scope event technology for Saudi Arabia: a registration platform, secure badge printing system, event accreditation services with an access control platform in Riyadh, event ticketing with Saudi payment gateways, and a real-time event analytics dashboard, all fully managed on-site.',
  alternates: { canonical: 'https://zeemaa.com/services' },
};

export default function ServicesPage() {
  const store = readStore();
  return <ServicesClient store={store} />;
}
