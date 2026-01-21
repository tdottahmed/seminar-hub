import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Tilt from 'react-parallax-tilt';

export default function GallerySection({ t, content, galleryItems, lang, isBn }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const sectionData = content ? content[lang] : t.gallery;

    // Filter and map items
    const items = (galleryItems && galleryItems.length > 0)
        ? galleryItems.map(item => ({
            id: item.id,
            image: item.image_url || item.image || item.path,
        })).filter(item => item.image)
        : [];

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'unset';
    }, []);

    const nextImage = useCallback((e) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev + 1) % items.length);
        }
    }, [selectedImageIndex, items.length]);

    const prevImage = useCallback((e) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev - 1 + items.length) % items.length);
        }
    }, [selectedImageIndex, items.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedImageIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex, closeLightbox, nextImage, prevImage]);

    if (!sectionData || items.length === 0) return null;

    return (
        <section id="gallery" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-950/50 to-slate-950 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm mb-6">
                        <ImageIcon className="w-4 h-4 text-pink-400" />
                        <span className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
                            {isBn ? "গ্যালারি" : "Gallery"}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 tracking-tight">
                        {sectionData.title}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {sectionData.subtitle}
                    </p>
                </motion.div>

                {/* Unified Responsive Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
                    {items.slice(0, 8).map((item, idx) => {
                        return (
                            <motion.div
                                key={item.id || idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="relative group perspective-1000"
                            >
                                <Tilt
                                    glareEnable={true}
                                    glareMaxOpacity={0.3}
                                    glareColor="#ffffff"
                                    glarePosition="all"
                                    glareBorderRadius="12px"
                                    scale={1.02}
                                    className="w-full h-full"
                                    tiltMaxAngleX={10} 
                                    tiltMaxAngleY={10}
                                    perspective={1000}
                                >
                                    <div
                                        onClick={() => openLightbox(idx)}
                                        className="w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5 relative shadow-xl group-hover:shadow-pink-500/20 transition-all duration-300"
                                    >
                                        <img
                                            src={item.image}
                                            alt={`Gallery ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                             <ZoomIn className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Button */}
                 <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <button className="group relative px-8 py-3 rounded-full bg-slate-900 border border-pink-500/30 text-white font-medium overflow-hidden transition-all hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative flex items-center gap-2">
                             {sectionData.viewAll || (isBn ? "সব দেখুন" : "View All")}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </motion.div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImageIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4"
                            onClick={closeLightbox}
                        >
                            {/* Close Button (Top Right) */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Navigation & Controls - Unified Bottom Bar */}
                            <div 
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-4 bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={prevImage}
                                    className="p-3 rounded-full hover:bg-white/10 text-white/75 hover:text-white transition-colors focus:ring-2 focus:ring-pink-500/50 outline-none"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                </button>

                                <span className="text-white/90 text-sm font-medium font-mono min-w-[60px] text-center select-none">
                                    {selectedImageIndex + 1} / {items.length}
                                </span>

                                <button
                                    onClick={nextImage}
                                    className="p-3 rounded-full hover:bg-white/10 text-white/75 hover:text-white transition-colors focus:ring-2 focus:ring-pink-500/50 outline-none"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                </button>

                                <div className="w-px h-6 bg-white/20 mx-1"></div>

                                <button
                                    onClick={closeLightbox}
                                    className="p-3 rounded-full hover:bg-white/10 text-rose-400 hover:text-rose-300 transition-colors focus:ring-2 focus:ring-pink-500/50 outline-none"
                                    aria-label="Close lightbox"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>

                            {/* Main Image Container */}
                            <div className="relative w-full h-full flex items-center justify-center pointer-events-none pb-20 md:pb-0">
                                <motion.div
                                    key={selectedImageIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative max-w-7xl max-h-[85vh] p-2 pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    <img
                                        src={items[selectedImageIndex].image}
                                        alt=""
                                        className="w-full h-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
