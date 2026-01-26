import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Avatar,
} from '@mui/material';
import {
  ArrowBackRounded,
  PlayCircleFilledRounded,
  PeopleRounded,
  AccessTimeRounded,
  CalendarTodayRounded,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';
import InRoomPanel from '../../components/dashboards/course/InRoomPanel';
import { liveSessionsData } from '../../data/studentData';

const LiveClassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();

  const sessionFromNav = location.state?.session;
  const [inSession, setInSession] = useState(!!sessionFromNav);
  const [currentSession, setCurrentSession] = useState(sessionFromNav || null);

  const handleJoinSession = (session) => {
    setCurrentSession(session);
    setInSession(true);
  };

  const handleLeaveSession = () => {
    setInSession(false);
    setCurrentSession(null);
  };

  if (inSession && currentSession) {
    return <InRoomPanel session={currentSession} onLeave={handleLeaveSession} darkMode={darkMode} />;
  }

  const gradientMap = {
    1: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    2: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    3: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)',
          color: 'white',
          py: 4,
          px: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button startIcon={<ArrowBackRounded />} onClick={() => navigate('/student/dashboard')} sx={{ color: 'white' }}>
              العودة
            </Button>
          </Box>
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">🎥 الحصص المباشرة</Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {liveSessionsData.filter((s) => s.isLive).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>🔴 مباشر الآن</Typography>
            <Grid container spacing={3}>
              {liveSessionsData.filter((s) => s.isLive).map((session) => (
                <Grid item xs={12} md={6} lg={4} key={session.id}>
                  <Card elevation={0} sx={{ background: gradientMap[session.courseId] || gradientMap[1], borderRadius: 3, p: 3, color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Chip
                          icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444', animation: 'blink 1s infinite', '@keyframes blink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />}
                          label="مباشر الآن"
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PeopleRounded sx={{ fontSize: 16 }} />
                          <Typography variant="caption" fontWeight={600}>{session.participants}</Typography>
                        </Box>
                      </Box>

                      <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>{session.title}</Typography>
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9, mb: 3 }}>{session.teacher}</Typography>

                      <Button
                        fullWidth
                        startIcon={<PlayCircleFilledRounded />}
                        onClick={() => handleJoinSession(session)}
                        sx={{ bgcolor: 'rgba(255,255,255,0.95)', color: '#1e293b', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, py: 1.5, '&:hover': { bgcolor: 'white' } }}
                      >
                        🚀 انضم الآن
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box>
          <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>📅 الحصص القادمة</Typography>
          <Grid container spacing={3}>
            {liveSessionsData.filter((s) => !s.isLive).map((session) => (
              <Grid item xs={12} md={6} lg={4} key={session.id}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 3, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#7c3aed15', color: '#7c3aed' }}>{session.teacher?.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{session.title}</Typography>
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{session.teacher}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayRounded sx={{ fontSize: 16, color: darkMode ? '#94a3b8' : '#64748b' }} />
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{session.time}</Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ borderColor: '#7c3aed', color: '#7c3aed', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#7c3aed', color: 'white' } }}
                  >
                    🔔 تذكيري
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LiveClassPage;