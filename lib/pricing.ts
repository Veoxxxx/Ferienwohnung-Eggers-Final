// ============================================
// PRICING LOGIC - Ferienwohnung Eggers
// ============================================

export interface PricingConfig {
    basePricePerNight: number;
    cleaningFee: number;
    dogFee: number;
    cityTaxPerAdultPerNight: number;
    minimumStay: number;
    seasonalPricing?: {
        highSeason: {
            start: string; // MM-DD format
            end: string;
            multiplier: number;
        };
        lowSeason: {
            start: string;
            end: string;
            multiplier: number;
        };
    };
}

export interface BookingPriceInput {
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    hasDog: boolean;
}

export interface BookingPriceBreakdown {
    nights: number;
    basePricePerNight: number;
    baseTotal: number;
    cleaningFee: number;
    dogFee: number;
    cityTax: number;
    subtotal: number;
    total: number;
    seasonType?: "high" | "low" | "normal";
}

// Default pricing configuration
// These can be overridden via environment variables
const DEFAULT_CONFIG: PricingConfig = {
    basePricePerNight: parseFloat(process.env.NEXT_PUBLIC_BASE_PRICE_PER_NIGHT || "85"),
    cleaningFee: parseFloat(process.env.NEXT_PUBLIC_CLEANING_FEE || "75"),
    dogFee: parseFloat(process.env.NEXT_PUBLIC_DOG_FEE || "25"),
    cityTaxPerAdultPerNight: 4.10, // Fixed by law
    minimumStay: 3,
    seasonalPricing: {
        highSeason: {
            start: "06-15", // June 15
            end: "09-15",   // September 15
            multiplier: 1.3,
        },
        lowSeason: {
            start: "11-01", // November 1
            end: "02-28",   // February 28
            multiplier: 0.85,
        },
    },
};

/**
 * Determines if a date falls within a season range
 */
function isInSeasonRange(date: Date, start: string, end: string): boolean {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const [startMonth, startDay] = start.split("-").map(Number);
    const [endMonth, endDay] = end.split("-").map(Number);

    const dateValue = month * 100 + day;
    const startValue = startMonth * 100 + startDay;
    const endValue = endMonth * 100 + endDay;

    if (startValue <= endValue) {
        return dateValue >= startValue && dateValue <= endValue;
    } else {
        // Season spans year boundary
        return dateValue >= startValue || dateValue <= endValue;
    }
}

/**
 * Determines the season type for a given date
 */
function getSeasonType(date: Date, config: PricingConfig): "high" | "low" | "normal" {
    if (!config.seasonalPricing) return "normal";

    if (isInSeasonRange(date, config.seasonalPricing.highSeason.start, config.seasonalPricing.highSeason.end)) {
        return "high";
    }

    if (isInSeasonRange(date, config.seasonalPricing.lowSeason.start, config.seasonalPricing.lowSeason.end)) {
        return "low";
    }

    return "normal";
}

/**
 * Calculates the price multiplier for a given season
 */
function getSeasonMultiplier(seasonType: "high" | "low" | "normal", config: PricingConfig): number {
    if (!config.seasonalPricing) return 1;

    switch (seasonType) {
        case "high":
            return config.seasonalPricing.highSeason.multiplier;
        case "low":
            return config.seasonalPricing.lowSeason.multiplier;
        default:
            return 1;
    }
}

/**
 * Calculates the total booking price with detailed breakdown
 */
export function calculateBookingPrice(
    input: BookingPriceInput,
    customConfig?: Partial<PricingConfig>
): BookingPriceBreakdown {
    const config: PricingConfig = { ...DEFAULT_CONFIG, ...customConfig };

    // Calculate number of nights
    const nights = Math.ceil((input.checkOut.getTime() - input.checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Validate minimum stay
    if (nights < config.minimumStay) {
        throw new Error(`Mindestaufenthalt beträgt ${config.minimumStay} Nächte`);
    }

    // Determine season and price per night
    const seasonType = getSeasonType(input.checkIn, config);
    const seasonMultiplier = getSeasonMultiplier(seasonType, config);
    const basePricePerNight = Math.round(config.basePricePerNight * seasonMultiplier * 100) / 100;

    // Calculate components
    const baseTotal = Math.round(basePricePerNight * nights * 100) / 100;
    const cleaningFee = config.cleaningFee;
    const dogFee = input.hasDog ? config.dogFee : 0;
    const cityTax = Math.round(input.adults * nights * config.cityTaxPerAdultPerNight * 100) / 100;

    // Calculate totals
    const subtotal = Math.round((baseTotal + cleaningFee + dogFee) * 100) / 100;
    const total = Math.round((subtotal + cityTax) * 100) / 100;

    return {
        nights,
        basePricePerNight,
        baseTotal,
        cleaningFee,
        dogFee,
        cityTax,
        subtotal,
        total,
        seasonType,
    };
}

/**
 * Formats a price breakdown for display
 */
export function formatPriceBreakdown(breakdown: BookingPriceBreakdown): string {
    const lines = [
        `Unterkunft: ${breakdown.nights} Nächte × €${breakdown.basePricePerNight.toFixed(2)} = €${breakdown.baseTotal.toFixed(2)}`,
        `Endreinigung: €${breakdown.cleaningFee.toFixed(2)}`,
    ];

    if (breakdown.dogFee > 0) {
        lines.push(`Hund: €${breakdown.dogFee.toFixed(2)}`);
    }

    lines.push(
        `Zwischensumme: €${breakdown.subtotal.toFixed(2)}`,
        `Kurtaxe: €${breakdown.cityTax.toFixed(2)}`,
        ``,
        `Gesamtsumme: €${breakdown.total.toFixed(2)}`
    );

    return lines.join("\n");
}

/**
 * Gets the current pricing configuration
 */
export function getPricingConfig(): PricingConfig {
    return DEFAULT_CONFIG;
}
