import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, createSession, setSessionCookie, clearSessionCookie, isAuthenticated } from '@/lib/auth';

/**
 * POST /api/admin/auth - Login
 */
export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        if (!password) {
            return NextResponse.json(
                { error: 'Passwort erforderlich' },
                { status: 400 }
            );
        }

        if (!checkPassword(password)) {
            return NextResponse.json(
                { error: 'Falsches Passwort' },
                { status: 401 }
            );
        }

        // Create session and set cookie
        const token = await createSession();
        await setSessionCookie(token);

        return NextResponse.json({ 
            success: true,
            message: 'Erfolgreich angemeldet'
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Anmeldung fehlgeschlagen' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/admin/auth - Check auth status
 */
export async function GET() {
    const authenticated = await isAuthenticated();
    
    return NextResponse.json({ 
        authenticated,
    });
}

/**
 * DELETE /api/admin/auth - Logout
 */
export async function DELETE() {
    await clearSessionCookie();
    
    return NextResponse.json({ 
        success: true,
        message: 'Erfolgreich abgemeldet'
    });
}

