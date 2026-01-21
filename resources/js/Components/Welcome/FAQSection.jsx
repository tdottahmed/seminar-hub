import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function FAQSection({ t }) {
    const [activeFAQ, setActiveFAQ] = useState(null);

    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {t.faq.title}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        {t.faq.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-3xl">
                <div className="space-y-4">
                    {t.faq.items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/30 transition duration-300"
                        >
                            <button
                                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center"
                            >
                                <h3 className="text-lg font-semibold text-white pr-4">
                                    {item.question}
                                </h3>
                                <ChevronRight
                                    size={20}
                                    className={`text-indigo-400 transition-transform duration-300 ${
                                        activeFAQ === idx ? 'rotate-90' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ${
                                    activeFAQ === idx ? 'pb-5' : 'h-0'
                                }`}
                            >
                                <p className="text-slate-400">
                                    {item.answer}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
