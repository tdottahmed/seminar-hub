import { Link, Head } from "@inertiajs/react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import clsx from "clsx";
import {
    Code,
    TrendingUp,
    Palette,
    BarChart,
    Briefcase,
    Users,
    Calendar,
    Trophy,
    ArrowRight,
    Star,
    MapPin,
    Clock,
    Quote,
    CheckCircle2,
    Globe,
    Crown,
    Linkedin,
    Twitter,
    ExternalLink,
    Image,
    BookOpen,
    Target,
    Award,
    Sparkles,
    Heart,
    MessageSquare,
    Zap,
    Mail,
    Phone,
    Facebook,
    Instagram,
    Youtube,
    ChevronRight,
    ArrowUpRight,
    Shield,
    Check,
} from "lucide-react";
import { useState, useEffect } from "react";

// Custom icons for How It Works
const SearchIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const UserPlusIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <line x1="19" y1="8" x2="19" y2="14"></line>
        <line x1="16" y1="11" x2="22" y2="11"></line>
    </svg>
);

// --- Bilingual Content ---
const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            programs: "Programs",
            events: "Events",
            team: "Team",
            gallery: "Gallery",
            testimonials: "Testimonials",
            contact: "Contact",
            dashboard: "Dashboard",
            login: "Log in",
            signup: "Sign Up",
            getStarted: "Get Started",
        },
        hero: {
            badge: "New Seminars Added Weekly",
            titlePrefix: "Unlock Your",
            words: ["Creative Potential", "Future Career", "Hidden Talent", "Digital Success"],
            subtext: "Join the premier platform for professional development. Master new skills through immersive, hands-on events and workshops.",
            ctaPrimary: "Browse Events",
            ctaSecondary: "Learn More",
        },
        trustedBy: {
            title: "Trusted By Leading Organizations",
            subtitle: "Partnering with industry leaders to deliver exceptional learning experiences",
        },
        stats: {
            title: "Our Impact",
            stats: [
                { number: "500+", label: "Events Hosted", icon: Calendar },
                { number: "10K+", label: "Participants", icon: Users },
                { number: "50+", label: "Expert Mentors", icon: Award },
                { number: "95%", label: "Satisfaction Rate", icon: Star },
            ],
        },
        about: {
            title: "Why Choose SeminarHub?",
            desc: "We curate experiences that go beyond traditional learning. Join thousands who have transformed their careers with us.",
            features: [
                {
                    title: "World-Class Mentors",
                    desc: "Learn from industry experts with real-world experience.",
                    icon: Crown,
                },
                {
                    title: "Hands-on Projects",
                    desc: "Build a portfolio that stands out in the competitive market.",
                    icon: Briefcase,
                },
                {
                    title: "Global Community",
                    desc: "Network with peers worldwide and expand your connections.",
                    icon: Globe,
                },
                {
                    title: "Career Support",
                    desc: "Get personalized career guidance and job placement assistance.",
                    icon: Target,
                },
            ],
        },
        events: {
            title: "Upcoming Events",
            subtitle: "Book your seat for the next big thing in professional development.",
            register: "Register Now",
            viewAll: "View All Events",
            viewDetails: "View Details",
            free: "Free",
            paid: "Paid",
            seatsLeft: "Seats Left",
            date: "Date",
            venue: "Venue",
            time: "Time",
            category: "Category",
        },
        testimonials: {
            title: "What Our Participants Say",
            subtitle: "Real stories from real people who transformed their careers",
        },
        programs: {
            title: "Featured Learning Paths",
            subtitle: "Choose a learning path that suits your career goals and interests",
            viewAll: "View All Programs",
            categories: [
                {
                    title: "Technology & Development",
                    icon: Code,
                    desc: "Master modern tech stacks and development methodologies",
                    color: "from-blue-500 to-cyan-500",
                    count: "12 Programs",
                },
                {
                    title: "Digital Marketing",
                    icon: TrendingUp,
                    desc: "Learn growth strategies, SEO, and social media mastery",
                    color: "from-green-500 to-emerald-500",
                    count: "8 Programs",
                },
                {
                    title: "Design & Creativity",
                    icon: Palette,
                    desc: "Create stunning, user-centric digital experiences",
                    color: "from-purple-500 to-pink-500",
                    count: "10 Programs",
                },
                {
                    title: "Business & Leadership",
                    icon: BarChart,
                    desc: "Develop leadership skills and business acumen",
                    color: "from-orange-500 to-red-500",
                    count: "6 Programs",
                },
            ],
        },
        howItWorks: {
            title: "How It Works",
            subtitle: "Simple steps to start your learning journey",
            steps: [
                {
                    number: "01",
                    title: "Explore Programs",
                    desc: "Browse through our curated collection of events and programs",
                    icon: SearchIcon,
                },
                {
                    number: "02",
                    title: "Register & Enroll",
                    desc: "Secure your spot with easy registration process",
                    icon: UserPlusIcon,
                },
                {
                    number: "03",
                    title: "Learn & Network",
                    desc: "Attend sessions, connect with peers and mentors",
                    icon: Users,
                },
                {
                    number: "04",
                    title: "Get Certified",
                    desc: "Receive certification and career support",
                    icon: Award,
                },
            ],
        },
        team: {
            title: "Meet Our Team",
            subtitle: "The passionate professionals behind SeminarHub",
            viewDetails: "View Profile",
            teamLead: "Team Lead",
            members: "Team Members",
        },
        gallery: {
            title: "Captured Moments",
            subtitle: "Glimpses from our recent events and workshops",
            viewAll: "View All Photos",
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Find answers to common questions about our platform",
            items: [
                {
                    question: "How do I register for an event?",
                    answer: "Simply browse our events, select one that interests you, and click the 'Register Now' button. Follow the registration process to secure your spot.",
                },
                {
                    question: "Are the events free or paid?",
                    answer: "We offer both free and paid events. You can filter events by type on our events page. All paid events offer certificates and additional resources.",
                },
                {
                    question: "Can I get a certificate?",
                    answer: "Yes, most of our events provide certificates of completion. Paid events always include certificates, while some free events may offer them based on participation.",
                },
                {
                    question: "Do you offer career support?",
                    answer: "Absolutely! We provide career guidance, resume reviews, and job placement assistance for participants who complete our premium programs.",
                },
            ],
        },
        cta: {
            title: "Ready to Transform Your Career?",
            subtitle: "Join thousands of successful professionals today",
            button: "Get Started Free",
            secondary: "Contact Sales",
        },
        newsletter: {
            title: "Stay Updated",
            subtitle: "Subscribe to our newsletter for exclusive updates and early access",
            placeholder: "Enter your email address",
            button: "Subscribe",
            privacy: "We respect your privacy. Unsubscribe at any time.",
        },
        footer: {
            description: "Building a community of lifelong learners and industry leaders. Join us to reshape your future.",
            quickLinks: "Quick Links",
            programs: "Programs",
            events: "Events",
            mentors: "Mentors",
            pricing: "Pricing",
            company: "Company",
            about: "About Us",
            careers: "Careers",
            blog: "Blog",
            press: "Press",
            support: "Support",
            help: "Help Center",
            contact: "Contact Us",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            copyright: "All rights reserved",
            followUs: "Follow Us",
        },
    },
    bn: {
        nav: {
            home: "হোম",
            about: "আমাদের সম্পর্কে",
            programs: "প্রোগ্রামসমূহ",
            events: "ইভেন্টসমূহ",
            team: "টিম",
            gallery: "গ্যালারি",
            testimonials: "পর্যালোচনা",
            contact: "যোগাযোগ",
            dashboard: "ড্যাশবোর্ড",
            login: "লগ ইন",
            signup: "সাইন আপ",
            getStarted: "শুরু করুন",
        },
        hero: {
            badge: "প্রতি সপ্তাহে নতুন সেমিনার যোগ করা হয়",
            titlePrefix: "উন্মোচন করুন আপনার",
            words: ["সৃজনশীল সম্ভাবনা", "ভবিষ্যৎ ক্যারিয়ার", "সুপ্ত প্রতিভা", "ডিজিটাল সাফল্য"],
            subtext: "পেশাগত উন্নয়নের জন্য সেরা প্ল্যাটফর্মে যোগ দিন। হাতে-কলমে শিক্ষা এবং ওয়ার্কশপের মাধ্যমে নতুন দক্ষতা অর্জন করুন।",
            ctaPrimary: "ইভেন্ট দেখুন",
            ctaSecondary: "আরও জানুন",
        },
        trustedBy: {
            title: "শীর্ষ সংস্থাগুলোর আস্থাভাজন",
            subtitle: "অসাধারণ শিক্ষার অভিজ্ঞতা প্রদানের জন্য শিল্প নেতাদের সাথে অংশীদারিত্ব",
        },
        stats: {
            title: "আমাদের প্রভাব",
            stats: [
                { number: "৫০০+", label: "আয়োজিত ইভেন্ট", icon: Calendar },
                { number: "১০হাজার+", label: "অংশগ্রহণকারী", icon: Users },
                { number: "৫০+", label: "বিশেষজ্ঞ পরামর্শদাতা", icon: Award },
                { number: "৯৫%", label: "সন্তুষ্টির হার", icon: Star },
            ],
        },
        about: {
            title: "কেন SeminarHub বেছে নেবেন?",
            desc: "আমরা এমন অভিজ্ঞতা তৈরি করি যা গতানুগতিক শিক্ষার বাইরে। আমাদের সাথে ক্যারিয়ার পরিবর্তনকারী হাজার হাজার মানুষের সাথে যোগ দিন।",
            features: [
                {
                    title: "বিশ্বমানের মেন্টর",
                    desc: "বাস্তব অভিজ্ঞতাসম্পন্ন শিল্প বিশেষজ্ঞদের কাছ থেকে শিখুন।",
                    icon: Crown,
                },
                {
                    title: "হাতে-কলমে প্রজেক্ট",
                    desc: "প্রতিযোগিতামূলক বাজারে আলাদা করে এমন পোর্টফোলিও তৈরি করুন।",
                    icon: Briefcase,
                },
                {
                    title: "বৈশ্বিক সম্প্রদায়",
                    desc: "বিশ্বব্যাপী সমমনাদের সাথে নেটওয়ার্কিং করুন এবং আপনার সংযোগ প্রসারিত করুন।",
                    icon: Globe,
                },
                {
                    title: "ক্যারিয়ার সহায়তা",
                    desc: "ব্যক্তিগতকৃত ক্যারিয়ার নির্দেশনা এবং চাকরি প্লেসমেন্ট সহায়তা পান।",
                    icon: Target,
                },
            ],
        },
        events: {
            title: "আসন্ন ইভেন্টসমূহ",
            subtitle: "পেশাগত উন্নয়নের জন্য পরবর্তী বড় ইভেন্টের জন্য আপনার সিট বুক করুন।",
            register: "রেজিস্ট্রেশন করুন",
            viewAll: "সব ইভেন্ট দেখুন",
            viewDetails: "বিস্তারিত দেখুন",
            free: "ফ্রি",
            paid: "পেইড",
            seatsLeft: "আসন বাকি",
            date: "তারিখ",
            venue: "ভেন্যু",
            time: "সময়",
            category: "বিভাগ",
        },
        testimonials: {
            title: "আমাদের অংশগ্রহণকারীদের মতামত",
            subtitle: "যারা তাদের ক্যারিয়ার পরিবর্তন করেছেন তাদের বাস্তব গল্প",
        },
        programs: {
            title: "বিশেষ শিক্ষার পথ",
            subtitle: "আপনার ক্যারিয়ারের লক্ষ্য এবং আগ্রহ অনুযায়ী একটি শিক্ষার পথ বেছে নিন",
            viewAll: "সব প্রোগ্রাম দেখুন",
            categories: [
                {
                    title: "প্রযুক্তি ও ডেভেলপমেন্ট",
                    icon: Code,
                    desc: "আধুনিক টেক স্ট্যাক এবং উন্নয়ন পদ্ধতি আয়ত্ত করুন",
                    color: "from-blue-500 to-cyan-500",
                    count: "১২টি প্রোগ্রাম",
                },
                {
                    title: "ডিজিটাল মার্কেটিং",
                    icon: TrendingUp,
                    desc: "গ্রোথ কৌশল, এসইও এবং সোশ্যাল মিডিয়া মাস্টারি শিখুন",
                    color: "from-green-500 to-emerald-500",
                    count: "৮টি প্রোগ্রাম",
                },
                {
                    title: "ডিজাইন ও সৃজনশীলতা",
                    icon: Palette,
                    desc: "আকর্ষণীয়, ব্যবহারকারী-কেন্দ্রিক ডিজিটাল অভিজ্ঞতা তৈরি করুন",
                    color: "from-purple-500 to-pink-500",
                    count: "১০টি প্রগ্রাম",
                },
                {
                    title: "ব্যবসা ও নেতৃত্ব",
                    icon: BarChart,
                    desc: "নেতৃত্ব দক্ষতা এবং ব্যবসায়িক বুদ্ধিমত্তা বিকাশ করুন",
                    color: "from-orange-500 to-red-500",
                    count: "৬টি প্রগ্রাম",
                },
            ],
        },
        howItWorks: {
            title: "কিভাবে কাজ করে",
            subtitle: "আপনার শিক্ষার যাত্রা শুরু করার সহজ পদক্ষেপ",
            steps: [
                {
                    number: "০১",
                    title: "প্রোগ্রাম এক্সপ্লোর করুন",
                    desc: "আমাদের নির্বাচিত ইভেন্ট এবং প্রোগ্রামের সংগ্রহ ব্রাউজ করুন",
                    icon: SearchIcon,
                },
                {
                    number: "০২",
                    title: "নিবন্ধন করুন",
                    desc: "সহজ নিবন্ধন প্রক্রিয়ার মাধ্যমে আপনার স্থান সুরক্ষিত করুন",
                    icon: UserPlusIcon,
                },
                {
                    number: "০৩",
                    title: "শিখুন ও নেটওয়ার্ক করুন",
                    desc: "সেশনে অংশ নিন, সহকর্মী এবং পরামর্শদাতাদের সাথে সংযোগ স্থাপন করুন",
                    icon: Users,
                },
                {
                    number: "০৪",
                    title: "সার্টিফিকেট পান",
                    desc: "সার্টিফিকেশন এবং ক্যারিয়ার সহায়তা পান",
                    icon: Award,
                },
            ],
        },
        team: {
            title: "আমাদের টিমের সাথে পরিচিত হোন",
            subtitle: "SeminarHub এর পেছনের উদ্যমী পেশাদাররা",
            viewDetails: "প্রোফাইল দেখুন",
            teamLead: "টিম লিড",
            members: "টিম সদস্য",
        },
        gallery: {
            title: "ধরা পড়া মুহূর্ত",
            subtitle: "আমাদের সাম্প্রতিক ইভেন্ট এবং কর্মশালার ঝলক",
            viewAll: "সব ছবি দেখুন",
        },
        faq: {
            title: "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
            subtitle: "আমাদের প্ল্যাটফর্ম সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন",
            items: [
                {
                    question: "কিভাবে আমি একটি ইভেন্টের জন্য নিবন্ধন করব?",
                    answer: "আমাদের ইভেন্ট ব্রাউজ করুন, আপনার আগ্রহের একটি নির্বাচন করুন এবং 'নিবন্ধন করুন' বাটনে ক্লিক করুন। আপনার স্থান সুরক্ষিত করতে নিবন্ধন প্রক্রিয়া অনুসরণ করুন।",
                },
                {
                    question: "ইভেন্টগুলি বিনামূল্যে না পেইড?",
                    answer: "আমরা ফ্রি এবং পেইড উভয় ধরনের ইভেন্ট অফার করি। আপনি আমাদের ইভেন্ট পৃষ্ঠায় টাইপ অনুসারে ফিল্টার করতে পারেন। সমস্ত পেইড ইভেন্ট সার্টিফিকেট এবং অতিরিক্ত সংস্থান প্রদান করে।",
                },
                {
                    question: "আমি কি সার্টিফিকেট পেতে পারি?",
                    answer: "হ্যাঁ, আমাদের বেশিরভাগ ইভেন্ট সমাপ্তির সার্টিফিকেট প্রদান করে। পেইড ইভেন্টগুলি সর্বদা সার্টিফিকেট অন্তর্ভুক্ত করে, যখন কিছু ফ্রি ইভেন্ট অংশগ্রহণের ভিত্তিতে সরবরাহ করতে পারে।",
                },
                {
                    question: "আপনারা কি ক্যারিয়ার সহায়তা প্রদান করেন?",
                    answer: "অবশ্যই! আমাদের প্রিমিয়াম প্রোগ্রাম সম্পন্ন করা অংশগ্রহণকারীদের জন্য আমরা ক্যারিয়ার নির্দেশনা, রিজিউ পর্যালোচনা এবং চাকরি প্লেসমেন্ট সহায়তা প্রদান করি।",
                },
            ],
        },
        cta: {
            title: "আপনার ক্যারিয়ার পরিবর্তন করার জন্য প্রস্তুত?",
            subtitle: "আজই হাজার হাজার সফল পেশাদারের সাথে যোগ দিন",
            button: "বিনামূল্যে শুরু করুন",
            secondary: "সেলসের সাথে যোগাযোগ করুন",
        },
        newsletter: {
            title: "আপডেট থাকুন",
            subtitle: "এক্সক্লুসিভ আপডেট এবং প্রাথমিক অ্যাক্সেসের জন্য আমাদের নিউজলেটার সাবস্ক্রাইব করুন",
            placeholder: "আপনার ইমেইল ঠিকানা লিখুন",
            button: "সাবস্ক্রাইব",
            privacy: "আমরা আপনার গোপনীয়তা সম্মান করি। যে কোনো সময় আনসাবস্ক্রাইব করুন।",
        },
        footer: {
            description: "জীবনব্যাপী শিক্ষার্থী এবং শিল্প নেতাদের সম্প্রদায় গড়ে তোলা। আপনার ভবিষ্যৎ পুনর্নির্মাণ করতে আমাদের সাথে যোগ দিন।",
            quickLinks: "দ্রুত লিংক",
            programs: "প্রোগ্রামসমূহ",
            events: "ইভেন্টসমূহ",
            mentors: "পরামর্শদাতা",
            pricing: "মূল্য নির্ধারণ",
            company: "কোম্পানি",
            about: "আমাদের সম্পর্কে",
            careers: "ক্যারিয়ার",
            blog: "ব্লগ",
            press: "প্রেস",
            support: "সহায়তা",
            help: "সহায়তা কেন্দ্র",
            contact: "যোগাযোগ করুন",
            privacy: "গোপনীয়তা নীতি",
            terms: "সেবার শর্তাবলী",
            copyright: "সমস্ত অধিকার সংরক্ষিত",
            followUs: "আমাদের অনুসরণ করুন",
        },
    },
};

