'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoIcon } from '../../components/Logo';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErr('');
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', payload: { username, password: pass } }),
    });
    const data = await res.json();
    if (data.ok) {
      router.push('/admin/dashboard');
    } else {
      setErr('Incorrect password.');
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight:'100vh', background:'#060D1F', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:380 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:40, justifyContent:'center' }}>
          <LogoIcon height={32} />
          <span style={{ color:'#fff', fontWeight:600, fontSize:18 }}>Admin</span>
        </div>
        <form onSubmit={handleLogin} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:32 }}>
          <h1 style={{ color:'#fff', fontSize:20, fontWeight:600, marginBottom:8 }}>Sign in</h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginBottom:24 }}>Zeemaa website admin console</p>
          <label style={{ color:'rgba(255,255,255,0.6)', fontSize:13, display:'block', marginBottom:6 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter admin username"
            required
            autoFocus
            style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:14, boxSizing:'border-box', marginBottom: 14 }}
          />
          <label style={{ color:'rgba(255,255,255,0.6)', fontSize:13, display:'block', marginBottom:6 }}>Password</label>
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Enter admin password"
            required
            style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:14, boxSizing:'border-box', marginBottom: err ? 8 : 20 }}
          />
          {err && <p style={{ color:'#ff6b6b', fontSize:13, marginBottom:16 }}>{err}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width:'100%', background:'#D4AF37', color:'#060D1F', border:'none', borderRadius:8, padding:'13px', fontWeight:700, fontSize:14, cursor:'pointer' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
