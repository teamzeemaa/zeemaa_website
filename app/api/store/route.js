import { NextResponse } from 'next/server';
import { readStore } from '../../../lib/store';

export async function GET() {
  const store = readStore();
  const publicStore = {
    site: store.site || {},
    sections: store.sections || {},
    pages: store.pages || {},
    stats: store.stats || [],
    locations: store.locations || [],
    partners: store.partners || [],
    faq: store.faq || [],
    testimonials: store.testimonials || [],
    gallery: store.gallery || [],
    resources: store.resources || [],
  };
  return NextResponse.json({ store: publicStore });
}
