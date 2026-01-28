import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  HomeRounded,
  NavigateBeforeRounded,
  PeopleRounded,
  AccessTimeRounded,
  StarRounded,
  BookmarkBorderRounded,
  ShareRounded,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import ThemeContext from '../../../../contexts/ThemeContext';

const CourseHeader = ({ course }) => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  if (!course) return null;

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
        color: 'white',
        py: 4,
        px: 2,
        mb: 3,
      }}
    >
      <Container maxWidth="xl">
        {/* Breadcrumb + Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Breadcrumbs
            separator={<NavigateBeforeRounded sx={{ fontSize: 18 }} />}
            sx={{
              '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.6)' },
            }}
          >
            <Link
              underline="hover"
              onClick={() => navigate('/student/dashboard')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif',
                '&:hover': { color: 'white' },
              }}
            >
              <HomeRounded sx={{ fontSize: 18 }} />
              الرئيسية
            </Link>
            <Link
              underline="hover"
              onClick={() => navigate('/student/courses')}
              sx={{
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif',
                '&:hover': { color: 'white' },
              }}
            >
              كورساتي
            </Link>
            <Typography fontFamily="Cairo, sans-serif" fontWeight={600} sx={{ color: 'white' }}>
              {course.shortTitle || course.title}
            </Typography>
          </Breadcrumbs>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            
            <Tooltip title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Course Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: 1, minWidth: 300 }}>
            {/* Title */}
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
              {course.title}
            </Typography>

            {/* Teacher */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar
                src={course.teacherAvatar}
                sx={{ width: 48, height: 48, bgcolor: 'rgba(255,255,255,0.2)' }}
              >
                {course.teacher?.charAt(0)}
              </Avatar>
              <Box>
                <Typography fontFamily="Cairo, sans-serif" fontWeight={600}>
                  {course.teacher}
                </Typography>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>
                  المدرس
                </Typography>
              </Box>
            </Box>

            {/* Stats Chips */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
              <Chip
                icon={<PeopleRounded sx={{ fontSize: 16, color: 'white !important' }} />}
                label={`${course.studentsCount || 0} طالب`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<AccessTimeRounded sx={{ fontSize: 16, color: 'white !important' }} />}
                label={course.duration || 'غير محدد'}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<StarRounded sx={{ fontSize: 16, color: '#fbbf24 !important' }} />}
                label={`${course.rating || 0} (${course.reviewsCount || 0} تقييم)`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Progress */}
            <Box sx={{ maxWidth: 400 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontFamily="Cairo, sans-serif">
                  التقدم في الكورس
                </Typography>
                <Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif">
                  {course.progress || 0}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={course.progress || 0}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: 'white' },
                }}
              />
              <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9, mt: 0.5, display: 'block' }}>
                {course.completedLessons || 0} من {course.totalLessons || 0} درس مكتمل
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CourseHeader;