"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations("Footer");
    const tGeneral = useTranslations("General");

    return (
        <footer className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white pt-20 pb-10 border-t border-luxury-navy-800">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold">
                            {tGeneral("brandName")}
                        </h3>
                        <p className="text-luxury-sand-100 text-sm leading-relaxed">
                            {tGeneral("description")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-luxury-sand-200">
                            {t("navigation")}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/ausstattung"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("amenities")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/galerie"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("gallery")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lage"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("locationAndSurroundings")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/preise"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("prices")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-luxury-sand-200">
                            {t("contact")}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-x-3 text-slate-300">
                                <MapPin className="h-5 w-5 text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                                <span>
                                    {tGeneral("address.street")}
                                    <br />
                                    {tGeneral("address.zipCity")}
                                </span>
                            </li>
                            <li className="flex items-center gap-x-3 text-slate-300">
                                <Phone className="h-5 w-5 text-luxury-sand-400 flex-shrink-0" />
                                <a
                                    href={`tel:${tGeneral("contact.phoneRaw")}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {tGeneral("contact.phone")}
                                </a>
                            </li>
                            <li className="flex items-center gap-x-3 text-slate-300">
                                <Mail className="h-5 w-5 text-luxury-sand-400 flex-shrink-0" />
                                <a
                                    href={`mailto:${tGeneral("contact.email")}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {tGeneral("contact.email")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-luxury-sand-200">
                            {t("legal")}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/impressum"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("imprint")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/datenschutz"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("privacy")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/agb"
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-x-2"
                                >
                                    {t("terms")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-luxury-navy-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>
                        © {currentYear} {t("copyright")}
                    </p>
                    <p className="flex items-center gap-1">
                        {t("designedWith")} <span className="text-red-400">♥</span> {t("forTheNorthSea")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
