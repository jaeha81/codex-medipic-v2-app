import { NextRequest, NextResponse } from 'next/server'
import { readOne, updateSession } from '@/lib/storage'

/**
 * GET /api/intake/[sessionId]
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const session = readOne(sessionId)
  if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(session)
}

/**
 * PATCH /api/intake/[sessionId]
 * Body: { status?, doctorNote? }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  try {
    const patch = await req.json()
    const updated = updateSession(sessionId, patch)
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('[PATCH /api/intake]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
