
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Crown, Linkedin, Twitter, Globe, ArrowRight } from 'lucide-react';

export default function Index({ teamLead, members }) {
    return (
        <GuestLayout>
            <Head title="Meet Our Team" />

            {/* Hero Section */}
            <div className="relative py-20 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-display text-white mb-6"
                    >
                        Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Team</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        The passionate individuals behind our success.
                    </motion.p>
                </div>
            </div>

            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    {/* Team Lead */}
                    {teamLead && (
                        <div className="mb-20">
                             <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm mb-4">Leadership</span>
                                <h2 className="text-3xl font-bold text-slate-900">Leading the Way</h2>
                            </div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row"
                            >
                                <div className="md:w-2/5 relative">
                                    {teamLead.photo ? (
                                        <img 
                                            src={teamLead.photo} 
                                            alt={teamLead.name} 
                                            className="w-full h-full object-cover min-h-[300px]"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 min-h-[300px]">
                                            <span className="text-4xl font-bold opacity-30">{teamLead.name.charAt(0)}</span>
                                        </div>
                                    )}
                                     <div className="absolute top-4 left-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                                        <Crown size={20} />
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{teamLead.name}</h3>
                                    <p className="text-indigo-600 font-medium text-lg mb-6">{teamLead.designation}</p>
                                    <p className="text-slate-600 leading-relaxed mb-8 line-clamp-4">
                                        {teamLead.bio || "Leading our team with vision and passion."}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex gap-4">
                                            {teamLead.social_links?.linkedin && (
                                                <a href={teamLead.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                                                    <Linkedin size={20} />
                                                </a>
                                            )}
                                            {teamLead.social_links?.twitter && (
                                                <a href={teamLead.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1da1f2] transition-colors">
                                                    <Twitter size={20} />
                                                </a>
                                            )}
                                        </div>
                                        <Link href={route('teams.show', teamLead.id)} className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition">
                                            View Profile <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Team Members */}
                    {members && members.length > 0 && (
                        <div>
                             <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900">Our Experts</h2>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {members.map((member, index) => (
                                    <motion.div 
                                        key={member.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition duration-300 group"
                                    >
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                             {member.photo ? (
                                                <img 
                                                    src={member.photo} 
                                                    alt={member.name} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                                    <span className="text-4xl font-bold opacity-30">{member.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                                                <div className="flex gap-4 text-white">
                                                    {member.social_links?.linkedin && (
                                                        <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors">
                                                            <Linkedin size={20} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                            <p className="text-indigo-600 font-medium text-sm mb-4">{member.designation}</p>
                                            <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                                                {member.bio || "Dedicated team member."}
                                            </p>
                                            <Link href={route('teams.show', member.id)} className="block w-full py-2 text-center border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition">
                                                View Profile
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
