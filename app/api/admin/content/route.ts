import { NextRequest, NextResponse } from 'next/server';
import { getContent, updateContent, getNestedPath, updateNestedPath } from '@/lib/content-store';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/admin/content - Liest Content (optional mit section/path Parameter)
 */
export async function GET(request: NextRequest) {
    // Auth check
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const section = request.nextUrl.searchParams.get('section');

        if (section) {
            // Verschachtelte Pfade unterstützen (z.B. "pages.home.testimonials")
            const value = await getNestedPath(section);
            return NextResponse.json(value);
        }

        // Gesamten Content zurückgeben
        const content = await getContent();
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error reading content:', error);
        return NextResponse.json(
            { error: 'Fehler beim Lesen der Inhalte' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/admin/content - Aktualisiert Content
 */
export async function PUT(request: NextRequest) {
    // Auth check
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { section, path, data } = body;

        if (path) {
            // Verschachtelte Pfade aktualisieren (z.B. "pages.home.testimonials.reviews")
            await updateNestedPath(path, data);
        } else if (section) {
            // Gesamten Abschnitt aktualisieren
            const content = await getContent();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (content as any)[section] = data;
            await updateContent(content);
        } else {
            return NextResponse.json(
                { error: 'section oder path Parameter erforderlich' },
                { status: 400 }
            );
        }

        return NextResponse.json({ 
            success: true,
            message: 'Inhalte erfolgreich aktualisiert'
        });
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json(
            { error: 'Fehler beim Speichern der Inhalte' },
            { status: 500 }
        );
    }
}

