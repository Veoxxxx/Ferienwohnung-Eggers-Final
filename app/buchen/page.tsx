"use client";

import { useState } from "react";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { PriceSummary } from "@/components/booking/price-summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { AlertCircle, Check, Info, Calendar as CalendarIcon } from "lucide-react";
import { validateMinimumStay } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function BuchenPage() {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>();
    const [selectedEndDate, setSelectedEndDate] = useState<Date>();
    const [minStayError, setMinStayError] = useState(false);

    const handleSelectRange = (startDate: Date, endDate: Date) => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);

        // Validate minimum stay
        const isValid = validateMinimumStay(startDate, endDate);
        setMinStayError(!isValid);
    };

    const guestCount = selectedStartDate && selectedEndDate ? 2 : undefined;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Buchungsanfrage</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Sichern Sie sich Ihren Wunschtermin. Prüfen Sie die Verfügbarkeit und senden Sie uns
                            eine unverbindliche Anfrage. Wir antworten schnellstmöglich.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white dark:bg-luxury-navy-950">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column: Calendar and Info */}
                        <div className="space-y-8">
                            <AnimatedSection>
                                <Card className="border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <CalendarIcon className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                            <CardTitle className="font-serif text-2xl">Verfügbarkeit prüfen</CardTitle>
                                        </div>
                                        <CardDescription>
                                            Wählen Sie An- und Abreise im Kalender
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <BookingCalendar
                                            onSelectRange={handleSelectRange}
                                            selectedStartDate={selectedStartDate}
                                            selectedEndDate={selectedEndDate}
                                        />
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            {minStayError && (
                                <AnimatedSection>
                                    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-red-900 dark:text-red-100">Mindestaufenthalt nicht erfüllt</p>
                                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                                                Der Mindestaufenthalt beträgt 3 Nächte. Bitte wählen Sie einen längeren Zeitraum.
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )}

                            {/* Booking Conditions */}
                            <AnimatedSection delay={0.1}>
                                <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Info className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                            <CardTitle className="font-serif text-xl">Konditionen im Überblick</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <div className="flex justify-between items-center pb-3 border-b border-luxury-navy-200 dark:border-luxury-navy-800">
                                            <span className="font-medium">Mindestaufenthalt</span>
                                            <span className="text-luxury-navy-900 dark:text-slate-100">3 Nächte</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-luxury-navy-200 dark:border-luxury-navy-800">
                                            <span className="font-medium">Kurtaxe</span>
                                            <span className="text-luxury-navy-900 dark:text-slate-100">€4,10 / Erwachsener / Tag</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-luxury-navy-200 dark:border-luxury-navy-800">
                                            <span className="font-medium">Kaution</span>
                                            <span className="text-luxury-navy-900 dark:text-slate-100">Keine</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Endreinigung</span>
                                            <span className="text-luxury-navy-900 dark:text-slate-100">Inklusive</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            {/* House Rules */}
                            <AnimatedSection delay={0.2}>
                                <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Check className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                            <CardTitle className="font-serif text-xl">Gut zu wissen</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-luxury-navy-600 dark:text-slate-400">
                                            <li className="flex items-start gap-2">
                                                <span className="text-luxury-navy-900 dark:text-slate-100 font-bold">•</span>
                                                Hunde sind herzlich willkommen
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-luxury-navy-900 dark:text-slate-100 font-bold">•</span>
                                                Nichtraucher im Innenbereich
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-luxury-navy-900 dark:text-slate-100 font-bold">•</span>
                                                Check-in ab 15:00 Uhr, Check-out bis 10:00 Uhr
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-luxury-navy-900 dark:text-slate-100 font-bold">•</span>
                                                Kostenloser Parkplatz direkt am Haus
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>

                        {/* Right Column: Price Summary and Booking Form */}
                        <div className="space-y-6">
                            {/* Price Summary */}
                            <AnimatedSection delay={0.3}>
                                <PriceSummary
                                    checkIn={selectedStartDate || null}
                                    checkOut={selectedEndDate || null}
                                    adults={2}
                                    children={0}
                                    hasDog={false}
                                />
                            </AnimatedSection>

                            {/* Booking Form */}
                            <AnimatedSection delay={0.4}>
                                <Card className="border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                    <CardHeader>
                                        <CardTitle className="font-serif text-2xl">Anfrage senden</CardTitle>
                                        <CardDescription>
                                            {selectedStartDate && selectedEndDate && !minStayError
                                                ? "Bitte ergänzen Sie Ihre Kontaktdaten"
                                                : "Wählen Sie zunächst Ihren Reisezeitraum"}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedStartDate && selectedEndDate && !minStayError ? (
                                            <BookingForm
                                                checkIn={selectedStartDate}
                                                checkOut={selectedEndDate}
                                                initialGuestCount={guestCount}
                                            />
                                        ) : (
                                            <div className="text-center py-12 px-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg border border-dashed border-luxury-navy-200 dark:border-luxury-navy-800">
                                                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-luxury-navy-300 dark:text-luxury-navy-700" />
                                                <p className="text-luxury-navy-600 dark:text-slate-400 font-medium">
                                                    Bitte wählen Sie zuerst An- und Abreise im Kalender aus.
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <AnimatedSection delay={0.5} className="mt-16">
                        <div className="bg-luxury-navy-50 dark:bg-luxury-navy-900 p-8 rounded-xl border border-luxury-navy-100 dark:border-luxury-navy-800 text-center">
                            <h3 className="font-serif text-xl font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-100">Noch Fragen?</h3>
                            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                                Wenn Sie sich unsicher sind oder spezielle Wünsche haben, können Sie uns auch gerne direkt kontaktieren,
                                bevor Sie eine Buchungsanfrage senden.
                            </p>
                            <a href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-luxury-navy-900 hover:bg-luxury-navy-800 dark:bg-luxury-sand-100 dark:text-luxury-navy-900 dark:hover:bg-white transition-colors">
                                Kontakt aufnehmen
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
