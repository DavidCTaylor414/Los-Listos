import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getDb } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const required = ['title', 'address', 'city', 'state', 'zip', 'price', 'bedrooms', 'bathrooms', 'sqft', 'type', 'status', 'yearBuilt', 'description']
  for (const field of required) {
    if (body[field] === undefined || body[field] === '') {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 })
    }
  }

  const property = {
    id: crypto.randomUUID(),
    title: String(body.title),
    titleEs: String(body.titleEs ?? ''),
    address: String(body.address),
    city: String(body.city),
    state: String(body.state),
    zip: String(body.zip),
    price: Number(body.price),
    bedrooms: Number(body.bedrooms),
    bathrooms: Number(body.bathrooms),
    sqft: Number(body.sqft),
    type: body.type,
    status: body.status,
    yearBuilt: Number(body.yearBuilt),
    description: String(body.description),
    descriptionEs: String(body.descriptionEs ?? ''),
    features: Array.isArray(body.features) ? body.features : [],
    images: Array.isArray(body.images) ? body.images : [],
    agent: {
      name: String(body.agent?.name ?? ''),
      phone: String(body.agent?.phone ?? ''),
      email: String(body.agent?.email ?? ''),
      photo: String(body.agent?.photo ?? ''),
    },
    listedDate: new Date().toISOString().split('T')[0],
    neighborhood: String(body.neighborhood ?? ''),
  }

  const db = await getDb()
  await db.collection('properties').insertOne(property)

  return NextResponse.json(property, { status: 201 })
}
