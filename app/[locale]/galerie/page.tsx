import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslations } from "next-intl";
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
    const t = await getTranslations({ locale, namespace: "Gallery.meta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

const categoryKeys = ["living", "sleeping", "surroundings"] as const;

export default async function GaleriePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Gallery");

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

            {/* Gallery Sections */}
            <div className="pb-24">
                {siteContent.pages.gallery.categories.map((category, categoryIndex) => (
                    <section key={category.id} className="section-padding border-b border-luxury-navy-100 dark:border-luxury-navy-800 last:border-none">
                        <div className="container-custom">
                            <AnimatedSection className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-luxury-navy-900 dark:text-luxury-sand-100">
                                    {t(`categories.${categoryKeys[categoryIndex]}.title`)}
                                </h2>
                                <p className="text-luxury-navy-600 dark:text-slate-400 text-lg">
                                    {t(`categories.${categoryKeys[categoryIndex]}.description`)}
                                </p>
                            </AnimatedSection>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                                {category.images.map((image, imageIndex) => (
                                    <AnimatedSection
                                        key={imageIndex}
                                        delay={imageIndex * 0.1}
                                        className={`relative group overflow-hidden rounded-lg shadow-md ${image.span} min-h-[250px]`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                            <p className="text-white font-medium text-sm">{image.alt}</p>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

