import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('access_token_virus_scan')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/about-us',
    '/login',
    '/signup',
  ]
}