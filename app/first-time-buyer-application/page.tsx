'use client'

import { useState } from 'react'
import Link from 'next/link'
import HomeShell from '@/components/HomeShell'

const PROGRAMS = [
  'FHA Loan',
  'USDA Rural Development Loan',
  'State/Local First-Time Buyer Program',
  'Down Payment Assistance Grant',
]

export default function FirstTimeBuyerApplicationPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <HomeShell>
      <div className="max-w-3xl mx-auto">
        <p className="text-[#16a34a] text-sm font-semibold uppercase tracking-widest mb-3 text-center lg:text-left">
          First-Time Buyer Assistance
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight text-center lg:text-left">
          Government Programs Application
        </h1>
        <p className="text-gray-600 text-lg mt-4 leading-relaxed text-center lg:text-left">
          Tell us a bit about your situation and a Los Listos loan specialist will match you with FHA, USDA, and local down payment assistance programs you may qualify for.
        </p>

        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
          {['Low Down Payment', 'Down Payment Assistance', 'Flexible Credit Requirements'].map((perk) => (
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
              Thank you for applying with Los Listos Realty. A loan specialist will reach out within one business day to review which first-time buyer programs fit your situation.
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
                  <label htmlFor="dob" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
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

            {/* Eligibility */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Eligibility</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <fieldset>
                  <legend className="block text-gray-700 text-sm font-medium mb-1.5">
                    Have you owned a home in the past 3 years?
                  </legend>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="ownedRecently" value="no" required className="accent-[#16a34a]" />
                      No
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="ownedRecently" value="yes" required className="accent-[#16a34a]" />
                      Yes
                    </label>
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="householdSize" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Household Size
                  </label>
                  <input
                    id="householdSize"
                    name="householdSize"
                    type="number"
                    min="1"
                    placeholder="3"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
              </div>

              <fieldset className="mt-4">
                <legend className="block text-gray-700 text-sm font-medium mb-1.5">
                  Which programs are you interested in?
                </legend>
                <div className="grid sm:grid-cols-2 gap-2">
                  {PROGRAMS.map((program) => (
                    <label key={program} className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" name="programs" value={program} className="accent-[#16a34a]" />
                      {program}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Financial Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="householdIncome" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Annual Household Income
                  </label>
                  <input
                    id="householdIncome"
                    name="householdIncome"
                    type="number"
                    min="0"
                    placeholder="$65,000"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="savedForDownPayment" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Saved for Down Payment
                  </label>
                  <input
                    id="savedForDownPayment"
                    name="savedForDownPayment"
                    type="number"
                    min="0"
                    placeholder="$5,000"
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
                    placeholder="650"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="targetPrice" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Target Home Price
                  </label>
                  <input
                    id="targetPrice"
                    name="targetPrice"
                    type="number"
                    min="0"
                    placeholder="$250,000"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#16a34a] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Property */}
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4">Property Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Desired City
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
                  placeholder="Anything else we should know about your homebuying needs?"
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
              This application is a starting point for pre-qualification only and does not constitute a formal loan application or commitment to lend. Program availability, income limits, and eligibility requirements vary by state and lender and are subject to full underwriting.
            </p>
          </form>
        )}
      </div>
    </HomeShell>
  )
}
