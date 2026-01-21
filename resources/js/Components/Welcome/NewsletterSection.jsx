import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function NewsletterSection({ t }) {
    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-6 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center"
                >
                    <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-3">
                        {t.newsletter.title}
                    </h3>
                    <p className="text-slate-400 mb-8">
                        {t.newsletter.subtitle}
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder={t.newsletter.placeholder}
                            className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-700 hover:to-purple-700 transition transform hover:-translate-y-0.5"
                        >
                            {t.newsletter.button}
                        </button>
                    </form>
                    <p className="text-slate-500 text-sm mt-6">
                        {t.newsletter.privacy}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
