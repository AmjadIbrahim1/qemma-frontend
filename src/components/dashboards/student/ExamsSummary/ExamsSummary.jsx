import { Box, Typography } from '@mui/material';
import { QuizRounded } from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { recentExamsData } from '../../../../data/studentData';

const ExamsSummary = ({ darkMode }) => {
  const getGradeColor = (grade) => {
    if (grade >= 90) return { color: '#059669', bgColor: '#ecfdf5' };
    if (grade >= 80) return { color: '#2563eb', bgColor: '#eff6ff' };
    if (grade >= 70) return { color: '#7c3aed', bgColor: '#f5f3ff' };
    return { color: '#f59e0b', bgColor: '#fffbeb' };
  };

  return (
    <GlassCard
      title="📊 نتائج الاختبارات الأخيرة"
      icon="🎯"
      actionLabel="جميع النتائج"
      onAction={() => {}}
      darkMode={darkMode}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {recentExamsData.map((exam) => {
          const gradeColors = getGradeColor(exam.grade);

          return (
            <Box
              key={exam.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: darkMode ? '#475569' : '#f1f5f9',
                  transform: 'translateX(-3px)',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                <QuizRounded sx={{ fontSize: 22 }} />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  fontFamily="Cairo, sans-serif"
                  noWrap
                  sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
                >
                  {exam.title}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                >
                  {exam.courseName} • {exam.date}
                </Typography>
              </Box>

              {/* Grade */}
              <Box
                sx={{
                  bgcolor: darkMode ? '#475569' : gradeColors.bgColor,
                  color: gradeColors.color,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                  fontFamily="Cairo, sans-serif"
                  sx={{ lineHeight: 1 }}
                >
                  {exam.grade}%
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </GlassCard>
  );
};

export default ExamsSummary;