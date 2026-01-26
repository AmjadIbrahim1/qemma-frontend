// frontend/src/components/landing/Navbar/LandingNavbar.jsx
import { useContext, useEffect, useState } from 'react';
import { Button, IconButton, Menu, MenuItem, Avatar, Chip, CircularProgress } from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  KeyboardArrowUp,
  PersonOutline,
  LogoutOutlined,
  DashboardOutlined,
  ExpandMore
} from '@mui/icons-material';
import ThemeContext from '../../../contexts/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../../data/landingData';

const LandingNavbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showTop, setShowTop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    setLoggingOut(true);
    
    try {
      await logout();
      // Logout function will handle redirect
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect anyway
      window.location.href = '/';
    }
  };

  const handleDashboard = () => {
    handleMenuClose();
    const dashboardRoute = user?.role === 'student' 
      ? '/student/dashboard'
      : user?.role === 'teacher'
      ? '/teacher/dashboard'
      : user?.role === 'parent'
      ? '/parent/dashboard'
      : '/student/dashboard';
    navigate(dashboardRoute);
  };

  const getRoleLabel = (role) => {
    const roleMap = {
      student: 'طالب',
      teacher: 'مدرس',
      parent: 'ولي أمر',
      admin: 'مسؤول'
    };
    return roleMap[role] || 'مستخدم';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name[0];
  };

  // Show loading overlay when logging out
  if (loggingOut) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
            جاري تسجيل الخروج...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header} dir="rtl">
        <div className={styles.container}>
          {/* Logo -> scroll top */}
          <button type="button" className={styles.logo} onClick={scrollToTop}>
            قِمّة
          </button>

          {/* ROUTE LINKS */}
          <nav className={styles.links}>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <span className={styles.toggle}>
              <IconButton onClick={toggleTheme} size="small" aria-label="toggle theme">
                {darkMode ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
              </IconButton>
            </span>

            {user ? (
              <>
                {/* User Info Display */}
                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                    color: 'inherit',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                  }}
                  endIcon={<ExpandMore />}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.875rem',
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    lineHeight: 1.2 
                  }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 900 }}>
                      {user.name}
                    </span>
                    <Chip 
                      label={getRoleLabel(user.role)}
                      size="small"
                      sx={{
                        height: '18px',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        fontFamily: 'Cairo, sans-serif',
                        background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.15) 100%)',
                        color: darkMode ? 'rgba(191,219,254,0.95)' : 'rgb(30,64,175)',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(37,99,235,0.3)' : 'rgba(37,99,235,0.25)',
                      }}
                    />
                  </div>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      borderRadius: 2,
                      fontFamily: 'Cairo, sans-serif',
                    }
                  }}
                >
                  <MenuItem 
                    onClick={handleDashboard}
                    sx={{ 
                      fontFamily: 'Cairo, sans-serif', 
                      fontWeight: 700,
                      gap: 1.5,
                    }}
                  >
                    <DashboardOutlined fontSize="small" />
                    لوحة التحكم
                  </MenuItem>
                  <MenuItem 
                    onClick={() => {
                      handleMenuClose();
                      navigate('/profile');
                    }}
                    sx={{ 
                      fontFamily: 'Cairo, sans-serif', 
                      fontWeight: 700,
                      gap: 1.5,
                    }}
                  >
                    <PersonOutline fontSize="small" />
                    الملف الشخصي
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      fontFamily: 'Cairo, sans-serif', 
                      fontWeight: 700,
                      color: 'error.main',
                      gap: 1.5,
                    }}
                  >
                    <LogoutOutlined fontSize="small" />
                    تسجيل الخروج
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.routerLink}>
                  <Button
                    variant="text"
                    sx={{
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 800,
                      color: 'inherit',
                      px: 1.25,
                    }}
                  >
                    تسجيل الدخول
                  </Button>
                </Link>

                <Link to="/register" className={styles.routerLink}>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 900,
                      borderRadius: 2,
                      px: 2.5,
                      background:
                        'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
                      },
                    }}
                  >
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Scroll to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`${styles.toTop} ${showTop ? styles.toTopShow : ''}`}
        aria-label="الرجوع لأعلى الصفحة"
      >
        <KeyboardArrowUp />
      </button>
    </>
  );
};

export default LandingNavbar;