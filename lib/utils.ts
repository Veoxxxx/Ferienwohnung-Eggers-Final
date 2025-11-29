import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Format a date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    return `${start.toLocaleDateString("de-DE", options)} - ${end.toLocaleDateString("de-DE", options)}`;
}

/**
 * Calculate the number of nights between two dates
 */
export function calculateNights(start: Date, end: Date): number {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate tourist tax
 * €4.10 per adult per night
 */
export function calculateTouristTax(adults: number, nights: number): number {
    return adults * nights * 4.1;
}

/**
 * Validate minimum stay requirement (3 days)
 */
export function validateMinimumStay(start: Date, end: Date): boolean {
    const nights = calculateNights(start, end);
    return nights >= 3;
}

/**
 * Format currency in EUR
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(amount);
}
