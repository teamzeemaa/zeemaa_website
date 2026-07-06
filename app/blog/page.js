import { readStore } from '../../lib/store';
import { getPublishedPosts, getFeaturedPost } from '../../lib/blog';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Breadcrumb from '../../components/Breadcrumb';
import BlogHero from '../../components/blog/BlogHero';
import ServicesStrip from '../../components/blog/ServicesStrip';
import FeaturedPostCard from '../../components/blog/FeaturedPostCard';
import PostCard from '../../components/blog/PostCard';

const SITE_URL = 'https://zeemaa.com';

export async function generateMetadata() {
  return {
    title: 'Blog | Zeemaa Event Technology',
    description: 'Insights, guides, and expert perspectives on event technology and the Saudi events landscape.',
    alternates: { canonical: `${SITE_URL}/blog` },
  };
}

export default async function BlogPage() {
  const store = await readStore();
  const posts = getPublishedPosts(store);
  const featured = getFeaturedPost(store);
  const rest = posts.filter(p => p.slug !== featured?.slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif', minHeight: '100vh' }}>
        <BlogHero />
        <ServicesStrip />

        <section style={{ padding: '20px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)' }}>
              <i className="fas fa-newspaper" style={{ fontSize: 48, marginBottom: 16, display: 'block' }} />
              <p style={{ fontSize: 18, marginBottom: 8 }}>Articles coming soon</p>
              <p style={{ fontSize: 14 }}>We are working on guides and insights for event organizers in KSA.</p>
            </div>
          ) : (
            <>
              {featured && <FeaturedPostCard post={featured} />}
              <div className="postgrid">
                {rest.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
