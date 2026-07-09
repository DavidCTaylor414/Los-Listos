import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  let objectId: ObjectId
  try {
    objectId = new ObjectId(id)
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  const db = await getDb()
  const image = await db.collection('images').findOne({ _id: objectId })

  if (!image) return new NextResponse('Not found', { status: 404 })

  const buffer = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer)

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': image.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
