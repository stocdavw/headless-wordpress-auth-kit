import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session_token')
    const { pathname } = request.nextUrl

    // Allow static files and public assets
    const publicPaths = ['/login', '/logo.png', '/icon.png', '/favicon.ico']
    const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path))

    // Skip middleware for internal Next.js paths and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Allow all files with extensions
    ) {
        return NextResponse.next()
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|icon.png).*)',
    ],
}
