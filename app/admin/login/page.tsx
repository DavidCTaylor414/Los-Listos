'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Login failed. Please try again.')
        setLoading(false)
      } else {
        router.push('/admin')
      }
    } catch {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-[#16a34a] font-black text-3xl">LOS</span>
            <span className="text-white font-black text-3xl">LISTOS</span>
            <span className="text-[#dc2626] font-black text-3xl">•</span>
          </div>
          <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-lg px-4 py-3 mb-2">
            <p className="text-[#ef4444] text-sm font-semibold">Site Under Development</p>
            <p className="text-gray-400 text-xs mt-0.5">Admin access only</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111827] border border-[#374151] rounded-xl p-7 space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
              suppressHydrationWarning
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1f2937] border border-[#374151] focus:border-[#16a34a] text-gray-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
              suppressHydrationWarning
            />
          </div>
          {error && <p className="text-[#ef4444] text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
