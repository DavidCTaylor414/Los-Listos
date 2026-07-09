import Link from 'next/link'
import { properties } from '@/lib/data'
import PropertyCard from '@/components/PropertyCard'

export default function HomePage() {
  const featured = properties.filter((p) => p.status === 'For Sale').slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#111827] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#dc2626]" />
          <div className="flex-1 bg-white/10" />
          <div className="flex-1 bg-[#16a34a]" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-widest mb-3">
              Welcome to Los Listos Realty
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Your home in{' '}
              <span className="text-[#22c55e]">Texas</span>{' '}
              awaits.
            </h1>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-2xl">
              We are your trusted team for buying the property of your dreams. We speak Spanish, understand your family, and know the market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/propiedades"
                className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-colors text-center"
              >
                View Available Properties
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-[#374151] hover:border-[#16a34a] text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-colors text-center"
              >
                Speak with an Agent
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-0 w-72 h-72 bg-[#16a34a]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-[#dc2626]/5 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Stats bar */}
      <section className="bg-[#111827] border-y border-[#374151]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#374151]">
            {[
              { number: '500+', label: 'Families Helped' },
              { number: '$120M+', label: 'In Properties Sold' },
              { number: '15+', label: 'Years of Experience' },
              { number: '4', label: 'Cities in Texas' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="text-3xl font-black text-[#22c55e]">{stat.number}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-widest mb-1">Available Now</p>
            <h2 className="text-3xl font-black text-white">Featured Properties</h2>
          </div>
          <Link href="/propiedades" className="text-[#22c55e] hover:text-white text-sm font-medium transition-colors hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/propiedades" className="text-[#22c55e] hover:text-white text-sm font-medium transition-colors">
            View all properties →
          </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-[#111827] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-widest mb-2">Why Choose Us?</p>
            <h2 className="text-3xl font-black text-white">Los Listos — Your Real Estate Family</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                ),
                title: 'We Speak Spanish',
                desc: 'The entire process in your language. No barriers, no confusion. From search to close.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Guaranteed Trust',
                desc: 'Over 500 families have trusted us. We negotiate in your favor, always.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'We Know Texas',
                desc: 'San Antonio, Houston, Dallas, El Paso, Austin — we know every neighborhood, every school, every opportunity.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#0a0a0a] border border-[#374151] rounded-xl p-7">
                <div className="text-[#16a34a] mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            <div className="w-8 h-2 bg-[#dc2626] rounded-full" />
            <div className="w-8 h-2 bg-white/20 rounded-full" />
            <div className="w-8 h-2 bg-[#16a34a] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to find your next property?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Our agents are ready to help you. Call us or send us a message today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/propiedades" className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              Search Properties
            </Link>
            <Link href="/contact" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              Contact an Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
