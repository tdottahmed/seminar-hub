import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MessageSquare, Star } from "lucide-react";
import { testimonialsData } from "./data";

export default function TestimonialsSection({ t, isBn, content, testimonials, lang }) {
    // Determine source data for Section Header
    const sectionData = content ? content[lang] : t.testimonials;
    
    // Determine source data for Testimonials List
    // If dynamic testimonials are provided, use them. Otherwise fallback to staticData
    // Map dynamic data to match the component's expected structure
    const list = (testimonials && testimonials.length > 0) 
        ? testimonials.map(item => ({
            name: item.name,
            role: item.role[lang] || item.role['en'], // Support bilingual
            company: item.company[lang] || item.company['en'],
            content: item.content[lang] || item.content['en'],
            rating: item.rating,
            avatar: item.image_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`
        }))
        : testimonialsData;

    if (!sectionData) return null;

    return (
        <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 mb-6">
                        <MessageSquare className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">
                            {isBn ? "পর্যালোচনা" : "Testimonials"}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        {sectionData.title}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        {sectionData.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true} // Enable navigation buttons
                    loop={true}
                    className="pb-16 !px-4" // Added padding to prevent clipping of shadows
                >
                    {list.map((testimonial, idx) => (
                        <SwiperSlide key={idx} className="h-auto"> 
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="h-full pt-4" // Add top padding for hover translation
                            >
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full hover:border-purple-500/30 hover:-translate-y-2 transition duration-300 flex flex-col">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 mb-8 italic text-lg leading-relaxed flex-grow">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30 flex-shrink-0">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                                            <p className="text-slate-400 text-sm">{testimonial.role}</p>
                                            <p className="text-slate-500 text-xs">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
