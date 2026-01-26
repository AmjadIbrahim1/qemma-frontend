import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import {
  AssignmentTurnedInRounded,
  VideocamRounded,
  GradeRounded,
  AccessTimeRounded,
  TrendingUpRounded,
  TrendingDownRounded,
} from '@mui/icons-material';
import { kpisData } from '../../../../data/studentData';

const iconMap = {
  homework: AssignmentTurnedInRounded,
  attendance: VideocamRounded,
  grade: GradeRounded,
  studyTime: AccessTimeRounded,
};

const colorMap = {
  homework: { color: '#059669', bgColor: '#ecfdf5' },
  attendance: { color: '#2563eb', bgColor: '#eff6ff' },
  grade: { color: '#7c3aed', bgColor: '#f5f3ff' },
  studyTime: { color: '#db2777', bgColor: '#fdf2f8' },
};

const KPIs = ({ darkMode }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {kpisData.map((kpi) => {
        const IconComponent = iconMap[kpi.type];
        const colors = colorMap[kpi.type];

        return (
          <Grid item xs={6} sm={6} md={3} key={kpi.id}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: darkMode
                    ? '0 10px 20px rgba(0,0,0,0.3)'
                    : '0 10px 20px rgba(0,0,0,0.1)',
                  borderColor: colors.color,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2,
                    bgcolor: colors.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.color,
                    mb: 2,
                  }}
                >
                  <IconComponent sx={{ fontSize: 28 }} />
                </Box>

                {/* Value */}
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}
                >
                  {kpi.value}
                </Typography>

                {/* Label */}
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1.5 }}
                >
                  {kpi.label}
                </Typography>

                {/* Trend */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 5,
                    bgcolor: kpi.trend === 'up' ? '#ecfdf5' : '#fef2f2',
                    color: kpi.trend === 'up' ? '#059669' : '#dc2626',
                  }}
                >
                  {kpi.trend === 'up' ? (
                    <TrendingUpRounded sx={{ fontSize: 16 }} />
                  ) : (
                    <TrendingDownRounded sx={{ fontSize: 16 }} />
                  )}
                  <Typography variant="caption" fontWeight={700} fontFamily="Cairo, sans-serif">
                    {kpi.trendValue}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default KPIs;