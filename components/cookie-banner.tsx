"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations("CookieBanner");

    useEffect(() => {
        // Prüfen ob der Nutzer bereits zugestimmt hat
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Kleine Verzögerung für bessere UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        localStorage.setItem("cookie-consent-date", new Date().toISOString());
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container-custom max-w-4xl">
                <div className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white rounded-xl shadow-2xl border border-luxury-navy-800 p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-start gap-3 flex-1">
                            <Cookie className="h-6 w-6 text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-serif font-bold text-lg mb-1">
                                    {t("title")}
                                </h3>
                                <p className="text-sm text-luxury-sand-100 leading-relaxed">
                                    {t("text")}{" "}
                                    <Link
                                        href="/datenschutz"
                                        className="underline hover:text-luxury-sand-400 transition-colors"
                                    >
                                        {t("privacyLink")}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button
                                onClick={acceptCookies}
                                className="flex-1 md:flex-none px-6 py-2.5 bg-luxury-sand-400 hover:bg-luxury-sand-500 text-luxury-navy-900 font-medium rounded-lg transition-colors"
                            >
                                {t("accept")}
                            </button>
                            <button
                                onClick={acceptCookies}
                                className="p-2 hover:bg-luxury-navy-800 rounded-lg transition-colors"
                                aria-label={t("close")}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

