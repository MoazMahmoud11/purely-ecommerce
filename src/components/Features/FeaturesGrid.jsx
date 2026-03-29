import { FEATURES } from "../../data/FeaturesData.jsx";
import FeaturesCard from "./FeaturesCard";

function FeaturesGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {FEATURES.map((f) => (
            <FeaturesCard key={f.title} {...f} />
        ))}
        </section>
    );
}

export default FeaturesGrid;