import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname === '/home' ||
    pathname === '/contact' ||
    pathname === '/admin/login' ||
    pathname === '/api/contact' ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/api/images/')
  ) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionToken = request.cookies.get('session')

  if (!sessionToken) {
    // The root homepage sends signed-out visitors to the public landing page
    // instead of straight to the login form.
    const destination = pathname === '/' ? '/home' : '/admin/login'
    return NextResponse.redirect(new URL(destination, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internals and static files.
     * This protects /properties, /admin, and any future routes.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
