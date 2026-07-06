import { readStore } from '../../../lib/store';
import { getPostBySlug, getRelatedPosts, splitContentAtMidpoint } from '../../../lib/blog';
import Footer from '../../../components/Footer';
import Nav from '../../../components/Nav';
import Breadcrumb from '../../../components/Breadcrumb';
import ServiceCTACard from '../../../components/blog/ServiceCTACard';
import RelatedPosts from '../../../components/blog/RelatedPosts';
import ShareRow from '../../../components/blog/ShareRow';
import StickyShareBar from '../../../components/blog/StickyShareBar';
import { notFound } from 'next/navigation';

const SITE_URL = 'https://zeemaa.com';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const store = readStore();
  const post = getPostBySlug(store, slug);
  if (!post) return { title: 'Not Found' };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || '',
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      type: 'article',
      url,
      publishedTime: post.datePublished,
      modifiedTime: post.lastModified,
      images: post.featuredImage ? [{ url: post.featuredImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const store = readStore();
  const post = getPostBySlug(store, slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = getRelatedPosts(store, post, 3);
  const [firstHalf, secondHalf] = splitContentAtMidpoint(post.body);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.datePublished,
    dateModified: post.lastModified || post.datePublished,
    author: { '@type': 'Organization', name: 'Team Zeemaa', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Zeemaa', logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif', minHeight: '100vh' }}>
        <div className="post-crumbwrap">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
        </div>

        {post.featuredImage && (
          <div className="post-banner" style={{ backgroundImage: `url(${post.featuredImage})` }} />
        )}

        <article className="post-article">
          {post.pillarTag && <span className="postcard-tag static post-pillar">{post.pillarTag}</span>}
          <h1 className="post-title">{post.title}</h1>

          <div className="post-byline">
            <div className="post-byline-av"><i className="fas fa-users" /></div>
            <div className="post-byline-info">
              <div className="post-byline-name">Team Zeemaa {post.authorRoleTag && <span className="post-byline-role">{post.authorRoleTag}</span>}</div>
              <div className="post-byline-meta">
                <span>{fmtDate(post.datePublished)}</span>
                <span>&middot;</span>
                <span>{post.readTimeMinutes} min read</span>
                <span>&middot;</span>
                <span className="post-hashtag">#teamzeemaa</span>
              </div>
            </div>
          </div>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: firstHalf }} />
          {post.relatedServiceSlug && <ServiceCTACard slug={post.relatedServiceSlug} />}
          {secondHalf && <div className="post-body" dangerouslySetInnerHTML={{ __html: secondHalf }} />}

          <RelatedPosts posts={related} />

          <section className="post-bottom-cta">
            <h2>Talk to Team Zeemaa about your next event</h2>
            <p>Tell us what you are planning and we will scope the right platform and on-site setup for it.</p>
            <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
          </section>

          <ShareRow url={url} title={post.title} />
        </article>
      </main>
      <StickyShareBar url={url} title={post.title} />
      <Footer />
    </>
  );
}
