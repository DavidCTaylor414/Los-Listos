import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getDb } from '@/lib/mongodb'
import { Property } from '@/lib/data'
import AdminDashboard from './AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const db = await getDb()
  const properties = await db
    .collection('properties')
    .find({}, { projection: { _id: 0 } })
    .sort({ listedDate: -1 })
    .toArray() as unknown as Property[]

  return <AdminDashboard properties={properties} session={session} />
}
