import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Portfolio | Flutter Developer',
  description: 'Professional portfolio showcasing mobile development projects and expertise in Flutter, Dart, and mobile architecture.',
  keywords: 'Flutter, Mobile Development, iOS, Android, Dart, Portfolio',
};

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <AboutSection /> {/* Contains Skills first, then About Me */}
      <Footer />
    </div>
  );
}
