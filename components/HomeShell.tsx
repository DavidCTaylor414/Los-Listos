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
              {quickLinksList}

              {/* Agent contact card */}
              <div className="mx-6 mt-6 mb-6 bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/stock_RE_agent.jpg"
                    alt="Maria Gonzalez, Los Listos Realty agent"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-900 font-bold text-sm">Maria Gonzalez</p>
                  <p className="text-[#16a34a] text-xs font-semibold uppercase tracking-wide mb-3">Lead Agent</p>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (210) 555-0101
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      maria@loslistos.com
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        123 Main St, Suite 200
                        <br />
                        San Antonio, TX 78205
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
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
