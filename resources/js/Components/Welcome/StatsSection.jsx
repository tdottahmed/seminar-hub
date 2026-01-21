import { motion } from "framer-motion";
import * as Icons from "lucide-react"; 

export default function StatsSection({ t, content, lang }) {
    // Determine source data
    const statsData = content ? content[lang] : t.stats;
    
    // Safety check
    if (!statsData) return null;

    // Helper to get Icon component from string name or direct component
    const getIcon = (iconSource) => {
        if (typeof iconSource === 'string') {
             // Dynamic data supplies string name (e.g., 'Calendar')
             const IconComponent = Icons[iconSource];
             return IconComponent || Icons.HelpCircle;
        }
        // Static data supplies component directly
        return iconSource || Icons.HelpCircle; 
    };

    return (
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {statsData.title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.stats.map((stat, idx) => {
                        const Icon = getIcon(stat.icon);
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-500"></div>
                                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group-hover:border-indigo-500/30 transition duration-300">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/10">
                                            <Icon className="w-8 h-8 text-indigo-400" />
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                            {stat.number}
                                        </div>
                                        <div className="text-slate-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
