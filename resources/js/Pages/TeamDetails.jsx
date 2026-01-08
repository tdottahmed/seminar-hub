import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Mail, Phone, Briefcase, Building, Linkedin, Twitter, ExternalLink, Globe } from 'lucide-react';

export default function TeamDetails({ team }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Head title={`${team.name} - Team`} />

            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-10"></div>
                {team.photo && (
                    <div className="absolute inset-0 opacity-20 z-0">
                        <img 
                            src={team.photo} 
                            alt={team.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                
                <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <Link 
                        href={route('home')}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition w-fit"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row gap-8 items-center"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition duration-500"></div>
                            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl ring-4 ring-indigo-500/30">
                                {team.photo ? (
                                    <img 
                                        src={team.photo} 
                                        alt={team.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                                        {team.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            {team.is_team_lead && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                                    <Crown size={24} className="text-white" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            {team.is_team_lead && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/30 backdrop-blur-sm rounded-full border border-indigo-400/30 mb-4">
                                    <Crown size={16} className="text-indigo-300" />
                                    <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">Team Lead</span>
                                </div>
                            )}
                            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">
                                {team.name}
                            </h1>
                            {team.designation && (
                                <p className="text-2xl text-indigo-300 font-semibold mb-2">{team.designation}</p>
                            )}
                            {team.organization && (
                                <p className="text-lg text-slate-300">{team.organization}</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Bio */}
                        {team.bio && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-bold font-display text-white mb-6">About</h2>
                                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                                    <p className="whitespace-pre-line">{team.bio}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Expertise */}
                        {team.expertise && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-bold font-display text-white mb-6">Areas of Expertise</h2>
                                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                                    <p className="whitespace-pre-line">{team.expertise}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-6 space-y-6"
                        >
                            {/* Contact Info */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    {team.email && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Mail className="w-5 h-5 text-indigo-400" />
                                            <a href={`mailto:${team.email}`} className="text-sm hover:text-indigo-400 transition">
                                                {team.email}
                                            </a>
                                        </div>
                                    )}
                                    {team.phone && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Phone className="w-5 h-5 text-pink-400" />
                                            <a href={`tel:${team.phone}`} className="text-sm hover:text-pink-400 transition">
                                                {team.phone}
                                            </a>
                                        </div>
                                    )}
                                    {team.designation && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Briefcase className="w-5 h-5 text-purple-400" />
                                            <span className="text-sm">{team.designation}</span>
                                        </div>
                                    )}
                                    {team.organization && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Building className="w-5 h-5 text-green-400" />
                                            <span className="text-sm">{team.organization}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Social Links */}
                            {team.social_links && (team.social_links.linkedin || team.social_links.twitter || team.social_links.website) && (
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {team.social_links.linkedin && (
                                            <a 
                                                href={team.social_links.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 rounded-lg text-indigo-300 hover:text-white transition group"
                                            >
                                                <Linkedin size={18} />
                                                <span className="text-sm font-medium">LinkedIn</span>
                                            </a>
                                        )}
                                        {team.social_links.twitter && (
                                            <a 
                                                href={team.social_links.twitter} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-300 hover:text-white transition group"
                                            >
                                                <Twitter size={18} />
                                                <span className="text-sm font-medium">Twitter</span>
                                            </a>
                                        )}
                                        {team.social_links.website && (
                                            <a 
                                                href={team.social_links.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-lg text-purple-300 hover:text-white transition group"
                                            >
                                                <Globe size={18} />
                                                <span className="text-sm font-medium">Website</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

