'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ContactForm() {
  const searchParams = useSearchParams()
  const propertyFromQuery = searchParams.get('propiedad') || ''

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: propertyFromQuery ? `Estoy interesado/a en la propiedad: ${propertyFromQuery}` : '',
    servicio: 'comprar',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-16 h-16 bg-[#16a34a]/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-white mb-2">¡Mensaje Enviado!</h2>
        <p className="text-gray-400 mb-6">Un agente de Los Listos se pondrá en contacto contigo muy pronto.</p>
        <Link href="/propiedades" className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Ver Propiedades
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Teléfono *</label>
          <input
            type="tel"
            name="telefono"
            required
            value={form.telefono}
            onChange={handleChange}
            placeholder="(210) 555-0000"
            className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm font-medium mb-1.5">Correo electrónico *</label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="tu@correo.com"
          className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Ciudad de interés</label>
          <select
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-300 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
          >
            <option value="">Seleccionar ciudad</option>
            <option value="San Antonio">San Antonio</option>
            <option value="Houston">Houston</option>
            <option value="Dallas">Dallas</option>
            <option value="El Paso">El Paso</option>
            <option value="Austin">Austin</option>
            <option value="Otra">Otra</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">¿Qué necesitas?</label>
          <select
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
            className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-300 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
          >
            <option value="comprar">Quiero comprar</option>
            <option value="vender">Quiero vender</option>
            <option value="rentar">Busco renta</option>
            <option value="invertir">Quiero invertir</option>
            <option value="info">Solo quiero información</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm font-medium mb-1.5">Mensaje</label>
        <textarea
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos más sobre lo que buscas..."
          className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3.5 rounded-lg text-sm transition-colors"
      >
        Enviar Mensaje
      </button>

      <p className="text-gray-600 text-xs text-center">
        Al enviar, aceptas que un agente de Los Listos te contacte. Tu información es privada.
      </p>
    </form>
  )
}

export default function ContactoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-widest mb-2">Estamos aquí para ti</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Contáctanos</h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          ¿Listo para dar el siguiente paso? Nuestros agentes hablan español y están listos para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact info */}
        <div className="space-y-5">
          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6">
            <h2 className="text-white font-bold mb-5">Información de Contacto</h2>
            <div className="space-y-4">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: 'Teléfono',
                  value: '(210) 555-0100',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  label: 'Email',
                  value: 'info@loslistos.com',
                },
                {
                  icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                  label: 'Áreas',
                  value: 'San Antonio · Houston · Dallas · El Paso · Austin',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#16a34a]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-gray-300 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111827] border border-[#374151] rounded-xl p-6">
            <h2 className="text-white font-bold mb-3">Horario de Atención</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Lunes – Viernes</span>
                <span className="text-gray-300">8am – 7pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sábado</span>
                <span className="text-gray-300">9am – 5pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Domingo</span>
                <span className="text-[#22c55e]">Con cita previa</span>
              </div>
            </div>
          </div>

          <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-xl p-5">
            <p className="text-[#ef4444] font-semibold text-sm mb-1">¿Urgente?</p>
            <p className="text-gray-400 text-sm">Llámanos directamente al <span className="text-white font-medium">(210) 555-0100</span> — disponible 7 días a la semana.</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#374151] rounded-xl p-7">
          <h2 className="text-white font-bold text-lg mb-6">Envíanos un Mensaje</h2>
          <Suspense fallback={<div className="text-gray-500">Cargando formulario...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
