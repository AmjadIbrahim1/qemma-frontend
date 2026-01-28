import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Avatar, LinearProgress } from '@mui/material';
import { SchoolRounded, StarRounded } from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { coursesData } from '../../../../data/coursesData';

const colorMap = {
  1: '#2563eb',
  2: '#7c3aed',
  3: '#059669',
  4: '#db2777',
  5: '#0891b2',
  6: '#ca8a04',
};

const gradientMap = {
  1: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  2: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
  3: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  4: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
  5: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
  6: 'linear-gradient(135deg, #ca8a04 0%, #a16207 100%)',
};

const CoursesList = ({ darkMode }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/student/course/${courseId}`);
  };

  const handleViewAll = () => {
    navigate('/student/courses');
  };

  return (
    <GlassCard
      title="📚 كورساتي"
      icon="🎓"
      actionLabel="عرض الكل"
      onAction={handleViewAll}
      darkMode={darkMode}
    >
      <Grid container spacing={2}>
        {coursesData.slice(0, 4).map((course) => {
          const color = colorMap[course.id] || '#64748b';
          const gradient = gradientMap[course.id] || gradientMap[1];

          return (
            <Grid item xs={12} sm={6} key={course.id}>
              <Card
                elevation={0}
                onClick={() => handleCourseClick(course.id)}
                sx={{
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: darkMode ? '#334155' : '#e5e7eb',
                  bgcolor: darkMode ? '#334155' : '#f8fafc',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 10px 25px ${color}25`,
                  },
                }}
              >
                {/* Top Gradient Bar */}
                <Box sx={{ height: 6, background: gradient }} />

                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: `${color}15`, color: color }}>
                      <SchoolRounded />
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        noWrap
                        sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                      >
                        {course.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                      >
                        {course.teacher}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Progress */}
                  <Box sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                      >
                        التقدم
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: color }}
                      >
                        {course.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: darkMode ? '#475569' : '#e2e8f0',
                        '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: color },
                      }}
                    />
                  </Box>

                  {/* Footer */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarRounded sx={{ fontSize: 16, color: '#fbbf24' }} />
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                      >
                        {course.rating}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                    >
                      {course.completedLessons}/{course.totalLessons} درس
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </GlassCard>
  );
};

export default CoursesList;