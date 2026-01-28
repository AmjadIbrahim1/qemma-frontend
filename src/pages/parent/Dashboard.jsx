// frontend/src/pages/parent/Dashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import {
  People,
  TrendingUp,
  TrendingDown,
  Assignment,
  EventAvailable,
  Warning,
  CheckCircle,
  Cancel,
  School,
  BarChart,
  Notifications,
  Settings,
  ExitToApp,
  MoreVert,
  ArrowForward,
  Info,
  CalendarToday,
  AccessTime,
} from '@mui/icons-material';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

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

  // Mock Data - استبدلها بـ API calls
  const children = [
    {
      id: 'child-1',
      name: 'أحمد محمد',
      grade: 'الصف الأول الثانوي',
      avatar: 'أ',
      totalCourses: 4,
      averageGrade: 85,
      attendance: 92,
      pendingAssignments: 2,
      upcomingExams: 1,
      behaviorAlerts: 0,
    },
    {
      id: 'child-2',
      name: 'فاطمة محمد',
      grade: 'الصف الثالث الثانوي',
      avatar: 'ف',
      totalCourses: 5,
      averageGrade: 78,
      attendance: 88,
      pendingAssignments: 4,
      upcomingExams: 2,
      behaviorAlerts: 1,
    },
  ];

  // Overall Stats
  const stats = [
    {
      title: 'إجمالي الأبناء',
      value: children.length,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      title: 'الكورسات النشطة',
      value: children.reduce((sum, child) => sum + child.totalCourses, 0),
      icon: <School sx={{ fontSize: 40 }} />,
      color: '#7c3aed',
      bgColor: '#f5f3ff',
    },
    {
      title: 'الواجبات المعلقة',
      value: children.reduce((sum, child) => sum + child.pendingAssignments, 0),
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      title: 'التنبيهات السلوكية',
      value: children.reduce((sum, child) => sum + child.behaviorAlerts, 0),
      icon: <Warning sx={{ fontSize: 40 }} />,
      color: '#dc2626',
      bgColor: '#fef2f2',
    },
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      childName: 'أحمد',
      activity: 'حصل على 95% في اختبار الجبر',
      type: 'success',
      time: 'منذ ساعتين',
      icon: <CheckCircle sx={{ color: '#059669' }} />,
    },
    {
      id: 2,
      childName: 'فاطمة',
      activity: 'تأخرت في تسليم واجب الفيزياء',
      type: 'warning',
      time: 'منذ 4 ساعات',
      icon: <Warning sx={{ color: '#f59e0b' }} />,
    },
    {
      id: 3,
      childName: 'أحمد',
      activity: 'حضر حصة مباشرة - الرياضيات',
      type: 'info',
      time: 'أمس',
      icon: <EventAvailable sx={{ color: '#2563eb' }} />,
    },
    {
      id: 4,
      childName: 'فاطمة',
      activity: 'تنبيه سلوكي من المدرس',
      type: 'error',
      time: 'منذ يومين',
      icon: <Cancel sx={{ color: '#dc2626' }} />,
    },
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      childName: 'أحمد',
      title: 'اختبار الهندسة',
      date: '2025-01-28',
      time: '10:00 ص',
      type: 'exam',
    },
    {
      id: 2,
      childName: 'فاطمة',
      title: 'تسليم واجب الكيمياء',
      date: '2025-01-26',
      time: '11:59 م',
      type: 'assignment',
    },
    {
      id: 3,
      childName: 'فاطمة',
      title: 'اختبار الأحياء',
      date: '2025-01-30',
      time: '02:00 م',
      type: 'exam',
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
                {user?.name?.charAt(0) || 'و'}
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 0.5 }}
                >
                  مرحباً، {user?.name || 'ولي الأمر'}
                </Typography>
                <Chip
                  label="ولي أمر"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white' }}>
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
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
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
                        bgcolor: darkMode ? stat.color + '20' : stat.bgColor,
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

        <Grid container spacing={3}>
          {/* Children Overview */}
          <Grid item xs={12} lg={8}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                mb: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                  >
                    نظرة عامة على الأبناء
                  </Typography>
                  <Button
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/parent/children')}
                    sx={{
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                      color: '#2563eb',
                    }}
                  >
                    عرض الكل
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {children.map((child) => (
                    <Grid item xs={12} key={child.id}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          border: '1px solid',
                          borderColor: darkMode ? '#334155' : '#e5e7eb',
                          bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: '#2563eb',
                            transform: 'translateY(-2px)',
                          },
                        }}
                        onClick={() => navigate(`/parent/child/${child.id}`)}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                bgcolor: '#2563eb',
                                fontFamily: 'Cairo, sans-serif',
                                fontWeight: 900,
                                fontSize: '1.25rem',
                              }}
                            >
                              {child.avatar}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="h6"
                                fontWeight={700}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                              >
                                {child.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                              >
                                {child.grade}
                              </Typography>
                            </Box>
                          </Box>

                          {child.behaviorAlerts > 0 && (
                            <Chip
                              icon={<Warning />}
                              label={`${child.behaviorAlerts} تنبيه`}
                              size="small"
                              sx={{
                                bgcolor: '#fef2f2',
                                color: '#dc2626',
                                fontFamily: 'Cairo, sans-serif',
                                fontWeight: 700,
                              }}
                            />
                          )}
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={6} sm={3}>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#94a3b8' : 'text.secondary', display: 'block', mb: 0.5 }}
                            >
                              المتوسط
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography
                                variant="h6"
                                fontWeight={900}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                              >
                                {child.averageGrade}%
                              </Typography>
                              {child.averageGrade >= 80 ? (
                                <TrendingUp sx={{ color: '#059669', fontSize: 20 }} />
                              ) : (
                                <TrendingDown sx={{ color: '#dc2626', fontSize: 20 }} />
                              )}
                            </Box>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#94a3b8' : 'text.secondary', display: 'block', mb: 0.5 }}
                            >
                              الحضور
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={900}
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                            >
                              {child.attendance}%
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#94a3b8' : 'text.secondary', display: 'block', mb: 0.5 }}
                            >
                              الكورسات
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={900}
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                            >
                              {child.totalCourses}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#94a3b8' : 'text.secondary', display: 'block', mb: 0.5 }}
                            >
                              الواجبات المعلقة
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={900}
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: child.pendingAssignments > 0 ? '#f59e0b' : darkMode ? '#f1f5f9' : 'inherit' }}
                            >
                              {child.pendingAssignments}
                            </Typography>
                          </Grid>
                        </Grid>

                        {/* Progress Bar */}
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                            >
                              التقدم الكلي
                            </Typography>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={700}
                              sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                            >
                              {child.averageGrade}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={child.averageGrade}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: darkMode ? '#334155' : '#e5e7eb',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: child.averageGrade >= 80 ? '#059669' : child.averageGrade >= 60 ? '#f59e0b' : '#dc2626',
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? '#f1f5f9' : 'inherit' }}
                >
                  النشاط الأخير
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem
                      key={activity.id}
                      sx={{
                        px: 0,
                        borderBottom: index < recentActivities.length - 1 ? '1px solid' : 'none',
                        borderColor: darkMode ? '#334155' : '#e5e7eb',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {activity.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            fontWeight={600}
                            sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                          >
                            <strong>{activity.childName}:</strong> {activity.activity}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                          >
                            {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Upcoming Events */}
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                mb: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? '#f1f5f9' : 'inherit' }}
                >
                  الأحداث القادمة
                </Typography>
                <List>
                  {upcomingEvents.map((event, index) => (
                    <ListItem
                      key={event.id}
                      sx={{
                        px: 2,
                        py: 1.5,
                        mb: 1.5,
                        borderRadius: 2,
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                        border: '1px solid',
                        borderColor: darkMode ? '#334155' : '#e5e7eb',
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip
                            label={event.childName}
                            size="small"
                            sx={{
                              bgcolor: '#2563eb',
                              color: 'white',
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                            }}
                          />
                          <Chip
                            icon={event.type === 'exam' ? <Assignment sx={{ fontSize: 14 }} /> : <Info sx={{ fontSize: 14 }} />}
                            label={event.type === 'exam' ? 'اختبار' : 'واجب'}
                            size="small"
                            sx={{
                              bgcolor: event.type === 'exam' ? '#fef2f2' : '#fffbeb',
                              color: event.type === 'exam' ? '#dc2626' : '#f59e0b',
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ mb: 0.5, color: darkMode ? '#f1f5f9' : 'inherit' }}
                        >
                          {event.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 14, color: darkMode ? '#64748b' : 'text.secondary' }} />
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                            >
                              {event.date}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: 14, color: darkMode ? '#64748b' : 'text.secondary' }} />
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                            >
                              {event.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 2, color: darkMode ? '#f1f5f9' : 'inherit' }}
                >
                  إجراءات سريعة
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate('/parent/children')}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        py: 1.5,
                        borderColor: darkMode ? '#334155' : undefined,
                        color: darkMode ? '#f1f5f9' : 'inherit',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <People />
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" fontWeight={700}>
                        الأبناء
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate('/parent/reports')}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        py: 1.5,
                        borderColor: darkMode ? '#334155' : undefined,
                        color: darkMode ? '#f1f5f9' : 'inherit',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <BarChart />
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" fontWeight={700}>
                        التقارير
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ParentDashboard;