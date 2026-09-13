import Link from 'next/link'
import HomeShell from '@/components/HomeShell'

const TESTIMONIALS = [
  {
    name: 'Maria G.',
    location: 'San Antonio, TX',
    rating: 5,
    quote: "Los Listos made buying our first home so easy. They walked us through everything in Spanish and English, and the closing costs were way lower than we expected. We couldn't be happier.",
  },
  {
    name: 'Carlos R.',
    location: 'Houston, TX',
    rating: 5,
    quote: "As a veteran, I didn't think I could buy a home with $0 down. Our agent got us into the VA loan program and explained every step. Smoothest home purchase I've ever had.",
  },
  {
    name: 'Ana M.',
    location: 'Dallas, TX',
    rating: 4,
    quote: 'Great experience overall. The team was responsive and knowledgeable about first-time buyer programs. Only reason it\'s not five stars is the paperwork took a little longer than expected.',
  },
  {
    name: 'Roberto V.',
    location: 'El Paso, TX',
    rating: 5,
    quote: 'We refinanced our home with Los Listos and saved almost $300 a month. The whole process was transparent and they found us a rate we didn\'t think was possible.',
  },
  {
    name: 'Jennifer L.',
    location: 'Austin, TX',
    rating: 5,
    quote: 'From the first phone call to closing day, everyone at Los Listos treated us like family. They found us the perfect starter home near great schools within our budget.',
  },
  {
    name: 'David K.',
    location: 'Fort Worth, TX',
    rating: 4,
    quote: 'Solid team, good communication throughout. We were nervous about qualifying with our credit score, but they found a program that worked for us.',
  },
  {
    name: 'Sofia H.',
    location: 'Plano, TX',
    rating: 5,
    quote: 'Selling our home with Los Listos was stress-free. They handled the listing, negotiations, and closing while keeping us informed every step of the way. Highly recommend!',
  },
  {
    name: 'Michael T.',
    location: 'San Antonio, TX',
    rating: 5,
    quote: 'The lowest closing costs of any lender we talked to, and the agent actually picked up the phone every time we called. That kind of service is rare these days.',
  },
  {
    name: 'Elena P.',
    location: 'Houston, TX',
    rating: 4,
    quote: 'We used the down payment assistance program and it made all the difference. Would have given five stars but wish the online portal was a bit easier to use.',
  },
  {
    name: 'James W.',
    location: 'Dallas, TX',
    rating: 5,
    quote: 'Bilingual, patient, and genuinely cared about finding us the right house instead of just closing a deal. Our family will use Los Listos for every home we buy from now on.',
  },
  {
    name: 'Isabella C.',
    location: 'Austin, TX',
    rating: 5,
    quote: 'I was a first-time buyer and had no idea where to start. Los Listos explained every program available to me and got me into a home $10,000 under budget.',
  },
  {
    name: 'Robert S.',
    location: 'El Paso, TX',
    rating: 4,
    quote: 'Professional, honest, and upfront about costs from day one. No surprises at closing, which is exactly what you want when buying a home.',
  },
]

const AVATAR_COLORS = ['bg-[#16a34a]', 'bg-[#111827]', 'bg-[#334155]', 'bg-[#15803d]']

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.9l-5.18 2.54.99-5.77-4.19-4.08 5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const average = TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length

  return (
    <HomeShell>
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#16a34a] text-sm font-semibold uppercase tracking-widest mb-3">
            Client Testimonials
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            What Our Clients Say
          </h1>
          <p className="text-gray-600 text-lg mt-4 leading-relaxed">
            Real stories from families we&apos;ve helped buy, sell, and refinance homes across Texas.
          </p>

          <div className="inline-flex items-center gap-3 mt-6 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
            <span className="text-2xl font-black text-gray-900">{average.toFixed(1)}</span>
            <Stars rating={Math.round(average)} />
            <span className="text-sm text-gray-500 font-medium">
              based on {TESTIMONIALS.length} reviews
            </span>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <svg className="w-7 h-7 text-[#16a34a]/20 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm14 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
              </svg>
              <Stars rating={t.rating} />
              <p className="text-gray-700 text-sm leading-relaxed mt-3 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {initials(t.name)}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 mb-4 bg-[#111827] rounded-2xl px-6 py-12 sm:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to become our next success story?
          </h2>
          <p className="text-gray-300 mt-3 max-w-xl mx-auto">
            Let&apos;s find the right home, loan, or refinance option for your family.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 px-6 rounded-lg text-sm transition-colors"
          >
            Speak with an agent today!
          </Link>
        </div>
      </div>
    </HomeShell>
  )
}
