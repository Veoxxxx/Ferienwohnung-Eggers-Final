"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { calculateBookingPrice, type BookingPriceBreakdown } from "@/lib/pricing";
import { Euro, Info } from "lucide-react";

interface PriceSummaryProps {
    checkIn: Date | null;
    checkOut: Date | null;
    adults: number;
    children: number;
    hasDog: boolean;
}

export function PriceSummary({ checkIn, checkOut, adults, children, hasDog }: PriceSummaryProps) {
    const [breakdown, setBreakdown] = useState<BookingPriceBreakdown | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!checkIn || !checkOut || adults < 1) {
            setBreakdown(null);
            setError(null);
            return;
        }

        try {
            const result = calculateBookingPrice({
                checkIn,
                checkOut,
                adults,
                children,
                hasDog,
            });
            setBreakdown(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Fehler bei der Preisberechnung");
            setBreakdown(null);
        }
    }, [checkIn, checkOut, adults, children, hasDog]);

    if (error) {
        return (
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-amber-900 dark:text-amber-100">
                        <Info className="h-5 w-5" />
                        Hinweis
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-amber-800 dark:text-amber-200">{error}</p>
                </CardContent>
            </Card>
        );
    }

    if (!breakdown) {
        return (
            <Card className="bg-luxury-sand-50 dark:bg-luxury-navy-800">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Euro className="h-5 w-5" />
                        Preisübersicht
                    </CardTitle>
                    <CardDescription>
                        Wählen Sie Zeitraum und Gästeanzahl für die Preisberechnung
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const seasonLabel = {
        high: "Hochsaison",
        low: "Nebensaison",
        normal: "Hauptsaison",
    }[breakdown.seasonType || "normal"];

    return (
        <Card className="bg-luxury-sand-50 dark:bg-luxury-navy-800 border-2 border-luxury-navy-300 dark:border-luxury-sand-600">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Euro className="h-6 w-6" />
                    Preisübersicht
                </CardTitle>
                <CardDescription>
                    {breakdown.nights} {breakdown.nights === 1 ? "Nacht" : "Nächte"} · {seasonLabel}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Base Price */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-luxury-navy-600 dark:text-slate-400">
                            Unterkunft ({breakdown.nights} × €{breakdown.basePricePerNight.toFixed(2)})
                        </span>
                        <span className="font-medium">€{breakdown.baseTotal.toFixed(2)}</span>
                    </div>

                    {/* Cleaning Fee */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-luxury-navy-600 dark:text-slate-400">Endreinigung</span>
                        <span className="font-medium">€{breakdown.cleaningFee.toFixed(2)}</span>
                    </div>

                    {/* Dog Fee */}
                    {breakdown.dogFee > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-luxury-navy-600 dark:text-slate-400">Hund</span>
                            <span className="font-medium">€{breakdown.dogFee.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="border-t border-luxury-navy-200 dark:border-luxury-navy-700 pt-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-luxury-navy-600 dark:text-slate-400">Zwischensumme</span>
                            <span className="font-semibold">€{breakdown.subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* City Tax */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-luxury-navy-600 dark:text-slate-400">
                            Kurtaxe ({adults} {adults === 1 ? "Erwachsener" : "Erwachsene"} × {breakdown.nights} {breakdown.nights === 1 ? "Nacht" : "Nächte"})
                        </span>
                        <span className="font-medium">€{breakdown.cityTax.toFixed(2)}</span>
                    </div>

                    {/* Total */}
                    <div className="border-t-2 border-luxury-navy-900 dark:border-luxury-sand-500 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-serif font-bold">Gesamtsumme</span>
                            <span className="text-2xl font-serif font-bold text-luxury-navy-900 dark:text-luxury-sand-400">
                                €{breakdown.total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                        <p className="text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
                            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>
                                Diese Preisangabe basiert auf den aktuellen Einstellungen und ist noch keine verbindliche
                                Buchungsbestätigung. Der endgültige Preis wird bei Bestätigung Ihrer Anfrage fixiert.
                            </span>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
