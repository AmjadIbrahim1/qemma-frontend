import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip } from '@mui/material';
import {
  PlayCircleFilledRounded,
  NotificationsActiveRounded,
  PeopleRounded,
  AccessTimeRounded,
  OndemandVideoRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getCourseLiveSessionsData } from '../../../../data/coursesData';

const CourseLiveSessions = ({ courseId, darkMode }) => {
  const navigate = useNavigate();
  const liveSessions = getCourseLiveSessionsData(courseId);

  // ✅ الانضمام للحصة - يفتح صفحة منفصلة
  const handleJoinSession = (session) => {
    navigate('/student/live-class', {
      state: {
        session: session,
        joinDirectly: true,
        courseId: courseId,
      },
    });
  };

  // ✅ مشاهدة التسجيل
  const handleWatchRecording = (session) => {
    navigate(`/student/course/${courseId}/recording/${session.id}`, {
      state: { session },
    });
  };

  // ✅ التذكير بالحصة
  const handleReminder = (session) => {
    const reminders = JSON.parse(localStorage.getItem('sessionReminders') || '[]');
    
    if (!reminders.find(r => r.id === session.id)) {
      reminders.push({
        id: session.id,
        title: session.title,
        date: session.date,
        courseId: courseId,
      });
      localStorage.setItem('sessionReminders', JSON.stringify(reminders));
      alert(`✅ تم إضافة تذكير لحصة: ${session.title}`);
    } else {
      alert('⚠️ التذكير موجود بالفعل');
    }
  };

  return (
    <GlassCard title="🎥 الحصص المباشرة" icon="📺" darkMode={darkMode}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {liveSessions.map((session) => (
          <Box
            key={session.id}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: session.isLive
                ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                : darkMode
                ? '#334155'
                : '#f8fafc',
              background: session.isLive
                ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                : undefined,
              border: session.isLive ? 'none' : '1px solid',
              borderColor: darkMode ? '#475569' : '#e5e7eb',
              color: session.isLive ? 'white' : darkMode ? '#f1f5f9' : '#1e293b',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              },
            }}
          >
            {/* Overlay for live sessions */}
            {session.isLive && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                }}
              />
            )}

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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleRounded sx={{ fontSize: 16 }} />
                    <Typography variant="caption" fontWeight={600}>
                      {session.participants}/{session.maxParticipants}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Recorded Badge */}
              {session.isRecorded && (
                <Chip
                  icon={<OndemandVideoRounded sx={{ fontSize: 14 }} />}
                  label="تسجيل متاح"
                  size="small"
                  sx={{
                    mb: 1.5,
                    bgcolor: '#059669',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                />
              )}

              <Typography variant="subtitle1" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 0.5 }}>
                {session.title}
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.85, mb: 1 }}
              >
                {session.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeRounded sx={{ fontSize: 16 }} />
                  <Typography variant="caption" fontFamily="Cairo, sans-serif">
                    {session.date}
                  </Typography>
                </Box>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.85 }}>
                  ⏱️ {session.duration}
                </Typography>
              </Box>

              {/* Materials */}
              {session.materials?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {session.materials.map((material, index) => (
                    <Chip
                      key={index}
                      label={material}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: 10,
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: session.isLive ? 'rgba(255,255,255,0.2)' : darkMode ? '#475569' : '#e2e8f0',
                        color: session.isLive ? 'white' : darkMode ? '#e2e8f0' : '#64748b',
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Action Button */}
              <Button
                fullWidth
                startIcon={
                  session.isLive ? (
                    <PlayCircleFilledRounded />
                  ) : session.isRecorded ? (
                    <OndemandVideoRounded />
                  ) : (
                    <NotificationsActiveRounded />
                  )
                }
                onClick={() => 
                  session.isLive 
                    ? handleJoinSession(session) 
                    : session.isRecorded 
                    ? handleWatchRecording(session) 
                    : handleReminder(session)
                }
                sx={{
                  bgcolor: session.isLive ? 'rgba(255,255,255,0.95)' : '#2563eb',
                  color: session.isLive ? '#1e293b' : 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  borderRadius: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: session.isLive ? 'white' : '#1d4ed8',
                  },
                }}
              >
                {session.isLive ? '🚀 انضم الآن' : session.isRecorded ? '▶️ شاهد التسجيل' : '🔔 تذكيري'}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </GlassCard>
  );
};

export default CourseLiveSessions;