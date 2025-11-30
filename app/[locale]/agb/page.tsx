import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { AlertCircle, FileText, CheckCircle2, CreditCard, Clock, Home, ShieldAlert, Scale } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { siteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Terms.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function AGBPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Terms");

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
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

            <section className="section-padding">
                <div className="container-custom max-w-4xl">
                    <AnimatedSection>
                        <div className="flex items-start gap-4 p-6 bg-luxury-sand-50 dark:bg-luxury-navy-900 border border-luxury-navy-100 dark:border-luxury-navy-800 rounded-lg mb-12">
                            <AlertCircle className="h-6 w-6 text-luxury-navy-600 dark:text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-serif font-bold text-lg text-luxury-navy-900 dark:text-luxury-sand-100 mb-2">
                                    {t("legalNotice.title")}
                                </p>
                                <p className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    {t("legalNotice.text")}
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-8">
                        <AnimatedSection delay={0.1}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <FileText className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("scope.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>{t("scope.text")}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CheckCircle2 className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("contract.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-3">
                                    <p>{t("contract.text")}</p>
                                    <div className="inline-block px-3 py-1 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded border border-luxury-navy-100 dark:border-luxury-navy-800 text-sm font-medium">
                                        {t("contract.minStay", {
                                            nights: siteContent.booking.prices.minimumStay,
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CreditCard className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("prices.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-4">
                                    <div>
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-2">
                                            {t("prices.includedTitle")}
                                        </p>
                                        <ul className="grid sm:grid-cols-2 gap-2">
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />
                                                {t("prices.included.linen")}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />
                                                {t("prices.included.cleaning")}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />
                                                {t("prices.included.utilities")}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />
                                                {t("prices.included.extras")}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg">
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-1">
                                            {t("prices.additionalTitle")}
                                        </p>
                                        <p>
                                            {t("prices.cityTax", {
                                                amount: siteContent.booking.prices.cityTaxPerAdultPerNight.toFixed(2),
                                            })}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShieldAlert className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("cancellation.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="mb-3">{t("cancellation.text")}</p>
                                    <ul className="space-y-2">
                                        <li className="flex justify-between border-b border-luxury-navy-100 dark:border-luxury-navy-800 pb-2">
                                            <span>{t("cancellation.policy.free")}</span>
                                            <span className="font-medium text-luxury-navy-900 dark:text-slate-100">
                                                {t("cancellation.policy.freeAmount")}
                                            </span>
                                        </li>
                                        <li className="flex justify-between border-b border-luxury-navy-100 dark:border-luxury-navy-800 pb-2">
                                            <span>{t("cancellation.policy.partial")}</span>
                                            <span className="font-medium text-luxury-navy-900 dark:text-slate-100">
                                                {t("cancellation.policy.partialAmount")}
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>{t("cancellation.policy.full")}</span>
                                            <span className="font-medium text-luxury-navy-900 dark:text-slate-100">
                                                {t("cancellation.policy.fullAmount")}
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.5}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("checkInOut.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg text-center">
                                            <span className="block text-sm uppercase tracking-wider text-luxury-navy-500 mb-1">
                                                {t("checkInOut.checkIn")}
                                            </span>
                                            <span className="block text-2xl font-serif font-bold text-luxury-navy-900 dark:text-slate-100">
                                                {t("checkInOut.checkInTime")}
                                            </span>
                                        </div>
                                        <div className="p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg text-center">
                                            <span className="block text-sm uppercase tracking-wider text-luxury-navy-500 mb-1">
                                                {t("checkInOut.checkOut")}
                                            </span>
                                            <span className="block text-2xl font-serif font-bold text-luxury-navy-900 dark:text-slate-100">
                                                {t("checkInOut.checkOutTime")}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Home className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("houseRules.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-2">
                                    <p>• {t("houseRules.maxOccupancy")}</p>
                                    <p>• {t("houseRules.dogsWelcome")}</p>
                                    <p>• {t("houseRules.noSmoking")}</p>
                                    <p>• {t("houseRules.quietHours")}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.7}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Scale className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("final.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>{t("final.text")}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}

