import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import GlassCard from '../../common/GlassCard';
import { notificationsData } from '../../../../data/studentData';

const Notifications = ({ darkMode }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // ✅ الذهاب لصفحة الإشعارات
  const handleViewAll = () => {
    navigate('/student/notifications');
  };

  // ✅ الذهاب للصفحة المرتبطة بالإشعار
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    
    // تحديد الصفحة بناءً على نوع الإشعار
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

    const path = pathMap[notification.type] || '/student/dashboard';
    navigate(path);
  };

  return (
    <GlassCard
      title="🔔 الإشعارات"
      icon="📬"
      actionLabel="الكل"
      onAction={handleViewAll}
      darkMode={darkMode}
    >
      <Box
        sx={{
          maxHeight: 300,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: darkMode ? '#475569' : '#cbd5e1',
            borderRadius: 10,
          },
        }}
      >
        {notifications.slice(0, 5).map((notification) => (
          <Box
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            sx={{
              p: 1.5,
              borderRadius: 2,
              cursor: 'pointer',
              borderRight: '3px solid',
              borderColor: notification.unread ? '#2563eb' : 'transparent',
              bgcolor: notification.unread
                ? darkMode
                  ? '#334155'
                  : '#eff6ff'
                : darkMode
                ? '#1e293b'
                : '#f8fafc',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: darkMode ? '#475569' : '#f1f5f9',
                transform: 'translateX(-3px)',
              },
            }}
          >
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              fontWeight={notification.unread ? 600 : 400}
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
            >
              {notification.title}
            </Typography>
            <Typography
              variant="caption"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}
            >
              {notification.time}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* View All Button */}
      <Button
        fullWidth
        onClick={handleViewAll}
        sx={{
          mt: 2,
          color: '#2563eb',
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 600,
          '&:hover': {
            bgcolor: darkMode ? '#334155' : '#eff6ff',
          },
        }}
      >
        عرض كل الإشعارات
      </Button>
    </GlassCard>
  );
};

export default Notifications;