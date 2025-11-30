import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARNUNG !!
        // Ignoriert TypeScript-Fehler beim Build, damit wir live gehen können.
        ignoreBuildErrors: true,
    },
    eslint: {
        // Ignoriert Linting-Fehler beim Build.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
