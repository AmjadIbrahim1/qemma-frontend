// frontend/src/pages/teacher/TeacherDashboard.jsx - UPDATED: Books Management Added + Schedule API Connected
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  School,
  VideoCall,
  Assignment,
  People,
  BarChart,
  Settings,
  Notifications,
  ExitToApp,
  Add,
  MoreVert,
  TrendingUp,
  CalendarToday,
  MenuBook,
  Campaign,
  EmojiEvents,
  Schedule,
  Class,
  ChatBubbleOutline,
  Link as LinkIcon,
} from '@mui/icons-material';
import scheduleService from '../../services/schedule.service';
import API from '../../services/api';

// ── تنسيق التاريخ ──
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // ── الحصص القادمة هذا الأسبوع ──
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  // ── الإحصائيات من قاعدة البيانات ──
  const [totalStudents, setTotalStudents] = useState(null);
  const [activeCourses, setActiveCourses] = useState(null);
  const [passRate, setPassRate] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchUpcomingSchedules();
    fetchDashboardStats();
  }, []);

  const fetchUpcomingSchedules = async () => {
    setLoadingSchedules(true);
    try {
      const res = await scheduleService.getUpcoming();
      const data = res.data?.data || res.data || [];
      setUpcomingSchedules(Array.isArray(data) ? data : []);
    } catch {
      setUpcomingSchedules([]);
    } finally {
      setLoadingSchedules(false);
    }
  };

  const fetchDashboardStats = async () => {
    setLoadingStats(true);
    try {
      // جلب الكورسات مع أعداد المسجلين
      const coursesRes = await API.get('/courses/my');
      const courses = coursesRes.data?.data || [];

      // حساب إجمالي الطلاب المسجلين في كل الكورسات
      const totalEnrolled = Array.isArray(courses)
        ? courses.reduce((sum, c) => sum + (c.stats?.enrollments || 0), 0)
        : 0;

      // الكورسات المنشورة (النشطة)
      const publishedCount = Array.isArray(courses)
        ? courses.filter(c => c.isPublished).length
        : 0;

      setTotalStudents(totalEnrolled);
      setActiveCourses(publishedCount);

      // محاولة جلب تقرير analytics لمعدل النجاح
      try {
        const analyticsRes = await API.get('/analytics/teacher');
        const report = analyticsRes.data?.data;
        if (report?.summary?.passRate !== undefined) {
          setPassRate(report.summary.passRate);
        }
      } catch {
        // Analytics endpoint اختياري — قد لا يكون متاحاً بعد
      }
    } catch {
      // القيم الافتراضية null
    } finally {
      setLoadingStats(false);
    }
  };

  // المادة المختارة أثناء تسجيل الحساب (مخزنة في teacher.specialties)
  const teacherSubjects = user?.teacher?.specialties || [];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Statistics Cards Data — كل القيم من قاعدة البيانات
  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: loadingStats ? '...' : (totalStudents !== null ? totalStudents.toString() : '0'),
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      title: 'الكورسات النشطة',
      value: loadingStats ? '...' : (activeCourses !== null ? activeCourses.toString() : '0'),
      icon: <MenuBook sx={{ fontSize: 40 }} />,
      color: '#7c3aed',
      bgColor: '#f5f3ff',
    },
    {
      title: 'الحصص هذا الأسبوع',
      value: loadingSchedules ? '...' : upcomingSchedules.length.toString(),
      icon: <VideoCall sx={{ fontSize: 40 }} />,
      color: '#db2777',
      bgColor: '#fdf2f8',
    },
    {
      title: 'معدل النجاح',
      value: loadingStats ? '...' : (passRate !== null ? `${passRate}%` : '0%'),
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#059669',
      bgColor: '#ecfdf5',
    },
  ];

  // Quick Actions - UPDATED: Added Books Management
  const quickActions = [
    {
      title: 'إدارة المسابقات الذهبية',
      description: 'أضف أسئلة للمسابقات الذهبية - الصف الثالث',
      icon: <EmojiEvents />,
      color: '#f59e0b',
      action: () => navigate('/teacher/contests'),
    },
    {
      title: 'مكتبة الكتب',
      description: 'إدارة ورفع الكتب الدراسية',
      icon: <MenuBook />,
      color: '#8b5cf6',
      action: () => navigate('/teacher/books'),
    },
    {
      title: 'إرسال إشعار',
      description: 'أرسل إشعارات للطلاب',
      icon: <Campaign />,
      color: '#ef4444',
      action: () => navigate('/teacher/notifications/send'),
    },
    {
      title: 'إنشاء كورس جديد',
      description: 'أضف كورس جديد لطلابك',
      icon: <Add />,
      color: '#2563eb',
      action: () => navigate('/teacher/courses/new'),
    },
    {
      title: 'بدء حصة مباشرة',
      description: 'ابدأ حصة أونلاين الآن',
      icon: <VideoCall />,
      color: '#7c3aed',
      action: () => navigate('/teacher/live-class/start'),
    },
    {
      title: 'إضافة اختبار',
      description: 'أنشئ اختبار جديد',
      icon: <Assignment />,
      color: '#db2777',
      action: () => navigate('/teacher/exams/new'),
    },
    {
      title: 'عرض التقارير',
      description: 'تابع أداء الطلاب',
      icon: <BarChart />,
      color: '#059669',
      action: () => navigate('/teacher/analytics'),
    },
    {
      title: 'كورساتي',
      description: 'عرض وإدارة كورساتك',
      icon: <MenuBook />,
      color: '#06b6d4',
      action: () => navigate('/teacher/my-courses'),
    },
    {
      title: 'تصحيح الاختبارات',
      description: 'راجع وصحح اختبارات الطلاب',
      icon: <Assignment />,
      color: '#10b981',
      action: () => navigate('/teacher/grade-exams'),
    },
    {
      title: 'إدارة الواجبات',
      description: 'أنشئ واجبات وتابع تسليم الطلاب',
      icon: <Assignment />,
      color: '#0891b2',
      action: () => navigate('/teacher/assignments'),
    },
    {
      title: 'إدارة المحادثات',
      description: 'تواصل مع طلابك والمدرس المساعد',
      icon: <ChatBubbleOutline />,
      color: '#2563eb',
      action: () => navigate('/teacher/chat-management'),
    },
    {
      title: 'رفع درس',
      description: 'أضف محتوى تعليمي جديد',
      icon: <Add />,
      color: '#f59e0b',
      action: () => navigate('/teacher/upload-lesson'),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f9fafb' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
          color: 'white',
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'white',
                  color: '#7c3aed',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  fontFamily: 'Cairo, sans-serif',
                }}
              >
                {user?.name?.charAt(0) || 'م'}
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 0.5 }}
                >
                  مرحباً، {user?.name || 'المدرس'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Chip
                    label="مدرس"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                    }}
                  />
                  {teacherSubjects && teacherSubjects.length > 0 && (
                    <Chip
                      label={`${teacherSubjects.length} مادة`}
                      size="small"
                      icon={<School sx={{ color: 'white !important', fontSize: 16 }} />}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white' }} onClick={() => navigate('/teacher/notifications')}>
                <Notifications />
              </IconButton>
              <IconButton sx={{ color: 'white' }} onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}
        >
          <Settings sx={{ mr: 1 }} />
          الإعدادات
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleLogout();
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ExitToApp sx={{ mr: 1 }} />
          تسجيل الخروج
        </MenuItem>
      </Menu>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Golden Contest Management Highlight Card - Grade 3 */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            border: '2px solid',
            borderColor: '#f59e0b',
            bgcolor: darkMode ? '#1e293b' : 'white',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              height: 6,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            }}
          />
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
                  >
                    🏆 إدارة المسابقات الذهبية
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}
                  >
                    أضف أسئلة للمسابقات المخصصة لك وتابع مسابقاتك السابقة
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label="الصف الثالث الثانوي"
                      size="small"
                      sx={{
                        bgcolor: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fffbeb',
                        color: '#f59e0b',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Chip
                      label="علمي رياضة"
                      size="small"
                      sx={{
                        bgcolor: darkMode ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7',
                        color: '#d97706',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Chip
                      label="علمي علوم"
                      size="small"
                      sx={{
                        bgcolor: darkMode ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7',
                        color: '#d97706',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Chip
                      label="أدبي"
                      size="small"
                      sx={{
                        bgcolor: darkMode ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7',
                        color: '#d97706',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<EmojiEvents />}
                onClick={() => navigate('/teacher/contests')}
                disableElevation
                sx={{
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 900,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  },
                }}
              >
                إدارة المسابقات
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Teacher Subjects Card */}
        {teacherSubjects && teacherSubjects.length > 0 && (
          <Card
            elevation={0}
            sx={{
              mb: 4,
              border: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              bgcolor: darkMode ? '#1e293b' : 'white',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                    mr: 2,
                  }}
                >
                  <School sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
                  >
                    المواد الدراسية
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                  >
                    المواد المخصصة لك
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/profile')}
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                    borderColor: darkMode ? '#475569' : '#e2e8f0',
                    color: darkMode ? '#f1f5f9' : '#1e293b',
                    '&:hover': {
                      borderColor: '#7c3aed',
                      bgcolor: darkMode ? 'rgba(124, 58, 237, 0.1)' : '#f5f3ff',
                    },
                  }}
                >
                  عرض الكل
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? 'rgba(124, 58, 237, 0.1)' : '#f5f3ff',
                  border: '2px solid',
                  borderColor: darkMode ? 'rgba(124, 58, 237, 0.3)' : '#e9d5ff',
                }}
              >
                {teacherSubjects.map((subject, index) => (
                  <Chip
                    key={`${subject}-${index}`}
                    label={subject}
                    sx={{
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                      color: 'white',
                      px: 2,
                      py: 2,
                      fontSize: '0.9rem',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: darkMode ? '#334155' : '#e5e7eb',
                  bgcolor: darkMode ? '#1e293b' : 'white',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: darkMode
                      ? '0 10px 20px rgba(0,0,0,0.3)'
                      : '0 10px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ mb: 0.5, color: darkMode ? '#f1f5f9' : 'inherit' }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                  >
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            fontWeight={900}
            fontFamily="Cairo, sans-serif"
            sx={{ mb: 2, color: darkMode ? '#f1f5f9' : 'inherit' }}
          >
            إجراءات سريعة
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: action.color,
                      transform: 'translateY(-4px)',
                      boxShadow: darkMode
                        ? '0 10px 20px rgba(0,0,0,0.3)'
                        : '0 10px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                  onClick={action.action}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: `${action.color}15`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: action.color,
                        mb: 2,
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ mb: 0.5, color: darkMode ? '#f1f5f9' : 'inherit' }}
                    >
                      {action.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                    >
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recent Activity & Schedule */}
        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 2, color: darkMode ? '#f1f5f9' : 'inherit' }}
                >
                  النشاط الأخير
                </Typography>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <School sx={{ fontSize: 60, color: darkMode ? '#475569' : '#d1d5db', mb: 2 }} />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                  >
                    لا يوجد نشاط حالياً
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                  >
                    ابدأ بإنشاء كورس أو حصة جديدة
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* ── الجدول الزمني — يجلب الحصص القادمة من API ── */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                height: '100%',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                  >
                    الجدول الزمني
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                      color: '#2563eb',
                    }}
                    onClick={() => navigate('/teacher/schedule')}
                  >
                    إضافة حصة
                  </Button>
                </Box>

                {loadingSchedules ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress size={32} />
                  </Box>
                ) : upcomingSchedules.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CalendarToday
                      sx={{ fontSize: 60, color: darkMode ? '#475569' : '#d1d5db', mb: 2 }}
                    />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                    >
                      لا توجد حصص مجدولة هذا الأسبوع
                    </Typography>
                    <Button
                      variant="text"
                      sx={{
                        mt: 2,
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        color: '#2563eb',
                      }}
                      onClick={() => navigate('/teacher/schedule')}
                    >
                      إضافة حصة
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {upcomingSchedules.slice(0, 5).map((s) => (
                      <Box
                        key={s.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: darkMode ? '#0f172a' : '#f8fafc',
                          border: '1px solid',
                          borderColor: darkMode ? '#334155' : '#e5e7eb',
                          display: 'flex',
                          gap: 2,
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.5,
                            bgcolor: s.type === 'online' ? '#eff6ff' : '#f0fdf4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {s.type === 'online'
                            ? <VideoCall sx={{ fontSize: 18, color: '#2563eb' }} />
                            : <Class     sx={{ fontSize: 18, color: '#059669' }} />
                          }
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.3 }}
                            noWrap
                          >
                            {s.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{
                                color: darkMode ? '#94a3b8' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.3,
                              }}
                            >
                              <CalendarToday sx={{ fontSize: 11 }} />
                              {formatDate(s.date)}
                            </Typography>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{
                                color: darkMode ? '#94a3b8' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.3,
                              }}
                            >
                              <Schedule sx={{ fontSize: 11 }} />
                              {s.startTime}
                            </Typography>
                          </Box>
                          {s.meetingLink && (
                            <Typography
                              variant="caption"
                              component="a"
                              href={s.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: '#2563eb',
                                fontFamily: 'Cairo, sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.3,
                                mt: 0.3,
                              }}
                            >
                              <LinkIcon sx={{ fontSize: 11 }} />
                              رابط الحصة
                            </Typography>
                          )}
                        </Box>
                        <Chip
                          label={s.type === 'online' ? 'أونلاين' : 'حضوري'}
                          size="small"
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.65rem',
                            bgcolor: s.type === 'online' ? '#eff6ff' : '#f0fdf4',
                            color: s.type === 'online' ? '#2563eb' : '#059669',
                            flexShrink: 0,
                          }}
                        />
                      </Box>
                    ))}

                    {upcomingSchedules.length > 5 && (
                      <Button
                        variant="text"
                        onClick={() => navigate('/teacher/schedule')}
                        sx={{
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                          color: '#2563eb',
                          alignSelf: 'center',
                        }}
                      >
                        عرض كل الحصص ({upcomingSchedules.length})
                      </Button>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherDashboard;