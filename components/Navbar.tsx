'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const showLogout = pathname !== '/admin/login'

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <nav className="bg-[#111827] border-b border-[#374151] sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex items-center gap-1">
              <span className="text-[#16a34a] font-black text-2xl tracking-tight">LOS</span>
              <span className="text-white font-black text-2xl tracking-tight">LISTOS</span>
              <span className="text-[#dc2626] font-black text-2xl tracking-tight">•</span>
            </span>
            <span className="text-gray-400 text-xs font-medium uppercase tracking-widest hidden sm:block">Realty</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Contact
            </Link>
            <Link
              href="/properties"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              View Properties
            </Link>
            <Link
              href="/admin"
              className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Admin
            </Link>
            {showLogout && (
              <button
                onClick={handleLogout}
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[#374151] py-4 space-y-2">
            <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1f2937] rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1f2937] rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
            <Link href="/properties" onClick={() => setOpen(false)} className="block mx-3 mt-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors text-center">
              View Properties
            </Link>
            <Link href="/admin" onClick={() => setOpen(false)} className="block mx-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors text-center">
              Admin
            </Link>
            {showLogout && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-[#ef4444] hover:text-white hover:bg-[#dc2626]/20 rounded-md text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