const quotesData = [
    {
        text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
        author: "Malcolm X",
        role: "Human Rights Activist",
    },
    {
        text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi",
        role: "Leader & Philosopher",
    },
    {
        text: "The expert in anything was once a beginner.",
        author: "Helen Hayes",
        role: "Actress",
    },
];

// Static hero images that won't change from database
const staticHeroImages = [
    "https://images.unsplash.com/photo-1540575467063-17e6fc8c62d8?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
];

// Trusted companies logos
const trustedCompanies = [
    { name: "Google", logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg" },
    { name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
    { name: "Amazon", logo: "https://cdn.worldvectorlogo.com/logos/amazon-2.svg" },
    { name: "Adobe", logo: "https://cdn.worldvectorlogo.com/logos/adobe-creative-cloud-cc.svg" },
    { name: "IBM", logo: "https://cdn.worldvectorlogo.com/logos/ibm-logo.svg" },
    { name: "Meta", logo: "https://cdn.worldvectorlogo.com/logos/meta-1.svg" },
];

// Testimonials data
const testimonialsData = [
    {
        name: "Sarah Johnson",
        role: "Web Developer",
        company: "TechCorp",
        content: "SeminarHub transformed my career. The hands-on workshops gave me the confidence to switch to a senior developer role.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=200",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Marketing Manager",
        company: "Digital Solutions",
        content: "The networking opportunities alone are worth it. I've made connections that led to three major projects.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        role: "UI/UX Designer",
        company: "Creative Minds",
        content: "As a designer, the creative workshops expanded my perspective and improved my design thinking process significantly.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        rating: 4,
    },
    {
        name: "David Wilson",
        role: "Business Analyst",
        company: "Enterprise Corp",
        content: "The practical approach to learning helped me implement strategies that increased our team's efficiency by 40%.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        rating: 5,
    },
];

// Gallery static images (if no galleryItems from database)
const galleryStaticImages = [
    "https://images.unsplash.com/photo-1540575467063-17e6fc8c62d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w-800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=800",
];

// Team static members (if no teamMembers from database)
const staticTeamMembers = [
    {
        id: 1,
        name: "Alex Johnson",
        designation: "CEO & Founder",
        organization: "TechVision Inc.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 2,
        name: "Maria Garcia",
        designation: "Head of Learning",
        organization: "Education First",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 3,
        name: "David Kim",
        designation: "Technical Director",
        organization: "CodeMasters",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 4,
        name: "Sarah Williams",
        designation: "Marketing Lead",
        organization: "Growth Hackers",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    },
];

export default function Welcome({
    auth,
    upcomingEvents = [],
    teamLead,
    teamMembers = [],
    galleryItems = [],
    canLogin,
    canRegister,
    frontendSections = {},
}) {
    const [lang, setLang] = useState("en");
    const [activeFAQ, setActiveFAQ] = useState(null);

    // Helper to merge DB content with defaults safely
    const getContent = (sectionKey, defaultContent) => {
        if (
            frontendSections[sectionKey] &&
            frontendSections[sectionKey].content &&
            frontendSections[sectionKey].content[lang]
        ) {
            return {
                ...defaultContent,
                ...frontendSections[sectionKey].content[lang],
            };
        }
        return defaultContent;
    };

    // Construct the 't' object dynamically
    const t = {
        nav: translations[lang].nav,
        hero: getContent("hero", translations[lang].hero),
        trustedBy: getContent("trustedBy", translations[lang].trustedBy),
        stats: getContent("stats", translations[lang].stats),
        about: getContent("about", translations[lang].about),
        events: getContent("events", translations[lang].events),
        testimonials: getContent("testimonials", translations[lang].testimonials),
        programs: getContent("programs", translations[lang].programs),
        howItWorks: getContent("howItWorks", translations[lang].howItWorks),
        team: getContent("team", translations[lang].team),
        gallery: getContent("gallery", translations[lang].gallery),
        faq: getContent("faq", translations[lang].faq),
        cta: getContent("cta", translations[lang].cta),
        newsletter: getContent("newsletter", translations[lang].newsletter),
        footer: getContent("footer", translations[lang].footer),
        quotes: { title: lang === "en" ? "Daily Inspiration" : "প্রতিদিনের অনুপ্রেরণা" },
    };

    const isBn = lang === "bn";
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Hero Word Rotate
    const [wordIndex, setWordIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % t.hero.words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [lang, t.hero.words.length]);

    // Use static data if no data from database
    const displayTeamMembers = teamMembers.length > 0 ? teamMembers : staticTeamMembers;
    const displayGalleryItems = galleryItems.length > 0 ? galleryItems : galleryStaticImages.map((img, idx) => ({
        id: idx + 1,
        image: img,
        title: `Event ${idx + 1}`,
        category: "Workshop"
    }));

    return (
        <div
            className={clsx(
                "bg-slate-950 text-slate-200 selection:bg-indigo-500 selection:text-white overflow-x-hidden",
                isBn ? "font-bengali" : "font-sans"
            )}
        >
            <Head title={`Seminar Hub - ${isBn ? "স্বাগতম" : "Welcome"}`} />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 py-4 px-6 lg:px-12 flex justify-between items-center bg-slate-950/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                        <Sparkles size={20} />
                    </div>
                    <div className="text-2xl font-bold font-display tracking-tight text-white">
                        Seminar<span className="text-indigo-400">Hub</span>
                    </div>
                </div>

                <div className="hidden lg:flex gap-8 items-center text-sm font-medium text-slate-300">
                    <a href="#home" className="hover:text-white transition hover:scale-105">{t.nav.home}</a>
                    <a href="#about" className="hover:text-white transition hover:scale-105">{t.nav.about}</a>
                    <a href="#programs" className="hover:text-white transition hover:scale-105">{t.nav.programs}</a>
                    <a href="#events" className="hover:text-white transition hover:scale-105">{t.nav.events}</a>
                    <a href="#team" className="hover:text-white transition hover:scale-105">{t.nav.team}</a>
                    <a href="#gallery" className="hover:text-white transition hover:scale-105">{t.nav.gallery}</a>
                    <a href="#testimonials" className="hover:text-white transition hover:scale-105">{t.nav.testimonials}</a>
                    <button
                        onClick={() => setLang(lang === "en" ? "bn" : "en")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20 hover:border-white/30"
                    >
                        <Globe size={14} />
                        <span className="uppercase text-xs font-bold">{lang}</span>
                    </button>
                </div>

                <div className="flex gap-4 items-center">
                    {auth?.user ? (
                        <Link
                            href={route("admin.dashboard")}
                            className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium transition hover:shadow-lg hover:shadow-white/10"
                        >
                            {t.nav.dashboard}
                        </Link>
                    ) : (
                        <div className="flex gap-3">
                            {canLogin && (
                                <Link
                                    href={route("login")}
                                    className="px-4 py-2 text-white/80 hover:text-white font-medium transition hidden sm:block hover:scale-105"
                                >
                                    {t.nav.login}
                                </Link>
                            )}
                            {canRegister && (
                                <Link
                                    href={route("register")}
                                    className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-700 hover:to-purple-700 transition transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30"
                                >
                                    {t.nav.signup}
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Static Hero Background Slider */}
                <div className="absolute inset-0 z-0">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full w-full"
                    >
                        {staticHeroImages.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 z-10"></div>
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
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-20 pointer-events-none"></div>
                </div>

                <div className="container mx-auto px-6 relative z-30 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-xl mb-8">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-sm font-medium text-indigo-300">
                                {t.hero.badge}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white mb-6 leading-[1.1]">
                            {t.hero.titlePrefix} <br />
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
                            <a
                                href="#events"
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-white to-slate-100 text-slate-900 font-bold text-lg hover:from-indigo-50 hover:to-purple-50 transition transform hover:-translate-y-1 shadow-2xl hover:shadow-indigo-500/30 flex items-center gap-2 justify-center"
                            >
                                {t.hero.ctaPrimary} <ArrowRight size={20} />
                            </a>
                            <button className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition transform hover:-translate-y-1 shadow-lg flex items-center gap-2 justify-center">
                                {t.hero.ctaSecondary} <BookOpen size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-slate-400">{isBn ? "স্ক্রোল করুন" : "Scroll down"}</span>
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1 h-3 bg-white/50 rounded-full mt-2"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Trusted By Section */}
            <section className="py-16 bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">
                            {t.trustedBy.title}
                        </h3>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            {t.trustedBy.subtitle}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                        {trustedCompanies.map((company, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex justify-center"
                            >
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-xl transition-all duration-500"></div>
                                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group-hover:border-white/20 transition duration-300">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="h-8 w-auto opacity-70 group-hover:opacity-100 transition duration-300 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            {t.stats.title}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {t.stats.stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-500"></div>
                                        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group-hover:border-indigo-500/30 transition duration-300">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/10">
                                                <Icon className="w-8 h-8 text-indigo-400" />
                                            </div>
                                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                                {stat.number}
                                            </div>
                                            <div className="text-slate-400 font-medium">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6">
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                                    {isBn ? "আমাদের সম্পর্কে" : "About Us"}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8">
                                {t.about.title}
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                {t.about.desc}
                            </p>
                            <div className="space-y-8">
                                {t.about.features.map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="flex gap-4 group"
                                        >
                                            <div className="mt-1 flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-lg group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition duration-300">
                                                <Icon className="w-6 h-6 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-slate-400">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur-3xl animate-pulse"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                                    alt="Team collaboration"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <Trophy className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">95% Success Rate</div>
                                            <div className="text-slate-300">Career Transformation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-900 pointer-events-none"></div>
                
                <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 mb-6">
                            <Calendar className="w-4 h-4 text-pink-400" />
                            <span className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
                                {isBn ? "আসন্ন ইভেন্ট" : "Upcoming Events"}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            {t.events.title}
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            {t.events.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {upcomingEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.slice(0, 6).map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <Link href={route("events.show", event.slug)}>
                                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 h-full">
                                            {/* Event Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={event.banner_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=6366f1&color=fff&size=800`}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent"></div>
                                                <div className="absolute top-4 left-4">
                                                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-center min-w-[80px]">
                                                        <div className="text-xl font-bold leading-none">
                                                            {new Date(event.start_date).getDate()}
                                                        </div>
                                                        <div className="text-xs uppercase font-medium">
                                                            {new Date(event.start_date).toLocaleString("default", { month: "short" })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${event.is_free ? 'bg-green-500/20 text-green-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                                                        {event.is_free ? t.events.free : t.events.paid}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Event Content */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="flex items-center gap-1 text-sm text-slate-400">
                                                        <Calendar size={14} />
                                                        {new Date(event.start_date).toLocaleDateString()}
                                                    </span>
                                                    {event.venue && (
                                                        <span className="flex items-center gap-1 text-sm text-slate-400">
                                                            <MapPin size={14} />
                                                            {event.venue}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition">
                                                    {event.title}
                                                </h3>
                                                
                                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                    {event.short_description || event.description || "Join us for an immersive experience designed to elevate your skills."}
                                                </p>
                                                
                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center gap-2">
                                                        <Users size={16} className="text-slate-400" />
                                                        <span className="text-sm text-slate-400">
                                                            {event.max_participants ? `${event.max_participants} ${t.events.seatsLeft}` : 'Unlimited Seats'}
                                                        </span>
                                                    </div>
                                                    <div className="inline-flex items-center gap-2 text-indigo-300 font-semibold text-sm group-hover:gap-3 transition-all">
                                                        {t.events.viewDetails}
                                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 backdrop-blur-sm"
                        >
                            <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 text-xl">
                                {isBn ? "কোনো আসন্ন ইভেন্ট নেই" : "No upcoming events scheduled."}
                            </p>
                            <p className="text-slate-500 text-sm mt-2">
                                {isBn ? "শীঘ্রই চমৎকার ইভেন্টের জন্য চেক করুন!" : "Check back soon for exciting events!"}
                            </p>
                        </motion.div>
                    )}

                    {upcomingEvents.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <Link
                                href='/events'
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-indigo-300 font-bold hover:from-indigo-500/20 hover:to-purple-500/20 transition transform hover:-translate-y-0.5"
                            >
                                {t.events.viewAll}
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>
                
                <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 mb-6">
                            <MessageSquare className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">
                                {isBn ? "পর্যালোচনা" : "Testimonials"}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            {t.testimonials.title}
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            {t.testimonials.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{ delay: 4000 }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        loop={true}
                        className="pb-16"
                    >
                        {testimonialsData.map((testimonial, idx) => (
                            <SwiperSlide key={idx}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="h-full"
                                >
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full hover:border-purple-500/30 transition duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">
                                            "{testimonial.content}"
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30">
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                                                <p className="text-slate-400 text-sm">{testimonial.role}</p>
                                                <p className="text-slate-500 text-sm">{testimonial.company}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-24 bg-slate-900 relative">
                <div className="container mx-auto px-6 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            {t.programs.title}
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            {t.programs.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.programs.categories.map((category, idx) => {
                            const Icon = category.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <div className={`bg-gradient-to-br ${category.color}/10 to-transparent backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition duration-300`}>
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {category.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-6">
                                            {category.desc}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500">
                                                {category.count}
                                            </span>
                                            <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                                                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}>
                                                    {isBn ? "এক্সপ্লোর করুন" : "Explore"}
                                                </span>
                                                <ArrowRight size={16} className={`group-hover:translate-x-1 transition`} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30">
                            {t.programs.viewAll}
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                
                <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            {t.howItWorks.title}
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            {t.howItWorks.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.howItWorks.steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="relative"
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center group hover:border-indigo-500/30 transition duration-300">
                                        <div className="text-6xl font-black text-slate-800/50 mb-4">{step.number}</div>
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition duration-300">
                                            <Icon className="w-8 h-8 text-indigo-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

         {/* Team Section with Swiper Slider */}
<section id="team" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
    
    <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm mb-6">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                    {isBn ? "আমাদের টিম" : "Our Team"}
                </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                {t.team.title}
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
                {t.team.subtitle}
            </p>
        </motion.div>
    </div>

    {/* All Team Members in Swiper Slider */}
    <div className="container mx-auto px-6 relative z-10">
        {/* Create combined array with teamLead first, then team members */}
        {(() => {
            const allTeamMembers = [];
            
            // Add team lead first if exists
            if (teamLead) {
                allTeamMembers.push({
                    ...teamLead,
                    isTeamLead: true
                });
            }
            
            // Add other team members
            if (displayTeamMembers.length > 0) {
                allTeamMembers.push(...displayTeamMembers.map(member => ({
                    ...member,
                    isTeamLead: false
                })));
            }
            
            return allTeamMembers.length > 0 ? (
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    loop={allTeamMembers.length > 4}
                    className="pb-16"
                >
                    {allTeamMembers.map((member, idx) => (
                        <SwiperSlide key={member.id || idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="h-full"
                            >
                                <Link href={member.id ? route("teams.show", member.id) : "#"}>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
                                        {/* Badge for Team Lead */}
                                        {member.isTeamLead && (
                                            <div className="absolute top-4 right-4 z-10">
                                                <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-md rounded-full">
                                                    <Crown className="w-4 h-4 text-white inline mr-1" />
                                                    <span className="text-white text-xs font-bold">
                                                        {t.team.teamLead}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Member Image */}
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-white/20 group-hover:border-indigo-400/50 transition">
                                                <img
                                                    src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f1&color=fff&size=256`}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Member Info */}
                                        <div className="text-center">
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                                                {member.name}
                                            </h4>
                                            {member.designation && (
                                                <p className="text-indigo-300 font-medium mb-2">
                                                    {member.designation}
                                                </p>
                                            )}
                                            {member.organization && (
                                                <p className="text-slate-400 text-sm mb-4">
                                                    {member.organization}
                                                </p>
                                            )}
                                            {member.bio && (
                                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                                    {member.bio}
                                                </p>
                                            )}
                                            
                                            {/* Social Links for ALL Members (Team Lead + Normal Members) */}
                                            {(member.social_links && (member.social_links.linkedin || member.social_links.twitter || member.social_links.website)) && (
                                                <div className="flex items-center justify-center gap-2 mb-4">
                                                    {member.social_links.linkedin && (
                                                        <a
                                                            href={member.social_links.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/20 flex items-center justify-center transition group"
                                                        >
                                                            <Linkedin size={12} className="text-slate-300 group-hover:text-white" />
                                                        </a>
                                                    )}
                                                    {member.social_links.twitter && (
                                                        <a
                                                            href={member.social_links.twitter}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/20 flex items-center justify-center transition group"
                                                        >
                                                            <Twitter size={12} className="text-slate-300 group-hover:text-white" />
                                                        </a>
                                                    )}
                                                    {member.social_links.website && (
                                                        <a
                                                            href={member.social_links.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/20 flex items-center justify-center transition group"
                                                        >
                                                            <ExternalLink size={12} className="text-slate-300 group-hover:text-white" />
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <div className="inline-flex items-center gap-2 text-sm text-indigo-300 font-semibold group-hover:gap-3 transition-all">
                                                <span>{t.team.viewDetails}</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : null;
        })()}
    </div>
</section>

            {/* Gallery Section */}
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

            {/* FAQ Section */}
            <section className="py-24 bg-slate-900 relative">
                <div className="container mx-auto px-6 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                            {t.faq.title}
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            {t.faq.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="space-y-4">
                        {t.faq.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/30 transition duration-300"
                            >
                                <button
                                    onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                                    className="w-full px-6 py-5 text-left flex justify-between items-center"
                                >
                                    <h3 className="text-lg font-semibold text-white pr-4">
                                        {item.question}
                                    </h3>
                                    <ChevronRight
                                        size={20}
                                        className={`text-indigo-400 transition-transform duration-300 ${
                                            activeFAQ === idx ? 'rotate-90' : ''
                                        }`}
                                    />
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ${
                                        activeFAQ === idx ? 'pb-5' : 'h-0'
                                    }`}
                                >
                                    <p className="text-slate-400">
                                        {item.answer}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
                            {t.cta.title}
                        </h2>
                        <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
                            {t.cta.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-2xl">
                                {t.cta.button}
                            </button>
                            <button className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition">
                                {t.cta.secondary}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-6 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center"
                    >
                        <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
                        <h3 className="text-3xl font-bold text-white mb-3">
                            {t.newsletter.title}
                        </h3>
                        <p className="text-slate-400 mb-8">
                            {t.newsletter.subtitle}
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder={t.newsletter.placeholder}
                                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-700 hover:to-purple-700 transition transform hover:-translate-y-0.5"
                            >
                                {t.newsletter.button}
                            </button>
                        </form>
                        <p className="text-slate-500 text-sm mt-6">
                            {t.newsletter.privacy}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 pt-16 pb-8 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="text-2xl font-bold font-display text-white tracking-tight mb-6">
                                Seminar<span className="text-indigo-500">Hub</span>
                            </div>
                            <p className="text-slate-500 mb-6">
                                {t.footer.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                    <Facebook size={18} className="text-slate-400 hover:text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                    <Twitter size={18} className="text-slate-400 hover:text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                    <Instagram size={18} className="text-slate-400 hover:text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500/30 border border-white/10 flex items-center justify-center transition">
                                    <Linkedin size={18} className="text-slate-400 hover:text-white" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">{t.footer.quickLinks}</h4>
                            <ul className="space-y-3">
                                <li><a href="#programs" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.programs}</a></li>
                                <li><a href="#events" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.events}</a></li>
                                <li><a href="#team" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.mentors}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.pricing}</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">{t.footer.company}</h4>
                            <ul className="space-y-3">
                                <li><a href="#about" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.about}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.careers}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.blog}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.press}</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">{t.footer.support}</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.help}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.contact}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.privacy}</a></li>
                                <li><a href="#" className="text-slate-500 hover:text-indigo-400 transition">{t.footer.terms}</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-center text-slate-600 text-sm">
                        <p>&copy; {new Date().getFullYear()} SeminarHub. {t.footer.copyright}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
