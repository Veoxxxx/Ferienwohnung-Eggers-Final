import './admin.css';
import AdminShell from './admin-shell';

export const metadata = {
    title: 'Admin Dashboard | Ferienwohnung Eggers',
    description: 'Verwaltungsbereich für Ferienwohnung Eggers',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de">
            <body className="antialiased">
                <AdminShell>
                    {children}
                </AdminShell>
            </body>
        </html>
    );
}
