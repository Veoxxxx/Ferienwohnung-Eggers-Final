import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Sofa, Bed, ChefHat, Bath, Trees, Accessibility, AlertCircle, Wifi, Tv, Car, Coffee, Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Amenities.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function AusstattungPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Amenities");

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            {t("hero.headline")}
                        </h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            {t("hero.text")}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Quick Highlights */}
            <section className="py-12 border-b border-luxury-sand-100 dark:border-luxury-navy-800">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 px-4">
                        <AnimatedSection delay={0.1} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Wifi className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">
                                {t("highlights.wifi")}
                            </span>
                        </AnimatedSection>

                        <div className="hidden md:block h-8 w-px bg-luxury-sand-200 dark:bg-luxury-navy-700" />

                        <AnimatedSection delay={0.2} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Car className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">
                                {t("highlights.parking")}
                            </span>
                        </AnimatedSection>

                        <div className="hidden md:block h-8 w-px bg-luxury-sand-200 dark:bg-luxury-navy-700" />

                        <AnimatedSection delay={0.3} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Coffee className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">
                                {t("highlights.kitchen")}
                            </span>
                        </AnimatedSection>

                        <div className="hidden md:block h-8 w-px bg-luxury-sand-200 dark:bg-luxury-navy-700" />

                        <AnimatedSection delay={0.4} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Tv className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">
                                {t("highlights.tv")}
                            </span>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Wohnbereich */}
                        <AnimatedSection>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Sofa className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">{t("living.title")}</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">{t("living.subtitle")}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("living.items.windows")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("living.items.seating")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("living.items.tv")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("living.items.dining")}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Küche */}
                        <AnimatedSection delay={0.1}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <ChefHat className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">{t("kitchen.title")}</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">{t("kitchen.subtitle")}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("kitchen.items.stove")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("kitchen.items.appliances")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("kitchen.items.small")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("kitchen.items.dishes")}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Schlafzimmer 1 */}
                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Bed className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">{t("bedroom1.title")}</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">{t("bedroom1.subtitle")}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bedroom1.items.bed")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bedroom1.items.storage")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bedroom1.items.curtains")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bedroom1.items.accessible")}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Schlafzimmer 2 */}
                        <AnimatedSection delay={0.3}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Bed className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">{t("bedroom2.title")}</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">{t("bedroom2.subtitle")}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bedroom2.items.beds")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bedroom2.items.storage")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed text-amber-700 dark:text-amber-400 font-medium">{t("bedroom2.notice")}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Bad */}
                        <AnimatedSection delay={0.4}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Bath className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">{t("bathroom.title")}</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">{t("bathroom.subtitle")}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bathroom.items.shower")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("bathroom.items.towels")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-luxury-navy-400 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed font-medium">{t("bathroom.notice")}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Terrasse */}
                        <AnimatedSection delay={0.5}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Trees className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">{t("outdoor.title")}</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">{t("outdoor.subtitle")}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("outdoor.items.terrace")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("outdoor.items.umbrella")}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{t("outdoor.items.parking")}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Accessibility Detail */}
                    <div className="mt-16">
                        <AnimatedSection>
                            <Card className="bg-luxury-sand-50 dark:bg-luxury-navy-800 border-none">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Accessibility className="h-8 w-8 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="text-2xl font-serif">{t("accessibility.title")}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-luxury-navy-700 dark:text-slate-300 leading-relaxed">
                                        {t("accessibility.text")}
                                    </p>
                                    <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 inline-block">
                                        <p className="text-sm text-amber-900 dark:text-amber-100 flex gap-2">
                                            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                                            <span>
                                                <strong>{t("accessibility.notice").split(":")[0]}:</strong>
                                                {t("accessibility.notice").split(":").slice(1).join(":")}
                                            </span>
                                        </p>
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

