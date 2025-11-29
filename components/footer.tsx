import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white pt-16 pb-8 border-t border-luxury-navy-800">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold">Ferienwohnung Eggers</h3>
                        <p className="text-luxury-sand-100 text-sm leading-relaxed">
                            Ihr Rückzugsort an der Nordsee. Genießen Sie Ruhe, Natur und Komfort in Sahlenburg.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-luxury-sand-200">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ausstattung" className="text-slate-300 hover:text-white transition-colors">
                                    Ausstattung
                                </Link>
                            </li>
                            <li>
                                <Link href="/galerie" className="text-slate-300 hover:text-white transition-colors">
                                    Galerie
                                </Link>
                            </li>
                            <li>
                                <Link href="/lage" className="text-slate-300 hover:text-white transition-colors">
                                    Lage & Umgebung
                                </Link>
                            </li>
                            <li>
                                <Link href="/preise" className="text-slate-300 hover:text-white transition-colors">
                                    Preise
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-luxury-sand-200">Kontakt</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-slate-300">
                                <MapPin className="h-5 w-5 text-luxury-sand-400 flex-shrink-0" />
                                <span>
                                    Nordheimstraße 150<br />
                                    27476 Cuxhaven Sahlenburg
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Phone className="h-5 w-5 text-luxury-sand-400 flex-shrink-0" />
                                <a href="tel:+4947211234567" className="hover:text-white transition-colors">
                                    +49 (0) 4721 123 456
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Mail className="h-5 w-5 text-luxury-sand-400 flex-shrink-0" />
                                <a href="mailto:info@ferienwohnung-eggers.de" className="hover:text-white transition-colors">
                                    info@ferienwohnung-eggers.de
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-luxury-sand-200">Rechtliches</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/impressum" className="text-slate-300 hover:text-white transition-colors">
                                    Impressum
                                </Link>
                            </li>
                            <li>
                                <Link href="/datenschutz" className="text-slate-300 hover:text-white transition-colors">
                                    Datenschutz
                                </Link>
                            </li>
                            <li>
                                <Link href="/agb" className="text-slate-300 hover:text-white transition-colors">
                                    AGB
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-luxury-navy-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>© {currentYear} Ferienwohnung Eggers. Alle Rechte vorbehalten.</p>
                    <p className="flex items-center gap-1">
                        Designed with <span className="text-red-400">♥</span> for the North Sea
                    </p>
                </div>
            </div>
        </footer>
    );
}
