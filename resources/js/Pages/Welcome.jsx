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
import { translations } from "../Components/Welcome/data";

export default function Welcome({
    auth,
    upcomingEvents = [],
    teamMembers = [],
    teamLead,
    galleryItems = [],
    canLogin,
    canRegister,
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

            <HeroSection t={t} isBn={isBn} lang={lang} />

            <TrustedBySection t={t} />

            <StatsSection t={t} />

            <AboutSection t={t} isBn={isBn} />

            <EventsSection t={t} upcomingEvents={upcomingEvents} isBn={isBn} />

            <TestimonialsSection t={t} isBn={isBn} />

            <ProgramsSection t={t} isBn={isBn} />

            <HowItWorksSection t={t} />

            <TeamSection
                t={t}
                teamLead={teamLead}
                teamMembers={teamMembers}
                isBn={isBn}
            />

            <GallerySection t={t} galleryItems={galleryItems} isBn={isBn} />

            <FAQSection t={t} />

            <CTASection t={t} />

            {/* <NewsletterSection t={t} /> */}

            <Footer t={t} />
        </div>
    );
}
