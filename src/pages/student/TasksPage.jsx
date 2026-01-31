// pages/student/TasksPage.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  IconButton,
  Chip,
  Checkbox,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
  SearchRounded,
  FilterListRounded,
  AccessTimeRounded,
  WarningAmberRounded,
} from '@mui/icons-material';
import ThemeContext from '../../contexts/ThemeContext';
import { upcomingTasksData } from '../../data/studentData';

const COLORS = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  accent: '#db2777',
  success: '#059669',
  warning: '#f59e0b',
  error: '#ef4444',
};

const PRIORITY_CONFIG = {
  high: { label: 'عاجل', color: COLORS.error, bgColor: '#fef2f2' },
  medium: { label: 'متوسط', color: COLORS.warning, bgColor: '#fffbeb' },
  low: { label: 'عادي', color: COLORS.success, bgColor: '#ecfdf5' },
};

const TasksPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  const [tasks, setTasks] = useState(upcomingTasksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 0: الكل, 1: قيد التنفيذ, 2: مكتملة

  // تبديل حالة المهمة
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // فلترة المهام
  const filteredTasks = tasks.filter((task) => {
    // فلترة البحث
    const matchesSearch = task.title.includes(searchQuery) || 
                          task.courseName.includes(searchQuery);
    
    // فلترة التاب
    if (activeTab === 1) return matchesSearch && !task.completed;
    if (activeTab === 2) return matchesSearch && task.completed;
    return matchesSearch;
  });

  // ترتيب المهام حسب الأولوية
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // إحصائيات المهام
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    urgent: tasks.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
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
              <ArrowForwardIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight={900} fontFamily="Cairo">
                📝 المهام والواجبات
              </Typography>
              <Typography variant="body1" fontFamily="Cairo" sx={{ opacity: 0.9 }}>
                تتبع وإدارة جميع مهامك الدراسية
              </Typography>
            </Box>
          </Box>

          {/* إحصائيات */}
          <Grid container spacing={2}>
            {[
              { label: 'إجمالي المهام', value: stats.total, icon: '📋' },
              { label: 'مكتملة', value: stats.completed, icon: '✅' },
              { label: 'قيد التنفيذ', value: stats.pending, icon: '⏳' },
              { label: 'عاجلة', value: stats.urgent, icon: '🔥' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    p: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" fontWeight={900}>
                    {stat.icon} {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* شريط البحث والفلترة */}
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: darkMode ? '#334155' : '#e5e7eb',
            bgcolor: darkMode ? '#1e293b' : 'white',
            borderRadius: 3,
            p: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="ابحث عن مهمة..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                minWidth: 250,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: darkMode ? '#334155' : '#f8fafc',
                  fontFamily: 'Cairo',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              sx={{
                minHeight: 40,
                '& .MuiTab-root': {
                  minHeight: 40,
                  fontFamily: 'Cairo',
                  fontWeight: 600,
                  fontSize: 13,
                },
              }}
            >
              <Tab label={`الكل (${stats.total})`} />
              <Tab label={`قيد التنفيذ (${stats.pending})`} />
              <Tab label={`مكتملة (${stats.completed})`} />
            </Tabs>
          </Box>
        </Card>

        {/* قائمة المهام */}
        <Grid container spacing={2}>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => {
              const priorityCfg = PRIORITY_CONFIG[task.priority];
              const courseColors = [COLORS.primary, COLORS.secondary, COLORS.success, COLORS.accent];
              const courseColor = courseColors[(task.courseId - 1) % 4];

              return (
                <Grid item xs={12} md={6} lg={4} key={task.id}>
                  <Card
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: darkMode ? '#334155' : '#e5e7eb',
                      bgcolor: darkMode ? '#1e293b' : 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      opacity: task.completed ? 0.7 : 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: darkMode
                          ? '0 10px 30px rgba(0,0,0,0.3)'
                          : '0 10px 30px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    {/* شريط الكورس */}
                    <Box sx={{ height: 4, bgcolor: courseColor }} />

                    <Box sx={{ p: 2.5 }}>
                      {/* الهيدر */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          icon={<RadioButtonUncheckedRounded />}
                          checkedIcon={<CheckCircleRounded />}
                          sx={{
                            p: 0,
                            color: darkMode ? '#64748b' : '#cbd5e1',
                            '&.Mui-checked': { color: COLORS.success },
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            fontFamily="Cairo"
                            sx={{
                              color: darkMode ? '#f1f5f9' : '#1e293b',
                              textDecoration: task.completed ? 'line-through' : 'none',
                              mb: 0.5,
                            }}
                          >
                            {task.title}
                          </Typography>
                          
                          {/* الكورس */}
                          <Chip
                            label={task.courseName}
                            size="small"
                            onClick={() => navigate(`/student/courses/${task.courseId}`)}
                            sx={{
                              height: 24,
                              fontSize: 11,
                              fontFamily: 'Cairo',
                              fontWeight: 600,
                              bgcolor: `${courseColor}15`,
                              color: courseColor,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: `${courseColor}25`,
                              },
                            }}
                          />
                        </Box>

                        {/* الأولوية */}
                        <Chip
                          label={priorityCfg.label}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: 10,
                            fontFamily: 'Cairo',
                            fontWeight: 700,
                            bgcolor: darkMode ? '#334155' : priorityCfg.bgColor,
                            color: priorityCfg.color,
                          }}
                        />
                      </Box>

                      {/* التاريخ */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: darkMode ? '#334155' : '#f8fafc',
                        }}
                      >
                        <AccessTimeRounded
                          sx={{
                            fontSize: 18,
                            color: task.priority === 'high' ? COLORS.error : COLORS.warning,
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontFamily="Cairo"
                          fontWeight={600}
                          sx={{
                            color: task.priority === 'high' ? COLORS.error : darkMode ? '#94a3b8' : '#64748b',
                          }}
                        >
                          📅 {task.dueDate}
                        </Typography>
                      </Box>

                   {/* زر التسليم */}
{!task.completed && (
  <Button
    fullWidth
    onClick={() => navigate('/student/submit-assignment', { state: { task } })}
    sx={{
      mt: 2,
      fontFamily: 'Cairo',
      fontWeight: 700,
      borderRadius: 2,
      bgcolor: `${courseColor}15`,
      color: courseColor,
      '&:hover': {
        bgcolor: courseColor,
        color: 'white',
      },
    }}
  >
    تسليم الواجب
  </Button>
)}
                    </Box>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  bgcolor: darkMode ? '#1e293b' : 'white',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: darkMode ? '#334155' : '#e5e7eb',
                }}
              >
                <Typography variant="h1" sx={{ mb: 2 }}>
                  🎉
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="Cairo"
                  fontWeight={700}
                  sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}
                >
                  {activeTab === 2 ? 'لا توجد مهام مكتملة' : 'لا توجد مهام'}
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Cairo"
                  sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                >
                  {activeTab === 2
                    ? 'أكمل بعض المهام لتظهر هنا'
                    : 'أنت في إجازة! لا توجد مهام حالياً'}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TasksPage;