import { NextResponse } from 'next/server';
import { readStore, updateStore, addLog, verifyUser } from '../../../lib/store';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'zeemaa-session-secret-2025';
const COOKIE_NAME = 'zm_admin';

function makeToken(username, passwordHash) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(`${username}:${passwordHash}`).digest('hex');
}

async function getAuthedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const store = await readStore();
  const users = store.users || [];
  for (const user of users) {
    if (makeToken(user.username, user.passwordHash) === token && user.enabled) {
      return user;
    }
  }
  return null;
}

export async function POST(request) {
  const body = await request.json();
  const { action, payload } = body;

  if (action === 'login') {
    const { username, password } = payload;
    const user = await verifyUser(username, password);
    if (user) {
      const token = makeToken(user.username, user.passwordHash);
      await addLog({ type: 'auth', event: 'login', username: user.username, ip: request.headers.get('x-forwarded-for') || 'unknown' });
      const response = NextResponse.json({ ok: true, user: { username: user.username, name: user.name, role: user.role, modules: user.modules } });
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8,
        path: '/',
      });
      return response;
    }
    return NextResponse.json({ ok: false, error: 'Incorrect username or password' }, { status: 401 });
  }

  if (action === 'logout') {
    const user = await getAuthedUser();
    if (user) await addLog({ type: 'auth', event: 'logout', username: user.username });
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const authedUser = await getAuthedUser();
  if (!authedUser) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  if (action === 'toggleSection') {
    const { key, value } = payload;
    const updated = await updateStore(s => { s.sections[key] = value; return s; });
    await addLog({ type: 'content', event: `section_${value ? 'enabled' : 'disabled'}`, detail: key, username: authedUser.username });
    return NextResponse.json({ ok: true, sections: updated.sections });
  }

  if (action === 'togglePage') {
    const { key, value } = payload;
    const updated = await updateStore(s => { s.pages[key] = value; return s; });
    await addLog({ type: 'content', event: `page_${value ? 'enabled' : 'disabled'}`, detail: key, username: authedUser.username });
    return NextResponse.json({ ok: true, pages: updated.pages });
  }

  if (action === 'setList') {
    const { key, items } = payload;
    const allowed = ['testimonials','gallery','caseStudies','faq','stats','locations','partners','resources','clientLogos','blog'];
    if (!allowed.includes(key)) return NextResponse.json({ ok: false, error: 'Invalid key' }, { status: 400 });
    const updated = await updateStore(s => { s[key] = items; return s; });
    await addLog({ type: 'content', event: 'list_updated', detail: key, username: authedUser.username });
    return NextResponse.json({ ok: true, data: updated[key] });
  }

  if (action === 'updateSite') {
    const updated = await updateStore(s => { s.site = { ...s.site, ...payload }; return s; });
    await addLog({ type: 'settings', event: 'site_updated', username: authedUser.username });
    return NextResponse.json({ ok: true, site: updated.site });
  }

  if (action === 'addBlogPost') {
    const now = new Date().toISOString();
    const post = { id: Date.now().toString(), datePublished: now.slice(0, 10), ...payload, createdAt: now, lastModified: now };
    const updated = await updateStore(s => { s.blog = [post, ...(s.blog || [])]; return s; });
    await addLog({ type: 'blog', event: 'post_created', detail: post.title, username: authedUser.username });
    return NextResponse.json({ ok: true, post });
  }

  if (action === 'updateBlogPost') {
    const { id, ...fields } = payload;
    await updateStore(s => {
      s.blog = (s.blog || []).map(p => p.id === id ? { ...p, ...fields, lastModified: new Date().toISOString() } : p);
      return s;
    });
    await addLog({ type: 'blog', event: 'post_updated', detail: id, username: authedUser.username });
    return NextResponse.json({ ok: true });
  }

  if (action === 'deleteBlogPost') {
    const { id } = payload;
    await updateStore(s => { s.blog = (s.blog || []).filter(p => p.id !== id); return s; });
    await addLog({ type: 'blog', event: 'post_deleted', detail: id, username: authedUser.username });
    return NextResponse.json({ ok: true });
  }

  if (action === 'updateUser') {
    if (authedUser.role !== 'master') return NextResponse.json({ ok: false, error: 'Not authorized' }, { status: 403 });
    const { id, ...fields } = payload;
    await updateStore(s => {
      s.users = s.users.map(u => u.id === id ? { ...u, ...fields } : u);
      return s;
    });
    await addLog({ type: 'users', event: 'user_updated', detail: id, username: authedUser.username });
    return NextResponse.json({ ok: true });
  }

  if (action === 'addUser') {
    if (authedUser.role !== 'master') return NextResponse.json({ ok: false, error: 'Not authorized' }, { status: 403 });
    const newUser = { id: Date.now().toString(), role: 'user', enabled: true, modules: {}, ...payload };
    await updateStore(s => { s.users = [...(s.users || []), newUser]; return s; });
    await addLog({ type: 'users', event: 'user_created', detail: newUser.username, username: authedUser.username });
    return NextResponse.json({ ok: true, user: newUser });
  }

  if (action === 'deleteUser') {
    if (authedUser.role !== 'master') return NextResponse.json({ ok: false, error: 'Not authorized' }, { status: 403 });
    const { id } = payload;
    const store = await readStore();
    const target = store.users?.find(u => u.id === id);
    if (target?.role === 'master') return NextResponse.json({ ok: false, error: 'Cannot delete master admin' }, { status: 400 });
    await updateStore(s => { s.users = s.users.filter(u => u.id !== id); return s; });
    await addLog({ type: 'users', event: 'user_deleted', detail: id, username: authedUser.username });
    return NextResponse.json({ ok: true });
  }

  if (action === 'clearSubmissions') {
    if (authedUser.role !== 'master') return NextResponse.json({ ok: false, error: 'Not authorized' }, { status: 403 });
    await updateStore(s => { s.submissions = []; return s; });
    return NextResponse.json({ ok: true });
  }

  if (action === 'clearLogs') {
    if (authedUser.role !== 'master') return NextResponse.json({ ok: false, error: 'Not authorized' }, { status: 403 });
    await updateStore(s => { s.logs = []; return s; });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}

export async function GET() {
  const authedUser = await getAuthedUser();
  if (!authedUser) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ ok: true, store, user: { username: authedUser.username, name: authedUser.name, role: authedUser.role, modules: authedUser.modules } });
}
