
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Signal, CheckCircle2, PlayCircle, Lock } from 'lucide-react';

export default function Show({ course }) {
    const { t, lang } = useLanguage();
    const { auth } = usePage().props;

    const localT = {
        enroll: { en: "Enroll Now", bn: "ভর্তি হন" },
        outline: { en: "Course Curriculum", bn: "কোর্স কারিকুলাম" },
        details: { en: "About this Course", bn: "কোর্স সম্পর্কে" },
        price: { en: "Price", bn: "মূল্য" },
        duration: { en: "Duration", bn: "সময়কাল" },
        level: { en: "Level", bn: "লেভেল" },
        tk: { en: "৳", bn: "৳" },
        free: { en: "Free", bn: "ফ্রি" },
        lessons: { en: "lessons", bn: "টি পাঠ" }
    };

    return (
        <GuestLayout canLogin={!auth.user} canRegister={!auth.user}>
            <Head title={course.title[lang]} />

            {/* Course Header / Hero */}
            <div className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/80 z-10"></div>
                {course.thumbnail && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
                        style={{ backgroundImage: `url(${course.thumbnail})` }}
                    ></div>
                )}
                
                <div className="container mx-auto px-6 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/30 mb-6">
                                <Signal size={14} /> {course.level}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {course.title[lang]}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-slate-300 mb-8">
                                <div className="flex items-center gap-2">
                                    <Clock className="text-indigo-400" size={20} />
                                    <span className="text-lg">{course.duration ? course.duration[lang] : ''}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="text-indigo-400" size={20} />
                                    <span className="text-lg">
                                        {course.outline ? course.outline.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) : 0} {localT.lessons[lang]}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-500/30">
                                    {localT.enroll}
                                </button>
                                <div className="text-2xl font-bold text-white ml-2">
                                    {course.price ? (
                                        <>{localT.tk[lang]} {course.price}</>
                                    ) : (
                                        <span className="text-emerald-400">{localT.free[lang]}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="hidden lg:block relative"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group cursor-pointer bg-slate-800">
                                {course.thumbnail && (
                                    <img 
                                        src={course.thumbnail} 
                                        alt={course.title[lang]} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition">
                                        <PlayCircle size={32} className="text-white fill-current" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    {localT.details[lang]}
                                </h2>
                                <div 
                                    className="prose prose-invert prose-lg max-w-none text-slate-300"
                                    dangerouslySetInnerHTML={{ __html: course.description[lang] }}
                                />
                            </section>

                            {/* Curriculum */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    {localT.outline[lang]}
                                </h2>
                                <div className="space-y-4">
                                    {course.outline && course.outline.map((module, idx) => (
                                        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-slate-800/50">
                                            <div className="p-4 bg-white/5 font-bold text-white flex justify-between items-center">
                                                <span>{module.title[lang]}</span>
                                                <span className="text-xs font-normal text-slate-400 bg-black/20 px-2 py-1 rounded">
                                                    {module.lessons?.length || 0} Lessons
                                                </span>
                                            </div>
                                            <div className="divide-y divide-white/5">
                                                {module.lessons && module.lessons.map((lesson, lIdx) => (
                                                    <div key={lIdx} className="p-4 flex items-center gap-3 text-slate-300 hover:bg-white/5 transition duration-200">
                                                        <PlayCircle size={16} className="text-indigo-400 shrink-0" />
                                                        <span className="flex-1">{lesson.title[lang]}</span>
                                                        <Lock size={14} className="text-slate-600" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {(!course.outline || course.outline.length === 0) && (
                                        <p className="text-slate-500 italic">Curriculum details coming soon.</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                             <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-white mb-4">Course Features</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-green-400" size={20} />
                                        <span>Full Lifetime Access</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-green-400" size={20} />
                                        <span>Certificate of Completion</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-green-400" size={20} />
                                        <span>24/7 Support</span>
                                    </li>
                                </ul>
                                <button className="w-full mt-8 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/10">
                                    Contact for Details
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
