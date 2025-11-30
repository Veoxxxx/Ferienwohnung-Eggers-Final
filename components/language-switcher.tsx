"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("LanguageSwitcher");

    const switchLocale = (newLocale: "de" | "en") => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1 text-sm font-medium">
            <button
                onClick={() => switchLocale("de")}
                className={cn(
                    "px-2 py-1 rounded transition-colors",
                    locale === "de"
                        ? "text-luxury-navy-900 dark:text-slate-100 bg-luxury-navy-100 dark:bg-luxury-navy-800"
                        : "text-luxury-navy-500 dark:text-slate-400 hover:text-luxury-navy-700 dark:hover:text-slate-300"
                )}
                aria-label="Deutsch"
            >
                {t("de")}
            </button>
            <span className="text-luxury-navy-300 dark:text-luxury-navy-600">|</span>
            <button
                onClick={() => switchLocale("en")}
                className={cn(
                    "px-2 py-1 rounded transition-colors",
                    locale === "en"
                        ? "text-luxury-navy-900 dark:text-slate-100 bg-luxury-navy-100 dark:bg-luxury-navy-800"
                        : "text-luxury-navy-500 dark:text-slate-400 hover:text-luxury-navy-700 dark:hover:text-slate-300"
                )}
                aria-label="English"
            >
                {t("en")}
            </button>
        </div>
    );
}

