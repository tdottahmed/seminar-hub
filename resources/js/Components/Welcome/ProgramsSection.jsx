import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

export default function ProgramsSection({ t, isBn, content, programs, lang }) {
    // Determine source data for Section Header
    const sectionData = content ? content[lang] : t.programs;
    
    // Determine source data for Programs List
    // Map dynamic data to match the component's expected structure
    const list = (programs && programs.length > 0) 
        ? programs.map(item => ({
            title: item.title[lang] || item.title['en'],
            desc: item.description[lang] || item.description['en'],
            icon: item.icon, // String name from DB
            color: item.color_class || 'from-indigo-500 to-purple-500', // Allow dynamic colors
            count: item.count_label ? (item.count_label[lang] || item.count_label['en']) : "Open"
        }))
        : t.programs.categories;

    // Helper to get Icon
    const getIcon = (iconSource) => {
        if (typeof iconSource === 'string') {
             const IconComponent = Icons[iconSource];
             return IconComponent || Icons.Box;
        }
        return iconSource || Icons.Box; 
    };

    if (!sectionData) return null;

    return (
        <section id="programs" className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {sectionData.title}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        {sectionData.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {list.map((category, idx) => {
                        const Icon = getIcon(category.icon);
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <div className={`bg-gradient-to-br ${category.color.replace('from-', 'from-').replace('to-', 'to-')}/10 to-transparent backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition duration-300`}>
                                    {/* Note: The gradient logic here assumes simple tailwind classes. For more complex dynamic colors, might need style prop */}
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {category.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6">
                                        {category.desc}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">
                                            {category.count}
                                        </span>
                                        <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                                            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}>
                                                {isBn ? "এক্সপ্লোর করুন" : "Explore"}
                                            </span>
                                            <ArrowRight size={16} className={`group-hover:translate-x-1 transition`} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30">
                        {sectionData.viewAll}
                        <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
