
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users } from 'lucide-react';

export default function Goals({ goalsSection }) {
    const content = goalsSection?.content || {};
    const goals = content.goals || [];

    return (
        <GuestLayout>
            <Head title="Our Goals" />

            {/* Hero Section */}
            <div className="relative py-20 bg-slate-950 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-display text-white mb-6"
                    >
                        {content.title || 'Our Goals'}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        We are driven by ambitious targets to transform the landscape of professional development.
                    </motion.p>
                </div>
            </div>

            {/* Goals Grid */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {goals.map((goal, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:border-indigo-100 hover:shadow-2xl transition duration-300 group"
                            >
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                                    {index === 0 ? <Users size={32} /> : index === 1 ? <TrendingUp size={32} /> : <Target size={32} />}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{goal.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {goal.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
