import { readStore } from '../../lib/store';
import IndustriesClient from './IndustriesClient';

export const metadata = {
  title: 'Industries | Zeemaa Event Technology',
  description: 'Event technology for conferences, exhibitions, corporate events, award ceremonies, government events, and workshops across Saudi Arabia.',
  alternates: { canonical: 'https://zeemaa.com/industries' },
};

export default function IndustriesPage() {
  const store = readStore();
  return <IndustriesClient store={store} />;
}