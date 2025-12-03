import { NextRequest, NextResponse } from 'next/server';
import { BookingStore } from '@/lib/booking-store';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/admin/bookings - Alle Buchungen abrufen (nur Admin)
 */
export async function GET() {
    // Auth check
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const bookings = await BookingStore.getAllBookingRequests();
        
        return NextResponse.json({
            success: true,
            data: bookings,
            count: bookings.length,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { error: 'Fehler beim Abrufen der Buchungen' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/admin/bookings - Buchungsstatus aktualisieren
 */
export async function PATCH(request: NextRequest) {
    // Auth check
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json(
                { error: 'ID und Status erforderlich' },
                { status: 400 }
            );
        }

        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return NextResponse.json(
                { error: 'Ungültiger Status' },
                { status: 400 }
            );
        }

        const updated = await BookingStore.updateBookingStatus(id, status);

        if (!updated) {
            return NextResponse.json(
                { error: 'Buchung nicht gefunden' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updated,
            message: `Buchung ${status === 'confirmed' ? 'bestätigt' : status === 'cancelled' ? 'storniert' : 'aktualisiert'}`,
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            { error: 'Fehler beim Aktualisieren der Buchung' },
            { status: 500 }
        );
    }
}

