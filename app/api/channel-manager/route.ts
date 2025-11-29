import { NextResponse } from "next/server";
import { fetchExternalAvailability } from "@/lib/channel-manager";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const startDateParam = searchParams.get("startDate");
        const endDateParam = searchParams.get("endDate");

        if (!startDateParam || !endDateParam) {
            return NextResponse.json(
                { error: "startDate and endDate are required" },
                { status: 400 }
            );
        }

        const startDate = new Date(startDateParam);
        const endDate = new Date(endDateParam);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json(
                { error: "Invalid date format" },
                { status: 400 }
            );
        }

        const availability = await fetchExternalAvailability(startDate, endDate);

        return NextResponse.json({
            success: true,
            data: availability,
        });
    } catch (error) {
        console.error("Error fetching availability:", error);
        return NextResponse.json(
            { error: "Failed to fetch availability data" },
            { status: 500 }
        );
    }
}
