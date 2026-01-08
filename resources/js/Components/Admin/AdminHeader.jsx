import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function AdminHeader({ user, setSidebarOpen }) {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center px-6 justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-slate-500 hover:text-slate-700 transition"
                >
                    <Menu size={24} />
                </button>
                
                {/* Search Bar - Visual Only for now */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-10 pr-4 py-2 rounded-full bg-slate-100 border-none text-sm focus:ring-2 focus:ring-indigo-500 w-64 transition-all focus:w-80"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-1"></div>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition">
                             <span>{user?.name}</span>
                             <img 
                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                                alt="User" 
                                className="w-8 h-8 rounded-full border border-slate-200"
                             />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
