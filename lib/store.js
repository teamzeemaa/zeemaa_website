import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'data', 'store.json');
const MAX_LOGS = 1000;
const MAX_SUBMISSIONS = 500;

export function readStore() {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function writeStore(data) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function updateStore(updater) {
  const current = readStore();
  const updated = updater(current);
  writeStore(updated);
  return updated;
}

export function addLog(entry) {
  updateStore(s => {
    if (!s.logs) s.logs = [];
    s.logs.unshift({ id: Date.now().toString(), ts: new Date().toISOString(), ...entry });
    if (s.logs.length > MAX_LOGS) s.logs = s.logs.slice(0, MAX_LOGS);
    return s;
  });
}

export function addSubmission(entry) {
  updateStore(s => {
    if (!s.submissions) s.submissions = [];
    s.submissions.unshift({ id: Date.now().toString(), ts: new Date().toISOString(), ...entry });
    if (s.submissions.length > MAX_SUBMISSIONS) s.submissions = s.submissions.slice(0, MAX_SUBMISSIONS);
    return s;
  });
}

export function verifyUser(username, password) {
  const store = readStore();
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
