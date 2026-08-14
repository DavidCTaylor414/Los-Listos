'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Property, formatPrice } from '@/lib/data'
import { SessionPayload } from '@/lib/auth'

const STATUSES = ['For Sale', 'Under Contract', 'Sold'] as const
const TYPES = ['House', 'Condo', 'Townhouse', 'Multi-Family'] as const
const CITIES = ['San Antonio', 'Houston', 'Dallas', 'Austin', 'El Paso', 'Fort Worth', 'Plano']
const statusColor: Record<string, string> = {
  'For Sale': 'bg-[#16a34a]/20 text-[#22c55e] border-[#16a34a]/30',
  'Under Contract': 'bg-[#dc2626]/20 text-[#ef4444] border-[#dc2626]/30',
  'Sold': 'bg-gray-700/50 text-gray-400 border-gray-600',
}

const BLANK_FORM = {
  title: '', titleEs: '',
  address: '', city: 'San Antonio', state: 'TX', zip: '', neighborhood: '',
  price: '', bedrooms: '', bathrooms: '', sqft: '', yearBuilt: '',
  type: 'House' as Property['type'],
  status: 'For Sale' as Property['status'],
  description: '', descriptionEs: '',
  features: '',
  agentName: '', agentPhone: '', agentEmail: '', agentPhoto: '',
}

type UploadedImage = { id: string; url: string; previewUrl: string }

