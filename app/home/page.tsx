'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { properties } from '@/lib/data'
import PropertyCard from '@/components/PropertyCard'
import HomeShell from '@/components/HomeShell'

const BADGES = [
  {
    label: '$0 Down VA Loan',
    href: '/va-loan-application',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    ),
  },
  {
    label: 'Govt programs for first time buyers',
    href: '/first-time-buyer-application',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    label: 'Loan and refinancing services',
    href: '/loan-refinancing-application',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    ),
  },
  {
    label: 'Low closing costs',
    href: '/testimonials',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
]

const BADGE_CLASS =
  'flex flex-col items-center text-center gap-3 bg-gray-100 border border-gray-300 rounded-2xl px-4 py-6 cursor-pointer transition-all duration-200 ease-out hover:scale-105 hover:shadow-[8px_8px_16px_rgba(0,0,0,0.25)]'

export default function HomePage() {
  const [showEstimate, setShowEstimate] = useState(false)
  const featured = properties.filter((p) => p.status === 'For Sale').slice(0, 9)

  return (
    <>
      <HomeShell sidebar>
        <div className="max-w-6xl mx-auto flex flex-col items-center lg:items-stretch gap-16">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-10 items-center lg:items-stretch">
            <div className="w-full lg:flex-1 flex flex-col justify-start">
              {/* Hero */}
              <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                <p className="text-[#16a34a] text-sm font-semibold uppercase tracking-widest mb-3">
                  Welcome to Los Listos Realty
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  Your home in <span className="text-[#16a34a]">California</span> awaits.
                </h1>

                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mt-5 mb-3 lg:hidden">
                  <Image
                    src="/stock_RE_agent.jpg"
                    alt="Real estate agent"
                    fill
                    sizes="(max-width: 1024px) 100vw, 0px"
                    className="object-cover"
                  />
                </div>

                <p className="text-gray-600 text-lg mt-3 lg:mt-6 leading-relaxed">
                  We are your trusted team for buying the property of your dreams. We speak Spanish, understand your family, and know the market.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setShowEstimate(true)
              }}
              className="w-[85%] mx-auto lg:w-full lg:max-w-sm lg:mx-0 bg-[#111827] border border-[#374151] rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-white font-bold text-xl text-center mb-1">Get Pre-Qualified</h2>
              <p className="text-gray-300 text-sm text-center mb-6">No personal information required*</p>

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
                    required
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
                    required
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
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-lg text-sm transition-colors"
              >
                Get an estimate now
              </button>
            </form>
          </div>

          {/* Branding */}
          <div className="w-full max-w-2xl lg:max-w-none grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BADGES.map((badge) => {
              const content = (
                <>
                  <div className="w-11 h-11 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {badge.icon}
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-sm leading-snug">{badge.label}</p>
                </>
              )

              return badge.href ? (
                <Link key={badge.label} href={badge.href} className={BADGE_CLASS}>
                  {content}
                </Link>
              ) : (
                <div key={badge.label} className={BADGE_CLASS}>
                  {content}
                </div>
              )
            })}
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
      </HomeShell>

      {showEstimate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowEstimate(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowEstimate(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-[#16a34a]/10 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-gray-600 leading-relaxed">
              Your estimated loan qualification amount is
            </p>
            <p className="text-4xl font-black text-[#16a34a] my-3">$300,000</p>
            <p className="text-gray-600 leading-relaxed mb-6">Would you like to apply now?</p>

            <Link
              href="/contact"
              className="block w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-lg text-sm transition-colors mb-3"
            >
              Speak with an agent today!
            </Link>
            <button
              type="button"
              onClick={() => setShowEstimate(false)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Maybe later
            </button>

            <p className="text-xs text-gray-400 mt-6 leading-relaxed border-t border-gray-100 pt-4">
              This is a pre-qualification estimate only and is not a guarantee of loan approval. Final loan amount is subject to full underwriting and verification of income, assets, and creditworthiness.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
