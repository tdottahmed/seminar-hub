import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Users, Crown, Linkedin, Twitter, ExternalLink, ArrowRight } from "lucide-react";
import { staticTeamMembers } from "./data";

export default function TeamSection({ t, teamLead, teamMembers, isBn }) {
    const displayTeamMembers = teamMembers.length > 0 ? teamMembers : staticTeamMembers;

    return (
        <section id="team" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm mb-6">
                        <Users className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                            {isBn ? "আমাদের টিম" : "Our Team"}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                        {t.team.title}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
                        {t.team.subtitle}
                    </p>
                </motion.div>
            </div>

            {/* Team Leader Featured Section */}
            {teamLead && (
                <div className="container mx-auto px-6 mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative group bg-white/5 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-all duration-300">
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 z-20 animate-bounce-subtle">
                                <div className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/20 border border-white/20">
                                    <div className="flex items-center gap-2">
                                        <Crown className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                                        <span className="text-white font-bold tracking-wide uppercase text-sm">Team Lead</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                                {/* Image */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full transform scale-90 translate-y-4"></div>
                                    <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/20 h-[350px] md:h-[400px]">
                                        <img
                                            src={teamLead.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(teamLead.name)}&background=6366f1&color=fff&size=512`}
                                            alt={teamLead.name}
                                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center md:text-left space-y-6">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
                                            {teamLead.name}
                                        </h3>
                                        <p className="text-xl text-indigo-400 font-medium flex items-center justify-center md:justify-start gap-2">
                                            {teamLead.designation}
                                        </p>
                                    </div>

                                    {teamLead.bio && (
                                        <p className="text-slate-300 text-lg leading-relaxed">
                                            {teamLead.bio}
                                        </p>
                                    )}

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                         <Link 
                                            href={teamLead.id ? route("teams.show", teamLead.id) : "#"} 
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors"
                                        >
                                            {isBn ? "বিস্তারিত দেখুন" : "View Details"}
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Other Team Members Slider */}
            <div className="container mx-auto px-6 relative z-10">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        el: ".swiper-pagination-custom",
                    }}
                    navigation={true}
                    loop={teamMembers.length > 4}
                    className="pb-16"
                >
                    {(displayTeamMembers.length > 0 ? displayTeamMembers : []).map((member, idx) => (
                        <SwiperSlide key={member.id || idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="h-full pt-4"
                            >
                                <div className="relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                                    <Link 
                                        href={member.id ? route("teams.show", member.id) : "#"} 
                                        className="absolute inset-0 z-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        aria-label={`View details for ${member.name}`}
                                    >
                                        <span className="sr-only">View details for {member.name}</span>
                                    </Link>
                                    
                                    {/* Member Image - Fixed Height Rectangle */}
                                    <div className="relative mb-6 overflow-hidden rounded-xl h-64 w-full group-hover:shadow-lg transition-all duration-500 border border-white/10 group-hover:border-indigo-500/30 pointer-events-none sticky top-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-40"></div>
                                        <img
                                            src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f1&color=fff&size=512`}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Member Info */}
                                    <div className="text-center relative z-10 flex-grow flex flex-col">
                                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition">
                                            {member.name}
                                        </h4>
                                        {member.designation && (
                                            <p className="text-indigo-300/80 text-sm font-medium mb-3">
                                                {member.designation}
                                            </p>
                                        )}
                                        
                                        {member.bio && (
                                            <p className="text-slate-500 text-xs mb-4 line-clamp-2 mt-auto">
                                                {member.bio}
                                            </p>
                                        )}

                                        <div className="inline-flex items-center justify-center gap-2 text-xs text-indigo-400 font-semibold group-hover:text-indigo-300 transition-all pointer-events-none mt-2">
                                            <span>{t.team.viewDetails}</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-pagination-custom flex justify-center mt-6"></div>
            </div>
        </section>
    );
}
