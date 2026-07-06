function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function PostCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="postcard">
      <div className="postcard-img" style={{ backgroundImage: `url(${post.featuredImage})` }}>
        {post.pillarTag && <span className="postcard-tag">{post.pillarTag}</span>}
      </div>
      <div className="postcard-body">
        <h2 className="postcard-title">{post.title}</h2>
        <p className="postcard-excerpt">{post.excerpt}</p>
        <div className="postcard-meta">
          <span><i className="fas fa-clock" /> {post.readTimeMinutes} min read</span>
          <span>{fmtDate(post.datePublished)}</span>
        </div>
      </div>
    </a>
  );
}
