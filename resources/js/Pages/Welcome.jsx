import { Head } from "@inertiajs/react";
import { useState } from "react";
import NavBar from "../Components/Welcome/NavBar";
import HeroSection from "../Components/Welcome/HeroSection";
import TrustedBySection from "../Components/Welcome/TrustedBySection";
import StatsSection from "../Components/Welcome/StatsSection";
import AboutSection from "../Components/Welcome/AboutSection";
import EventsSection from "../Components/Welcome/EventsSection";
import TestimonialsSection from "../Components/Welcome/TestimonialsSection";
import ProgramsSection from "../Components/Welcome/ProgramsSection";
import HowItWorksSection from "../Components/Welcome/HowItWorksSection";
import TeamSection from "../Components/Welcome/TeamSection";
import GallerySection from "../Components/Welcome/GallerySection";
import FAQSection from "../Components/Welcome/FAQSection";
import CTASection from "../Components/Welcome/CTASection";
import NewsletterSection from "../Components/Welcome/NewsletterSection";
import Footer from "../Components/Welcome/Footer";
import FloatingActions from "../Components/Welcome/FloatingActions";
import { translations } from "../Components/Welcome/data";

export default function Welcome({
    auth,
    upcomingEvents = [],
    teamMembers = [],
    teamLead,
    galleryItems = [],
    canLogin,
    canRegister,
    heroSection,
    statsSection,
    aboutSection,
    testimonialsSection,
    testimonials = [],
    programsSection,
    programs = [],
    howItWorksSection,
    gallerySection,
    teamSection,
    faqSection,
    faqs = []
}) {
    const [lang, setLang] = useState("en");
    const t = translations[lang];
    const isBn = lang === "bn";

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 selection:bg-indigo-500/30">
            <Head title="Welcome to Prochesta IT" />

            <NavBar
                auth={auth}
                canLogin={canLogin}
                canRegister={canRegister}
                t={t}
                lang={lang}
                setLang={setLang}
            />

            <HeroSection t={t} isBn={isBn} lang={lang} content={heroSection?.content} />


            <StatsSection t={t} content={statsSection?.content} lang={lang} />

            <AboutSection t={t} isBn={isBn} content={aboutSection?.content} lang={lang} />

            <EventsSection t={t} upcomingEvents={upcomingEvents} isBn={isBn} />

            {/* <TestimonialsSection t={t} isBn={isBn} content={testimonialsSection?.content} testimonials={testimonials} lang={lang} /> */}

            <ProgramsSection t={t} isBn={isBn} content={programsSection?.content} programs={programs} lang={lang} />

            <HowItWorksSection t={t} content={howItWorksSection?.content} lang={lang} />

            <TeamSection
                t={t}
                leader={teamLead}
                teamMembers={teamMembers}
                content={teamSection?.content}
                isBn={isBn}
                lang={lang}
            />

            <GallerySection t={t} isBn={isBn} content={gallerySection?.content} galleryItems={galleryItems} lang={lang} />

            <FAQSection t={t} isBn={isBn} content={faqSection?.content} faqs={faqs} lang={lang} />

            <CTASection t={t} />

            <FloatingActions />

            <Footer t={t} />
        </div>
    );
}
