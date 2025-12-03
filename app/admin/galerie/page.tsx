'use client';

import { useState, useEffect } from 'react';
import { 
    Save, Plus, Trash2, Check, AlertCircle, 
    Image as ImageIcon, Folder, ChevronDown, ChevronUp
} from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
    src: string;
    alt: string;
    span: string;
}

interface GalleryCategory {
    id: string;
    title: string;
    description: string;
    images: GalleryImage[];
}

export default function GalerieAdmin() {
    const [categories, setCategories] = useState<GalleryCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch('/api/admin/content?section=pages.gallery.categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data || []);
                // Alle Kategorien initial expandieren
                setExpandedCategories(new Set((data || []).map((c: GalleryCategory) => c.id)));
                setLoading(false);
            })
            .catch(() => {
                setError('Fehler beim Laden');
                setLoading(false);
            });
    }, []);

    const toggleCategory = (id: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCategories(newExpanded);
    };

    const updateCategory = (id: string, field: 'title' | 'description', value: string) => {
        setCategories(categories.map(c => 
            c.id === id ? { ...c, [field]: value } : c
        ));
    };

    const updateImage = (categoryId: string, imageIndex: number, field: keyof GalleryImage, value: string) => {
        setCategories(categories.map(c => {
            if (c.id !== categoryId) return c;
            const newImages = [...c.images];
            newImages[imageIndex] = { ...newImages[imageIndex], [field]: value };
            return { ...c, images: newImages };
        }));
    };

    const addImage = (categoryId: string) => {
        setCategories(categories.map(c => {
            if (c.id !== categoryId) return c;
            return {
                ...c,
                images: [...c.images, { src: '', alt: '', span: 'md:col-span-1 md:row-span-1' }]
            };
        }));
    };

    const removeImage = (categoryId: string, imageIndex: number) => {
        if (!confirm('Möchten Sie dieses Bild wirklich entfernen?')) return;
        
        setCategories(categories.map(c => {
            if (c.id !== categoryId) return c;
            return {
                ...c,
                images: c.images.filter((_, i) => i !== imageIndex)
            };
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    path: 'pages.gallery.categories', 
                    data: categories 
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

    const totalImages = categories.reduce((sum, c) => sum + c.images.length, 0);

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Galerie</h1>
                    <p className="text-slate-600 mt-1">
                        {categories.length} Kategorien · {totalImages} Bilder
                    </p>
                </div>
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

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Kategorien */}
            <div className="space-y-4">
                {categories.map((category) => (
                    <div 
                        key={category.id}
                        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                        {/* Kategorie Header */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Folder className="w-5 h-5 text-purple-500" />
                                <div className="text-left">
                                    <p className="font-semibold text-slate-900">{category.title}</p>
                                    <p className="text-sm text-slate-500">
                                        {category.images.length} Bilder
                                    </p>
                                </div>
                            </div>
                            {expandedCategories.has(category.id) ? (
                                <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                        </button>

                        {/* Kategorie Inhalt */}
                        {expandedCategories.has(category.id) && (
                            <div className="p-4 pt-0 border-t border-slate-100">
                                {/* Kategorie Bearbeiten */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Titel
                                        </label>
                                        <input
                                            type="text"
                                            value={category.title}
                                            onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Beschreibung
                                        </label>
                                        <input
                                            type="text"
                                            value={category.description}
                                            onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Bilder Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    {category.images.map((image, imageIndex) => (
                                        <div 
                                            key={imageIndex}
                                            className="bg-slate-50 rounded-lg p-3 border border-slate-200"
                                        >
                                            {/* Bild Vorschau */}
                                            <div className="relative aspect-video bg-slate-200 rounded-lg mb-3 overflow-hidden">
                                                {image.src ? (
                                                    <Image
                                                        src={image.src}
                                                        alt={image.alt || 'Vorschau'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <ImageIcon className="w-8 h-8 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bild Felder */}
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={image.src}
                                                    onChange={(e) => updateImage(category.id, imageIndex, 'src', e.target.value)}
                                                    placeholder="Bildpfad (z.B. /images/...)"
                                                    className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <input
                                                    type="text"
                                                    value={image.alt}
                                                    onChange={(e) => updateImage(category.id, imageIndex, 'alt', e.target.value)}
                                                    placeholder="Beschreibung (Alt-Text)"
                                                    className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="flex items-center justify-between">
                                                    <select
                                                        value={image.span}
                                                        onChange={(e) => updateImage(category.id, imageIndex, 'span', e.target.value)}
                                                        className="px-3 py-1.5 text-sm border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="md:col-span-1 md:row-span-1">Normal</option>
                                                        <option value="md:col-span-2 md:row-span-1">Breit</option>
                                                        <option value="md:col-span-2 md:row-span-2">Groß</option>
                                                    </select>
                                                    <button
                                                        onClick={() => removeImage(category.id, imageIndex)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        title="Bild entfernen"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Bild hinzufügen */}
                                    <button
                                        onClick={() => addImage(category.id)}
                                        className="aspect-video flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                    >
                                        <Plus className="w-8 h-8 text-slate-400 mb-2" />
                                        <span className="text-sm text-slate-500">Bild hinzufügen</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Hinweis */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                    💡 <strong>Tipp:</strong> Bilder müssen im Ordner <code className="bg-blue-100 px-1 rounded">/public/images/</code> liegen. 
                    Geben Sie dann den relativen Pfad ein, z.B. <code className="bg-blue-100 px-1 rounded">/images/mein-bild.png</code>
                </p>
            </div>
        </div>
    );
}

