'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { properties } from '@/lib/data'
import PropertyCard from '@/components/PropertyCard'

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
    label: 'Low closing costs',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    ),
  },
  {
    label: 'No personal information required',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
]

const FIREWORKS = [
  { top: '10%', left: '15%', size: 60, color: '#f472b6', delay: '0s' },
  { top: '20%', left: '70%', size: 80, color: '#facc15', delay: '0.3s' },
  { top: '55%', left: '10%', size: 70, color: '#60a5fa', delay: '0.6s' },
  { top: '65%', left: '85%', size: 90, color: '#4ade80', delay: '0.2s' },
  { top: '35%', left: '45%', size: 50, color: '#f87171', delay: '0.9s' },
  { top: '80%', left: '30%', size: 65, color: '#c084fc', delay: '0.5s' },
  { top: '15%', left: '90%', size: 55, color: '#fb923c', delay: '1.1s' },
  { top: '45%', left: '5%', size: 75, color: '#22d3ee', delay: '0.8s' },
  { top: '85%', left: '60%', size: 60, color: '#facc15', delay: '1.3s' },
  { top: '5%', left: '40%', size: 70, color: '#f472b6', delay: '0.4s' },
]

const FLOATING_EMOJI = [
  { char: '🐱', top: '10%', left: '20%', delay: '0s' },
  { char: '🌈', top: '68%', left: '12%', delay: '0.4s' },
  { char: '🐱', top: '25%', left: '78%', delay: '0.2s' },
  { char: '🌈', top: '55%', left: '62%', delay: '0.6s' },
  { char: '🐱', top: '78%', left: '42%', delay: '0.3s' },
  { char: '🌈', top: '18%', left: '52%', delay: '0.8s' },
  { char: '🐱', top: '48%', left: '8%', delay: '0.5s' },
  { char: '🌈', top: '38%', left: '88%', delay: '0.1s' },
  { char: '🐱', top: '85%', left: '75%', delay: '0.7s' },
  { char: '🌈', top: '5%', left: '85%', delay: '0.9s' },
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
  const [grayOn, setGrayOn] = useState(true)
  const [openService, setOpenService] = useState<number | null>(null)
  const [partyMode, setPartyMode] = useState(false)
  const featured = properties.filter((p) => p.status === 'For Sale').slice(0, 3)

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

  return (
    <div className={`min-h-screen flex flex-col ${grayOn ? 'bg-[#d1d5db]' : 'bg-white'}`}>
      <header className="relative bg-[#111827] border-b border-black px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => setPartyMode(true)}
          tabIndex={-1}
          className="absolute top-0 right-0 w-14 h-full"
        />
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="text-[#16a34a] font-black text-2xl tracking-tight">LOS</span>
            <span className="text-white font-black text-2xl tracking-tight">LISTOS</span>
            <span className="text-[#dc2626] font-black text-2xl tracking-tight">•</span>
          </span>

          <button
            type="button"
            onClick={() => setGrayOn((v) => !v)}
            className="text-xs font-semibold text-gray-300 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-3 py-1.5 transition-colors"
          >
            {grayOn ? 'White background' : 'Gray background'}
          </button>
        </div>

        <div className="w-full max-w-md h-8 flex items-center justify-end overflow-hidden text-right">
          <p
            className={`text-base sm:text-lg font-bold text-white leading-tight transition-all duration-[400ms] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {PHRASES[index]}
          </p>
        </div>
      </header>

      <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 items-center lg:items-stretch">
          <div className="w-full max-w-sm rounded-xl border border-[#111827] overflow-hidden bg-white shadow-sm flex flex-col">
            <div className="bg-[#111827] text-white font-bold text-sm uppercase tracking-widest px-5 py-4">
              Quick Links
            </div>
            <div className="flex-1 divide-y divide-[#111827]/20 bg-[#1e293b]">
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
          </div>

          <div className="w-full max-w-sm flex-1 flex flex-col justify-center gap-4">
            {BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-4 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3.5 shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {badge.icon}
                  </svg>
                </div>
                <p className="text-gray-900 font-bold text-base leading-snug">{badge.label}</p>
              </div>
            ))}
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

        <section className="max-w-6xl mx-auto mt-16">
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

      {partyMode && (
        <div
          onClick={() => setPartyMode(false)}
          className="fixed inset-0 z-[100] bg-black overflow-hidden cursor-pointer"
        >
          {FIREWORKS.map((fw, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-ping"
              style={{
                top: fw.top,
                left: fw.left,
                width: fw.size,
                height: fw.size,
                backgroundColor: fw.color,
                animationDelay: fw.delay,
                animationDuration: '1.6s',
              }}
            />
          ))}

          {FLOATING_EMOJI.map((e, i) => (
            <span
              key={i}
              className="absolute text-5xl sm:text-6xl select-none animate-bounce"
              style={{ top: e.top, left: e.left, animationDelay: e.delay }}
            >
              {e.char}
            </span>
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <p className="text-5xl sm:text-7xl font-black text-yellow-300 animate-pulse text-center drop-shadow-[0_0_25px_rgba(250,204,21,0.9)]">
              WASSUP TERRA!
            </p>
            <p className="mt-8 text-gray-400 text-sm">(tap anywhere to close)</p>
          </div>
        </div>
      )}
    </div>
  )
}
