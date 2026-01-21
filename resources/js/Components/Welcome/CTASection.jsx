import { motion } from "framer-motion";

export default function CTASection({ t }) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
                        {t.cta.title}
                    </h2>
                    <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
                        {t.cta.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-2xl">
                            {t.cta.button}
                        </button>
                        <button className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition">
                            {t.cta.secondary}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
