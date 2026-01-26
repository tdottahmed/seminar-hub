import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, User, Mail, Sparkles, Smartphone } from 'lucide-react';

export default function Welcome({ quiz, qrCode }) {
    const { data, setData, post, processing, errors } = useForm({
        participant_name: '',
        participant_email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('quiz.public.join', quiz.id));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
            <Head title={quiz.title} />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
                <div className="w-full max-w-md z-10">
                    {/* Header */}
                    <div className="text-center mb-10 space-y-3">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl shadow-indigo-100 mb-6 animate-float ring-1 ring-slate-100">
                            <Sparkles className="w-10 h-10 text-indigo-600" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            {quiz.title}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {quiz.event?.title}
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 ring-1 ring-slate-50">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.participant_name}
                                            onChange={(e) => setData('participant_name', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    {errors.participant_name && (
                                        <p className="mt-1 text-sm text-red-500 pl-1 font-medium">{errors.participant_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.participant_email}
                                            onChange={(e) => setData('participant_email', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    {errors.participant_email && (
                                        <p className="mt-1 text-sm text-red-500 pl-1 font-medium">{errors.participant_email}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full group relative flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 overflow-hidden active:scale-[0.98]"
                            >
                                <span className="relative z-10">Start Quiz</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* QR Code Section */}
                    {qrCode && (
                        <div className="mt-8 flex flex-col items-center animate-fade-in-up">
                            <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 ring-1 ring-slate-50">
                                <div className="opacity-90 mix-blend-multiply" dangerouslySetInnerHTML={{ __html: qrCode }} />
                            </div>
                            <p className="text-slate-500 text-sm font-medium mt-4 flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-slate-100">
                                <Smartphone className="w-4 h-4 text-slate-400" />
                                Scan to open on mobile
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
             <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                    animation-delay: 0.2s;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}
