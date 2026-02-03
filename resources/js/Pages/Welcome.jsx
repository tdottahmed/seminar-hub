import { Head } from "@inertiajs/react";
import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useLanguage } from "@/Contexts/LanguageContext";
import HeroSection from "../Components/Welcome/HeroSection";
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
    const { t, lang, isBn } = useLanguage();
    
    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister}>
            <Head>
                <title>Welcome to Prochesta IT - Leading IT Training Institute</title>
                <meta name="description" content="Welcome to Prochesta IT. We offer top-notch training in Web Development, Graphics Design, and more. Start your tech career with us." />
                <meta property="og:title" content="Welcome to Prochesta IT - Leading IT Training Institute" />
                <meta property="og:description" content="Welcome to Prochesta IT. We offer top-notch training in Web Development, Graphics Design, and more. Start your tech career with us." />
            </Head>

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

        </GuestLayout>
    );
}
