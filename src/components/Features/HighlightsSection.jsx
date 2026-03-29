import { NavLink } from "react-router-dom";
import { TRUST_POINTS } from "../../data/FeaturesData.jsx";
import TrustPoint from "./TrustPoint";
import { FaArrowRight } from "react-icons/fa6";

function HighlightSection() {
    return (
        <section className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
            <div
            className="aspect-square rounded-2xl bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: 'url(/HeroSectionImage.webp)' }}
            >
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>

            {/* Testimonial Card */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-[#1A1A1A] p-8 rounded-xl shadow-xl max-w-xs hidden sm:block">
            <span className="material-symbols-outlined text-primary text-4xl mb-4 block ">
                99
            </span>
            <p className="text-sm italic font-medium mb-4 text-gray-700 dark:text-gray-300">
                "The subscription service changed my life. I never worry about
                running out of safe cleaners for my kids."
            </p>
            <p className="text-xs font-bold text-gray-500">
                — Sarah J., Purely Member
            </p>
            </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Transparency you can see through.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We don't just sell soap. We provide peace of mind. Every product on
            Purely comes with a full breakdown of its environmental impact,
            ingredient origin, and laboratory safety score.
            </p>
            <ul className="flex flex-col gap-4">
            {TRUST_POINTS.map((point) => (
                <TrustPoint key={point} label={point} />
            ))}
            </ul>
            <div className="pt-4">
            <NavLink
                to="/products"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-3 w-fit"
            >
                Explore Full Collection
                <span className="material-symbols-outlined"><FaArrowRight /></span>
            </NavLink>
            </div>
        </div>
        </section>
    );
}

export default HighlightSection;