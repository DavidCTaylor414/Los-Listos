import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/mongodb'
import { createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  const db = await getDb()
  const user = await db.collection('admins').findOne({ email: email.toLowerCase() })
  if (!user) {
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
  }

  await createSession({ email: user.email, name: user.name ?? '' })
  return NextResponse.json({ success: true })
}
