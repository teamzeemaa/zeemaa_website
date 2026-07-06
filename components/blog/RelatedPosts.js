import PostCard from './PostCard';

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="related-posts">
      <p className="sey">Keep Reading</p>
      <h2 className="st2" style={{ fontSize: 'clamp(22px,2.6vw,30px)' }}>Related Posts</h2>
      <div className="postgrid">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}
