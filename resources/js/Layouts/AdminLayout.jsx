import { useState } from 'react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import Toast from '@/Components/Toast';

export default function AdminLayout({ user, title, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 flex font-sans overflow-hidden">
            <Head title={`${title} - Admin Panel`} />
            
            <Toast />

            {/* Sidebar */}
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader user={user} setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto bg-slate-50/50">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        {header && (
                            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                {header}
                            </div>
                        )}
                        {!header && title && (
                            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-1 w-1 rounded-full bg-indigo-500"></div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                        {title}
                                    </h1>
                                </div>
                                <div className="h-px w-20 bg-gradient-to-r from-indigo-500 to-transparent mt-2"></div>
                            </div>
                        )}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
