import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Admin-Routen: Auth-Check
    if (pathname.startsWith('/admin')) {
        // Login-Seite immer erlauben
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }
        
        // Prüfe Session-Cookie
        const token = request.cookies.get('admin-session')?.value;
        
        if (!token) {
            // Keine Session -> Redirect zu Login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        
        // Token vorhanden -> Weiter (Validierung erfolgt serverseitig)
        return NextResponse.next();
    }
    
    // Alle anderen Routen -> next-intl Middleware
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for:
    // - API routes
    // - Next.js internals
    // - Static files (images, fonts, etc.)
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
        // Admin routes
        '/admin/:path*',
    ],
};

