'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { properties } from '@/lib/data'
import PropertyCard from '@/components/PropertyCard'
import Footer from '@/components/Footer'

const PHRASES = [
  "Find your home… We're ready.",
  'Your agent, your family.',
  'Simple. Safe. Secure.',
]

const INTERVAL_MS = 5000
const FADE_MS = 400

const BADGES = [
  {
    label: '$0 Down',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    ),
  },
  {
    label: 'Govt programs for first time buyers',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    label: 'Loan and refinancing services',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    ),
  },
  {
    label: 'No personal information required',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
]

const SERVICES = [
  { title: 'Sell your home', description: 'Get a free valuation and list with a trusted local agent.', cta: 'Speak with an agent' },
  { title: 'Homes in your area', description: 'Browse available listings near you.', cta: 'Browse listings' },
  { title: 'Pre-approved Loans', description: 'Get pre-approved and know your budget before you shop.', cta: 'Speak with an agent' },
  { title: 'VA and first time buyer programs', description: 'Special programs and down payment assistance for veterans and first-time buyers.', cta: 'Speak with an agent' },
  { title: 'refinance your house', description: "Lower your rate or tap into your home's equity.", cta: 'Speak with an agent' },
]

export default function HomePage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [openService, setOpenService] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const featured = properties.filter((p) => p.status === 'For Sale').slice(0, 9)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length)
        setVisible(true)
      }, FADE_MS)
    }, INTERVAL_MS)
    return () => clearInterval(cycle)
  }, [])

  const quickLinksList = (
    <div className="divide-y divide-[#111827]/20 bg-[#1e293b]">
      {SERVICES.map((service, i) => {
        const open = openService === i
        return (
          <div key={service.title}>
            <button
              type="button"
              onClick={() => setOpenService(open ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white bg-[#1e293b] hover:bg-[#334155] transition-colors"
            >
              {service.title}
              <svg
                className={`w-4 h-4 flex-shrink-0 text-gray-300 transition-transform ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="px-5 pt-3 pb-5 bg-[#1e293b] space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
                {service.cta === 'Speak with an agent' ? (
                  <Link
                    href="/contact"
                    className="inline-block text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg px-4 py-2 transition-colors"
                  >
                    {service.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg px-4 py-2 transition-colors"
                  >
                    {service.cta}
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#d1d5db]">
      <header className="relative bg-[#111827] border-b border-black px-6 py-4 sm:px-10 sm:py-5 flex items-center">
        <span className="flex items-center gap-1">
          <span className="text-[#16a34a] font-black text-2xl tracking-tight">LOS</span>
          <span className="text-white font-black text-2xl tracking-tight">LISTOS</span>
          <span className="text-[#dc2626] font-black text-2xl tracking-tight">•</span>
        </span>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-md h-8 items-center justify-center overflow-hidden text-center px-4">
          <p
            className={`text-base sm:text-lg font-bold text-white leading-tight transition-all duration-[400ms] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {PHRASES[index]}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="relative z-10 ml-auto lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle quick links menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden sticky top-0 z-30 bg-white max-h-[70vh] overflow-y-auto">{quickLinksList}</div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row items-start relative">
        {/* Decorative fill so the dark panel visually extends the full column height behind the sticky links */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-64 bg-[#1e293b] pointer-events-none" aria-hidden="true" />

        {/* Quick Links — sidebar, flush left, sticky below the header */}
        <div className="hidden lg:block relative z-10 lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-0 bg-[#1e293b]">
          {quickLinksList}
        </div>

        {/* Content column */}
        <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center lg:items-stretch gap-16">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-10 items-center lg:items-stretch">
              <div className="w-full lg:flex-1 flex flex-col justify-start">
                {/* Hero */}
                <div className="max-w-2xl">
                  <p className="text-[#16a34a] text-sm font-semibold uppercase tracking-widest mb-3">
                    Welcome to Los Listos Realty
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    Your home in <span className="text-[#16a34a]">California</span> awaits.
                  </h1>
                  <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                    We are your trusted team for buying the property of your dreams. We speak Spanish, understand your family, and know the market.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push('/contact')
                }}
                className="w-full max-w-sm bg-[#111827] border border-[#374151] rounded-xl p-6 sm:p-8 shadow-sm"
              >
                <h2 className="text-white font-bold text-lg mb-1">Get Pre-Qualified</h2>
                <p className="text-gray-300 text-sm mb-6">See what you can afford in minutes.</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="income" className="block text-gray-200 text-sm font-medium mb-1.5">
                      Annual Income
                    </label>
                    <input
                      id="income"
                      name="income"
                      type="number"
                      min="0"
                      placeholder="$75,000"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="downPayment" className="block text-gray-200 text-sm font-medium mb-1.5">
                      Down Payment
                    </label>
                    <input
                      id="downPayment"
                      name="downPayment"
                      type="number"
                      min="0"
                      placeholder="$20,000"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="creditScore" className="block text-gray-200 text-sm font-medium mb-1.5">
                      Credit Score
                    </label>
                    <input
                      id="creditScore"
                      name="creditScore"
                      type="number"
                      min="300"
                      max="850"
                      placeholder="700"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-lg text-sm transition-colors"
                >
                  Get in touch with an agent today!
                </button>
              </form>
            </div>

            {/* Branding */}
            <div className="w-full max-w-2xl lg:max-w-none grid grid-cols-2 sm:grid-cols-4 border-l border-t border-gray-300">
              {BADGES.map((badge) => (
                <div key={badge.label} className="flex flex-col items-center text-center gap-3 bg-gray-100 border-r border-b border-gray-300 px-4 py-6">
                  <div className="w-11 h-11 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {badge.icon}
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-sm leading-snug">{badge.label}</p>
                </div>
              ))}
            </div>

            <section>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[#16a34a] text-sm font-semibold uppercase tracking-widest mb-1">Available Now</p>
                  <h2 className="text-3xl font-black text-gray-900">Featured Properties</h2>
                </div>
                <Link href="/properties" className="text-[#16a34a] hover:text-[#15803d] text-sm font-medium transition-colors hidden sm:block">
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="mt-8 sm:hidden text-center">
                <Link href="/properties" className="text-[#16a34a] hover:text-[#15803d] text-sm font-medium transition-colors">
                  View all properties →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="-mt-20">
        <Footer />
      </div>
    </div>
  )
}
