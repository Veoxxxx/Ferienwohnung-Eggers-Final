import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DarkModeProvider } from "@/components/dark-mode-provider";
import { ThemeRegistry } from "@/components/theme-registry";
import { generateVacationRentalSchema } from "@/lib/metadata";
import { siteContent } from "@/lib/content";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        de: "Ferienwohnung Eggers",
        en: "Holiday Apartment Eggers",
    };

    const descriptions: Record<string, string> = {
        de: "Moderne Ferienwohnung in Cuxhaven Sahlenburg mit Platz für bis zu 6 Gäste. Ruhige Lage, etwa 1000 Meter zum Wattenmeer Strand. Hundefreundlich und weitgehend barrierefrei.",
        en: "Modern holiday apartment in Cuxhaven Sahlenburg with space for up to 6 guests. Quiet location, about 1000 meters to the Wadden Sea beach. Dog-friendly and largely barrier-free.",
    };

    return {
        title: titles[locale] || titles.de,
        description: descriptions[locale] || descriptions.de,
        icons: {
            icon: siteContent.general.metadata.icon,
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the locale
    const messages = await getMessages();

    const schema = generateVacationRentalSchema();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </head>
            <body
                className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground transition-colors duration-300`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeRegistry />
                    <DarkModeProvider>
                        <div className="flex flex-col min-h-screen">
                            <Navigation />
                            <main className="flex-grow">{children}</main>
                            <Footer />
                        </div>
                    </DarkModeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

