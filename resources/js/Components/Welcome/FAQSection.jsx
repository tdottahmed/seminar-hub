import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, HelpCircle } from "lucide-react";

export default function FAQSection({ t, content, faqs, lang }) {
    const [activeFAQ, setActiveFAQ] = useState(null);
    const sectionData = content ? content[lang] : t.faq;

    // Use dynamic FAQs if available, otherwise fallback to static
    // Map dynamic FAQs to the structure expected by the UI
    const items = (faqs && faqs.length > 0)
        ? faqs.map(item => ({
            question: item.question[lang] || item.question['en'],
            answer: item.answer[lang] || item.answer['en']
        }))
        : sectionData.items || [];

    if (!sectionData) return null;

    return (
        <section className="py-24 bg-slate-900 relative">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm mb-6">
                        <HelpCircle className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                            FAQ
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {sectionData.title}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        {sectionData.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-8xl">
                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`bg-white/5 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ${
                                activeFAQ === idx 
                                    ? 'border-indigo-500/50 bg-white/10 shadow-lg shadow-indigo-500/10' 
                                    : 'border-white/10 hover:border-indigo-500/30'
                            }`}
                        >
                            <button
                                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 group"
                            >
                                <h3 className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                                    activeFAQ === idx ? 'text-indigo-300' : 'text-white group-hover:text-indigo-200'
                                }`}>
                                    {item.question}
                                </h3>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    activeFAQ === idx 
                                        ? 'bg-indigo-500 text-white rotate-90' 
                                        : 'bg-white/5 text-indigo-400 group-hover:bg-indigo-500/20'
                                }`}>
                                    <ChevronRight size={20} />
                                </div>
                            </button>
                            
                            <AnimatePresence>
                                {activeFAQ === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
