import UserLayout from '@/Layouts/User/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Award, BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth }) {
    const user = auth.user;

    const quickStats = [
        { label: 'My Events', value: '0', icon: Calendar, color: 'bg-indigo-500' },
        { label: 'Certificates', value: '0', icon: Award, color: 'bg-purple-500' },
        { label: 'Quizzes Taken', value: '0', icon: BookOpen, color: 'bg-pink-500' },
    ];

    return (
        <UserLayout user={auth.user} title="Overview">
            <div className="space-y-6">
                
                {/* Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left text-white">
                            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
                            <p className="text-indigo-100 max-w-lg">
                                Explore upcoming events, track your learning progress, and manage your registrations all in one place.
                            </p>
                        </div>
                        <img src="/assets/logo/Logo-prochesta-IT-light-1.png" alt="Logo" className="h-20 w-auto opacity-90 drop-shadow-md" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Events / Placeholder */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                            Upcoming Events
                        </h3>
                        
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Calendar className="w-8 h-8 text-slate-300" />
                            </div>
                            <h4 className="text-slate-900 font-medium mb-1">No upcoming events</h4>
                            <p className="text-slate-500 text-sm mb-6 max-w-xs">You haven't registered for any events yet. Check out our latest programs!</p>
                            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
                                Browse Events <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity / Sidebar */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-600" />
                            Recent Activity
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 relative z-10"></div>
                                    <div className="absolute top-2 left-1 w-px h-full bg-slate-100 -z-0"></div>
                                </div>
                                <div className="pb-4">
                                    <p className="text-sm text-slate-800 font-medium">Account Created</p>
                                    <p className="text-xs text-slate-500 mt-1">Just now</p>
                                </div>
                            </div>
                            {/* More items can be added here */}
                        </div>
                    </div>
                </div>

            </div>
        </UserLayout>
    );
}
