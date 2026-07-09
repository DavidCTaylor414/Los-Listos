import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getDb } from '@/lib/mongodb'
import { Property } from '@/lib/data'
import EditPropertyForm from './EditPropertyForm'

export const dynamic = 'force-dynamic'

export default async function EditPropertyPage(props: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const { id } = await props.params
  const db = await getDb()
  const property = await db.collection('properties').findOne({ id }, { projection: { _id: 0 } }) as Property | null
  if (!property) notFound()

  return <EditPropertyForm property={property} />
}
