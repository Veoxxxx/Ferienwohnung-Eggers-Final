'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, CalendarCheck, DollarSign, 
    Star, Image, Settings, ExternalLink, LogOut,
    Menu, X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { href: '/admin', label: 'Übersicht', icon: LayoutDashboard },
    { href: '/admin/buchungen', label: 'Buchungen', icon: CalendarCheck },
    { href: '/admin/preise', label: 'Preise', icon: DollarSign },
    { href: '/admin/bewertungen', label: 'Bewertungen', icon: Star },
    { href: '/admin/galerie', label: 'Galerie', icon: Image },
    { href: '/admin/einstellungen', label: 'Einstellungen', icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Login-Seite braucht keine Auth-Prüfung
        if (pathname === '/admin/login') {
            setChecking(false);
            setAuthenticated(true);
            return;
        }

        // Auth-Status prüfen
        fetch('/api/admin/auth')
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setAuthenticated(true);
                } else {
                    window.location.href = '/admin/login';
                }
                setChecking(false);
            })
            .catch(() => {
                window.location.href = '/admin/login';
                setChecking(false);
            });
    }, [pathname]);

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        window.location.href = '/admin/login';
    };

    // Login-Seite: Nur Kinder rendern (eigenes Layout)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Auth wird geprüft
    if (checking) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
                    <p className="text-slate-500 text-sm">Authentifizierung wird geprüft...</p>
                </div>
            </div>
        );
    }

    // Nicht authentifiziert
    if (!authenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-slate-900 text-white flex flex-col
                transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Header */}
                <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            <span className="text-2xl">🏠</span>
                            Admin
                        </h1>
                        <p className="text-slate-400 text-xs mt-0.5">Ferienwohnung Eggers</p>
                    </div>
                    <button 
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || 
                            (item.href !== '/admin' && pathname?.startsWith(item.href));
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg 
                                    transition-colors text-sm font-medium
                                    ${isActive 
                                        ? 'bg-slate-800 text-white' 
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-slate-700 space-y-1">
                    <Link 
                        href="/" 
                        target="_blank"
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Website öffnen
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Abmelden
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="font-semibold">Admin Dashboard</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

