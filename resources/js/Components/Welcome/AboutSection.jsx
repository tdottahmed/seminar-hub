import { motion } from "framer-motion";
import * as Icons from "lucide-react";

export default function AboutSection({ t, isBn, content, lang }) {
    // Determine source data
    const aboutData = content ? content[lang] : t.about;
    
    // Safety check
    if (!aboutData) return null;

    // Helper to get Icon
    const getIcon = (iconSource) => {
        if (typeof iconSource === 'string') {
             const IconComponent = Icons[iconSource];
             return IconComponent || Icons.HelpCircle;
        }
        return iconSource || Icons.HelpCircle; 
    };

    // Default images if not provided
    const bgImage = aboutData.backgroundImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000';
    const mainImage = aboutData.mainImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000';

    return (
        <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className={`absolute inset-0 opacity-5 bg-cover bg-center mix-blend-overlay`} style={{ backgroundImage: `url(${bgImage})` }}></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6">
                            <Icons.Sparkles className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                                {isBn ? "আমাদের সম্পর্কে" : "About Us"}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8">
                            {aboutData.title}
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                            {aboutData.desc}
                        </p>
                        <div className="space-y-8">
                            {aboutData.features.map((feature, idx) => {
                                const Icon = getIcon(feature.icon);
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="mt-1 flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-lg group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition duration-300">
                                            <Icon className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                                                {feature.title}
                                            </h4>
                                            <p className="text-slate-400">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur-3xl animate-pulse"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition duration-700">
                            <img
                                src={mainImage}
                                alt="Team collaboration"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
                            
                            {/* Optional dynamic success stats */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <Icons.Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            {aboutData.successRate || "95%" }{isBn ? '' : ' Success Rate'}
                                        </div>
                                        <div className="text-slate-300">
                                            {isBn ? "ক্যারিয়ার রূপান্তর" : "Career Transformation"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
