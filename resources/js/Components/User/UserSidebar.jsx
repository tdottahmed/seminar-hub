import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Calendar, Award, User, Settings, LogOut, X } from 'lucide-react';

export default function UserSidebar({ open, setOpen }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: url.startsWith('/dashboard') },
        { name: 'My Events', href: '#', icon: Calendar, active: false },
        { name: 'Certificates', href: '#', icon: Award, active: false },
        { name: 'Profile', href: route('profile.edit'), icon: User, active: url.startsWith('/profile') },
        { name: 'Settings', href: '#', icon: Settings, active: false },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-gray-900/50 z-40 lg:hidden transition-opacity duration-300 ${
                    open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-50">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/assets/logo/Logo-prochesta-IT-dark-1.png" alt="Logo" className="h-8 w-auto" />
                    </Link>
                    <button 
                        onClick={() => setOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                item.active 
                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <item.icon size={20} className={item.active ? 'text-indigo-600' : 'text-gray-400'} />
                            {item.name}
                        </Link>
                    ))}
                    
                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                            <LogOut size={20} />
                            Log Out
                        </Link>
                    </div>
                </nav>
            </aside>
        </>
    );
}
