import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import StrategicImpactSection from '../components/StrategicImpactSection';
import InsightsSection from '../components/InsightsSection';

export default function Portfolio() {
  return (
    <div className="page-shell selection:bg-[#ffdbca] selection:text-[#331200] bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <main className="overflow-hidden">
        <HeroSection />
        <AboutSection />
        <StrategicImpactSection />
        <InsightsSection />
      </main>
    </div>
  );
}
