import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Calendar, Users, FileQuestion, Settings, LogOut, X, Globe, Copy, Mic, UserCircle, Image } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import clsx from 'clsx';

export default function AdminSidebar({ open, setOpen }) {
    const { url } = usePage();

    const isActive = (routePattern) => {
        return route().current(routePattern);
    };

    const navItems = [
        { label: 'Overview', type: 'header' },
        { label: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, active: isActive('admin.dashboard') },
        
        { label: 'Management', type: 'header' },
        { label: 'Events', href: route('admin.events.index'), icon: Calendar, active: isActive('admin.events.*') },
        { label: 'Speakers', href: route('admin.speakers.index'), icon: Mic, active: isActive('admin.speakers.*') },
        { label: 'Team', href: route('admin.teams.index'), icon: UserCircle, active: isActive('admin.teams.*') },
        { label: 'Gallery', href: route('admin.galleries.index'), icon: Image, active: isActive('admin.galleries.*') },
        { label: 'Quizzes', href: route('admin.quizzes.index'), icon: FileQuestion, active: isActive('admin.quizzes.*') || isActive('admin.events.quizzes.*') },
        { label: 'Registrations', href: route('admin.registrations.index'), icon: Users, active: isActive('admin.registrations.*') || isActive('admin.events.registrations.*') },
        
        { label: 'Content', type: 'header' },
        { label: 'Frontend', href: route('admin.frontend.index'), icon: Globe, active: isActive('admin.frontend.*') },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={clsx(
                    "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden",
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setOpen(false)}
            />

            {/* Sidebar Container */}
            <aside 
                className={clsx(
                    "fixed top-0 left-0 z-50 h-screen w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:block shadow-2xl border-r border-white/5 flex flex-col",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header / Logo */}
                <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-b border-white/5 backdrop-blur-sm flex-shrink-0">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-2.5 font-bold text-white group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <div>
                            <span className="text-lg">Seminar</span>
                            <span className="text-indigo-400">Hub</span>
                        </div>
                    </Link>
                    <button 
                        onClick={() => setOpen(false)}
                        className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation - Scrollable Area */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 pb-4 space-y-1 custom-scrollbar min-h-0">
                    {navItems.map((item, idx) => {
                        if (item.type === 'header') {
                            return (
                                <div key={idx} className="px-4 pt-5 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400/70">
                                    {item.label}
                                </div>
                            );
                        }

                        let linkHref = item.href;

                        return (
                            <Link
                                key={idx}
                                href={linkHref}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                    item.active 
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30" 
                                        : "hover:bg-white/5 hover:text-white text-slate-300"
                                )}
                            >
                                {item.active && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                                <item.icon 
                                    size={20} 
                                    className={clsx(
                                        "transition-all duration-200",
                                        item.active 
                                            ? "text-white scale-110" 
                                            : "text-slate-400 group-hover:text-indigo-400 group-hover:scale-110"
                                    )} 
                                />
                                <span className="flex-1">{item.label}</span>
                                {item.active && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer - Fixed at Bottom */}
                <div className="flex-shrink-0 mt-auto p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-slate-950 border-t border-white/5">
                    <div className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-xs text-slate-400 mb-0.5 font-medium">Admin Panel</p>
                        <p className="text-xs font-bold text-white">v1.0.0</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
