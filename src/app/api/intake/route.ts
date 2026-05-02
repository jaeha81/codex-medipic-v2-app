import { NextRequest, NextResponse } from 'next/server'
import { readAll, saveSession, type StoredIntakeSession } from '@/lib/storage'

/**
 * POST /api/intake
 * Body: { sessionId, categoryId, responses, riskFlags }
 * Returns: { sessionId, status }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, categoryId, responses, riskFlags } = body

    if (!sessionId || !categoryId) {
      return NextResponse.json({ error: 'sessionId and categoryId are required' }, { status: 400 })
    }

    const session: StoredIntakeSession = {
      sessionId,
      categoryId,
      responses: responses ?? {},
      riskFlags: riskFlags ?? [],
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }

    saveSession(session)

    return NextResponse.json({ sessionId, status: 'pending' }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/intake]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * GET /api/intake
 * Query: ?status=pending|reviewed|prescribed|rejected&category=weight|hair|...
 * Returns: StoredIntakeSession[]
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const statusFilter = searchParams.get('status')
  const categoryFilter = searchParams.get('category')

  let sessions = readAll()
  if (statusFilter) sessions = sessions.filter(s => s.status === statusFilter)
  if (categoryFilter) sessions = sessions.filter(s => s.categoryId === categoryFilter)

  return NextResponse.json(sessions)
}
