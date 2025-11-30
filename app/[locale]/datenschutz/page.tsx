import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { AlertCircle, Shield, Eye, Database, Cookie, Globe, UserCheck, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Privacy.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function DatenschutzPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Privacy");

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
                                        <Shield className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("overview.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <h3 className="font-bold text-luxury-navy-900 dark:text-slate-100">
                                        {t("overview.subtitle")}
                                    </h3>
                                    <p>{t("overview.text")}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <UserCheck className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("responsible.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="mb-4">{t("responsible.text")}</p>
                                    <div className="bg-luxury-sand-50 dark:bg-luxury-navy-950 p-4 rounded-lg border border-luxury-navy-100 dark:border-luxury-navy-800">
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100">[Name]</p>
                                        <p>Nordheimstraße 150</p>
                                        <p>27476 Cuxhaven Sahlenburg</p>
                                        <p className="mt-2">E-Mail: info@ferienwohnung-eggers.de</p>
                                        <p>Telefon: +49 (0) 4721 123 456</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Database className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("dataCollection.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <div>
                                        <h3 className="font-bold text-luxury-navy-900 dark:text-slate-100 mb-2">
                                            {t("dataCollection.contact.title")}
                                        </h3>
                                        <p className="mb-3">{t("dataCollection.contact.text")}</p>
                                        <div className="bg-luxury-sand-50 dark:bg-luxury-navy-950 p-4 rounded-lg">
                                            <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-2">
                                                {t("dataCollection.contact.dataTitle")}
                                            </p>
                                            <ul className="list-disc ml-5 space-y-1">
                                                <li>{t("dataCollection.contact.data.name")}</li>
                                                <li>{t("dataCollection.contact.data.email")}</li>
                                                <li>{t("dataCollection.contact.data.phone")}</li>
                                                <li>{t("dataCollection.contact.data.travel")}</li>
                                                <li>{t("dataCollection.contact.data.message")}</li>
                                            </ul>
                                        </div>
                                        <p className="mt-3 text-sm">
                                            <strong>{t("dataCollection.contact.legal")}</strong>
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-luxury-navy-100 dark:border-luxury-navy-800">
                                        <h3 className="font-bold text-luxury-navy-900 dark:text-slate-100 mb-2">
                                            {t("dataCollection.serverLogs.title")}
                                        </h3>
                                        <p>{t("dataCollection.serverLogs.text")}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Cookie className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("cookies.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>{t("cookies.text")}</p>
                                    <p className="mt-2 text-sm">
                                        <strong>{t("cookies.legal")}</strong>
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.5}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Globe className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("external.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>{t("external.text")}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Eye className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">
                                            {t("rights.title")}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="mb-4">{t("rights.text")}</p>
                                    <div className="flex items-center gap-3 p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg">
                                        <Mail className="h-5 w-5 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <div>
                                            <p className="font-medium text-luxury-navy-900 dark:text-slate-100">
                                                {t("rights.contactLabel")}
                                            </p>
                                            <a
                                                href="mailto:info@ferienwohnung-eggers.de"
                                                className="text-luxury-navy-600 dark:text-slate-300 hover:underline"
                                            >
                                                info@ferienwohnung-eggers.de
                                            </a>
                                        </div>
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

