"use client";

import { useState } from "react";
import { Button } from "./button";
import { calculateNights, calculateTouristTax, formatCurrency } from "@/lib/utils";
import { AlertCircle, Check, Calendar, Users, Info } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

interface BookingFormProps {
    checkIn?: Date;
    checkOut?: Date;
    initialGuestCount?: number;
}

export function BookingForm({ checkIn, checkOut, initialGuestCount = 2 }: BookingFormProps) {
    const t = useTranslations("BookingForm");
    const tCommon = useTranslations("Common");
    const locale = useLocale();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        adults: initialGuestCount,
        children: 0,
        dogsIncluded: false,
        gdprConsent: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
    const touristTax = calculateTouristTax(formData.adults, nights);
    const guestCount = formData.adults + formData.children;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkIn || !checkOut) {
            setErrorMessage(t("errorSelectPeriod"));
            setSubmitStatus("error");
            return;
        }

        if (!formData.gdprConsent) {
            setErrorMessage(t("errorGdpr"));
            setSubmitStatus("error");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    checkIn: checkIn.toISOString(),
                    checkOut: checkOut.toISOString(),
                    guestCount,
                    adults: formData.adults,
                    children: formData.children,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    dogsIncluded: formData.dogsIncluded,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    adults: 2,
                    children: 0,
                    dogsIncluded: false,
                    gdprConsent: false,
                });
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || t("errorGeneric"));
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage(t("errorConnection"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const dateLocale = locale === "de" ? "de-DE" : "en-US";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Summary */}
            {checkIn && checkOut && (
                <div className="bg-luxury-navy-900 dark:bg-luxury-navy-950 p-6 rounded-xl border border-luxury-navy-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Calendar className="w-16 h-16 text-luxury-sand-300 transform -rotate-12" />
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold mb-6 text-luxury-sand-50 flex items-center gap-2">
                        {t("yourBookingRequest")}
                    </h3>
                    
                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center p-3 bg-luxury-sand-500/10 backdrop-blur-sm rounded-lg border border-luxury-sand-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-luxury-sand-500/10 rounded-md text-luxury-sand-300">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-luxury-sand-100">{t("period")}</span>
                            </div>
                            <div className="text-right">
                                <span className="font-medium text-luxury-sand-50 block">
                                    {checkIn.toLocaleDateString(dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric' })} - {checkOut.toLocaleDateString(dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </span>
                                <span className="text-xs text-luxury-sand-300">
                                    {nights} {nights === 1 ? tCommon("night") : tCommon("nightPlural")}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-luxury-sand-500/10 backdrop-blur-sm rounded-lg border border-luxury-sand-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-luxury-sand-500/10 rounded-md text-luxury-sand-300">
                                    <Users className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-luxury-sand-100">{t("guests")}</span>
                            </div>
                            <span className="font-medium text-luxury-sand-50">
                                {guestCount} {guestCount === 1 ? tCommon("person") : tCommon("personPlural")}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 px-1">
                             <div className="flex items-center gap-2 text-xs text-luxury-sand-300">
                                <Info className="h-3 w-3" />
                                <span>{t("touristTaxApprox")}</span>
                             </div>
                             <span className="font-medium text-luxury-sand-50">
                                {formatCurrency(touristTax)}
                             </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t("name")} *
                    </label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t("email")} *
                    </label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {t("phone")}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                    />
                </div>

                {/* Guest Count */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="adults" className="block text-sm font-medium mb-2">
                            {t("adults")} *
                        </label>
                        <input
                            type="number"
                            id="adults"
                            min="1"
                            max="6"
                            required
                            value={formData.adults}
                            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="children" className="block text-sm font-medium mb-2">
                            {t("children")}
                        </label>
                        <input
                            type="number"
                            id="children"
                            min="0"
                            max="5"
                            value={formData.children}
                            onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Dogs */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="dogs"
                        checked={formData.dogsIncluded}
                        onChange={(e) => setFormData({ ...formData, dogsIncluded: e.target.checked })}
                        className="w-4 h-4 rounded border-luxury-navy-300 dark:border-luxury-navy-700 text-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500"
                    />
                    <label htmlFor="dogs" className="text-sm">
                        {t("travelingWithDogs")}
                    </label>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t("message")}
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent resize-none"
                        placeholder={t("messagePlaceholder")}
                    />
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="gdpr"
                        required
                        checked={formData.gdprConsent}
                        onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                        className="w-4 h-4 mt-1 rounded border-luxury-navy-300 dark:border-luxury-navy-700 text-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500"
                    />
                    <label htmlFor="gdpr" className="text-sm text-luxury-navy-600 dark:text-slate-400">
                        {t.rich("gdprText", {
                            privacyLink: (chunks) => (
                                <Link href="/datenschutz" className="text-luxury-navy-900 dark:text-slate-100 underline hover:no-underline">
                                    {t("privacyNotice")}
                                </Link>
                            ),
                        })} *
                    </label>
                </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-green-900 dark:text-green-100">{t("successTitle")}</p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            {t("successText")}
                        </p>
                    </div>
                </div>
            )}

            {submitStatus === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-red-900 dark:text-red-100">{t("errorTitle")}</p>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("submitting") : t("submit")}
            </Button>

            <p className="text-xs text-center text-luxury-navy-600 dark:text-slate-400">
                * {t("requiredFields")}
            </p>
        </form>
    );
}
