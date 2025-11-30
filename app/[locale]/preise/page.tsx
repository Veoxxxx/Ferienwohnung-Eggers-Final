import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Euro, Info, Sparkles, PawPrint } from "lucide-react";
import { Button } from "@/components/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Link } from "@/i18n/routing";
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
    const t = await getTranslations({ locale, namespace: "Prices.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function PreisePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Prices");

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/kitchen-dining.png')] bg-cover bg-center" />
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

            {/* Pricing Components */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <AnimatedSection>
                            <h2 className="text-3xl font-serif font-bold mb-8 text-luxury-navy-900 dark:text-luxury-sand-100">
                                {t("composition.headline")}
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <Euro className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">
                                            {t("composition.nightlyRate.title")}
                                        </h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            {t("composition.nightlyRate.text")}
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">
                                                {t("composition.nightlyRate.price")}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">
                                            {t("composition.cleaning.title")}
                                        </h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            {t("composition.cleaning.text")}
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">
                                                {t("composition.cleaning.price")}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <PawPrint className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">
                                            {t("composition.dog.title")}
                                        </h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            {t("composition.dog.text")}
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">
                                                {t("composition.dog.price")}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <Info className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">
                                            {t("composition.cityTax.title")}
                                        </h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            {t("composition.cityTax.text")}
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">
                                                {t("composition.cityTax.price")}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="bg-luxury-sand-50 dark:bg-luxury-navy-900 border-none shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="font-serif text-2xl">
                                        {t("example.title")}
                                    </CardTitle>
                                    <CardDescription>{t("example.subtitle")}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-2 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                                            <span>5 × €85,00</span>
                                            <span className="font-medium">€425,00</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                                            <span>{t("example.cleaning")}</span>
                                            <span className="font-medium">€75,00</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                                            <span>{t("example.cityTax", { persons: 2, days: 5 })}</span>
                                            <span className="font-medium">€41,00</span>
                                        </div>
                                        <div className="flex justify-between pt-4">
                                            <span className="font-serif font-bold text-xl">
                                                {t("example.total")}
                                            </span>
                                            <span className="font-serif font-bold text-xl text-luxury-navy-900 dark:text-luxury-sand-400">
                                                €541,00
                                            </span>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-luxury-navy-200 dark:border-luxury-navy-700">
                                            <Link href="/buchen">
                                                <Button className="w-full" size="lg">
                                                    {t("example.cta")}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Conditions Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">
                            {t("conditions.headline")}
                        </h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedSection delay={0.1}>
                            <Card className="h-full border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="mb-2">
                                        {t("conditions.minStay.title")}
                                    </CardTitle>
                                    <CardDescription className="text-base text-luxury-navy-700 dark:text-slate-300">
                                        {t("conditions.minStay.text", {
                                            nights: siteContent.booking.prices.minimumStay,
                                        })}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="mb-2">
                                        {t("conditions.payment.title")}
                                    </CardTitle>
                                    <CardDescription className="text-base text-luxury-navy-700 dark:text-slate-300">
                                        {t("conditions.payment.text")}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="h-full border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="mb-2">
                                        {t("conditions.checkInOut.title")}
                                    </CardTitle>
                                    <CardDescription className="text-base text-luxury-navy-700 dark:text-slate-300 whitespace-pre-line">
                                        {t("conditions.checkInOut.text")}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}

