import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getDb } from '@/lib/mongodb'

async function requireSession() {
  return await getSession()
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  if (!await requireSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await props.params
  const body = await request.json()
  const db = await getDb()
  await db.collection('properties').updateOne({ id }, { $set: body })
  return NextResponse.json({ success: true })
}

export async function DELETE(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  if (!await requireSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await props.params
  const db = await getDb()
  await db.collection('properties').deleteOne({ id })
  return NextResponse.json({ success: true })
}
