import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Heart, Users, Home, Leaf, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Link } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

const valueIcons = {
    personal: Heart,
    detail: Home,
    local: Users,
    sustainable: Leaf,
};

type ValueKey = keyof typeof valueIcons;
const valueKeys: ValueKey[] = ["personal", "detail", "local", "sustainable"];

export default async function UeberUnsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("About");

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/surroundings/beach-sunset.png')] bg-cover bg-center" />
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

            {/* Story & Portrait Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Story Side */}
                        <AnimatedSection className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-navy-900 dark:text-luxury-sand-100">
                                {t("story.headline")}
                            </h2>

                            <div className="prose dark:prose-invert text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-4">
                                <p>{t("story.text1")}</p>
                                <p>{t("story.text2")}</p>
                                <p>{t("story.text3")}</p>
                            </div>
                        </AnimatedSection>

                        {/* Portrait Side */}
                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-lg overflow-hidden bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                {/* Portrait Image Placeholder */}
                                <div className="relative aspect-[4/3] bg-gradient-to-br from-luxury-sand-100 to-luxury-sand-200 dark:from-luxury-navy-800 dark:to-luxury-navy-900">
                                    {/* Placeholder Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <Users className="h-20 w-20 text-luxury-navy-300 dark:text-luxury-navy-600 mx-auto mb-4" />
                                            <p className="text-sm text-luxury-navy-400 dark:text-luxury-navy-500 px-8">
                                                {t("portrait.imagePlaceholder")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-2xl font-serif font-bold text-luxury-navy-900 dark:text-luxury-sand-100 mb-2">
                                        {t("portrait.title")}
                                    </h3>
                                    <p className="text-luxury-navy-600 dark:text-slate-400">
                                        {t("portrait.subtitle")}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-luxury-sand-200 dark:border-luxury-navy-700">
                                        <p className="text-sm text-luxury-navy-500 dark:text-slate-500 italic">
                                            {t("portrait.quote")}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-luxury-sand-50 dark:bg-luxury-navy-950">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-100">
                            {t("values.headline")}
                        </h2>
                        <p className="text-luxury-navy-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("values.subheadline")}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueKeys.map((key, index) => {
                            const Icon = valueIcons[key];
                            return (
                                <AnimatedSection key={key} delay={index * 0.1}>
                                    <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-luxury-navy-900">
                                        <CardContent className="p-6 text-center">
                                            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 mb-4">
                                                <Icon className="h-7 w-7 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                            </div>
                                            <h3 className="font-serif font-bold text-xl mb-3 text-luxury-navy-900 dark:text-luxury-sand-100">
                                                {t(`values.${key}.title`)}
                                            </h3>
                                            <p className="text-luxury-navy-600 dark:text-slate-400 text-sm leading-relaxed">
                                                {t(`values.${key}.description`)}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/surroundings/forest-path.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                            {t("cta.headline")}
                        </h2>
                        <p className="text-xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto">
                            {t("cta.text")}
                        </p>
                        <Link href="/kontakt">
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-luxury-navy-900 text-lg px-8"
                            >
                                {t("cta.button")}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

