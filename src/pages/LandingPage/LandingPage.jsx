// frontend/src/pages/LandingPage/LandingPage.jsx - ENHANCED with auto-redirect
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import HeroSection from '../../components/landing/HeroSection/HeroSection';
import WhyQemmaSection from '../../components/landing/WhyQemma/WhyQemmaSection';
import CoursesSection from '../../components/landing/CoursesSection/CoursesSection';
import HowItWorksSection from '../../components/landing/HowItWorks/HowItWorks';
import TopStudentsSection from '../../components/landing/TopStudents/TopStudentsSection';
import AboutSection from '../../components/landing/AboutSection/AboutSection';
import FinalCTA from '../../components/landing/FinalCTA/FinalCTA';
import Footer from '../../components/landing/Footer/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // ✅ Auto-redirect authenticated users to their dashboard
  useEffect(() => {
    if (!loading && user) {
      console.log('👤 User is authenticated, checking redirect...');
      
      // ✅ Don't redirect assistant teachers - they stay on landing page
      if (user.role === 'assistant_teacher') {
        console.log('✅ Assistant teacher - staying on landing page');
        return;
      }
      
      // ✅ Redirect other roles to their dashboards
      const dashboardRoute =
        user.role === "student"
          ? "/student/dashboard"
          : user.role === "teacher"
            ? "/teacher/dashboard"
            : user.role === "parent"
              ? "/parent/dashboard"
              : "/student/dashboard";

      console.log('🔄 Redirecting to:', dashboardRoute);
      navigate(dashboardRoute, { replace: true });
    }
  }, [user, loading, navigate]);

  // ✅ Show landing page while loading or for unauthenticated users
  return (
    <div className="min-h-screen">
      {/* Navbar is now in AppLayout - no need to include it here */}
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