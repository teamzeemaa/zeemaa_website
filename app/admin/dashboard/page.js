'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogoIcon } from '../../../components/Logo';

const S = {
  page: { minHeight:'100vh', background:'#060D1F', color:'#fff', fontFamily:'Geist, sans-serif' },
  header: { background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'0 32px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100 },
  main: { maxWidth:1200, margin:'0 auto', padding:'32px 24px' },
  card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:24, marginBottom:20 },
  row: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' },
  label: { fontSize:14, color:'rgba(255,255,255,0.7)' },
  sublabel: { fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:2 },
  toggle: (on) => ({ width:44, height:24, borderRadius:12, border:'none', cursor:'pointer', background:on?'#00D4B4':'rgba(255,255,255,0.12)', position:'relative', transition:'background 0.2s', flexShrink:0 }),
  dot: (on) => ({ position:'absolute', top:3, left:on?23:3, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }),
  btn: { background:'#D4AF37', color:'#060D1F', border:'none', borderRadius:8, padding:'8px 18px', fontWeight:700, fontSize:13, cursor:'pointer' },
  btnSm: { background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'6px 12px', fontSize:12, cursor:'pointer' },
  btnDanger: { background:'rgba(255,80,80,0.12)', color:'#ff6b6b', border:'1px solid rgba(255,80,80,0.2)', borderRadius:6, padding:'6px 12px', fontSize:12, cursor:'pointer' },
  input: { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'10px 12px', color:'#fff', fontSize:13, width:'100%', boxSizing:'border-box', marginBottom:8 },
  textarea: { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'10px 12px', color:'#fff', fontSize:13, width:'100%', boxSizing:'border-box', marginBottom:8, minHeight:80, resize:'vertical' },
  tabBar: { display:'flex', gap:4, marginBottom:28, flexWrap:'wrap' },
  tab: (a) => ({ padding:'8px 16px', fontSize:13, fontWeight:a?600:400, color:a?'#D4AF37':'rgba(255,255,255,0.4)', background:a?'rgba(212,175,55,0.08)':'none', border:a?'1px solid rgba(212,175,55,0.2)':'1px solid transparent', borderRadius:8, cursor:'pointer' }),
  tag: (c) => ({ display:'inline-block', fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:4, background:c+'20', color:c, marginLeft:8 }),
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 },
  dragItem: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:12, marginBottom:8, display:'flex', alignItems:'center', gap:10 },
};

function Toggle({ on, onChange }) {
  return (
    <button style={S.toggle(on)} onClick={() => onChange(!on)}>
      <span style={S.dot(on)} />
    </button>
  );
}

function SectionRow({ label, sublabel, enabled, onChange }) {
  return (
    <div style={S.row}>
      <div><div style={S.label}>{label}</div>{sublabel && <div style={S.sublabel}>{sublabel}</div>}</div>
      <Toggle on={enabled} onChange={onChange} />
    </div>
  );
}

