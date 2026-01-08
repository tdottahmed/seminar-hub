import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

export default function Registration({ event }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        organization: '',
        designation: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

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
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans text-gray-800">
            <Head title={`Register - ${event.title}`} />

            {/* Left Side: Event Preview (Sticky) */}
            <div className="lg:w-1/2 bg-gradient-to-br from-indigo-800 to-purple-900 text-white relative overflow-hidden lg:h-screen lg:sticky lg:top-0 p-8 lg:p-16 flex flex-col justify-center">
                 {/* Background Effects */}
                 <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-3 py-1 bg-indigo-500/30 backdrop-blur rounded-full text-sm font-semibold mb-6 border border-indigo-400/30">
                            Registration Open
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold font-display leading-tight mb-6">
                            {event.title}
                        </h1>
                         <div className="space-y-4 text-indigo-100 text-lg mb-8">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-pink-400" />
                                <span>{new Date(event.start_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-6 h-6 text-pink-400" />
                                <span>{new Date(event.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.end_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                             {event.venue && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-pink-400" />
                                    <span>{event.venue}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-indigo-200 leading-relaxed max-w-xl">
                            {event.description || "Join us for an insightful session regarding the latest trends and technologies. Secure your spot now!"}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="lg:w-1/2 p-6 lg:p-16 flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full">
                    {showSuccess ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-8 rounded-3xl shadow-xl text-center border border-green-100"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                            <p className="text-gray-600 mb-6">Thank you for registering. We have sent a confirmation email to {data.email}.</p>
                            <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
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
                                <h2 className="text-3xl font-bold font-display text-gray-900 mb-2">Secure Your Spot</h2>
                                <p className="text-gray-500">Fill out the form below to complete your registration.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={clsx(
                                            "w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-indigo-500 transition outline-none",
                                            errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-indigo-500"
                                        )}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={clsx(
                                            "w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-indigo-500 transition outline-none",
                                            errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-indigo-500"
                                        )}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className={clsx(
                                            "w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-indigo-500 transition outline-none",
                                            errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-indigo-500"
                                        )}
                                        placeholder="+880 1XXX XXXXXX"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                        <input
                                            type="text"
                                            id="organization"
                                            value={data.organization}
                                            onChange={e => setData('organization', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
                                            placeholder="Company / University"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                        <input
                                            type="text"
                                            id="designation"
                                            value={data.designation}
                                            onChange={e => setData('designation', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
                                            placeholder="Student / Engineer"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transform active:scale-95 transition duration-200"
                                >
                                    {processing ? 'Processing...' : 'Complete Registration'}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
