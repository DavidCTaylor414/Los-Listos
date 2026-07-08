import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#374151] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-[#16a34a] font-black text-xl tracking-tight">LOS</span>
              <span className="text-white font-black text-xl tracking-tight">LISTOS</span>
              <span className="text-[#dc2626] font-black text-xl tracking-tight">•</span>
              <span className="text-gray-400 text-xs font-medium uppercase tracking-widest ml-1">Realty</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu agencia de confianza para comprar y vender propiedades en Texas. Hablamos tu idioma.
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Your trusted Texas real estate partner.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#22c55e] text-sm transition-colors">Inicio</Link></li>
              <li><Link href="/propiedades" className="text-gray-400 hover:text-[#22c55e] text-sm transition-colors">Propiedades</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-[#22c55e] text-sm transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#16a34a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (210) 555-0100
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#16a34a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@loslistos.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#16a34a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Texas, USA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#374151] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">© 2026 Los Listos Realty. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#dc2626] rounded-sm"></div>
            <div className="w-4 h-3 bg-white rounded-sm"></div>
            <div className="w-4 h-3 bg-[#16a34a] rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
