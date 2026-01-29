import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Card,
  List,
  ListItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  PlayCircleFilledRounded,
  PauseCircleFilledRounded,
  CheckCircleRounded,
  DescriptionRounded,
  QuizRounded,
  FullscreenRounded,
  VolumeUpRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';
import { getCourseById, getCurriculumData } from '../../data/coursesData';

const LessonPage = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const location = useLocation();
  const { darkMode } = useTheme();
  
  const course = getCourseById(courseId);
  const curriculum = getCurriculumData(courseId);
  const lesson = location.state?.lesson;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [activeTab, setActiveTab] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Get all lessons flat
  const allLessons = curriculum.flatMap(unit => unit.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      if (nextLesson && nextLesson.status !== 'locked') {
        navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`, {
          state: { lesson: nextLesson },
        });
      } else {
        navigate(`/student/course/${courseId}`);
      }
    }, 2000);
  };

  const notes = [
    'النقاط الأساسية في هذا الدرس...',
    'تعريف المفهوم الأول...',
    'خطوات الحل: 1. ... 2. ... 3. ...',
    'ملاحظة مهمة: ...',
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#1e293b' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate(`/student/course/${courseId}`)}
            sx={{ color: 'white' }}
          >
            <ArrowBackRounded />
          </IconButton>
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }} fontFamily="Cairo, sans-serif">
              {course?.title}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }} fontFamily="Cairo, sans-serif">
              {lesson?.title || `الدرس ${lessonId}`}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`${progress}% مكتمل`}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: 'Cairo, sans-serif',
            }}
          />
        </Box>
      </Box>

      {/* Video Player Area */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          aspectRatio: '16/9',
          bgcolor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {completed ? (
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <CheckCircleRounded sx={{ fontSize: 80, color: '#059669', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} fontFamily="Cairo, sans-serif">
              أحسنت! 🎉
            </Typography>
            <Typography fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>
              لقد أكملت هذا الدرس بنجاح
            </Typography>
          </Box>
        ) : (
          <>
            {/* Placeholder for video */}
            <Typography variant="h3" sx={{ color: 'rgba(255,255,255,0.3)' }}>
              🎬
            </Typography>

            {/* Play Button Overlay */}
            <IconButton
              onClick={() => setIsPlaying(!isPlaying)}
              sx={{
                position: 'absolute',
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}
            >
              {isPlaying ? (
                <PauseCircleFilledRounded sx={{ fontSize: 60 }} />
              ) : (
                <PlayCircleFilledRounded sx={{ fontSize: 60 }} />
              )}
            </IconButton>
          </>
        )}

        {/* Video Controls */}
        {!completed && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 1,
                height: 4,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': { bgcolor: '#2563eb' },
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton sx={{ color: 'white' }} onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <VolumeUpRounded />
                </IconButton>
                <Typography variant="caption" sx={{ color: 'white' }}>
                  15:30 / 45:00
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton sx={{ color: 'white' }}>
                  <SettingsRounded />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <FullscreenRounded />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Content Below Video */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              sx={{
                mb: 2,
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Cairo, sans-serif',
                  '&.Mui-selected': { color: 'white' },
                },
                '& .MuiTabs-indicator': { bgcolor: '#2563eb' },
              }}
            >
              <Tab icon={<DescriptionRounded />} label="الملاحظات" iconPosition="start" />
              <Tab icon={<QuizRounded />} label="اختبار قصير" iconPosition="start" />
            </Tabs>

            {activeTab === 0 && (
              <Card
                elevation={0}
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#334155',
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: 'white', mb: 2 }}>
                  📝 ملاحظات الدرس
                </Typography>
                <List sx={{ p: 0 }}>
                  {notes.map((note, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        • {note}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Card>
            )}

            {activeTab === 1 && (
              <Card
                elevation={0}
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#334155',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <QuizRounded sx={{ fontSize: 48, color: '#f59e0b', mb: 2 }} />
                <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: 'white', mb: 1 }}>
                  اختبار قصير
                </Typography>
                <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                  اختبر فهمك للدرس - 5 أسئلة سريعة
                </Typography>
                <Button
                  startIcon={<PlayCircleFilledRounded />}
                  sx={{
                    bgcolor: '#f59e0b',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 4,
                    '&:hover': { bgcolor: '#d97706' },
                  }}
                >
                  ابدأ الاختبار
                </Button>
              </Card>
            )}
          </Box>

          {/* Sidebar - Navigation */}
          <Card
            elevation={0}
            sx={{
              width: { xs: '100%', md: 300 },
              bgcolor: darkMode ? '#1e293b' : '#334155',
              borderRadius: 2,
              p: 2,
              height: 'fit-content',
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: 'white', mb: 2 }}>
              التنقل بين الدروس
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {prevLesson && (
                <Button
                  fullWidth
                  startIcon={<ArrowForwardRounded />}
                  onClick={() => navigate(`/student/course/${courseId}/lesson/${prevLesson.id}`, { state: { lesson: prevLesson } })}
                  disabled={prevLesson.status === 'locked'}
                  sx={{
                    justifyContent: 'flex-start',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  {prevLesson.title}
                </Button>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleComplete}
                sx={{
                  bgcolor: '#059669',
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': { bgcolor: '#047857' },
                }}
              >
                ✓ إنهاء الدرس
              </Button>

              {nextLesson && (
                <Button
                  fullWidth
                  endIcon={<ArrowBackRounded />}
                  onClick={() => navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`, { state: { lesson: nextLesson } })}
                  disabled={nextLesson.status === 'locked'}
                  sx={{
                    justifyContent: 'flex-start',
                    bgcolor: '#2563eb',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#1d4ed8' },
                    '&:disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' },
                  }}
                >
                  {nextLesson.title}
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default LessonPage;