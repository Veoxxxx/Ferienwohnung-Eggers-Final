'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Star, Check, AlertCircle, GripVertical } from 'lucide-react';

interface Review {
    id: string;
    name: string;
    date: string;
    text: string;
    rating: number;
}

export default function BewertungenAdmin() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/content?section=pages.home.testimonials.reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Fehler beim Laden');
                setLoading(false);
            });
    }, []);

    const addReview = () => {
        const newReview: Review = {
            id: `review-${Date.now()}`,
            name: '',
            date: new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' }),
            text: '',
            rating: 5,
        };
        setReviews([...reviews, newReview]);
    };

    const updateReview = (id: string, field: keyof Review, value: string | number) => {
        setReviews(reviews.map(r => 
            r.id === id ? { ...r, [field]: value } : r
        ));
    };

    const deleteReview = (id: string) => {
        if (confirm('Möchten Sie diese Bewertung wirklich löschen?')) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    path: 'pages.home.testimonials.reviews', 
                    data: reviews 
                }),
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

    const avgRating = reviews.length > 0 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Gästebewertungen</h1>
                    <p className="text-slate-600 mt-1">
                        {reviews.length} Bewertungen · Ø {avgRating} ★
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={addReview}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Neue Bewertung
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

            {/* Reviews Liste */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                        <Star className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Keine Bewertungen vorhanden</p>
                        <button
                            onClick={addReview}
                            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Erste Bewertung hinzufügen
                        </button>
                    </div>
                ) : (
                    reviews.map((review, index) => (
                        <div 
                            key={review.id} 
                            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                        >
                            <div className="flex items-start gap-4">
                                {/* Drag Handle (visuell, ohne Funktion) */}
                                <div className="text-slate-300 pt-2 hidden sm:block">
                                    <GripVertical className="w-5 h-5" />
                                </div>

                                <div className="flex-1 space-y-4">
                                    {/* Name und Datum */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={review.name}
                                                onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                                                placeholder="z.B. Sabine M."
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Datum
                                            </label>
                                            <input
                                                type="text"
                                                value={review.date}
                                                onChange={(e) => updateReview(review.id, 'date', e.target.value)}
                                                placeholder="z.B. August 2024"
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Bewertungstext */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Bewertung
                                        </label>
                                        <textarea
                                            value={review.text}
                                            onChange={(e) => updateReview(review.id, 'text', e.target.value)}
                                            placeholder="Was hat dem Gast besonders gefallen?"
                                            rows={3}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        />
                                    </div>

                                    {/* Sterne */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-600">Bewertung:</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => updateReview(review.id, 'rating', star)}
                                                        className={`transition-colors ${
                                                            star <= review.rating 
                                                                ? 'text-amber-400' 
                                                                : 'text-slate-200 hover:text-amber-200'
                                                        }`}
                                                    >
                                                        <Star className="w-6 h-6 fill-current" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <span className="text-xs text-slate-400">#{index + 1}</span>
                                    </div>
                                </div>

                                {/* Löschen Button */}
                                <button
                                    onClick={() => deleteReview(review.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Bewertung löschen"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Hinweis */}
            {reviews.length > 0 && (
                <p className="text-sm text-slate-500 mt-6 text-center">
                    💡 Tipp: Echte Gästebewertungen von Google Maps können hier übernommen werden
                </p>
            )}
        </div>
    );
}

