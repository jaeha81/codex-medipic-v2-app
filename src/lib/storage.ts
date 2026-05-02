/**
 * Storage for intake sessions.
 *
 * Strategy:
 *  - Development / writable FS  → JSON file at data/intake-sessions.json
 *  - Production (Vercel etc.)   → in-memory global Map (demo; resets on cold start)
 *
 * Production upgrade: swap the read/write helpers below for Vercel KV / Supabase / PlanetScale.
 */
import fs from 'fs'
import path from 'path'

export interface StoredIntakeSession {
  sessionId: string
  categoryId: string
  responses: Record<string, string | string[]>
  riskFlags: { questionId: string; severity: 'flag' | 'block'; messageEn: string; messageJa: string }[]
  submittedAt: string
  status: 'pending' | 'reviewed' | 'prescribed' | 'rejected'
  doctorNote?: string
}

// ── In-memory fallback (Vercel serverless) ────────────────────────────────────
// Using globalThis so the Map survives hot-reloads in dev and is shared across
// the same function instance in production.
declare global {
  // eslint-disable-next-line no-var
  var __intakeStore: Map<string, StoredIntakeSession> | undefined
}
const memStore: Map<string, StoredIntakeSession> =
  globalThis.__intakeStore ?? (globalThis.__intakeStore = new Map())

// ── File-based helpers ────────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), 'data')
const DB_FILE  = path.join(DATA_DIR, 'intake-sessions.json')

function isWritableFS(): boolean {
  try {
    fs.accessSync(process.cwd(), fs.constants.W_OK)
    return true
  } catch {
    return false
  }
}

const USE_FILE = isWritableFS()

function fileReadAll(): StoredIntakeSession[] {
  try {
    if (!fs.existsSync(DB_FILE)) return []
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as StoredIntakeSession[]
  } catch {
    return []
  }
}

function fileWriteAll(sessions: StoredIntakeSession[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(DB_FILE, JSON.stringify(sessions, null, 2), 'utf-8')
}

// ── Public API ────────────────────────────────────────────────────────────────

export function readAll(): StoredIntakeSession[] {
  if (USE_FILE) return fileReadAll()
  return Array.from(memStore.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

export function readOne(sessionId: string): StoredIntakeSession | null {
  if (USE_FILE) return fileReadAll().find(s => s.sessionId === sessionId) ?? null
  return memStore.get(sessionId) ?? null
}

export function saveSession(session: StoredIntakeSession): void {
  if (USE_FILE) {
    const all = fileReadAll()
    const idx = all.findIndex(s => s.sessionId === session.sessionId)
    if (idx >= 0) all[idx] = session
    else all.unshift(session)
    fileWriteAll(all)
  } else {
    memStore.set(session.sessionId, session)
  }
}

export function updateSession(
  sessionId: string,
  patch: Partial<StoredIntakeSession>
): StoredIntakeSession | null {
  if (USE_FILE) {
    const all = fileReadAll()
    const idx = all.findIndex(s => s.sessionId === sessionId)
    if (idx < 0) return null
    all[idx] = { ...all[idx], ...patch }
    fileWriteAll(all)
    return all[idx]
  } else {
    const existing = memStore.get(sessionId)
    if (!existing) return null
    const updated = { ...existing, ...patch }
    memStore.set(sessionId, updated)
    return updated
  }
}
