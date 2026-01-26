import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  EmojiEvents as EmojiEventsIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import ThemeContext from '../../contexts/ThemeContext';
import { studentData } from '../../data/studentData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTooltip,
  Legend,
  Filler
);

const PerformanceReportPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const stats = [
    { label: 'متوسط الدرجات', value: '88%', icon: StarIcon, color: '#f59e0b', change: '+5%' },
    { label: 'إنجاز الواجبات', value: '92%', icon: CheckCircleIcon, color: '#059669', change: '+3%' },
    { label: 'حضور الحصص', value: '95%', icon: SchoolIcon, color: '#2563eb', change: '+2%' },
    { label: 'ساعات الدراسة', value: '156h', icon: AccessTimeIcon, color: '#7c3aed', change: '+12h' },
  ];

  const rankingData = {
    classRank: 5,
    totalStudents: 156,
    gradeRank: 23,
    totalGradeStudents: 892,
    percentile: 97,
    previousRank: 8,
  };

  const subjectsPerformance = [
    { name: 'الرياضيات', grade: 92, classAvg: 75, trend: 'up', trendValue: '+8%', color: '#2563eb' },
    { name: 'الفيزياء', grade: 85, classAvg: 72, trend: 'up', trendValue: '+5%', color: '#7c3aed' },
    { name: 'الكيمياء', grade: 78, classAvg: 70, trend: 'down', trendValue: '-2%', color: '#059669' },
    { name: 'اللغة الإنجليزية', grade: 88, classAvg: 78, trend: 'up', trendValue: '+3%', color: '#f59e0b' },
    { name: 'اللغة العربية', grade: 95, classAvg: 80, trend: 'up', trendValue: '+4%', color: '#db2777' },
  ];

  const gradesChartData = {
    labels: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الإنجليزية', 'العربية'],
    datasets: [
      {
        label: 'درجاتك',
        data: [92, 85, 78, 88, 95],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderRadius: 8,
      },
      {
        label: 'متوسط الفصل',
        data: [75, 72, 70, 78, 80],
        backgroundColor: 'rgba(148, 163, 184, 0.5)',
        borderRadius: 8,
      },
    ],
  };

  const progressChartData = {
    labels: ['أسبوع 1', 'أسبوع 2', 'أسبوع 3', 'أسبوع 4', 'أسبوع 5', 'أسبوع 6', 'أسبوع 7', 'أسبوع 8'],
    datasets: [
      {
        label: 'الدرجات',
        data: [75, 80, 78, 85, 82, 88, 86, 92],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb',
      },
      {
        label: 'متوسط الفصل',
        data: [70, 72, 71, 73, 72, 74, 73, 75],
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const courseProgressData = {
    labels: ['مكتمل', 'قيد التقدم', 'لم يبدأ'],
    datasets: [
      {
        data: [45, 40, 15],
        backgroundColor: ['#059669', '#f59e0b', '#94a3b8'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Cairo, sans-serif' },
          color: darkMode ? '#94a3b8' : '#64748b',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { family: 'Cairo, sans-serif' },
          color: darkMode ? '#94a3b8' : '#64748b',
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          font: { family: 'Cairo, sans-serif' },
          color: darkMode ? '#94a3b8' : '#64748b',
        },
        grid: { color: darkMode ? '#334155' : '#e5e7eb' },
      },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)',
          color: 'white',
          py: 4,
          px: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={() => navigate('/student/dashboard')}
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
              >
                <ArrowForwardIcon />
              </IconButton>
              <Box>
                <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
                  📊 تقرير الأداء
                </Typography>
                <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                  {studentData.name} • {studentData.level}
                </Typography>
              </Box>
            </Box>

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

          {/* Stats Cards */}
          <Grid container spacing={2}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Grid item xs={6} sm={3} key={index}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Icon sx={{ fontSize: 24 }} />
                      <Chip
                        icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                        label={stat.change}
                        size="small"
                        sx={{
                          bgcolor: '#dcfce7',
                          color: '#059669',
                          fontWeight: 700,
                          height: 22,
                          fontSize: 11,
                          '& .MuiChip-icon': { color: '#059669' },
                        }}
                      />
                    </Box>
                    <Typography variant="h4" fontWeight={900}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Ranking Card */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderRadius: 3,
                p: 3,
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <EmojiEventsIcon sx={{ color: '#f59e0b' }} />
                <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                  الترتيب والتصنيف
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <Typography variant="h3" fontWeight={900} sx={{ color: 'white' }}>
                    #{rankingData.classRank}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                  من أصل {rankingData.totalStudents} طالب في الفصل
                </Typography>
                <Chip
                  icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                  label={`تقدمت ${rankingData.previousRank - rankingData.classRank} مراكز`}
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: '#dcfce7',
                    color: '#059669',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: '#059669' },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
             

                <Box sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                      النسبة المئوية
                    </Typography>
                    <Chip
                      label={`أفضل ${100 - rankingData.percentile}%`}
                      size="small"
                      sx={{
                        bgcolor: '#dbeafe',
                        color: '#2563eb',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Course Progress */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderRadius: 3,
                p: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 3 }}>
                📚 تقدم الكورسات
              </Typography>
              <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                <Doughnut
                  data={courseProgressData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: { family: 'Cairo, sans-serif' },
                          color: darkMode ? '#94a3b8' : '#64748b',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* Grades Comparison */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderRadius: 3,
                p: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 3 }}>
                📈 مقارنة الدرجات
              </Typography>
              <Box sx={{ height: 250 }}>
                <Bar data={gradesChartData} options={chartOptions} />
              </Box>
            </Card>
          </Grid>

          {/* Subjects Performance */}
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderRadius: 3,
                p: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 3 }}>
                📚 أداء المواد
              </Typography>
              <Grid container spacing={2}>
                {subjectsPerformance.map((subject, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: darkMode ? '#334155' : '#f8fafc',
                        borderTop: `4px solid ${subject.color}`,
                        transition: 'all 0.3s ease',
                        '&:hover': { transform: 'translateY(-4px)' },
                      }}
                    >
                      <Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}>
                        {subject.name}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h5" fontWeight={900} sx={{ color: subject.color }}>
                          {subject.grade}%
                        </Typography>
                        <Chip
                          icon={subject.trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 12 }} /> : <TrendingDownIcon sx={{ fontSize: 12 }} />}
                          label={subject.trendValue}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: 10,
                            bgcolor: subject.trend === 'up' ? '#dcfce7' : '#fee2e2',
                            color: subject.trend === 'up' ? '#059669' : '#ef4444',
                            fontWeight: 700,
                            '& .MuiChip-icon': { color: subject.trend === 'up' ? '#059669' : '#ef4444' },
                          }}
                        />
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={subject.grade}
                        sx={{
                          height: 6,
                          borderRadius: 10,
                          bgcolor: darkMode ? '#475569' : '#e2e8f0',
                          mb: 1,
                          '& .MuiLinearProgress-bar': { borderRadius: 10, bgcolor: subject.color },
                        }}
                      />

                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                        متوسط الفصل: {subject.classAvg}%
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Progress Over Time */}
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderRadius: 3,
                p: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 3 }}>
                📊 تطور الأداء عبر الوقت
              </Typography>
              <Box sx={{ height: 280 }}>
                <Line data={progressChartData} options={chartOptions} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PerformanceReportPage;