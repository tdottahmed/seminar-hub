
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage, useForm } from '@inertiajs/react'; // Added useForm
import { useLanguage } from '@/Contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Signal, CheckCircle2, PlayCircle, Lock, User, Mail, Phone, XCircle } from 'lucide-react'; // Added icons
import { useState, Fragment } from 'react'; // Added useState, Fragment
import { Dialog, Transition } from '@headlessui/react'; // Added Headless UI

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

    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: auth.user ? auth.user.name : '',
        email: auth.user ? auth.user.email : '',
        phone: auth.user ? auth.user.phone : '',
        message: ''
    });

    const submitEnrollment = (e) => {
        e.preventDefault();
        post(route('courses.enroll', course.id), {
            onSuccess: () => {
                reset();
                setIsEnrollModalOpen(false);
                // Ideally trigger a toast notification here
            }
        });
    };

    return (
        <GuestLayout canLogin={!auth.user} canRegister={!auth.user}>
            <Head title={course.title[lang]} />

            {/* Success Message */}
            {usePage().props.flash?.success && (
                <div className="fixed top-24 right-5 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500">
                    <CheckCircle2 size={24} />
                    <div>
                        <h4 className="font-bold">Success!</h4>
                        <p className="text-sm opacity-90">{usePage().props.flash.success}</p>
                    </div>
                    <button onClick={() => usePage().props.flash.success = null} className="ml-2 hover:bg-white/20 p-1 rounded-full">
                        <XCircle size={18} />
                    </button>
                </div>
            )}

            {/* Enrollment Modal */}
            <Transition appear show={isEnrollModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsEnrollModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-8 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 text-white mb-2"
                                    >
                                        Enroll in {course.title[lang]}
                                    </Dialog.Title>
                                    <div className="mt-2 text-sm text-slate-400 mb-6">
                                        <p>Please fill out the form below to request enrollment. Our team will contact you shortly.</p>
                                    </div>

                                    <form onSubmit={submitEnrollment} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-slate-800 border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-slate-800 border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    className="w-full bg-slate-800 border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="+880 1XXX XXXXXX"
                                                    required
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Message (Optional)</label>
                                            <textarea
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                className="w-full bg-slate-800 border-slate-700 rounded-lg py-2.5 px-4 text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                rows="3"
                                                placeholder="Any questions or comments?"
                                            ></textarea>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                                onClick={() => setIsEnrollModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                {processing ? 'Submitting...' : 'Submit Request'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                                <button 
                                    onClick={() => setIsEnrollModalOpen(true)}
                                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-500/30 active:scale-95 transform duration-150"
                                >
                                    {localT.enroll[lang]}
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
