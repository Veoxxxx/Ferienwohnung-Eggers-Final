"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Icons } from "@/components/icons";
import { useTranslations } from "next-intl";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Icons.star
                    key={i}
                    className={`h-4 w-4 ${
                        i < rating
                            ? "text-luxury-gold fill-luxury-gold"
                            : "text-luxury-sand-300 dark:text-luxury-navy-600"
                    }`}
                />
            ))}
        </div>
    );
}

const reviewKeys = ["review1", "review2", "review3"] as const;

function ReviewCard({
    reviewKey,
    index,
}: {
    reviewKey: (typeof reviewKeys)[number];
    index: number;
}) {
    const t = useTranslations("Testimonials.reviews");

    return (
        <AnimatedSection delay={index * 0.15}>
            <div className="relative h-full bg-white dark:bg-luxury-navy-900 rounded-2xl shadow-sm border border-luxury-sand-200 dark:border-luxury-navy-700 p-6 overflow-hidden group hover:shadow-md transition-shadow duration-300">
                {/* Quote Icon als Dekoration */}
                <Icons.quote className="absolute -top-2 -right-2 h-24 w-24 text-luxury-sand-100 dark:text-luxury-navy-800 opacity-60 rotate-180 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Rating */}
                    <StarRating rating={5} />

                    {/* Review Text */}
                    <p className="mt-4 text-luxury-navy-700 dark:text-luxury-sand-200 leading-relaxed">
                        "{t(`${reviewKey}.text`)}"
                    </p>

                    {/* Author Info */}
                    <div className="mt-6 pt-4 border-t border-luxury-sand-100 dark:border-luxury-navy-700">
                        <p className="font-serif font-semibold text-luxury-navy-900 dark:text-luxury-sand-100">
                            {t(`${reviewKey}.name`)}
                        </p>
                        <p className="text-sm text-luxury-navy-500 dark:text-luxury-sand-400">
                            {t(`${reviewKey}.date`)}
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

export function Testimonials() {
    const t = useTranslations("Testimonials");

    return (
        <section className="py-24 bg-luxury-sand-50 dark:bg-luxury-navy-950">
            <div className="container-custom">
                {/* Header */}
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-100">
                        {t("headline")}
                    </h2>
                    <p className="text-luxury-navy-600 dark:text-luxury-sand-400 max-w-2xl mx-auto">
                        {t("subheadline")}
                    </p>
                </AnimatedSection>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviewKeys.map((key, index) => (
                        <ReviewCard key={key} reviewKey={key} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
