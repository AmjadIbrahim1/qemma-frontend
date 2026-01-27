// frontend/src/pages/student/StudentDashboard.jsx
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Grid, Card, CardContent } from '@mui/material';
import { 
  LogoutOutlined, 
  VideoCallOutlined, 
  SchoolOutlined,
  AssignmentOutlined,
  BarChartOutlined,
  ChatOutlined,
  TrendingUpOutlined,
  EmojiEventsOutlined
} from '@mui/icons-material';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const stats = [
    { title: 'الكورسات المسجلة', value: '5', icon: <SchoolOutlined />, color: '#2563eb' },
    { title: 'الاختبارات المكتملة', value: '12', icon: <AssignmentOutlined />, color: '#7c3aed' },
    { title: 'نقاط التقدم', value: '850', icon: <TrendingUpOutlined />, color: '#db2777' },
    { title: 'الترتيب العام', value: '#15', icon: <EmojiEventsOutlined />, color: '#f59e0b' },
  ];

  const quickActions = [
    {
      title: 'انضم للفصل الافتراضي',
      description: 'انضم للحصص المباشرة مع المدرسين',
      icon: <VideoCallOutlined sx={{ fontSize: 40 }} />,
      action: () => navigate('/student/live-class'),
      color: '#2563eb'
    },
    {
      title: 'تصفح الكورسات',
      description: 'استكشف المواد الدراسية المتاحة',
      icon: <SchoolOutlined sx={{ fontSize: 40 }} />,
      action: () => navigate('/student/courses'),
      color: '#7c3aed'
    },
    {
      title: 'الاختبارات',
      description: 'حل الاختبارات والتمارين',
      icon: <AssignmentOutlined sx={{ fontSize: 40 }} />,
      action: () => navigate('/student/exams'),
      color: '#db2777'
    },
    {
      title: 'المساعد الذكي',
      description: 'اسأل الشات بوت عن أي استفسار',
      icon: <ChatOutlined sx={{ fontSize: 40 }} />,
      action: () => navigate('/student/chat'),
      color: '#22c55e'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* HEADER */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
          color: 'white',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
                مرحباً، {user?.name || 'الطالب'}! 👋
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }} fontFamily="Cairo, sans-serif">
                نتمنى لك يوماً دراسياً مثمراً
              </Typography>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<LogoutOutlined />}
              onClick={handleLogout}
              sx={{ 
                fontFamily: 'Cairo, sans-serif', 
                fontWeight: 700,
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              تسجيل الخروج
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, pb: 6 }}>
        {/* STATS CARDS */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'white',
                  borderTop: `4px solid ${stat.color}`,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ color: stat.color, opacity: 0.8 }}>
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* WELCOME MESSAGE */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)' }}>
          <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" gutterBottom>
            معلومات حسابك
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
                <strong>البريد الإلكتروني:</strong> {user?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
                <strong>نوع الحساب:</strong> {user?.role === 'student' ? 'طالب' : user?.role}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
                <strong>تاريخ الانضمام:</strong> {new Date(user?.createdAt || Date.now()).toLocaleDateString('ar-EG')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
                <strong>الحالة:</strong> <span style={{ color: '#22c55e' }}>● نشط</span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* QUICK ACTIONS */}
        <Typography variant="h5" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 3 }}>
          الإجراءات السريعة
        </Typography>

        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    '& .action-icon': {
                      transform: 'scale(1.1)'
                    }
                  }
                }}
                onClick={action.action}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box 
                    className="action-icon"
                    sx={{ 
                      color: action.color, 
                      mb: 2,
                      transition: 'transform 0.3s'
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* PROGRESS SECTION */}
        <Paper sx={{ p: 4, mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BarChartOutlined sx={{ mr: 1, color: '#2563eb' }} />
            <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif">
              التقدم الأسبوعي
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" color="text.secondary" fontFamily="Cairo, sans-serif">
              📊 سيتم عرض إحصائيات التقدم هنا قريباً
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentDashboard;