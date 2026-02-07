import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Contexts/LanguageContext';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { 
    Users, 
    Target, 
    BookOpen, 
    Globe2, 
    Code2, 
    Leaf,
    Quote,
    Sparkles,
    Zap,
    Layers
} from 'lucide-react';

export default function Goals() {
    const { isBn } = useLanguage();

    // Helper for bilingual content
    const t = (en, bn) => isBn ? bn : en;

    const goals = [
        {
            icon: Users,
            title: "Empowering the Grassroots",
            title_bn: "তৃণমূলের ক্ষমতায়ন",
            desc: "Our primary welfare goal is to reach the talented youth in rural areas who lack access to high-quality tech education. We aim to break the barrier of geography and financial status, ensuring that a dreamer in a village has the same tools as a professional in the city.",
            desc_bn: "আমাদের প্রধান কল্যাণকর লক্ষ্য হলো গ্রামের বা মফস্বলের সেই সব মেধাবী তরুণদের কাছে পৌঁছানো, যাদের মাঝে স্বপ্ন আছে কিন্তু সঠিক সুযোগ নেই। আমরা চাই প্রযুক্তির আলো যেন সবার কাছে সমানভাবে পৌঁছায়। একজন গ্রামের ছেলেও যেন তার সাধারণ স্মার্টফোন বা ল্যাপটপ ব্যবহার করে বিশ্বজয়ের স্বপ্ন দেখতে পারে。",
            color: "text-green-400",
            bg: "bg-green-500/20",
            border: "border-green-500/30"
        },
        {
            icon: BookOpen,
            title: "Bridging the Skill Gap",
            title_bn: "শিক্ষার শূন্যতা পূরণ / বাস্তব দক্ষতা",
            desc: "Academic degrees often fail to meet the rapid demands of the IT industry. Our goal is to bridge this gap through our \"6+6 Model\". We move beyond textbooks to provide hands-on experience, transforming students into project-ready professionals who don't just find jobs—they create value.",
            desc_bn: "শুধু সার্টিফিকেটের পেছনে না ছুটে আমরা তরুণদের শেখাই— \"দক্ষতাই আসল শক্তি\"। আমাদের লক্ষ্য হলো প্রথাগত শিক্ষার সাথে প্রফেশনাল ইন্ডাস্ট্রির যে দূরত্ব, তা ঘুচিয়ে দেওয়া। আমাদের বিশেষ ট্রেনিং মডেলের মাধ্যমে আমরা শিক্ষার্থীদের এমনভাবে তৈরি করি যেন তারা যেকোনো কর্পোরেট চ্যালেঞ্জ মোকাবিলায় প্রস্তুত থাকে।",
            color: "text-blue-400",
            bg: "bg-blue-500/20",
            border: "border-blue-500/30"
        },
        {
            icon: Globe2,
            title: "Creating a Global Workforce",
            title_bn: "বিশ্বমানের জনবল তৈরি / কর্মসংস্থান",
            desc: "We don't want our youth to be limited by local boundaries. Our commercial goal is perfectly aligned with our welfare goal: by training local talent to meet Global Standards, we are creating a skilled workforce that can represent Bangladesh in the international market, bringing pride and prosperity to the nation.",
            desc_bn: "আমরা শুধু স্বপ্ন দেখাই না, স্বপ্ন পূরণের পথও তৈরি করি। আমাদের লক্ষ্য হলো আগ্রহী তরুণদের দক্ষ করে তোলা এবং তাদের আমাদের নিজস্ব প্রতিষ্ঠানের অংশ হিসেবে অন্তর্ভুক্ত করা। আমরা বিশ্বাস করি, যখন একজন দক্ষ মানুষ একটি কাজের সুযোগ পায়, তখন শুধু একটি পরিবারের অভাব দূর হয় না, বরং একটি দেশ সমৃদ্ধ হয়।",
            color: "text-purple-400",
            bg: "bg-purple-500/20",
            border: "border-purple-500/30"
        },
        {
            icon: Code2,
            title: "Excellence in Digital Solutions",
            title_bn: "সেবার মান ও শ্রেষ্ঠত্ব",
            desc: "Commercially, we strive to be the most trusted IT partner for businesses. Whether it's a POS system for a small trader or a custom ERP for a large school, our goal is to provide software that is Simple, Powerful, and Affordable, helping local businesses grow in this digital era.",
            desc_bn: "বাণিজ্যিকভাবে আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি ব্যবসাকে ডিজিটাল করা। স্কুল ম্যানেজমেন্ট থেকে শুরু করে পিওএস সিস্টেম—আমরা এমন সব সফটওয়্যার তৈরি করি যা ব্যবহার করা সহজ এবং সাশ্রয়ী। দেশীয় প্রযুক্তির মাধ্যমে দেশীয় ব্যবসার উন্নতি সাধনই আমাদের অন্যতম প্রধান উদ্দেশ্য।",
            color: "text-orange-400",
            bg: "bg-orange-500/20",
            border: "border-orange-500/30"
        },
        {
            icon: Leaf,
            title: "Building a Sustainable Ecosystem",
            title_bn: "একটি স্বয়ংসম্পূর্ণ ইকোসিস্টেম",
            desc: "Our ultimate dream is to create a cycle of growth. We train, we hire, and we build. By absorbing our trainees into Prochesta IT as core resources, we ensure a secure career path, reducing unemployment and fostering a culture of mentorship.",
            desc_bn: "প্রচেষ্টা আইটি-র শেষ লক্ষ্য হলো একটি স্বয়ংসম্পূর্ণ ইকোসিস্টেম তৈরি করা। আমরা প্রশিক্ষণ দিই, দক্ষ করি এবং কর্মসংস্থানের ব্যবস্থা করি। এই চক্রটি সচল রাখার মাধ্যমে আমরা একটি স্বনির্ভর ডিজিটাল বাংলাদেশ গড়ার কারিগর হিসেবে কাজ করে যেতে চাই।",
            color: "text-teal-400",
            bg: "bg-teal-500/20",
            border: "border-teal-500/30"
        }
    ];

    return (
        <GuestLayout>
            <Head title={t("Our Goals", "আমাদের লক্ষ্য")} />

            <Breadcrumb 
                title={t("Our Goals", "আমাদের লক্ষ্য")}
                items={[{ label: t("Our Goals", "আমাদের লক্ষ্য") }]}
            />

            {/* Hero Section */}
            <div className="relative py-24 bg-slate-950 overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight">
                            {t("Success is not just about revenue;", "সাফল্য মানে কেবল মুনাফা নয়,")} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                {t("it’s about the lives we change.", "সাফল্য মানে কতগুলো জীবন আমরা বদলে দিলাম।")}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            {t(
                                "At Prochesta IT, our goals are fueled by a passion for technology and a commitment to our nation's youth. We are building a future where talent meets opportunity.",
                                "প্রচেষ্টা আইটিতে, আমাদের লক্ষ্য প্রযুক্তির প্রতি ভালোবাসা এবং দেশের তরুণ প্রজন্মের প্রতি দায়বদ্ধতা থেকে উদ্ভূত। আমরা এমন একটি ভবিষ্যৎ গড়ছি যেখানে মেধা সুযোগের দেখা পায়।"
                            )}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Goals Timeline/Grid */}
            <div className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    
                    {/* Vertical Line for Desktop Timeline effect (Visual only) */}
                    <div className="absolute left-1/2 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent hidden lg:block transform -translate-x-1/2" />

                    <div className="space-y-20 lg:space-y-32">
                        {goals.map((goal, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-start gap-12 lg:gap-24`}
                            >
                                {/* Center Node (Desktop) */}
                                <div className="absolute left-1/2 top-10 transform -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
                                    <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 relative">
                                        <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75" />
                                    </div>
                                </div>

                                {/* Icon / Visual Side */}
                                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                                    <div className={`relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center`}>
                                        {/* Animated Background Blobs */}
                                        <motion.div 
                                            animate={{ 
                                                scale: [1, 1.1, 1],
                                                opacity: [0.3, 0.5, 0.3],
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className={`absolute inset-0 rounded-full blur-2xl ${goal.bg}`} 
                                        />
                                        
                                        {/* Glassmorphism Icon Container */}
                                        <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 bg-slate-800/50 backdrop-blur-xl rounded-3xl border ${goal.border} flex items-center justify-center shadow-2xl shadow-black/50 group hover:scale-105 transition-transform duration-500`}>
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                            <goal.icon className={`w-16 h-16 md:w-20 md:h-20 ${goal.color} drop-shadow-lg`} strokeWidth={1.5} />
                                            
                                            {/* Corner Accents */}
                                            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-white/20" />
                                            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white/20" />
                                        </div>
                                        
                                        {/* Floating particles/icons */}
                                        <motion.div 
                                            animate={{ y: [-10, 10, -10] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                            className="absolute top-0 right-0 p-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg"
                                        >
                                            <Sparkles className="w-4 h-4 text-yellow-400" />
                                        </motion.div>
                                         <motion.div 
                                            animate={{ y: [10, -10, 10] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                            className="absolute bottom-4 left-0 p-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg"
                                        >
                                            {index % 2 === 0 ? <Zap className="w-4 h-4 text-cyan-400" /> : <Layers className="w-4 h-4 text-pink-400" />}
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'text-left' : 'text-left'} pt-4`}>
                                     <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 hover:border-indigo-500/30 transition-all hover:bg-slate-800/60 group relative overflow-hidden">
                                        
                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                            {t(goal.title, goal.title_bn)}
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed text-lg">
                                            {t(goal.desc, goal.desc_bn)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Founder's Quote Section */}
            <div className="py-20 bg-indigo-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <Quote className="w-16 h-16 text-indigo-300 mx-auto mb-8 opacity-50" />
                        <blockquote className="text-2xl md:text-4xl font-display font-medium text-white leading-relaxed mb-8">
                            "{t(
                                "Our goal is not just to teach coding, but to inspire the courage to transform lives.",
                                "আমাদের লক্ষ্য শুধু কোডিং শেখানো নয়, বরং মানুষের জীবনকে বদলে দেওয়ার সাহস জোগানো।"
                            )}"
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-400">
                                <img 
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                                    alt="Founder" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-lg">{t("Tanbir Ahmed", "তানবীর আহমেদ")}</div>
                                <div className="text-indigo-200 text-sm">{t("Founder, Prochesta IT", "ফাউন্ডার, প্রচেষ্টা আইটি")}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
