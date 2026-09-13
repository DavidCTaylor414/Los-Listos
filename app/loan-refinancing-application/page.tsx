'use client'

import { useState } from 'react'
import Link from 'next/link'
import HomeShell from '@/components/HomeShell'

const LOAN_TYPES = [
  'New Home Purchase Loan',
  'Rate-and-Term Refinance',
  'Cash-Out Refinance',
  'Home Equity Line of Credit (HELOC)',
]

const PROPERTY_TYPES = ['Primary Residence', 'Second Home', 'Investment Property']

export default function LoanRefinancingApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loanType, setLoanType] = useState('')
  const isRefinance = loanType.toLowerCase().includes('refinance') || loanType.includes('HELOC')

  return (
    <HomeShell>
      <div className="max-w-3xl mx-auto">
        <p className="text-[#16a34a] text-sm font-semibold uppercase tracking-widest mb-3 text-center lg:text-left">
          Loans &amp; Refinancing
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight text-center lg:text-left">
          Loan &amp; Refinancing Application
        </h1>
        <p className="text-gray-600 text-lg mt-4 leading-relaxed text-center lg:text-left">
          Whether you&apos;re buying, lowering your rate, or tapping into your home&apos;s equity, tell us a bit about your goals and a Los Listos loan specialist will follow up with your options.
        </p>

        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
          {['Competitive Rates', 'Fast Pre-Approval', 'No Obligation Quote'].map((perk) => (
            <span
              key={perk}
              className="inline-flex items-center gap-2 bg-[#16a34a]/10 text-[#15803d] text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {perk}
            </span>
          ))}
        </div>

        {submitted ? (
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#16a34a]/10 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Application received!</h2>
            <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
              Thank you for applying with Los Listos Realty. A loan specialist will reach out within one business day to review your options and current rates.
            </p>
            <Link
              href="/home"
              className="inline-block mt-6 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 px-6 rounded-lg text-sm transition-colors"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8"
          >
            {/* Personal Information */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Jane A. Doe"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane.doe@email.com"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(210) 555-0100"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Loan Details</h2>
              <div>
                <label htmlFor="loanType" className="block text-gray-700 text-sm font-medium mb-1.5">
                  What are you looking to do?
                </label>
                <select
                  id="loanType"
                  name="loanType"
                  required
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                >
                  <option value="" disabled>Select an option</option>
                  {LOAN_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {isRefinance && (
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="currentLender" className="block text-gray-700 text-sm font-medium mb-1.5">
                      Current Lender
                    </label>
                    <input
                      id="currentLender"
                      name="currentLender"
                      type="text"
                      placeholder="Acme Mortgage Co."
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentBalance" className="block text-gray-700 text-sm font-medium mb-1.5">
                      Current Loan Balance
                    </label>
                    <input
                      id="currentBalance"
                      name="currentBalance"
                      type="number"
                      min="0"
                      placeholder="$220,000"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentRate" className="block text-gray-700 text-sm font-medium mb-1.5">
                      Current Interest Rate (%)
                    </label>
                    <input
                      id="currentRate"
                      name="currentRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="6.75"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="estimatedValue" className="block text-gray-700 text-sm font-medium mb-1.5">
                      Estimated Property Value
                    </label>
                    <input
                      id="estimatedValue"
                      name="estimatedValue"
                      type="number"
                      min="0"
                      placeholder="$350,000"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Financial Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="annualIncome" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Annual Income
                  </label>
                  <input
                    id="annualIncome"
                    name="annualIncome"
                    type="number"
                    min="0"
                    placeholder="$85,000"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="creditScore" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Estimated Credit Score
                  </label>
                  <input
                    id="creditScore"
                    name="creditScore"
                    type="number"
                    min="300"
                    max="850"
                    placeholder="720"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="desiredAmount" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Desired Loan Amount
                  </label>
                  <input
                    id="desiredAmount"
                    name="desiredAmount"
                    type="number"
                    min="0"
                    placeholder="$300,000"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    defaultValue=""
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  >
                    <option value="" disabled>Select property type</option>
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Property */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Property Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1.5">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="San Antonio"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-1.5">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="TX"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="notes" className="block text-gray-700 text-sm font-medium mb-1.5">
                  Additional Comments
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Anything else we should know about your loan or refinancing goals?"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-lg text-sm transition-colors"
            >
              Submit Application
            </button>

            <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
              This application is a starting point for pre-qualification only and does not constitute a formal loan application or commitment to lend. Final rate and terms are subject to full underwriting and verification of income, assets, and creditworthiness.
            </p>
          </form>
        )}
      </div>
    </HomeShell>
  )
}
