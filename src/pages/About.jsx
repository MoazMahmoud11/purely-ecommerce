import AboutHero from "../components/About/AboutHero";
import FinalCTA from "../components/About/FinalCTA";
import MissionSection from "../components/About/MissionSection";
import QualityCommitment from "../components/About/QualityCommitment";
import ValuesGrid from "../components/About/ValuesGrid";

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-dark text-black dark:text-white">
      <AboutHero />
      <MissionSection />
      <ValuesGrid />
      <QualityCommitment />
      <FinalCTA />
    </div>
  );
}

