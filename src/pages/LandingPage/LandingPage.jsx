// frontend/src/pages/LandingPage/LandingPage.jsx
import LandingNavbar from '../../components/landing/Navbar/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection/HeroSection';
import WhyQemmaSection from '../../components/landing/WhyQemma/WhyQemmaSection';
import CoursesSection from '../../components/landing/CoursesSection/CoursesSection';
import HowItWorksSection from '../../components/landing/HowItWorks/HowItWorks';
import TopStudentsSection from '../../components/landing/TopStudents/TopStudentsSection';
import AboutSection from '../../components/landing/AboutSection/AboutSection';
import FinalCTA from '../../components/landing/FinalCTA/FinalCTA';
import Footer from '../../components/landing/Footer/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <WhyQemmaSection />
      <CoursesSection />
      <HowItWorksSection />
      <TopStudentsSection />
      <AboutSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;