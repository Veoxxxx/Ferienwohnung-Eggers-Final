import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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

/**
 * Convert Hex color to HSL string (space separated)
 * Example: #ffffff -> "0 0% 100%"
 */
export function hexToHsl(hex: string): string {
    // Remove hash if present
    hex = hex.replace(/^#/, "");

    // Parse r, g, b
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Normalize to 0-1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find min and max
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
        s = 0,
        l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    // Convert to degrees and percentage
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
}
