'use client';

import { useState, useEffect } from 'react';
import { 
    Save, Check, AlertCircle, ArrowLeft, Sun, Moon, 
    Palette, RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface ThemeData {
    colors: {
        light: Record<string, string>;
        dark: Record<string, string>;
    };
    borderRadius: string;
    gradient: {
        start: string;
        end: string;
    };
}

// Wichtigste Farben für einfache Bearbeitung
const mainColorKeys = [
    { key: 'background', label: 'Hintergrund' },
    { key: 'foreground', label: 'Textfarbe' },
    { key: 'primary', label: 'Primärfarbe' },
    { key: 'secondary', label: 'Sekundär' },
    { key: 'accent', label: 'Akzent' },
    { key: 'muted', label: 'Gedämpft' },
    { key: 'border', label: 'Rahmen' },
];

const specialColorKeys = [
    { key: 'card', label: 'Karten-Hintergrund' },
    { key: 'cardForeground', label: 'Karten-Text' },
    { key: 'destructive', label: 'Fehler/Warnung' },
    { key: 'surfaceLuxury', label: 'Luxury Oberfläche' },
    { key: 'surfaceStrong', label: 'Starke Oberfläche' },
    { key: 'gradientTop', label: 'Gradient Oben' },
    { key: 'gradientBottom', label: 'Gradient Unten' },
];

export default function DesignEinstellungen() {
    const [theme, setTheme] = useState<ThemeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');
    const [showAdvanced, setShowAdvanced] = useState(false);

    useEffect(() => {
        fetch('/api/admin/content?section=theme')
            .then(res => res.json())
            .then(d => {
                setTheme(d);
                setLoading(false);
            })
            .catch(() => {
                setError('Fehler beim Laden');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!theme) return;
        
        setSaving(true);
        setError('');
        
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section: 'theme', data: theme }),
            });
            
            if (!res.ok) throw new Error('Speichern fehlgeschlagen');
            
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError('Fehler beim Speichern');
        }
        
        setSaving(false);
    };

    const updateColor = (mode: 'light' | 'dark', key: string, value: string) => {
        if (!theme) return;
        setTheme({
            ...theme,
            colors: {
                ...theme.colors,
                [mode]: {
                    ...theme.colors[mode],
                    [key]: value
                }
            }
        });
    };

    const resetToDefaults = () => {
        if (!confirm('Möchten Sie alle Farben auf die Standardwerte zurücksetzen?')) return;
        
        // Standard-Farben
        const defaultLight = {
            background: "#fdfcfb",
            foreground: "#0f172a",
            card: "#fcfbf8",
            cardForeground: "#0f172a",
            popover: "#fdfcfb",
            popoverForeground: "#0f172a",
            primary: "#0f172a",
            primaryForeground: "#f8fafc",
            secondary: "#efede8",
            secondaryForeground: "#0f172a",
            muted: "#e9e6e0",
            mutedForeground: "#475569",
            accent: "#e5e0d8",
            accentForeground: "#0f172a",
            destructive: "#dc2626",
            destructiveForeground: "#f8fafc",
            border: "#dedbd6",
            input: "#dedbd6",
            ring: "#0f172a",
            surfaceLuxury: "#fdfcfb",
            surfaceStrong: "#102a43",
            gradientTop: "#fdfcfb",
            gradientBottom: "#e8ddc8",
        };
        
        const defaultDark = {
            background: "#0b1120",
            foreground: "#f2f0eb",
            card: "#0f1623",
            cardForeground: "#f2f0eb",
            popover: "#0b1120",
            popoverForeground: "#f2f0eb",
            primary: "#f2f0eb",
            primaryForeground: "#0f172a",
            secondary: "#19202e",
            secondaryForeground: "#f2f0eb",
            muted: "#1e2532",
            mutedForeground: "#b3b3b3",
            accent: "#212937",
            accentForeground: "#f2f0eb",
            destructive: "#cf3030",
            destructiveForeground: "#f2f0eb",
            border: "#222b3b",
            input: "#222b3b",
            ring: "#b3b3b3",
            surfaceLuxury: "#102a43",
            surfaceStrong: "#0a1929",
            gradientTop: "#102a43",
            gradientBottom: "#050911",
        };
        
        setTheme({
            ...theme!,
            colors: { light: defaultLight, dark: defaultDark },
            borderRadius: "0.5rem",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    if (!theme) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Fehler beim Laden der Daten
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <Link 
                        href="/admin/einstellungen" 
                        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Design & Farben</h1>
                    <p className="text-slate-600 mt-1">
                        Passen Sie das Farbschema der Website an
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={resetToDefaults}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Zurücksetzen
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                            saved 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } disabled:opacity-50`}
                    >
                        {saved ? (
                            <>
                                <Check className="w-5 h-5" />
                                Gespeichert!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                {saving ? 'Speichern...' : 'Speichern'}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveMode('light')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeMode === 'light' 
                            ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' 
                            : 'bg-white border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Sun className="w-5 h-5" />
                    Light Mode
                </button>
                <button
                    onClick={() => setActiveMode('dark')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeMode === 'dark' 
                            ? 'bg-slate-800 text-white border-2 border-slate-600' 
                            : 'bg-white border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Moon className="w-5 h-5" />
                    Dark Mode
                </button>
            </div>

            {/* Preview */}
            <div 
                className="rounded-xl p-6 mb-6 border-2 transition-colors"
                style={{
                    backgroundColor: theme.colors[activeMode].background,
                    borderColor: theme.colors[activeMode].border,
                }}
            >
                <p className="text-sm mb-2" style={{ color: theme.colors[activeMode].mutedForeground }}>
                    Vorschau
                </p>
                <h2 
                    className="text-2xl font-bold mb-2"
                    style={{ color: theme.colors[activeMode].foreground }}
                >
                    Ferienwohnung Eggers
                </h2>
                <p style={{ color: theme.colors[activeMode].foreground }}>
                    Ihr privater Rückzugsort an der Nordsee.
                </p>
                <div className="flex gap-2 mt-4">
                    <button 
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                            backgroundColor: theme.colors[activeMode].primary,
                            color: theme.colors[activeMode].primaryForeground,
                        }}
                    >
                        Primär
                    </button>
                    <button 
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                            backgroundColor: theme.colors[activeMode].secondary,
                            color: theme.colors[activeMode].secondaryForeground,
                        }}
                    >
                        Sekundär
                    </button>
                    <button 
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                            backgroundColor: theme.colors[activeMode].accent,
                            color: theme.colors[activeMode].accentForeground,
                        }}
                    >
                        Akzent
                    </button>
                </div>
            </div>

            {/* Hauptfarben */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold">
                        Hauptfarben ({activeMode === 'light' ? 'Hell' : 'Dunkel'})
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mainColorKeys.map(({ key, label }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                {label}
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={theme.colors[activeMode][key] || '#000000'}
                                    onChange={(e) => updateColor(activeMode, key, e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border border-slate-200"
                                />
                                <input
                                    type="text"
                                    value={theme.colors[activeMode][key] || ''}
                                    onChange={(e) => updateColor(activeMode, key, e.target.value)}
                                    className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-sm font-mono"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Erweiterte Farben (Toggle) */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                    <span className="font-medium text-slate-700">Erweiterte Farben</span>
                    <span className="text-slate-400">{showAdvanced ? '▲' : '▼'}</span>
                </button>
                
                {showAdvanced && (
                    <div className="p-6 pt-2 border-t border-slate-100">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {specialColorKeys.map(({ key, label }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {label}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={theme.colors[activeMode][key] || '#000000'}
                                            onChange={(e) => updateColor(activeMode, key, e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer border border-slate-200"
                                        />
                                        <input
                                            type="text"
                                            value={theme.colors[activeMode][key] || ''}
                                            onChange={(e) => updateColor(activeMode, key, e.target.value)}
                                            className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-sm font-mono"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Design-Parameter */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4">Design-Parameter</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Border-Radius
                        </label>
                        <select
                            value={theme.borderRadius}
                            onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        >
                            <option value="0">Keine (0)</option>
                            <option value="0.25rem">Klein (0.25rem)</option>
                            <option value="0.5rem">Mittel (0.5rem)</option>
                            <option value="0.75rem">Groß (0.75rem)</option>
                            <option value="1rem">Extra Groß (1rem)</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Hinweis */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                    ⚠️ <strong>Hinweis:</strong> Änderungen am Theme werden gespeichert, erfordern aber möglicherweise 
                    ein Neuladen der Website, um vollständig sichtbar zu werden.
                </p>
            </div>
        </div>
    );
}

