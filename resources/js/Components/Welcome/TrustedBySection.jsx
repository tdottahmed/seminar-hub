import { motion } from "framer-motion";
import { trustedCompanies } from "./data";

export default function TrustedBySection({ t }) {
    return (
        <section className="py-16 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">
                        {t.trustedBy.title}
                    </h3>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        {t.trustedBy.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {trustedCompanies.map((company, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex justify-center"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-xl transition-all duration-500"></div>
                                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group-hover:border-white/20 transition duration-300">
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="h-8 w-auto opacity-70 group-hover:opacity-100 transition duration-300 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
