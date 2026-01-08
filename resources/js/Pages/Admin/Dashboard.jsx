import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Users, FileQuestion, TrendingUp, ArrowRight, Activity, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, stats }) {
    const StatCard = ({ title, value, icon: Icon, color, gradient, href, change }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                        <Icon size={24} className={color.replace('bg-', 'text-')} />
                    </div>
                    {change && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${change > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            <TrendingUp size={12} className={change > 0 ? '' : 'rotate-180'} />
                            {Math.abs(change)}%
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
                    {href && (
                        <Link 
                            href={href}
                            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 group-hover:gap-2 transition-all"
                        >
                            View all <ArrowRight size={14} />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <AdminLayout
            user={auth.user}
            title="Dashboard"
        >
            <Head title="Dashboard" />

            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20"
            >
                <h2 className="text-2xl font-bold mb-2">Welcome back, {auth.user?.name || 'Admin'}! 👋</h2>
                <p className="text-indigo-100">Here's what's happening with your events today.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Events" 
                    value={stats?.total_events || 0} 
                    icon={Calendar} 
                    color="bg-indigo-500"
                    gradient="bg-indigo-500"
                    href={route('admin.events.index')}
                    change={12}
                />
                <StatCard 
                    title="Active Quizzes" 
                    value={stats?.active_quizzes || 0} 
                    icon={FileQuestion} 
                    color="bg-emerald-500"
                    gradient="bg-emerald-500"
                    change={8}
                />
                <StatCard 
                    title="Registrations" 
                    value={stats?.total_registrations || 0} 
                    icon={Users} 
                    color="bg-orange-500"
                    gradient="bg-orange-500"
                    change={-3}
                />
                <StatCard 
                    title="Speakers" 
                    value={stats?.total_speakers || 0} 
                    icon={Users} 
                    color="bg-purple-500"
                    gradient="bg-purple-500"
                    href={route('admin.speakers.index')}
                    change={5}
                />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Activity size={20} className="text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900">New event created</p>
                                    <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Performance Overview */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <BarChart3 size={20} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Performance</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Event Registrations</span>
                                <span className="text-sm font-bold text-indigo-600">+24%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Quiz Completions</span>
                                <span className="text-sm font-bold text-emerald-600">+18%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Active Users</span>
                                <span className="text-sm font-bold text-orange-600">+12%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    );
}
