import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Users, FileQuestion } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
        </div>
    );

    return (
        <AdminLayout
            user={auth.user}
            title="Dashboard"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="Total Events" 
                    value={stats.total_events} 
                    icon={Calendar} 
                    color="bg-indigo-500" 
                />
                <StatCard 
                    title="Active Quizzes" 
                    value={stats.active_quizzes} 
                    icon={FileQuestion} 
                    color="bg-emerald-500" 
                />
                <StatCard 
                    title="Total Registrations" 
                    value={stats.total_registrations} 
                    icon={Users} 
                    color="bg-orange-500" 
                />
            </div>

            {/* Placeholder for Activity Feed / Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                    <div className="flex items-center justify-center h-48 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                        Activity Feed Coming Soon
                    </div>
                 </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Performance Overview</h3>
                    <div className="flex items-center justify-center h-48 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                         Chart Placeholder
                    </div>
                 </div>
            </div>
        </AdminLayout>
    );
}
