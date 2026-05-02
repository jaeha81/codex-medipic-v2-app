import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/line/notify
 *
 * ── 予約通知 (type: 'booking') ──────────────────────────────
 * body: { type: 'booking'; sessionId: string; slotLabel: string; userId?: string }
 *
 * ── 処方確定通知 (type: 'prescription') ────────────────────
 * body: { type: 'prescription'; sessionId: string; categoryId: string; doctorNote: string; userId?: string }
 *
 * Mock モード（NEXT_PUBLIC_LIFF_ID 未設定）:
 *   → { success: true, messageId: 'mock_<timestamp>', type } を即時返却
 *
 * 実際の連携時:
 *   1. LINE_CHANNEL_ACCESS_TOKEN を環境変数に設定
 *   2. LINE Messaging API の push message エンドポイントを呼ぶ
 *      POST https://api.line.me/v2/bot/message/push
 *      Authorization: Bearer <LINE_CHANNEL_ACCESS_TOKEN>
 *      body: { to: userId, messages: [ FlexMessage ] }
 *
 * ── 処方確定 Flex Message 例 ────────────────────────────────
 * {
 *   type: 'flex',
 *   altText: '処方が確定しました',
 *   contents: {
 *     type: 'bubble',
 *     header: { type: 'box', layout: 'vertical', contents: [
 *       { type: 'text', text: '処方確定のお知らせ', weight: 'bold', color: '#ffffff', size: 'md' }
 *     ], backgroundColor: '#1E60C8' },
 *     body: { type: 'box', layout: 'vertical', spacing: 'md', contents: [
 *       { type: 'text', text: `カテゴリ: ${categoryId}`, size: 'sm', color: '#555555' },
 *       { type: 'text', text: doctorNote, wrap: true, size: 'sm', color: '#111111' },
 *       { type: 'text', text: `処方日: ${new Date().toLocaleDateString('ja-JP')}`, size: 'xs', color: '#aaaaaa' },
 *     ] },
 *   },
 * }
 */

type BookingBody = {
  type?: 'booking'
  sessionId: string
  slotLabel: string
  userId?: string
}

type PrescriptionBody = {
  type: 'prescription'
  sessionId: string
  categoryId: string
  doctorNote: string
  userId?: string
}

type NotifyBody = BookingBody | PrescriptionBody

const IS_MOCK = !process.env.NEXT_PUBLIC_LIFF_ID

export async function POST(req: NextRequest) {
  let body: NotifyBody

  try {
    body = (await req.json()) as NotifyBody
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const notifyType = body.type ?? 'booking'

  /* ── 処方確定通知 ──────────────────────────────────────── */
  if (notifyType === 'prescription') {
    const pb = body as PrescriptionBody
    if (!pb.sessionId || !pb.categoryId) {
      return NextResponse.json(
        { success: false, error: 'sessionId and categoryId are required for prescription notify' },
        { status: 422 },
      )
    }

    if (IS_MOCK) {
      console.log('[LINE mock] /api/line/notify prescription', {
        sessionId: pb.sessionId,
        categoryId: pb.categoryId,
        doctorNote: pb.doctorNote,
        userId: pb.userId,
      })
      return NextResponse.json({
        success: true,
        messageId: `mock_${Date.now()}`,
        type: 'prescription',
        note: 'Running in mock mode — no actual LINE message was sent.',
      })
    }

    /* Real LINE Messaging API — prescription
     * const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
     * if (!token) return NextResponse.json({ success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN not set' }, { status: 500 })
     * if (!pb.userId) return NextResponse.json({ success: false, error: 'userId is required' }, { status: 422 })
     * ... send flex message (see comment above) ...
     */
    return NextResponse.json({ success: false, error: 'Real LINE integration not yet configured.' }, { status: 501 })
  }

  /* ── 予約通知 (booking, default) ──────────────────────── */
  const bb = body as BookingBody
  if (!bb.sessionId || !bb.slotLabel) {
    return NextResponse.json(
      { success: false, error: 'sessionId and slotLabel are required' },
      { status: 422 },
    )
  }

  if (IS_MOCK) {
    console.log('[LINE mock] /api/line/notify booking', {
      sessionId: bb.sessionId,
      slotLabel: bb.slotLabel,
      userId: bb.userId,
    })
    return NextResponse.json({
      success: true,
      messageId: `mock_${Date.now()}`,
      type: 'booking',
      note: 'Running in mock mode — no actual LINE message was sent.',
    })
  }

  /* Real LINE Messaging API — booking
   * const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
   * if (!token) return NextResponse.json({ success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN not set' }, { status: 500 })
   * if (!bb.userId) return NextResponse.json({ success: false, error: 'userId is required' }, { status: 422 })
   *
   * const flexMessage = {
   *   type: 'flex',
   *   altText: `Booking confirmed: ${bb.slotLabel}`,
   *   contents: {
   *     type: 'bubble',
   *     body: {
   *       type: 'box', layout: 'vertical',
   *       contents: [
   *         { type: 'text', text: 'Booking Confirmed', weight: 'bold', size: 'xl' },
   *         { type: 'text', text: bb.slotLabel, size: 'md', color: '#07B53B' },
   *       ],
   *     },
   *   },
   * }
   *
   * const res = await fetch('https://api.line.me/v2/bot/message/push', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
   *   body: JSON.stringify({ to: bb.userId, messages: [flexMessage] }),
   * })
   * if (!res.ok) {
   *   const err = await res.text()
   *   return NextResponse.json({ success: false, error: err }, { status: res.status })
   * }
   * return NextResponse.json({ success: true, messageId: `line_${Date.now()}`, type: 'booking' })
   */

  return NextResponse.json({
    success: false,
    error: 'Real LINE integration not yet configured.',
  }, { status: 501 })
}
