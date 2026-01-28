import { Box, Typography, List, ListItem, Button, Chip } from '@mui/material';
import {
  QuizRounded,
  ScheduleRounded,
  PlayArrowRounded,
  VisibilityRounded,
  AccessTimeRounded,
  HelpOutlineRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getExamsData } from '../../../../data/coursesData';

const CourseExams = ({ courseId, darkMode }) => {
  const exams = getExamsData(courseId);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming':
        return { label: 'قادم', color: '#f59e0b', bgColor: '#fffbeb' };
      case 'completed':
        return { label: 'مكتمل', color: '#059669', bgColor: '#ecfdf5' };
      case 'in-progress':
        return { label: 'جاري', color: '#2563eb', bgColor: '#eff6ff' };
      default:
        return { label: status, color: '#64748b', bgColor: '#f8fafc' };
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'quiz':
        return 'اختبار قصير';
      case 'midterm':
        return 'امتحان نصفي';
      case 'final':
        return 'امتحان نهائي';
      default:
        return type;
    }
  };

  return (
    <GlassCard title="📊 الاختبارات" icon="🎯" darkMode={darkMode}>
      <List sx={{ p: 0 }}>
        {exams.map((exam) => {
          const statusConfig = getStatusConfig(exam.status);

          return (
            <ListItem
              key={exam.id}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                border: '1px solid',
                borderColor: darkMode ? '#475569' : '#e5e7eb',
                borderRight: `4px solid ${statusConfig.color}`,
                flexDirection: 'column',
                alignItems: 'stretch',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: darkMode ? '#475569' : '#f1f5f9',
                  transform: 'translateX(-5px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: `${statusConfig.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: statusConfig.color,
                    flexShrink: 0,
                  }}
                >
                  <QuizRounded />
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                      {exam.title}
                    </Typography>
                    <Chip
                      label={getTypeLabel(exam.type)}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#475569' : '#e2e8f0',
                        color: darkMode ? '#e2e8f0' : '#64748b',
                      }}
                    />
                  </Box>

                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}>
                    {exam.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ScheduleRounded sx={{ fontSize: 14, color: '#7c3aed' }} />
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                        {exam.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeRounded sx={{ fontSize: 14, color: '#2563eb' }} />
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                        {exam.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <HelpOutlineRounded sx={{ fontSize: 14, color: '#f59e0b' }} />
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                        {exam.questionsCount} سؤال
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Status & Actions */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <Chip
                    label={statusConfig.label}
                    size="small"
                    sx={{
                      bgcolor: darkMode ? '#475569' : statusConfig.bgColor,
                      color: statusConfig.color,
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 600,
                    }}
                  />

                  {exam.status === 'upcoming' && (
                    <Button
                      startIcon={<ScheduleRounded />}
                      size="small"
                      sx={{
                        bgcolor: statusConfig.color,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': { bgcolor: statusConfig.color, opacity: 0.9 },
                      }}
                    >
                      تذكيري
                    </Button>
                  )}

                  {exam.status === 'completed' && (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: '#059669', lineHeight: 1 }}>
                        {exam.grade}%
                      </Typography>
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                        الترتيب: {exam.rank}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Topics */}
              {exam.topics && exam.status === 'upcoming' && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    المواضيع:
                  </Typography>
                  {exam.topics.map((topic, index) => (
                    <Chip
                      key={index}
                      label={topic}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: '#7c3aed15',
                        color: '#7c3aed',
                      }}
                    />
                  ))}
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>
    </GlassCard>
  );
};

export default CourseExams;