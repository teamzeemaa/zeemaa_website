import { readStore } from '../../lib/store';
import DemoClient from './DemoClient';

export const metadata = {
  title: 'Book a Demo | See Zeemaa Event Technology in Action',
  description: 'Schedule a personalized walkthrough of the Zeemaa platform: registration, QR check-in, badge printing, accreditation, and live analytics, tailored to your event in Saudi Arabia.',
  alternates: { canonical: 'https://zeemaa.com/demo' },
};

export default function DemoPage() {
  const store = readStore();
  return <DemoClient store={store} />;
}
