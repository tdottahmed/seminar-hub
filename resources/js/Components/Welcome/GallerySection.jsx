import { motion } from "framer-motion";
import { Image, ArrowUpRight, ArrowRight } from "lucide-react";
import { galleryStaticImages } from "./data";

export default function GallerySection({ t, galleryItems, isBn }) {
    const displayGalleryItems = galleryItems.length > 0 ? galleryItems : galleryStaticImages.map((img, idx) => ({
        id: idx + 1,
        image: img,
        title: `Event ${idx + 1}`,
        category: "Workshop"
    }));

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
                        {t.gallery.title}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
                        {t.gallery.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayGalleryItems.slice(0, 8).map((item, idx) => (
                        <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 hover:border-pink-500/50 transition-all duration-300"
                        >
                            {/* Gallery Image */}
                            <img
                                src={typeof item === 'string' ? item : item.image}
                                alt={typeof item === 'string' ? `Gallery Image ${idx + 1}` : item.title || `Gallery Image ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    {typeof item !== 'string' && item.title && (
                                        <h3 className="text-white font-bold text-lg mb-2">
                                            {item.title}
                                        </h3>
                                    )}
                                    {typeof item !== 'string' && item.category && (
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-500/80 backdrop-blur-sm text-white rounded-full">
                                            {item.category}
                                        </span>
                                    )}
                                    {typeof item !== 'string' && item.description && (
                                        <p className="text-slate-300 text-sm mt-2 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Zoom Icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                {displayGalleryItems.length > 8 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 text-pink-300 font-bold hover:from-pink-500/20 hover:to-rose-500/20 transition transform hover:-translate-y-0.5">
                            {t.gallery.viewAll}
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
