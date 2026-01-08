import { Bell, Search, Menu, LogOut, User, Settings, Home } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

export default function AdminHeader({ user, setSidebarOpen }) {
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between shadow-sm shadow-slate-900/5">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                    <Menu size={20} />
                </button>
                
                {/* Search Bar */}
                <div className={`relative hidden md:block transition-all duration-300 ${searchFocused ? 'flex-1 max-w-md' : 'w-64'}`}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search events, speakers, registrations..." 
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Quick Link to Home */}
                <Link
                    href={route('home')}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    title="View Website"
                >
                    <Home size={18} />
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition group">
                    <Bell size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-1"></div>

                {/* User Menu */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition group">
                            <div className="relative">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=6366f1&color=fff&size=128`} 
                                    alt="User" 
                                    className="w-9 h-9 rounded-full border-2 border-slate-200 group-hover:border-indigo-300 transition"
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-semibold text-slate-700">{user?.name || 'Admin'}</p>
                                <p className="text-xs text-slate-500">Administrator</p>
                            </div>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="right" className="w-56">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <p className="text-sm font-semibold text-slate-900">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@example.com'}</p>
                        </div>
                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                            <User size={16} />
                            <span>Profile Settings</span>
                        </Dropdown.Link>
                        <Dropdown.Link href={route('admin.dashboard')} className="flex items-center gap-2">
                            <Settings size={16} />
                            <span>Dashboard</span>
                        </Dropdown.Link>
                        <div className="border-t border-slate-100 my-1"></div>
                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <LogOut size={16} />
                            <span>Log Out</span>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
