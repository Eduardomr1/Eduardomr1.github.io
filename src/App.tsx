import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { PhilosophySection } from './components/PhilosophySection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { TrajectorySection } from './components/TrajectorySection';
import { Footer } from './components/Footer';

export function App() {
  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#E2E8F0] selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Top Navigation */}
      <Navbar onOpenTerminal={handleOpenTerminal} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenTerminal={handleOpenTerminal} />

        {/* Featured Projects with Spec Drawer */}
        <ProjectsSection />

        {/* Engineering & QA Philosophy */}
        <PhilosophySection />

        {/* Interactive CLI & Verification Playground */}
        <InteractiveTerminal />

        {/* Career & Leadership Trajectory */}
        <TrajectorySection />
      </main>

      {/* Footer & Contact */}
      <Footer />
    </div>
  );
}

export default App;
