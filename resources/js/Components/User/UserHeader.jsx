import { Link } from '@inertiajs/react';
import { Bell, Search, Menu, ChevronDown, User } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';

export default function UserHeader({ user, setSidebarOpen }) {
    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 transition-all duration-300">
            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                
                {/* Left Side: Mobile Menu Toggle & Search */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    
                    <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-transparent focus-within:border-indigo-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200">
                        <Search size={18} className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 placeholder-gray-400 w-64"
                        />
                    </div>
                </div>

                {/* Right Side: Notifications & Profile */}
                <div className="flex items-center gap-4">
                    
                    {/* Notifications */}
                    <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-200 group">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                                        <span className="text-sm font-bold">{user.name.charAt(0)}</span>
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{user.name}</p>
                                    </div>
                                    <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 mr-2" />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                </div>
                                <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                    <User size={16} /> Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}
