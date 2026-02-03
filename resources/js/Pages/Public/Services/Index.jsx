
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Globe, Lightbulb, PenTool, Smartphone, Monitor, Server, Cloud, Shield } from 'lucide-react';

// Map icon names to Lucide components
const iconMap = {
    Code, Database, Globe, Lightbulb, PenTool, Smartphone, Monitor, Server, Cloud, Shield
};

export default function Index({ services }) {
    return (
        <GuestLayout>
            <Head title="Our Services" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Services</span>
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            We provide comprehensive solutions tailored to your needs. From web development to strategic consulting, we are your partners in growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.length > 0 ? (
                            services.map((service, index) => {
                                const IconComponent = iconMap[service.icon] || Globe;
                                
                                return (
                                    <motion.div 
                                        key={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition duration-300 group"
                                    >
                                        <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition duration-300">
                                            <IconComponent size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                        <p className="text-slate-400 mb-6 leading-relaxed">
                                            {service.short_description}
                                        </p>
                                        {/* Optional: Link to detailed service page if implemented later */}
                                        {/* <Link href={route('services.show', service.slug)} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition">
                                            <span>Learn more</span>
                                            <ArrowRight size={16} />
                                        </Link> */}
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-slate-500 text-lg">No services found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
