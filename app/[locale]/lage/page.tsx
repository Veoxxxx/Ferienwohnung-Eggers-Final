import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { MapPin, Train, Car, Waves, TreePine, Utensils, Map } from "lucide-react";
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
    const t = await getTranslations({ locale, namespace: "Location.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function LagePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Location");

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

            {/* Content */}
            <section className="section-padding">
                <div className="container-custom">
                    {/* Intro & Distances */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-20">
                        <AnimatedSection>
                            <h2 className="text-3xl font-serif font-bold mb-6 text-luxury-navy-900 dark:text-luxury-sand-100">
                                {t("discover.headline")}
                            </h2>
                            <div className="prose dark:prose-invert text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                <p className="mb-4">{t("discover.text1")}</p>
                                <p className="mb-4">{t("discover.text2")}</p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <Waves className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">{t("distances.beach")}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <TreePine className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">{t("distances.forest")}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <Utensils className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">{t("distances.restaurants")}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <Map className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">{t("distances.center")}</span>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border-none shadow-lg overflow-hidden relative min-h-[400px]">
                                {/* Google Maps Embed */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.5!2d8.6366!3d53.8808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b4419d5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sNordheimstra%C3%9Fe%20150%2C%2027476%20Cuxhaven!5e0!3m2!1sde!2sde!4v1234567890"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full min-h-[400px]"
                                    title={t("map.title")}
                                />

                                {/* Overlay with address info */}
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-luxury-navy-900/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-luxury-navy-900 dark:text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-serif font-bold text-luxury-navy-900 dark:text-white">
                                                {t("map.address")}
                                            </p>
                                            <p className="text-sm text-luxury-navy-600 dark:text-slate-400">
                                                {t("map.city")}
                                            </p>
                                        </div>
                                        <a
                                            href="https://www.google.com/maps/dir/?api=1&destination=Nordheimstraße+150+27476+Cuxhaven"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-luxury-navy-900 dark:text-luxury-sand-400 underline hover:no-underline whitespace-nowrap"
                                        >
                                            {t("map.directions")}
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Arrival */}
                    <AnimatedSection className="mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-8 text-center text-luxury-navy-900 dark:text-luxury-sand-100">
                            {t("arrival.headline")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Car className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle>{t("arrival.byCar.title")}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400">
                                    <p className="mb-4">{t("arrival.byCar.text")}</p>
                                    <p className="text-sm font-medium">{t("arrival.byCar.nav")}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Train className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle>{t("arrival.byTrain.title")}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400">
                                    <p className="mb-4">{t("arrival.byTrain.text")}</p>
                                    <p className="text-sm font-medium">{t("arrival.byTrain.tip")}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

