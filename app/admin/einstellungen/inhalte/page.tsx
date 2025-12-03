'use client';

import { useState, useEffect } from 'react';
import { 
    Save, Check, AlertCircle, ArrowLeft, Plus, Trash2,
    Image as ImageIcon, Quote, Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface FeatureItem {
    iconName: string;
    title: string;
    desc: string;
}

interface HomePageData {
    hero: {
        headline: string;
        subheadline: string;
        primaryCta: string;
        secondaryCta: string;
        backgroundImage: string;
    };
    intro: {
        image: string;
        quote: string;
        headline: string;
        text: string;
        features: string[];
    };
    features: {
        headline: string;
        subheadline: string;
        items: FeatureItem[];
    };
}

const availableIcons = [
    'Waves', 'Wifi', 'Dog', 'Coffee', 'MapPin', 'Star', 
    'Home', 'Sun', 'Moon', 'Heart', 'Check', 'Sparkles'
];

export default function InhalteEinstellungen() {
    const [data, setData] = useState<HomePageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'hero' | 'intro' | 'features'>('hero');

    useEffect(() => {
        fetch('/api/admin/content?section=pages.home')
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(() => {
                setError('Fehler beim Laden');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!data) return;
        
        setSaving(true);
        setError('');
        
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: 'pages.home', data }),
            });
            
            if (!res.ok) throw new Error('Speichern fehlgeschlagen');
            
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError('Fehler beim Speichern');
        }
        
        setSaving(false);
    };

    // Feature Funktionen
    const addFeature = () => {
        if (!data) return;
        setData({
            ...data,
            features: {
                ...data.features,
                items: [...data.features.items, { iconName: 'Star', title: '', desc: '' }]
            }
        });
    };

    const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
        if (!data) return;
        const newItems = [...data.features.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData({ ...data, features: { ...data.features, items: newItems } });
    };

    const removeFeature = (index: number) => {
        if (!data) return;
        setData({
            ...data,
            features: {
                ...data.features,
                items: data.features.items.filter((_, i) => i !== index)
            }
        });
    };

    // Intro Feature Funktionen
    const addIntroFeature = () => {
        if (!data) return;
        setData({
            ...data,
            intro: {
                ...data.intro,
                features: [...data.intro.features, '']
            }
        });
    };

    const updateIntroFeature = (index: number, value: string) => {
        if (!data) return;
        const newFeatures = [...data.intro.features];
        newFeatures[index] = value;
        setData({ ...data, intro: { ...data.intro, features: newFeatures } });
    };

    const removeIntroFeature = (index: number) => {
        if (!data) return;
        setData({
            ...data,
            intro: {
                ...data.intro,
                features: data.intro.features.filter((_, i) => i !== index)
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    if (!data) {
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
                    <h1 className="text-3xl font-bold text-slate-900">Seiteninhalte</h1>
                    <p className="text-slate-600 mt-1">
                        Texte und Inhalte der Startseite
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
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

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {[
                    { id: 'hero', label: 'Hero-Bereich', icon: ImageIcon },
                    { id: 'intro', label: 'Intro', icon: Quote },
                    { id: 'features', label: 'Features', icon: Sparkles },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Hero Bereich */}
            {activeTab === 'hero' && (
                <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold mb-4">Hero-Bereich</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Der große Bereich oben auf der Startseite
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Hauptüberschrift
                            </label>
                            <input
                                type="text"
                                value={data.hero.headline}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    hero: { ...data.hero, headline: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Unterüberschrift
                            </label>
                            <textarea
                                value={data.hero.subheadline}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    hero: { ...data.hero, subheadline: e.target.value }
                                })}
                                rows={2}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Primärer Button
                                </label>
                                <input
                                    type="text"
                                    value={data.hero.primaryCta}
                                    onChange={(e) => setData({ 
                                        ...data, 
                                        hero: { ...data.hero, primaryCta: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Sekundärer Button
                                </label>
                                <input
                                    type="text"
                                    value={data.hero.secondaryCta}
                                    onChange={(e) => setData({ 
                                        ...data, 
                                        hero: { ...data.hero, secondaryCta: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Hintergrundbild
                            </label>
                            <input
                                type="text"
                                value={data.hero.backgroundImage}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    hero: { ...data.hero, backgroundImage: e.target.value }
                                })}
                                placeholder="/images/hero.png"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Intro Bereich */}
            {activeTab === 'intro' && (
                <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold mb-4">Intro-Bereich</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Der Willkommens-Bereich unter dem Hero
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Zitat
                            </label>
                            <input
                                type="text"
                                value={data.intro.quote}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    intro: { ...data.intro, quote: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Überschrift
                            </label>
                            <input
                                type="text"
                                value={data.intro.headline}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    intro: { ...data.intro, headline: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Text
                            </label>
                            <textarea
                                value={data.intro.text}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    intro: { ...data.intro, text: e.target.value }
                                })}
                                rows={4}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Bild
                            </label>
                            <input
                                type="text"
                                value={data.intro.image}
                                onChange={(e) => setData({ 
                                    ...data, 
                                    intro: { ...data.intro, image: e.target.value }
                                })}
                                placeholder="/images/..."
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                        {/* Intro Features (Bulletpoints) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Highlights (Bulletpoints)
                            </label>
                            <div className="space-y-2">
                                {data.intro.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateIntroFeature(index, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <button
                                            onClick={() => removeIntroFeature(index)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addIntroFeature}
                                className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                                <Plus className="w-4 h-4" />
                                Highlight hinzufügen
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Bereich */}
            {activeTab === 'features' && (
                <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold mb-4">Features-Bereich</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Die Icon-Kacheln &quot;Das erwartet Sie&quot;
                    </p>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Überschrift
                                </label>
                                <input
                                    type="text"
                                    value={data.features.headline}
                                    onChange={(e) => setData({ 
                                        ...data, 
                                        features: { ...data.features, headline: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Unterüberschrift
                                </label>
                                <input
                                    type="text"
                                    value={data.features.subheadline}
                                    onChange={(e) => setData({ 
                                        ...data, 
                                        features: { ...data.features, subheadline: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Feature Items */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-700">
                                Features
                            </label>
                            {data.features.items.map((item, index) => (
                                <div 
                                    key={index}
                                    className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs text-slate-500 mb-1">Icon</label>
                                            <select
                                                value={item.iconName}
                                                onChange={(e) => updateFeature(index, 'iconName', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            >
                                                {availableIcons.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-500 mb-1">Titel</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-xs text-slate-500 mb-1">Beschreibung</label>
                                                <input
                                                    type="text"
                                                    value={item.desc}
                                                    onChange={(e) => updateFeature(index, 'desc', e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeFeature(index)}
                                                className="mt-5 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={addFeature}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Feature hinzufügen
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

