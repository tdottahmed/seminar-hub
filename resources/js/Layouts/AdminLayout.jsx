import { useState } from 'react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ user, title, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <Head title={title} />
            
            {/* Sidebar */}
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader user={user} setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {header && (
                            <div className="mb-8">
                                {header}
                            </div>
                        )}
                        {!header && title && (
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
