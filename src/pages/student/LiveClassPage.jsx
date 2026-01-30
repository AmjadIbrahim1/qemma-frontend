// pages/student/LiveClassPage.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Avatar,
  IconButton,
  TextField,
  List,
  ListItem,
  Tooltip,
  Badge,
  Divider,
} from '@mui/material';
import {
  ArrowBackRounded,
  PlayCircleFilledRounded,
  PeopleRounded,
  CalendarTodayRounded,
  MicRounded,
  MicOffRounded,
  VideocamRounded,
  VideocamOffRounded,
  ScreenShareRounded,
  StopScreenShareRounded,
  PanToolRounded,
  ChatRounded,
  CallEndRounded,
  FullscreenRounded,
  SettingsRounded,
  SendRounded,
  CloseRounded,
  RecordVoiceOverRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';
import { liveSessionsData } from '../../data/studentData';

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  accent: '#db2777',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

const GRADIENTS = {
  1: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  2: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
  3: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
};

// ═══════════════════════════════════════════════════════════════════
// IN-ROOM PANEL COMPONENT (INTEGRATED)
// ═══════════════════════════════════════════════════════════════════

const InRoomPanel = ({ session, onLeave, darkMode }) => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'أحمد محمد', message: 'السلام عليكم', time: '10:30', isTeacher: false },
    { id: 2, user: 'سارة علي', message: 'وعليكم السلام', time: '10:31', isTeacher: false },
    { id: 3, user: 'أ. محمد أحمد', message: 'أهلاً بكم جميعاً، نبدأ الدرس الآن', time: '10:32', isTeacher: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const participants = [
    { id: 1, name: 'أ. محمد أحمد', role: 'teacher', isSpeaking: true, micOn: true, cameraOn: true },
    { id: 2, name: 'أحمد محمد', role: 'student', isSpeaking: false, micOn: true, cameraOn: true },
    { id: 3, name: 'سارة علي', role: 'student', isSpeaking: false, micOn: false, cameraOn: true },
    { id: 4, name: 'محمد حسن', role: 'student', isSpeaking: false, micOn: true, cameraOn: false },
    { id: 5, name: 'فاطمة أحمد', role: 'student', isSpeaking: false, micOn: true, cameraOn: true },
    { id: 6, name: 'علي محمود', role: 'student', isSpeaking: false, micOn: false, cameraOn: false },
    { id: 7, name: 'نور الدين', role: 'student', isSpeaking: false, micOn: true, cameraOn: true },
    { id: 8, name: 'ياسمين خالد', role: 'student', isSpeaking: false, micOn: true, cameraOn: true },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: 'أنت',
          message: newMessage,
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          isTeacher: false,
          isMe: true,
        },
      ]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: darkMode ? '#0f172a' : '#1e293b', color: 'white' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: COLORS.error, px: 2, py: 0.5, borderRadius: 5, animation: 'pulse 2s infinite', '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.7 } } }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white' }} />
            <Typography variant="caption" fontWeight={700} fontFamily="Cairo, sans-serif">مباشر</Typography>
          </Box>
          <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif">{session?.title || 'حصة مباشرة'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>⏱️ 45:23</Typography>
          <Tooltip title="الإعدادات"><IconButton sx={{ color: 'white' }}><SettingsRounded /></IconButton></Tooltip>
          <Tooltip title="ملء الشاشة"><IconButton sx={{ color: 'white' }} onClick={toggleFullscreen}><FullscreenRounded /></IconButton></Tooltip>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Video Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          {/* Main Video */}
          <Box sx={{ flex: 1, bgcolor: '#334155', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 120, height: 120, bgcolor: COLORS.secondary, fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>م</Avatar>
              <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif">أ. محمد أحمد</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RecordVoiceOverRounded sx={{ color: COLORS.success, animation: 'pulse 1s infinite' }} />
                <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>يتحدث الآن...</Typography>
              </Box>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 16, left: 16, bgcolor: 'rgba(0,0,0,0.6)', px: 2, py: 0.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif">أ. محمد أحمد</Typography>
              <VolumeUpRounded sx={{ fontSize: 16, color: COLORS.success }} />
            </Box>
            {screenShare && (
              <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: COLORS.success, px: 2, py: 0.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScreenShareRounded sx={{ fontSize: 16 }} />
                <Typography variant="caption" fontWeight={600} fontFamily="Cairo, sans-serif">أنت تشارك شاشتك</Typography>
              </Box>
            )}
          </Box>

          {/* Participants Grid */}
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#475569', borderRadius: 10 } }}>
            {participants.slice(1, 6).map((participant) => (
              <Box
                key={participant.id}
                sx={{
                  width: 150,
                  height: 100,
                  bgcolor: '#334155',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  border: participant.isSpeaking ? `2px solid ${COLORS.success}` : '2px solid transparent',
                }}
              >
                <Avatar sx={{ width: 40, height: 40, bgcolor: participant.cameraOn ? COLORS.primary : '#64748b', fontSize: 16, fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>
                  {participant.cameraOn ? participant.name.charAt(0) : <VideocamOffRounded sx={{ fontSize: 20 }} />}
                </Avatar>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ mt: 0.5, textAlign: 'center', px: 1 }} noWrap>{participant.name}</Typography>
                <Box sx={{ position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, borderRadius: '50%', bgcolor: participant.micOn ? COLORS.success : COLORS.error, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {participant.micOn ? <MicRounded sx={{ fontSize: 12 }} /> : <MicOffRounded sx={{ fontSize: 12 }} />}
                </Box>
              </Box>
            ))}
            {participants.length > 6 && (
              <Box
                sx={{ width: 150, height: 100, bgcolor: '#475569', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', '&:hover': { bgcolor: '#64748b' } }}
                onClick={() => setShowParticipants(true)}
              >
                <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif">+{participants.length - 6}</Typography>
                <Typography variant="caption" fontFamily="Cairo, sans-serif">المزيد</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Side Panel */}
        {(showChat || showParticipants) && (
          <Box sx={{ width: 320, borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', bgcolor: darkMode ? '#1e293b' : '#334155' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" onClick={() => { setShowChat(true); setShowParticipants(false); }} sx={{ bgcolor: showChat ? COLORS.primary : 'transparent', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, px: 2 }}>💬 المحادثة</Button>
                <Button size="small" onClick={() => { setShowParticipants(true); setShowChat(false); }} sx={{ bgcolor: showParticipants ? COLORS.primary : 'transparent', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, px: 2 }}>👥 ({participants.length})</Button>
              </Box>
              <IconButton size="small" onClick={() => { setShowChat(false); setShowParticipants(false); }} sx={{ color: 'white' }}><CloseRounded /></IconButton>
            </Box>

            {showChat && (
              <>
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#475569', borderRadius: 10 } }}>
                  {chatMessages.map((msg) => (
                    <Box key={msg.id} sx={{ alignSelf: msg.isMe ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                      {!msg.isMe && (
                        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: msg.isTeacher ? '#a78bfa' : '#94a3b8', fontWeight: msg.isTeacher ? 700 : 600, mb: 0.5, display: 'block' }}>
                          {msg.user} {msg.isTeacher && '(المدرس)'}
                        </Typography>
                      )}
                      <Box sx={{ bgcolor: msg.isMe ? COLORS.primary : msg.isTeacher ? COLORS.secondary : '#475569', p: 1.5, borderRadius: 2, borderTopRightRadius: msg.isMe ? 0 : 2, borderTopLeftRadius: msg.isMe ? 2 : 0 }}>
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ wordBreak: 'break-word' }}>{msg.message}</Typography>
                      </Box>
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#64748b', mt: 0.5, display: 'block', textAlign: msg.isMe ? 'right' : 'left' }}>{msg.time}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="اكتب رسالة..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#475569', borderRadius: 2, color: 'white', fontFamily: 'Cairo, sans-serif', '& fieldset': { border: 'none' } }, '& .MuiInputBase-input::placeholder': { color: '#94a3b8', opacity: 1 } }}
                  />
                  <IconButton onClick={handleSendMessage} sx={{ bgcolor: COLORS.primary, color: 'white', '&:hover': { bgcolor: '#1d4ed8' } }}><SendRounded /></IconButton>
                </Box>
              </>
            )}

            {showParticipants && (
              <Box sx={{ flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#475569', borderRadius: 10 } }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#94a3b8', mb: 1, display: 'block' }}>المدرس</Typography>
                  {participants.filter((p) => p.role === 'teacher').map((participant) => (
                    <Box key={participant.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 2, bgcolor: '#475569' }}>
                      <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS.success, border: '2px solid #334155' }} />}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: COLORS.secondary, fontFamily: 'Cairo, sans-serif' }}>{participant.name.charAt(0)}</Avatar>
                      </Badge>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600} fontFamily="Cairo, sans-serif">{participant.name}</Typography>
                        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#a78bfa' }}>المدرس</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {participant.micOn ? <MicRounded sx={{ fontSize: 18, color: COLORS.success }} /> : <MicOffRounded sx={{ fontSize: 18, color: COLORS.error }} />}
                        {participant.cameraOn ? <VideocamRounded sx={{ fontSize: 18, color: COLORS.success }} /> : <VideocamOffRounded sx={{ fontSize: 18, color: COLORS.error }} />}
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                <Box sx={{ p: 2 }}>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#94a3b8', mb: 1, display: 'block' }}>الطلاب ({participants.filter((p) => p.role === 'student').length})</Typography>
                  <List sx={{ p: 0 }}>
                    {participants.filter((p) => p.role === 'student').map((participant) => (
                      <ListItem key={participant.id} sx={{ px: 1.5, py: 1, borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: '#475569' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: COLORS.primary, fontSize: 14, fontFamily: 'Cairo, sans-serif' }}>{participant.name.charAt(0)}</Avatar>
                          <Typography fontFamily="Cairo, sans-serif" sx={{ flex: 1 }} noWrap>{participant.name}</Typography>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {participant.micOn ? <MicRounded sx={{ fontSize: 16, color: COLORS.success }} /> : <MicOffRounded sx={{ fontSize: 16, color: COLORS.error }} />}
                            {participant.cameraOn ? <VideocamRounded sx={{ fontSize: 16, color: COLORS.success }} /> : <VideocamOffRounded sx={{ fontSize: 16, color: COLORS.error }} />}
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Control Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: darkMode ? '#0f172a' : '#1e293b' }}>
        <Tooltip title={micOn ? 'إيقاف الميكروفون' : 'تشغيل الميكروفون'}>
          <IconButton onClick={() => setMicOn(!micOn)} sx={{ width: 56, height: 56, bgcolor: micOn ? '#475569' : COLORS.error, color: 'white', '&:hover': { bgcolor: micOn ? '#64748b' : '#dc2626' } }}>
            {micOn ? <MicRounded sx={{ fontSize: 28 }} /> : <MicOffRounded sx={{ fontSize: 28 }} />}
          </IconButton>
        </Tooltip>

        <Tooltip title={cameraOn ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}>
          <IconButton onClick={() => setCameraOn(!cameraOn)} sx={{ width: 56, height: 56, bgcolor: cameraOn ? '#475569' : COLORS.error, color: 'white', '&:hover': { bgcolor: cameraOn ? '#64748b' : '#dc2626' } }}>
            {cameraOn ? <VideocamRounded sx={{ fontSize: 28 }} /> : <VideocamOffRounded sx={{ fontSize: 28 }} />}
          </IconButton>
        </Tooltip>

        <Tooltip title={screenShare ? 'إيقاف مشاركة الشاشة' : 'مشاركة الشاشة'}>
          <IconButton onClick={() => setScreenShare(!screenShare)} sx={{ width: 56, height: 56, bgcolor: screenShare ? COLORS.success : '#475569', color: 'white', '&:hover': { bgcolor: screenShare ? '#16a34a' : '#64748b' } }}>
            {screenShare ? <StopScreenShareRounded sx={{ fontSize: 28 }} /> : <ScreenShareRounded sx={{ fontSize: 28 }} />}
          </IconButton>
        </Tooltip>

        <Tooltip title={handRaised ? 'إنزال اليد' : 'رفع اليد'}>
          <IconButton
            onClick={() => setHandRaised(!handRaised)}
            sx={{
              width: 56,
              height: 56,
              bgcolor: handRaised ? COLORS.warning : '#475569',
              color: 'white',
              '&:hover': { bgcolor: handRaised ? '#d97706' : '#64748b' },
              animation: handRaised ? 'wave 0.5s infinite alternate' : 'none',
              '@keyframes wave': { '0%': { transform: 'rotate(-5deg)' }, '100%': { transform: 'rotate(5deg)' } },
            }}
          >
            <PanToolRounded sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="المحادثة">
          <IconButton onClick={() => { setShowChat(!showChat); setShowParticipants(false); }} sx={{ width: 56, height: 56, bgcolor: showChat ? COLORS.primary : '#475569', color: 'white', '&:hover': { bgcolor: showChat ? '#1d4ed8' : '#64748b' } }}>
            <Badge badgeContent={3} color="error"><ChatRounded sx={{ fontSize: 28 }} /></Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="المشاركون">
          <IconButton onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); }} sx={{ width: 56, height: 56, bgcolor: showParticipants ? COLORS.primary : '#475569', color: 'white', '&:hover': { bgcolor: showParticipants ? '#1d4ed8' : '#64748b' } }}>
            <Badge badgeContent={participants.length} color="primary"><PeopleRounded sx={{ fontSize: 28 }} /></Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="مغادرة الحصة">
          <Button onClick={onLeave} startIcon={<CallEndRounded />} sx={{ height: 56, px: 4, bgcolor: COLORS.error, color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 3, '&:hover': { bgcolor: '#dc2626' } }}>
            مغادرة
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const LiveClassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();

  const sessionFromNav = location.state?.session;
  const [inSession, setInSession] = useState(!!sessionFromNav);
  const [currentSession, setCurrentSession] = useState(sessionFromNav || null);

  const handleJoinSession = (session) => {
    setCurrentSession(session);
    setInSession(true);
  };

  const handleLeaveSession = () => {
    setInSession(false);
    setCurrentSession(null);
  };

  // If in session, show the room panel
  if (inSession && currentSession) {
    return <InRoomPanel session={currentSession} onLeave={handleLeaveSession} darkMode={darkMode} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)', color: 'white', py: 4, px: 2, mb: 3 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button startIcon={<ArrowBackRounded />} onClick={() => navigate('/student/dashboard')} sx={{ color: 'white' }}>العودة</Button>
          </Box>
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">🎥 الحصص المباشرة</Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Live Now */}
        {liveSessionsData.filter((s) => s.isLive).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>🔴 مباشر الآن</Typography>
            <Grid container spacing={3}>
              {liveSessionsData.filter((s) => s.isLive).map((session) => (
                <Grid item xs={12} md={6} lg={4} key={session.id}>
                  <Card elevation={0} sx={{ background: GRADIENTS[session.courseId] || GRADIENTS[1], borderRadius: 3, p: 3, color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Chip
                          icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS.error, animation: 'blink 1s infinite', '@keyframes blink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />}
                          label="مباشر الآن"
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PeopleRounded sx={{ fontSize: 16 }} />
                          <Typography variant="caption" fontWeight={600}>{session.participants}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>{session.title}</Typography>
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9, mb: 3 }}>{session.teacher}</Typography>
                      <Button
                        fullWidth
                        startIcon={<PlayCircleFilledRounded />}
                        onClick={() => handleJoinSession(session)}
                        sx={{ bgcolor: 'rgba(255,255,255,0.95)', color: '#1e293b', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, py: 1.5, '&:hover': { bgcolor: 'white' } }}
                      >
                        🚀 انضم الآن
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

       
      </Container>
    </Box>
  );
};

export default LiveClassPage;