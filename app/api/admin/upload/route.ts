import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getDb } from '@/lib/mongodb'

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const db = await getDb()

  const result = await db.collection('images').insertOne({
    data: buffer,
    contentType: file.type,
    filename: file.name,
    size: file.size,
    uploadedAt: new Date(),
  })

  const id = result.insertedId.toString()
  return NextResponse.json({ id, url: `/api/images/${id}` }, { status: 201 })
}
