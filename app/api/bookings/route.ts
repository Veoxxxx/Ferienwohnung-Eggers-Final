import { NextResponse } from "next/server";
import { BookingStore } from "@/lib/booking-store";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            checkIn,
            checkOut,
            guestCount,
            adults,
            children,
            name,
            email,
            phone,
            message,
            dogsIncluded,
        } = body;

        // Validate required fields
        if (!checkIn || !checkOut || !guestCount || !adults || !name || !email) {
            return NextResponse.json(
                { error: "Fehlende erforderliche Felder" },
                { status: 400 }
            );
        }

        // Convert dates
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Check for conflicts
        const hasConflict = await BookingStore.hasConflict(checkInDate, checkOutDate);
        if (hasConflict) {
            return NextResponse.json(
                { error: "Dieser Zeitraum ist bereits gebucht" },
                { status: 409 }
            );
        }

        // Create booking request
        const bookingRequest = await BookingStore.createBookingRequest({
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guestCount,
            adults,
            children: children || 0,
            name,
            email,
            phone,
            message,
            dogsIncluded: dogsIncluded || false,
        });

        // In production, send confirmation email here

        return NextResponse.json({
            success: true,
            message: "Buchungsanfrage erfolgreich gesendet",
            bookingId: bookingRequest.id,
        });
    } catch (error) {
        console.error("Error creating booking request:", error);
        return NextResponse.json(
            { error: "Fehler beim Senden der Buchungsanfrage" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const bookings = await BookingStore.getAllBookingRequests();
        return NextResponse.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { error: "Fehler beim Abrufen der Buchungen" },
            { status: 500 }
        );
    }
}
