"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: "de" | "en") => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1 text-sm">
            <button
                onClick={() => switchLocale("de")}
                className={cn(
                    "px-1.5 py-0.5 rounded-sm transition-colors duration-200",
                    locale === "de"
                        ? "font-bold text-luxury-navy-900 dark:text-luxury-sand-50"
                        : "text-gray-400 hover:text-luxury-gold-500 dark:hover:text-luxury-gold-400"
                )}
                aria-label="Deutsch"
                aria-current={locale === "de" ? "true" : undefined}
            >
                DE
            </button>
            <span className="text-gray-300 dark:text-luxury-navy-600 select-none">|</span>
            <button
                onClick={() => switchLocale("en")}
                className={cn(
                    "px-1.5 py-0.5 rounded-sm transition-colors duration-200",
                    locale === "en"
                        ? "font-bold text-luxury-navy-900 dark:text-luxury-sand-50"
                        : "text-gray-400 hover:text-luxury-gold-500 dark:hover:text-luxury-gold-400"
                )}
                aria-label="English"
                aria-current={locale === "en" ? "true" : undefined}
            >
                EN
            </button>
        </div>
    );
}

