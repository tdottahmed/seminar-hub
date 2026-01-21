import { motion } from "framer-motion";

export default function HowItWorksSection({ t }) {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {t.howItWorks.title}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        {t.howItWorks.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.howItWorks.steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center group hover:border-indigo-500/30 transition duration-300">
                                    <div className="text-6xl font-black text-slate-800/50 mb-4">{step.number}</div>
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition duration-300">
                                        <Icon className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
