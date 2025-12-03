/**
 * Admin Authentication
 * 
 * Einfache passwortbasierte Authentifizierung für das Admin-Dashboard.
 * Verwendet JWT (jose) für Session-Management.
 */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Secret für JWT-Signierung (aus Umgebungsvariable oder Fallback)
const SECRET = new TextEncoder().encode(
    process.env.ADMIN_SECRET || 'ferienwohnung-eggers-admin-secret-change-in-production'
);

// Admin-Passwort (aus Umgebungsvariable oder Fallback)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';

// Cookie-Name für die Admin-Session
const COOKIE_NAME = 'admin-session';

/**
 * Erstellt ein JWT-Token für eine Admin-Session
 */
export async function createSession(): Promise<string> {
    const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET);
    return token;
}

/**
 * Verifiziert ein JWT-Token
 */
export async function verifySession(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

/**
 * Prüft ob das eingegebene Passwort korrekt ist
 */
export function checkPassword(password: string): boolean {
    return password === ADMIN_PASSWORD;
}

/**
 * Prüft ob der aktuelle Request authentifiziert ist
 * Verwendet für Server Components und API Routes
 */
export async function isAuthenticated(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;
        
        if (!token) {
            return false;
        }
        
        return await verifySession(token);
    } catch {
        return false;
    }
}

/**
 * Setzt das Session-Cookie nach erfolgreichem Login
 */
export async function setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 Stunden
        path: '/',
    });
}

/**
 * Löscht das Session-Cookie (Logout)
 */
export async function clearSessionCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Hilfsfunktion für API-Routes: Gibt 401 zurück wenn nicht authentifiziert
 */
export async function requireAuth(): Promise<{ authorized: boolean; error?: Response }> {
    const authenticated = await isAuthenticated();
    
    if (!authenticated) {
        return {
            authorized: false,
            error: new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }),
        };
    }
    
    return { authorized: true };
}

