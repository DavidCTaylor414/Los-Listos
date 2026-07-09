import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const city = searchParams.get('city')
    const maxPrice = searchParams.get('maxPrice')
    const minSqft = searchParams.get('minSqft')
    const maxSqft = searchParams.get('maxSqft')
    const minBedrooms = searchParams.get('minBedrooms')
    const minBathrooms = searchParams.get('minBathrooms')

    const query: Record<string, unknown> = {}
    if (type) query.type = type
    if (status) query.status = status
    if (city) query.city = city
    if (maxPrice) query.price = { ...((query.price as object) || {}), $lte: Number(maxPrice) }
    if (minSqft || maxSqft) {
      query.sqft = {}
      if (minSqft) (query.sqft as Record<string, number>).$gte = Number(minSqft)
      if (maxSqft) (query.sqft as Record<string, number>).$lte = Number(maxSqft)
    }
    if (minBedrooms) query.bedrooms = { $gte: Number(minBedrooms) }
    if (minBathrooms) query.bathrooms = { $gte: Number(minBathrooms) }

    const db = await getDb()
    const properties = await db
      .collection('properties')
      .find(query, { projection: { _id: 0 } })
      .toArray()

    return NextResponse.json(properties)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}
