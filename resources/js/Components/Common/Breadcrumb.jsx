import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Breadcrumb({ title, items }) {
    return (
        <div className="relative py-20 bg-slate-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
            
            {/* Animated Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3], 
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/2 -left-1/4 w-full h-full bg-indigo-500/10 blur-[100px] rounded-full"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3], 
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-purple-500/10 blur-[100px] rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-display text-white mb-6"
                    >
                        {title}
                    </motion.h1>

                    <motion.nav 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-2 text-sm md:text-base"
                    >
                        <Link 
                            href="/" 
                            className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>

                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                                {item.href ? (
                                    <Link 
                                        href={item.href}
                                        className="text-slate-400 hover:text-indigo-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-indigo-400 font-medium bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.nav>
                </div>
            </div>
        </div>
    );
}
