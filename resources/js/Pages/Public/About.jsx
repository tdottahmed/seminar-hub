import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Contexts/LanguageContext';
import { CheckCircle, Users, Target, Award, ArrowRight, Sparkles } from 'lucide-react';
import Breadcrumb from '@/Components/Common/Breadcrumb';

export default function About() {
    const { t, lang, isBn } = useLanguage();

    const content = {
        en: {
            hero: {
                title: "Welcome to Prochesta IT: Where Effort Meets Excellence",
                subtitle: "At Prochesta IT, we believe that the right effort (প্রচেষ্টা), combined with modern technology, can transform lives. We are a forward-thinking IT startup dedicated to bridging the gap between academic education and industry requirements.",
                cta: "Explore Courses"
            },
            vision: {
                title: "Our Vision",
                description: "To create a sustainable ecosystem in Bangladesh where the youth are not just job seekers but highly skilled IT professionals leading the global digital landscape.",
                features: [
                     "Sustainable Ecosystem",
                     "Skilled Professionals",
                     "Global Leadership",
                     "Digital Landscape"
                ]
            },
            model: {
                title: "Our Unique Model: Train, Integrate, Excel",
                subtitle: "We are not just another IT firm; we are a hub of growth. Our business operates on a dual-purpose model:",
                cards: [
                    {
                        title: "High-Quality IT Services",
                        description: "We provide top-tier services in Web Development, Mobile App Development, Digital Marketing, and Graphics Design. Our clients receive industry-standard solutions crafted by passionate experts."
                    },
                    {
                        title: "Resource Development",
                        description: "We identify interested individuals and provide them with rigorous, project-based training. Upon successful completion, we integrate these skilled individuals into our team as core resources, ensuring they have a secure and professional career path."
                    }
                ]
            },
            expertise: {
                title: "Our Core Expertise",
                cards: [
                    {
                        title: "Web & Mobile Solutions",
                        description: "Building robust, scalable, and user-centric applications."
                    },
                    {
                        title: "Visual Storytelling",
                        description: "Professional Graphics Design that speaks for your brand."
                    },
                    {
                        title: "Digital Growth",
                        description: "Strategic Digital Marketing to scale businesses in the modern age."
                    }
                ]
            },
             future: {
                title: "The Future",
                description: "As we grow, Prochesta IT aims to establish itself as a premier IT Training Institute, empowering thousands of students with the skills needed to dominate the 4th Industrial Revolution."
            },
            founder: {
                title: "Meet the Founder",
                name: "Tanbir Ahmed",
                role: "Software Engineer & Tech Visionary",
                bio1: "With a career spanning key roles at top-tier software firms like Pondits and Imjol, Tanbir Ahmed has always been driven by a singular passion: creating excellence through technology. As a Software Engineer, he has navigated complex international projects, but his heart remained rooted in empowering his community.",
                bio2: "Recognizing the vast gap between academic learning and industry standards, Tanbir founded Prochesta IT. His mission is to turn \"effort\" into \"expertise.\" He doesn't just want to build software; he wants to build the next generation of engineers who will lead the digital future of Bangladesh."
            },
             cta: {
                title: "Level Up with Tech. Join the Journey of Effort.",
                subtitle: "Join thousands of successful graduates who have transformed their careers with us.",
                button: "Get Started Now"
            }
        },
        bn: {
            hero: {
                title: "প্রচেষ্টা আইটি (Prochesta IT): প্রচেষ্টাই সাফল্যের চাবিকাঠি",
                subtitle: "প্রচেষ্টা আইটি একটি আধুনিক তথ্য-প্রযুক্তিভিত্তিক স্টার্টআপ, যেখানে আমরা বিশ্বাস করি সঠিক পরিশ্রম এবং প্রযুক্তির সঠিক সমন্বয় যেকোনো স্বপ্নকে বাস্তবে রূপ দিতে পারে। আমাদের মূল লক্ষ্য হলো তরুণ প্রজন্মকে শুধুমাত্র ডিগ্রিধারী নয়, বরং বর্তমান যুগের চাহিদা অনুযায়ী দক্ষ পেশাদার হিসেবে গড়ে তোলা।",
                cta: "কোর্সগুলো দেখুন"
            },
            vision: {
                title: "আমাদের লক্ষ্য",
                description: "বাংলাদেশের তরুণদের দক্ষতাকে এমন এক উচ্চতায় নিয়ে যাওয়া, যেন তারা বিশ্ববাজারের আইটি সেক্টরে নেতৃত্ব দিতে পারে এবং দেশের ডিজিটাল অর্থনীতিতে গুরুত্বপূর্ণ ভূমিকা রাখতে পারে।",
                features: [
                     "বিশ্বমানের দক্ষতা",
                     "নেতৃত্বের বিকাশ",
                     "ডিজিটাল অর্থনীতি",
                     "টেকসই ক্যারিয়ার"
                ]
            },
            model: {
                title: "আমাদের অনন্য কার্যক্রম: প্রশিক্ষণ ও কর্মসংস্থান",
                subtitle: "আমরা শুধু একটি আইটি সেবাদানকারী প্রতিষ্ঠান নই; আমরা দক্ষ জনবল তৈরির একটি মাধ্যম। আমাদের কার্যক্রম মূলত দুটি প্রধান স্তম্ভের ওপর দাঁড়িয়ে:",
                cards: [
                    {
                        title: "উন্নত আইটি সেবা",
                        description: "আমরা ওয়েব ডেভেলপমেন্ট, মোবাইল অ্যাপ ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং এবং গ্রাফিক্স ডিজাইন-এর মতো গুরুত্বপূর্ণ খাতে অত্যন্ত নিখুঁত ও প্রফেশনাল সেবা প্রদান করি।"
                    },
                    {
                        title: "দক্ষতা উন্নয়ন",
                        description: "আমরা আগ্রহী ও পরিশ্রমী তরুণদের খুঁজে বের করি এবং তাদের হাতে-কলমে আধুনিক প্রযুক্তির প্রশিক্ষণ দেই। প্রশিক্ষণ শেষে সফলদের আমরা আমাদের নিজস্ব টিমে দক্ষ রিসোর্স হিসেবে অন্তর্ভুক্ত করি, যা তাদের একটি নিশ্চিত ও সম্মানজনক ক্যারিয়ারের সুযোগ করে দেয়।"
                    }
                ]
            },
            expertise: {
                title: "আমাদের বিশেষত্ব",
                cards: [
                    {
                        title: "প্রযুক্তিনির্ভর সমাধান",
                        description: "আমরা কাস্টমারের প্রয়োজন বুঝে লেটেস্ট টেকনোলজি ব্যবহার করে ওয়েবসাইট ও অ্যাপ তৈরি করি।"
                    },
                    {
                        title: "সৃজনশীল ডিজাইন",
                        description: "আপনার ব্র্যান্ডের পরিচয় ফুটিয়ে তুলতে আমরা দিই আধুনিক গ্রাফিক্স ডিজাইন সেবা।"
                    },
                    {
                        title: "ডিজিটাল মার্কেটিং",
                        description: "সঠিক স্ট্র্যাটেজি ব্যবহারের মাধ্যমে আমরা যেকোনো ব্যবসাকে পৌঁছে দিই কাঙ্ক্ষিত লক্ষ্যে।"
                    }
                ]
            },
             future: {
                title: "আমাদের ভবিষ্যৎ পরিকল্পনা",
                description: "ভবিষ্যতে প্রচেষ্টা আইটি একটি পূর্ণাঙ্গ আইটি ট্রেনিং ইনস্টিটিউট হিসেবে নিজেকে প্রতিষ্ঠিত করতে বদ্ধপরিকর, যেন হাজার হাজার শিক্ষার্থী ঘরে বসেই আন্তর্জাতিক মানের দক্ষতা অর্জন করতে পারে।"
            },
            founder: {
                title: "ফাউন্ডার পরিচিতি",
                name: "তানবীর আহমেদ",
                role: "সফটওয়্যার ইঞ্জিনিয়ার ও প্রযুক্তি স্বপ্নদ্রষ্টা",
                bio1: "পন্ডিতস (Pondits) এবং ইমজল (Imjol)-এর মতো শীর্ষস্থানীয় সফটওয়্যার প্রতিষ্ঠানে গুরুত্বপূর্ণ ভূমিকা পালনের অভিজ্ঞতায় সমৃদ্ধ তানবীর আহমেদ সবসময় প্রযুক্তির মাধ্যমে শ্রেষ্ঠত্ব অর্জনে বিশ্বাসী। একজন সফটওয়্যার ইঞ্জিনিয়ার হিসেবে তিনি অসংখ্য আন্তর্জাতিক প্রজেক্টে কাজ করলেও, তার মূল লক্ষ্য ছিল নিজ এলাকার মেধাকে বৈশ্বিক মানে উন্নীত করা।",
                bio2: "একাডেমিক শিক্ষা এবং প্রফেশনাল ইন্ডাস্ট্রির চাহিদার মধ্যে যে বিশাল ব্যবধান রয়েছে, তা দূর করতেই তিনি প্রতিষ্ঠা করেন প্রচেষ্টা আইটি (Prochesta IT)। তার লক্ষ্য হলো \"প্রচেষ্টা\"কে \"দক্ষতা\"য় রূপান্তর করা। তিনি শুধু সফটওয়্যার তৈরি করতে চান না, বরং এমন এক দক্ষ জনবল তৈরি করতে চান যারা বাংলাদেশের ডিজিটাল ভবিষ্যতের নেতৃত্ব দেবে।"
            },
            cta: {
                title: "প্রযুক্তির সাথে এগিয়ে যান। প্রচেষ্টার যাত্রায় শামিল হোন।",
                subtitle: "হাজার হাজার সফল গ্র্যাজুয়েটদের সাথে যোগ দিন যারা আমাদের সাথে তাদের ক্যারিয়ার পরিবর্তন করেছেন।",
                button: "এখনই শুরু করুন"
            }
        }
    };

    const currentContent = isBn ? content.bn : content.en;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <GuestLayout>
            <Head title={isBn ? "আমাদের সম্পর্কে" : "About Us"} />

            <Breadcrumb 
                title={isBn ? "আমাদের সম্পর্কে" : "About Us"}
                items={[{ label: isBn ? "আমাদের সম্পর্কে" : "About Us" }]}
            />

            {/* Combined Intro & Vision Section */}
            <div className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-950 opacity-50 pointer-events-none" />
                <div className="container mx-auto px-6 relative">
                    {/* Welcome Text (Formerly Hero) */}
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold font-display text-white mb-6 leading-tight"
                        >
                            {currentContent.hero.title}
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-lg text-slate-300 leading-relaxed"
                        >
                            {currentContent.hero.subtitle}
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                           <div className="bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-700 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Sparkles className="w-32 h-32 text-purple-400" />
                                </div>
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">{currentContent.vision.title}</h2>
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    {currentContent.vision.description}
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {currentContent.vision.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                                <img 
                                    src="./assets/about-us.jpg" 
                                    alt="Team collaboration" 
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Unique Model Section */}
            <div className="py-24 bg-slate-950 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                        >
                            {currentContent.model.title}
                        </motion.h2>
                         <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-400"
                        >
                            {currentContent.model.subtitle}
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {currentContent.model.cards.map((card, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-colors hover:bg-slate-800"
                            >
                                <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                                    {index === 0 && <Target className="w-7 h-7" />}
                                    {index === 1 && <Users className="w-7 h-7" />}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {card.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Core Expertise Section */}
            <div className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-white"
                        >
                            {currentContent.expertise.title}
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {currentContent.expertise.cards.map((card, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all group hover:bg-slate-800/80"
                            >
                                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {index === 0 && <Award className="w-7 h-7" />}
                                    {index === 1 && <Sparkles className="w-7 h-7" />}
                                    {index === 2 && <Target className="w-7 h-7" />}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Founder Section */}
            <div className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
                    
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative order-2 lg:order-1"
                        >
                             <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                                    alt="Tanbir Ahmed" 
                                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 to-transparent">
                                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-2xl font-bold text-white mb-1">{currentContent.founder.name}</h3>
                                        <p className="text-indigo-400 font-medium">{currentContent.founder.role}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-12 h-1 bg-indigo-500 rounded-full"></span>
                                <span className="text-indigo-400 font-semibold tracking-wide uppercase text-sm">
                                    {currentContent.founder.title}
                                </span>
                            </div>
                            
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                                {isBn ? (
                                    <>
                                        প্রযুক্তির মাধ্যমে <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">শ্রেষ্ঠত্ব অর্জন</span>
                                    </>
                                ) : (
                                    <>
                                        Creating Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Through Technology</span>
                                    </>
                                )}
                            </h2>
                            
                            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                                <p className="p-6 bg-slate-900 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
                                    {currentContent.founder.bio1}
                                </p>
                                <p>
                                    {currentContent.founder.bio2}
                                </p>
                            </div>

                            <div className="mt-10 flex gap-4">
                                {/* Social links placeholder */}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* CTA Section */}
            <div className="py-24 bg-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            {currentContent.cta.title}
                        </h2>
                        <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
                            {currentContent.cta.subtitle}
                        </p>
                        <Link 
                            href="/register" 
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                        >
                            {currentContent.cta.button}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
