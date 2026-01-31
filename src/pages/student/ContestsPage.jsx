// frontend/src/pages/student/ContestsPage.jsx - All Golden Contests View - Grade 3
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Badge,
} from '@mui/material';
import {
  ArrowBack,
  CalendarToday,
  People,
  Timer,
  EmojiEvents,
  Psychology,
  Upcoming,
  CheckCircle,
  School,
} from '@mui/icons-material';
import ThemeContext from '../../contexts/ThemeContext';
import {
  contestsData,
  getDifficultyColor,
  getDifficultyLabel,
  DIFFICULTY_LEVELS,
} from '../../data/contestData';

const ContestsPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState(0);

  // Filter contests by status
  const upcomingContests = contestsData.filter(c => c.status === 'upcoming');
  const completedContests = contestsData.filter(c => c.status === 'completed');

  const displayContests = activeTab === 0 ? upcomingContests : completedContests;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('ar-EG', options);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ساعة${mins > 0 ? ` ${mins} دقيقة` : ''}`;
  };

  const getTimeUntilContest = (date) => {
    const now = new Date();
    const contestDate = new Date(date);
    const diff = contestDate - now;
    
    if (diff < 0) return 'انتهت';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} يوم${hours > 0 ? ` ${hours} ساعة` : ''}`;
    } else if (hours > 0) {
      return `${hours} ساعة`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes} دقيقة`;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/student/dashboard')}
            sx={{
              mb: 2,
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              color: darkMode ? '#f1f5f9' : '#1e293b',
            }}
          >
            العودة للوحة التحكم
          </Button>
          
          <Typography variant="h3" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}>
            🎯 جميع المسابقات الذهبية
          </Typography>
          <Typography variant="h6" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 2 }}>
            الصف الثالث الثانوي • اكتشف المسابقات القادمة والسابقة
          </Typography>
          
          {/* Grade 3 Specializations */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Chip
              label="علمي رياضة"
              icon={<School sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fffbeb',
                color: '#f59e0b',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 800,
                fontSize: '0.85rem',
                px: 2,
                py: 2.5,
                border: '1px solid',
                borderColor: darkMode ? 'rgba(245, 158, 11, 0.3)' : '#fcd34d',
              }}
            />
            <Chip
              label="علمي علوم"
              icon={<School sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fffbeb',
                color: '#f59e0b',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 800,
                fontSize: '0.85rem',
                px: 2,
                py: 2.5,
                border: '1px solid',
                borderColor: darkMode ? 'rgba(245, 158, 11, 0.3)' : '#fcd34d',
              }}
            />
            <Chip
              label="أدبي"
              icon={<School sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fffbeb',
                color: '#f59e0b',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 800,
                fontSize: '0.85rem',
                px: 2,
                py: 2.5,
                border: '1px solid',
                borderColor: darkMode ? 'rgba(245, 158, 11, 0.3)' : '#fcd34d',
              }}
            />
          </Box>
        </Box>

        {/* Tabs */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            border: '1px solid',
            borderColor: darkMode ? '#334155' : '#e5e7eb',
            bgcolor: darkMode ? '#1e293b' : 'white',
            borderRadius: 3,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              '& .MuiTab-root': {
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: darkMode ? '#94a3b8' : '#64748b',
                '&.Mui-selected': {
                  color: '#2563eb',
                },
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Upcoming />
                  <span>المسابقات القادمة ({upcomingContests.length})</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle />
                  <span>المسابقات السابقة ({completedContests.length})</span>
                </Box>
              }
            />
          </Tabs>
        </Card>

        {/* Contests Grid */}
        <Grid container spacing={3}>
          {displayContests.map((contest) => {
            const diffColor = getDifficultyColor(contest.difficulty);
            const isUpcoming = contest.status === 'upcoming';
            
            return (
              <Grid item xs={12} md={6} lg={4} key={contest.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: darkMode
                        ? '0 12px 24px rgba(0,0,0,0.3)'
                        : '0 12px 24px rgba(0,0,0,0.1)',
                      borderColor: diffColor.border,
                    },
                  }}
                >
                  {/* Header with difficulty gradient */}
                  <Box
                    sx={{
                      height: 6,
                      background: diffColor.gradient,
                    }}
                  />

                  <CardContent sx={{ p: 3 }}>
                    {/* Title and Level */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight={900}
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', flex: 1 }}
                        >
                          {contest.title}
                        </Typography>
                        
                        {contest.aiGenerated && (
                          <Chip
                            icon={<Psychology sx={{ fontSize: 16 }} />}
                            label="AI"
                            size="small"
                            sx={{
                              bgcolor: darkMode ? 'rgba(124, 58, 237, 0.2)' : '#f5f3ff',
                              color: '#7c3aed',
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 700,
                              fontSize: '0.7rem',
                            }}
                          />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={getDifficultyLabel(contest.difficulty)}
                          size="small"
                          sx={{
                            bgcolor: darkMode ? `${diffColor.bg}20` : diffColor.bg,
                            color: diffColor.text,
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            border: '1px solid',
                            borderColor: darkMode ? `${diffColor.border}40` : diffColor.border,
                          }}
                        />
                        <Chip
                          label={contest.level}
                          size="small"
                          sx={{
                            bgcolor: darkMode ? '#334155' : '#f1f5f9',
                            color: darkMode ? '#94a3b8' : '#64748b',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                        <Chip
                          label="الصف الثالث"
                          size="small"
                          icon={<School sx={{ fontSize: 14 }} />}
                          sx={{
                            bgcolor: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fffbeb',
                            color: '#f59e0b',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 800,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Contest Details */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                        >
                          {formatDate(contest.date)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Timer sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                        >
                          {formatDuration(contest.duration)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                        >
                          {contest.participants} مشارك
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEvents sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                        >
                          {contest.questionCount} مسائل
                        </Typography>
                      </Box>
                    </Box>

                    {/* Time Until / Status */}
                    {isUpcoming && (
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: darkMode ? 'rgba(37, 99, 235, 0.1)' : '#eff6ff',
                          border: '1px solid',
                          borderColor: darkMode ? 'rgba(37, 99, 235, 0.3)' : '#bfdbfe',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#93c5fd' : '#1e40af', display: 'block', mb: 0.5 }}
                        >
                          ⏰ تبدأ خلال
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={900}
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: '#2563eb' }}
                        >
                          {getTimeUntilContest(contest.date)}
                        </Typography>
                      </Box>
                    )}

                    {/* Action Button */}
                    <Button
                      fullWidth
                      variant={isUpcoming ? 'contained' : 'outlined'}
                      disableElevation
                      onClick={() => {
                        if (isUpcoming) {
                          // Navigate to contest page (to be implemented)
                          console.log('Register for contest:', contest.id);
                        } else {
                          // Navigate to results page (to be implemented)
                          console.log('View results:', contest.id);
                        }
                      }}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 900,
                        borderRadius: 2,
                        py: 1.5,
                        ...(isUpcoming
                          ? {
                              background: diffColor.gradient,
                              color: 'white',
                              '&:hover': {
                                opacity: 0.9,
                              },
                            }
                          : {
                              borderColor: darkMode ? '#334155' : '#e5e7eb',
                              color: darkMode ? '#f1f5f9' : '#1e293b',
                              '&:hover': {
                                borderColor: diffColor.border,
                                bgcolor: darkMode ? '#334155' : '#f8fafc',
                              },
                            }),
                      }}
                    >
                      {isUpcoming ? '🚀 التسجيل في المسابقة' : '📊 عرض النتائج'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Empty State */}
        {displayContests.length === 0 && (
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              bgcolor: darkMode ? '#1e293b' : 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
                {activeTab === 0 ? '📅' : '✅'}
              </Typography>
              <Typography
                variant="h6"
                fontFamily="Cairo, sans-serif"
                fontWeight={700}
                sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}
              >
                {activeTab === 0 ? 'لا توجد مسابقات قادمة' : 'لا توجد مسابقات سابقة'}
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
              >
                {activeTab === 0
                  ? 'تابع لاحقاً لمعرفة المسابقات الجديدة'
                  : 'لم تشارك في أي مسابقات بعد'}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default ContestsPage;