import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Sparkles, Clock, Ticket } from "lucide-react";
import clsx from "clsx";

export default function EventsSection({ t, upcomingEvents, isBn }) {
    
    // Helper for date formatting
    const formatDate = (dateString, format = 'short') => {
        const date = new Date(dateString);
        if (format === 'day') return date.getDate();
        if (format === 'month') return date.toLocaleString("default", { month: "short" });
        if (format === 'full') return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (format === 'time') return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return date.toLocaleDateString();
    };

    return (
        <section id="events" className="py-24 bg-[#0B0F19] relative overflow-hidden">
             {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                 <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                    >
                         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
                                {isBn ? "আসন্ন ইভেন্ট" : "Upcoming Events"}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-display text-white mb-6 tracking-tight">
                            {t.events.title}
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                    </motion.div>
                </div>

                {upcomingEvents.length > 0 ? (
                    <div className="space-y-32">
                        {upcomingEvents.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="relative group"
                                >
                                    {/* Connector Line (except for last item) */}
                                    {index !== upcomingEvents.length - 1 && (
                                        <div className="absolute left-1/2 bottom-[-128px] w-px h-32 bg-gradient-to-b from-white/10 to-transparent hidden lg:block"></div>
                                    )}

                                    <div className={clsx(
                                        "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                                        !isEven && "lg:grid-flow-col-dense" // Swap logic for odd items
                                    )}>
                                        
                                        {/* Image Side */}
                                        <div className={clsx(
                                            "relative",
                                            !isEven && "lg:col-start-2"
                                        )}>
                                            <Link href={route("events.show", event.slug)} className="block relative aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-indigo-500/30 transition-all duration-500">
                                                <img
                                                    src={event.banner_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=1e293b&color=fff`}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                                            
                                                {/* Floating Badges on Image */}
                                                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                                                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[80px]">
                                                         <span className="block text-3xl font-bold text-white leading-none">
                                                             {formatDate(event.start_date, 'day')}
                                                         </span>
                                                         <span className="block text-xs font-bold text-indigo-300 uppercase tracking-wider mt-1">
                                                             {formatDate(event.start_date, 'month')}
                                                         </span>
                                                     </div>

                                                     <div className={clsx(
                                                        "px-4 py-2 rounded-xl backdrop-blur-md border font-bold text-xs uppercase tracking-wider shadow-lg",
                                                        event.is_free 
                                                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" 
                                                            : "bg-indigo-500/20 border-indigo-500/30 text-indigo-300"
                                                    )}>
                                                        {event.is_free ? t.events.free : t.events.paid}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Content Side */}
                                        <div className={clsx(
                                            "relative",
                                            !isEven && "lg:col-start-1 text-right lg:text-right" // Align text appropriately
                                        )}>
                                            <div className={clsx(
                                                "flex flex-col gap-6",
                                                !isEven ? "items-end" : "items-start"
                                            )}>
                                                {/* Host & Organizer Badges */}
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    {(event.host_name || event.host_logo) && (
                                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                                                            {event.host_logo && (
                                                                <img 
                                                                    src={event.host_logo} 
                                                                    alt={event.host_name || "Host"} 
                                                                    className="w-6 h-6 rounded-full object-cover"
                                                                />
                                                            )}
                                                            {event.host_name && (
                                                                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                                                                    Hosted by {event.host_name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {/* Organizer Badge */}
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                                                        <img 
                                                            src="/assets/logo/Logo-prochesta-IT-light-1.png" 
                                                            alt="Prochesta IT" 
                                                            className="h-4 w-auto object-contain"
                                                        />
                                                        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                                                            Organized By Prochesta IT
                                                        </span>
                                                       
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-indigo-400" />
                                                        {formatDate(event.start_date, 'time')}
                                                    </div>
                                                    {event.venue && (
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-pink-400" />
                                                            {event.venue}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] group-hover:text-indigo-200 transition-colors">
                                                    <Link href={route("events.show", event.slug)}>
                                                        {event.title}
                                                    </Link>
                                                </h3>

                                                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                                                    {event.short_description || event.description || "Join us for an immersive experience designed to elevate your skills and connect you with industry leaders."}
                                                </p>

                                                <div className="pt-4 flex flex-wrap gap-4">
                                                     {event.max_participants && (
                                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm">
                                                            <Users className="w-4 h-4 text-emerald-400" />
                                                            <span>
                                                                {event.max_participants} Seats Available
                                                            </span>
                                                        </div>
                                                     )}
                                                </div>

                                                <div className="pt-6">
                                                    <Link 
                                                        href={route("events.show", event.slug)}
                                                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] group/btn"
                                                    >
                                                        {t.events.viewDetails}
                                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    // Empty State
                     <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center py-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10 backdrop-blur-sm max-w-3xl mx-auto"
                    >
                        <div className="w-24 h-24 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-xl">
                            <Sparkles className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                            {isBn ? "কোনো আসন্ন ইভেন্ট নেই" : "Curating Experiences..."}
                        </h3>
                        <p className="text-slate-400 text-lg max-w-md mx-auto">
                            {isBn ? "শীঘ্রই চমৎকার ইভেন্টের জন্য চেক করুন!" : "We are diligently planning our next lineup of exclusive events. Check back soon."}
                        </p>
                    </motion.div>
                )}

                {upcomingEvents.length > 0 && (
                     <div className="text-center mt-32">
                        <Link
                            href='/events'
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium tracking-widest uppercase text-sm border-b border-transparent hover:border-white pb-1"
                        >
                            {isBn ? "সব ইভেন্ট দেখুন" : "View All Events"}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                )}
            </div>
        </section>
    );
}
