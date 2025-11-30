"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ferienwohnung-eggers-booking-draft";
const SUBMITTED_KEY = "ferienwohnung-eggers-submitted";

/**
 * Client-side Buchungsentwurf für LocalStorage-Persistenz
 * Überlebt Page Reload und Browser-Sessions
 */
export interface ClientBookingDraft {
    checkIn?: string; // ISO string für JSON-Kompatibilität
    checkOut?: string;
    adults: number;
    children: number;
    dogs: boolean;
    name: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
}

export interface SubmittedBooking {
    id: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    dogs: boolean;
    name: string;
    email: string;
    submittedAt: string;
}

const defaultDraft: ClientBookingDraft = {
    adults: 2,
    children: 0,
    dogs: false,
    name: "",
    email: "",
    phone: "",
    message: "",
    gdprConsent: false,
};

/**
 * Hook für persistente Buchungsdaten im LocalStorage
 * Überlebt Page Reload und Browser-Schließen
 */
export function useBookingDraft() {
    const [draft, setDraft] = useState<ClientBookingDraft>(defaultDraft);
    const [isHydrated, setIsHydrated] = useState(false);

    // Initiale Hydration aus LocalStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as ClientBookingDraft;
                setDraft(parsed);
            }
        } catch (error) {
            console.warn("Failed to load booking draft from localStorage:", error);
        }
        setIsHydrated(true);
    }, []);

    // Speichern bei Änderungen (nur nach Hydration)
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
            } catch (error) {
                console.warn("Failed to save booking draft to localStorage:", error);
            }
        }
    }, [draft, isHydrated]);

    const updateDraft = useCallback((updates: Partial<ClientBookingDraft>) => {
        setDraft((prev) => ({ ...prev, ...updates }));
    }, []);

    const clearDraft = useCallback(() => {
        setDraft(defaultDraft);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Silent fail
        }
    }, []);

    return {
        draft,
        updateDraft,
        clearDraft,
        isHydrated,
    };
}

/**
 * Hook für abgeschlossene Buchungsanfragen (Referenz)
 * Speichert erfolgreich gesendete Anfragen lokal
 */
export function useSubmittedBookings() {
    const [bookings, setBookings] = useState<SubmittedBooking[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Initiale Hydration
    useEffect(() => {
        try {
            const stored = localStorage.getItem(SUBMITTED_KEY);
            if (stored) {
                setBookings(JSON.parse(stored));
            }
        } catch {
            // Silent fail
        }
        setIsHydrated(true);
    }, []);

    const addSubmittedBooking = useCallback((booking: Omit<SubmittedBooking, "id" | "submittedAt">) => {
        const newBooking: SubmittedBooking = {
            ...booking,
            id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            submittedAt: new Date().toISOString(),
        };

        setBookings((prev) => {
            const updated = [...prev, newBooking];
            // Maximal die letzten 10 Anfragen behalten
            const trimmed = updated.slice(-10);
            try {
                localStorage.setItem(SUBMITTED_KEY, JSON.stringify(trimmed));
            } catch {
                // Silent fail
            }
            return trimmed;
        });

        return newBooking;
    }, []);

    const clearSubmittedBookings = useCallback(() => {
        setBookings([]);
        try {
            localStorage.removeItem(SUBMITTED_KEY);
        } catch {
            // Silent fail
        }
    }, []);

    return {
        bookings,
        addSubmittedBooking,
        clearSubmittedBookings,
        isHydrated,
    };
}

/**
 * Utility: Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
    try {
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

