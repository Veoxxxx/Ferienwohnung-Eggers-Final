import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DarkModeProvider } from "@/components/dark-mode-provider";
import { generateVacationRentalSchema } from "@/lib/metadata";

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

export const metadata: Metadata = {
    title: "Ferienwohnung Eggers",
    description:
        "Moderne Ferienwohnung in Cuxhaven Sahlenburg mit Platz für bis zu 6 Gäste. Ruhige Lage, etwa 1000 Meter zum Wattenmeer Strand. Hundefreundlich und weitgehend barrierefrei.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const schema = generateVacationRentalSchema();

    return (
        <html lang="de" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable}`}>
                <DarkModeProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navigation />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </DarkModeProvider>
            </body>
        </html>
    );
}
