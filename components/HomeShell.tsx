'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

const PHRASES = [
  "Find your home… We're ready.",
  'Your agent, your family.',
  'Simple. Safe. Secure.',
]

const INTERVAL_MS = 5000
const FADE_MS = 400

const SERVICES = [
  { title: 'Sell your home', description: 'Get a free valuation and list with a trusted local agent.', cta: 'Speak with an agent' },
  { title: 'Homes in your area', description: 'Browse available listings near you.', cta: 'Browse listings' },
  { title: 'Pre-approved Loans', description: 'Get pre-approved and know your budget before you shop.', cta: 'Speak with an agent' },
  { title: 'VA and first time buyer programs', description: 'Special programs and down payment assistance for veterans and first-time buyers.', cta: 'Speak with an agent' },
  { title: 'refinance your house', description: "Lower your rate or tap into your home's equity.", cta: 'Speak with an agent' },
]

export default function HomeShell({ children, sidebar = false }: { children: ReactNode; sidebar?: boolean }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [openService, setOpenService] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-white bg-[#1e293b] hover:bg-[#334155] transition-colors"
            >
              {service.title}
              <svg
                className={`w-5 h-5 flex-shrink-0 text-gray-300 transition-transform ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="px-6 pt-3 pb-6 bg-[#1e293b] space-y-4">
                <p className="text-base text-gray-300 leading-relaxed">{service.description}</p>
                {service.cta === 'Speak with an agent' ? (
                  <Link
                    href="/contact"
                    className="inline-block text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg px-4 py-2.5 transition-colors"
                  >
                    {service.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg px-4 py-2.5 transition-colors"
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
        <Link href="/home" className="flex items-center gap-1">
          <span className="text-[#16a34a] font-black text-2xl tracking-tight">LOS</span>
          <span className="text-white font-black text-2xl tracking-tight">LISTOS</span>
          <span className="text-[#dc2626] font-black text-2xl tracking-tight">•</span>
        </Link>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-md h-8 items-center justify-center overflow-hidden text-center px-4">
          <p
            className={`text-base sm:text-lg font-bold text-white leading-tight transition-all duration-[400ms] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {PHRASES[index]}
          </p>
        </div>

        {sidebar && (
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
        )}
      </header>

      {sidebar && mobileMenuOpen && (
        <div className="lg:hidden sticky top-0 z-30 bg-white max-h-[70vh] overflow-y-auto">{quickLinksList}</div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row items-start relative">
        {sidebar && (
          <>
            {/* Decorative fill so the dark panel visually extends the full column height behind the sticky links */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-80 bg-[#1e293b] pointer-events-none" aria-hidden="true" />

            {/* Quick Links — sidebar, flush left, sticky below the header */}
            <div className="hidden lg:block relative z-10 lg:w-80 lg:flex-shrink-0 lg:sticky lg:top-0 bg-[#1e293b] shadow-[8px_0_24px_rgba(0,0,0,0.25)]">
              <div className="px-6 pt-6 pb-3">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/stock_RE_agent.jpg"
                    alt="Real estate agent"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {quickLinksList}
            </div>
          </>
        )}

        {/* Content column */}
        <div className="w-full flex-1 px-6 py-8 sm:px-10 sm:py-10">{children}</div>
      </div>

      <div className="-mt-20">
        <Footer />
      </div>
    </div>
  )
}
