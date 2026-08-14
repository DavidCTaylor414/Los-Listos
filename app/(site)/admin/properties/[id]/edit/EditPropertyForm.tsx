'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Property } from '@/lib/data'

export default function EditPropertyForm({ property }: { property: Property }) {
  const router = useRouter()
  const [form, setForm] = useState(property)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    const numeric = ['price', 'bedrooms', 'bathrooms', 'sqft', 'yearBuilt']
    setForm((prev) => ({ ...prev, [name]: numeric.includes(name) ? Number(value) : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/admin/properties/${property.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => { setSaved(false); router.push('/admin') }, 1200)
  }

  const inputClass = "w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
  const labelClass = "block text-gray-400 text-xs font-medium uppercase tracking-wider mb-1.5"

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="bg-[#111827] border-b border-[#374151] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors">← Admin</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300 text-sm">Edit Property</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-xl font-black text-white mb-6">Edit: {property.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titles */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Titles</h2>
            <div>
              <label className={labelClass}>Title (English)</label>
              <input name="title" value={form.title} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Title (Spanish)</label>
              <input name="titleEs" value={form.titleEs} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Details */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price ($)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Square Footage (ft²)</label>
                <input type="number" name="sqft" value={form.sqft} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input type="number" step="0.5" name="bathrooms" value={form.bathrooms} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Year Built</label>
                <input type="number" name="yearBuilt" value={form.yearBuilt} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Multi-Family</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option>For Sale</option>
                <option>Under Contract</option>
                <option>Sold</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Location</h2>
            <div>
              <label className={labelClass}>Address</label>
              <input name="address" value={form.address} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>City</label>
                <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input name="state" value={form.state} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Zip Code</label>
                <input name="zip" value={form.zip} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Neighborhood</label>
              <input name="neighborhood" value={form.neighborhood} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Description</h2>
            <div>
              <label className={labelClass}>Description (English)</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Description (Spanish)</label>
              <textarea name="descriptionEs" value={form.descriptionEs} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || saved}
              className="bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors"
            >
              {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin" className="bg-[#1f2937] hover:bg-[#374151] text-gray-300 font-medium px-6 py-3 rounded-lg text-sm transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
