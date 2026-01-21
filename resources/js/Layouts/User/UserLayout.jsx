import { useState } from 'react';
import UserSidebar from '@/Components/User/UserSidebar';
import UserHeader from '@/Components/User/UserHeader';
import UserFooter from '@/Components/User/UserFooter';
import { Head } from '@inertiajs/react';

export default function UserLayout({ user, title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <Head title={`${title} - Dashboard`} />

            {/* Sidebar */}
            <UserSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
                
                {/* Header */}
                <UserHeader user={user} setSidebarOpen={setSidebarOpen} />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <UserFooter />
            </div>
        </div>
    );
}
