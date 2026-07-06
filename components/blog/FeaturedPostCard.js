function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function FeaturedPostCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="postcard-featured">
      <div className="postcard-featured-img" style={{ backgroundImage: `url(${post.featuredImage})` }}>
        <span className="postcard-featured-pin"><i className="fas fa-thumbtack" /> Featured</span>
      </div>
      <div className="postcard-featured-body">
        {post.pillarTag && <span className="postcard-tag static">{post.pillarTag}</span>}
        <h2 className="postcard-featured-title">{post.title}</h2>
        <p className="postcard-featured-excerpt">{post.excerpt}</p>
        <div className="postcard-meta">
          <span><i className="fas fa-clock" /> {post.readTimeMinutes} min read</span>
          <span>{fmtDate(post.datePublished)}</span>
        </div>
      </div>
    </a>
  );
}
