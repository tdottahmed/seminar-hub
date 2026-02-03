
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Signal, ArrowRight } from 'lucide-react';

export default function Index({ courses }) {
    const { t, lang } = useLanguage();
    const { auth } = usePage().props;

    // We can define some translations locally or move to data.js later
    const localT = {
        title: { en: "Our Training Programs", bn: "আমাদের প্রশিক্ষণ প্রোগ্রামসমূহ" },
        subtitle: { en: "Master in-demand skills with our comprehensive courses", bn: "আমাদের বিস্তারিত কোর্সের মাধ্যমে দক্ষতা অর্জন করুন" },
        readMore: { en: "View Details", bn: "বিস্তারিত দেখুন" },
        free: { en: "Free", bn: "ফ্রি" },
        tk: { en: "৳", bn: "৳" }
    };

    return (
        <GuestLayout canLogin={!auth.user} canRegister={!auth.user}>
            <Head title={localT.title[lang]} />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        {localT.title[lang]}
                    </motion.h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        {localT.subtitle[lang]}
                    </p>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
                            >
                                {/* Thumbnail */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition duration-300 z-10"></div>
                                    {course.thumbnail ? (
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.title[lang]} 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <BookOpen size={48} className="text-slate-600" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg">
                                            {course.level}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition">
                                        {course.title[lang]}
                                    </h3>
                                    <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{course.duration ? course.duration[lang] : ''}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Signal size={14} />
                                            <span>{course.level}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                        <div className="text-2xl font-bold text-white">
                                            {course.price ? (
                                                <>{localT.tk[lang]} {course.price}</>
                                            ) : (
                                                <span className="text-emerald-400">{localT.free[lang]}</span>
                                            )}
                                        </div>
                                        <Link 
                                            href={route('courses.show', course.slug)}
                                            className="inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition"
                                        >
                                            {localT.readMore[lang]} <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {courses.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-xl">No courses found at the moment. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
