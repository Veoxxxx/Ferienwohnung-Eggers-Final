/**
 * Channel Manager Integration Layer
 * 
 * This module provides an abstraction for integrating with external
 * channel managers and OTA platforms to prevent overbookings.
 */

export interface Booking {
    id: string;
    checkIn: Date;
    checkOut: Date;
    guestCount: number;
    source: "direct" | "booking.com" | "airbnb" | "other";
    status: "confirmed" | "pending" | "cancelled";
}

export interface AvailabilityData {
    date: Date;
    available: boolean;
    source: string;
}

/**
 * Fetch availability data from external channel manager
 * Currently returns mock data - replace with actual API call in production
 */
export async function fetchExternalAvailability(
    startDate: Date,
    endDate: Date
): Promise<AvailabilityData[]> {
    // In production, this would call the actual channel manager API
    // const response = await fetch(`${process.env.CHANNEL_MANAGER_API_URL}/availability`, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.CHANNEL_MANAGER_API_KEY}`
    //   },
    //   body: JSON.stringify({ startDate, endDate })
    // });

    // Mock data for demonstration
    const mockBookings: Booking[] = [
        {
            id: "ext-001",
            checkIn: new Date(2025, 11, 15), // December 15, 2025
            checkOut: new Date(2025, 11, 20),
            guestCount: 4,
            source: "booking.com",
            status: "confirmed",
        },
        {
            id: "ext-002",
            checkIn: new Date(2025, 11, 25),
            checkOut: new Date(2026, 0, 5), // January 5, 2026
            guestCount: 6,
            source: "airbnb",
            status: "confirmed",
        },
    ];

    const availabilityMap = new Map<string, AvailabilityData>();
    const currentDate = new Date(startDate);

    // Initialize all dates as available
    while (currentDate <= endDate) {
        const dateKey = currentDate.toISOString().split("T")[0];
        availabilityMap.set(dateKey, {
            date: new Date(currentDate),
            available: true,
            source: "internal",
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Mark booked dates as unavailable
    mockBookings.forEach((booking) => {
        const bookingDate = new Date(booking.checkIn);
        while (bookingDate < booking.checkOut) {
            const dateKey = bookingDate.toISOString().split("T")[0];
            if (availabilityMap.has(dateKey)) {
                availabilityMap.set(dateKey, {
                    date: new Date(bookingDate),
                    available: false,
                    source: booking.source,
                });
            }
            bookingDate.setDate(bookingDate.getDate() + 1);
        }
    });

    return Array.from(availabilityMap.values());
}

/**
 * Merge local and external calendar data to prevent overbookings
 */
export function mergeAvailabilityData(
    localData: AvailabilityData[],
    externalData: AvailabilityData[]
): AvailabilityData[] {
    const merged = new Map<string, AvailabilityData>();

    // Add local data
    localData.forEach((data) => {
        const key = data.date.toISOString().split("T")[0];
        merged.set(key, data);
    });

    // Merge external data - if either source says unavailable, it's unavailable
    externalData.forEach((data) => {
        const key = data.date.toISOString().split("T")[0];
        const existing = merged.get(key);

        if (existing) {
            merged.set(key, {
                date: data.date,
                available: existing.available && data.available,
                source: !existing.available ? existing.source : data.source,
            });
        } else {
            merged.set(key, data);
        }
    });

    return Array.from(merged.values()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );
}

/**
 * Check if a date range is available for booking
 */
export function isDateRangeAvailable(
    checkIn: Date,
    checkOut: Date,
    availabilityData: AvailabilityData[]
): boolean {
    const availabilityMap = new Map(
        availabilityData.map((data) => [
            data.date.toISOString().split("T")[0],
            data.available,
        ])
    );

    const currentDate = new Date(checkIn);
    while (currentDate < checkOut) {
        const dateKey = currentDate.toISOString().split("T")[0];
        if (!availabilityMap.get(dateKey)) {
            return false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
}
