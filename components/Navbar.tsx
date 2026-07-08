'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-[#111827] border-b border-[#374151] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Inicio
            </Link>
            <Link href="/propiedades" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Propiedades
            </Link>
            <Link href="/contacto" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Contacto
            </Link>
            <Link
              href="/propiedades"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Ver Propiedades
            </Link>
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
              Inicio
            </Link>
            <Link href="/propiedades" onClick={() => setOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1f2937] rounded-md text-sm font-medium transition-colors">
              Propiedades
            </Link>
            <Link href="/contacto" onClick={() => setOpen(false)} className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1f2937] rounded-md text-sm font-medium transition-colors">
              Contacto
            </Link>
            <Link href="/propiedades" onClick={() => setOpen(false)} className="block mx-3 mt-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors text-center">
              Ver Propiedades
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
