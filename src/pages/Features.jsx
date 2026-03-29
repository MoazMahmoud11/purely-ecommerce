import FeaturesGrid from "../components/Features/FeaturesGrid";
import HighlightSection from "../components/Features/HighlightsSection";
import NewsletterSection from "../components/Features/NewsletterSection";
import HeroSection from "../components/Features/HeroSection.jsx";

export default function Features(){
    return (
        <section className=" bg-neutral-50 dark:bg-secondary dark:text-white px-4 md:px-6 lg:px-32 py-16 lg:py-24 ">
            <HeroSection/>
            <FeaturesGrid />
            <HighlightSection />
            <NewsletterSection />
        </section>
    );
}