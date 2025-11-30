import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { siteContent } from "@/lib/content";
import { Heart, Users, Home, Leaf, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import Image from "next/image";
import Link from "next/link";

export const metadata = genMeta({
    title: "Über uns",
    description:
        "Lernen Sie Familie Eggers kennen – Ihre Gastgeber in Cuxhaven-Sahlenburg. Persönliche Betreuung und Liebe zum Detail seit vielen Jahren.",
    path: "/ueber-uns",
});

const values = [
    {
        icon: Heart,
        title: "Persönliche Betreuung",
        description: "Wir sind für Sie da – vor, während und nach Ihrem Aufenthalt. Ihre Zufriedenheit liegt uns am Herzen."
    },
    {
        icon: Home,
        title: "Liebe zum Detail",
        description: "Jedes Detail in unserer Ferienwohnung wurde mit Bedacht gewählt, damit Sie sich rundum wohlfühlen."
    },
    {
        icon: Users,
        title: "Lokale Verbundenheit",
        description: "Als Einheimische teilen wir gerne unsere Geheimtipps für die schönsten Orte in Sahlenburg und Umgebung."
    },
    {
        icon: Leaf,
        title: "Nachhaltigkeit",
        description: "Wir achten auf umweltbewusstes Handeln und setzen auf regionale Produkte und Ressourcenschonung."
    }
];

export default function UeberUnsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/surroundings/beach-sunset.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Über uns</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Herzlich willkommen! Wir sind Familie Eggers und freuen uns, 
                            Sie in unserer Ferienwohnung in Cuxhaven-Sahlenburg begrüßen zu dürfen.
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
                                Willkommen bei Familie Eggers
                            </h2>
                            
                            <div className="prose dark:prose-invert text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-4">
                                <p>
                                    Die Liebe zur Nordsee begleitet unsere Familie schon seit Generationen. 
                                    Als wir vor einigen Jahren die Möglichkeit bekamen, eine Ferienwohnung 
                                    in Sahlenburg einzurichten, war für uns sofort klar: Hier möchten wir 
                                    anderen Menschen einen Ort der Erholung schaffen.
                                </p>
                                <p>
                                    Was als kleines Projekt begann, wurde schnell zu einer Herzensangelegenheit. 
                                    Mit viel Liebe zum Detail haben wir jeden Raum gestaltet – immer mit dem 
                                    Gedanken, was wir uns selbst im Urlaub wünschen würden: Gemütlichkeit, 
                                    Komfort und die perfekte Mischung aus Ruhe und Abenteuer.
                                </p>
                                <p>
                                    Heute freuen wir uns über jeden Gast, der bei uns ankommt und die 
                                    einzigartige Atmosphäre von Sahlenburg entdeckt. Ob beim Wattwandern, 
                                    bei Spaziergängen durch den Wernerwald oder einfach beim Entspannen 
                                    auf der Terrasse – wir wünschen Ihnen unvergessliche Momente.
                                </p>
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
                                                Bild der Gastgeber
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-2xl font-serif font-bold text-luxury-navy-900 dark:text-luxury-sand-100 mb-2">
                                        Familie Eggers
                                    </h3>
                                    <p className="text-luxury-navy-600 dark:text-slate-400">
                                        Ihre Gastgeber in Sahlenburg
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-luxury-sand-200 dark:border-luxury-navy-700">
                                        <p className="text-sm text-luxury-navy-500 dark:text-slate-500 italic">
                                            „Wir möchten, dass Sie sich bei uns wie zu Hause fühlen – 
                                            nur mit besserem Blick auf die Nordsee."
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
                            Unsere Werte
                        </h2>
                        <p className="text-luxury-navy-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Was uns als Gastgeber ausmacht und was Sie bei uns erwarten können.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <AnimatedSection key={index} delay={index * 0.1}>
                                    <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-luxury-navy-900">
                                        <CardContent className="p-6 text-center">
                                            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 mb-4">
                                                <Icon className="h-7 w-7 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                            </div>
                                            <h3 className="font-serif font-bold text-xl mb-3 text-luxury-navy-900 dark:text-luxury-sand-100">
                                                {value.title}
                                            </h3>
                                            <p className="text-luxury-navy-600 dark:text-slate-400 text-sm leading-relaxed">
                                                {value.description}
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
                            Haben Sie Fragen?
                        </h2>
                        <p className="text-xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto">
                            Wir freuen uns auf Ihre Nachricht und beraten Sie gerne persönlich 
                            zu Ihrem geplanten Aufenthalt.
                        </p>
                        <Link href="/kontakt">
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-luxury-navy-900 text-lg px-8"
                            >
                                Kontakt aufnehmen
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