export default function AdminDashboard({ properties: initial, session }: { properties: Property[], session: SessionPayload }) {
  const [tab, setTab] = useState<'properties' | 'metrics' | 'new-listing'>('properties')
  const [properties, setProperties] = useState(initial)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK_FORM)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [imageUploading, setImageUploading] = useState(false)
  const [imageUploadError, setImageUploadError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  function setField(key: keyof typeof BLANK_FORM, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    e.target.value = ''
    setImageUploading(true)
    setImageUploadError('')

    const results = await Promise.all(files.map(async (file) => {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        return { error: err.error ?? 'Upload failed' }
      }
      const data = await res.json()
      return { id: data.id, url: data.url, previewUrl: URL.createObjectURL(file) }
    }))

    const succeeded = results.filter((r): r is UploadedImage => !('error' in r))
    const failed = results.filter((r): r is { error: string } => 'error' in r)

    setUploadedImages((prev) => [...prev, ...succeeded])
    if (failed.length > 0) setImageUploadError(`${failed.length} photo(s) failed to upload.`)
    setImageUploading(false)
  }

  async function handleNewListing(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    const body = {
      title: form.title,
      titleEs: form.titleEs,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      neighborhood: form.neighborhood,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft: Number(form.sqft),
      yearBuilt: Number(form.yearBuilt),
      type: form.type,
      status: form.status,
      description: form.description,
      descriptionEs: form.descriptionEs,
      features: form.features.split('\n').map((s) => s.trim()).filter(Boolean),
      images: uploadedImages.map((img) => img.url),
      agent: { name: form.agentName, phone: form.agentPhone, email: form.agentEmail, photo: form.agentPhoto },
    }

    const res = await fetch('/api/admin/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (!res.ok) {
      setSubmitError(data.error ?? 'Failed to create listing.')
      setSubmitting(false)
      return
    }

    setProperties((prev) => [data, ...prev])
    setForm(BLANK_FORM)
    setUploadedImages([])
    setSubmitSuccess(true)
    setSubmitting(false)
    setTimeout(() => { setSubmitSuccess(false); setTab('properties') }, 1500)
  }

  async function handleStatusChange(id: string, status: string) {
    setUpdatingId(id)
    await fetch(`/api/admin/properties/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setProperties((prev) => prev.map((p) => p.id === id ? { ...p, status: status as Property['status'] } : p))
    setUpdatingId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) return
    setDeletingId(id)
    await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' })
    setProperties((prev) => prev.filter((p) => p.id !== id))
    setDeletingId(null)
  }

  const forSale = properties.filter(p => p.status === 'For Sale').length
  const underContract = properties.filter(p => p.status === 'Under Contract').length
  const sold = properties.filter(p => p.status === 'Sold').length

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Tabs */}
      <div className="bg-[#111827] border-b border-[#374151] px-6">
        <div className="max-w-screen-2xl mx-auto flex gap-0">
          {([['properties', 'Properties'], ['new-listing', '+ New Listing'], ['metrics', 'Metrics']] as const).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t
                  ? 'border-[#16a34a] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── PROPERTIES TAB ── */}
        {tab === 'properties' && (
          <>
            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', value: properties.length, color: 'text-white' },
                { label: 'For Sale', value: forSale, color: 'text-[#22c55e]' },
                { label: 'Under Contract', value: underContract, color: 'text-[#ef4444]' },
                { label: 'Sold', value: sold, color: 'text-gray-400' },
              ].map((s) => (
                <div key={s.label} className="bg-[#111827] border border-[#374151] rounded-xl px-5 py-4">
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#111827] border border-[#374151] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#374151]">
                    <th className="text-left text-gray-400 font-medium px-5 py-3">Property</th>
                    <th className="text-left text-gray-400 font-medium px-5 py-3 hidden md:table-cell">City</th>
                    <th className="text-left text-gray-400 font-medium px-5 py-3 hidden lg:table-cell">Price</th>
                    <th className="text-left text-gray-400 font-medium px-5 py-3">Status</th>
                    <th className="text-right text-gray-400 font-medium px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#374151]">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-[#1f2937]/50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-white font-medium line-clamp-1">{property.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{property.type} · {property.bedrooms} bd · {property.sqft.toLocaleString()} ft²</p>
                      </td>
                      <td className="px-5 py-4 text-gray-300 hidden md:table-cell">{property.city}</td>
                      <td className="px-5 py-4 text-[#22c55e] font-semibold hidden lg:table-cell">{formatPrice(property.price)}</td>
                      <td className="px-5 py-4">
                        <select
                          value={property.status}
                          disabled={updatingId === property.id}
                          onChange={(e) => handleStatusChange(property.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border bg-transparent cursor-pointer disabled:opacity-50 ${statusColor[property.status]}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-[#111827] text-gray-100">{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/properties/${property.id}/edit`}
                            className="text-gray-400 hover:text-white text-xs px-3 py-1.5 bg-[#1f2937] hover:bg-[#374151] rounded-md transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(property.id)}
                            disabled={deletingId === property.id}
                            className="text-[#ef4444] hover:text-white text-xs px-3 py-1.5 bg-[#dc2626]/10 hover:bg-[#dc2626] rounded-md transition-colors disabled:opacity-50"
                          >
                            {deletingId === property.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── NEW LISTING TAB ── */}
        {tab === 'new-listing' && (
          <div className="max-w-3xl">
            <h2 className="text-white font-bold text-lg mb-6">Add New Listing</h2>

            {submitSuccess && (
              <div className="mb-6 bg-[#16a34a]/10 border border-[#16a34a]/30 text-[#22c55e] rounded-xl px-5 py-4 text-sm font-medium">
                Listing created successfully! Redirecting…
              </div>
            )}
            {submitError && (
              <div className="mb-6 bg-[#dc2626]/10 border border-[#dc2626]/30 text-[#ef4444] rounded-xl px-5 py-4 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleNewListing} className="space-y-6">
              {/* Basic Info */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Basic Info</h3>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Title *</label>
                  <input required value={form.title} onChange={(e) => setField('title', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="e.g. Beautiful Family Home in Quiet Neighborhood" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Title (Spanish)</label>
                  <input value={form.titleEs} onChange={(e) => setField('titleEs', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="Optional Spanish translation" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Type *</label>
                    <select required value={form.type} onChange={(e) => setField('type', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]">
                      {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Status *</label>
                    <select required value={form.status} onChange={(e) => setField('status', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Price ($) *</label>
                    <input required type="number" min={0} value={form.price} onChange={(e) => setField('price', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="285000" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Year Built *</label>
                    <input required type="number" min={1800} max={2030} value={form.yearBuilt} onChange={(e) => setField('yearBuilt', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="2005" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Location</h3>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Street Address *</label>
                  <input required value={form.address} onChange={(e) => setField('address', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="2847 Calle del Sol" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">City *</label>
                    <select required value={form.city} onChange={(e) => setField('city', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]">
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">ZIP Code *</label>
                    <input required value={form.zip} onChange={(e) => setField('zip', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="78201" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">State</label>
                    <input value={form.state} onChange={(e) => setField('state', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="TX" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Neighborhood</label>
                    <input value={form.neighborhood} onChange={(e) => setField('neighborhood', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="Westside" />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Property Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Bedrooms *</label>
                    <input required type="number" min={0} step={1} value={form.bedrooms} onChange={(e) => setField('bedrooms', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="4" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Bathrooms *</label>
                    <input required type="number" min={0} step={0.5} value={form.bathrooms} onChange={(e) => setField('bathrooms', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="2.5" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Sq Ft *</label>
                    <input required type="number" min={0} value={form.sqft} onChange={(e) => setField('sqft', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="1950" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Description</h3>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Description (English) *</label>
                  <textarea required rows={4} value={form.description} onChange={(e) => setField('description', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a] resize-none" placeholder="Describe the property…" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Description (Spanish)</label>
                  <textarea rows={3} value={form.descriptionEs} onChange={(e) => setField('descriptionEs', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a] resize-none" placeholder="Optional Spanish description…" />
                </div>
              </div>

              {/* Features */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Features</h3>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Features <span className="text-gray-600">(one per line)</span></label>
                  <textarea rows={4} value={form.features} onChange={(e) => setField('features', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a] resize-none" placeholder={"2-Car Garage\nUpdated Kitchen\nLarge Backyard"} />
                </div>
              </div>

              {/* Photos */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Photos</h3>

                {imageUploadError && (
                  <p className="text-[#ef4444] text-xs">{imageUploadError}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  {uploadedImages.map((img, i) => (
                    <div key={img.id} className="relative group w-24 h-24 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.previewUrl} alt={`Photo ${i + 1}`} className="w-24 h-24 object-cover rounded-lg border border-[#374151]" />
                      <button
                        type="button"
                        onClick={() => setUploadedImages((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <label className={`w-24 h-24 flex-shrink-0 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${imageUploading ? 'border-[#374151] opacity-50 cursor-not-allowed' : 'border-[#374151] hover:border-[#16a34a] cursor-pointer'}`}>
                    {imageUploading ? (
                      <span className="text-gray-500 text-xs text-center px-1">Uploading…</span>
                    ) : (
                      <>
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-gray-500 text-xs">Add Photos</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      disabled={imageUploading}
                      onChange={handleImageSelect}
                    />
                  </label>
                </div>

                <p className="text-gray-600 text-xs">JPG, PNG, or WebP · max 10 MB each · hover a photo to remove it</p>
              </div>

              {/* Agent */}
              <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Agent</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Agent Name</label>
                    <input value={form.agentName} onChange={(e) => setField('agentName', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="María González" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Phone</label>
                    <input value={form.agentPhone} onChange={(e) => setField('agentPhone', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="(210) 555-0101" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Email</label>
                    <input type="email" value={form.agentEmail} onChange={(e) => setField('agentEmail', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="agent@loslistos.com" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Photo URL</label>
                    <input value={form.agentPhoto} onChange={(e) => setField('agentPhoto', e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]" placeholder="https://…" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {submitting ? 'Creating…' : 'Create Listing'}
                </button>
                <button
                  type="button"
                  onClick={() => { setForm(BLANK_FORM); setUploadedImages([]); setSubmitError(''); setImageUploadError('') }}
                  className="bg-[#1f2937] hover:bg-[#374151] text-gray-300 font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── METRICS TAB ── */}
        {tab === 'metrics' && (
          <div className="space-y-6">
            {/* Status bar */}
            <div className="flex items-center gap-3 bg-[#16a34a]/10 border border-[#16a34a]/30 rounded-xl px-5 py-4">
              <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-pulse flex-shrink-0" />
              <div>
                <p className="text-[#22c55e] text-sm font-semibold">Google Analytics connected</p>
                <p className="text-gray-400 text-xs mt-0.5">ID: {process.env.NEXT_PUBLIC_GA_ID ?? ''} — Collecting visitor data on loslistos.com</p>
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: 'Real-Time Visitors',
                  desc: 'See who is on the site right now',
                  href: 'https://analytics.google.com/analytics/web/#/realtime',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                },
                {
                  label: 'Traffic & Sources',
                  desc: 'Where your visitors are coming from',
                  href: 'https://analytics.google.com/analytics/web/#/acquisition',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  label: 'Most Viewed Pages',
                  desc: 'Which properties generate the most interest',
                  href: 'https://analytics.google.com/analytics/web/#/engagement/pages',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#111827] border border-[#374151] hover:border-[#16a34a] rounded-xl p-5 transition-colors group"
                >
                  <div className="text-[#16a34a] mb-3">{item.icon}</div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#22c55e] transition-colors">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  <p className="text-gray-600 text-xs mt-3">Open in Google Analytics →</p>
                </a>
              ))}
            </div>

            {/* SEO section */}
            <div className="bg-[#111827] border border-[#374151] rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white font-bold">SEO — Google Search Console</h2>
                  <p className="text-gray-400 text-sm mt-1">Keywords, Google rankings, and organic clicks.</p>
                </div>
                <span className="bg-[#1f2937] text-gray-400 text-xs px-2.5 py-1 rounded-full border border-[#374151]">Pending</span>
              </div>

              <div className="mt-5 border-t border-[#374151] pt-5 space-y-3">
                <p className="text-gray-400 text-sm">To activate SEO tracking:</p>
                <ol className="text-gray-500 text-sm space-y-2 list-decimal list-inside">
                  <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline">Google Search Console</a></li>
                  <li>Add the property <span className="text-gray-300">loslistos.com</span></li>
                  <li>Verify the domain with a TXT record in GoDaddy</li>
                  <li>Wait 3–5 days for Google to index the site</li>
                </ol>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-[#1f2937] hover:bg-[#374151] text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Set Up Search Console →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
