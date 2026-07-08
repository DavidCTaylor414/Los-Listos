import Link from 'next/link'
import Image from 'next/image'
import { Property, formatPrice } from '@/lib/data'

const statusColor: Record<Property['status'], string> = {
  'En Venta': 'bg-[#16a34a] text-white',
  'Bajo Contrato': 'bg-[#dc2626] text-white',
  'Vendido': 'bg-gray-600 text-white',
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/propiedades/${property.id}`} className="group block bg-[#111827] rounded-xl overflow-hidden border border-[#374151] hover:border-[#16a34a] transition-all duration-200 hover:shadow-lg hover:shadow-green-900/20">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#1f2937]">
        <Image
          src={property.images[0]}
          alt={property.titleEs}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[property.status]}`}>
            {property.status}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[#22c55e] font-bold text-2xl">{formatPrice(property.price)}</p>
        <h3 className="text-white font-semibold text-base mt-1 leading-snug line-clamp-2 group-hover:text-[#22c55e] transition-colors">
          {property.titleEs}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {property.address}, {property.city}, {property.state}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#374151]">
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <svg className="w-4 h-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>{property.bedrooms} rec.</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <svg className="w-4 h-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{property.bathrooms} baños</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <svg className="w-4 h-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{property.sqft.toLocaleString()} ft²</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
