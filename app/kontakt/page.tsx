"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function KontaktPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "",
        message: "",
        gdprConsent: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.gdprConsent) {
            setErrorMessage("Bitte bestätigen Sie die Datenschutzhinweise");
            setSubmitStatus("error");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus("success");
            setIsSubmitting(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                checkIn: "",
                checkOut: "",
                guests: "",
                message: "",
                gdprConsent: false,
            });
        }, 1000);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/kitchen-dining.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Kontakt</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Wir sind für Sie da. Ob Buchungsanfrage oder individuelle Wünsche –
                            schreiben Sie uns oder rufen Sie einfach an.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Info Side */}
                        <AnimatedSection className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-6 text-luxury-navy-900 dark:text-luxury-sand-100">
                                    Persönlicher Kontakt
                                </h2>
                                <p className="text-luxury-navy-600 dark:text-slate-400 text-lg leading-relaxed">
                                    Als private Gastgeber liegt uns Ihr Wohlbefinden am Herzen. Wir kümmern uns persönlich um Ihre Anliegen
                                    und sorgen dafür, dass Ihr Aufenthalt von Anfang an entspannt verläuft.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm flex-shrink-0">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-lg mb-1">Telefon</h3>
                                            <a href="tel:+4947211234567" className="text-luxury-navy-600 dark:text-slate-300 hover:text-luxury-navy-900 transition-colors">
                                                +49 (0) 4721 123 456
                                            </a>
                                            <p className="text-sm text-luxury-navy-400 mt-1">Mo-So, 9:00 - 20:00 Uhr</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm flex-shrink-0">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-lg mb-1">E-Mail</h3>
                                            <a href="mailto:info@ferienwohnung-eggers.de" className="text-luxury-navy-600 dark:text-slate-300 hover:text-luxury-navy-900 transition-colors">
                                                info@ferienwohnung-eggers.de
                                            </a>
                                            <p className="text-sm text-luxury-navy-400 mt-1">Antwort innerhalb von 24h</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm flex-shrink-0">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-lg mb-1">Anschrift</h3>
                                            <p className="text-luxury-navy-600 dark:text-slate-300">
                                                Ferienwohnung Eggers<br />
                                                Nordheimstraße 150<br />
                                                27476 Cuxhaven-Sahlenburg
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </AnimatedSection>

                        {/* Form Side */}
                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <CardTitle className="font-serif text-2xl">Nachricht senden</CardTitle>
                                    <CardDescription>
                                        Unverbindliche Anfrage oder Frage stellen
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-luxury-navy-700 dark:text-slate-300">Name *</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-luxury-navy-200 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-950 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent transition-all"
                                                    placeholder="Ihr Name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-luxury-navy-700 dark:text-slate-300">E-Mail *</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-luxury-navy-200 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-950 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent transition-all"
                                                    placeholder="ihre@email.de"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-luxury-navy-700 dark:text-slate-300">Nachricht *</label>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border border-luxury-navy-200 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-950 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent transition-all resize-none"
                                                placeholder="Wie können wir Ihnen helfen?"
                                            />
                                        </div>

                                        <div className="flex items-start gap-3 pt-2">
                                            <input
                                                type="checkbox"
                                                id="gdpr"
                                                required
                                                checked={formData.gdprConsent}
                                                onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                                                className="mt-1 h-4 w-4 rounded border-luxury-navy-300 text-luxury-navy-900 focus:ring-luxury-navy-500"
                                            />
                                            <label htmlFor="gdpr" className="text-sm text-luxury-navy-600 dark:text-slate-400">
                                                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden.
                                            </label>
                                        </div>

                                        {submitStatus === "success" && (
                                            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-3">
                                                <Check className="h-5 w-5" />
                                                <span>Nachricht erfolgreich gesendet!</span>
                                            </div>
                                        )}

                                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? "Wird gesendet..." : "Nachricht absenden"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}
