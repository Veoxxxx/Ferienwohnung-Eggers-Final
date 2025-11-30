import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for:
    // - API routes
    // - Next.js internals
    // - Static files (images, fonts, etc.)
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
        // However, match all pathnames within `/users`, optionally with a locale prefix
        '/([\\w-]+)?/users/(.+)',
    ],
};

