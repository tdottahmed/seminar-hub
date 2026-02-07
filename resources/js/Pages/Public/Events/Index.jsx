import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/Contexts/LanguageContext';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { 
    Calendar,
    MapPin,
    Clock,
    ArrowRight,
    Search,
    Filter,
    Tag
} from 'lucide-react';
import { useState } from 'react';

export default function Index({ events }) {
    const { isBn } = useLanguage();
    const t = (en, bn) => isBn ? bn : en;
    const [searchTerm, setSearchTerm] = useState('');

    // Format Date helper
    const formatDate = (dateString, timeString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <GuestLayout>
            <Head title={t("Upcoming Events", "আসন্ন ইভেন্টসমূহ")} />
            
            <Breadcrumb 
                title={t("Events", "ইভেন্টসমূহ")}
                items={[{ label: t("All Events", "সকল ইভেন্ট") }]}
            />

            {/* Hero Section */}
            <section className="relative py-20 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-display text-white mb-6"
                    >
                        {t("Discover & Join Our Events", "আমাদের ইভেন্টগুলো সম্পর্কে জানুন ও যোগ দিন")}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                         {t(
                            "Stay updated with our latest workshops, seminars, and tech talks designed to empower your career.",
                            "আপনার ক্যারিয়ার গড়তে আমাদের আয়োজন করা সর্বশেষ কর্মশালা, সেমিনার এবং টেক টক সম্পর্কে আপডেট থাকুন।"
                         )}
                    </motion.p>
                    
                    {/* Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto relative group"
                    >
                        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full group-hover:bg-indigo-500/30 transition-all" />
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center p-2 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <Search className="text-slate-400 ml-4 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder={t("Search events...", "ইভেন্ট খুঁজুন...")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none text-white w-full focus:ring-0 placeholder:text-slate-500 px-4"
                            />
                            {/* Filter Icon (Visual Only for now) */}
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-white/5 ml-2 cursor-pointer hover:bg-slate-700 hover:text-white transition-colors">
                                <Filter size={18} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20 bg-slate-950 relative min-h-[600px]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                
                <div className="container mx-auto px-6 relative z-10">
                    {filteredEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event, index) => (
                                <motion.div 
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80" />
{event.thumbnail ? (
                                        <img 
                                            src={`/storage/${event.thumbnail}`} 
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none'; // Hide broken image
                                                e.target.nextSibling.style.display = 'flex'; // Show fallback
                                            }}
                                        />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${
                                            index % 4 === 0 ? 'from-purple-900/50 via-slate-900 to-indigo-900/50' :
                                            index % 4 === 1 ? 'from-blue-900/50 via-slate-900 to-cyan-900/50' :
                                            index % 4 === 2 ? 'from-emerald-900/50 via-slate-900 to-teal-900/50' :
                                            'from-orange-900/50 via-slate-900 to-red-900/50'
                                        } flex items-center justify-center group-hover:scale-110 transition-transform duration-700`}>
                                            <div className="relative p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg">
                                                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md animate-pulse"></div>
                                                <Calendar className={`w-8 h-8 ${
                                                    index % 4 === 0 ? 'text-purple-400' :
                                                    index % 4 === 1 ? 'text-cyan-400' :
                                                    index % 4 === 2 ? 'text-emerald-400' :
                                                    'text-orange-400'
                                                }`} />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Fallback container for broken images (hidden by default) */}
                                    <div className="absolute inset-0 hidden w-full h-full bg-slate-800 flex items-center justify-center">
                                        <Calendar className="w-10 h-10 text-slate-600" />
                                    </div>
                                        
                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold text-indigo-400 shadow-lg">
                                            <Calendar size={14} />
                                            {formatDate(event.start_date)}
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-white/10 shadow-lg ${
                                            event.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {event.status === 'published' ? t("Open", "চলমান") : t("Closed", "বন্ধ")}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex gap-2 mb-3">
                                             <span className="bg-indigo-500/10 text-indigo-400 text-[10px] sm:text-xs px-2 py-1 rounded border border-indigo-500/20 font-medium tracking-wide uppercase flex items-center gap-1">
                                                <Tag size={10} />
                                                {event.type || 'Seminar'}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                                            {isBn && event.title_bn ? event.title_bn : event.title}
                                        </h3>
                                        
                                        <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
                                            {isBn && event.description_bn ? event.description_bn : event.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="space-y-2 mb-6 text-sm text-slate-500 border-t border-slate-800 pt-4">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-indigo-400/70" />
                                                <span>{event.start_time || '10:00 AM'} - {event.end_time || '04:00 PM'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-indigo-400/70" />
                                                <span className="truncate">{event.location || t("Online Event", "অনলাইন ইভেন্ট")}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <Link 
                                            href={route('events.show', event.slug)} 
                                            className="mt-auto w-full group relative flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 overflow-hidden transition-all active:scale-95"
                                        >
                                            <span className="relative z-10">{t("View Details", "বিস্তারিত দেখুন")}</span>
                                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-300 mb-2">{t("No events found", "কোনো ইভেন্ট পাওয়া যায়নি")}</h3>
                            <p className="text-slate-500">{t("Try adjusting your search terms.", "অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে খুঁজুন।")}</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
