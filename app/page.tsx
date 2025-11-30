import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { siteContent } from "@/lib/content";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

// Helper for dynamic icons
const featureIcons = {
    Waves: Icons.waves,
    Wifi: Icons.wifi,
    Dog: Icons.dog,
    Coffee: Icons.coffee,
    MapPin: Icons.mapPin,
    Star: Icons.star
};

export const metadata = genMeta({
    title: "Startseite",
    description: siteContent.pages.home.hero.subheadline,
    path: "/",
});

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={siteContent.pages.home.hero.backgroundImage}
                        alt="Strand bei Sonnenuntergang in Cuxhaven-Sahlenburg"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-luxury-navy-950/40 z-10" />
                </div>

                {/* Hero Content */}
                <div className="container-custom relative z-20 text-center text-white">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
                            {siteContent.pages.home.hero.headline}
                        </h1>
                        <p className="text-xl md:text-2xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                            {siteContent.pages.home.hero.subheadline}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/buchen">
                                <Button size="lg" className="min-w-[200px] text-lg">
                                    {siteContent.pages.home.hero.primaryCta}
                                </Button>
                            </Link>
                            <Link href="/galerie">
                                <Button variant="outline" size="lg" className="min-w-[200px] text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-luxury-navy-900">
                                    {siteContent.pages.home.hero.secondaryCta}
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/80">
                    <Icons.arrowRight className="h-6 w-6 rotate-90" />
                </div>
            </section>

            {/* Intro Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                                <Image
                                    src={siteContent.pages.home.intro.image}
                                    alt="Helles Wohnzimmer der Ferienwohnung Eggers mit Sofa und großen Fenstern"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-luxury-sand-50 dark:bg-luxury-navy-800 p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                                <p className="font-serif text-lg text-luxury-navy-900 dark:text-luxury-sand-100 italic">
                                    "{siteContent.pages.home.intro.quote}"
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <h2 className="text-4xl font-serif font-bold mb-6 text-luxury-navy-900 dark:text-luxury-sand-100">
                                {siteContent.pages.home.intro.headline}
                            </h2>
                            <p className="text-lg text-luxury-navy-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {siteContent.pages.home.intro.text}
                            </p>
                            <ul className="space-y-4 mb-8">
                                {siteContent.pages.home.intro.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-luxury-navy-700 dark:text-slate-300">
                                        <Icons.check className="h-5 w-5 text-luxury-navy-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/ausstattung" className="text-luxury-navy-900 dark:text-luxury-sand-400 font-medium hover:underline inline-flex items-center gap-2">
                                Mehr zur Ausstattung <Icons.arrowRight className="h-4 w-4" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-100">
                            {siteContent.pages.home.features.headline}
                        </h2>
                        <p className="text-luxury-navy-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {siteContent.pages.home.features.subheadline}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {siteContent.pages.home.features.items.map((feature, index) => {
                            const Icon = featureIcons[feature.iconName as keyof typeof featureIcons] || Icons.star;
                            return (
                                <AnimatedSection key={index} delay={index * 0.1}>
                                    <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-luxury-navy-950">
                                        <CardContent className="p-6">
                                            <Icon className="h-10 w-10 text-luxury-navy-900 dark:text-luxury-sand-400 mb-4" />
                                            <h3 className="font-serif font-bold text-xl mb-2 text-luxury-navy-900 dark:text-luxury-sand-100">
                                                {feature.title}
                                            </h3>
                                            <p className="text-luxury-navy-600 dark:text-slate-400">
                                                {feature.desc}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Teaser Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8">
                        <AnimatedSection>
                            <div className="group relative overflow-hidden rounded-xl aspect-[16/9]">
                                <Image
                                    src="/images/surroundings/forest-path.png"
                                    alt="Waldweg im Wernerwald nahe der Ferienwohnung Eggers"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h3 className="text-2xl font-serif font-bold mb-2">Lage & Umgebung</h3>
                                    <p className="text-slate-200 mb-4">Entdecken Sie den Wernerwald und das Wattenmeer.</p>
                                    <Link href="/lage">
                                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                            Mehr erfahren
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="group relative overflow-hidden rounded-xl aspect-[16/9]">
                                <Image
                                    src="/images/kitchen-dining.png"
                                    alt="Moderne Küche mit Essbereich in der Ferienwohnung Eggers"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h3 className="text-2xl font-serif font-bold mb-2">Preise & Konditionen</h3>
                                    <p className="text-slate-200 mb-4">Transparent und fair. Keine versteckten Kosten.</p>
                                    <Link href="/preise">
                                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                            Zur Übersicht
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white text-center relative overflow-hidden">
                <Image
                    src="/images/surroundings/beach-sunset.png"
                    alt=""
                    fill
                    className="object-cover opacity-10"
                    sizes="100vw"
                />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            Bereit für Ihre Auszeit?
                        </h2>
                        <p className="text-xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto">
                            Sichern Sie sich jetzt Ihren Wunschtermin in der Ferienwohnung Eggers.
                        </p>
                        <Link href="/buchen">
                            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-luxury-navy-900 text-lg px-8">
                                Jetzt anfragen
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
