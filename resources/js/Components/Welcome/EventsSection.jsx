import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export default function EventsSection({ t, upcomingEvents, isBn }) {
    return (
        <section id="events" className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-900 pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 mb-6">
                        <Calendar className="w-4 h-4 text-pink-400" />
                        <span className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
                            {isBn ? "আসন্ন ইভেন্ট" : "Upcoming Events"}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {t.events.title}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        {t.events.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {upcomingEvents.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.slice(0, 6).map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Link href={route("events.show", event.slug)}>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 h-full">
                                        {/* Event Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={event.banner_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=6366f1&color=fff&size=800`}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent"></div>
                                            <div className="absolute top-4 left-4">
                                                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-center min-w-[80px]">
                                                    <div className="text-xl font-bold leading-none">
                                                        {new Date(event.start_date).getDate()}
                                                    </div>
                                                    <div className="text-xs uppercase font-medium">
                                                        {new Date(event.start_date).toLocaleString("default", { month: "short" })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${event.is_free ? 'bg-green-500/20 text-green-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                                                    {event.is_free ? t.events.free : t.events.paid}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Event Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="flex items-center gap-1 text-sm text-slate-400">
                                                    <Calendar size={14} />
                                                    {new Date(event.start_date).toLocaleDateString()}
                                                </span>
                                                {event.venue && (
                                                    <span className="flex items-center gap-1 text-sm text-slate-400">
                                                        <MapPin size={14} />
                                                        {event.venue}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition">
                                                {event.title}
                                            </h3>

                                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                {event.short_description || event.description || "Join us for an immersive experience designed to elevate your skills."}
                                            </p>

                                            <div className="flex items-center justify-between mt-6">
                                                <div className="flex items-center gap-2">
                                                    <Users size={16} className="text-slate-400" />
                                                    <span className="text-sm text-slate-400">
                                                        {event.max_participants ? `${event.max_participants} ${t.events.seatsLeft}` : 'Unlimited Seats'}
                                                    </span>
                                                </div>
                                                <div className="inline-flex items-center gap-2 text-indigo-300 font-semibold text-sm group-hover:gap-3 transition-all">
                                                    {t.events.viewDetails}
                                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 backdrop-blur-sm"
                    >
                        <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-xl">
                            {isBn ? "কোনো আসন্ন ইভেন্ট নেই" : "No upcoming events scheduled."}
                        </p>
                        <p className="text-slate-500 text-sm mt-2">
                            {isBn ? "শীঘ্রই চমৎকার ইভেন্টের জন্য চেক করুন!" : "Check back soon for exciting events!"}
                        </p>
                    </motion.div>
                )}

                {upcomingEvents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            href='/events'
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-indigo-300 font-bold hover:from-indigo-500/20 hover:to-purple-500/20 transition transform hover:-translate-y-0.5"
                        >
                            {t.events.viewAll}
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
