import { NextRequest, NextResponse } from 'next/server'

function isConfigured() {
  return Boolean(process.env.DOCTOR_PASSWORD && process.env.DOCTOR_SESSION_SECRET)
}

export async function POST(req: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json({ error: 'Doctor auth is not configured' }, { status: 503 })
  }

  try {
    const { password } = await req.json()
    const expected = process.env.DOCTOR_PASSWORD

    if (password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('medipic_doctor_token', process.env.DOCTOR_SESSION_SECRET!, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('medipic_doctor_token', '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return res
}
