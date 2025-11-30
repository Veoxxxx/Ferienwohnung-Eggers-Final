"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./dark-mode-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";

const navigationKeys = [
    { href: "/", labelKey: "home" },
    { href: "/ausstattung", labelKey: "amenities" },
    { href: "/galerie", labelKey: "gallery" },
    { href: "/lage", labelKey: "location" },
    { href: "/preise", labelKey: "prices" },
    { href: "/ueber-uns", labelKey: "about" },
    { href: "/kontakt", labelKey: "contact" },
    { href: "/buchen", labelKey: "booking" },
] as const;

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const t = useTranslations("Navigation");
    const tCommon = useTranslations("Common");

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 transition-all duration-300 border-b",
                scrolled || mobileMenuOpen
                    ? "bg-white/95 dark:bg-luxury-navy-950/95 backdrop-blur-md border-luxury-navy-100 dark:border-luxury-navy-800 shadow-sm py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-serif font-bold text-luxury-navy-900 dark:text-slate-100 hover:text-luxury-navy-700 dark:hover:text-slate-300 transition-colors"
                    >
                        {tCommon("brandName")}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navigationKeys.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href as any}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-luxury-navy-700 dark:hover:text-slate-300 relative py-2",
                                    pathname === item.href
                                        ? "text-luxury-navy-900 dark:text-slate-100"
                                        : "text-luxury-navy-600 dark:text-slate-400"
                                )}
                            >
                                {t(item.labelKey)}
                                {pathname === item.href && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-navy-900 dark:bg-slate-100"
                                    />
                                )}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 transition-colors"
                            aria-label={t("toggleTheme")}
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5 text-luxury-navy-900" />
                            ) : (
                                <Sun className="h-5 w-5 text-slate-100" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-4">
                        {/* Language Switcher for Mobile */}
                        <LanguageSwitcher />
                        
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 transition-colors"
                            aria-label={t("toggleTheme")}
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5 text-luxury-navy-900" />
                            ) : (
                                <Sun className="h-5 w-5 text-slate-100" />
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 transition-colors"
                            aria-label={t("openMenu")}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-luxury-navy-900 dark:text-slate-100" />
                            ) : (
                                <Menu className="h-6 w-6 text-luxury-navy-900 dark:text-slate-100" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="border-t border-luxury-navy-100 dark:border-luxury-navy-800 py-4 mt-4 flex flex-col space-y-2">
                                {navigationKeys.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href as any}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "text-base font-medium transition-colors hover:text-luxury-navy-900 dark:hover:text-slate-100 px-4 py-3 rounded-lg",
                                            pathname === item.href
                                                ? "bg-luxury-navy-50 dark:bg-luxury-navy-900 text-luxury-navy-900 dark:text-slate-100"
                                                : "text-luxury-navy-600 dark:text-slate-400"
                                        )}
                                    >
                                        {t(item.labelKey)}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
