"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvailabilityData } from "@/lib/channel-manager";

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

    const weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const monthNames = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 rounded-md transition-colors"
                    aria-label="Vorheriger Monat"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-serif font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800 rounded-md transition-colors"
                    aria-label="Nächster Monat"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="text-center text-sm font-medium text-luxury-navy-600 dark:text-slate-400 py-2"
                    >
                        {day}
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
                                selected && "bg-luxury-navy-900 text-white dark:bg-luxury-navy-600",
                                inRange && !selected && "bg-luxury-navy-200 dark:bg-luxury-navy-700",
                                !isPast && isAvailable && !selected && !inRange && "hover:bg-luxury-navy-100 dark:hover:bg-luxury-navy-800",
                                (isPast || !isAvailable) && "opacity-30 cursor-not-allowed line-through"
                            )}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-luxury-navy-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-luxury-navy-900 dark:bg-luxury-navy-600 rounded"></div>
                    <span>Ausgewählt</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-luxury-navy-200 dark:bg-luxury-navy-700 rounded"></div>
                    <span>Zeitraum</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white dark:bg-luxury-navy-900 border border-luxury-navy-300 dark:border-luxury-navy-700 rounded line-through"></div>
                    <span>Belegt</span>
                </div>
            </div>
        </div>
    );
}
