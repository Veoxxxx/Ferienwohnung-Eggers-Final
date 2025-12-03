'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
    CalendarCheck, DollarSign, Star, Image, 
    Settings, AlertCircle, Users, Clock,
    TrendingUp, ArrowRight
} from 'lucide-react';

interface BookingRequest {
    id: string;
    checkIn: string;
    checkOut: string;
    guestCount: number;
    adults: number;
    children: number;
    name: string;
    email: string;
    dogsIncluded: boolean;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
}

interface ContentData {
    booking: {
        prices: {
            basePricePerNight: number;
        };
        seasonal: {
            high: { multiplier: number };
        };
    };
    pages: {
        home: {
            testimonials: {
                reviews: Array<{ id: string }>;
            };
        };
        gallery: {
            categories: Array<{ images: Array<unknown> }>;
        };
    };
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<BookingRequest[]>([]);
    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/admin/bookings').then(r => r.json()),
            fetch('/api/admin/content').then(r => r.json()),
        ]).then(([bookingsData, contentData]) => {
            setBookings(bookingsData.data || []);
            setContent(contentData);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
    const totalGuests = confirmedBookings.reduce((sum, b) => sum + b.guestCount, 0);
    
    const nextArrival = confirmedBookings
        .filter(b => new Date(b.checkIn) > new Date())
        .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())[0];

    const reviewCount = content?.pages.home.testimonials.reviews.length || 0;
    const categoryCount = content?.pages.gallery.categories.length || 0;
    const imageCount = content?.pages.gallery.categories.reduce(
        (acc, cat) => acc + cat.images.length, 0
    ) || 0;

    return (
        <div className="space-y-8 max-w-7xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-1">
                    Willkommen zurück! Hier ist Ihre Übersicht.
                </p>
            </div>

            {/* Alert - Neue Buchungsanfragen */}
            {pendingBookings.length > 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-600" />
                        <div className="flex-1">
                            <p className="font-semibold text-amber-800">
                                {pendingBookings.length} neue Buchungsanfrage{pendingBookings.length > 1 ? 'n' : ''}
                            </p>
                            <Link 
                                href="/admin/buchungen" 
                                className="text-amber-600 hover:text-amber-800 text-sm font-medium inline-flex items-center gap-1 mt-1"
                            >
                                Jetzt bearbeiten <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistik-Karten */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Offene Anfragen" 
                    value={pendingBookings.length}
                    icon={Clock}
                    color="amber"
                    href="/admin/buchungen?filter=pending"
                />
                <StatCard 
                    title="Bestätigte Buchungen" 
                    value={confirmedBookings.length}
                    icon={CalendarCheck}
                    color="emerald"
                    href="/admin/buchungen?filter=confirmed"
                />
                <StatCard 
                    title="Gäste (bestätigt)" 
                    value={totalGuests}
                    icon={Users}
                    color="blue"
                />
                <StatCard 
                    title="Basispreis/Nacht" 
                    value={`${content?.booking.prices.basePricePerNight || 0} €`}
                    icon={DollarSign}
                    color="slate"
                    href="/admin/preise"
                />
            </div>

            {/* Nächste Anreise */}
            {nextArrival && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-3">
                        <TrendingUp className="w-4 h-4" />
                        Nächste Anreise
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xl font-bold text-slate-900">{nextArrival.name}</p>
                            <p className="text-slate-600">
                                {new Date(nextArrival.checkIn).toLocaleDateString('de-DE', { 
                                    weekday: 'long', 
                                    day: 'numeric', 
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="text-right text-slate-600">
                            <p className="font-medium">{nextArrival.guestCount} Gäste</p>
                            {nextArrival.dogsIncluded && (
                                <p className="text-sm">🐕 Mit Hund</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Schnellzugriff-Karten */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <QuickAccessCard
                    title="Buchungen"
                    description={`${pendingBookings.length} offen, ${confirmedBookings.length} bestätigt`}
                    icon={CalendarCheck}
                    href="/admin/buchungen"
                    color="bg-blue-500"
                />
                <QuickAccessCard
                    title="Preise & Saisons"
                    description={`${content?.booking.prices.basePricePerNight || 0}€ Basis | +${Math.round((content?.booking.seasonal.high.multiplier || 1 - 1) * 100)}% Hauptsaison`}
                    icon={DollarSign}
                    href="/admin/preise"
                    color="bg-emerald-500"
                />
                <QuickAccessCard
                    title="Bewertungen"
                    description={`${reviewCount} Testimonials`}
                    icon={Star}
                    href="/admin/bewertungen"
                    color="bg-amber-500"
                />
                <QuickAccessCard
                    title="Galerie"
                    description={`${categoryCount} Kategorien, ${imageCount} Bilder`}
                    icon={Image}
                    href="/admin/galerie"
                    color="bg-purple-500"
                />
            </div>

            {/* Letzte Buchungsanfragen */}
            {bookings.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        <h2 className="font-semibold text-slate-900">Letzte Buchungsanfragen</h2>
                        <Link 
                            href="/admin/buchungen" 
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Alle anzeigen
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {bookings.slice(0, 5).map(booking => (
                            <div key={booking.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">{booking.name}</p>
                                    <p className="text-sm text-slate-500">
                                        {new Date(booking.checkIn).toLocaleDateString('de-DE')} – {new Date(booking.checkOut).toLocaleDateString('de-DE')}
                                    </p>
                                </div>
                                <StatusBadge status={booking.status} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Einstellungen Link */}
            <div className="pt-4 border-t border-slate-200">
                <Link 
                    href="/admin/einstellungen"
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span>Kontaktdaten & Seiteninhalte bearbeiten</span>
                </Link>
            </div>
        </div>
    );
}

// Komponenten
function StatCard({ title, value, icon: Icon, color, href }: { 
    title: string; 
    value: string | number; 
    icon: React.ElementType; 
    color: string;
    href?: string;
}) {
    const colorClasses = {
        amber: 'bg-amber-50 text-amber-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        blue: 'bg-blue-50 text-blue-600',
        slate: 'bg-slate-100 text-slate-600',
    };

    const content = (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className="text-sm text-slate-500">{title}</p>
                </div>
            </div>
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }
    return content;
}

function QuickAccessCard({ title, description, icon: Icon, href, color }: {
    title: string; 
    description: string; 
    icon: React.ElementType; 
    href: string; 
    color: string;
}) {
    return (
        <Link
            href={href}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
        >
            <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
        </Link>
    );
}

function StatusBadge({ status }: { status: 'pending' | 'confirmed' | 'cancelled' }) {
    const styles = {
        pending: 'bg-amber-100 text-amber-800 border-amber-200',
        confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    const labels = {
        pending: 'Offen',
        confirmed: 'Bestätigt',
        cancelled: 'Storniert',
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}

