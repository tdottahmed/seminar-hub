
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function About({ aboutSection, founderSection }) {
    const aboutContent = aboutSection?.content || {};
    const founderContent = founderSection?.content || {};

    return (
        <GuestLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <div className="relative py-20 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-display text-white mb-6"
                    >
                        {aboutContent.title || 'About Us'}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        {aboutContent.description}
                    </motion.p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100"
                        >
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Our Mission</h2>
                            <p className="text-indigo-700 text-lg leading-relaxed">
                                {aboutContent.mission || "To empower individuals through knowledge and connection."}
                            </p>
                        </motion.div>
                        <motion.div 
                             initial={{ opacity: 0, x: 20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                            className="bg-purple-50 rounded-2xl p-8 border border-purple-100"
                        >
                            <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Vision</h2>
                            <p className="text-purple-700 text-lg leading-relaxed">
                                {aboutContent.vision || "We envision a world where learning opportunities are accessible to everyone."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Founder Section */}
            {founderSection && (
                <div className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="w-full md:w-1/3"
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                                    {founderContent.image ? (
                                        <img 
                                            src={founderContent.image} 
                                            alt={founderContent.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold">{founderContent.name}</h3>
                                        <p className="text-indigo-200">{founderContent.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="w-full md:w-2/3"
                            >
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Meet the Founder</h2>
                                <div className="prose prose-lg text-slate-600">
                                    <p>{founderContent.bio}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
