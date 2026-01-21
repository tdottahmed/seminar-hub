import { Link } from "@inertiajs/react";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function NavBar({ auth, canLogin, canRegister, t, lang, setLang }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 py-4 px-6 lg:px-12 flex justify-between items-center transition-all duration-500 ${
                isScrolled
                    ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 group">
                    <Logo className="h-10" />
                </Link>
            </div>

            <div className="hidden lg:flex gap-8 items-center text-sm font-medium text-slate-300">
                {["home", "about", "programs", "events", "team", "gallery", "testimonials"].map((item) => (
                    <a
                        key={item}
                        href={`#${item}`}
                        className="hover:text-white transition relative hover:scale-105 group"
                    >
                        {t.nav[item]}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                ))}
                
                <button
                    onClick={() => setLang(lang === "en" ? "bn" : "en")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20 hover:border-white/30"
                >
                    <Globe size={14} />
                    <span className="uppercase text-xs font-bold">{lang}</span>
                </button>
            </div>

            <div className="flex gap-4 items-center">
                {auth?.user ? (
                    <Link
                        href={route("admin.dashboard")}
                        className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium transition hover:shadow-lg hover:shadow-white/10"
                    >
                        {t.nav.dashboard}
                    </Link>
                ) : (
                    <div className="flex gap-3">
                        {canLogin && (
                            <Link
                                href={route("login")}
                                className="px-4 py-2 text-white/80 hover:text-white font-medium transition hidden sm:block hover:scale-105"
                            >
                                {t.nav.login}
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href={route("register")}
                                className="relative px-5 py-2 rounded-full group overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500 transition duration-300"></span>
                                <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/50 to-purple-400/50 opacity-0 group-hover:opacity-100 blur-lg transition duration-300"></span>
                                <span className="relative text-white font-bold">{t.nav.signup}</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
