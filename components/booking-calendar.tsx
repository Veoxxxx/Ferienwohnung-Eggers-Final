"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvailabilityData } from "@/lib/channel-manager";
import { useTranslations } from "next-intl";

interface BookingCalendarProps {
    onSelectRange: (startDate: Date, endDate: Date) => void;
    selectedStartDate?: Date;
    selectedEndDate?: Date;
}

export function BookingCalendar({
    onSelectRange,
    selectedStartDate,
    selectedEndDate,
}: BookingCalendarProps) {
    const t = useTranslations("Calendar");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState<Map<string, AvailabilityData>>(new Map());
    const [selectingRange, setSelectingRange] = useState<"start" | "end">("start");
    const [tempStartDate, setTempStartDate] = useState<Date | null>(null);

    useEffect(() => {
        // Fetch availability data
        const fetchAvailability = async () => {
            const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);

            const response = await fetch(
                `/api/channel-manager?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}`
            );
            const data = await response.json();

            if (data.success) {
                const availMap = new Map();
                data.data.forEach((item: AvailabilityData) => {
                    const dateKey = new Date(item.date).toISOString().split("T")[0];
                    availMap.set(dateKey, item);
                });
                setAvailability(availMap);
            }
        };

        fetchAvailability();
    }, [currentMonth]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, firstDay };
    };

    const { daysInMonth, startingDayOfWeek, firstDay } = getDaysInMonth(currentMonth);

    const handleDateClick = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) return; // Can't select past dates

        const dateKey = date.toISOString().split("T")[0];
        const isAvailable = availability.get(dateKey)?.available ?? true;

        if (!isAvailable) return; // Can't select unavailable dates

        if (selectingRange === "start") {
            setTempStartDate(date);
            setSelectingRange("end");
        } else {
            if (tempStartDate && date > tempStartDate) {
                onSelectRange(tempStartDate, date);
                setSelectingRange("start");
                setTempStartDate(null);
            } else {
                // If end date is before start, restart selection
                setTempStartDate(date);
            }
        }
    };

    const isDateInRange = (date: Date) => {
        if (!selectedStartDate || !selectedEndDate) return false;
        return date >= selectedStartDate && date <= selectedEndDate;
    };

    const isDateSelected = (date: Date) => {
        if (selectedStartDate && date.toDateString() === selectedStartDate.toDateString()) return true;
        if (selectedEndDate && date.toDateString() === selectedEndDate.toDateString()) return true;
        return false;
    };

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const weekDayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
    const monthKeys = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ] as const;

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 rounded-md transition-colors"
                    aria-label={t("previousMonth")}
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-serif font-semibold">
                    {t(`months.${monthKeys[currentMonth.getMonth()]}`)} {currentMonth.getFullYear()}
                </h3>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 rounded-md transition-colors"
                    aria-label={t("nextMonth")}
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDayKeys.map((day) => (
                    <div
                        key={day}
                        className="text-center text-sm font-medium text-luxury-navy-600 dark:text-slate-400 py-2"
                    >
                        {t(`weekDays.${day}`)}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), day);
                    const dateKey = date.toISOString().split("T")[0];
                    const isAvailable = availability.get(dateKey)?.available ?? true;
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isPast = date < today;
                    const inRange = isDateInRange(date);
                    const selected = isDateSelected(date);

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(date)}
                            disabled={isPast || !isAvailable}
                            className={cn(
                                "aspect-square flex items-center justify-center text-sm rounded-md transition-all",
                                "focus:outline-none focus:ring-2 focus:ring-luxury-navy-500",
                                selected && "bg-luxury-navy-900 text-white shadow-md dark:bg-white dark:text-luxury-navy-900",
                                inRange && !selected && "bg-luxury-navy-100 text-luxury-navy-900 dark:bg-luxury-navy-800 dark:text-luxury-sand-200",
                                !isPast && isAvailable && !selected && !inRange && "hover:bg-luxury-sand-100 dark:hover:bg-luxury-navy-800",
                                (isPast || !isAvailable) && "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                            )}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-luxury-sand-100 dark:border-luxury-navy-800 flex flex-wrap gap-4 text-xs font-medium text-luxury-navy-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-luxury-navy-900 dark:bg-white rounded-full"></div>
                    <span>{t("legend.selected")}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-luxury-navy-100 dark:bg-luxury-navy-800 rounded-full"></div>
                    <span>{t("legend.range")}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white border border-gray-200 dark:border-gray-700 dark:bg-transparent rounded-full relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-[1px] bg-gray-300 dark:bg-gray-600 transform -rotate-45"></div>
                        </div>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500">{t("legend.unavailable")}</span>
                </div>
            </div>
        </div>
    );
}