function DragList({ items, onChange, renderItem, renderForm }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const onDragStart = i => setDragIdx(i);
  const onDragOver = (e,i) => { e.preventDefault(); setOverIdx(i); };
  const onDrop = i => {
    if (dragIdx===null||dragIdx===i){setDragIdx(null);setOverIdx(null);return;}
    const n=[...items];const[m]=n.splice(dragIdx,1);n.splice(i,0,m);onChange(n);setDragIdx(null);setOverIdx(null);
  };
  return (
    <div>
      {items.map((item,i)=>(
        <div key={item.id} draggable onDragStart={()=>onDragStart(i)} onDragOver={e=>onDragOver(e,i)} onDrop={()=>onDrop(i)}
          style={{...S.dragItem,opacity:dragIdx===i?0.4:1,borderColor:overIdx===i?'#D4AF37':'rgba(255,255,255,0.08)',cursor:'grab'}}>
          <i className="fas fa-grip-vertical" style={{color:'rgba(255,255,255,0.2)',fontSize:14,flexShrink:0}} />
          {renderItem(item,i)}
        </div>
      ))}
      {renderForm&&renderForm()}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [store, setStore] = useState(null);
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState('');
  const [tab, setTab] = useState('visibility');
  const [blogView, setBlogView] = useState('list');
  const emptyBlogForm = {
    title:'', titleAr:'', slug:'', pillarTag:'', excerpt:'',
    body:'', bodyAr:'', featuredImage:'', authorRoleTag:'',
    datePublished: new Date().toISOString().slice(0,10),
    readTimeMinutes: 5, relatedServiceSlug:'', relatedPostSlugsText:'',
    metaTitle:'', metaDescription:'', pinned:false, published:false,
  };
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [blogEditing, setBlogEditing] = useState(null);
  const [addTesti, setAddTesti] = useState({quote:'',author:'',role:'',company:''});
  const [addGallery, setAddGallery] = useState({url:'',caption:'',alt:''});
  const [addFaq, setAddFaq] = useState({q:'',a:''});
  const [addUser, setAddUser] = useState({username:'',passwordHash:'',name:''});
  const [newPwd, setNewPwd] = useState({n:'',c:''});
  const [pwdMsg, setPwdMsg] = useState('');
  const [subFilter, setSubFilter] = useState('all');

  useEffect(()=>{
    fetch('/api/admin').then(r=>r.json()).then(d=>{
      if(!d.ok){router.push('/admin');return;}
      setStore(d.store);setUser(d.user);
    });
  },[]);

  const save = useCallback(async(action,payload)=>{
    setSaving(true);
    const res=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,payload})});
    const data=await res.json();
    setSaving(false);
    if(data.ok){setSaved('Saved');setTimeout(()=>setSaved(''),2000);}
    return data;
  },[]);

  const reload = async()=>{const d=await fetch('/api/admin').then(r=>r.json());if(d.ok){setStore(d.store);}};

  const toggleSection = useCallback(async(key,value)=>{setStore(s=>({...s,sections:{...s.sections,[key]:value}}));await save('toggleSection',{key,value});},[save]);
  const togglePage = useCallback(async(key,value)=>{setStore(s=>({...s,pages:{...s.pages,[key]:value}}));await save('togglePage',{key,value});},[save]);
  const updateList = useCallback(async(key,items)=>{setStore(s=>({...s,[key]:items}));await save('setList',{key,items});},[save]);
  const updateSite = useCallback(async(site)=>{await save('updateSite',site);},[save]);

  const logout=async()=>{await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'logout'})});router.push('/admin');};

  const isMaster=user?.role==='master';
  const can=(mod,act)=>{if(!user)return false;if(user.role==='master')return true;return(user.modules?.[mod]||[]).includes(act);};

  if(!store||!user)return<div style={{...S.page,display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'rgba(255,255,255,0.4)'}}>Loading...</p></div>;

  const tabs=[
    can('visibility','toggle')&&{id:'visibility',label:'Visibility',icon:'fa-eye'},
    can('testimonials','view')&&{id:'testimonials',label:'Testimonials',icon:'fa-quote-left'},
    can('gallery','view')&&{id:'gallery',label:'Gallery',icon:'fa-images'},
    can('faq','view')&&{id:'faq',label:'FAQ',icon:'fa-circle-question'},
    can('blog','view')&&{id:'blog',label:'Blog',icon:'fa-newspaper'},
    can('submissions','view')&&{id:'submissions',label:'Submissions',icon:'fa-inbox'},
    can('logs','view')&&{id:'logs',label:'Activity Log',icon:'fa-list'},
    can('analytics','view')&&{id:'analytics',label:'Analytics',icon:'fa-chart-bar'},
    can('users','view')&&{id:'users',label:'Users',icon:'fa-users'},
    can('settings','view')&&{id:'settings',label:'Settings',icon:'fa-gear'},
  ].filter(Boolean);

  const submissions=store.submissions||[];
  const filteredSubs=subFilter==='all'?submissions:submissions.filter(s=>s.type===subFilter);
  const logs=store.logs||[];
  const typeColors={auth:'#D4AF37',content:'#00D4B4',form:'#60a5fa',settings:'#a78bfa',blog:'#fb923c',users:'#f472b6'};
  const allMods=['content','gallery','testimonials','faq','social','submissions','logs','analytics','settings','visibility','users','blog','demo'];

  return(
    <div style={S.page}>
      <header style={S.header}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <LogoIcon height={26}/>
          <span style={{fontWeight:600,fontSize:15}}>Admin Console</span>
          <span style={{fontSize:11,color:'rgba(255,255,255,0.3)',background:'rgba(255,255,255,0.06)',padding:'2px 8px',borderRadius:4}}>{user.name||user.username}</span>
          {saving&&<span style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>Saving...</span>}
          {saved&&<span style={{fontSize:12,color:'#00D4B4'}}>{saved} checkmark</span>}
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <a href="/" target="_blank" style={{fontSize:13,color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>View Site</a>
          <button onClick={logout} style={S.btnSm}>Sign Out</button>
        </div>
      </header>
      <main style={S.main}>
        <div style={S.tabBar}>
          {tabs.map(t=><button key={t.id} style={S.tab(tab===t.id)} onClick={()=>setTab(t.id)}><i className={"fas "+t.icon} style={{marginRight:6,fontSize:12}}/>{t.label}</button>)}
        </div>

        {tab==='visibility'&&(<>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Homepage sections</div>
            <SectionRow label="Announcement bar" sublabel="Top banner with custom message" enabled={store.sections?.announcement||false} onChange={v=>toggleSection('announcement',v)}/>
            <SectionRow label="Stats bar" enabled={store.sections?.stats||false} onChange={v=>toggleSection('stats',v)}/>
            <SectionRow label="Testimonials" sublabel="Only enable when you have real quotes" enabled={store.sections?.testimonials||false} onChange={v=>toggleSection('testimonials',v)}/>
            <SectionRow label="Case studies" enabled={store.sections?.caseStudies||false} onChange={v=>toggleSection('caseStudies',v)}/>
            <SectionRow label="Gallery preview" enabled={store.sections?.gallery||false} onChange={v=>toggleSection('gallery',v)}/>
            <SectionRow label="Client logos" enabled={store.sections?.clientLogos||false} onChange={v=>toggleSection('clientLogos',v)}/>
            <SectionRow label="Partners and integrations" enabled={store.sections?.partners||false} onChange={v=>toggleSection('partners',v)}/>
            <SectionRow label="Locations" enabled={store.sections?.locations||false} onChange={v=>toggleSection('locations',v)}/>
            <SectionRow label="FAQ" enabled={store.sections?.faq||false} onChange={v=>toggleSection('faq',v)}/>
            <SectionRow label="Resources" enabled={store.sections?.resources||false} onChange={v=>toggleSection('resources',v)}/>
            <SectionRow label="StampIQ comparison strip" sublabel="Enable once comparison page is live" enabled={store.sections?.compare||false} onChange={v=>toggleSection('compare',v)}/>
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Navigation pages</div>
            <SectionRow label="Gallery page (/gallery)" enabled={store.pages?.gallery||false} onChange={v=>togglePage('gallery',v)}/>
            <SectionRow label="Case studies (/case-studies)" enabled={store.pages?.caseStudies||false} onChange={v=>togglePage('caseStudies',v)}/>
            <SectionRow label="Blog (/blog)" enabled={store.pages?.blog||false} onChange={v=>togglePage('blog',v)}/>
            <SectionRow label="Compare (/compare)" enabled={store.pages?.compare||false} onChange={v=>togglePage('compare',v)}/>
          </div>
        </>)}

        {tab==='testimonials'&&(
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Testimonials<span style={S.tag('#00D4B4')}>{(store.testimonials||[]).filter(t=>t.enabled).length} active</span></div>
            {(store.testimonials||[]).length===0&&<p style={{color:'rgba(255,255,255,0.3)',fontSize:13,marginBottom:16}}>No testimonials yet. Only add real verified quotes.</p>}
            <DragList items={store.testimonials||[]} onChange={v=>updateList('testimonials',v)}
              renderItem={(t,i)=>(
                <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                  <div style={{flex:1}}>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.7)',fontStyle:'italic',marginBottom:4}}>"{t.quote.slice(0,80)}{t.quote.length>80?'...':''}"</p>
                    <span style={{fontSize:12,color:'#D4AF37'}}>{t.author}</span>
                    {t.role&&<span style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}> · {t.role}</span>}
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <Toggle on={t.enabled} onChange={v=>{const n=[...store.testimonials];n[i]={...t,enabled:v};updateList('testimonials',n);}}/>
                    {can('testimonials','delete')&&<button style={S.btnDanger} onClick={()=>updateList('testimonials',(store.testimonials||[]).filter((_,j)=>j!==i))}>Remove</button>}
                  </div>
                </div>
              )}
            />
            {can('testimonials','add')&&(
              <div style={{marginTop:16,background:'rgba(255,255,255,0.03)',borderRadius:8,padding:16}}>
                <p style={{fontSize:13,fontWeight:600,marginBottom:12,color:'rgba(255,255,255,0.6)'}}>Add testimonial</p>
                <textarea style={S.textarea} placeholder="Quote *" value={addTesti.quote} onChange={e=>setAddTesti(f=>({...f,quote:e.target.value}))}/>
                <div style={S.grid2}>
                  <input style={S.input} placeholder="Name *" value={addTesti.author} onChange={e=>setAddTesti(f=>({...f,author:e.target.value}))}/>
                  <input style={S.input} placeholder="Role" value={addTesti.role} onChange={e=>setAddTesti(f=>({...f,role:e.target.value}))}/>
                </div>
                <input style={S.input} placeholder="Company" value={addTesti.company} onChange={e=>setAddTesti(f=>({...f,company:e.target.value}))}/>
                <button style={S.btn} onClick={()=>{if(!addTesti.quote||!addTesti.author)return;updateList('testimonials',[...(store.testimonials||[]),{id:Date.now().toString(),...addTesti,enabled:true}]);setAddTesti({quote:'',author:'',role:'',company:''});}}>Add Testimonial</button>
              </div>
            )}
          </div>
        )}

        {tab==='gallery'&&(
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Gallery<span style={S.tag('#D4AF37')}>{(store.gallery||[]).filter(g=>g.enabled).length} active</span></div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:12,marginBottom:16}}>
              {(store.gallery||[]).map((g,i)=>(
                <div key={g.id} style={{background:'rgba(255,255,255,0.04)',borderRadius:8,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{width:'100%',height:90,background:'#0d1b2e',backgroundImage:`url(${g.url})`,backgroundSize:'cover',backgroundPosition:'center'}}/>
                  <div style={{padding:'8px 10px'}}>
                    <p style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginBottom:6,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{g.caption||'No caption'}</p>
                    <div style={{display:'flex',gap:6}}>
                      <Toggle on={g.enabled} onChange={v=>{const n=[...store.gallery];n[i]={...g,enabled:v};updateList('gallery',n);}}/>
                      {can('gallery','delete')&&<button style={S.btnDanger} onClick={()=>updateList('gallery',(store.gallery||[]).filter((_,j)=>j!==i))}>X</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {can('gallery','add')&&(
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:8,padding:16}}>
                <p style={{fontSize:13,fontWeight:600,marginBottom:12,color:'rgba(255,255,255,0.6)'}}>Add image</p>
                <input style={S.input} placeholder="Image URL *" value={addGallery.url} onChange={e=>setAddGallery(f=>({...f,url:e.target.value}))}/>
                <input style={S.input} placeholder="Caption" value={addGallery.caption} onChange={e=>setAddGallery(f=>({...f,caption:e.target.value}))}/>
                <input style={S.input} placeholder="Alt text (for SEO)" value={addGallery.alt} onChange={e=>setAddGallery(f=>({...f,alt:e.target.value}))}/>
                <button style={S.btn} onClick={()=>{if(!addGallery.url)return;updateList('gallery',[...(store.gallery||[]),{id:Date.now().toString(),...addGallery,enabled:true}]);setAddGallery({url:'',caption:'',alt:''});}}>Add Image</button>
              </div>
            )}
          </div>
        )}

        {tab==='faq'&&(
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>FAQ<span style={S.tag('#a78bfa')}>{(store.faq||[]).filter(f=>f.enabled).length} active</span></div>
            <DragList items={store.faq||[]} onChange={v=>updateList('faq',v)}
              renderItem={(f,i)=>(
                <div style={{flex:1,display:'flex',justifyContent:'space-between',gap:12}}>
                  <div style={{flex:1}}>
                    <p style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.8)',marginBottom:4}}>{f.q}</p>
                    <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',lineHeight:1.5}}>{f.a.slice(0,100)}{f.a.length>100?'...':''}</p>
                  </div>
                  <div style={{display:'flex',gap:8,flexShrink:0}}>
                    <Toggle on={f.enabled} onChange={v=>{const n=[...store.faq];n[i]={...f,enabled:v};updateList('faq',n);}}/>
                    {can('faq','delete')&&<button style={S.btnDanger} onClick={()=>updateList('faq',(store.faq||[]).filter((_,j)=>j!==i))}>Remove</button>}
                  </div>
                </div>
              )}
            />
            {can('faq','add')&&(
              <div style={{marginTop:16,background:'rgba(255,255,255,0.03)',borderRadius:8,padding:16}}>
                <p style={{fontSize:13,fontWeight:600,marginBottom:12,color:'rgba(255,255,255,0.6)'}}>Add FAQ</p>
                <input style={S.input} placeholder="Question *" value={addFaq.q} onChange={e=>setAddFaq(f=>({...f,q:e.target.value}))}/>
                <textarea style={S.textarea} placeholder="Answer *" value={addFaq.a} onChange={e=>setAddFaq(f=>({...f,a:e.target.value}))}/>
                <button style={S.btn} onClick={()=>{if(!addFaq.q||!addFaq.a)return;updateList('faq',[...(store.faq||[]),{id:Date.now().toString(),...addFaq,enabled:true}]);setAddFaq({q:'',a:''});}}>Add Question</button>
              </div>
            )}
          </div>
        )}

        {tab==='blog'&&(
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Blog<span style={S.tag('#fb923c')}>{(store.blog||[]).filter(p=>p.published).length} published</span></div>
            {blogView==='list'&&(<>
              {can('blog','add')&&<button style={{...S.btn,marginBottom:16}} onClick={()=>{setBlogForm(emptyBlogForm);setBlogEditing(null);setBlogView('new');}}>+ New Post</button>}
              {(store.blog||[]).length===0&&<p style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>No blog posts yet.</p>}
              {(store.blog||[]).map(post=>(
                <div key={post.id} style={{...S.dragItem,flexDirection:'column',alignItems:'flex-start',cursor:'default'}}>
                  <div style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
                    <div>
                      <p style={{fontSize:14,fontWeight:600,marginBottom:4}}>{post.title}{post.pinned&&<span style={S.tag('#D4AF37')}>Pinned</span>}</p>
                      <p style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>/{post.slug} · {post.pillarTag||'Untagged'} · {post.datePublished}</p>
                    </div>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <span style={{fontSize:11,padding:'2px 8px',borderRadius:4,background:post.published?'rgba(0,212,180,0.1)':'rgba(255,255,255,0.06)',color:post.published?'#00D4B4':'rgba(255,255,255,0.4)'}}>{post.published?'Published':'Draft'}</span>
                      {can('blog','edit')&&<button style={S.btnSm} onClick={()=>{setBlogEditing(post);setBlogForm({
                        title:post.title||'', titleAr:post.titleAr||'', slug:post.slug||'', pillarTag:post.pillarTag||'',
                        excerpt:post.excerpt||'', body:post.body||'', bodyAr:post.bodyAr||'', featuredImage:post.featuredImage||'',
                        authorRoleTag:post.authorRoleTag||'', datePublished:post.datePublished||new Date().toISOString().slice(0,10),
                        readTimeMinutes:post.readTimeMinutes||5, relatedServiceSlug:post.relatedServiceSlug||'',
                        relatedPostSlugsText:(post.relatedPostSlugs||[]).join(', '),
                        metaTitle:post.metaTitle||'', metaDescription:post.metaDescription||'',
                        pinned:post.pinned||false, published:post.published||false,
                      });setBlogView('edit');}}>Edit</button>}
                      {can('blog','delete')&&<button style={S.btnDanger} onClick={async()=>{await save('deleteBlogPost',{id:post.id});await reload();}}>Delete</button>}
                    </div>
                  </div>
                </div>
              ))}
            </>)}
            {(blogView==='new'||blogView==='edit')&&(
              <div>
                <button style={{...S.btnSm,marginBottom:16}} onClick={()=>setBlogView('list')}>Back to posts</button>
                <input style={S.input} placeholder="Title *" value={blogForm.title} onChange={e=>{const t=e.target.value;setBlogForm(f=>({...f,title:t,...(blogView==='new'?{slug:t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}:{})}));}}/>
                <input style={S.input} placeholder="Title (Arabic)" value={blogForm.titleAr} onChange={e=>setBlogForm(f=>({...f,titleAr:e.target.value}))}/>
                <input style={S.input} placeholder="Slug *" value={blogForm.slug} onChange={e=>setBlogForm(f=>({...f,slug:e.target.value}))}/>
                <input style={S.input} placeholder="Pillar tag (e.g. Registration, Ticketing)" value={blogForm.pillarTag} onChange={e=>setBlogForm(f=>({...f,pillarTag:e.target.value}))}/>
                <textarea style={S.textarea} placeholder="Excerpt (card teaser)" value={blogForm.excerpt} onChange={e=>setBlogForm(f=>({...f,excerpt:e.target.value}))}/>
                <textarea style={{...S.textarea,minHeight:200}} placeholder="Body (HTML)" value={blogForm.body} onChange={e=>setBlogForm(f=>({...f,body:e.target.value}))}/>
                <textarea style={{...S.textarea,minHeight:120}} placeholder="Body (Arabic, HTML)" value={blogForm.bodyAr} onChange={e=>setBlogForm(f=>({...f,bodyAr:e.target.value}))}/>
                <input style={S.input} placeholder="Featured image URL" value={blogForm.featuredImage} onChange={e=>setBlogForm(f=>({...f,featuredImage:e.target.value}))}/>
                <div style={S.grid2}>
                  <input style={S.input} placeholder="Author role tag (e.g. Product Team)" value={blogForm.authorRoleTag} onChange={e=>setBlogForm(f=>({...f,authorRoleTag:e.target.value}))}/>
                  <div>
                    <label style={{fontSize:11,color:'rgba(255,255,255,0.4)',display:'block',marginBottom:4}}>Date published (editable, supports backdating)</label>
                    <input style={S.input} type="date" value={blogForm.datePublished} onChange={e=>setBlogForm(f=>({...f,datePublished:e.target.value}))}/>
                  </div>
                </div>
                <div style={S.grid2}>
                  <div>
                    <label style={{fontSize:11,color:'rgba(255,255,255,0.4)',display:'block',marginBottom:4}}>Read time (minutes)</label>
                    <input style={S.input} type="number" min="1" value={blogForm.readTimeMinutes} onChange={e=>setBlogForm(f=>({...f,readTimeMinutes:parseInt(e.target.value)||1}))}/>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:'rgba(255,255,255,0.4)',display:'block',marginBottom:4}}>Related service CTA</label>
                    <select style={S.input} value={blogForm.relatedServiceSlug} onChange={e=>setBlogForm(f=>({...f,relatedServiceSlug:e.target.value}))}>
                      <option value="">None</option>
                      <option value="registration">Registration & Check-in</option>
                      <option value="accreditation">Accreditation & Access Control</option>
                      <option value="ticketing">Ticketing</option>
                      <option value="onsite-comms">On-Site Communication & CCTV</option>
                    </select>
                  </div>
                </div>
                <input style={S.input} placeholder="Related post slugs, comma-separated (max 3, optional)" value={blogForm.relatedPostSlugsText} onChange={e=>setBlogForm(f=>({...f,relatedPostSlugsText:e.target.value}))}/>
                <input style={S.input} placeholder="Meta title (SEO)" value={blogForm.metaTitle} onChange={e=>setBlogForm(f=>({...f,metaTitle:e.target.value}))}/>
                <input style={S.input} placeholder="Meta description (SEO)" value={blogForm.metaDescription} onChange={e=>setBlogForm(f=>({...f,metaDescription:e.target.value}))}/>
                <div style={{display:'flex',alignItems:'center',gap:24,marginBottom:16,flexWrap:'wrap'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <Toggle on={blogForm.published} onChange={v=>setBlogForm(f=>({...f,published:v}))}/>
                    <span style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>{blogForm.published?'Published':'Draft'}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <Toggle on={blogForm.pinned} onChange={v=>setBlogForm(f=>({...f,pinned:v}))}/>
                    <span style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>Featured / pinned post</span>
                  </div>
                </div>
                <button style={S.btn} onClick={async()=>{
                  const { relatedPostSlugsText, ...rest } = blogForm;
                  const payload = { ...rest, relatedPostSlugs: relatedPostSlugsText.split(',').map(s=>s.trim()).filter(Boolean).slice(0,3) };
                  if(blogView==='new'){await save('addBlogPost',payload);}
                  else{await save('updateBlogPost',{id:blogEditing.id,...payload});}
                  await reload();setBlogView('list');
                }}>{blogView==='new'?'Publish Post':'Save Changes'}</button>
              </div>
            )}
          </div>
        )}

        {tab==='submissions'&&(
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Form Submissions<span style={S.tag('#60a5fa')}>{submissions.length} total</span></div>
            <div style={{display:'flex',gap:8,marginBottom:16,justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',gap:8}}>
                {['all','contact','demo'].map(f=><button key={f} style={S.tab(subFilter===f)} onClick={()=>setSubFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
              </div>
              {isMaster&&submissions.length>0&&<button style={S.btnDanger} onClick={async()=>{await save('clearSubmissions',{});setStore(s=>({...s,submissions:[]}));}}>Clear All</button>}
            </div>
            {filteredSubs.length===0&&<p style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>No submissions yet.</p>}
            {filteredSubs.map(s=>(
              <div key={s.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:8,padding:16,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <span style={{fontSize:11,padding:'2px 8px',borderRadius:4,background:s.type==='demo'?'rgba(212,175,55,0.1)':'rgba(0,212,180,0.1)',color:s.type==='demo'?'#D4AF37':'#00D4B4',fontWeight:600,textTransform:'uppercase'}}>{s.type}</span>
                    <span style={{fontSize:13,fontWeight:600}}>{s.fullName}</span>
                  </div>
                  <span style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>{new Date(s.ts).toLocaleString()}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontSize:13}}>
                  <div><span style={{color:'rgba(255,255,255,0.4)'}}>Email: </span>{s.email}</div>
                  <div><span style={{color:'rgba(255,255,255,0.4)'}}>Phone: </span>{s.phone}</div>
                  {s.company&&<div><span style={{color:'rgba(255,255,255,0.4)'}}>Company: </span>{s.company}</div>}
                  {s.eventType&&<div><span style={{color:'rgba(255,255,255,0.4)'}}>Event type: </span>{s.eventType}</div>}
                  {s.gclid&&<div><span style={{color:'rgba(255,255,255,0.4)'}}>GCLID: </span><span style={{fontSize:11,color:'#00D4B4'}}>{s.gclid.slice(0,20)}...</span></div>}
                  {s.utm_campaign&&<div><span style={{color:'rgba(255,255,255,0.4)'}}>Campaign: </span>{s.utm_campaign}</div>}
                </div>
                {s.message&&<p style={{fontSize:13,color:'rgba(255,255,255,0.5)',marginTop:8,borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:8}}>{s.message}</p>}
              </div>
            ))}
          </div>
        )}

        {tab==='logs'&&(
          <div style={S.card}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontSize:15,fontWeight:600}}>Activity Log<span style={S.tag('#888')}>{logs.length} entries</span></div>
              {isMaster&&logs.length>0&&<button style={S.btnDanger} onClick={async()=>{await save('clearLogs',{});setStore(s=>({...s,logs:[]}));}}>Clear Log</button>}
            </div>
            {logs.length===0&&<p style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>No activity yet.</p>}
            <div style={{fontFamily:'monospace',fontSize:12}}>
              {logs.map(log=>(
                <div key={log.id} style={{display:'flex',gap:12,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',alignItems:'flex-start'}}>
                  <span style={{color:'rgba(255,255,255,0.25)',flexShrink:0,minWidth:140}}>{new Date(log.ts).toLocaleString()}</span>
                  <span style={{flexShrink:0,minWidth:70,padding:'1px 6px',borderRadius:3,background:(typeColors[log.type]||'#888')+'20',color:typeColors[log.type]||'#888',fontSize:10,fontWeight:700,textTransform:'uppercase'}}>{log.type}</span>
                  <span style={{color:'rgba(255,255,255,0.6)'}}>{log.event}{log.detail?' · '+log.detail:''}</span>
                  {log.username&&<span style={{color:'rgba(255,255,255,0.3)',marginLeft:'auto',flexShrink:0}}>by {log.username}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='analytics'&&(
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Analytics Shortcuts</div>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:20}}>One-click access to all analytics platforms.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {[
                {label:'Google Analytics 4',icon:'fas fa-chart-line',url:'https://analytics.google.com',desc:'Pageviews, sessions, traffic sources',color:'#60a5fa'},
                {label:'Google Ads',icon:'fas fa-bullhorn',url:'https://ads.google.com',desc:'Campaigns, conversions, cost per lead',color:'#D4AF37'},
                {label:'Google Search Console',icon:'fas fa-search',url:'https://search.google.com/search-console',desc:'Search rankings, impressions, index coverage',color:'#00D4B4'},
                {label:'Vercel Analytics',icon:'fas fa-server',url:'https://vercel.com/analytics',desc:'Performance, Core Web Vitals, deployments',color:'#a78bfa'},
              ].map(l=>(
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,padding:20,textDecoration:'none',display:'block'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <div style={{width:36,height:36,borderRadius:8,background:l.color+'15',display:'flex',alignItems:'center',justifyContent:'center'}}><i className={l.icon} style={{color:l.color,fontSize:14}}/></div>
                    <span style={{fontSize:14,fontWeight:600,color:'#fff'}}>{l.label}</span>
                  </div>
                  <p style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>{l.desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {tab==='users'&&(
          <div>
            {(store.users||[]).map(u=>(
              <div key={u.id} style={S.card}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:u.role!=='master'&&isMaster?16:0}}>
                  <div>
                    <span style={{fontSize:14,fontWeight:700}}>{u.name||u.username}</span>
                    <span style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginLeft:8}}>@{u.username}</span>
                    <span style={{...S.tag(u.role==='master'?'#D4AF37':'#00D4B4')}}>{u.role}</span>
                  </div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <Toggle on={u.enabled} onChange={v=>save('updateUser',{id:u.id,enabled:v})}/>
                    {isMaster&&u.role!=='master'&&<button style={S.btnDanger} onClick={async()=>{if(!confirm('Delete user?'))return;await save('deleteUser',{id:u.id});await reload();}}>Delete</button>}
                  </div>
                </div>
                {u.role!=='master'&&isMaster&&(
                  <div>
                    <p style={{fontSize:11,color:'rgba(255,255,255,0.3)',marginBottom:8,textTransform:'uppercase',letterSpacing:'.08em'}}>Module permissions</p>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:8}}>
                      {allMods.map(mod=>(
                        <div key={mod} style={{background:'rgba(255,255,255,0.03)',borderRadius:6,padding:'8px 12px'}}>
                          <p style={{fontSize:12,fontWeight:600,marginBottom:6,textTransform:'capitalize'}}>{mod}</p>
                          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                            {(mod==='visibility'?['toggle']:['view','add','edit','delete','reorder']).map(act=>{
                              const has=(u.modules?.[mod]||[]).includes(act);
                              return(
                                <button key={act} onClick={async()=>{
                                  const cur=u.modules?.[mod]||[];
                                  const upd=has?cur.filter(a=>a!==act):[...cur,act];
                                  await save('updateUser',{id:u.id,modules:{...u.modules,[mod]:upd}});
                                  await reload();
                                }} style={{fontSize:10,padding:'2px 8px',borderRadius:4,border:'none',cursor:'pointer',background:has?'rgba(212,175,55,0.15)':'rgba(255,255,255,0.06)',color:has?'#D4AF37':'rgba(255,255,255,0.3)',fontWeight:has?700:400}}>{act}</button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isMaster&&(
              <div style={S.card}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Add new user</div>
                <div style={S.grid2}>
                  <input style={S.input} placeholder="Username *" value={addUser.username} onChange={e=>setAddUser(f=>({...f,username:e.target.value}))}/>
                  <input style={S.input} placeholder="Password *" type="password" value={addUser.passwordHash} onChange={e=>setAddUser(f=>({...f,passwordHash:e.target.value}))}/>
                </div>
                <input style={S.input} placeholder="Display name" value={addUser.name} onChange={e=>setAddUser(f=>({...f,name:e.target.value}))}/>
                <button style={S.btn} onClick={async()=>{if(!addUser.username||!addUser.passwordHash)return;await save('addUser',{...addUser,role:'user',enabled:true,modules:{}});setAddUser({username:'',passwordHash:'',name:''});await reload();}}>Create User</button>
              </div>
            )}
          </div>
        )}

        {tab==='settings'&&isMaster&&(<>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Demo button</div>
            <div style={{display:'flex',gap:10,marginBottom:16}}>
              {['form','watch'].map(m=>(
                <button key={m} onClick={()=>{const u={...store.site,demoMode:m};setStore(s=>({...s,site:u}));save('updateSite',u);}} style={{...S.btnSm,borderColor:store.site?.demoMode===m?'#D4AF37':undefined,color:store.site?.demoMode===m?'#D4AF37':undefined}}>{m==='form'?'Book a Demo (form)':'Watch Demo (link)'}</button>
              ))}
            </div>
            {store.site?.demoMode==='watch'&&<input style={S.input} placeholder="Demo link URL" value={store.site?.demoLink||''} onChange={e=>setStore(s=>({...s,site:{...s.site,demoLink:e.target.value}}))} onBlur={()=>save('updateSite',store.site)}/>}
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Contact details</div>
            {[{key:'phone',label:'Phone'},{key:'whatsapp',label:'WhatsApp (digits only)'},{key:'email',label:'Email'}].map(({key,label})=>(
              <div key={key} style={{marginBottom:14}}>
                <label style={{fontSize:12,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>{label}</label>
                <input style={S.input} value={store.site?.[key]||''} onChange={e=>setStore(s=>({...s,site:{...s.site,[key]:e.target.value}}))} onBlur={()=>save('updateSite',store.site)}/>
              </div>
            ))}
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Social media links</div>
            {[{key:'linkedinUrl',label:'LinkedIn'},{key:'instagramUrl',label:'Instagram'},{key:'facebookUrl',label:'Facebook'},{key:'youtubeUrl',label:'YouTube'},{key:'xUrl',label:'X (Twitter)'}].map(({key,label})=>(
              <div key={key} style={{marginBottom:14}}>
                <label style={{fontSize:12,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>{label}</label>
                <input style={S.input} placeholder="https://..." value={store.site?.[key]||''} onChange={e=>setStore(s=>({...s,site:{...s.site,[key]:e.target.value}}))} onBlur={()=>save('updateSite',store.site)}/>
              </div>
            ))}
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Announcement bar</div>
            <input style={S.input} placeholder="Announcement text" value={store.site?.announcementText||''} onChange={e=>setStore(s=>({...s,site:{...s.site,announcementText:e.target.value}}))} onBlur={()=>save('updateSite',store.site)}/>
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Business hours indicator</div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <Toggle on={store.site?.businessHoursEnabled||false} onChange={v=>{const u={...store.site,businessHoursEnabled:v};setStore(s=>({...s,site:u}));save('updateSite',u);}}/>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>Show Online indicator in topbar</span>
            </div>
            <div style={S.grid2}>
              <div><label style={{fontSize:12,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>Start hour (24h)</label><input style={S.input} type="number" min="0" max="23" value={store.site?.businessHoursStart||9} onChange={e=>setStore(s=>({...s,site:{...s.site,businessHoursStart:parseInt(e.target.value)}}))} onBlur={()=>save('updateSite',store.site)}/></div>
              <div><label style={{fontSize:12,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>End hour (24h)</label><input style={S.input} type="number" min="0" max="23" value={store.site?.businessHoursEnd||18} onChange={e=>setStore(s=>({...s,site:{...s.site,businessHoursEnd:parseInt(e.target.value)}}))} onBlur={()=>save('updateSite',store.site)}/></div>
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Change my password</div>
            <input style={S.input} type="password" placeholder="New password" value={newPwd.n} onChange={e=>setNewPwd(f=>({...f,n:e.target.value}))}/>
            <input style={S.input} type="password" placeholder="Confirm new password" value={newPwd.c} onChange={e=>setNewPwd(f=>({...f,c:e.target.value}))}/>
            {pwdMsg&&<p style={{fontSize:13,color:pwdMsg.includes('updated')?'#00D4B4':'#ff6b6b',marginBottom:8}}>{pwdMsg}</p>}
            <button style={S.btn} onClick={async()=>{
              if(!newPwd.n||newPwd.n!==newPwd.c){setPwdMsg('Passwords do not match');return;}
              const d=await fetch('/api/admin').then(r=>r.json());
              const me=d.store?.users?.find(u=>u.username===user.username);
              if(!me)return;
              await save('updateUser',{id:me.id,passwordHash:newPwd.n});
              setPwdMsg('Password updated. Signing out...');
              setTimeout(()=>{fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'logout'})});window.location.href='/admin';},2000);
            }}>Update Password</button>
          </div>
        </>)}
      </main>
    </div>
  );
}
