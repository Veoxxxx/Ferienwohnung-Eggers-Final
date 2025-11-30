import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { AlertCircle, Shield, Eye, Database, Cookie, Globe, UserCheck, Trash2, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der Ferienwohnung Eggers - Informationen zur Datenverarbeitung.",
    path: "/datenschutz",
});

export default function DatenschutzPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Datenschutz</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Hier erfahren Sie, wie wir Ihre Daten verarbeiten.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom max-w-4xl">

                    <AnimatedSection>
                        <div className="flex items-start gap-4 p-6 bg-luxury-sand-50 dark:bg-luxury-navy-900 border border-luxury-navy-100 dark:border-luxury-navy-800 rounded-lg mb-12">
                            <AlertCircle className="h-6 w-6 text-luxury-navy-600 dark:text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-serif font-bold text-lg text-luxury-navy-900 dark:text-luxury-sand-100 mb-2">Rechtlicher Hinweis</p>
                                <p className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    Diese Datenschutzerklärung ist ein Muster und muss vor Produktivbetrieb durch eine rechtlich geprüfte,
                                    auf Ihre spezifische Datenverarbeitung zugeschnittene Version ersetzt werden.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-8">
                        <AnimatedSection delay={0.1}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Shield className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">1. Datenschutz auf einen Blick</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <h3 className="font-bold text-luxury-navy-900 dark:text-slate-100">Allgemeine Hinweise</h3>
                                    <p>
                                        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                                        passiert, wenn Sie diese Website besuchen oder unser Buchungssystem nutzen. Personenbezogene Daten sind
                                        alle Daten, mit denen Sie persönlich identifiziert werden können.
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <UserCheck className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">2. Verantwortlicher</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="mb-4">Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
                                    <div className="bg-luxury-sand-50 dark:bg-luxury-navy-950 p-4 rounded-lg border border-luxury-navy-100 dark:border-luxury-navy-800">
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100">[Name]</p>
                                        <p>Nordheimstraße 150</p>
                                        <p>27476 Cuxhaven Sahlenburg</p>
                                        <p className="mt-2">E-Mail: info@ferienwohnung-eggers.de</p>
                                        <p>Telefon: +49 (0) 4721 123 456</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Database className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">3. Datenerfassung auf dieser Website</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <div>
                                        <h3 className="font-bold text-luxury-navy-900 dark:text-slate-100 mb-2">
                                            Kontaktformular und Buchungsanfragen
                                        </h3>
                                        <p className="mb-3">
                                            Wenn Sie uns per Kontaktformular oder Buchungsanfrage Anfragen zukommen lassen, werden Ihre Angaben
                                            aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                                            Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                                        </p>
                                        <div className="bg-luxury-sand-50 dark:bg-luxury-navy-950 p-4 rounded-lg">
                                            <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-2">Verarbeitete Daten:</p>
                                            <ul className="list-disc ml-5 space-y-1">
                                                <li>Name</li>
                                                <li>E-Mail-Adresse</li>
                                                <li>Telefonnummer (optional)</li>
                                                <li>Reisedaten und Gästeanzahl</li>
                                                <li>Nachrichteninhalt</li>
                                            </ul>
                                        </div>
                                        <p className="mt-3 text-sm">
                                            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-luxury-navy-100 dark:border-luxury-navy-800">
                                        <h3 className="font-bold text-luxury-navy-900 dark:text-slate-100 mb-2">
                                            Server-Log-Dateien
                                        </h3>
                                        <p>
                                            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                                            die Ihr Browser automatisch an uns übermittelt (z.B. Browsertyp, Uhrzeit, IP-Adresse).
                                            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und nach spätestens 7 Tagen gelöscht.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Cookie className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">4. Cookies</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        Unsere Website verwendet Cookies nur, soweit dies technisch notwendig ist (z.B. für die Speicherung
                                        Ihrer Theme-Präferenz [Dark Mode]). Diese Cookies dienen ausschließlich der Funktionalität der Website.
                                        Wir setzen keine Tracking- oder Werbe-Cookies ein.
                                    </p>
                                    <p className="mt-2 text-sm">
                                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Funktion)
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.5}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Globe className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">5. Externe Dienste</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        Wir können für die Verwaltung von Buchungen externe Channel Manager oder Buchungsplattformen
                                        (z.B. Booking.com, Airbnb) nutzen. In diesem Fall erfolgt die Datenverarbeitung auch durch diese
                                        Dienstleister gemäß deren Datenschutzbestimmungen.
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Eye className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">6. Ihre Rechte & Kontakt</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="mb-4">
                                        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
                                        deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
                                        Sperrung oder Löschung dieser Daten.
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg">
                                        <Mail className="h-5 w-5 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <div>
                                            <p className="font-medium text-luxury-navy-900 dark:text-slate-100">Kontakt für Datenschutzanfragen:</p>
                                            <a href="mailto:info@ferienwohnung-eggers.de" className="text-luxury-navy-600 dark:text-slate-300 hover:underline">
                                                info@ferienwohnung-eggers.de
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}
