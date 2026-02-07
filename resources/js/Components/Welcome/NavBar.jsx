import { Link } from "@inertiajs/react";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Logo from "./Logo";

import { useLanguage } from '@/Contexts/LanguageContext';
import { usePage } from '@inertiajs/react';

export default function NavBar({
    canLogin = false,
    canRegister = false,
}) {
    const { auth } = usePage().props;
    const { t, lang, setLang } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        "home",
        "about",
        "services",
        "goals",
        "team",
        "programs",
        "events",
        "gallery",
    ];

    const routeMap = {
        home: "/",
        about: route("about"),
        services: route("services.index"),
        goals: route("goals"),
        team: route("teams.index"),
        programs: "/courses",
        events: "/events",
        gallery: "/#gallery",
        testimonials: "/#testimonials",
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 py-4 px-6 lg:px-12 flex justify-between items-center transition-all duration-500 ${
                isScrolled
                    ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="flex items-center gap-2 z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <Logo className="h-10" />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8 items-center text-sm font-medium text-slate-300">
                {navLinks.map((item) => (
                    <Link
                        key={item}
                        href={routeMap[item]}
                        className={`hover:text-white transition relative hover:scale-105 group ${route().current(item) ? 'text-white' : ''}`}
                    >
                        {t.nav[item]}
                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full ${route().current(item) || (routeMap[item].includes('#') && false) ? 'w-full' : ''}`}></span>
                    </Link>
                ))}
            </div>

            <div className="flex gap-4 items-center z-50">
                {/* Language Switcher - Visible on all screens */}
                <button
                    onClick={() => setLang(lang === "en" ? "bn" : "en")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20 hover:border-white/30"
                >
                    <Globe size={14} />
                    <span className="uppercase text-xs font-bold">{lang}</span>
                </button>

                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex gap-3 items-center">
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
                                    className="px-4 py-2 text-white/80 hover:text-white font-medium transition hover:scale-105"
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
                                    <span className="relative text-white font-bold">
                                        {t.nav.signup}
                                    </span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay - Portalled to body to escape sticky/fixed contexts */}
            {isOpen &&
                typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="fixed inset-0 bg-slate-950 z-[9999] lg:hidden flex flex-col h-[100dvh] overflow-hidden"
                        >
                            {/* Mobile Menu Header with Close Button */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Logo className="h-10" />
                                    </Link>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white hover:bg-white/10 rounded-full transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="flex flex-col p-6 gap-2 overflow-y-auto flex-1">
                                {navLinks.map((item, index) => (
                                    <Link
                                        key={item}
                                        href={routeMap[item]}
                                        onClick={() => setIsOpen(false)}
                                        className="text-xl font-medium text-slate-300 hover:text-white py-4 border-b border-white/10 last:border-0"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.1 + index * 0.05,
                                            }}
                                        >
                                            {t.nav[item]}
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>

                            <div className="p-6 shrink-0 flex flex-col gap-4 border-t border-white/10 bg-slate-900/50">
                                {auth?.user ? (
                                    <Link
                                        href={route("admin.dashboard")}
                                        className="w-full text-center px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold transition"
                                    >
                                        {t.nav.dashboard}
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link
                                                href={route("login")}
                                                className="w-full text-center px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold transition"
                                            >
                                                {t.nav.login}
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link
                                                href={route("register")}
                                                className="w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold transition shadow-lg shadow-indigo-500/30"
                                            >
                                                {t.nav.signup}
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>,
                    document.body,
                )}
        </nav>
    );
}
