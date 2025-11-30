"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Icons } from "@/components/icons";

interface HeroParallaxProps {
    backgroundImage: string;
    altText: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    primaryCtaHref: string;
    secondaryCta: string;
    secondaryCtaHref: string;
}

export function HeroParallax({
    backgroundImage,
    altText,
    headline,
    subheadline,
    primaryCta,
    primaryCtaHref,
    secondaryCta,
    secondaryCtaHref,
}: HeroParallaxProps) {
    const heroRef = useRef<HTMLElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Parallax: Bild bewegt sich langsamer (erzeugt Tiefe)
    const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    // Text bewegt sich mit moderater Geschwindigkeit
    const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    // Fade out beim Scrollen
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={heroRef}
            className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        >
            {/* Background Image mit Parallax-Effekt */}
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ y: heroImageY }}
            >
                <Image
                    src={backgroundImage}
                    alt={altText}
                    fill
                    priority
                    className="object-cover scale-110" // Scale für Parallax-Spielraum
                    sizes="100vw"
                    quality={90}
                />
                {/* Overlay für bessere Lesbarkeit */}
                <div className="absolute inset-0 bg-luxury-navy-950/40 z-10" />
            </motion.div>

            {/* Hero Content mit separatem Parallax */}
            <motion.div
                className="container-custom relative z-20 text-center text-white"
                style={{ y: heroTextY, opacity: heroOpacity }}
            >
                <AnimatedSection>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                        {headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        {subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={primaryCtaHref as "/buchen"}>
                            <Button size="lg" className="min-w-[200px] text-lg">
                                {primaryCta}
                            </Button>
                        </Link>
                        <Link href={secondaryCtaHref as "/galerie"}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="min-w-[200px] text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-luxury-navy-900"
                            >
                                {secondaryCta}
                            </Button>
                        </Link>
                    </div>
                </AnimatedSection>
            </motion.div>

            {/* Scroll Indicator mit Animation */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/80"
                style={{ opacity: heroOpacity }}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <Icons.arrowRight className="h-6 w-6 rotate-90" />
            </motion.div>
        </section>
    );
}

