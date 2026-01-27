import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  IconButton,
  Chip,
  Button,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ArrowBackRounded,
  NotificationsRounded,
  GradeRounded,
  AssignmentRounded,
  VideoCallRounded,
  CheckCircleRounded,
  EmojiEventsRounded,
  CalendarTodayRounded,
  ChatRounded,
  FolderRounded,
  DeleteRounded,
  DoneAllRounded,
  CircleRounded,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';
import { notificationsData } from '../../data/studentData';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState(0);

  // أيقونات حسب النوع
  const iconMap = {
    grade: { icon: GradeRounded, color: '#2563eb', bgColor: '#eff6ff' },
    assignment: { icon: AssignmentRounded, color: '#f59e0b', bgColor: '#fffbeb' },
    live: { icon: VideoCallRounded, color: '#db2777', bgColor: '#fdf2f8' },
    success: { icon: CheckCircleRounded, color: '#059669', bgColor: '#ecfdf5' },
    badge: { icon: EmojiEventsRounded, color: '#7c3aed', bgColor: '#f5f3ff' },
    schedule: { icon: CalendarTodayRounded, color: '#0891b2', bgColor: '#ecfeff' },
    discussion: { icon: ChatRounded, color: '#ea580c', bgColor: '#fff7ed' },
    resource: { icon: FolderRounded, color: '#4f46e5', bgColor: '#eef2ff' },
  };

  // المسارات حسب النوع
  const pathMap = {
    grade: '/student/exams',
    assignment: '/student/submit-assignment',
    live: '/student/live-class',
    success: '/student/courses',
    badge: '/student/performance',
    schedule: '/student/exams',
    discussion: '/student/courses',
    resource: '/student/courses',
  };

  // تصفية الإشعارات
  const filterNotifications = () => {
    switch (activeTab) {
      case 1:
        return notifications.filter((n) => n.unread);
      case 2:
        return notifications.filter((n) => !n.unread);
      default:
        return notifications;
    }
  };

  const filteredNotifications = filterNotifications();

  // تحديد الإشعار كمقروء
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // تحديد الكل كمقروء
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // حذف إشعار
  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // الذهاب للصفحة المرتبطة
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    const path = pathMap[notification.type] || '/student/dashboard';
    navigate(path);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: 'white',
          py: 4,
          px: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={() => navigate('/student/dashboard')}
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
              >
                <ArrowBackRounded />
              </IconButton>
              <Box>
                <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
                  🔔 الإشعارات
                </Typography>
                <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                  لديك {unreadCount} إشعار غير مقروء
                </Typography>
              </Box>
            </Box>

            {unreadCount > 0 && (
              <Button
                startIcon={<DoneAllRounded />}
                onClick={markAllAsRead}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                تحديد الكل كمقروء
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              color: darkMode ? '#94a3b8' : '#64748b',
              '&.Mui-selected': { color: '#2563eb' },
            },
            '& .MuiTabs-indicator': { bgcolor: '#2563eb' },
          }}
        >
          <Tab label={`الكل (${notifications.length})`} />
          <Tab label={`غير مقروء (${unreadCount})`} />
          <Tab label={`مقروء (${notifications.length - unreadCount})`} />
        </Tabs>

        {/* Notifications List */}
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: darkMode ? '#334155' : '#e5e7eb',
            bgcolor: darkMode ? '#1e293b' : 'white',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          {filteredNotifications.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <NotificationsRounded sx={{ fontSize: 64, color: darkMode ? '#475569' : '#cbd5e1', mb: 2 }} />
              <Typography variant="h6" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                لا توجد إشعارات
              </Typography>
            </Box>
          ) : (
            filteredNotifications.map((notification, index) => {
              const typeConfig = iconMap[notification.type] || iconMap.grade;
              const IconComponent = typeConfig.icon;

              return (
                <Box key={notification.id}>
                  <Box
                    onClick={() => handleNotificationClick(notification)}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2.5,
                      cursor: 'pointer',
                      bgcolor: notification.unread
                        ? darkMode
                          ? '#334155'
                          : '#f8fafc'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: darkMode ? '#475569' : '#f1f5f9',
                      },
                    }}
                  >
                    {/* Unread Indicator */}
                    {notification.unread && (
                      <CircleRounded
                        sx={{
                          fontSize: 10,
                          color: '#2563eb',
                          mt: 1.5,
                          flexShrink: 0,
                        }}
                      />
                    )}

                    {/* Icon */}
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: darkMode ? '#475569' : typeConfig.bgColor,
                        color: typeConfig.color,
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent />
                    </Avatar>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body1"
                        fontWeight={notification.unread ? 700 : 500}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}
                      >
                        {notification.time}
                      </Typography>
                      <Chip
                        label={
                          notification.type === 'grade'
                            ? 'درجات'
                            : notification.type === 'assignment'
                            ? 'واجب'
                            : notification.type === 'live'
                            ? 'حصة مباشرة'
                            : notification.type === 'success'
                            ? 'نجاح'
                            : notification.type === 'badge'
                            ? 'شارة'
                            : notification.type === 'schedule'
                            ? 'جدول'
                            : notification.type === 'discussion'
                            ? 'مناقشة'
                            : 'مورد'
                        }
                        size="small"
                        sx={{
                          bgcolor: darkMode ? '#475569' : typeConfig.bgColor,
                          color: typeConfig.color,
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      size="small"
                      onClick={(e) => deleteNotification(notification.id, e)}
                      sx={{
                        color: darkMode ? '#64748b' : '#94a3b8',
                        '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' },
                      }}
                    >
                      <DeleteRounded fontSize="small" />
                    </IconButton>
                  </Box>

                  {index < filteredNotifications.length - 1 && (
                    <Divider sx={{ borderColor: darkMode ? '#334155' : '#e5e7eb' }} />
                  )}
                </Box>
              );
            })
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default NotificationsPage;