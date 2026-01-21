import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, ArrowLeft, ExternalLink, Globe } from 'lucide-react'; // Added Globe if needed, usually in NavBar
import { useState } from 'react';
import NavBar from '../Components/Welcome/NavBar';
import Footer from '../Components/Welcome/Footer';
import { translations } from '../Components/Welcome/data';

export default function EventDetails({ event }) {
    const { auth } = usePage().props;
    const [lang, setLang] = useState("en");
    const t = translations[lang];
    // Helper functionality for language - though mostly used in NavBar/Footer, 
    // we can use 't' if we want to translate static parts of this page too, 
    // or just keep event content as is (dynamic).

    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-indigo-500/30 font-sans">
            <Head title={event.title} />

            <NavBar 
                auth={auth} 
                canLogin={!auth.user} // Simplified logic
                canRegister={!auth.user} 
                t={t} 
                lang={lang} 
                setLang={setLang} 
            />

            {/* Main Wrapper with top padding for fixed navbar */}
            <main className="pt-20"> {/* Adjust padding based on NavBar height */}
                
                {/* Hero Section */}
                <div className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900">
                        {event.banner_image ? (
                            <img 
                                src={event.banner_image} 
                                alt={event.title}
                                className="w-full h-full object-cover opacity-60"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 opacity-80"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    </div>
                
                    <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-12 z-10">
                        <Link 
                            href={route('home')}
                            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 mb-6 transition w-fit font-medium group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Home</span>
                        </Link>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-500/20 backdrop-blur-md rounded-full text-sm font-semibold text-indigo-300 mb-4 border border-indigo-500/30">
                                {event.status === 'published' ? 'Registration Open' : event.status}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                {event.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-2 space-y-12">
                            
                            {/* Short Desc / Lead */}
                            {(event.short_description || event.description) && (
                                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                                    {event.short_description || event.description.substring(0, 200) + '...'}
                                </p>
                            )}

                            {/* Info Grid (Mobile Friendly) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoCard 
                                    icon={Calendar} 
                                    color="indigo" 
                                    label="Date" 
                                    value={startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 
                                />
                                <InfoCard 
                                    icon={Clock} 
                                    color="pink" 
                                    label="Time" 
                                    value={`${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} 
                                />
                                {event.venue && (
                                    <InfoCard 
                                        icon={MapPin} 
                                        color="purple" 
                                        label="Venue" 
                                        value={event.venue} 
                                    />
                                )}
                                {event.max_participants && (
                                    <InfoCard 
                                        icon={Users} 
                                        color="green" 
                                        label="Capacity" 
                                        value={`${event.max_participants} Seats`} 
                                    />
                                )}
                            </div>

                            {/* Full Description */}
                            {event.description && (
                                <Section title="About This Event">
                                    <div className="prose prose-lg prose-invert max-w-none text-slate-300">
                                        <p className="whitespace-pre-line leading-loose">{event.description}</p>
                                    </div>
                                </Section>
                            )}

                            {/* Topics */}
                            {event.topics && event.topics.length > 0 && (
                                <Section title="What You'll Learn">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {event.topics.map((topic, index) => (
                                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                                <div className="mt-1">
                                                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <span className="text-slate-200 font-medium">{topic}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            )}

                             {/* Speakers */}
                             {event.speakers && event.speakers.length > 0 && (
                                <Section title="Meet the Speakers">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {event.speakers.map((speaker) => (
                                            <div key={speaker.id} className="group bg-slate-800/50 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center overflow-hidden border-2 border-indigo-500/20">
                                                        {speaker.photo ? (
                                                            <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-xl font-bold text-indigo-400">{speaker.name.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{speaker.name}</h3>
                                                        <p className="text-indigo-400 text-sm mb-1">{speaker.designation}</p>
                                                        <p className="text-slate-500 text-xs">{speaker.organization}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                        </div>

                        {/* Right Column: Sidebar (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Registration Box */}
                                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Save Your Spot</h3>
                                    <p className="text-slate-400 mb-8 relative z-10">Don't miss out on this opportunity to learn and grow.</p>
                                    
                                    <Link
                                        href={route('events.register', event.slug)}
                                        className="block w-full text-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/25 relative z-10"
                                    >
                                        Register Now
                                    </Link>

                                    <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 relative z-10">
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span>Registration Fee</span>
                                            <span className="text-white font-semibold">
                                                {event.registration_fee > 0 ? `$${event.registration_fee}` : 'Free'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span>Type</span>
                                            <span className="text-white font-semibold capitalize">{event.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Join Online Link */}
                                {event.meeting_link && (
                                    <a 
                                        href={event.meeting_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full p-4 rounded-xl border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 transition font-medium"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Join Virtual Meeting</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
}

// Sub-components for cleaner code
function InfoCard({ icon: Icon, color, label, value }) {
    const colorClasses = {
        indigo: "bg-indigo-500/10 text-indigo-400",
        pink: "bg-pink-500/10 text-pink-400",
        purple: "bg-purple-500/10 text-purple-400",
        green: "bg-emerald-500/10 text-emerald-400",
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                <Icon size={24} />
            </div>
            <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{label}</div>
                <div className="text-slate-200 font-medium">{value}</div>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-display border-l-4 border-indigo-500 pl-4">
                {title}
            </h2>
            {children}
        </motion.div>
    );
}

