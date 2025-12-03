'use client';

import Link from 'next/link';
import { Phone, FileText, Palette, ChevronRight } from 'lucide-react';

export default function EinstellungenAdmin() {
    const sections = [
        {
            title: 'Kontaktdaten',
            description: 'Adresse, Telefon, E-Mail und Social Media Links',
            icon: Phone,
            href: '/admin/einstellungen/kontakt',
            color: 'bg-blue-500',
        },
        {
            title: 'Seiteninhalte',
            description: 'Hero-Texte, Intro-Bereich und Features bearbeiten',
            icon: FileText,
            href: '/admin/einstellungen/inhalte',
            color: 'bg-purple-500',
        },
        {
            title: 'Design & Farben',
            description: 'Farbschema für Light/Dark Mode anpassen',
            icon: Palette,
            href: '/admin/einstellungen/design',
            color: 'bg-pink-500',
        },
    ];

    return (
        <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Einstellungen</h1>
                <p className="text-slate-600 mt-1">
                    Verwalten Sie Kontaktdaten und Seiteninhalte
                </p>
            </div>

            {/* Sektionen */}
            <div className="space-y-4">
                {sections.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="flex items-center gap-4 bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
                    >
                        <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {section.title}
                            </h2>
                            <p className="text-sm text-slate-500 mt-0.5">
                                {section.description}
                            </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

