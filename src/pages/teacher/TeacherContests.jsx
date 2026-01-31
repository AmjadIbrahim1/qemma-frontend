// frontend/src/pages/teacher/TeacherContests.jsx - Teacher Golden Contest Management - Grade 3
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
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Edit,
  EmojiEvents,
  Assignment,
  CheckCircle,
  CalendarToday,
  Timer,
  People,
  Assessment,
  Delete,
  School,
} from '@mui/icons-material';
import ThemeContext from '../../contexts/ThemeContext';
import {
  teacherAssignedContests,
  teacherPastContests,
  contestsData,
  getDifficultyColor,
  getDifficultyLabel,
  DIFFICULTY_LEVELS,
} from '../../data/contestData';

const TeacherContests = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState(0);
  const [addQuestionDialog, setAddQuestionDialog] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    title: '',
    description: '',
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
    points: 100,
    timeLimit: 2000,
    memoryLimit: 256,
    specialization: 'علمي رياضة', // NEW: Specialization field
  });

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('ar-EG', options);
  };

  const handleOpenAddQuestion = (contest) => {
    setSelectedContest(contest);
    setAddQuestionDialog(true);
  };

  const handleCloseAddQuestion = () => {
    setAddQuestionDialog(false);
    setSelectedContest(null);
    setQuestionForm({
      title: '',
      description: '',
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      points: 100,
      timeLimit: 2000,
      memoryLimit: 256,
      specialization: 'علمي رياضة',
    });
  };

  const handleSubmitQuestion = () => {
    // TODO: Implement API call to submit question
    console.log('Submitting question:', questionForm);
    handleCloseAddQuestion();
  };

  const handleFormChange = (field, value) => {
    setQuestionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/teacher/dashboard')}
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
            🎯 إدارة المسابقات الذهبية
          </Typography>
          <Typography variant="h6" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
            الصف الثالث الثانوي • أضف أسئلة وتابع المسابقات السابقة
          </Typography>
          
          {/* Grade 3 Specializations */}
          <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
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
                  <Assignment />
                  <span>مسابقاتي المخصصة ({teacherAssignedContests.length})</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle />
                  <span>مسابقاتي السابقة ({teacherPastContests.length})</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEvents />
                  <span>جميع المسابقات ({contestsData.length})</span>
                </Box>
              }
            />
          </Tabs>
        </Card>

        {/* Assigned Contests */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {teacherAssignedContests.map((contest) => {
              const diffColor = getDifficultyColor(contest.difficulty);
              const progress = (contest.questionsSubmitted / contest.questionsRequired) * 100;
              
              return (
                <Grid item xs={12} md={6} key={contest.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: darkMode ? '#334155' : '#e5e7eb',
                      bgcolor: darkMode ? '#1e293b' : 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Header */}
                    <Box
                      sx={{
                        height: 6,
                        background: diffColor.gradient,
                      }}
                    />

                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h6"
                          fontWeight={900}
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}
                        >
                          {contest.title}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                          <Chip
                            label={getDifficultyLabel(contest.difficulty)}
                            size="small"
                            sx={{
                              bgcolor: darkMode ? `${diffColor.bg}20` : diffColor.bg,
                              color: diffColor.text,
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 800,
                              fontSize: '0.75rem',
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
                            label="الصف الثالث الثانوي"
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

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
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

                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: darkMode ? '#0f172a' : '#f8fafc',
                            border: '1px solid',
                            borderColor: darkMode ? '#334155' : '#e5e7eb',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography
                              variant="body2"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={700}
                              sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                            >
                              📝 الأسئلة المقدمة
                            </Typography>
                            <Typography
                              variant="body2"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={900}
                              sx={{ color: progress === 100 ? '#059669' : '#2563eb' }}
                            >
                              {contest.questionsSubmitted} / {contest.questionsRequired}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: darkMode ? '#334155' : '#e5e7eb',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: progress === 100 ? '#059669' : '#2563eb',
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<Add />}
                          disableElevation
                          onClick={() => handleOpenAddQuestion(contest)}
                          disabled={!contest.canEdit}
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 900,
                            borderRadius: 2,
                            py: 1.5,
                            background: diffColor.gradient,
                            '&:hover': {
                              opacity: 0.9,
                            },
                            '&:disabled': {
                              bgcolor: darkMode ? '#334155' : '#e5e7eb',
                              color: darkMode ? '#64748b' : '#94a3b8',
                            },
                          }}
                        >
                          إضافة سؤال
                        </Button>
                        
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          onClick={() => {
                            // Navigate to contest editor
                            console.log('Edit contest:', contest.id);
                          }}
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 900,
                            borderRadius: 2,
                            py: 1.5,
                            px: 3,
                            borderColor: darkMode ? '#334155' : '#e5e7eb',
                            color: darkMode ? '#f1f5f9' : '#1e293b',
                            '&:hover': {
                              borderColor: diffColor.border,
                              bgcolor: darkMode ? '#334155' : '#f8fafc',
                            },
                          }}
                        >
                          تفاصيل
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Past Contests */}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            {teacherPastContests.map((contest) => {
              const diffColor = getDifficultyColor(contest.difficulty);
              
              return (
                <Grid item xs={12} md={6} key={contest.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: darkMode ? '#334155' : '#e5e7eb',
                      bgcolor: darkMode ? '#1e293b' : 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: 6,
                        background: diffColor.gradient,
                      }}
                    />

                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}
                      >
                        {contest.title}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                        <Chip
                          label={getDifficultyLabel(contest.difficulty)}
                          size="small"
                          sx={{
                            bgcolor: darkMode ? `${diffColor.bg}20` : diffColor.bg,
                            color: diffColor.text,
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 800,
                            fontSize: '0.75rem',
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
                          icon={<CheckCircle sx={{ fontSize: 14 }} />}
                          label="مكتملة"
                          size="small"
                          sx={{
                            bgcolor: darkMode ? 'rgba(5, 150, 105, 0.2)' : '#dcfce7',
                            color: '#059669',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              borderRadius: 2,
                              bgcolor: darkMode ? '#0f172a' : '#f8fafc',
                              border: '1px solid',
                              borderColor: darkMode ? '#334155' : '#e5e7eb',
                            }}
                          >
                            <People sx={{ fontSize: 24, color: '#2563eb', mb: 0.5 }} />
                            <Typography variant="h6" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>
                              {contest.participants}
                            </Typography>
                            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                              مشارك
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              borderRadius: 2,
                              bgcolor: darkMode ? '#0f172a' : '#f8fafc',
                              border: '1px solid',
                              borderColor: darkMode ? '#334155' : '#e5e7eb',
                            }}
                          >
                            <Assignment sx={{ fontSize: 24, color: '#7c3aed', mb: 0.5 }} />
                            <Typography variant="h6" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>
                              {contest.questionsContributed}
                            </Typography>
                            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                              أسئلتك
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              borderRadius: 2,
                              bgcolor: darkMode ? '#0f172a' : '#f8fafc',
                              border: '1px solid',
                              borderColor: darkMode ? '#334155' : '#e5e7eb',
                            }}
                          >
                            <Assessment sx={{ fontSize: 24, color: '#f59e0b', mb: 0.5 }} />
                            <Typography variant="h6" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>
                              {contest.averageScore}%
                            </Typography>
                            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                              متوسط
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CalendarToday sx={{ fontSize: 16, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                        >
                          {formatDate(contest.date)}
                        </Typography>
                      </Box>

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Assessment />}
                        onClick={() => {
                          // Navigate to contest results
                          console.log('View results:', contest.id);
                        }}
                        sx={{
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 900,
                          borderRadius: 2,
                          py: 1.5,
                          borderColor: darkMode ? '#334155' : '#e5e7eb',
                          color: darkMode ? '#f1f5f9' : '#1e293b',
                          '&:hover': {
                            borderColor: diffColor.border,
                            bgcolor: darkMode ? '#334155' : '#f8fafc',
                          },
                        }}
                      >
                        عرض التفاصيل والنتائج
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* All Contests */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            {contestsData.map((contest) => {
              const diffColor = getDifficultyColor(contest.difficulty);
              
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
                      opacity: contest.status === 'completed' ? 0.7 : 1,
                    }}
                  >
                    <Box
                      sx={{
                        height: 6,
                        background: diffColor.gradient,
                      }}
                    />

                    <CardContent sx={{ p: 2.5 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={800}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1.5 }}
                      >
                        {contest.title}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                          label={getDifficultyLabel(contest.difficulty)}
                          size="small"
                          sx={{
                            bgcolor: darkMode ? `${diffColor.bg}20` : diffColor.bg,
                            color: diffColor.text,
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            height: 22,
                          }}
                        />
                        <Chip
                          label={contest.level}
                          size="small"
                          sx={{
                            bgcolor: darkMode ? '#334155' : '#f1f5f9',
                            color: darkMode ? '#94a3b8' : '#64748b',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: 22,
                          }}
                        />
                        <Chip
                          label={contest.status === 'completed' ? 'مكتملة' : 'قادمة'}
                          size="small"
                          sx={{
                            bgcolor: contest.status === 'completed'
                              ? darkMode ? 'rgba(5, 150, 105, 0.2)' : '#dcfce7'
                              : darkMode ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff',
                            color: contest.status === 'completed' ? '#059669' : '#2563eb',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            height: 22,
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarToday sx={{ fontSize: 14, color: darkMode ? '#64748b' : '#94a3b8' }} />
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                        >
                          {formatDate(contest.date)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People sx={{ fontSize: 14, color: darkMode ? '#64748b' : '#94a3b8' }} />
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                        >
                          {contest.participants} مشارك
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Add Question Dialog */}
        <Dialog
          open={addQuestionDialog}
          onClose={handleCloseAddQuestion}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: darkMode ? '#1e293b' : 'white',
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              color: darkMode ? '#f1f5f9' : '#1e293b',
            }}
          >
            ➕ إضافة سؤال جديد - {selectedContest?.title}
          </DialogTitle>
          
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
              <TextField
                fullWidth
                label="عنوان السؤال"
                value={questionForm.title}
                onChange={(e) => handleFormChange('title', e.target.value)}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Cairo, sans-serif',
                    color: darkMode ? '#94a3b8' : undefined,
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'Cairo, sans-serif',
                    color: darkMode ? '#f1f5f9' : undefined,
                  },
                }}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="وصف السؤال"
                value={questionForm.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Cairo, sans-serif',
                    color: darkMode ? '#94a3b8' : undefined,
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'Cairo, sans-serif',
                    color: darkMode ? '#f1f5f9' : undefined,
                  },
                }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="الشعبة"
                    value={questionForm.specialization}
                    onChange={(e) => handleFormChange('specialization', e.target.value)}
                    InputLabelProps={{
                      sx: {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#94a3b8' : undefined,
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#f1f5f9' : undefined,
                      },
                    }}
                  >
                    <MenuItem value="علمي رياضة" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      علمي رياضة
                    </MenuItem>
                    <MenuItem value="علمي علوم" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      علمي علوم
                    </MenuItem>
                    <MenuItem value="أدبي" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      أدبي
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="مستوى الصعوبة"
                    value={questionForm.difficulty}
                    onChange={(e) => handleFormChange('difficulty', e.target.value)}
                    InputLabelProps={{
                      sx: {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#94a3b8' : undefined,
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#f1f5f9' : undefined,
                      },
                    }}
                  >
                    <MenuItem value={DIFFICULTY_LEVELS.EASY} sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      سهل
                    </MenuItem>
                    <MenuItem value={DIFFICULTY_LEVELS.MEDIUM} sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      متوسط
                    </MenuItem>
                    <MenuItem value={DIFFICULTY_LEVELS.HARD} sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      صعب
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="النقاط"
                    value={questionForm.points}
                    onChange={(e) => handleFormChange('points', parseInt(e.target.value))}
                    InputLabelProps={{
                      sx: {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#94a3b8' : undefined,
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#f1f5f9' : undefined,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="حد الوقت (ms)"
                    value={questionForm.timeLimit}
                    onChange={(e) => handleFormChange('timeLimit', parseInt(e.target.value))}
                    InputLabelProps={{
                      sx: {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#94a3b8' : undefined,
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#f1f5f9' : undefined,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="حد الذاكرة (MB)"
                    value={questionForm.memoryLimit}
                    onChange={(e) => handleFormChange('memoryLimit', parseInt(e.target.value))}
                    InputLabelProps={{
                      sx: {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#94a3b8' : undefined,
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Cairo, sans-serif',
                        color: darkMode ? '#f1f5f9' : undefined,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseAddQuestion}
              sx={{
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
                color: darkMode ? '#94a3b8' : '#64748b',
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSubmitQuestion}
              variant="contained"
              disableElevation
              sx={{
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 900,
                borderRadius: 2,
                px: 3,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              }}
            >
              إضافة السؤال
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default TeacherContests;