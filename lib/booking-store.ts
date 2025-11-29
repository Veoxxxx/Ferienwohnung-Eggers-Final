/**
 * In-memory booking store
 * 
 * This is a simple in-memory store for booking requests.
 * In production, replace with a database (e.g., PostgreSQL, MongoDB)
 */

export interface BookingRequest {
    id: string;
    checkIn: Date;
    checkOut: Date;
    guestCount: number;
    adults: number;
    children: number;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    dogsIncluded: boolean;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

// In-memory store (replace with database in production)
const bookingRequests: BookingRequest[] = [];

export class BookingStore {
    /**
     * Create a new booking request
     */
    static async createBookingRequest(
        data: Omit<BookingRequest, "id" | "status" | "createdAt" | "updatedAt">
    ): Promise<BookingRequest> {
        const bookingRequest: BookingRequest = {
            ...data,
            id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        bookingRequests.push(bookingRequest);

        // In production, send email notification here
        console.log("New booking request created:", bookingRequest);

        return bookingRequest;
    }

    /**
     * Get all booking requests
     */
    static async getAllBookingRequests(): Promise<BookingRequest[]> {
        return bookingRequests;
    }

    /**
     * Get booking request by ID
     */
    static async getBookingRequestById(id: string): Promise<BookingRequest | null> {
        return bookingRequests.find((req) => req.id === id) || null;
    }

    /**
     * Update booking request status
     */
    static async updateBookingStatus(
        id: string,
        status: BookingRequest["status"]
    ): Promise<BookingRequest | null> {
        const request = bookingRequests.find((req) => req.id === id);
        if (!request) return null;

        request.status = status;
        request.updatedAt = new Date();

        return request;
    }

    /**
     * Get confirmed bookings for calendar display
     */
    static async getConfirmedBookings(): Promise<BookingRequest[]> {
        return bookingRequests.filter((req) => req.status === "confirmed");
    }

    /**
     * Check for conflicts with existing bookings
     */
    static async hasConflict(checkIn: Date, checkOut: Date): Promise<boolean> {
        const confirmedBookings = await this.getConfirmedBookings();

        return confirmedBookings.some((booking) => {
            // Check if date ranges overlap
            return (
                (checkIn >= booking.checkIn && checkIn < booking.checkOut) ||
                (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
                (checkIn <= booking.checkIn && checkOut >= booking.checkOut)
            );
        });
    }
}
