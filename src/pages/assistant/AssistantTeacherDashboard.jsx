// frontend/src/pages/assistant/AssistantTeacherDashboard.jsx - FIXED: Dark Mode Support
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme'; // ✅ ADDED
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  Badge,
  Grid,
  Paper,
} from '@mui/material';
import {
  ArrowBack,
  Search,
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  ChatBubbleOutline,
  PeopleOutline,
  TrendingUp,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';

// ✅ DUMMY DATA - Students List
const DUMMY_STUDENTS = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    avatar: '👨‍🎓',
    division: 'علمي رياضة',
    lastMessage: 'شكراً يا أستاذ على الشرح',
    lastMessageTime: '10:30 ص',
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: 2,
    name: 'فاطمة حسن',
    avatar: '👩‍🎓',
    division: 'علمي علوم',
    lastMessage: 'ممكن أراجع معاك الدرس الأخير؟',
    lastMessageTime: 'أمس',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 3,
    name: 'محمود سعيد',
    avatar: '👨‍🎓',
    division: 'علمي رياضة',
    lastMessage: 'تمام يا مستر',
    lastMessageTime: 'أمس',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: 4,
    name: 'نور الدين أحمد',
    avatar: '👩‍🎓',
    division: 'أدبي',
    lastMessage: 'هل الواجب مطلوب اليوم؟',
    lastMessageTime: '٢ يوم',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 5,
    name: 'عمر خالد',
    avatar: '👨‍🎓',
    division: 'علمي علوم',
    lastMessage: 'شكراً جداً',
    lastMessageTime: '٣ يوم',
    unreadCount: 0,
    isOnline: true,
  },
];

// ✅ DUMMY CHAT MESSAGES
const DUMMY_CHAT_MESSAGES = {
  1: [
    { id: 1, sender: 'student', text: 'السلام عليكم يا أستاذ', time: '9:00 ص' },
    { id: 2, sender: 'teacher', text: 'وعليكم السلام، أهلاً أحمد', time: '9:02 ص' },
    { id: 3, sender: 'student', text: 'عندي سؤال في الدرس الأخير', time: '9:05 ص' },
    { id: 4, sender: 'teacher', text: 'تفضل، أنا جاهز', time: '9:06 ص' },
    { id: 5, sender: 'student', text: 'شكراً يا أستاذ على الشرح', time: '10:30 ص' },
  ],
  2: [
    { id: 1, sender: 'student', text: 'صباح الخير يا أستاذ', time: 'أمس 8:00 ص' },
    { id: 2, sender: 'teacher', text: 'صباح النور فاطمة', time: 'أمس 8:10 ص' },
    { id: 3, sender: 'student', text: 'ممكن أراجع معاك الدرس الأخير؟', time: 'أمس 8:15 ص' },
  ],
  3: [
    { id: 1, sender: 'student', text: 'مرحبا', time: 'أمس' },
    { id: 2, sender: 'teacher', text: 'أهلا محمود', time: 'أمس' },
    { id: 3, sender: 'student', text: 'تمام يا مستر', time: 'أمس' },
  ],
  4: [
    { id: 1, sender: 'student', text: 'هل الواجب مطلوب اليوم؟', time: '٢ يوم' },
  ],
  5: [
    { id: 1, sender: 'student', text: 'شكراً جداً', time: '٣ يوم' },
  ],
};

const AssistantTeacherDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme(); // ✅ ADDED: Get dark mode state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Filter students based on search
  const filteredStudents = DUMMY_STUDENTS.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalUnread = DUMMY_STUDENTS.reduce((sum, s) => sum + s.unreadCount, 0);
  const onlineStudents = DUMMY_STUDENTS.filter(s => s.isOnline).length;

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleBackToStudents = () => {
    setSelectedStudent(null);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  // If no student selected, show students list
  if (!selectedStudent) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          // ✅ FIXED: Dark mode support
          background: darkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0f172a 100%)'
            : `
              radial-gradient(900px 420px at 80% 10%, rgba(99,102,241,0.18), transparent 60%),
              radial-gradient(900px 420px at 15% 15%, rgba(59,130,246,0.18), transparent 60%),
              linear-gradient(135deg, #eff6ff 0%, #ffffff 45%, #eef2ff 100%)
            `,
          pt: 12,
          pb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: darkMode 
              ? 'none'
              : `
                radial-gradient(circle at 20% 30%, rgba(59,130,246,0.12), transparent 46%),
                radial-gradient(circle at 80% 20%, rgba(99,102,241,0.12), transparent 46%)
              `,
            opacity: 0.9,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* ✅ PROFESSIONAL HEADER */}
          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.15)',
              background: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.90)',
              backdropFilter: 'blur(12px)',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                : '0 8px 32px rgba(59, 130, 246, 0.12)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: darkMode
                  ? '0 12px 48px rgba(0, 0, 0, 0.7)'
                  : '0 12px 48px rgba(59, 130, 246, 0.18)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box
              sx={{
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(124, 58, 237, 0.22), rgba(219, 39, 119, 0.20))'
                  : 'linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(124, 58, 237, 0.14), rgba(219, 39, 119, 0.12))',
                borderBottom: '1px solid',
                borderBottomColor: darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)',
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ 
                      mb: 1,
                      color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    🎓 لوحة المدرس المساعد
                  </Typography>
                  <Typography
                    variant="h6"
                    fontFamily="Cairo, sans-serif"
                    sx={{ 
                      color: darkMode ? '#94a3b8' : 'rgb(75 85 99)',
                      fontWeight: 600,
                    }}
                  >
                    تواصل مع طلابك وساعدهم في رحلتهم التعليمية
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* ✅ PROFESSIONAL STATS CARDS */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.15)',
                  background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: darkMode
                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                    : '0 4px 20px rgba(37, 99, 235, 0.10)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(37 99 235), rgb(59 130 246))',
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: darkMode
                      ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                      : '0 8px 32px rgba(37, 99, 235, 0.18)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3.5 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: darkMode
                        ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(59, 130, 246, 0.15))'
                        : 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(59, 130, 246, 0.08))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '2px solid',
                      borderColor: darkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    <PeopleOutline sx={{ fontSize: 32, color: darkMode ? '#60a5fa' : 'rgb(37 99 235)' }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    fontFamily="Cairo, sans-serif" 
                    fontWeight={900}
                    sx={{ color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)', mb: 0.5 }}
                  >
                    {DUMMY_STUDENTS.length}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? '#94a3b8' : 'rgb(75 85 99)' }}
                  >
                    إجمالي الطلاب
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(124, 58, 237, 0.3)' : 'rgba(124, 58, 237, 0.15)',
                  background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: darkMode
                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                    : '0 4px 20px rgba(124, 58, 237, 0.10)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(124 58 237), rgb(147 51 234))',
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: darkMode
                      ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                      : '0 8px 32px rgba(124, 58, 237, 0.18)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3.5 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: darkMode
                        ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(147, 51, 234, 0.15))'
                        : 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(147, 51, 234, 0.08))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '2px solid',
                      borderColor: darkMode ? 'rgba(124, 58, 237, 0.4)' : 'rgba(124, 58, 237, 0.2)',
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 32, color: darkMode ? '#c084fc' : 'rgb(124 58 237)' }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    fontFamily="Cairo, sans-serif" 
                    fontWeight={900}
                    sx={{ color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)', mb: 0.5 }}
                  >
                    {onlineStudents}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? '#94a3b8' : 'rgb(75 85 99)' }}
                  >
                    طلاب متصلين
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(219, 39, 119, 0.3)' : 'rgba(219, 39, 119, 0.15)',
                  background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: darkMode
                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                    : '0 4px 20px rgba(219, 39, 119, 0.10)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(219 39 119), rgb(236 72 153))',
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: darkMode
                      ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                      : '0 8px 32px rgba(219, 39, 119, 0.18)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3.5 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: darkMode
                        ? 'linear-gradient(135deg, rgba(219, 39, 119, 0.25), rgba(236, 72, 153, 0.15))'
                        : 'linear-gradient(135deg, rgba(219, 39, 119, 0.12), rgba(236, 72, 153, 0.08))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '2px solid',
                      borderColor: darkMode ? 'rgba(219, 39, 119, 0.4)' : 'rgba(219, 39, 119, 0.2)',
                    }}
                  >
                    <ChatBubbleOutline sx={{ fontSize: 32, color: darkMode ? '#f472b6' : 'rgb(219 39 119)' }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    fontFamily="Cairo, sans-serif" 
                    fontWeight={900}
                    sx={{ color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)', mb: 0.5 }}
                  >
                    {totalUnread}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? '#94a3b8' : 'rgb(75 85 99)' }}
                  >
                    رسائل جديدة
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.15)',
                  background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: darkMode
                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                    : '0 4px 20px rgba(99, 102, 241, 0.10)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(99 102 241), rgb(129 140 248))',
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: darkMode
                      ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                      : '0 8px 32px rgba(99, 102, 241, 0.18)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3.5 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: darkMode
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(129, 140, 248, 0.15))'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(129, 140, 248, 0.08))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '2px solid',
                      borderColor: darkMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.2)',
                    }}
                  >
                    <Schedule sx={{ fontSize: 32, color: darkMode ? '#a5b4fc' : 'rgb(99 102 241)' }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    fontFamily="Cairo, sans-serif" 
                    fontWeight={900}
                    sx={{ color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)', mb: 0.5 }}
                  >
                    24/7
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? '#94a3b8' : 'rgb(75 85 99)' }}
                  >
                    متاح دائماً
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* ✅ PROFESSIONAL SEARCH BAR */}
          <Card 
            sx={{ 
              mb: 4, 
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(15, 23, 42, 0.10)',
              background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              boxShadow: darkMode
                ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: darkMode ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.3)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                  : '0 8px 32px rgba(99, 102, 241, 0.12)',
              },
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <TextField
                fullWidth
                placeholder="ابحث عن طالب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: darkMode ? '#818cf8' : 'rgb(99 102 241)', fontSize: 26 }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* ✅ PROFESSIONAL STUDENTS LIST */}
          <Card 
            sx={{ 
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(15, 23, 42, 0.10)',
              background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              boxShadow: darkMode
                ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(99, 102, 241, 0.14))'
                  : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(99, 102, 241, 0.06))',
                borderBottom: '1px solid',
                borderBottomColor: darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.15)',
                p: 3,
              }}
            >
              <Typography 
                variant="h5" 
                fontFamily="Cairo, sans-serif" 
                fontWeight={900}
                sx={{ color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)' }}
              >
                📋 قائمة الطلاب ({filteredStudents.length})
              </Typography>
            </Box>

            <Box>
              {filteredStudents.length === 0 ? (
                <Box sx={{ p: 8, textAlign: 'center' }}>
                  <Typography
                    variant="h1"
                    sx={{ mb: 2, fontSize: '4rem' }}
                  >
                    🔍
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={700}
                    sx={{ color: darkMode ? '#94a3b8' : undefined }}
                  >
                    لا توجد نتائج
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#64748b' : undefined }}
                  >
                    جرب البحث باسم آخر
                  </Typography>
                </Box>
              ) : (
                filteredStudents.map((student, index) => (
                  <Box key={student.id}>
                    <Box
                      onClick={() => handleStudentClick(student)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        p: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          bgcolor: darkMode ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.04)',
                          transform: 'translateX(-4px)',
                          '&::before': {
                            width: '4px',
                          },
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 0,
                          background: 'linear-gradient(135deg, rgb(99 102 241), rgb(124 58 237))',
                          transition: 'width 0.3s ease',
                        },
                      }}
                    >
                      {/* Avatar with Badge */}
                      <Box sx={{ position: 'relative' }}>
                        <Badge
                          badgeContent={student.unreadCount || null}
                          color="error"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 900,
                              fontSize: '0.7rem',
                              background: 'linear-gradient(135deg, rgb(219 39 119), rgb(236 72 153))',
                              boxShadow: '0 2px 8px rgba(219, 39, 119, 0.4)',
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              fontSize: '2rem',
                              background: darkMode
                                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(124, 58, 237, 0.20))'
                                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(124, 58, 237, 0.12))',
                              border: '3px solid',
                              borderColor: darkMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.2)',
                              boxShadow: darkMode
                                ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                                : '0 4px 12px rgba(99, 102, 241, 0.15)',
                            }}
                          >
                            {student.avatar}
                          </Avatar>
                        </Badge>
                        {/* Online Status */}
                        {student.isOnline && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 2,
                              right: 2,
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              bgcolor: 'rgb(34 197 94)',
                              border: '3px solid',
                              borderColor: darkMode ? '#1e293b' : 'white',
                              boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.3)',
                            }}
                          />
                        )}
                      </Box>

                      {/* Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={900}
                          sx={{ mb: 0.5, color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)' }}
                        >
                          {student.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                            color: darkMode ? '#94a3b8' : 'rgb(107 114 128)',
                          }}
                        >
                          {student.lastMessage}
                        </Typography>
                      </Box>

                      {/* Right Side */}
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ display: 'block', mb: 1, color: darkMode ? '#94a3b8' : 'rgb(107 114 128)' }}
                        >
                          {student.lastMessageTime}
                        </Typography>
                        <Chip
                          label={student.division}
                          size="small"
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            fontSize: '0.7rem',
                            fontWeight: 900,
                            color: darkMode ? '#e9d5ff' : 'rgb(76 29 149)',
                            background: darkMode 
                              ? 'rgba(124, 58, 237, 0.25)'
                              : 'rgba(124, 58, 237, 0.10)',
                            border: '1px solid',
                            borderColor: darkMode 
                              ? 'rgba(124, 58, 237, 0.4)'
                              : 'rgba(124, 58, 237, 0.22)',
                          }}
                        />
                      </Box>
                    </Box>
                    {index < filteredStudents.length - 1 && (
                      <Divider sx={{ borderColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(15, 23, 42, 0.08)' }} />
                    )}
                  </Box>
                ))
              )}
            </Box>
          </Card>
        </Container>
      </Box>
    );
  }

  // ✅ PROFESSIONAL CHAT VIEW
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: darkMode ? '#0f172a' : '#f8fafc',
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          background: darkMode
            ? 'linear-gradient(135deg, rgb(67 56 202), rgb(79 70 229), rgb(99 102 241))'
            : 'linear-gradient(135deg, rgb(67 56 202), rgb(99 102 241), rgb(124 58 237))',
          color: 'white',
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: darkMode
            ? '0 4px 20px rgba(0, 0, 0, 0.5)'
            : '0 4px 20px rgba(67, 56, 202, 0.25)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          mt: 8,
        }}
      >
        <IconButton 
          onClick={handleBackToStudents} 
          sx={{ 
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        <Avatar 
          sx={{ 
            width: 48, 
            height: 48, 
            fontSize: '1.8rem',
            bgcolor: 'white',
            border: '2px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          {selectedStudent.avatar}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontFamily="Cairo, sans-serif" fontWeight={900}>
            {selectedStudent.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: selectedStudent.isOnline ? 'rgb(34 197 94)' : '#9ca3af',
                boxShadow: selectedStudent.isOnline ? '0 0 8px rgb(34 197 94)' : 'none',
              }}
            />
            <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.95 }}>
              {selectedStudent.isOnline ? 'متصل الآن' : 'غير متصل'} • {selectedStudent.division}
            </Typography>
          </Box>
        </Box>

        <IconButton 
          sx={{ 
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
            },
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          background: darkMode
            ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
            : 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
        }}
      >
        {(DUMMY_CHAT_MESSAGES[selectedStudent.id] || []).map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'teacher' ? 'flex-end' : 'flex-start',
              mb: 2,
              animation: 'fadeIn 0.3s ease-in',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                maxWidth: '70%',
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: msg.sender === 'teacher' 
                  ? (darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)')
                  : (darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(15, 23, 42, 0.1)'),
                bgcolor: msg.sender === 'teacher' 
                  ? (darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)')
                  : (darkMode ? 'rgba(30, 41, 59, 0.9)' : 'white'),
                boxShadow: msg.sender === 'teacher'
                  ? (darkMode ? '0 2px 8px rgba(99, 102, 241, 0.2)' : '0 2px 8px rgba(99, 102, 241, 0.12)')
                  : (darkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)'),
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="body1"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ 
                    wordBreak: 'break-word', 
                    mb: 0.5, 
                    lineHeight: 1.6,
                    color: darkMode ? '#f1f5f9' : 'rgb(17 24 39)',
                  }}
                >
                  {msg.text}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                  <Typography
                    variant="caption"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? '#94a3b8' : 'rgb(107 114 128)', fontSize: '0.7rem' }}
                  >
                    {msg.time}
                  </Typography>
                  {msg.sender === 'teacher' && (
                    <CheckCircle sx={{ fontSize: 14, color: darkMode ? '#818cf8' : 'rgb(99 102 241)' }} />
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          background: darkMode ? '#1e293b' : 'white',
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          boxShadow: darkMode
            ? '0 -4px 20px rgba(0, 0, 0, 0.3)'
            : '0 -4px 20px rgba(0, 0, 0, 0.06)',
          borderTop: '1px solid',
          borderTopColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(15, 23, 42, 0.08)',
        }}
      >
        <IconButton 
          size="small" 
          sx={{ 
            color: darkMode ? '#818cf8' : 'rgb(99 102 241)',
            '&:hover': {
              bgcolor: darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
            },
          }}
        >
          <EmojiEmotions />
        </IconButton>

        <IconButton 
          size="small" 
          sx={{ 
            color: darkMode ? '#818cf8' : 'rgb(99 102 241)',
            '&:hover': {
              bgcolor: darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
            },
          }}
        >
          <AttachFile />
        </IconButton>

        <TextField
          fullWidth
          placeholder="اكتب رسالة..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          multiline
          maxRows={4}
          InputProps={{
            sx: { 
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              borderRadius: 2.5,
              bgcolor: darkMode ? '#0f172a' : '#f8fafc',
              color: darkMode ? '#f1f5f9' : undefined,
              border: '1px solid',
              borderColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(15, 23, 42, 0.1)',
              '&:focus-within': {
                bgcolor: darkMode ? '#1e293b' : 'white',
                borderColor: darkMode ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.3)',
                boxShadow: darkMode
                  ? '0 0 0 3px rgba(99, 102, 241, 0.15)'
                  : '0 0 0 3px rgba(99, 102, 241, 0.08)',
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />

        <IconButton
          onClick={handleSendMessage}
          disabled={!messageInput.trim()}
          sx={{
            background: 'linear-gradient(135deg, rgb(99 102 241), rgb(124 58 237))',
            color: 'white',
            width: 48,
            height: 48,
            '&:hover': { 
              background: 'linear-gradient(135deg, rgb(79 70 229), rgb(109 40 217))',
              transform: 'scale(1.05)',
            },
            '&:disabled': { 
              bgcolor: darkMode ? '#334155' : '#e5e7eb',
              color: darkMode ? '#64748b' : '#9ca3af',
            },
            transition: 'all 0.2s ease',
            boxShadow: darkMode
              ? '0 4px 12px rgba(99, 102, 241, 0.4)'
              : '0 4px 12px rgba(99, 102, 241, 0.3)',
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AssistantTeacherDashboard;