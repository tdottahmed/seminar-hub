import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, ArrowUpRight, ArrowRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// Since we cannot easily install new packages without user permission/environment checks, 
// I will implement a custom lightbox using Framer Motion and Swiper.
// It matches the user's request for a "gallery slider" popup.

export default function GallerySection({ t, content, galleryItems, lang, isBn }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const sectionData = content ? content[lang] : t.gallery;

    // Determine source data
    // Map dynamic items to consistent structure
    const items = (galleryItems && galleryItems.length > 0)
        ? galleryItems.map(item => ({
            id: item.id,
            image: item.image_url || item.image || item.path, // Prioritize accessor
        }))
        : []; // Empty initially if no items, can use static fallback if desired, but user wants dynamic.

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'unset';
    };

    if (!sectionData) return null;

    return (
        <section id="gallery" className="py-24 bg-slate-950 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950/10 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 backdrop-blur-sm mb-6">
                        <Image className="w-4 h-4 text-pink-400" />
                        <span className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
                            {isBn ? "গ্যালারি" : "Gallery"}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                        {sectionData.title}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
                        {sectionData.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Desktop Grid View */}
                <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.slice(0, 8).map((item, idx) => (
                         <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onClick={() => openLightbox(idx)}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 hover:border-pink-500/50 transition-all duration-300"
                        >
                            <img
                                src={item.image}
                                alt={item.title || `Gallery Image ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Content removed as requested */}
                            </div>
                            
                            <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                         </motion.div>
                    ))}
                </div>

                {/* Mobile/Tablet Coverflow Slider View */}
                <div className="lg:hidden">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="w-full py-12"
                        initialSlide={1}
                    >
                        {items.slice(0, 10).map((item, idx) => (
                             <SwiperSlide key={item.id || idx} className="w-64 h-80 sm:w-72 sm:h-96">
                                  <div 
                                    className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer border-2 border-white/20 shadow-2xl"
                                    onClick={() => openLightbox(idx)}
                                  >
                                      <img
                                          src={item.image}
                                          alt={item.title}
                                          className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                                          {/* Content removed */}
                                      </div>
                                  </div>
                             </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                 {/* Custom Lightbox Modal */}
                <AnimatePresence>
                    {selectedImageIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
                        >
                            <button 
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
                            >
                                <X className="w-8 h-8 md:w-10 md:h-10" />
                            </button>

                            <div className="w-full h-full max-w-7xl mx-auto px-4 md:px-12 py-12 flex items-center">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    initialSlide={selectedImageIndex}
                                    spaceBetween={40}
                                    slidesPerView={1}
                                    navigation={true}
                                    pagination={{ type: 'fraction', el: '.fraction-pagination' }}
                                    className="w-full h-full flex items-center"
                                >
                                    {items.map((item, idx) => (
                                        <SwiperSlide key={idx} className="flex items-center justify-center h-full">
                                            <div className="relative max-h-full w-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
                                                <div className="relative max-h-[70vh] md:max-h-[85vh] w-auto max-w-full rounded-lg overflow-hidden shadow-2xl border border-white/10">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        className="max-h-[70vh] md:max-h-[85vh] w-auto object-contain"
                                                    />
                                                </div>
                                                
                                                {/* Caption Side (Removed as requested) */}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    
                                     {/* Custom Pagination Container */}
                                     <div className="fraction-pagination absolute bottom-4 left-0 w-full text-center text-white/50 font-mono text-sm z-50 pointer-events-none"></div>
                                </Swiper>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                 {/* View More Button */}
                {items.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 text-pink-300 font-bold hover:from-pink-500/20 hover:to-rose-500/20 transition transform hover:-translate-y-0.5">
                            {sectionData.viewAll || (isBn ? "সব দেখুন" : "View All")}
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
