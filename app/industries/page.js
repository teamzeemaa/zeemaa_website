import { readStore } from '../../lib/store';
import IndustriesClient from './IndustriesClient';

export const metadata = {
  title: 'Industries | Zeemaa Event Technology',
  description: 'Event technology for conferences, exhibitions, corporate events, award ceremonies, government events, and workshops across Saudi Arabia.',
  alternates: {
    canonical: 'https://zeemaa.com/industries',
    languages: { en: 'https://zeemaa.com/industries', ar: 'https://zeemaa.com/ar/industries' },
  },
};

export default async function IndustriesPage() {
  const store = await readStore();
  return <IndustriesClient store={store} />;
}