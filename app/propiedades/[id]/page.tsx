import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPropertyById, properties, formatPrice } from '@/lib/data'

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }))
}

const statusColor: Record<string, string> = {
  'En Venta': 'bg-[#16a34a] text-white',
  'Bajo Contrato': 'bg-[#dc2626] text-white',
  'Vendido': 'bg-gray-600 text-white',
}

export default async function PropertyDetailPage(props: PageProps<'/propiedades/[id]'>) {
  const { id } = await props.params
  const property = getPropertyById(id)
  if (!property) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#22c55e] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/propiedades" className="hover:text-[#22c55e] transition-colors">Propiedades</Link>
        <span>/</span>
        <span className="text-gray-300">{property.address}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images + Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main image */}
          <div className="relative rounded-xl overflow-hidden h-72 sm:h-96 bg-[#1f2937]">
            <Image
              src={property.images[0]}
              alt={property.titleEs}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColor[property.status]}`}>
                {property.status}
              </span>
              <span className="bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                {property.type}
              </span>
            </div>
          </div>

          {/* Thumbnail row */}
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((img, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden h-20 bg-[#1f2937]">
                  <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          )}

          {/* Title + price */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{property.titleEs}</h1>
            <p className="text-gray-400 mt-1">{property.address}, {property.city}, {property.state} {property.zip}</p>
            <p className="text-[#22c55e] font-black text-4xl mt-3">{formatPrice(property.price)}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Recámaras', value: property.bedrooms, icon: '🛏️' },
              { label: 'Baños', value: property.bathrooms, icon: '🚿' },
              { label: 'Superficie', value: `${property.sqft.toLocaleString()} ft²`, icon: '📐' },
              { label: 'Año', value: property.yearBuilt, icon: '🏗️' },
            ].map((s) => (
              <div key={s.label} className="bg-[#111827] border border-[#374151] rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6">
            <h2 className="text-white font-bold text-lg mb-3">Descripción</h2>
            <p className="text-gray-300 leading-relaxed">{property.descriptionEs}</p>
            <p className="text-gray-500 text-sm mt-3 italic">{property.description}</p>
          </div>

          {/* Features */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">Características</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.features.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#16a34a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Agent + Contact */}
        <div className="space-y-5">
          {/* Agent card */}
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 sticky top-20">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#1f2937] flex-shrink-0">
                <Image src={property.agent.photo} alt={property.agent.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-white font-bold">{property.agent.name}</p>
                <p className="text-[#22c55e] text-sm">Agente Los Listos</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <a
                href={`tel:${property.agent.phone}`}
                className="flex items-center gap-3 bg-[#1f2937] hover:bg-[#374151] rounded-lg px-4 py-3 text-gray-300 hover:text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {property.agent.phone}
              </a>
              <a
                href={`mailto:${property.agent.email}`}
                className="flex items-center gap-3 bg-[#1f2937] hover:bg-[#374151] rounded-lg px-4 py-3 text-gray-300 hover:text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {property.agent.email}
              </a>
            </div>

            <Link
              href={`/contacto?propiedad=${encodeURIComponent(property.titleEs)}`}
              className="block w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-lg text-center transition-colors text-sm"
            >
              Solicitar Información
            </Link>
            <Link
              href="/propiedades"
              className="block w-full mt-2 border border-[#374151] hover:border-[#16a34a] text-gray-400 hover:text-white font-medium py-3 rounded-lg text-center transition-colors text-sm"
            >
              ← Volver a Propiedades
            </Link>

            {/* Details summary */}
            <div className="mt-6 pt-5 border-t border-[#374151] space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Vecindario</span>
                <span className="text-gray-300">{property.neighborhood}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ciudad</span>
                <span className="text-gray-300">{property.city}, {property.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Publicado</span>
                <span className="text-gray-300">{new Date(property.listedDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Año construido</span>
                <span className="text-gray-300">{property.yearBuilt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
