'use client';

import { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, ArrowLeft, MapPin, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';

interface GeneralData {
    brandName: string;
    description: string;
    address: {
        street: string;
        zipCity: string;
        mapsLink: string;
    };
    contact: {
        phone: string;
        phoneRaw: string;
        email: string;
    };
    socials: {
        instagram: string;
        facebook: string;
    };
}

export default function KontaktEinstellungen() {
    const [data, setData] = useState<GeneralData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/content?section=general')
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
                body: JSON.stringify({ section: 'general', data }),
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
                Fehler beim Laden der Daten
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
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
                    <h1 className="text-3xl font-bold text-slate-900">Kontaktdaten</h1>
                    <p className="text-slate-600 mt-1">
                        Adresse, Telefon und Social Media
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

            {/* Allgemein */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                <h2 className="text-lg font-semibold mb-4">Allgemein</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Markenname
                        </label>
                        <input
                            type="text"
                            autoComplete="organization"
                            value={data.brandName}
                            onChange={(e) => setData({ ...data, brandName: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Kurzbeschreibung
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                    </div>
                </div>
            </section>

            {/* Adresse */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold">Adresse</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Straße & Hausnummer
                        </label>
                        <input
                            type="text"
                            autoComplete="street-address"
                            value={data.address.street}
                            onChange={(e) => setData({ 
                                ...data, 
                                address: { ...data.address, street: e.target.value }
                            })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            PLZ & Ort
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={data.address.zipCity}
                            onChange={(e) => setData({ 
                                ...data, 
                                address: { ...data.address, zipCity: e.target.value }
                            })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Google Maps Link
                        </label>
                        <input
                            type="url"
                            autoComplete="url"
                            value={data.address.mapsLink}
                            onChange={(e) => setData({ 
                                ...data, 
                                address: { ...data.address, mapsLink: e.target.value }
                            })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Kontakt */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold">Kontakt</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Telefon (Anzeige)
                        </label>
                        <input
                            type="text"
                            autoComplete="tel"
                            value={data.contact.phone}
                            onChange={(e) => setData({ 
                                ...data, 
                                contact: { ...data.contact, phone: e.target.value }
                            })}
                            placeholder="+49 (0) 4721 123 456"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Telefon (Link-Format)
                        </label>
                        <input
                            type="text"
                            autoComplete="tel"
                            value={data.contact.phoneRaw}
                            onChange={(e) => setData({ 
                                ...data, 
                                contact: { ...data.contact, phoneRaw: e.target.value }
                            })}
                            placeholder="+4947211234567"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-slate-500 mt-1">Ohne Leerzeichen, für tel:-Links</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            <Mail className="w-4 h-4 inline mr-1" />
                            E-Mail-Adresse
                        </label>
                        <input
                            type="email"
                            autoComplete="email"
                            value={data.contact.email}
                            onChange={(e) => setData({ 
                                ...data, 
                                contact: { ...data.contact, email: e.target.value }
                            })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold">Social Media</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Instagram
                        </label>
                        <input
                            type="url"
                            autoComplete="url"
                            value={data.socials.instagram}
                            onChange={(e) => setData({ 
                                ...data, 
                                socials: { ...data.socials, instagram: e.target.value }
                            })}
                            placeholder="https://instagram.com/..."
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Facebook
                        </label>
                        <input
                            type="url"
                            autoComplete="url"
                            value={data.socials.facebook}
                            onChange={(e) => setData({ 
                                ...data, 
                                socials: { ...data.socials, facebook: e.target.value }
                            })}
                            placeholder="https://facebook.com/..."
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

