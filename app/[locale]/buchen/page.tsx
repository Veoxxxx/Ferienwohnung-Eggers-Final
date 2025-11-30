"use client";

import { useState } from "react";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { PriceSummary } from "@/components/booking/price-summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { AlertCircle, Info, Calendar as CalendarIcon, Clock, Dog, CigaretteOff, Car, ShieldCheck, Sparkles } from "lucide-react";
import { validateMinimumStay } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteContent } from "@/lib/content";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function BuchenPage() {
    const t = useTranslations("Booking");
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
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column: Calendar and Info */}
                        <div className="space-y-8">
                            <AnimatedSection>
                                <Card className="border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-sm bg-white dark:bg-luxury-navy-900">
                                    <CardHeader className="pb-6 border-b border-luxury-sand-50 dark:border-luxury-navy-800 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-800 text-luxury-navy-900 dark:text-luxury-sand-400">
                                                <CalendarIcon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="font-serif text-2xl">
                                                    {t("calendar.title")}
                                                </CardTitle>
                                                <CardDescription className="mt-1 text-base">
                                                    {t("calendar.subtitle")}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-2 sm:p-6">
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
                                            <p className="font-medium text-red-900 dark:text-red-100">
                                                {t("minStayError.title")}
                                            </p>
                                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                                                {t("minStayError.text", {
                                                    nights: siteContent.booking.prices.minimumStay,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )}

                            {/* Booking Conditions & House Rules */}
                            <AnimatedSection delay={0.1}>
                                <div className="bg-luxury-sand-50 dark:bg-luxury-navy-900/50 rounded-2xl p-6 md:p-8 border border-luxury-sand-100 dark:border-luxury-navy-800">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2.5 rounded-xl bg-white dark:bg-luxury-navy-800 text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm">
                                            <Info className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold text-luxury-navy-900 dark:text-luxury-sand-100">
                                            {t("info.title")}
                                        </h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                                        {/* Konditionen */}
                                        <div className="space-y-6">
                                            <h4 className="font-medium text-luxury-navy-900 dark:text-luxury-sand-200 uppercase tracking-wider text-xs border-b border-luxury-sand-200 dark:border-luxury-navy-700 pb-2">
                                                {t("info.conditions")}
                                            </h4>
                                            <ul className="space-y-4">
                                                <li className="flex justify-between items-center group">
                                                    <span className="text-luxury-navy-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                                        <CalendarIcon className="h-4 w-4 text-luxury-sand-400" />
                                                        {t("info.minStay")}
                                                    </span>
                                                    <span className="font-medium text-luxury-navy-900 dark:text-slate-200">
                                                        {siteContent.booking.prices.minimumStay} {t("info.minStay").includes("Nächte") ? "" : "nights"}
                                                    </span>
                                                </li>
                                                <li className="flex justify-between items-center group">
                                                    <span className="text-luxury-navy-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                                        <Info className="h-4 w-4 text-luxury-sand-400" />
                                                        {t("info.cityTax")}
                                                    </span>
                                                    <div className="text-right">
                                                        <span className="font-medium text-luxury-navy-900 dark:text-slate-200 block">
                                                            €{siteContent.booking.prices.cityTaxPerAdultPerNight.toFixed(2).replace(".", ",")}
                                                        </span>
                                                        <span className="text-[10px] text-luxury-navy-400 uppercase tracking-wide">
                                                            {t("info.perPersonPerDay")}
                                                        </span>
                                                    </div>
                                                </li>
                                                <li className="flex justify-between items-center group">
                                                    <span className="text-luxury-navy-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                                        <ShieldCheck className="h-4 w-4 text-luxury-sand-400" />
                                                        {t("info.deposit")}
                                                    </span>
                                                    <span className="font-medium text-luxury-navy-900 dark:text-slate-200">
                                                        {t("info.noDeposit")}
                                                    </span>
                                                </li>
                                                <li className="flex justify-between items-center group pt-2 border-t border-luxury-sand-200/50 dark:border-luxury-navy-700/50">
                                                    <span className="text-luxury-navy-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                                        <Sparkles className="h-4 w-4 text-luxury-sand-400" />
                                                        {t("info.cleaning")}
                                                    </span>
                                                    <div className="text-right">
                                                        <span className="font-medium text-luxury-navy-900 dark:text-slate-200 block">
                                                            €{siteContent.booking.prices.cleaningFee.toFixed(2).replace(".", ",")}
                                                        </span>
                                                        <span className="text-[10px] text-luxury-navy-400 font-medium uppercase tracking-wide">
                                                            {t("info.oneTime")}
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Gut zu wissen */}
                                        <div className="space-y-6">
                                            <h4 className="font-medium text-luxury-navy-900 dark:text-luxury-sand-200 uppercase tracking-wider text-xs border-b border-luxury-sand-200 dark:border-luxury-navy-700 pb-2">
                                                {t("info.goodToKnow")}
                                            </h4>
                                            <ul className="space-y-4">
                                                <li className="flex items-start gap-3">
                                                    <div className="p-1.5 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-md text-luxury-navy-700 dark:text-luxury-sand-400 mt-0.5">
                                                        <Dog className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-luxury-navy-700 dark:text-slate-300 text-sm leading-relaxed">
                                                        {t("info.dogsWelcome")}
                                                        <span className="block text-xs text-luxury-navy-400 mt-0.5">
                                                            (€{siteContent.booking.prices.dogFee.toFixed(2).replace(".", ",")} {t("info.flat")})
                                                        </span>
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="p-1.5 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-md text-luxury-navy-700 dark:text-luxury-sand-400 mt-0.5">
                                                        <CigaretteOff className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-luxury-navy-700 dark:text-slate-300 text-sm leading-relaxed">
                                                        {t("info.noSmoking")}
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="p-1.5 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-md text-luxury-navy-700 dark:text-luxury-sand-400 mt-0.5">
                                                        <Clock className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-luxury-navy-700 dark:text-slate-300 text-sm leading-relaxed">
                                                        {t("info.checkIn")}
                                                        <br />
                                                        {t("info.checkOut")}
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="p-1.5 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-md text-luxury-navy-700 dark:text-luxury-sand-400 mt-0.5">
                                                        <Car className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-luxury-navy-700 dark:text-slate-300 text-sm leading-relaxed">
                                                        {t("info.freeParking")}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Right Column: Price Summary and Booking Form */}
                        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
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
                                <Card className="border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-lg bg-white dark:bg-luxury-navy-900 overflow-hidden">
                                    <CardHeader
                                        className={
                                            selectedStartDate && selectedEndDate && !minStayError
                                                ? "bg-luxury-sand-50/50 dark:bg-luxury-navy-800/50 border-b border-luxury-sand-100 dark:border-luxury-navy-800"
                                                : ""
                                        }
                                    >
                                        <CardTitle className="font-serif text-2xl">
                                            {t("form.title")}
                                        </CardTitle>
                                        <CardDescription>
                                            {selectedStartDate && selectedEndDate && !minStayError
                                                ? t("form.readySubtitle")
                                                : t("form.startSubtitle")}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {selectedStartDate && selectedEndDate && !minStayError ? (
                                            <BookingForm
                                                checkIn={selectedStartDate}
                                                checkOut={selectedEndDate}
                                                initialGuestCount={guestCount}
                                            />
                                        ) : (
                                            <div className="text-center py-16 px-4 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-luxury-sand-200 dark:border-luxury-navy-700 rounded-xl bg-luxury-sand-50/30 dark:bg-luxury-navy-950/30">
                                                <div className="h-16 w-16 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center mb-4 text-luxury-navy-300 dark:text-luxury-navy-600">
                                                    <CalendarIcon className="h-8 w-8" />
                                                </div>
                                                <h3 className="text-lg font-medium text-luxury-navy-900 dark:text-slate-200 mb-2">
                                                    {t("form.noDateSelected")}
                                                </h3>
                                                <p className="text-luxury-navy-500 dark:text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
                                                    {t("form.selectDateHint")}
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <AnimatedSection delay={0.5} className="mt-20">
                        <div className="relative overflow-hidden rounded-2xl bg-luxury-navy-900 dark:bg-luxury-navy-950 p-8 md:p-12 text-center text-white shadow-xl">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-luxury-sand-500/10 blur-3xl" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-luxury-sand-100">
                                    {t("questions.title")}
                                </h3>
                                <p className="text-luxury-sand-200/80 mb-8 text-lg leading-relaxed">
                                    {t("questions.text")}
                                </p>
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-base font-medium rounded-lg text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                                >
                                    {t("questions.cta")}
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

