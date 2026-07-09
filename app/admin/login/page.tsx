'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const WARMUP_HINT_DELAY = 5000  // show "warming up" hint after 5s
const REQUEST_TIMEOUT   = 15000 // abort and prompt retry after 15s

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWarmup, setShowWarmup] = useState(false)
  const warmupTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (warmupTimer.current) clearTimeout(warmupTimer.current) }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setShowWarmup(false)

    warmupTimer.current = setTimeout(() => setShowWarmup(true), WARMUP_HINT_DELAY)

    type Result =
      | { type: 'ok';      res: Response }
      | { type: 'timeout' }
      | { type: 'error';   err: unknown }

    const fetchRace: Promise<Result> = fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => ({ type: 'ok' as const, res }))
      .catch((err) => ({ type: 'error' as const, err }))

    const timeoutRace: Promise<Result> = new Promise((resolve) =>
      setTimeout(() => resolve({ type: 'timeout' }), REQUEST_TIMEOUT)
    )

    const result = await Promise.race([fetchRace, timeoutRace])

    if (warmupTimer.current) clearTimeout(warmupTimer.current)
    setShowWarmup(false)

    if (result.type === 'timeout') {
      setError('The server is starting up — please try signing in again. It usually works on the second attempt.')
    } else if (result.type === 'error') {
      setError('Connection error. Please try again.')
    } else {
      try {
        const data = await result.res.json()
        if (!result.res.ok) {
          setError(data.error ?? 'Login failed. Please try again.')
        } else {
          router.push('/admin')
          return
        }
      } catch {
        setError('Unexpected response. Please try again.')
      }
    }

    setLoading(false)
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

          {error && (
            <p className="text-[#ef4444] text-sm">{error}</p>
          )}

          {showWarmup && !error && (
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <svg className="w-3.5 h-3.5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Server is warming up — you&apos;ll be prompted to retry shortly…
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
