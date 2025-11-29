"use client";

import { useState } from "react";
import { Button } from "./button";
import { calculateNights, calculateTouristTax, formatCurrency } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";

interface BookingFormProps {
    checkIn?: Date;
    checkOut?: Date;
    initialGuestCount?: number;
}

export function BookingForm({ checkIn, checkOut, initialGuestCount = 2 }: BookingFormProps) {
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
            setErrorMessage("Bitte wählen Sie einen Zeitraum aus");
            setSubmitStatus("error");
            return;
        }

        if (!formData.gdprConsent) {
            setErrorMessage("Bitte bestätigen Sie die Datenschutzhinweise");
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
                setErrorMessage(data.error || "Ein Fehler ist aufgetreten");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Summary */}
            {checkIn && checkOut && (
                <div className="bg-luxury-sand-100 dark:bg-luxury-navy-800 p-6 rounded-lg">
                    <h3 className="font-serif text-xl font-semibold mb-4">Ihre Buchungsanfrage</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-luxury-navy-600 dark:text-slate-400">Zeitraum:</span>
                            <span className="font-medium">
                                {checkIn.toLocaleDateString("de-DE")} - {checkOut.toLocaleDateString("de-DE")}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-luxury-navy-600 dark:text-slate-400">Nächte:</span>
                            <span className="font-medium">{nights}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-luxury-navy-600 dark:text-slate-400">Gäste:</span>
                            <span className="font-medium">{guestCount}</span>
                        </div>
                        <div className="flex justify-between border-t border-luxury-navy-200 dark:border-luxury-navy-700 pt-2 mt-2">
                            <span className="text-luxury-navy-600 dark:text-slate-400">Kurtaxe (ca.):</span>
                            <span className="font-medium">{formatCurrency(touristTax)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-Mail *
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Telefon (optional)
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent"
                    />
                </div>

                {/* Guest Count */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="adults" className="block text-sm font-medium mb-2">
                            Erwachsene *
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
                            Kinder
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
                        Ich reise mit Hund(en)
                    </label>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Nachricht (optional)
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-luxury-navy-300 dark:border-luxury-navy-700 bg-white dark:bg-luxury-navy-900 focus:ring-2 focus:ring-luxury-navy-500 focus:border-transparent resize-none"
                        placeholder="Besondere Wünsche oder Fragen..."
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
                        Ich habe die{" "}
                        <a href="/datenschutz" className="text-luxury-navy-900 dark:text-slate-100 underline hover:no-underline">
                            Datenschutzhinweise
                        </a>{" "}
                        zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu. *
                    </label>
                </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-green-900 dark:text-green-100">Anfrage erfolgreich gesendet!</p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            Vielen Dank für Ihre Buchungsanfrage. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
                        </p>
                    </div>
                </div>
            )}

            {submitStatus === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-red-900 dark:text-red-100">Fehler</p>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet..." : "Buchungsanfrage senden"}
            </Button>

            <p className="text-xs text-center text-luxury-navy-600 dark:text-slate-400">
                * Pflichtfelder
            </p>
        </form>
    );
}
