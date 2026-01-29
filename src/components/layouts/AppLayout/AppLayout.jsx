// frontend/src/components/layout/AppLayout/AppLayout.jsx
import { useLocation } from "react-router-dom";
import LandingNavbar from "../../landing/Navbar/LandingNavbar";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Pages that should NOT show the navbar
  const noNavbarPaths = ["/login", "/register", "/auth/clerk-callback"];

  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <LandingNavbar />}
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
