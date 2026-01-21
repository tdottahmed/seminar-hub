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

// Custom icons for How It Works
export const SearchIcon = ({ size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

export const UserPlusIcon = ({ size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <line x1="19" y1="8" x2="19" y2="14"></line>
        <line x1="16" y1="11" x2="22" y2="11"></line>
    </svg>
);

// --- Bilingual Content ---
export const translations = {
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
            words: [
                "Creative Potential",
                "Future Career",
                "Hidden Talent",
                "Digital Success",
            ],
            subtext:
                "Join the premier platform for professional development. Master new skills through immersive, hands-on events and workshops.",
            ctaPrimary: "Browse Events",
            ctaSecondary: "Learn More",
        },
        trustedBy: {
            title: "Trusted By Leading Organizations",
            subtitle:
                "Partnering with industry leaders to deliver exceptional learning experiences",
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
            title: "Why Choose Prochesta IT?",
            desc: "We curate experiences that go beyond traditional learning. Join thousands who have transformed their careers with us.",
            features: [
                {
                    title: "Industry Experts Mentors",
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
            subtitle:
                "Book your seat for the next big thing in professional development.",
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
            subtitle:
                "Real stories from real people who transformed their careers",
        },
        programs: {
            title: "Featured Learning Paths",
            subtitle:
                "Choose a learning path that suits your career goals and interests",
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
            subtitle: "The passionate professionals behind Prochesta IT",
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
            subtitle:
                "Subscribe to our newsletter for exclusive updates and early access",
            placeholder: "Enter your email address",
            button: "Subscribe",
            privacy: "We respect your privacy. Unsubscribe at any time.",
        },
        footer: {
            description:
                "Building a community of lifelong learners and industry leaders. Join us to reshape your future.",
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
            words: [
                "সৃজনশীল সম্ভাবনা",
                "ভবিষ্যৎ ক্যারিয়ার",
                "সুপ্ত প্রতিভা",
                "ডিজিটাল সাফল্য",
            ],
            subtext:
                "পেশাগত উন্নয়নের জন্য সেরা প্ল্যাটফর্মে যোগ দিন। হাতে-কলমে শিক্ষা এবং ওয়ার্কশপের মাধ্যমে নতুন দক্ষতা অর্জন করুন।",
            ctaPrimary: "ইভেন্ট দেখুন",
            ctaSecondary: "আরও জানুন",
        },
        trustedBy: {
            title: "শীর্ষ সংস্থাগুলোর আস্থাভাজন",
            subtitle:
                "অসাধারণ শিক্ষার অভিজ্ঞতা প্রদানের জন্য শিল্প নেতাদের সাথে অংশীদারিত্ব",
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
            title: "কেন Prochesta IT বেছে নেবেন?",
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
            subtitle:
                "পেশাগত উন্নয়নের জন্য পরবর্তী বড় ইভেন্টের জন্য আপনার সিট বুক করুন।",
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
            subtitle:
                "আপনার ক্যারিয়ারের লক্ষ্য এবং আগ্রহ অনুযায়ী একটি শিক্ষার পথ বেছে নিন",
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
            subtitle: "Prochesta IT এর পেছনের উদ্যমী পেশাদাররা",
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
            subtitle:
                "আমাদের প্ল্যাটফর্ম সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন",
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
            subtitle:
                "এক্সক্লুসিভ আপডেট এবং প্রাথমিক অ্যাক্সেসের জন্য আমাদের নিউজলেটার সাবস্ক্রাইব করুন",
            placeholder: "আপনার ইমেইল ঠিকানা লিখুন",
            button: "সাবস্ক্রাইব",
            privacy:
                "আমরা আপনার গোপনীয়তা সম্মান করি। যে কোনো সময় আনসাবস্ক্রাইব করুন।",
        },
        footer: {
            description:
                "জীবনব্যাপী শিক্ষার্থী এবং শিল্প নেতাদের সম্প্রদায় গড়ে তোলা। আপনার ভবিষ্যৎ পুনর্নির্মাণ করতে আমাদের সাথে যোগ দিন।",
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

export const quotesData = [
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
export const staticHeroImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000",
];

import { GoogleLogo, MicrosoftLogo, AmazonLogo, AdobeLogo, IBMLogo, MetaLogo } from "./CompanyLogos";

// Trusted companies logos
export const trustedCompanies = [
    {
        name: "Google",
        Logo: GoogleLogo,
    },
    {
        name: "Microsoft",
        Logo: MicrosoftLogo,
    },
    {
        name: "Amazon",
        Logo: AmazonLogo,
    },
    {
        name: "Adobe",
        Logo: AdobeLogo,
    },
    { name: "IBM", Logo: IBMLogo },
    { name: "Meta", Logo: MetaLogo },
];

// Testimonials data
export const testimonialsData = [
    {
        name: "Sarah Johnson",
        role: "Web Developer",
        company: "TechCorp",
        content:
            "SeminarHub transformed my career. The hands-on workshops gave me the confidence to switch to a senior developer role.",
        avatar: null,
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Marketing Manager",
        company: "Digital Solutions",
        content:
            "The networking opportunities alone are worth it. I've made connections that led to three major projects.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        role: "UI/UX Designer",
        company: "Creative Minds",
        content:
            "As a designer, the creative workshops expanded my perspective and improved my design thinking process significantly.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        rating: 4,
    },
    {
        name: "David Wilson",
        role: "Business Analyst",
        company: "Enterprise Corp",
        content:
            "The practical approach to learning helped me implement strategies that increased our team's efficiency by 40%.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        rating: 5,
    },
];

// Gallery static images (if no galleryItems from database)
export const galleryStaticImages = [
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
export const staticTeamMembers = [
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
        photo: null,
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
