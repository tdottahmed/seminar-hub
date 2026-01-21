import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";

export default function Footer({ t }) {
    return (
        <footer className="bg-slate-950 pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="mb-6">
                            <Logo className="h-10" />
                        </div>
                        <p className="text-slate-500 mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                <Facebook size={18} className="text-slate-400 hover:text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                <Twitter size={18} className="text-slate-400 hover:text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                <Instagram size={18} className="text-slate-400 hover:text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                <Linkedin size={18} className="text-slate-400 hover:text-white" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.quickLinks}</h4>
                        <ul className="space-y-3">
                            <li><a href="#programs" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.programs}</a></li>
                            <li><a href="#events" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.events}</a></li>
                            <li><a href="#team" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.mentors}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.pricing}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.company}</h4>
                        <ul className="space-y-3">
                            <li><a href="#about" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.about}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.careers}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.blog}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.press}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.support}</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.help}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.contact}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.privacy}</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.terms}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-slate-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} Prochesta IT. {t.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
