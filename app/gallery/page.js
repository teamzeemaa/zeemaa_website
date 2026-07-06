import { readStore } from '../../lib/store';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

export const metadata = {
  title: 'Gallery | Events We Have Powered | Zeemaa',
  description: 'Photos from conferences, exhibitions, and corporate events managed by Zeemaa across Saudi Arabia.',
};

export default function GalleryPage() {
  const store = readStore();
  const images = store.gallery?.filter(g => g.enabled) || [];

  return (
    <>
      <Nav store={store} />
      <main style={{ minHeight:'calc(100vh - 108px)', background:'transparent', color:'#fff', fontFamily:'Geist, sans-serif' }}>
        <PageHero
          eyebrow="Gallery"
          title="Events We Have Powered"
          ghost="GALLERY"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
          maxWidth={1280}
        />
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 48px 80px' }}>
          {images.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0', color:'rgba(255,255,255,0.2)' }}>
              <p style={{ fontSize:40, marginBottom:16 }}>🖼</p>
              <p style={{ fontSize:16 }}>No gallery images yet.</p>
              <p style={{ fontSize:13, marginTop:8 }}>Add images from the <a href="/admin" style={{color:'#D4AF37'}}>admin console</a></p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
              {images.map(img => (
                <div key={img.id} style={{ borderRadius:14, overflow:'hidden', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', transition:'all .3s' }}
                  onMouseOver={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.3)';e.currentTarget.style.transform='translateY(-4px)';}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.transform='translateY(0)';}}>
                  <img src={img.url} alt={img.alt || img.caption || 'Zeemaa event'} style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }} />
                  {img.caption && <p style={{ padding:'12px 16px', fontSize:13, color:'rgba(255,255,255,0.5)', margin:0, textAlign:'left' }}>{img.caption}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
