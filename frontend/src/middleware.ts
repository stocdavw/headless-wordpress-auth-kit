import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session_token')
    const publicPaths = ['/login', '/favicon.ico']
    const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

    if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/static')) {
        return NextResponse.next()
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
