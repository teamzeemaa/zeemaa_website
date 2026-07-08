import { readStore } from '../lib/store';
import HomeClient from '../components/HomeClient';

export const metadata = {
  title: 'Zeemaa | Event Technology & Registration Solutions in Saudi Arabia',
  description: 'Fully managed on-site event technology across KSA: QR check-in, badge printing, registration, accreditation, ticketing, certificates, and on-site operations for conferences, exhibitions, and corporate events.',
  alternates: {
    canonical: 'https://zeemaa.com',
    languages: { en: 'https://zeemaa.com', ar: 'https://zeemaa.com/ar' },
  },
};

export default async function HomePage() {
  const store = await readStore();
  return <HomeClient store={store} />;
}
