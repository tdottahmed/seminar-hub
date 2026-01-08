import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, User, Mail, Phone, Briefcase, Globe, ArrowLeft, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

export default function EventDetails({ event }) {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Head title={event.title} />

            {/* Hero Section with Banner */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950 z-10"></div>
                {event.banner_image ? (
                    <img 
                        src={event.banner_image} 
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
                )}
                
                <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <Link 
                        href={route('home')}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition w-fit"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-4 py-2 bg-indigo-500/30 backdrop-blur-md rounded-full text-sm font-semibold mb-4 border border-indigo-400/30">
                            {event.status === 'published' ? 'Registration Open' : event.status}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
                            {event.title}
                        </h1>
                        <p className="text-xl text-slate-200 max-w-3xl leading-relaxed">
                            {event.short_description || event.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Event Info Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 uppercase tracking-wider">Date</div>
                                        <div className="text-white font-semibold">
                                            {startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 uppercase tracking-wider">Time</div>
                                        <div className="text-white font-semibold">
                                            {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {event.venue && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400 uppercase tracking-wider">Venue</div>
                                            <div className="text-white font-semibold">{event.venue}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {event.max_participants && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400 uppercase tracking-wider">Capacity</div>
                                            <div className="text-white font-semibold">{event.max_participants} Seats</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Description */}
                        {event.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-bold font-display text-white mb-6">About This Event</h2>
                                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                                    <p className="whitespace-pre-line">{event.description}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Topics */}
                        {event.topics && event.topics.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-bold font-display text-white mb-6">Topics Covered</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {event.topics.map((topic, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-slate-300">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Outline */}
                        {event.outline && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-bold font-display text-white mb-6">Event Outline</h2>
                                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                                    <p className="whitespace-pre-line">{event.outline}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Speakers */}
                        {event.speakers && event.speakers.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-bold font-display text-white mb-8">Our Speakers</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {event.speakers.map((speaker) => (
                                        <div key={speaker.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                                                    {speaker.photo ? (
                                                        <img src={speaker.photo} alt={speaker.name} className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        speaker.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                                                    {speaker.designation && (
                                                        <p className="text-indigo-400 text-sm mb-2">{speaker.designation}</p>
                                                    )}
                                                    {speaker.organization && (
                                                        <p className="text-slate-400 text-sm mb-3">{speaker.organization}</p>
                                                    )}
                                                    {speaker.bio && (
                                                        <p className="text-slate-300 text-sm line-clamp-2">{speaker.bio}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-6 space-y-6"
                        >
                            {/* Register Card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 border border-indigo-500/30 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-4">Register Now</h3>
                                <p className="text-indigo-100 mb-6">Secure your spot for this amazing event!</p>
                                <Link
                                    href={route('events.register', event.slug)}
                                    className="block w-full text-center px-6 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-xl"
                                >
                                    Register Now <ArrowRight className="inline ml-2" size={18} />
                                </Link>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Quick Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Calendar className="w-5 h-5 text-indigo-400" />
                                        <span className="text-sm">{startDate.toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Clock className="w-5 h-5 text-pink-400" />
                                        <span className="text-sm">
                                            {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    {event.venue && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <MapPin className="w-5 h-5 text-purple-400" />
                                            <span className="text-sm">{event.venue}</span>
                                        </div>
                                    )}
                                    {event.meeting_link && (
                                        <a 
                                            href={event.meeting_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-indigo-400 hover:text-indigo-300 transition"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            <span className="text-sm">Join Online</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

