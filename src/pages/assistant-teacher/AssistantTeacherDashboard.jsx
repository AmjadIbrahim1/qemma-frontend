// frontend/src/pages/assistant-teacher/AssistantTeacherDashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
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
  Home,
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  ChatBubbleOutline,
  PeopleOutline,
  TrendingUp,
  Schedule,
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
      // Here you would send the message to the backend
      setMessageInput('');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // If no student selected, show students list
  if (!selectedStudent) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* ✅ STUNNING HEADER WITH GRADIENT */}
          <Card
            sx={{
              mb: 4,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(5, 150, 105, 0.25)',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'none\'/%3E%3Cpath d=\'M30 30m-10 0a10 10 0 1 1 20 0a10 10 0 1 1-20 0\' fill=\'%23ffffff\' opacity=\'0.05\'/%3E%3C/svg%3E")',
                opacity: 0.3,
              },
            }}
          >
            <CardContent sx={{ py: 4, px: 4, position: 'relative', zIndex: 1 }}>
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
                      color: 'white',
                      textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    🎓 لوحة المدرس المساعد
                  </Typography>
                  <Typography
                    variant="h6"
                    fontFamily="Cairo, sans-serif"
                    sx={{ 
                      color: 'rgba(255,255,255,0.95)',
                      fontWeight: 600,
                      textShadow: '0 1px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    تواصل مع طلابك وساعدهم في رحلتهم التعليمية
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Home />}
                  onClick={handleGoHome}
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 800,
                    borderRadius: 3,
                    bgcolor: 'white',
                    color: '#059669',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 24px rgba(255,255,255,0.3)',
                    '&:hover': {
                      bgcolor: '#f0fdf4',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(255,255,255,0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  الصفحة الرئيسية
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* ✅ STATS CARDS */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.15)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.25)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <PeopleOutline sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" fontFamily="Cairo, sans-serif" fontWeight={900}>
                    {DUMMY_STUDENTS.length}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                    إجمالي الطلاب
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(5, 150, 105, 0.15)',
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 32px rgba(5, 150, 105, 0.25)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <TrendingUp sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" fontFamily="Cairo, sans-serif" fontWeight={900}>
                    {onlineStudents}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                    طلاب متصلين
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(236, 72, 153, 0.15)',
                  background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 32px rgba(236, 72, 153, 0.25)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <ChatBubbleOutline sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" fontFamily="Cairo, sans-serif" fontWeight={900}>
                    {totalUnread}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                    رسائل جديدة
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.15)',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.25)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Schedule sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" fontFamily="Cairo, sans-serif" fontWeight={900}>
                    24/7
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                    متاح دائماً
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* ✅ ENHANCED SEARCH BAR */}
          <Card 
            sx={{ 
              mb: 4, 
              borderRadius: 4, 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '2px solid',
              borderColor: 'rgba(5, 150, 105, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(5, 150, 105, 0.3)',
                boxShadow: '0 12px 48px rgba(5, 150, 105, 0.15)',
              },
            }}
          >
            <CardContent sx={{ py: 2.5 }}>
              <TextField
                fullWidth
                placeholder="ابحث عن طالب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#059669', fontSize: 28 }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '1.1rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* ✅ ENHANCED STUDENTS LIST */}
          <Card 
            sx={{ 
              borderRadius: 4, 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', 
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'rgba(5, 150, 105, 0.1)',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                p: 3,
              }}
            >
              <Typography variant="h5" fontFamily="Cairo, sans-serif" fontWeight={900}>
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
                  >
                    لا توجد نتائج
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
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
                          bgcolor: 'linear-gradient(90deg, rgba(5, 150, 105, 0.05) 0%, rgba(16, 185, 129, 0.08) 100%)',
                          transform: 'translateX(-8px)',
                          '&::before': {
                            width: '6px',
                          },
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 0,
                          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                          transition: 'width 0.3s ease',
                        },
                      }}
                    >
                      {/* ✅ Enhanced Avatar with Status Badge */}
                      <Box sx={{ position: 'relative' }}>
                        <Badge
                          badgeContent={student.unreadCount || null}
                          color="error"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 900,
                              fontSize: '0.75rem',
                              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              fontSize: '2.2rem',
                              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                              boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)',
                              border: '3px solid white',
                            }}
                          >
                            {student.avatar}
                          </Avatar>
                        </Badge>
                        {/* Online Status Indicator */}
                        {student.isOnline && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 2,
                              right: 2,
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              bgcolor: '#10b981',
                              border: '3px solid white',
                              boxShadow: '0 0 12px #10b981',
                              animation: 'pulse 2s infinite',
                              '@keyframes pulse': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.6 },
                              },
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
                          sx={{ mb: 0.5, color: '#059669' }}
                        >
                          {student.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                          }}
                        >
                          {student.lastMessage}
                        </Typography>
                      </Box>

                      {/* Right Side */}
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ display: 'block', mb: 1 }}
                        >
                          {student.lastMessageTime}
                        </Typography>
                        <Chip
                          label={student.division}
                          size="small"
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: 900,
                            bgcolor: '#dcfce7',
                            color: '#059669',
                            border: '2px solid #10b981',
                            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.2)',
                          }}
                        />
                      </Box>
                    </Box>
                    {index < filteredStudents.length - 1 && (
                      <Divider sx={{ borderColor: 'rgba(5, 150, 105, 0.1)' }} />
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

  // ✅ ENHANCED CHAT VIEW
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#e5ddd5',
      }}
    >
      {/* ✅ Enhanced Chat Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          color: 'white',
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 4px 20px rgba(5, 150, 105, 0.3)',
        }}
      >
        <IconButton 
          onClick={handleBackToStudents} 
          sx={{ 
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
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
            color: '#059669',
            border: '3px solid rgba(255, 255, 255, 0.3)',
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
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: selectedStudent.isOnline ? '#10b981' : '#9ca3af',
                boxShadow: selectedStudent.isOnline ? '0 0 12px #10b981' : 'none',
                animation: selectedStudent.isOnline ? 'pulse 2s infinite' : 'none',
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
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      {/* ✅ Enhanced Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'%23e5ddd5\'/%3E%3Cpath d=\'M30 30m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0\' fill=\'%23d1c4b4\' opacity=\'0.15\'/%3E%3C/svg%3E")',
        }}
      >
        {(DUMMY_CHAT_MESSAGES[selectedStudent.id] || []).map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'teacher' ? 'flex-end' : 'flex-start',
              mb: 2.5,
              animation: 'fadeIn 0.4s ease-in',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Paper
              elevation={2}
              sx={{
                maxWidth: '75%',
                bgcolor: msg.sender === 'teacher' ? '#dcfce7' : 'white',
                borderRadius: 3,
                position: 'relative',
                border: '1px solid',
                borderColor: msg.sender === 'teacher' ? '#10b981' : '#e5e7eb',
                '&::before': msg.sender === 'teacher' ? {
                  content: '""',
                  position: 'absolute',
                  right: -8,
                  top: 12,
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid #dcfce7',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                } : {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  top: 12,
                  width: 0,
                  height: 0,
                  borderRight: '8px solid white',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="body1"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ wordBreak: 'break-word', mb: 0.5, lineHeight: 1.6 }}
                >
                  {msg.text}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={700}
                  sx={{ display: 'block', textAlign: 'left', fontSize: '0.7rem' }}
                >
                  {msg.time}
                </Typography>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* ✅ Enhanced Message Input */}
      <Box
        sx={{
          background: 'white',
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
          borderTop: '2px solid',
          borderColor: 'rgba(5, 150, 105, 0.1)',
        }}
      >
        <IconButton 
          size="small" 
          sx={{ 
            color: '#059669',
            '&:hover': {
              bgcolor: 'rgba(5, 150, 105, 0.1)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s',
          }}
        >
          <EmojiEmotions />
        </IconButton>

        <IconButton 
          size="small" 
          sx={{ 
            color: '#059669',
            '&:hover': {
              bgcolor: 'rgba(5, 150, 105, 0.1)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s',
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
              borderRadius: 4,
              bgcolor: '#f5f5f5',
              border: '2px solid transparent',
              transition: 'all 0.3s',
              '&:focus-within': {
                bgcolor: 'white',
                borderColor: '#059669',
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
            bgcolor: '#059669',
            color: 'white',
            width: 48,
            height: 48,
            '&:hover': { 
              bgcolor: '#047857',
              transform: 'scale(1.1) rotate(5deg)',
            },
            '&:disabled': { 
              bgcolor: '#d1d5db',
              color: '#9ca3af',
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(5, 150, 105, 0.4)',
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AssistantTeacherDashboard;