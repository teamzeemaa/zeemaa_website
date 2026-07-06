import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'data', 'store.json');
const MAX_LOGS = 1000;
const MAX_SUBMISSIONS = 500;
const KV_KEY = 'zeemaa:store';

/* ─────────────────────────────────────────────────────────────
   Persistence backend
   Local dev: reads/writes data/store.json directly on disk.
   Vercel: file writes do not persist across deploys/invocations,
   so when a Redis integration is connected (Vercel Marketplace →
   Upstash Redis, or the legacy Vercel KV), we store the same JSON
   blob there instead under a single key. Falls back to the file
   automatically if no Redis env vars are present.
───────────────────────────────────────────────────────────── */

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

let redisClient = null;
async function getRedis() {
  if (!useRedis) return null;
  if (!redisClient) {
    const { Redis } = await import('@upstash/redis');
    redisClient = new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
  }
  return redisClient;
}

function readStoreFromFile() {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeStoreToFile(data) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readStore() {
  const redis = await getRedis();
  if (redis) {
    const data = await redis.get(KV_KEY);
    if (data) return data;
    // First read on a fresh Redis store: seed it from the bundled store.json.
    const seed = readStoreFromFile();
    await redis.set(KV_KEY, seed);
    return seed;
  }
  return readStoreFromFile();
}

export async function writeStore(data) {
  const redis = await getRedis();
  if (redis) {
    await redis.set(KV_KEY, data);
    return;
  }
  writeStoreToFile(data);
}

export async function updateStore(updater) {
  const current = await readStore();
  const updated = updater(current);
  await writeStore(updated);
  return updated;
}

export async function addLog(entry) {
  await updateStore(s => {
    if (!s.logs) s.logs = [];
    s.logs.unshift({ id: Date.now().toString(), ts: new Date().toISOString(), ...entry });
    if (s.logs.length > MAX_LOGS) s.logs = s.logs.slice(0, MAX_LOGS);
    return s;
  });
}

export async function addSubmission(entry) {
  await updateStore(s => {
    if (!s.submissions) s.submissions = [];
    s.submissions.unshift({ id: Date.now().toString(), ts: new Date().toISOString(), ...entry });
    if (s.submissions.length > MAX_SUBMISSIONS) s.submissions = s.submissions.slice(0, MAX_SUBMISSIONS);
    return s;
  });
}

export async function verifyUser(username, password) {
  const store = await readStore();
  const users = store.users || [];
  const user = users.find(u => u.username === username && u.passwordHash === password && u.enabled);
  return user || null;
}

export function hasPermission(user, module, action) {
  if (!user) return false;
  if (user.role === 'master') return true;
  const perms = user.modules?.[module] || [];
  return perms.includes(action);
}
