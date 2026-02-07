import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Contexts/LanguageContext';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { 
    BookOpen, 
    Clock, 
    Signal, 
    ArrowRight, 
    Search, 
    Tag,
    Star,
    CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export default function Index({ courses }) {
    const { lang, isBn } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Helper to safely get translated content
    const t = (content) => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        return content[lang] || content['en'] || '';
    };

    const staticT = (en, bn) => isBn ? bn : en;

    const filteredCourses = courses.filter(course => {
        const title = t(course.title).toLowerCase();
        return title.includes(searchTerm.toLowerCase());
    });

    return (
        <GuestLayout>
            <Head title={staticT("Our Courses", "আমাদের কোর্সসমূহ")} />

            <Breadcrumb 
                title={staticT("Training Programs", "প্রশিক্ষণ প্রোগ্রামসমূহ")}
                items={[{ label: staticT("Courses", "কোর্সসমূহ") }]}
            />

            {/* Hero Section */}
            <section className="relative py-24 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
                            {staticT("Master In-Demand Skills", "চাহিদাসম্পন্ন দক্ষতা অর্জন করুন")} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                {staticT("Build Your Future", "আপনার ভবিষ্যৎ গড়ুন")}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                            {staticT(
                                "Join our comprehensive training programs designed to transform beginners into industry-ready professionals.",
                                "আমাদের বিস্তারিত প্রশিক্ষণ প্রোগ্রামে যোগ দিয়ে নিজেকে একজন দক্ষ প্রোফেশনাল হিসেবে গড়ে তুলুন।"
                            )}
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto relative group"
                    >
                        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full group-hover:bg-indigo-500/30 transition-all" />
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center p-2 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-xl">
                            <Search className="text-slate-400 ml-4 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder={staticT("Search courses...", "কোর্স খুঁজুন...")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none text-white w-full focus:ring-0 placeholder:text-slate-500 px-4"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-20 bg-slate-900 relative min-h-[600px]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                
                <div className="container mx-auto px-6 relative z-10">
                    {filteredCourses.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course, index) => (
                                <motion.div 
                                    key={course.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 flex flex-col h-full"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-56 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60" />
                                        
                                        {course.thumbnail ? (
                                            <img 
                                                src={`/storage/${course.thumbnail}`} 
                                                alt={t(course.title)} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition">
                                                <BookOpen size={48} className="text-slate-600 group-hover:text-indigo-400 transition" />
                                            </div>
                                        )}

                                        {/* Level Badge */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/90 backdrop-blur-md text-white shadow-lg border border-white/10 flex items-center gap-1">
                                                <Signal size={12} />
                                                {course.level}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill="currentColor" className="opacity-80" />
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-400">(5.0)</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition line-clamp-2">
                                            {t(course.title)}
                                        </h3>

                                        <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
                                            <div className="flex items-center gap-1.5 bg-slate-700/50 px-2 py-1 rounded">
                                                <Clock size={14} className="text-indigo-400" />
                                                <span>{t(course.duration)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-slate-700/50 px-2 py-1 rounded">
                                                <Tag size={14} className="text-indigo-400" />
                                                <span>Training</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div className="text-2xl font-bold text-white">
                                                {course.price > 0 ? (
                                                    <span className="flex items-start text-emerald-400">
                                                        <span className="text-sm mt-1 mr-0.5">৳</span>
                                                        {parseFloat(course.price).toLocaleString()}
                                                    </span>
                                                ) : (
                                                    <span className="text-emerald-400 uppercase text-sm font-bold tracking-wider px-2 py-1 bg-emerald-500/10 rounded">
                                                        {staticT("Free", "ফ্রি")}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <Link 
                                                href={route('courses.show', course.slug)}
                                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-600 flex items-center justify-center text-white transition-all group-hover:shadow-lg group-hover:shadow-indigo-500/20 border border-white/10 group-hover:border-indigo-500"
                                            >
                                                <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-300 mb-2">{staticT("No courses found", "কোনো কোর্স পাওয়া যায়নি")}</h3>
                            <p className="text-slate-500">{staticT("Try adjusting your search terms.", "অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে খুঁজুন।")}</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
