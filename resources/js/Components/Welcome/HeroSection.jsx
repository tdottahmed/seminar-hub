import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { ArrowRight, BookOpen } from "lucide-react";
import { staticHeroImages } from "./data";

export default function HeroSection({ t, isBn, lang }) { // Added lang as it's used in dependency array
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % t.hero.words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [lang, t.hero.words.length]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Static Hero Background Slider */}
            <div className="absolute inset-0 z-0">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    className="h-full w-full"
                >
                    {staticHeroImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 z-10"></div>
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 8, ease: "linear" }}
                                src={img}
                                className="w-full h-full object-cover"
                                alt="Hero Background"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-20 pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 relative z-30 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-xl mb-8">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-sm font-medium text-indigo-300">
                            {t.hero.badge}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white mb-6 leading-[1.1]">
                        {t.hero.titlePrefix} <br />
                        <div className="h-[1.2em] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={wordIndex}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                                >
                                    {t.hero.words[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t.hero.subtext}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <a
                            href="#events"
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-white to-slate-100 text-slate-900 font-bold text-lg hover:from-indigo-50 hover:to-purple-50 transition transform hover:-translate-y-1 shadow-2xl hover:shadow-indigo-500/30 flex items-center gap-2 justify-center"
                        >
                            {t.hero.ctaPrimary} <ArrowRight size={20} />
                        </a>
                        <button className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition transform hover:-translate-y-1 shadow-lg flex items-center gap-2 justify-center">
                            {t.hero.ctaSecondary} <BookOpen size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-slate-400">{isBn ? "স্ক্রোল করুন" : "Scroll down"}</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-3 bg-white/50 rounded-full mt-2"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
