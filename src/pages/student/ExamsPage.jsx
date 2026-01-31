import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Button,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Quiz as QuizIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  Visibility as VisibilityIcon,
  NotificationsActive as NotificationsActiveIcon,
  EmojiEvents as EmojiEventsIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';

const ExamsPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const upcomingExams = [
    {
      id: 1,
      title: 'اختبار الباب الثالث - الرياضيات',
      course: 'الرياضيات',
      date: '2024-12-21',
      time: '10:00 ص',
      duration: '60 دقيقة',
      questionsCount: 25,
      totalMarks: 100,
      type: 'quiz',
      color: '#2563eb',
      isAvailable: true,
    },
    {
      id: 2,
      title: 'امتحان منتصف الفصل - الفيزياء',
      course: 'الفيزياء',
      date: '2024-12-28',
      time: '09:00 ص',
      duration: '90 دقيقة',
      questionsCount: 40,
      totalMarks: 150,
      type: 'midterm',
      color: '#7c3aed',
      isAvailable: false,
    },
  ];

  const completedExams = [
    {
      id: 4,
      title: 'اختبار الباب الأول - الرياضيات',
      course: 'الرياضيات',
      date: '2024-12-01',
      grade: 92,
      totalMarks: 100,
      rank: 5,
      totalStudents: 156,
      color: '#2563eb',
    },
    {
      id: 5,
      title: 'اختبار الميكانيكا',
      course: 'الفيزياء',
      date: '2024-12-10',
      grade: 85,
      totalMarks: 100,
      rank: 12,
      totalStudents: 134,
      color: '#7c3aed',
    },
  ];

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#059669';
    if (grade >= 80) return '#2563eb';
    if (grade >= 70) return '#7c3aed';
    if (grade >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
          color: 'white',
          py: 4,
          px: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton
              onClick={() => navigate('/student/dashboard')}
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
            >
              <ArrowForwardIcon />
            </IconButton>
            <QuizIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
              الاختبارات
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 2, textAlign: 'center' }}>
                <CalendarTodayIcon sx={{ mb: 1 }} />
                <Typography variant="h4" fontWeight={900}>{upcomingExams.length}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>اختبارات قادمة</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 2, textAlign: 'center' }}>
                <CheckCircleIcon sx={{ mb: 1 }} />
                <Typography variant="h4" fontWeight={900}>{completedExams.length}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>اختبارات مكتملة</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 2, textAlign: 'center' }}>
                <TrendingUpIcon sx={{ mb: 1 }} />
                <Typography variant="h4" fontWeight={900}>88%</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>متوسط الدرجات</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 2, textAlign: 'center' }}>
                <EmojiEventsIcon sx={{ mb: 1 }} />
                <Typography variant="h4" fontWeight={900}>#8</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>الترتيب العام</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{
            mb: 3,
            '& .MuiTab-root': { fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 16 },
          }}
        >
          <Tab
            icon={<CalendarTodayIcon />}
            iconPosition="start"
            label={`اختبارات قادمة (${upcomingExams.length})`}
          />
          <Tab
            icon={<CheckCircleIcon />}
            iconPosition="start"
            label={`اختبارات سابقة (${completedExams.length})`}
          />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {upcomingExams.map((exam) => (
              <Grid item xs={12} md={6} lg={4} key={exam.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    borderRadius: 3,
                    borderTop: `4px solid ${exam.color}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: `${exam.color}15`, color: exam.color }}>
                        <QuizIcon />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          {exam.title}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {exam.date} - {exam.time}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {exam.duration} • {exam.questionsCount} سؤال
                        </Typography>
                      </Box>
                    </Box>

                    <Stack spacing={1.5}>
                      {exam.isAvailable ? (
                        <Button
                          fullWidth
                          startIcon={<PlayArrowIcon />}
                          onClick={() => navigate(`/student/exam/${exam.id}/start`)}
                          sx={{
                            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                            color: 'white',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            borderRadius: 2,
                            py: 1.25,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
                            },
                          }}
                        >
                          ابدأ الاختبار
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          startIcon={<NotificationsActiveIcon />}
                          sx={{
                            background: `linear-gradient(135deg, ${exam.color} 0%, ${exam.color}dd 100%)`,
                            color: 'white',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            borderRadius: 2,
                            py: 1.25,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${exam.color}dd 0%, ${exam.color} 100%)`,
                            },
                          }}
                        >
                          ذكّرني
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {completedExams.map((exam) => (
              <Grid item xs={12} md={6} lg={4} key={exam.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>
                          {exam.title}
                        </Typography>
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {exam.course} • {exam.date}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: `${getGradeColor(exam.grade)}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h5" fontWeight={900} sx={{ color: getGradeColor(exam.grade) }}>
                          {exam.grade}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      icon={<EmojiEventsIcon sx={{ fontSize: 16 }} />}
                      label={`الترتيب: ${exam.rank} من ${exam.totalStudents}`}
                      size="small"
                      sx={{
                        bgcolor: '#f59e0b15',
                        color: '#f59e0b',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    />

                    <Button
                      fullWidth
                      startIcon={<VisibilityIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        borderRadius: 2,
                        py: 1.25,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                        },
                      }}
                    >
                      عرض التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ExamsPage;