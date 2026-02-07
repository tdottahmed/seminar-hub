import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/Contexts/LanguageContext';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { 
    Code, 
    Smartphone, 
    Monitor, 
    Server, 
    Shield, 
    Search, 
    Megaphone, 
    Palette, 
    Users, 
    ShoppingBag, 
    GraduationCap, 
    Activity, 
    ShoppingCart,
    ArrowRight
} from 'lucide-react';

export default function Index() {
    const { lang, isBn } = useLanguage();
    const [activeTab, setActiveTab] = useState('All');

    // Helper to get content based on language
    const t = (en, bn) => isBn ? bn : en;

    const categories = [
        {
            id: 'enterprise',
            tabLabel: 'Enterprise',
            title: "Enterprise Software & Web Solutions",
            title_bn: "সফটওয়্যার ও ওয়েব সমাধান",
            subtitle: "Focus: Efficiency, Scalability, and Security.",
            subtitle_bn: "ফোকাস: দক্ষতা, স্কেলেবিলিটি এবং নিরাপত্তা।",
            services: [
                {
                    id: 1,
                    title: "Smart POS Systems",
                    title_bn: "স্মার্ট পিওএস (POS) সিস্টেম",
                    description: "Streamline your retail or wholesale business with our intelligent Point of Sale software. Features include automated inventory tracking, real-time reporting, and easy billing.",
                    description_bn: "আপনার খুচরা বা পাইকারি ব্যবসাকে আধুনিক ও সহজ করতে আমাদের অটোমেটেড পিওএস সফটওয়্যার।",
                    icon: ShoppingBag,
                    color: "text-blue-400",
                    bg: "bg-blue-500/10"
                },
                {
                    id: 2,
                    title: "School Management Systems",
                    title_bn: "স্কুল ম্যানেজমেন্ট সিস্টেম",
                    description: "A complete digital ecosystem for educational institutions. Manage student records, attendance, result processing, and fee collection in one unified platform.",
                    description_bn: "শিক্ষা প্রতিষ্ঠানের হাজিরা, রেজাল্ট এবং ফি ম্যানেজমেন্টের জন্য একটি পূর্ণাঙ্গ ডিজিটাল সমাধান।",
                    icon: GraduationCap,
                    color: "text-green-400",
                    bg: "bg-green-500/10"
                },
                {
                    id: 3,
                    title: "Pharmacy Management Solutions",
                    title_bn: "ফার্মাসি ম্যানেজমেন্ট সলিউশন",
                    description: "A dedicated solution for drugstores. Track expiry dates, manage complex medicine inventories, and generate instant sales reports with ease.",
                    description_bn: "ওষুধের ইনভেন্টরি, মেয়াদ উত্তীর্ণের তারিখ ট্র্যাকিং এবং দ্রুত বিক্রয়ের জন্য সেরা সমাধান।",
                    icon: Activity,
                    color: "text-red-400",
                    bg: "bg-red-500/10"
                },
                {
                    id: 4,
                    title: "Next-Gen Ecommerce Platforms",
                    title_bn: "ই-কমার্স প্ল্যাটফর্ম",
                    description: "Launch your online store with a high-performing, mobile-responsive, and secure platform. Integrated with payment gateways and easy-to-use admin panels.",
                    description_bn: "আপনার ব্যবসা অনলাইন নিয়ে যেতে আমরা তৈরি করি নিরাপদ ও ইউজার-ফ্রেন্ডলি অনলাইন স্টোর।",
                    icon: ShoppingCart,
                    color: "text-yellow-400",
                    bg: "bg-yellow-500/10"
                },
                {
                    id: 5,
                    title: "Custom Software Development",
                    title_bn: "কাস্টম সফটওয়্যার সমাধান",
                    description: "Have a unique problem? We build tailor-made software from scratch to fit your specific business requirements, ensuring maximum efficiency.",
                    description_bn: "আপনার ব্যবসার বিশেষ প্রয়োজন অনুযায়ী আমরা তৈরি করি সম্পূর্ণ নতুন ও কার্যকর সফটওয়্যার।",
                    icon: Code,
                    color: "text-purple-400",
                    bg: "bg-purple-500/10"
                }
            ]
        },
        {
            id: 'marketing',
            tabLabel: 'Marketing',
            title: "Digital Marketing & Visibility",
            title_bn: "ডিজিটাল মার্কেটিং ও এসইও",
            subtitle: "Focus: Growth, Reach, and ROI.",
            subtitle_bn: "ফোকাস: গ্রোথ, রিচ এবং আরওআই।",
            services: [
                {
                    id: 6,
                    title: "SEO & Search Engine Dominance",
                    title_bn: "সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO)",
                    description: "Rank higher on Google and get discovered. Our expert SEO services ensure your business stays ahead of the competition organically.",
                    description_bn: "আপনার ওয়েবসাইটকে গুগলের শীর্ষে পৌঁছে দিতে আমরা দিচ্ছি আধুনিক এসইও সেবা।",
                    icon: Search,
                    color: "text-orange-400",
                    bg: "bg-orange-500/10"
                },
                {
                    id: 7,
                    title: "Strategic Digital Marketing",
                    title_bn: "ডিজিটাল মার্কেটিং",
                    description: "Grow your brand presence across Facebook, Instagram, and LinkedIn. We run data-driven ad campaigns that turn leads into loyal customers.",
                    description_bn: "ফেসবুক ও গুগল অ্যাডস ক্যাম্পেইনের মাধ্যমে আপনার ব্যবসার প্রচার ও বিক্রি কয়েক গুণ বাড়িয়ে নিন।",
                    icon: Megaphone,
                    color: "text-pink-400",
                    bg: "bg-pink-500/10"
                }
            ]
        },
        {
            id: 'design',
            tabLabel: 'Creative',
            title: "Creative Design & Branding",
            title_bn: "গ্রাফিক্স ও ব্র্যান্ডিং ডিজাইন",
            subtitle: "Focus: Visual Identity and Storytelling.",
            subtitle_bn: "ফোকাস: ভিজুয়্যাল আইডেন্টিটি এবং স্টোরিটেলিং।",
            services: [
                {
                    id: 8,
                    title: "Professional Graphics Design",
                    title_bn: "প্রফেশনাল গ্রাফিক্স ডিজাইন",
                    description: "From iconic logos to social media visuals, our creative team crafts designs that resonate with your audience and define your brand identity.",
                    description_bn: "আপনার ব্র্যান্ডের জন্য লোগো, ব্যানার এবং সোশ্যাল মিডিয়া ডিজাইনের মাধ্যমে তৈরি করুন স্বতন্ত্র পরিচয়।",
                    icon: Palette,
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/10"
                }
            ]
        },
        {
            id: 'outsourcing',
            tabLabel: 'Outsourcing',
            title: "Managed IT & Resource Outsourcing",
            title_bn: "ম্যানেজড আইটি ও রিসোর্স আউটসোর্সিং",
            subtitle: "Focus: Quality and Reliability.",
            subtitle_bn: "ফোকাস: গুণমান এবং নির্ভরযোগ্যতা।",
            services: [
                {
                    id: 9,
                    title: "Trained Developer Resources",
                    title_bn: "দক্ষ রিসোর্স",
                    description: "Looking for high-quality talent? We provide project-ready developers trained through our rigorous in-house ecosystem, ensuring your projects are handled by experts.",
                    description_bn: "আমাদের ইন-হাউজ ইকোসিস্টেমে প্রশিক্ষিত দক্ষ ডেভেলপারদের মাধ্যমে আপনার প্রজেক্টের কাজ সম্পন্ন করুন।",
                    icon: Users,
                    color: "text-teal-400",
                    bg: "bg-teal-500/10"
                }
            ]
        }
    ];

    const allServices = categories.flatMap(cat => cat.services);
    
    const tabs = ['All', ...categories.map(c => c.tabLabel)];

    const filteredServices = activeTab === 'All' 
        ? allServices 
        : categories.find(c => c.tabLabel === activeTab)?.services || [];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4, ease: "backOut" }
        }
    };

    return (
        <GuestLayout>
            <Head title={t("Our Services", "আমাদের সেবাসমূহ")} />

            <Breadcrumb 
                title={t("Our Services", "আমাদের সেবাসমূহ")}
                items={[{ label: t("Services", "সেবাসমূহ") }]}
            />

            {/* Hero Section */}
            <section className="relative py-28 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
                            {t("Empowerment through", "সক্ষমতা অর্জনের লক্ষে")} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                {t("Innovation", "প্রযুক্তিগত উদ্ভাবন")}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                            {t(
                                "At Prochesta IT, we don’t just build software; we craft digital experiences that scale your business. From custom enterprise solutions to creative branding, we provide everything you need to dominate the digital landscape.",
                                "প্রচেষ্টা আইটিতে, আমরা কেবল সফটওয়্যার তৈরি করি না; আমরা এমন ডিজিটাল অভিজ্ঞতা তৈরি করি যা আপনার ব্যবসাকে বড় করতে সহায়তা করে। কাস্টম এন্টারপ্রাইজ সল্যুশন থেকে শুরু করে ক্রিয়েটিভ ব্র্যান্ডিং পর্যন্ত, ডিজিটাল জগতে এগিয়ে থাকার জন্য যা কিছু প্রয়োজন, সব আমরা প্রদান করি।"
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tabs & Services */}
            <section className="bg-slate-950 pb-24 min-h-screen">
                <div className="container mx-auto px-6">
                    
                    {/* Tabs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105' 
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </motion.div>

                    {/* Content Display */}
                    <motion.div 
                        layout
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredServices.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                    <motion.div 
                                        layout
                                        key={service.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full"
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center ${service.color} group-hover:scale-110 transition duration-300 ring-1 ring-white/5 group-hover:ring-white/10`}>
                                                <IconComponent size={28} />
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                            {t(service.title, service.title_bn)}
                                        </h3>
                                        
                                        <p className="text-slate-400 leading-relaxed text-sm flex-grow">
                                            {t(service.description, service.description_bn)}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>

                    {filteredServices.length === 0 && (
                         <div className="text-center py-20">
                            <p className="text-slate-500">No services found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            {t("Ready to transform your business?", "আপনার ব্যবসার মোড় ঘোরাতে আপনি কি তৈরি?")}
                        </h2>
                        <p className="text-lg text-indigo-200 mb-10">
                            {t("Let's build something amazing together.", "আসুন একসাথে অসাধারণ কিছু তৈরি করি।")}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all w-full sm:w-auto"
                            >
                                {t("Get a Free Consultation", "ফ্রি কনসালটেশন নিন")}
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full font-bold text-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                {t("Contact Us Today", "আজই যোগাযোগ করুন")}
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </GuestLayout>
    );
}
