import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  NotificationsRounded,
  MoreVert,
  ExitToApp,
  Person,
  SettingsRounded,
  SchoolRounded,
  QuizRounded,
  ChatRounded,
  VideoCallRounded,
  HomeRounded,
} from '@mui/icons-material';
import ThemeContext from '../../../../contexts/ThemeContext';
import { studentData, badgesData } from '../../../../data/studentData';

// دالة لاستخراج الأحرف الأولى من الاسم
const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return name[0];
};

const StudentHeader = ({ unreadNotifications = 3 }) => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  const navigationItems = [
    {
      icon: <HomeRounded />,
      label: 'الرئيسية',
      path: '/student/dashboard',
      color: '#2563eb',
    },
    {
      icon: <SchoolRounded />,
      label: 'كورساتي',
      path: '/student/courses',
      color: '#7c3aed',
    },
    {
      icon: <QuizRounded />,
      label: 'الاختبارات',
      path: '/student/exams',
      color: '#059669',
    },
    {
      icon: <VideoCallRounded />,
      label: 'الحصص المباشرة',
      path: '/student/live-class',
      color: '#db2777',
    },
    {
      icon: <ChatRounded />,
      label: 'المساعد الذكي',
      path: '/student/chat',
      color: '#f59e0b',
    },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
        color: 'white',
        py: 3,
        px: 2,
        mb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* User Info Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Avatar with Progress */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={studentData.avatar}
                alt={studentData.name}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'white',
                  color: '#7c3aed',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  fontFamily: 'Cairo, sans-serif',
                  border: '4px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={() => navigate('/profile')}
              >
                {getInitials(studentData.name)}
              </Avatar>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'white',
                  color: '#7c3aed',
                  fontSize: 11,
                  fontWeight: 800,
                  fontFamily: 'Cairo, sans-serif',
                  px: 1.5,
                  py: 0.25,
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                {studentData.overallProgress}%
              </Box>
            </Box>

            {/* User Details */}
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ mb: 0.5 }}
              >
                مرحباً، {studentData.firstName} 👋
              </Typography>
              <Typography
                variant="body1"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9, mb: 1.5 }}
              >
                {studentData.level}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {badgesData.slice(0, 3).map((badge) => (
                  <Chip
                    key={badge.id}
                    label={badge.label}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 600,
                      fontSize: 11,
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Quick Navigation - Desktop Only */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            {navigationItems.slice(1, 4).map((item) => (
              <Tooltip key={item.path} title={item.label}>
                <IconButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.25)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          {/* Semester Progress - Desktop Only */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 2,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
                {studentData.semesterProgress}%
              </Typography>
              <Typography fontFamily="Cairo, sans-serif" fontSize={12} sx={{ opacity: 0.9 }}>
                تقدم الفصل الدراسي
              </Typography>
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Notifications */}
            <Tooltip title="الإشعارات">
              <IconButton
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                <Badge badgeContent={unreadNotifications} color="error">
                  <NotificationsRounded />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Dark Mode Toggle */}
            <Tooltip title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            {/* More Options */}
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Main Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 240,
            borderRadius: 3,
            bgcolor: darkMode ? '#1e293b' : '#fff',
            border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          },
        }}
      >
        {/* User Info in Menu */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={studentData.avatar}
              alt={studentData.name}
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#7c3aed',
                color: 'white',
                fontWeight: 700,
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              {getInitials(studentData.name)}
            </Avatar>
            <Box>
              <Typography
                fontWeight={700}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
              >
                {studentData.name}
              </Typography>
              <Typography
                variant="caption"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
              >
                {studentData.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {navigationItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                bgcolor: darkMode ? '#334155' : '#f8fafc',
              },
            }}
          >
            <ListItemIcon sx={{ color: item.color, minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 600,
                color: darkMode ? '#f1f5f9' : '#1e293b',
              }}
            />
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={() => handleNavigate('/profile')}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon sx={{ color: '#7c3aed', minWidth: 40 }}>
            <Person />
          </ListItemIcon>
          <ListItemText
            primary="الملف الشخصي"
            primaryTypographyProps={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              color: darkMode ? '#f1f5f9' : '#1e293b',
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleNavigate('/settings')}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon sx={{ color: '#64748b', minWidth: 40 }}>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText
            primary="الإعدادات"
            primaryTypographyProps={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              color: darkMode ? '#f1f5f9' : '#1e293b',
            }}
          />
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              bgcolor: darkMode ? '#7f1d1d' : '#fef2f2',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            primary="تسجيل الخروج"
            primaryTypographyProps={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              color: '#ef4444',
            }}
          />
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            maxHeight: 400,
            borderRadius: 3,
            bgcolor: darkMode ? '#1e293b' : '#fff',
            border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}` }}>
          <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
            🔔 الإشعارات
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: darkMode ? '#334155' : '#eff6ff',
              borderRight: '3px solid #2563eb',
              mb: 1.5,
              cursor: 'pointer',
              '&:hover': { bgcolor: darkMode ? '#475569' : '#dbeafe' },
            }}
            onClick={() => {
              setNotificationAnchor(null);
              navigate('/student/exams');
            }}
          >
            <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
              📝 تم رفع درجات امتحان الرياضيات
            </Typography>
            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              منذ 5 دقائق
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: darkMode ? '#334155' : '#fef3c7',
              borderRight: '3px solid #f59e0b',
              mb: 1.5,
              cursor: 'pointer',
              '&:hover': { bgcolor: darkMode ? '#475569' : '#fde68a' },
            }}
            onClick={() => {
              setNotificationAnchor(null);
              navigate('/student/courses');
            }}
          >
            <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
              📚 واجب جديد في الفيزياء
            </Typography>
            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              منذ ساعة
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: darkMode ? '#334155' : '#fce7f3',
              borderRight: '3px solid #db2777',
              cursor: 'pointer',
              '&:hover': { bgcolor: darkMode ? '#475569' : '#fbcfe8' },
            }}
            onClick={() => {
              setNotificationAnchor(null);
              navigate('/student/live-class');
            }}
          >
            <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
              🎥 تذكير: حصة الكيمياء بعد ساعتين
            </Typography>
            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              منذ ساعتين
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2, borderTop: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}` }}>
          <Typography
            variant="body2"
            fontWeight={600}
            fontFamily="Cairo, sans-serif"
            sx={{
              color: '#2563eb',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => {
              setNotificationAnchor(null);
              navigate('/student/notifications');
            }}
          >
            عرض كل الإشعارات
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default StudentHeader;