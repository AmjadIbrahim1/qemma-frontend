import { Box, Typography, List, ListItem, LinearProgress, Chip } from '@mui/material';
import GlassCard from '../../common/GlassCard';
import { getGradesData } from '../../../../data/coursesData';

const Gradebook = ({ courseId, darkMode }) => {
  const grades = getGradesData(courseId);

  // Calculate overall grade
  const gradedItems = grades.filter((g) => g.grade !== null);
  const totalWeightedGrade = gradedItems.reduce((sum, g) => sum + (g.grade * g.weight) / 100, 0);
  const totalWeight = gradedItems.reduce((sum, g) => sum + g.weight, 0);
  const overallGrade = totalWeight > 0 ? Math.round((totalWeightedGrade / totalWeight) * 100) : 0;

  const getTypeConfig = (type) => {
    switch (type) {
      case 'quiz':
        return { label: 'اختبار', color: '#7c3aed' };
      case 'assignment':
        return { label: 'واجب', color: '#2563eb' };
      case 'midterm':
        return { label: 'نصفي', color: '#f59e0b' };
      case 'final':
        return { label: 'نهائي', color: '#ef4444' };
      case 'participation':
        return { label: 'مشاركة', color: '#059669' };
      default:
        return { label: type, color: '#64748b' };
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#059669';
    if (grade >= 80) return '#2563eb';
    if (grade >= 70) return '#7c3aed';
    if (grade >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <GlassCard title="📊 سجل الدرجات" icon="🎯" darkMode={darkMode}>
      {/* Overall Grade */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: 'white',
          textAlign: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h2" fontWeight={900} fontFamily="Cairo, sans-serif">
          {overallGrade}%
        </Typography>
        <Typography fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
          المعدل التراكمي الحالي
        </Typography>
        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.75 }}>
          محسوب من {totalWeight}% من الدرجة الكلية
        </Typography>
      </Box>

      {/* Grades List */}
      <List sx={{ p: 0 }}>
        {grades.map((grade) => {
          const typeConfig = getTypeConfig(grade.type);
          const gradeColor = grade.grade ? getGradeColor(grade.grade) : '#64748b';

          return (
            <ListItem
              key={grade.id}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                border: '1px solid',
                borderColor: darkMode ? '#475569' : '#e5e7eb',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    {grade.title}
                  </Typography>
                  <Chip
                    label={typeConfig.label}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontFamily: 'Cairo, sans-serif',
                      bgcolor: `${typeConfig.color}15`,
                      color: typeConfig.color,
                    }}
                  />
                </Box>

                {grade.grade !== null ? (
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: gradeColor, lineHeight: 1 }}>
                      {grade.grade}/{grade.maxGrade}
                    </Typography>
                  </Box>
                ) : (
                  <Chip
                    label={grade.status === 'upcoming' ? 'قادم' : 'مستمر'}
                    size="small"
                    sx={{
                      bgcolor: '#f59e0b15',
                      color: '#f59e0b',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              {/* Progress Bar */}
              {grade.grade !== null && (
                <Box sx={{ mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(grade.grade / grade.maxGrade) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: darkMode ? '#475569' : '#e2e8f0',
                      '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: gradeColor },
                    }}
                  />
                </Box>
              )}

              {/* Meta */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  📅 {grade.date}
                </Typography>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  الوزن: {grade.weight}%
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </GlassCard>
  );
};

export default Gradebook;