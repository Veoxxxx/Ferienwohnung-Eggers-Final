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
            <div className="bg-luxury-navy-900 dark:bg-luxury-navy-950 p-6 rounded-xl border border-luxury-navy-800 shadow-sm relative overflow-hidden text-luxury-sand-50">
                <div className="flex items-center gap-2 mb-2">
                    <Euro className="h-5 w-5 text-luxury-sand-300" />
                    <h3 className="text-lg font-serif font-bold">Preisübersicht</h3>
                </div>
                <p className="text-luxury-sand-200/80 text-sm">
                    Wählen Sie Zeitraum und Gästeanzahl für die Preisberechnung
                </p>
            </div>
        );
    }

    const seasonLabel = {
        high: "Hochsaison",
        low: "Nebensaison",
        normal: "Hauptsaison",
    }[breakdown.seasonType || "normal"];

    return (
        <div className="bg-luxury-navy-900 dark:bg-luxury-navy-950 p-6 rounded-xl border border-luxury-navy-800 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300 text-luxury-sand-50">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Euro className="w-24 h-24 text-luxury-sand-300 transform rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold flex items-center gap-2 text-luxury-sand-50">
                        <Euro className="h-6 w-6 text-luxury-sand-300" />
                        Preisübersicht
                    </h3>
                    <p className="text-luxury-sand-200 text-sm mt-1">
                        {breakdown.nights} {breakdown.nights === 1 ? "Nacht" : "Nächte"} · {seasonLabel}
                    </p>
                </div>

                <div className="space-y-3">
                    {/* Base Price */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-luxury-sand-100">
                            Unterkunft ({breakdown.nights} × €{breakdown.basePricePerNight.toFixed(2)})
                        </span>
                        <span className="font-medium text-luxury-sand-50">€{breakdown.baseTotal.toFixed(2)}</span>
                    </div>

                    {/* Cleaning Fee */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-luxury-sand-100">Endreinigung</span>
                        <span className="font-medium text-luxury-sand-50">€{breakdown.cleaningFee.toFixed(2)}</span>
                    </div>

                    {/* Dog Fee */}
                    {breakdown.dogFee > 0 && (
                        <div className="flex justify-between items-center text-sm py-1">
                            <span className="text-luxury-sand-100">Hund</span>
                            <span className="font-medium text-luxury-sand-50">€{breakdown.dogFee.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="border-t border-luxury-sand-500/20 my-3 pt-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-luxury-sand-100">Zwischensumme</span>
                            <span className="font-semibold text-luxury-sand-50">€{breakdown.subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* City Tax */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-luxury-sand-100">
                            Kurtaxe ({adults} {adults === 1 ? "Erwachsener" : "Erwachsene"} × {breakdown.nights} {breakdown.nights === 1 ? "Nacht" : "Nächte"})
                        </span>
                        <span className="font-medium text-luxury-sand-50">€{breakdown.cityTax.toFixed(2)}</span>
                    </div>

                    {/* Total */}
                    <div className="bg-luxury-sand-500/10 rounded-lg p-4 mt-6 backdrop-blur-sm border border-luxury-sand-500/20">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-lg font-serif font-bold text-luxury-sand-100">Gesamtsumme</span>
                            <span className="text-2xl font-serif font-bold text-luxury-sand-50">
                                €{breakdown.total.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-xs text-luxury-sand-300/80 text-right mt-1">
                            inkl. aller Gebühren und Steuern
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 flex items-start gap-2 text-xs text-luxury-sand-300/60 px-1">
                        <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
                        <p>
                            Diese Preisangabe basiert auf den aktuellen Einstellungen und ist noch keine verbindliche
                            Buchungsbestätigung. Der endgültige Preis wird bei Bestätigung Ihrer Anfrage fixiert.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
