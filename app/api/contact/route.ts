import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/mail'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, phone, city, service, message } = body

  if (!name || !email || !phone) {
    return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 })
  }

  try {
    await sendContactEmail({ name, email, phone, city, service, message })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
