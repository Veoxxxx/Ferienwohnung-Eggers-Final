"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { calculateBookingPrice, type BookingPriceBreakdown } from "@/lib/pricing";
import { Euro, Info } from "lucide-react";
import { useTranslations } from "next-intl";

interface PriceSummaryProps {
    checkIn: Date | null;
    checkOut: Date | null;
    adults: number;
    children: number;
    hasDog: boolean;
}

export function PriceSummary({ checkIn, checkOut, adults, children, hasDog }: PriceSummaryProps) {
    const t = useTranslations("PriceSummary");
    const tCommon = useTranslations("Common");
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
            if (err instanceof Error) {
                // Check if it's a minimum stay error
                if (err.message.includes("Mindestaufenthalt")) {
                    const nights = err.message.match(/\d+/)?.[0] || "3";
                    setError(t("minimumStay", { nights }));
                } else {
                    setError(err.message);
                }
            } else {
                setError(t("notice"));
            }
            setBreakdown(null);
        }
    }, [checkIn, checkOut, adults, children, hasDog, t]);

    if (error) {
        return (
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-amber-900 dark:text-amber-100">
                        <Info className="h-5 w-5" />
                        {t("notice")}
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
                    <h3 className="text-lg font-serif font-bold">{t("title")}</h3>
                </div>
                <p className="text-luxury-sand-200/80 text-sm">
                    {t("selectPeriodAndGuests")}
                </p>
            </div>
        );
    }

    const seasonLabel = t(`season.${breakdown.seasonType || "normal"}`);

    return (
        <div className="bg-luxury-navy-900 dark:bg-luxury-navy-950 p-6 rounded-xl border border-luxury-navy-800 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300 text-luxury-sand-50">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Euro className="w-24 h-24 text-luxury-sand-300 transform rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold flex items-center gap-2 text-luxury-sand-50">
                        <Euro className="h-6 w-6 text-luxury-sand-300" />
                        {t("title")}
                    </h3>
                    <p className="text-luxury-sand-200 text-sm mt-1">
                        {breakdown.nights} {breakdown.nights === 1 ? tCommon("night") : tCommon("nightPlural")} · {seasonLabel}
                    </p>
                </div>

                <div className="space-y-3">
                    {/* Base Price */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-luxury-sand-100">
                            {t("accommodation")} ({breakdown.nights} × €{breakdown.basePricePerNight.toFixed(2)})
                        </span>
                        <span className="font-medium text-luxury-sand-50">€{breakdown.baseTotal.toFixed(2)}</span>
                    </div>

                    {/* Cleaning Fee */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-luxury-sand-100">{t("cleaning")}</span>
                        <span className="font-medium text-luxury-sand-50">€{breakdown.cleaningFee.toFixed(2)}</span>
                    </div>

                    {/* Dog Fee */}
                    {breakdown.dogFee > 0 && (
                        <div className="flex justify-between items-center text-sm py-1">
                            <span className="text-luxury-sand-100">{t("dog")}</span>
                            <span className="font-medium text-luxury-sand-50">€{breakdown.dogFee.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="border-t border-luxury-sand-500/20 my-3 pt-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-luxury-sand-100">{t("subtotal")}</span>
                            <span className="font-semibold text-luxury-sand-50">€{breakdown.subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* City Tax */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-luxury-sand-100">
                            {t("touristTax")} ({adults} {adults === 1 ? tCommon("adult") : tCommon("adultPlural")} × {breakdown.nights} {breakdown.nights === 1 ? tCommon("night") : tCommon("nightPlural")})
                        </span>
                        <span className="font-medium text-luxury-sand-50">€{breakdown.cityTax.toFixed(2)}</span>
                    </div>

                    {/* Total */}
                    <div className="bg-luxury-sand-500/10 rounded-lg p-4 mt-6 backdrop-blur-sm border border-luxury-sand-500/20">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-lg font-serif font-bold text-luxury-sand-100">{t("total")}</span>
                            <span className="text-2xl font-serif font-bold text-luxury-sand-50">
                                €{breakdown.total.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-xs text-luxury-sand-300/80 text-right mt-1">
                            {t("includingAll")}
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 flex items-start gap-2 text-xs text-luxury-sand-300/60 px-1">
                        <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
                        <p>
                            {t("disclaimer")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
