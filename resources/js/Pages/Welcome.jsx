import { Link, Head } from '@inertiajs/react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import clsx from 'clsx';
import { Code, TrendingUp, Palette, BarChart, Briefcase, Users, Calendar, Trophy, ArrowRight, Star, MapPin, Clock, Quote, CheckCircle2, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Bilingual Content ---
const translations = {
    en: {
        nav: {
            programs: "Programs",
            events: "Events",
            stories: "Stories",
            dashboard: "Dashboard",
            login: "Log in",
            signup: "Sign Up",
            getStarted: "Get Started"
        },
        hero: {
            badge: "New Seminars Added Weekly",
            titlePrefix: "Unlock Your",
            words: ["Creative Potential", "Future Career", "Hidden Talent"],
            subtext: "Join the premier platform for professional development. Master new skills through immersive, hands-on events and workshops.",
            ctaPrimary: "Browse Events",
            ctaSecondary: "Learn More"
        },
        about: {
            title: "Why Choose SeminarHub?",
            desc: "We curate experiences that go beyond traditional learning.",
            features: [
                { title: "World-Class Mentors", desc: "Learn from industry experts." },
                { title: "Hands-on Projects", desc: "Build a portfolio that stands out." },
                { title: "Global Community", desc: "Network with peers worldwide." },
            ]
        },
        events: {
            title: "Upcoming Events",
            subtitle: "Book your seat for the next big thing.",
            register: "Register Now",
            viewAll: "View All Events"
        },
        quotes: {
            title: "Daily Inspiration"
        },
        newsletter: {
            title: "Stay in the Loop",
            subtitle: "Subscribe for exclusive updates.",
            placeholder: "Enter your email",
            button: "Subscribe"
        }
    },
    bn: {
        nav: {
            programs: "প্রোগ্রামসমূহ",
            events: "ইভেন্টসমূহ",
            stories: "গল্প",
            dashboard: "ড্যাশবোর্ড",
            login: "লগ ইন",
            signup: "সাইন আপ",
            getStarted: "শুরু করুন"
        },
        hero: {
            badge: "প্রতি সপ্তাহে নতুন সেমিনার যোগ করা হয়",
            titlePrefix: "উন্মোচন করুন আপনার",
            words: ["সৃজনশীল সম্ভাবনা", "ভবিষ্যৎ ক্যারিয়ার", "সুপ্ত প্রতিভা"],
            subtext: "পেশাগত উন্নয়নের জন্য সেরা প্ল্যাটফর্মে যোগ দিন। হাতে-কলমে শিক্ষা এবং ওয়ার্কশপের মাধ্যমে নতুন দক্ষতা অর্জন করুন।",
            ctaPrimary: "ইভেন্ট দেখুন",
            ctaSecondary: "আরও জানুন"
        },
        about: {
            title: "কেন SeminarHub বেছে নেবেন?",
            desc: "আমরা এমন অভিজ্ঞতা তৈরি করি যা গতানুগতিক শিক্ষার বাইরে।",
            features: [
                { title: "বিশ্বমানের মেন্টর", desc: "ইন্ডাস্ট্রি বিশেষজ্ঞদের কাছ থেকে শিখুন।" },
                { title: "হাতে-কলমে প্রজেক্ট", desc: "এমন পোর্টফোলিও তৈরি করুন যা আপনাকে আলাদা করবে।" },
                { title: "গ্লোবাল কমিউনিটি", desc: "বিশ্বব্যাপী সমমনাদের সাথে নেটওয়ার্কিং করুন।" },
            ]
        },
        events: {
            title: "আসন্ন ইভেন্টসমূহ",
            subtitle: "পরবর্তী বড় ইভেন্টের জন্য আপনার সিট বুক করুন।",
            register: "রেজিস্ট্রেশন করুন",
            viewAll: "সব ইভেন্ট দেখুন"
        },
        quotes: {
            title: "প্রতিদিনের অনুপ্রেরণা"
        },
        newsletter: {
            title: "আপডেট থাকুন",
            subtitle: "এক্সক্লুসিভ আপডেটের জন্য সাবস্ক্রাইব করুন।",
            placeholder: "আপনার ইমেইল দিন",
            button: "সাবস্ক্রাইব"
        }
    }
};

const quotesData = [
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
];

export default function Welcome({ auth, upcomingEvents, canLogin, canRegister, frontendSections = {} }) {
    const [lang, setLang] = useState('en');

    // Helper to merge DB content with defaults safely
    const getContent = (sectionKey, defaultContent) => {
        if (frontendSections[sectionKey] && frontendSections[sectionKey].content && frontendSections[sectionKey].content[lang]) {
            // Deep merge could be better, but for now simple override or spread
            // If the structure matches exactly, we can use it.
            return { ...defaultContent, ...frontendSections[sectionKey].content[lang] };
        }
        return defaultContent;
    };

    // Construct the 't' object dynamically
    const t = {
        nav: translations[lang].nav, // Nav usually static or separate section
        hero: getContent('hero', translations[lang].hero),
        about: getContent('about', translations[lang].about),
        events: getContent('events', translations[lang].events),
        quotes: getContent('quotes', translations[lang].quotes), // Quotes title
        newsletter: getContent('newsletter', translations[lang].newsletter),
        programs: getContent('programs', { title: "Featured Tracks", subtitle: "Choose a learning path..." }) // Fallback for new section
    };

    const isBn = lang === 'bn';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Hero Word Rotate
    const [wordIndex, setWordIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % t.hero.words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [lang]);

    return (
        <div className={clsx("bg-slate-950 text-slate-200 selection:bg-indigo-500 selection:text-white overflow-x-hidden", isBn ? 'font-bengali' : 'font-sans')}>
            <Head title={`Seminar Hub - ${isBn ? 'স্বাগতম' : 'Welcome'}`} />

            {/* Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100]" style={{ scaleX }} />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 py-4 px-6 lg:px-12 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">S</div>
                    <div className="text-xl font-bold font-display tracking-tight text-white">
                        Seminar<span className="text-indigo-400">Hub</span>
                    </div>
                </div>
                
                <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
                    <a href="#about" className="hover:text-white transition">{t.nav.programs}</a>
                    <a href="#events" className="hover:text-white transition">{t.nav.events}</a>
                    <button 
                        onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition border border-white/10"
                    >
                        <Globe size={14} />
                        <span className="uppercase">{lang}</span>
                    </button>
                </div>

                <div className="flex gap-4 items-center">
                    {auth.user ? (
                         <Link href={route('admin.dashboard')} className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 text-white font-medium transition">{t.nav.dashboard}</Link>
                    ) : (
                        <div className="flex gap-3">
                            {canLogin && <Link href={route('login')} className="px-4 py-2 text-white/80 hover:text-white font-medium transition hidden sm:block">{t.nav.login}</Link>}
                            {canRegister && <Link href={route('register')} className="px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">{t.nav.signup}</Link>}
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Animated Background */}
                {/* Hero Background Slider */}
                <div className="absolute inset-0 z-0">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full w-full"
                    >
                        {[
                            "https://images.unsplash.com/photo-1540575467063-17e6fc8c62d8?auto=format&fit=crop&q=80&w=2000", // Conference
                            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000", // Networking
                            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000", // Tech/Future
                        ].map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="absolute inset-0 bg-slate-950/60 z-10 transition duration-500"></div> {/* Overlay */}
                                <motion.img 
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 8, ease: "linear" }}
                                    src={img} 
                                    className="w-full h-full object-cover"
                                    alt="Hero Background"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20 pointer-events-none"></div>
                </div>

                <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-8">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-sm font-medium text-indigo-300">{t.hero.badge}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white mb-6 leading-[1.1]">
                            {t.hero.titlePrefix} <br/>
                            <div className="h-[1.2em] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.span 
                                        key={wordIndex}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                                    >
                                        {t.hero.words[wordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t.hero.subtext}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                             <a href="#events" className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/20">
                                {t.hero.ctaPrimary}
                            </a>
                            <button className="px-8 py-4 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition">
                                {t.hero.ctaSecondary}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Motivational Quotes Slider */}
            <section className="py-24 bg-indigo-950 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                         <div className="inline-block p-3 bg-indigo-400/10 rounded-full mb-4">
                            <Quote className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h2 className="text-sm font-bold tracking-widest text-indigo-300 uppercase">{t.quotes.title}</h2>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{ delay: 5000 }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {quotesData.map((quote, idx) => (
                            <SwiperSlide key={idx} className="pb-12">
                                <blockquote className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-8">
                                    "{quote.text}"
                                </blockquote>
                                <cite className="text-indigo-300 font-bold not-italic tracking-widest uppercase">— {quote.author}</cite>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

             {/* Events Sections (Alternating Layouts) */}
            <section id="events" className="py-24 bg-slate-950 relative">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                 
                 <div className="container mx-auto px-6 mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">{t.events.title}</h2>
                    <p className="text-slate-400 text-xl">{t.events.subtitle}</p>
                 </div>

                <div className="container mx-auto px-6 space-y-32">
                    {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            key={event.id} 
                            className={clsx(
                                "flex flex-col gap-12 items-center",
                                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                            )}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 relative group">
                                <div className={clsx(
                                    "absolute inset-0 bg-gradient-to-r rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-700",
                                    index % 2 === 0 ? "from-indigo-600 to-purple-600" : "from-pink-600 to-rose-600"
                                )}></div>
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] group-hover:scale-[1.02] transition duration-500">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${event.title}&background=random&size=800`}
                                        // onError={(e) => e.target.src = "https://images.unsplash.com/photo-1540575467063-17e6fc8c62d8?auto=format&fit=crop&q=80&w=1000"}
                                        alt={event.title} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-center min-w-[80px]">
                                        <div className="text-xl font-bold leading-none">{new Date(event.start_date).getDate()}</div>
                                        <div className="text-xs uppercase font-medium">{new Date(event.start_date).toLocaleString('default', { month: 'short' })}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 lg:px-6">
                                <div className="flex items-center gap-3 text-indigo-400 font-bold mb-4 tracking-wider uppercase text-sm">
                                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                        <Calendar size={14} /> {new Date(event.start_date).toLocaleDateString()}
                                    </span>
                                    {event.venue && (
                                         <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
                                            <MapPin size={14} /> {event.venue}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
                                    {event.title}
                                </h3>
                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                    {event.description || "Join us for an immersive experience designed to elevate your skills and network. This event features expert speakers, hands-on workshops, and unparalleled networking opportunities."}
                                </p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300">Expert-led sessions with industry leaders.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300">Interactive Q&A and networking sessions.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300">Certificate of completion included.</span>
                                    </div>
                                </div>

                                <Link 
                                    href={route('events.register', event.slug)}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-xl group"
                                >
                                    {t.events.register} <ArrowRight className="group-hover:translate-x-1 transition" />
                                </Link>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <p className="text-slate-500 text-xl">No upcoming events scheduled explicitly.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
             <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                         <div>
                            <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-8">{t.about.title}</h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                {t.about.desc}
                            </p>
                            <div className="space-y-8">
                                {t.about.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                                            <Trophy size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                            <p className="text-slate-400">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                                alt="Team" 
                                className="relative rounded-2xl shadow-2xl border border-white/10 rotate-2 hover:rotate-0 transition duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Dynamic Programs Section (Restored) */}
             <section id="programs" className="py-24 bg-slate-950 relative">
                 <div className="container mx-auto px-6 text-center mb-16">
                    <h2 className="text-4xl font-bold font-display text-white mb-4">
                        {lang === 'bn' ? 'আমাদের প্রোগ্রামসমূহ' : 'Featured Tracks'}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {lang === 'bn' ? 'আপনার ক্যারিয়ারের লক্ষ্য পূরণের জন্য একটি পথ বেছে নিন।' : 'Choose a learning path that suits your career goals.'}
                    </p>
                </div>
                
                <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                     {[
                        { title: "Web Development", icon: Code, image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800", desc: "Master Full Stack Development with modern frameworks." },
                        { title: "Digital Marketing", icon: TrendingUp, image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800", desc: "Growth Strategies, SEO, and Social Media mastery." },
                        { title: "UI/UX Design", icon: Palette, image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=800", desc: "Create stunning, user-centric digital experiences." },
                     ].map((prog, i) => (
                        <div key={i} className="relative group overflow-hidden rounded-3xl h-96 border border-white/10 hover:border-indigo-500/50 transition duration-500">
                            <img src={prog.image} alt={prog.title} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900 opacity-90 transition duration-300 group-hover:opacity-80"></div>
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-white group-hover:bg-indigo-600 transition duration-300">
                                    <prog.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{prog.title}</h3>
                                <p className="text-slate-300 text-sm mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 delay-100">
                                    {prog.desc}
                                </p>
                                <a href="#" className="inline-flex items-center gap-2 text-white font-bold border-b border-white/30 pb-1 hover:border-white transition">
                                    {lang === 'bn' ? 'শুরু করুন' : 'Start Learning'} <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                     ))}
                </div>
            </section>

             {/* Gallery / Moments Section */}
             <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl font-bold font-display text-white mb-4">
                        {lang === 'bn' ? 'আমাদের মুহূর্তগুলো' : 'Captured Moments'}
                    </h2>
                    <p className="text-slate-400">
                        {lang === 'bn' ? 'আমাদের ইভেন্টের কিছু ঝলক।' : 'Glimpses from our recent events.'}
                    </p>
                </div>
                
                {/* Marquee Gallery */}
                <div className="flex gap-6 overflow-hidden relative opacity-60 hover:opacity-100 transition duration-500">
                     <motion.div 
                        className="flex gap-6 min-w-full"
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                     >
                        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, idx) => (
                            <div key={idx} className="w-80 h-56 flex-shrink-0 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition duration-500 relative">
                                <img 
                                    src={`https://images.unsplash.com/photo-${[
                                        '1540575467063-17e6fc8c62d8', 
                                        '1515187029135-18ee286d815b', 
                                        '1591115763816-cbd48e5e9b18',
                                        '1505373872341-3d520630584b',
                                        '1523580494863-6f3031224c94'
                                    ][item - 1]}?auto=format&fit=crop&q=80&w=600`} 
                                    alt="Gallery" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                     </motion.div>
                </div>
             </section>

             {/* Footer */}
            <footer className="bg-slate-950 pt-16 pb-8 border-t border-white/5">
                <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-2xl font-bold font-display text-white tracking-tight mb-6">
                            Seminar<span className="text-indigo-500">Hub</span>
                        </div>
                        <p className="text-slate-500 max-w-sm">
                            Building a community of lifelong learners and industry leaders. Join us to reshape your future.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition">All Events</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Mentors</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
                    &copy; 2026 SeminarHub.
                </div>
            </footer>
        </div>
    );
}
