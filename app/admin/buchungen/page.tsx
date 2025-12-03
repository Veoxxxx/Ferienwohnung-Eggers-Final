'use client';

import { useState, useEffect } from 'react';
import { 
    Check, X, Clock, Mail, Phone, Calendar, Users, 
    Dog, MessageSquare, Filter, RefreshCw
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
    phone?: string;
    message?: string;
    dogsIncluded: boolean;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
}

export default function BookingsAdmin() {
    const [bookings, setBookings] = useState<BookingRequest[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/bookings');
            const data = await res.json();
            setBookings(data.data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, status: BookingRequest['status']) => {
        setUpdating(id);
        try {
            const res = await fetch('/api/admin/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            
            if (res.ok) {
                setBookings(bookings.map(b => 
                    b.id === id ? { ...b, status } : b
                ));
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        }
        setUpdating(null);
    };

    const filteredBookings = filter === 'all' 
        ? bookings 
        : bookings.filter(b => b.status === filter);

    const statusColors = {
        pending: 'bg-amber-100 text-amber-800 border-amber-200',
        confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
    };

    const statusLabels = {
        pending: 'Offen',
        confirmed: 'Bestätigt',
        cancelled: 'Storniert',
    };

    const statusIcons = {
        pending: Clock,
        confirmed: Check,
        cancelled: X,
    };

    // Statistiken
    const stats = {
        all: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Buchungsanfragen</h1>
                    <p className="text-slate-600 mt-1">
                        {stats.pending} offene Anfrage{stats.pending !== 1 ? 'n' : ''}
                    </p>
                </div>
                <button
                    onClick={fetchBookings}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Aktualisieren
                </button>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            filter === f 
                                ? 'bg-slate-900 text-white' 
                                : 'bg-white border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        {f === 'all' ? 'Alle' : statusLabels[f]}
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            filter === f ? 'bg-white/20' : 'bg-slate-100'
                        }`}>
                            {stats[f]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Buchungsliste */}
            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Keine Buchungen gefunden</p>
                        <p className="text-slate-400 text-sm mt-1">
                            {filter !== 'all' ? 'Versuchen Sie einen anderen Filter' : 'Es liegen noch keine Anfragen vor'}
                        </p>
                    </div>
                ) : (
                    filteredBookings
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map(booking => {
                            const StatusIcon = statusIcons[booking.status];
                            const nights = Math.ceil(
                                (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) 
                                / (1000 * 60 * 60 * 24)
                            );

                            return (
                                <div 
                                    key={booking.id} 
                                    className={`bg-white rounded-xl p-6 border transition-all ${
                                        booking.status === 'pending' 
                                            ? 'border-amber-200 shadow-amber-100 shadow-sm' 
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                        <div className="flex-1 space-y-4">
                                            {/* Header mit Name und Status */}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {booking.name}
                                                </h3>
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {statusLabels[booking.status]}
                                                </span>
                                                {booking.dogsIncluded && (
                                                    <span className="inline-flex items-center gap-1 text-slate-500 text-sm bg-slate-100 px-2 py-1 rounded-full">
                                                        <Dog className="w-3 h-3" /> Mit Hund
                                                    </span>
                                                )}
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <span>
                                                        {new Date(booking.checkIn).toLocaleDateString('de-DE')} – {new Date(booking.checkOut).toLocaleDateString('de-DE')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                    <span>{nights} Nächte</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Users className="w-4 h-4 text-slate-400" />
                                                    <span>
                                                        {booking.adults} Erw.
                                                        {booking.children > 0 && ` + ${booking.children} Kind${booking.children > 1 ? 'er' : ''}`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    <a 
                                                        href={`mailto:${booking.email}`} 
                                                        className="hover:text-blue-600 hover:underline truncate"
                                                    >
                                                        {booking.email}
                                                    </a>
                                                </div>
                                                {booking.phone && (
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Phone className="w-4 h-4 text-slate-400" />
                                                        <a 
                                                            href={`tel:${booking.phone}`} 
                                                            className="hover:text-blue-600 hover:underline"
                                                        >
                                                            {booking.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Nachricht */}
                                            {booking.message && (
                                                <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                                                    <MessageSquare className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                                    <p>&quot;{booking.message}&quot;</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Aktionen */}
                                        {booking.status === 'pending' && (
                                            <div className="flex lg:flex-col gap-2">
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'confirmed')}
                                                    disabled={updating === booking.id}
                                                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Check className="w-4 h-4" /> 
                                                    Bestätigen
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'cancelled')}
                                                    disabled={updating === booking.id}
                                                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <X className="w-4 h-4" /> 
                                                    Ablehnen
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Metadaten */}
                                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex flex-wrap gap-4">
                                        <span>ID: {booking.id}</span>
                                        <span>Erstellt: {new Date(booking.createdAt).toLocaleString('de-DE')}</span>
                                    </div>
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    );
}

