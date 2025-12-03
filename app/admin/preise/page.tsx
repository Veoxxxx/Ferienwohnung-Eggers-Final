'use client';

import { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, Euro, Calendar, Sun, Snowflake } from 'lucide-react';

interface BookingPrices {
    prices: {
        basePricePerNight: number;
        cleaningFee: number;
        dogFee: number;
        cityTaxPerAdultPerNight: number;
        minimumStay: number;
    };
    seasonal: {
        high: { start: string; end: string; multiplier: number };
        low: { start: string; end: string; multiplier: number };
    };
}

export default function PreiseAdmin() {
    const [data, setData] = useState<BookingPrices | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/content?section=booking')
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
                body: JSON.stringify({ section: 'booking', data }),
            });
            
            if (!res.ok) throw new Error('Speichern fehlgeschlagen');
            
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError('Fehler beim Speichern');
        }
        
        setSaving(false);
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
                Fehler beim Laden der Preise
            </div>
        );
    }

    // Berechnete Preise für Vorschau
    const highSeasonPrice = Math.round(data.prices.basePricePerNight * data.seasonal.high.multiplier);
    const lowSeasonPrice = Math.round(data.prices.basePricePerNight * data.seasonal.low.multiplier);

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Preise & Buchung</h1>
                    <p className="text-slate-600 mt-1">
                        Verwalten Sie Ihre Preise und saisonalen Anpassungen
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

            {/* Grundpreise */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center gap-2 mb-6">
                    <Euro className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold">Grundpreise</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Basispreis pro Nacht (€)
                        </label>
                        <input
                            type="number"
                            value={data.prices.basePricePerNight}
                            onChange={(e) => setData({
                                ...data,
                                prices: { ...data.prices, basePricePerNight: Number(e.target.value) }
                            })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">Preis in der Zwischensaison</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Endreinigung (€)
                        </label>
                        <input
                            type="number"
                            value={data.prices.cleaningFee}
                            onChange={(e) => setData({
                                ...data,
                                prices: { ...data.prices, cleaningFee: Number(e.target.value) }
                            })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Hundegebühr pauschal (€)
                        </label>
                        <input
                            type="number"
                            value={data.prices.dogFee}
                            onChange={(e) => setData({
                                ...data,
                                prices: { ...data.prices, dogFee: Number(e.target.value) }
                            })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Kurtaxe pro Erwachsener/Nacht (€)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.prices.cityTaxPerAdultPerNight}
                            onChange={(e) => setData({
                                ...data,
                                prices: { ...data.prices, cityTaxPerAdultPerNight: Number(e.target.value) }
                            })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">Gesetzlich vorgeschrieben</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Mindestaufenthalt (Nächte)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={data.prices.minimumStay}
                            onChange={(e) => setData({
                                ...data,
                                prices: { ...data.prices, minimumStay: Number(e.target.value) }
                            })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Saisonpreise */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold">Saisonpreise</h2>
                </div>
                
                {/* Hauptsaison */}
                <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Sun className="w-5 h-5 text-amber-600" />
                        <h3 className="font-semibold text-amber-800">Hauptsaison (Sommer)</h3>
                        <span className="ml-auto text-lg font-bold text-amber-700">
                            {highSeasonPrice} €/Nacht
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-800 mb-1">
                                Start (MM-TT)
                            </label>
                            <input
                                type="text"
                                value={data.seasonal.high.start}
                                onChange={(e) => setData({
                                    ...data,
                                    seasonal: { 
                                        ...data.seasonal, 
                                        high: { ...data.seasonal.high, start: e.target.value } 
                                    }
                                })}
                                placeholder="06-15"
                                className="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-800 mb-1">
                                Ende (MM-TT)
                            </label>
                            <input
                                type="text"
                                value={data.seasonal.high.end}
                                onChange={(e) => setData({
                                    ...data,
                                    seasonal: { 
                                        ...data.seasonal, 
                                        high: { ...data.seasonal.high, end: e.target.value } 
                                    }
                                })}
                                placeholder="09-15"
                                className="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-800 mb-1">
                                Aufschlag (%)
                            </label>
                            <input
                                type="number"
                                value={Math.round((data.seasonal.high.multiplier - 1) * 100)}
                                onChange={(e) => setData({
                                    ...data,
                                    seasonal: { 
                                        ...data.seasonal, 
                                        high: { 
                                            ...data.seasonal.high, 
                                            multiplier: 1 + Number(e.target.value) / 100 
                                        } 
                                    }
                                })}
                                className="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Nebensaison */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Snowflake className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-800">Nebensaison (Winter)</h3>
                        <span className="ml-auto text-lg font-bold text-blue-700">
                            {lowSeasonPrice} €/Nacht
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-800 mb-1">
                                Start (MM-TT)
                            </label>
                            <input
                                type="text"
                                value={data.seasonal.low.start}
                                onChange={(e) => setData({
                                    ...data,
                                    seasonal: { 
                                        ...data.seasonal, 
                                        low: { ...data.seasonal.low, start: e.target.value } 
                                    }
                                })}
                                placeholder="11-01"
                                className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-800 mb-1">
                                Ende (MM-TT)
                            </label>
                            <input
                                type="text"
                                value={data.seasonal.low.end}
                                onChange={(e) => setData({
                                    ...data,
                                    seasonal: { 
                                        ...data.seasonal, 
                                        low: { ...data.seasonal.low, end: e.target.value } 
                                    }
                                })}
                                placeholder="02-28"
                                className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-800 mb-1">
                                Rabatt (%)
                            </label>
                            <input
                                type="number"
                                value={Math.round((1 - data.seasonal.low.multiplier) * 100)}
                                onChange={(e) => setData({
                                    ...data,
                                    seasonal: { 
                                        ...data.seasonal, 
                                        low: { 
                                            ...data.seasonal.low, 
                                            multiplier: 1 - Number(e.target.value) / 100 
                                        } 
                                    }
                                })}
                                className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Preisübersicht */}
            <section className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-4">Preisübersicht</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-500 mb-1">Nebensaison</p>
                        <p className="text-2xl font-bold text-blue-600">{lowSeasonPrice} €</p>
                        <p className="text-xs text-slate-400">pro Nacht</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-500 mb-1">Zwischensaison</p>
                        <p className="text-2xl font-bold text-slate-700">{data.prices.basePricePerNight} €</p>
                        <p className="text-xs text-slate-400">pro Nacht</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-500 mb-1">Hauptsaison</p>
                        <p className="text-2xl font-bold text-amber-600">{highSeasonPrice} €</p>
                        <p className="text-xs text-slate-400">pro Nacht</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

