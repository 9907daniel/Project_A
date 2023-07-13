/* istanbul ignore file */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const OAUTH_REDIRECT_URL = '/auth/login/oauth'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
