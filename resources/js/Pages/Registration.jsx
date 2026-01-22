import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import NavBar from '../Components/Welcome/NavBar';
import Footer from '../Components/Welcome/Footer';
import { translations } from '../Components/Welcome/data';

export default function Registration({ event, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        organization: '',
        designation: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [lang, setLang] = useState('en');
    const t = translations[lang];

    const submit = (e) => {
        e.preventDefault();
        post(route('events.register.store', event.slug), {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
            },
        });
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 flex flex-col">
            <Head title={`Register - ${event.title}`} />

            <NavBar
                auth={auth}
                canLogin={!auth.user}
                canRegister={!auth.user}
                t={t}
                lang={lang}
                setLang={setLang}
            />

            <main className="flex-grow pt-20">
                <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
                    {/* Left Side: Event Preview (Sticky on Desktop) */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden lg:min-h-full p-8 lg:p-16 flex flex-col justify-center">
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
                            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    Registration Open
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-bold font-display leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-pink-100">
                                    {event.title}
                                </h1>
                                <div className="space-y-3 text-indigo-100 mb-8">
                                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center shrink-0">
                                            <Calendar className="w-5 h-5 text-indigo-300" />
                                        </div>
                                        <span className="font-medium">{new Date(event.start_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                        <div className="w-10 h-10 rounded-lg bg-pink-500/30 flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5 text-pink-300" />
                                        </div>
                                        <span className="font-medium">{new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    {event.venue && (
                                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-purple-300" />
                                            </div>
                                            <span className="font-medium">{event.venue}</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-indigo-100 leading-relaxed max-w-xl text-lg">
                                    {event.short_description || event.description || "Join us for an insightful session regarding the latest trends and technologies. Secure your spot now!"}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Registration Form */}
                    <div className="lg:w-1/2 p-6 lg:p-16 flex items-center justify-center bg-slate-950 relative">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                        <div className="max-w-md w-full relative z-10">
                            {showSuccess ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl text-center"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold font-display text-white mb-2">Registration Successful!</h2>
                                    <p className="text-slate-300 mb-6">Thank you for registering. We have sent a confirmation email to {data.email}.</p>
                                    <button onClick={() => window.location.href = '/'} className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-500/30">
                                        Back to Home
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="mb-8">
                                        <h2 className="text-4xl font-bold font-display text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">Secure Your Spot</h2>
                                        <p className="text-slate-400">Fill out the form below to complete your registration.</p>
                                    </div>

                                    <form onSubmit={submit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className={clsx(
                                                    "w-full px-4 py-3.5 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition outline-none",
                                                    errors.name ? "border-red-500 focus:border-red-500" : "border-white/20 focus:border-indigo-500"
                                                )}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className={clsx(
                                                    "w-full px-4 py-3.5 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition outline-none",
                                                    errors.email ? "border-red-500 focus:border-red-500" : "border-white/20 focus:border-indigo-500"
                                                )}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className={clsx(
                                                    "w-full px-4 py-3.5 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition outline-none",
                                                    errors.phone ? "border-red-500 focus:border-red-500" : "border-white/20 focus:border-indigo-500"
                                                )}
                                                placeholder="+880 1XXX XXXXXX"
                                            />
                                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="organization" className="block text-sm font-semibold text-slate-300 mb-2">Organization</label>
                                                <input
                                                    type="text"
                                                    id="organization"
                                                    value={data.organization}
                                                    onChange={e => setData('organization', e.target.value)}
                                                    className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
                                                    placeholder="Company / University"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="designation" className="block text-sm font-semibold text-slate-300 mb-2">Designation</label>
                                                <input
                                                    type="text"
                                                    id="designation"
                                                    value={data.designation}
                                                    onChange={e => setData('designation', e.target.value)}
                                                    className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
                                                    placeholder="Student / Engineer"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/30 transform hover:-translate-y-0.5 active:scale-95 transition duration-200 text-lg"
                                        >
                                            {processing ? 'Processing...' : 'Complete Registration'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
}
