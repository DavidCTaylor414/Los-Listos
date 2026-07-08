'use client'

import { useState, useMemo } from 'react'
import { properties } from '@/lib/data'
import PropertyCard from '@/components/PropertyCard'

const TYPES = ['Todos', 'Casa', 'Condominio', 'Townhouse', 'Multi-Familiar'] as const
const STATUSES = ['Todos', 'En Venta', 'Bajo Contrato', 'Vendido'] as const
const CITIES = ['Todas', ...Array.from(new Set(properties.map((p) => p.city)))]
const BEDROOMS = ['Todos', '2+', '3+', '4+', '5+'] as const
const BATHROOMS = ['Todos', '1+', '2+', '3+'] as const

export default function PropiedadesPage() {
  const [typeFilter, setTypeFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [cityFilter, setCityFilter] = useState('Todas')
  const [maxPrice, setMaxPrice] = useState(1000000)
  const [minSqft, setMinSqft] = useState(0)
  const [maxSqft, setMaxSqft] = useState(6000)
  const [bedroomFilter, setBedroomFilter] = useState('Todos')
  const [bathroomFilter, setBathroomFilter] = useState('Todos')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = useMemo(() => {
    let list = [...properties]
    if (typeFilter !== 'Todos') list = list.filter((p) => p.type === typeFilter)
    if (statusFilter !== 'Todos') list = list.filter((p) => p.status === statusFilter)
    if (cityFilter !== 'Todas') list = list.filter((p) => p.city === cityFilter)
    list = list.filter((p) => p.price <= maxPrice)
    list = list.filter((p) => p.sqft >= minSqft && p.sqft <= maxSqft)
    if (bedroomFilter !== 'Todos') {
      const min = parseInt(bedroomFilter)
      list = list.filter((p) => p.bedrooms >= min)
    }
    if (bathroomFilter !== 'Todos') {
      const min = parseFloat(bathroomFilter)
      list = list.filter((p) => p.bathrooms >= min)
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else list.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
    return list
  }, [typeFilter, statusFilter, cityFilter, maxPrice, minSqft, maxSqft, bedroomFilter, bathroomFilter, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-widest mb-1">Disponibles en Texas</p>
        <h1 className="text-3xl font-black text-white">Propiedades en Venta</h1>
        <p className="text-gray-400 mt-2">Encuentra la propiedad perfecta para tu familia.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Filtros</h2>

            {/* Type */}
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Tipo</label>
              <div className="space-y-1">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      typeFilter === t
                        ? 'bg-[#16a34a] text-white font-medium'
                        : 'text-gray-400 hover:text-white hover:bg-[#1f2937]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Estado</label>
              <div className="space-y-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      statusFilter === s
                        ? 'bg-[#16a34a] text-white font-medium'
                        : 'text-gray-400 hover:text-white hover:bg-[#1f2937]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Ciudad</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full bg-[#1f2937] border border-[#374151] text-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">
                Precio máx: <span className="text-[#22c55e]">${maxPrice.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={100000}
                max={1000000}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#16a34a]"
              />
              <div className="flex justify-between text-gray-500 text-xs mt-1">
                <span>$100k</span>
                <span>$1M+</span>
              </div>
            </div>

            {/* Square footage */}
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">
                Superficie: <span className="text-[#22c55e]">{minSqft.toLocaleString()} – {maxSqft >= 6000 ? '6,000+' : maxSqft.toLocaleString()} ft²</span>
              </label>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600 text-xs mb-1">Mínimo</p>
                  <input
                    type="range"
                    min={0}
                    max={4500}
                    step={250}
                    value={minSqft}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      setMinSqft(val)
                      if (val >= maxSqft) setMaxSqft(val + 500)
                    }}
                    className="w-full accent-[#16a34a]"
                  />
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">Máximo</p>
                  <input
                    type="range"
                    min={500}
                    max={6000}
                    step={250}
                    value={maxSqft}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      setMaxSqft(val)
                      if (val <= minSqft) setMinSqft(val - 500)
                    }}
                    className="w-full accent-[#16a34a]"
                  />
                </div>
              </div>
              <div className="flex justify-between text-gray-500 text-xs mt-1">
                <span>0 ft²</span>
                <span>6,000+ ft²</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Recámaras</label>
              <div className="flex flex-wrap gap-1.5">
                {BEDROOMS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedroomFilter(b)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      bedroomFilter === b
                        ? 'bg-[#16a34a] text-white'
                        : 'bg-[#1f2937] text-gray-400 hover:text-white hover:bg-[#374151]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Baños</label>
              <div className="flex flex-wrap gap-1.5">
                {BATHROOMS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBathroomFilter(b)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      bathroomFilter === b
                        ? 'bg-[#16a34a] text-white'
                        : 'bg-[#1f2937] text-gray-400 hover:text-white hover:bg-[#374151]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">
              <span className="text-white font-semibold">{filtered.length}</span> propiedad{filtered.length !== 1 ? 'es' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111827] border border-[#374151] text-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#16a34a]"
            >
              <option value="newest">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p>No se encontraron propiedades con estos filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
