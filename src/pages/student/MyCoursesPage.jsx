import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  TextField,
  InputAdornment,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  SearchRounded,
  SchoolRounded,
  StarRounded,
  SortRounded,
  PlayCircleFilledRounded,
  ArrowBackRounded,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';
import { coursesData } from '../../data/coursesData';

const colorMap = {
  1: '#2563eb',
  2: '#7c3aed',
  3: '#059669',
  4: '#db2777',
  5: '#0891b2',
  6: '#ca8a04',
};

const MyCoursesPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [sortAnchor, setSortAnchor] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  const filterCourses = () => {
    let filtered = [...coursesData];

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.includes(searchQuery) ||
          course.teacher.includes(searchQuery) ||
          course.category?.includes(searchQuery)
      );
    }

    switch (activeTab) {
      case 1:
        filtered = filtered.filter((c) => c.progress > 0 && c.progress < 100);
        break;
      case 2:
        filtered = filtered.filter((c) => c.progress === 100);
        break;
      case 3:
        filtered = filtered.filter((c) => c.progress === 0);
        break;
      default:
        break;
    }

    switch (sortBy) {
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredCourses = filterCourses();

  const handleSort = (value) => {
    setSortBy(value);
    setSortAnchor(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: 'white',
          py: 4,
          px: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <IconButton
              onClick={() => navigate('/student/dashboard')}
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
            >
              <ArrowBackRounded />
            </IconButton>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
              📚 كورساتي
            </Typography>
          </Box>

          <TextField
            fullWidth
            placeholder="ابحث عن كورس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 500,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 3,
                color: 'white',
                '& fieldset': { border: 'none' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                opacity: 1,
              },
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{
              '& .MuiTab-root': {
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 600,
                color: darkMode ? '#94a3b8' : '#64748b',
                '&.Mui-selected': { color: '#2563eb' },
              },
              '& .MuiTabs-indicator': { bgcolor: '#2563eb' },
            }}
          >
            <Tab label={`الكل (${coursesData.length})`} />
            <Tab label="قيد التقدم" />
            <Tab label="مكتملة" />
            <Tab label="لم تبدأ" />
          </Tabs>

          <Button
            startIcon={<SortRounded />}
            onClick={(e) => setSortAnchor(e.currentTarget)}
            sx={{
              color: darkMode ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
            }}
          >
            ترتيب حسب
          </Button>
          <Menu
            anchorEl={sortAnchor}
            open={Boolean(sortAnchor)}
            onClose={() => setSortAnchor(null)}
          >
            <MenuItem onClick={() => handleSort('recent')}>الأحدث</MenuItem>
            <MenuItem onClick={() => handleSort('progress')}>التقدم</MenuItem>
            <MenuItem onClick={() => handleSort('name')}>الاسم</MenuItem>
            <MenuItem onClick={() => handleSort('rating')}>التقييم</MenuItem>
          </Menu>
        </Box>

        <Grid container spacing={3}>
          {filteredCourses.map((course) => {
            const color = colorMap[course.id] || '#64748b';

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <Card
                  elevation={0}
                  onClick={() => navigate(`/student/course/${course.id}`)}
                  sx={{
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: color,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${color}20`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 120,
                      background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <SchoolRounded sx={{ fontSize: 48, color: 'white', opacity: 0.9 }} />
                    <Chip
                      label={`${course.progress}%`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'white',
                        color: color,
                        fontWeight: 700,
                        fontFamily: 'Cairo, sans-serif',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      noWrap
                      sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}
                    >
                      {course.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 2 }}
                    >
                      {course.teacher}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: darkMode ? '#334155' : '#e2e8f0',
                        mb: 2,
                        '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: color },
                      }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarRounded sx={{ fontSize: 16, color: '#fbbf24' }} />
                        <Typography variant="caption" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          {course.rating}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                        {course.completedLessons}/{course.totalLessons} درس
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      startIcon={<PlayCircleFilledRounded />}
                      sx={{
                        bgcolor: `${color}15`,
                        color: color,
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        borderRadius: 2,
                        '&:hover': { bgcolor: color, color: 'white' },
                      }}
                    >
                      {course.progress === 0 ? 'ابدأ الآن' : course.progress === 100 ? 'مراجعة' : 'استمر'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {filteredCourses.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 2 }}>
              😕 لا توجد كورسات
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MyCoursesPage;