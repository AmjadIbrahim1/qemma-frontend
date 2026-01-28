import { Box, Typography, Grid, LinearProgress, Chip } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';

const StrengthWeakness = ({ darkMode }) => {
  const strengthsData = [
    {
      id: 1,
      subject: 'التفاضل والتكامل',
      topic: 'الرياضيات',
      score: 94,
      trend: 'up',
      trendValue: '+8%',
    },
    {
      id: 2,
      subject: 'الميكانيكا',
      topic: 'الفيزياء',
      score: 89,
      trend: 'up',
      trendValue: '+5%',
    },
    {
      id: 3,
      subject: 'المعادلات الكيميائية',
      topic: 'الكيمياء',
      score: 86,
      trend: 'up',
      trendValue: '+2%',
    },
  ];

  const weaknessesData = [
    {
      id: 1,
      subject: 'الهندسة الفراغية',
      topic: 'الرياضيات',
      score: 58,
      trend: 'up',
      trendValue: '+12%',
    },
    {
      id: 2,
      subject: 'الكهرومغناطيسية',
      topic: 'الفيزياء',
      score: 52,
      trend: 'down',
      trendValue: '-2%',
    },
    {
      id: 3,
      subject: 'الكيمياء العضوية',
      topic: 'الكيمياء',
      score: 61,
      trend: 'up',
      trendValue: '+3%',
    },
  ];

  return (
    <GlassCard title="تحليل الأداء" icon="🧠" darkMode={darkMode}>
      {/* Analysis Badge */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
          p: 1.5,
          borderRadius: 2,
          bgcolor: darkMode ? '#334155' : '#f8fafc',
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 18, color: '#7c3aed' }} />
        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
          تحليل مبني على 437 سؤال • آخر تحديث: اليوم
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Strengths */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}
            >
              💪
            </Box>
            <Typography variant="subtitle2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
              نقاط القوة
            </Typography>
          </Box>

          {strengthsData.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f0fdf4',
                borderRight: '4px solid #059669',
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box>
                  <Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    {item.subject}
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    {item.topic}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                    label={item.trendValue}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: 11,
                      bgcolor: '#dcfce7',
                      color: '#059669',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                      '& .MuiChip-icon': { color: '#059669' },
                    }}
                  />
                  <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
                    {item.score}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.score}
                sx={{
                  height: 6,
                  borderRadius: 10,
                  bgcolor: darkMode ? '#475569' : '#dcfce7',
                  '& .MuiLinearProgress-bar': { borderRadius: 10, bgcolor: '#059669' },
                }}
              />
            </Box>
          ))}
        </Grid>

        {/* Weaknesses */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}
            >
              🎯
            </Box>
            <Typography variant="subtitle2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: '#f59e0b' }}>
              يحتاج تحسين
            </Typography>
          </Box>

          {weaknessesData.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#fffbeb',
                borderRight: '4px solid #f59e0b',
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box>
                  <Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    {item.subject}
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    {item.topic}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    icon={item.trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
                    label={item.trendValue}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: 11,
                      bgcolor: item.trend === 'up' ? '#dcfce7' : '#fee2e2',
                      color: item.trend === 'up' ? '#059669' : '#ef4444',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                      '& .MuiChip-icon': { color: item.trend === 'up' ? '#059669' : '#ef4444' },
                    }}
                  />
                  <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: '#f59e0b' }}>
                    {item.score}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.score}
                sx={{
                  height: 6,
                  borderRadius: 10,
                  bgcolor: darkMode ? '#475569' : '#fef3c7',
                  '& .MuiLinearProgress-bar': { borderRadius: 10, bgcolor: '#f59e0b' },
                }}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </GlassCard>
  );
};

export default StrengthWeakness;