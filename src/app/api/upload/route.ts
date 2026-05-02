import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import fs from 'fs'
import path from 'path'

/**
 * POST /api/upload
 *
 * multipart/form-data, field: file
 * - Writable FS (local dev): saves to public/uploads/
 * - Read-only FS (Vercel):   returns a mock URL (upgrade to Vercel Blob)
 *
 * ── Vercel Blob への切り替え ─────────────────────────────────
 *   import { put } from '@vercel/blob'
 *   const blob = await put(filename, file, { access: 'public' })
 *   return NextResponse.json({ url: blob.url, filename })
 * ────────────────────────────────────────────────────────────
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

function isWritableFS(): boolean {
  try { fs.accessSync(process.cwd(), fs.constants.W_OK); return true }
  catch { return false }
}

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid multipart form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'field "file" is required' }, { status: 422 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { success: false, error: `Unsupported type: ${file.type}` }, { status: 415 }
    )
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ success: false, error: 'File exceeds 10MB limit' }, { status: 413 })
  }

  const safeOriginal = file.name.replace(/\s+/g, '_')
  const filename = `${Date.now()}_${safeOriginal}`

  // Vercel (read-only FS) → mock URL
  if (!isWritableFS()) {
    return NextResponse.json({
      success: true,
      url: `/uploads/mock_${filename}`,
      filename: `mock_${filename}`,
      mock: true,
    })
  }

  // Local dev → save to public/uploads/
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  try {
    await mkdir(uploadsDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(uploadsDir, filename), buffer)
  } catch (err) {
    console.error('[upload] write error', err)
    return NextResponse.json({ success: false, error: 'Failed to save file' }, { status: 500 })
  }

  return NextResponse.json({ success: true, url: `/uploads/${filename}`, filename })
}
