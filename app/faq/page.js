import { readStore } from '../../lib/store';
import FaqClient from './FaqClient';

export const metadata = {
  title: 'FAQ | Zeemaa Event Technology',
  description: 'Answers to common questions about Zeemaa event technology: registration platforms, on-site support, payment methods, Arabic and English support, ticketing, and setup timelines for events across Saudi Arabia.',
  alternates: { canonical: 'https://zeemaa.com/faq' },
};

export default async function FaqPage() {
  const store = await readStore();
  const faqs = (store.faq || []).filter(f => f.enabled);
  return <FaqClient store={store} faqs={faqs} />;
}