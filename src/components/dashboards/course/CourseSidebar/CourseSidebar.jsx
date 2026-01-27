import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Avatar, LinearProgress, Grid } from '@mui/material';
import {
  PlayCircleFilledRounded,
  ChatRounded,
  StarRounded,
  PeopleRounded,
  AccessTimeRounded,
  MenuBookRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getCurriculumData } from '../../../../data/coursesData';

const CourseSidebar = ({ course, darkMode }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  if (!course) return null;

  // جلب أول درس متاح
  const getNextAvailableLesson = () => {
    const curriculum = getCurriculumData(courseId);
    for (const unit of curriculum) {
      for (const lesson of unit.lessons) {
        if (lesson.status === 'available') {
          return lesson;
        }
      }
    }
    return null;
  };

  const nextLesson = getNextAvailableLesson();

  // زرار تواصل مع المدرس → صفحة AskTeacherPage
  const handleContactTeacher = () => {
    navigate(`/student/course/${courseId}/ask-teacher`);
  };

  // زرار ابدأ الدرس → صفحة LessonPage
  const handleStartLesson = () => {
    if (nextLesson) {
      navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`, {
        state: { lesson: nextLesson },
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Course Stats */}
      <GlassCard title="📊 إحصائيات الكورس" darkMode={darkMode}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Progress */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
              >
                التقدم الكلي
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                fontFamily="Cairo, sans-serif"
                sx={{ color: '#2563eb' }}
              >
                {course.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: darkMode ? '#334155' : '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: '#2563eb',
                },
              }}
            />
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? '#334155' : '#ecfdf5',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: '#059669' }}
                >
                  {course.completedLessons}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#94a3b8' : '#059669' }}
                >
                  دروس مكتملة
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? '#334155' : '#f5f3ff',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: '#7c3aed' }}
                >
                  {course.totalLessons - course.completedLessons}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#94a3b8' : '#7c3aed' }}
                >
                  دروس متبقية
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? '#334155' : '#fffbeb',
                  textAlign: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <StarRounded sx={{ color: '#f59e0b', fontSize: 20 }} />
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: '#f59e0b' }}
                  >
                    {course.rating}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#94a3b8' : '#f59e0b' }}
                >
                  التقييم
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? '#334155' : '#eff6ff',
                  textAlign: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <PeopleRounded sx={{ color: '#2563eb', fontSize: 20 }} />
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: '#2563eb' }}
                  >
                    {course.studentsCount}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#94a3b8' : '#2563eb' }}
                >
                  طالب
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Duration */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              p: 1.5,
              borderRadius: 2,
              bgcolor: darkMode ? '#334155' : '#f8fafc',
            }}
          >
            <AccessTimeRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
            <Typography
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
            >
              مدة الكورس: <strong>{course.duration}</strong>
            </Typography>
          </Box>
        </Box>
      </GlassCard>

      {/* Teacher Info */}
      <GlassCard title="👨‍🏫 المدرس" darkMode={darkMode}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={course.teacherAvatar}
            sx={{
              width: 64,
              height: 64,
              bgcolor: '#7c3aed',
              fontSize: 24,
              fontWeight: 700,
              fontFamily: 'Cairo, sans-serif',
            }}
          >
            {course.teacher?.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography
              fontWeight={700}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
            >
              {course.teacher}
            </Typography>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1.5 }}
            >
              مدرس {course.category}
            </Typography>
            <Button
              fullWidth
              startIcon={<ChatRounded />}
              onClick={handleContactTeacher}
              sx={{
                bgcolor: '#7c3aed15',
                color: '#7c3aed',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': { bgcolor: '#7c3aed', color: 'white' },
              }}
            >
              تواصل مع المدرس
            </Button>
          </Box>
        </Box>
      </GlassCard>

      {/* Next Lesson Card */}
      {(course.nextLesson || nextLesson) && (
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <MenuBookRounded sx={{ fontSize: 20, opacity: 0.9 }} />
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9 }}
              >
                الدرس التالي
              </Typography>
            </Box>
            <Typography
              variant="h6"
              fontWeight={700}
              fontFamily="Cairo, sans-serif"
              sx={{ mb: 2 }}
            >
              {nextLesson?.title || course.nextLesson}
            </Typography>
            <Button
              fullWidth
              startIcon={<PlayCircleFilledRounded />}
              onClick={handleStartLesson}
              sx={{
                bgcolor: 'rgba(255,255,255,0.95)',
                color: '#1e293b',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
                borderRadius: 2,
                py: 1.2,
                '&:hover': { bgcolor: 'white' },
              }}
            >
              🚀 ابدأ الدرس الآن
            </Button>
          </Box>
        </Box>
      )}

      {/* Course Info */}
      <GlassCard title="ℹ️ معلومات الكورس" darkMode={darkMode}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
            >
              المستوى
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
            >
              {course.level}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
            >
              اللغة
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
            >
              {course.language}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
            >
              الفئة
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
            >
              {course.category}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
            >
              شهادة إتمام
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              fontFamily="Cairo, sans-serif"
              sx={{ color: course.certificate ? '#059669' : '#ef4444' }}
            >
              {course.certificate ? '✓ متاحة' : '✗ غير متاحة'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
            >
              عدد التقييمات
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
            >
              {course.reviewsCount} تقييم
            </Typography>
          </Box>
        </Box>
      </GlassCard>
    </Box>
  );
};

export default CourseSidebar;