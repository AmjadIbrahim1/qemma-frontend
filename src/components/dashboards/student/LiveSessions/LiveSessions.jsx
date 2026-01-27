import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip } from '@mui/material';
import {
  PlayCircleFilledRounded,
  NotificationsActiveRounded,
  PeopleRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { liveSessionsData } from '../../../../data/studentData';

const gradientMap = {
  1: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  2: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
  3: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
};

const LiveSessions = ({ darkMode }) => {
  const navigate = useNavigate();

  // ✅ الانضمام للحصة - يفتح صفحة منفصلة
  const handleJoinSession = (session) => {
    navigate('/student/live-class', {
      state: {
        session: session,
        joinDirectly: true,
      },
    });
  };

  // ✅ التذكير بالحصة
  const handleReminder = (session) => {
    // حفظ التذكير في localStorage
    const reminders = JSON.parse(localStorage.getItem('sessionReminders') || '[]');
    
    if (!reminders.find(r => r.id === session.id)) {
      reminders.push({
        id: session.id,
        title: session.title,
        time: session.time,
        courseId: session.courseId,
      });
      localStorage.setItem('sessionReminders', JSON.stringify(reminders));
      
      // إظهار رسالة تأكيد
      alert(`✅ تم إضافة تذكير لحصة: ${session.title}`);
    } else {
      alert('⚠️ التذكير موجود بالفعل');
    }
  };

  return (
    <GlassCard
      title="🎥 الحصص المباشرة"
      icon="📺"
      actionLabel="الجدول"
      onAction={() => navigate('/student/live-class')}
      darkMode={darkMode}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {liveSessionsData.map((session) => (
          <Box
            key={session.id}
            sx={{
              background: gradientMap[session.courseId] || gradientMap[1],
              borderRadius: 3,
              p: 2.5,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              },
            }}
          >
            {/* Overlay Pattern */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* Live Badge */}
              {session.isLive && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Chip
                    icon={
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#ef4444',
                          animation: 'blink 1s infinite',
                          '@keyframes blink': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.3 },
                          },
                        }}
                      />
                    }
                    label="مباشر الآن"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  />
                  {session.participants && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PeopleRounded sx={{ fontSize: 16 }} />
                      <Typography variant="caption" fontWeight={600}>
                        {session.participants}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              <Typography
                variant="subtitle1"
                fontWeight={700}
                fontFamily="Cairo, sans-serif"
                sx={{ mb: 0.5 }}
              >
                {session.title}
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9, mb: 0.5 }}
              >
                {session.teacher}
              </Typography>
              <Typography
                variant="caption"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.85, display: 'block', mb: 2 }}
              >
                {session.isLive ? '🔴' : '⏰'} {session.time}
              </Typography>

              {/* Action Button */}
              <Button
                fullWidth
                startIcon={
                  session.isLive ? <PlayCircleFilledRounded /> : <NotificationsActiveRounded />
                }
                onClick={() =>
                  session.isLive ? handleJoinSession(session) : handleReminder(session)
                }
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: '#1e293b',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  borderRadius: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {session.isLive ? '🚀 انضم الآن' : '🔔 تذكيري'}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </GlassCard>
  );
};

export default LiveSessions;