// pages/student/CourseDashboard.jsx
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Card, CardContent, Avatar, Chip,
  IconButton, Menu, MenuItem, Divider, Tooltip, Badge, ListItemIcon,
  ListItemText, Button, LinearProgress, Tabs, Tab, List, ListItem,
  Collapse, TextField, Fab,
} from '@mui/material';
import {
  NotificationsRounded, MoreVert, ExitToApp, Person, SettingsRounded,
  HomeRounded, SchoolRounded, QuizRounded, ChatRounded, VideoCallRounded,
  ArrowBackRounded, PlayCircleFilledRounded, LockRounded, CheckCircleRounded,
  ExpandMoreRounded, ExpandLessRounded, OndemandVideoRounded, DescriptionRounded,
  MenuBookRounded, AssignmentRounded, FolderRounded, GradeRounded,
  EventNoteRounded, ForumRounded, CloudUploadRounded, ScheduleRounded,
  HelpOutlineRounded, AttachFileRounded, PictureAsPdfRounded, VideoLibraryRounded,
  LinkRounded, DownloadRounded, VisibilityRounded, SendRounded,
  ChatBubbleOutlineRounded, PushPinRounded, CloseRounded, PeopleRounded,
  AccessTimeRounded, StarRounded, SmartToyRounded, ReplyRounded,
  ThumbUpOutlined, NavigateBeforeRounded,
} from '@mui/icons-material';
import ThemeContext from '../../contexts/ThemeContext';
import {
  getCourseById, getCurriculumData, getCourseLiveSessionsData,
  getExamsData, getAssignmentsData, getResourcesData,
  getDiscussionsData, getGradesData, getAttendanceData,
} from '../../data/coursesData';
import { studentData } from '../../data/studentData';

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const COLORS = { primary: '#2563eb', secondary: '#7c3aed', accent: '#db2777', success: '#059669', warning: '#f59e0b', error: '#ef4444' };
const GRADIENTS = {
  main: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
  blue: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  purple: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
  green: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
};

const getInitials = (name) => name ? (name.split(' ').length >= 2 ? name.split(' ')[0][0] + name.split(' ')[1][0] : name[0]) : 'U';

const NAV_ITEMS = [
  { icon: <HomeRounded />, label: 'الرئيسية', path: '/student', color: COLORS.primary },
  { icon: <SchoolRounded />, label: 'كورساتي', path: '/student/courses', color: COLORS.secondary },
  { icon: <QuizRounded />, label: 'الاختبارات', path: '/student/exams', color: COLORS.success },
  { icon: <VideoCallRounded />, label: 'الحصص المباشرة', path: '/student/live-class', color: COLORS.accent },
  { icon: <ChatRounded />, label: 'المساعد الذكي', path: '/student/assistant', color: COLORS.warning },
];

const TABS = [
  { label: 'المنهج', icon: <MenuBookRounded /> },
  { label: 'الواجبات', icon: <AssignmentRounded /> },
  { label: 'الاختبارات', icon: <QuizRounded /> },
  { label: 'الحصص', icon: <VideoCallRounded /> },
  { label: 'الموارد', icon: <FolderRounded /> },
  { label: 'الدرجات', icon: <GradeRounded /> },
  { label: 'الحضور', icon: <EventNoteRounded /> },
  { label: 'المناقشات', icon: <ForumRounded /> },
];

// ═══════════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════════

const GlassCard = ({ title, icon, children, actionLabel, onAction, darkMode }) => (
  <Box sx={{ bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 3, border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', overflow: 'hidden', transition: 'all 0.3s', height: '100%', '&:hover': { transform: 'translateY(-4px)', boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)' } }}>
    <Box sx={{ height: 4, background: GRADIENTS.main }} />
    <Box sx={{ p: 3 }}>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, pb: 2, borderBottom: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
            <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{title}</Typography>
          </Box>
          {actionLabel && (
            <Button onClick={onAction} endIcon={<ArrowBackRounded />} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 13, color: darkMode ? '#94a3b8' : '#64748b', bgcolor: darkMode ? '#334155' : '#f1f5f9', borderRadius: 2, px: 2, '&:hover': { bgcolor: darkMode ? '#475569' : '#e2e8f0', color: COLORS.primary } }}>
              {actionLabel}
            </Button>
          )}
        </Box>
      )}
      {children}
    </Box>
  </Box>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const CourseDashboard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState([1]);
  const [expandedDiscussion, setExpandedDiscussion] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const course = getCourseById(courseId);
  const curriculum = getCurriculumData(courseId);
  const assignments = getAssignmentsData(courseId);
  const exams = getExamsData(courseId);
  const liveSessions = getCourseLiveSessionsData(courseId);
  const resources = getResourcesData(courseId);
  const grades = getGradesData(courseId);
  const attendance = getAttendanceData(courseId);
  const discussions = getDiscussionsData(courseId);

  const handleLogout = () => { setAnchorEl(null); localStorage.removeItem('token'); navigate('/login'); };
  const toggleUnit = (unitId) => setExpandedUnits((prev) => prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]);

  const gradedItems = grades.filter((g) => g.grade !== null);
  const totalWeightedGrade = gradedItems.reduce((sum, g) => sum + (g.grade * g.weight) / 100, 0);
  const totalWeight = gradedItems.reduce((sum, g) => sum + g.weight, 0);
  const overallGrade = totalWeight > 0 ? Math.round((totalWeightedGrade / totalWeight) * 100) : 0;

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const lateCount = attendance.filter((a) => a.status === 'late').length;
  const attendanceRate = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

  const getNextLesson = () => { for (const unit of curriculum) { for (const lesson of unit.lessons) { if (lesson.status === 'available') return lesson; } } return null; };
  const nextLesson = getNextLesson();

  const getStatusIcon = (status) => status === 'completed' ? <CheckCircleRounded sx={{ color: COLORS.success }} /> : status === 'available' ? <PlayCircleFilledRounded sx={{ color: COLORS.primary }} /> : <LockRounded sx={{ color: '#94a3b8' }} />;
  const getStatusColor = (status) => status === 'completed' ? COLORS.success : status === 'available' ? COLORS.primary : '#94a3b8';
  const getAssignmentStatus = (status) => status === 'pending' ? { label: 'قيد الانتظار', color: COLORS.warning, bgColor: '#fffbeb' } : status === 'submitted' ? { label: 'تم التسليم', color: COLORS.primary, bgColor: '#eff6ff' } : status === 'graded' ? { label: 'تم التصحيح', color: COLORS.success, bgColor: '#ecfdf5' } : { label: status, color: '#64748b', bgColor: '#f8fafc' };
  const getExamStatus = (status) => status === 'upcoming' ? { label: 'قادم', color: COLORS.warning, bgColor: '#fffbeb' } : status === 'completed' ? { label: 'مكتمل', color: COLORS.success, bgColor: '#ecfdf5' } : { label: 'جاري', color: COLORS.primary, bgColor: '#eff6ff' };
  const getResourceType = (type) => type === 'pdf' ? { icon: <PictureAsPdfRounded />, color: COLORS.error, label: 'PDF' } : type === 'video' ? { icon: <VideoLibraryRounded />, color: COLORS.secondary, label: 'فيديو' } : type === 'doc' ? { icon: <DescriptionRounded />, color: COLORS.primary, label: 'مستند' } : type === 'link' ? { icon: <LinkRounded />, color: COLORS.success, label: 'رابط' } : { icon: <DescriptionRounded />, color: '#64748b', label: type };
  const getGradeType = (type) => type === 'quiz' ? { label: 'اختبار', color: COLORS.secondary } : type === 'assignment' ? { label: 'واجب', color: COLORS.primary } : type === 'midterm' ? { label: 'نصفي', color: COLORS.warning } : type === 'final' ? { label: 'نهائي', color: COLORS.error } : type === 'participation' ? { label: 'مشاركة', color: COLORS.success } : { label: type, color: '#64748b' };
  const getGradeColor = (grade) => grade >= 90 ? COLORS.success : grade >= 80 ? COLORS.primary : grade >= 70 ? COLORS.secondary : grade >= 60 ? COLORS.warning : COLORS.error;
  const getAttendanceStatus = (status) => status === 'present' ? { label: 'حاضر', color: COLORS.success, bgColor: '#ecfdf5', icon: <CheckCircleRounded /> } : status === 'absent' ? { label: 'غائب', color: COLORS.error, bgColor: '#fef2f2', icon: <CloseRounded /> } : status === 'late' ? { label: 'متأخر', color: COLORS.warning, bgColor: '#fffbeb', icon: <ScheduleRounded /> } : { label: status, color: '#64748b', bgColor: '#f8fafc', icon: null };

  const handleDownload = (resource) => alert(`⬇️ جاري تحميل: ${resource.title}`);
  const handlePreview = (resource) => alert(`👁️ معاينة: ${resource.title}`);
  const handleStartExam = (exam) => navigate(`/student/exam/${exam.id}`, { state: { exam, courseId } });
  const handleJoinSession = (session) => navigate('/student/live-class', { state: { session, joinDirectly: true, courseId } });
  const handleAskQuestion = () => { if (newQuestion.trim()) { alert(`✅ تم إرسال سؤالك`); setNewQuestion(''); } };
  const handleReply = () => { if (replyText.trim()) { alert(`✅ تم إرسال ردك`); setReplyText(''); setReplyingTo(null); } };

  if (!course) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: darkMode ? '#0f172a' : '#f8fafc' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>😕 الكورس غير موجود</Typography>
          <Button variant="contained" onClick={() => navigate(-1)} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, px: 4 }}>العودة للخلف</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 12 }}>

      {/* HEADER */}
      <Box sx={{ background: GRADIENTS.main, color: 'white', py: 4, px: 2, mb: 3 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigate('/student/dashboard')} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><HomeRounded /></IconButton>
              <NavigateBeforeRounded sx={{ opacity: 0.6 }} />
              <IconButton onClick={() => navigate('/student/courses')} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><SchoolRounded /></IconButton>
              <NavigateBeforeRounded sx={{ opacity: 0.6 }} />
              <Chip label={course.shortTitle || course.title} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="الإشعارات"><IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><Badge badgeContent={3} color="error"><NotificationsRounded /></Badge></IconButton></Tooltip>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><MoreVert /></IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>{course.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar src={course.teacherAvatar} sx={{ width: 48, height: 48, bgcolor: 'rgba(255,255,255,0.2)' }}>{course.teacher?.charAt(0)}</Avatar>
                <Box><Typography fontFamily="Cairo, sans-serif" fontWeight={600}>{course.teacher}</Typography><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>المدرس</Typography></Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
                <Chip icon={<PeopleRounded sx={{ fontSize: 16, color: 'white !important' }} />} label={`${course.studentsCount || 0} طالب`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
                <Chip icon={<AccessTimeRounded sx={{ fontSize: 16, color: 'white !important' }} />} label={course.duration || 'غير محدد'} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
                <Chip icon={<StarRounded sx={{ fontSize: 16, color: '#fbbf24 !important' }} />} label={`${course.rating || 0}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
              </Box>
              <Box sx={{ maxWidth: 400 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2" fontFamily="Cairo, sans-serif">التقدم في الكورس</Typography><Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif">{course.progress || 0}%</Typography></Box>
                <LinearProgress variant="determinate" value={course.progress || 0} sx={{ height: 10, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.2)', '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: 'white' } }} />
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9, mt: 0.5, display: 'block' }}>{course.completedLessons || 0} من {course.totalLessons || 0} درس مكتمل</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MAIN MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { mt: 1, minWidth: 240, borderRadius: 3, bgcolor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}` } }}>
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 48, height: 48, bgcolor: COLORS.secondary }}>{getInitials(studentData.name)}</Avatar>
            <Box><Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{studentData.name}</Typography><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{studentData.email}</Typography></Box>
          </Box>
        </Box>
        {NAV_ITEMS.map((item) => (<MenuItem key={item.path} onClick={() => { navigate(item.path); setAnchorEl(null); }} sx={{ py: 1.5 }}><ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon><ListItemText primary={item.label} primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, color: darkMode ? '#f1f5f9' : '#1e293b' }} /></MenuItem>))}
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null); }}><ListItemIcon><Person sx={{ color: COLORS.secondary }} /></ListItemIcon><ListItemText primary="الملف الشخصي" primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif' }} /></MenuItem>
        
        <MenuItem onClick={handleLogout} sx={{ color: COLORS.error }}><ListItemIcon><ExitToApp sx={{ color: COLORS.error }} /></ListItemIcon><ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif' }} /></MenuItem>
      </Menu>

      {/* NOTIFICATIONS MENU */}
      <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={() => setNotifAnchor(null)} PaperProps={{ sx: { mt: 1, width: 320, borderRadius: 3, bgcolor: darkMode ? '#1e293b' : '#fff' } }}>
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}` }}><Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>🔔 الإشعارات</Typography></Box>
        <Box sx={{ p: 2 }}>
          {[{ text: '📝 واجب جديد في هذا الكورس', time: 'منذ 5 دقائق', color: COLORS.primary }, { text: '🎥 حصة مباشرة بعد ساعة', time: 'منذ ساعة', color: COLORS.accent }, { text: '✅ تم تصحيح الاختبار', time: 'منذ ساعتين', color: COLORS.success }].map((n, i) => (
            <Box key={i} sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : `${n.color}10`, borderRight: `3px solid ${n.color}`, mb: 1.5, cursor: 'pointer', transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : `${n.color}20` } }}>
              <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{n.text}</Typography>
              <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{n.time}</Typography>
            </Box>
          ))}
        </Box>
      </Menu>

      {/* MAIN CONTENT */}
      <Container maxWidth="xl">
        {/* TABS */}
        <Box sx={{ bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 3, border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', mb: 3, overflow: 'hidden' }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ '& .MuiTab-root': { fontFamily: 'Cairo, sans-serif', fontWeight: 600, minHeight: 60, color: darkMode ? '#94a3b8' : '#64748b', '&.Mui-selected': { color: COLORS.primary } }, '& .MuiTabs-indicator': { bgcolor: COLORS.primary, height: 3 } }}>
            {TABS.map((tab, i) => <Tab key={i} label={tab.label} icon={tab.icon} iconPosition="start" />)}
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* TAB 0: المنهج */}
              {activeTab === 0 && (
                <GlassCard title="📚 المنهج والدروس" icon="📖" darkMode={darkMode}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {curriculum.map((unit) => (
                      <Box key={unit.id} sx={{ border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', borderRadius: 2, overflow: 'hidden' }}>
                        <Box onClick={() => toggleUnit(unit.id)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9' } }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{unit.unitTitle}</Typography>
                            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{unit.lessons.length} دروس • {unit.description}</Typography>
                          </Box>
                          <IconButton size="small">{expandedUnits.includes(unit.id) ? <ExpandLessRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} /> : <ExpandMoreRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />}</IconButton>
                        </Box>
                        <Collapse in={expandedUnits.includes(unit.id)}>
                          <List sx={{ p: 0 }}>
                            {unit.lessons.map((lesson) => (
                              <ListItem key={lesson.id} sx={{ borderTop: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', opacity: lesson.status === 'locked' ? 0.6 : 1, cursor: lesson.status !== 'locked' ? 'pointer' : 'default', transition: 'all 0.2s ease', '&:hover': { bgcolor: lesson.status !== 'locked' ? (darkMode ? '#334155' : '#f8fafc') : undefined, transform: lesson.status !== 'locked' ? 'translateX(-5px)' : undefined } }} onClick={() => lesson.status !== 'locked' && navigate(`/student/course/${courseId}/lesson/${lesson.id}`, { state: { lesson } })}>
                                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: `${getStatusColor(lesson.status)}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>{getStatusIcon(lesson.status)}</Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{lesson.title}</Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>⏱️ {lesson.duration}</Typography>
                                    {lesson.hasVideo && <OndemandVideoRounded sx={{ fontSize: 14, color: COLORS.secondary }} />}
                                    {lesson.hasQuiz && <QuizRounded sx={{ fontSize: 14, color: COLORS.warning }} />}
                                    {lesson.hasNotes && <DescriptionRounded sx={{ fontSize: 14, color: COLORS.success }} />}
                                  </Box>
                                </Box>
                                {lesson.status === 'available' && <Button startIcon={<PlayCircleFilledRounded />} onClick={(e) => { e.stopPropagation(); navigate(`/student/course/${courseId}/lesson/${lesson.id}`, { state: { lesson } }); }} sx={{ bgcolor: COLORS.primary, color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, px: 2, '&:hover': { bgcolor: '#1d4ed8' } }}>ابدأ</Button>}
                                {lesson.status === 'completed' && <Chip label="✓ مكتمل" size="small" sx={{ bgcolor: '#ecfdf5', color: COLORS.success, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />}
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </Box>
                    ))}
                  </Box>
                </GlassCard>
              )}

              {/* TAB 1: الواجبات */}
              {activeTab === 1 && (
  <GlassCard title="📝 الواجبات" icon="✏️" darkMode={darkMode}>
    {assignments.map((a) => { const cfg = getAssignmentStatus(a.status); return (
      <Box key={a.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb', borderRight: `4px solid ${cfg.color}`, mb: 1.5, transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9', transform: 'translateX(-5px)' } }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${cfg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color }}><AssignmentRounded /></Box>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>{a.title}</Typography>
          <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}>{a.description}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><ScheduleRounded sx={{ fontSize: 14, color: COLORS.warning }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: COLORS.warning, fontWeight: 600 }}>{a.dueDate}</Typography></Box>
            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{a.points} نقطة</Typography>
            {a.attachmentsCount > 0 && <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><AttachFileRounded sx={{ fontSize: 14 }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{a.attachmentsCount} مرفق</Typography></Box>}
          </Box>
          {a.feedback && <Box sx={{ mt: 2, p: 1.5, borderRadius: 1.5, bgcolor: darkMode ? '#1e293b' : '#f0fdf4', borderRight: `3px solid ${COLORS.success}` }}><Typography variant="caption" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.success, display: 'block', mb: 0.5 }}>ملاحظات المدرس:</Typography><Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>{a.feedback}</Typography></Box>}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Chip label={cfg.label} size="small" sx={{ bgcolor: darkMode ? '#475569' : cfg.bgColor, color: cfg.color, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
          {a.status === 'pending' && (
            <Button 
              startIcon={<CloudUploadRounded />} 
              size="small" 
              onClick={() => navigate(`/student/submit-assignment`, { state: { assignment: a } })}
              sx={{ 
                bgcolor: cfg.color, 
                color: 'white', 
                fontFamily: 'Cairo, sans-serif', 
                fontWeight: 600, 
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: '#d97706',
                  transform: 'scale(1.05)',
                }
              }}
            >
              تسليم
            </Button>
          )}
          {a.status === 'submitted' && (
            <Button 
              startIcon={<VisibilityRounded />} 
              size="small" 
              onClick={() => navigate(`/student/submit-assignment`, { state: { assignment: a, viewOnly: true } })}
              sx={{ 
                bgcolor: 'transparent',
                border: `1px solid ${cfg.color}`,
                color: cfg.color, 
                fontFamily: 'Cairo, sans-serif', 
                fontWeight: 600, 
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: `${cfg.color}15`,
                }
              }}
            >
              عرض التسليم
            </Button>
          )}
          {a.status === 'graded' && <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.success }}>{a.grade}%</Typography>}
        </Box>
      </Box>
    ); })}
  </GlassCard>
)}

              {/* TAB 2: الاختبارات */}
             {activeTab === 2 && (
  <GlassCard title="📊 الاختبارات" icon="🎯" darkMode={darkMode} actionLabel="جميع الاختبارات" onAction={() => navigate('/student/exams')}>
    {exams.map((e) => { const cfg = getExamStatus(e.status); return (
      <Box key={e.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb', borderRight: `4px solid ${cfg.color}`, mb: 1.5, transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9', transform: 'translateX(-5px)' } }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${cfg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color }}><QuizRounded /></Box>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>{e.title}</Typography>
          <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}>{e.description}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><ScheduleRounded sx={{ fontSize: 14, color: COLORS.secondary }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{e.date}</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><AccessTimeRounded sx={{ fontSize: 14, color: COLORS.primary }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{e.duration}</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><HelpOutlineRounded sx={{ fontSize: 14, color: COLORS.warning }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{e.questionsCount} سؤال</Typography></Box>
          </Box>
          {e.topics && e.status === 'upcoming' && <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>{e.topics.map((t, i) => <Chip key={i} label={t} size="small" sx={{ height: 20, fontSize: 10, fontFamily: 'Cairo, sans-serif', bgcolor: '#7c3aed15', color: COLORS.secondary }} />)}</Box>}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Chip label={cfg.label} size="small" sx={{ bgcolor: darkMode ? '#475569' : cfg.bgColor, color: cfg.color, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
          
          {/* اختبار قادم */}
          {e.status === 'upcoming' && (
            <Button 
              startIcon={<PlayCircleFilledRounded />} 
              size="small" 
              onClick={() => navigate(`/student/exams`, { state: { exam: e, courseId } })}
              sx={{ bgcolor: COLORS.primary, color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, transition: 'all 0.2s ease', '&:hover': { bgcolor: '#1d4ed8', transform: 'scale(1.05)' } }}
            >
              ابدأ الاختبار
            </Button>
          )}

          {/* اختبار جاري */}
          {e.status === 'in-progress' && (
            <Button 
              startIcon={<PlayCircleFilledRounded />} 
              size="small" 
              onClick={() => navigate(`/student/exams`, { state: { exam: e, courseId, resume: true } })}
              sx={{ bgcolor: COLORS.warning, color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, animation: 'pulse 2s infinite', '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.7 } }, '&:hover': { bgcolor: '#d97706', transform: 'scale(1.05)' } }}
            >
              استكمال
            </Button>
          )}

          {/* اختبار مكتمل */}
          {e.status === 'completed' && (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.success, lineHeight: 1 }}>{e.grade}%</Typography>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>الترتيب: {e.rank}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    ); })}
  </GlassCard>
)}

              {/* TAB 3: الحصص المباشرة */}
              {activeTab === 3 && (
                <GlassCard title="🎥 الحصص المباشرة" icon="📺" darkMode={darkMode}>
                  {liveSessions.map((s) => { const gradient = [GRADIENTS.blue, GRADIENTS.purple, GRADIENTS.green][(s.id - 1) % 3]; return (
                    <Box key={s.id} sx={{ background: gradient, borderRadius: 3, p: 2.5, color: 'white', position: 'relative', overflow: 'hidden', mb: 2, transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
                      <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                          {s.isLive && <Chip icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS.error, animation: 'blink 1s infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />} label="مباشر" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif' }} />}
                          {s.participants && <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PeopleRounded sx={{ fontSize: 16 }} /><Typography variant="caption" fontWeight={600}>{s.participants}</Typography></Box>}
                        </Box>
                        <Typography variant="subtitle1" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 0.5 }}>{s.title}</Typography>
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9, mb: 0.5 }}>{s.teacher}</Typography>
                        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.85, display: 'block', mb: 2 }}>{s.isLive ? '🔴' : '⏰'} {s.time}</Typography>
                        <Button fullWidth startIcon={<PlayCircleFilledRounded />} onClick={() => handleJoinSession(s)} sx={{ bgcolor: 'rgba(255,255,255,0.95)', color: '#1e293b', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: 'white' } }}>🚀 انضم الآن</Button>
                      </Box>
                    </Box>
                  ); })}
                </GlassCard>
              )}

              {/* TAB 4: الموارد */}
              {activeTab === 4 && (
                <GlassCard title="📁 الموارد والملفات" icon="📚" darkMode={darkMode}>
                  {resources.map((r) => { const cfg = getResourceType(r.type); return (
                    <Box key={r.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb', mb: 1.5, transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9', transform: 'translateX(-5px)' } }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${cfg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color }}>{cfg.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>{r.title}</Typography>
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 0.5 }}>{r.description}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Chip label={cfg.label} size="small" sx={{ height: 20, fontSize: 10, fontFamily: 'Cairo, sans-serif', bgcolor: `${cfg.color}15`, color: cfg.color }} />
                          {r.size && <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{r.size}</Typography>}
                          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>📅 {r.date}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="معاينة"><IconButton size="small" onClick={() => handlePreview(r)} sx={{ bgcolor: '#2563eb15', color: COLORS.primary, transition: 'all 0.2s ease', '&:hover': { bgcolor: COLORS.primary, color: 'white', transform: 'scale(1.1)' } }}><VisibilityRounded fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="تحميل"><IconButton size="small" onClick={() => handleDownload(r)} sx={{ bgcolor: '#05966915', color: COLORS.success, transition: 'all 0.2s ease', '&:hover': { bgcolor: COLORS.success, color: 'white', transform: 'scale(1.1)' } }}><DownloadRounded fontSize="small" /></IconButton></Tooltip>
                      </Box>
                    </Box>
                  ); })}
                </GlassCard>
              )}

              {/* TAB 5: الدرجات */}
              {activeTab === 5 && (
                <GlassCard title="📊 سجل الدرجات" icon="🎯" darkMode={darkMode}>
                  <Box sx={{ p: 3, borderRadius: 3, background: GRADIENTS.purple, color: 'white', textAlign: 'center', mb: 3, transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <Typography variant="h2" fontWeight={900} fontFamily="Cairo, sans-serif">{overallGrade}%</Typography>
                    <Typography fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>المعدل التراكمي الحالي</Typography>
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.75 }}>محسوب من {totalWeight}% من الدرجة الكلية</Typography>
                  </Box>
                  {grades.map((g) => { const cfg = getGradeType(g.type); const gradeColor = g.grade ? getGradeColor(g.grade) : '#64748b'; return (
                    <Box key={g.id} sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb', mb: 1.5, transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9', transform: 'translateX(-5px)' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{g.title}</Typography>
                          <Chip label={cfg.label} size="small" sx={{ height: 20, fontSize: 10, fontFamily: 'Cairo, sans-serif', bgcolor: `${cfg.color}15`, color: cfg.color }} />
                        </Box>
                        {g.grade !== null ? <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: gradeColor }}>{g.grade}/{g.maxGrade}</Typography> : <Chip label={g.status === 'upcoming' ? 'قادم' : 'مستمر'} size="small" sx={{ bgcolor: '#f59e0b15', color: COLORS.warning, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />}
                      </Box>
                      {g.grade !== null && <LinearProgress variant="determinate" value={(g.grade / g.maxGrade) * 100} sx={{ height: 6, borderRadius: 3, bgcolor: darkMode ? '#475569' : '#e2e8f0', mb: 1, '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: gradeColor } }} />}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>📅 {g.date}</Typography><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>الوزن: {g.weight}%</Typography></Box>
                    </Box>
                  ); })}
                </GlassCard>
              )}

              {/* TAB 6: الحضور */}
              {activeTab === 6 && (
                <GlassCard title="📅 سجل الحضور" icon="✅" darkMode={darkMode}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    {[{ label: 'نسبة الحضور', value: `${attendanceRate}%`, color: COLORS.success, bg: '#ecfdf5' }, { label: 'حضور', value: presentCount, color: COLORS.success, bg: '#ecfdf5' }, { label: 'غياب', value: absentCount, color: COLORS.error, bg: '#fef2f2' }, { label: 'تأخير', value: lateCount, color: COLORS.warning, bg: '#fffbeb' }].map((s, i) => (
                      <Box key={i} sx={{ flex: 1, minWidth: 80, p: 2, borderRadius: 2, bgcolor: s.bg, textAlign: 'center', transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 5px 15px ${s.color}30` } }}>
                        <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: s.color }}>{s.value}</Typography>
                        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: s.color }}>{s.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                  {attendance.map((a) => { const cfg = getAttendanceStatus(a.status); return (
                    <Box key={a.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb', mb: 1, transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9', transform: 'translateX(-5px)' } }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: darkMode ? '#475569' : cfg.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color }}>{cfg.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{a.session}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>📅 {a.date}</Typography>
                          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>⏱️ {a.duration}</Typography>
                          {a.joinTime && <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>دخول: {a.joinTime}</Typography>}
                        </Box>
                      </Box>
                      <Chip label={cfg.label} size="small" sx={{ bgcolor: darkMode ? '#475569' : cfg.bgColor, color: cfg.color, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
                    </Box>
                  ); })}
                </GlassCard>
              )}

              {/* TAB 7: المناقشات */}
              {activeTab === 7 && (
                <GlassCard title="💬 المناقشات والأسئلة" icon="🗣️" darkMode={darkMode}>
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb' }}>
                    <Typography variant="subtitle2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1.5 }}>💡 اطرح سؤالاً جديداً</Typography>
                    <TextField fullWidth multiline rows={3} placeholder="اكتب سؤالك هنا..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} sx={{ mb: 2, '& .MuiOutlinedInput-root': { bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 2, fontFamily: 'Cairo, sans-serif' }, '& .MuiInputBase-input': { color: darkMode ? '#f1f5f9' : '#1e293b' } }} />
                    <Button startIcon={<SendRounded />} onClick={handleAskQuestion} disabled={!newQuestion.trim()} sx={{ bgcolor: COLORS.primary, color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, px: 3, '&:hover': { bgcolor: '#1d4ed8' }, '&:disabled': { bgcolor: darkMode ? '#475569' : '#e2e8f0' } }}>إرسال السؤال</Button>
                  </Box>
                  {discussions.map((d) => (
                    <Box key={d.id}>
                      <Box onClick={() => setExpandedDiscussion(expandedDiscussion === d.id ? null : d.id)} sx={{ p: 2, borderRadius: expandedDiscussion === d.id ? '12px 12px 0 0' : 2, bgcolor: darkMode ? '#334155' : '#f8fafc', border: '1px solid', borderColor: d.isPinned ? COLORS.secondary : darkMode ? '#475569' : '#e5e7eb', borderBottom: expandedDiscussion === d.id ? 'none' : undefined, mb: expandedDiscussion === d.id ? 0 : 1.5, cursor: 'pointer', transition: 'all 0.2s ease', '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9' } }}>
                        {d.isPinned && <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}><PushPinRounded sx={{ fontSize: 14, color: COLORS.secondary }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: COLORS.secondary, fontWeight: 600 }}>مثبت</Typography></Box>}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Avatar sx={{ width: 44, height: 44, bgcolor: d.authorRole === 'teacher' ? COLORS.secondary : COLORS.primary, fontSize: 14, fontWeight: 700 }}>{d.authorAvatar}</Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                              <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{d.title}</Typography>
                              {d.isResolved && <Chip icon={<CheckCircleRounded sx={{ fontSize: 14 }} />} label="تم الحل" size="small" sx={{ height: 20, fontSize: 10, fontFamily: 'Cairo, sans-serif', bgcolor: '#ecfdf5', color: COLORS.success }} />}
                              {d.authorRole === 'teacher' && <Chip label="إجابة المدرس" size="small" sx={{ height: 20, fontSize: 10, fontFamily: 'Cairo, sans-serif', bgcolor: '#7c3aed15', color: COLORS.secondary }} />}
                            </Box>
                            <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{d.content}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                              <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: d.authorRole === 'teacher' ? COLORS.secondary : darkMode ? '#94a3b8' : '#64748b', fontWeight: d.authorRole === 'teacher' ? 600 : 400 }}>{d.author} {d.authorRole === 'teacher' && '👨‍🏫'}</Typography>
                              <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>{d.time}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><ChatBubbleOutlineRounded sx={{ fontSize: 14, color: COLORS.primary }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: COLORS.primary, fontWeight: 600 }}>{d.repliesCount} رد</Typography></Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><VisibilityRounded sx={{ fontSize: 14, color: darkMode ? '#64748b' : '#94a3b8' }} /><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>{d.viewsCount}</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>{d.tags.map((tag, i) => <Chip key={i} label={tag} size="small" sx={{ height: 20, fontSize: 10, fontFamily: 'Cairo, sans-serif', bgcolor: darkMode ? '#475569' : '#e2e8f0', color: darkMode ? '#e2e8f0' : '#64748b' }} />)}</Box>
                          </Box>
                          <IconButton size="small">{expandedDiscussion === d.id ? <ExpandLessRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} /> : <ExpandMoreRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />}</IconButton>
                        </Box>
                      </Box>
                      <Collapse in={expandedDiscussion === d.id}>
                        <Box sx={{ border: '1px solid', borderColor: darkMode ? '#475569' : '#e5e7eb', borderTop: 'none', borderRadius: '0 0 12px 12px', bgcolor: darkMode ? '#1e293b' : 'white', mb: 1.5, overflow: 'hidden' }}>
                          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb' }}>
                            <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#e2e8f0' : '#1e293b', lineHeight: 1.8 }}>{d.content}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                              <Button size="small" startIcon={<ThumbUpOutlined sx={{ fontSize: 16 }} />} sx={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: darkMode ? '#94a3b8' : '#64748b' }}>مفيد ({d.likesCount || 0})</Button>
                              <Button size="small" startIcon={<ReplyRounded sx={{ fontSize: 16 }} />} onClick={(e) => { e.stopPropagation(); setReplyingTo(d.id); }} sx={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: COLORS.primary }}>رد</Button>
                            </Box>
                          </Box>
                          {d.replies && d.replies.length > 0 && (
                            <Box sx={{ p: 2 }}>
                              <Typography variant="subtitle2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>الردود ({d.replies.length})</Typography>
                              {d.replies.map((reply, i) => (
                                <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2, p: 2, borderRadius: 2, bgcolor: reply.isTeacher ? (darkMode ? '#7c3aed15' : '#f5f3ff') : (darkMode ? '#334155' : '#f8fafc'), borderRight: reply.isTeacher ? `3px solid ${COLORS.secondary}` : 'none', transition: 'all 0.2s ease', '&:hover': { transform: 'translateX(-3px)' } }}>
                                  <Avatar sx={{ width: 36, height: 36, bgcolor: reply.isTeacher ? COLORS.secondary : COLORS.primary, fontSize: 12 }}>{reply.authorAvatar}</Avatar>
                                  <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                      <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{reply.author}</Typography>
                                      {reply.isTeacher && <Chip label="المدرس 👨‍🏫" size="small" sx={{ height: 18, fontSize: 9, fontFamily: 'Cairo, sans-serif', bgcolor: COLORS.secondary, color: 'white' }} />}
                                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>{reply.time}</Typography>
                                    </Box>
                                    <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#e2e8f0' : '#374151', lineHeight: 1.7 }}>{reply.content}</Typography>
                                    <Button size="small" startIcon={<ThumbUpOutlined sx={{ fontSize: 14 }} />} sx={{ mt: 1, fontFamily: 'Cairo, sans-serif', fontSize: 11, color: darkMode ? '#94a3b8' : '#64748b', minWidth: 'auto', p: 0.5 }}>{reply.likes || 0}</Button>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          )}
                          {replyingTo === d.id && (
                            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb' }}>
                              <TextField fullWidth multiline rows={2} placeholder="اكتب ردك هنا..." value={replyText} onChange={(e) => setReplyText(e.target.value)} onClick={(e) => e.stopPropagation()} sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { bgcolor: darkMode ? '#334155' : '#f8fafc', borderRadius: 2, fontFamily: 'Cairo, sans-serif' }, '& .MuiInputBase-input': { color: darkMode ? '#f1f5f9' : '#1e293b' } }} />
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button size="small" startIcon={<SendRounded />} onClick={(e) => { e.stopPropagation(); handleReply(); }} disabled={!replyText.trim()} sx={{ bgcolor: COLORS.primary, color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#1d4ed8' } }}>إرسال</Button>
                                <Button size="small" onClick={(e) => { e.stopPropagation(); setReplyingTo(null); setReplyText(''); }} sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontFamily: 'Cairo, sans-serif' }}>إلغاء</Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </GlassCard>
              )}

            </Box>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* Course Stats */}
              <GlassCard title="📊 إحصائيات الكورس" darkMode={darkMode}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>التقدم الكلي</Typography><Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.primary }}>{course.progress}%</Typography></Box>
                  <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 4, bgcolor: darkMode ? '#334155' : '#e2e8f0', '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: COLORS.primary } }} />
                </Box>
                <Grid container spacing={1.5}>
                  <Grid item xs={6}><Box sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#ecfdf5', textAlign: 'center' }}><Typography variant="h5" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.success }}>{course.completedLessons}</Typography><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : COLORS.success }}>دروس مكتملة</Typography></Box></Grid>
                  <Grid item xs={6}><Box sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f5f3ff', textAlign: 'center' }}><Typography variant="h5" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.secondary }}>{course.totalLessons - course.completedLessons}</Typography><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : COLORS.secondary }}>دروس متبقية</Typography></Box></Grid>
                  <Grid item xs={6}><Box sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#fffbeb', textAlign: 'center' }}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}><StarRounded sx={{ color: COLORS.warning, fontSize: 20 }} /><Typography variant="h5" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.warning }}>{course.rating}</Typography></Box><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : COLORS.warning }}>التقييم</Typography></Box></Grid>
                  <Grid item xs={6}><Box sx={{ p: 2, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#eff6ff', textAlign: 'center' }}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}><PeopleRounded sx={{ color: COLORS.primary, fontSize: 20 }} /><Typography variant="h5" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: COLORS.primary }}>{course.studentsCount}</Typography></Box><Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : COLORS.primary }}>طالب</Typography></Box></Grid>
                </Grid>
              </GlassCard>

              {/* Teacher */}
              <GlassCard title="👨‍🏫 المدرس" darkMode={darkMode}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={course.teacherAvatar} sx={{ width: 64, height: 64, bgcolor: COLORS.secondary, fontSize: 24, fontWeight: 700 }}>{course.teacher?.charAt(0)}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>{course.teacher}</Typography>
                    <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1.5 }}>مدرس {course.category}</Typography>
                    <Button fullWidth startIcon={<ChatRounded />} onClick={() => navigate(`/student/course/${courseId}/ask-teacher`)} sx={{ bgcolor: '#7c3aed15', color: COLORS.secondary, fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: COLORS.secondary, color: 'white' } }}>تواصل مع المدرس</Button>
                  </Box>
                </Box>
              </GlassCard>

              {/* Next Lesson */}
              {nextLesson && (
                <Box sx={{ p: 3, borderRadius: 3, background: GRADIENTS.purple, color: 'white', position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><MenuBookRounded sx={{ fontSize: 20, opacity: 0.9 }} /><Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>الدرس التالي</Typography></Box>
                    <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>{nextLesson.title}</Typography>
                    <Button fullWidth startIcon={<PlayCircleFilledRounded />} onClick={() => navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`, { state: { lesson: nextLesson } })} sx={{ bgcolor: 'rgba(255,255,255,0.95)', color: '#1e293b', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, py: 1.2, '&:hover': { bgcolor: 'white' } }}>🚀 ابدأ الدرس الآن</Button>
                  </Box>
                </Box>
              )}

              {/* Course Info */}
              <GlassCard title="ℹ️ معلومات الكورس" darkMode={darkMode}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[{ label: 'المستوى', value: course.level }, { label: 'اللغة', value: course.language }, { label: 'الفئة', value: course.category }, { label: 'شهادة إتمام', value: course.certificate ? '✓ متاحة' : '✗ غير متاحة', color: course.certificate ? COLORS.success : COLORS.error }, { label: 'عدد التقييمات', value: `${course.reviewsCount} تقييم` }].map((item, i) => (
                                        <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{item.label}</Typography><Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: item.color || (darkMode ? '#f1f5f9' : '#1e293b') }}>{item.value}</Typography></Box>
                  ))}
                </Box>
              </GlassCard>

            </Box>
          </Grid>
        </Grid>
      </Container>

             {/* BOTTOM ACTION BUTTONS */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        bgcolor: darkMode ? '#1e293b' : 'white', 
        borderTop: '1px solid', 
        borderColor: darkMode ? '#334155' : '#e5e7eb',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        zIndex: 999,
        px: 2,
        py: 1.5,
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {/* تسليم الواجب */}
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                startIcon={<CloudUploadRounded />}
                onClick={() => navigate(`/student/submit-assignment`)}
                sx={{
                  py: 1.5,
                  bgcolor: COLORS.primary,
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    bgcolor: '#1d4ed8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(37,99,235,0.4)',
                  },
                }}
              >
                📝 تسليم الواجب
              </Button>
            </Grid>

            {/* سؤال للمدرس */}
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                startIcon={<ChatRounded />}
                onClick={() => navigate(`/student/course/${courseId}/ask-teacher`)}
                sx={{
                  py: 1.5,
                  bgcolor: COLORS.secondary,
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    bgcolor: '#6d28d9',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
                  },
                }}
              >
                💬 سؤال للمدرس
              </Button>
            </Grid>

            {/* حجز Office Hour */}
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                startIcon={<EventNoteRounded />}
                onClick={() => navigate(`/student/course/${courseId}/book-office-hour`)}
                sx={{
                  py: 1.5,
                  bgcolor: COLORS.success,
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    bgcolor: '#047857',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(5,150,105,0.4)',
                  },
                }}
              >
                📅 حجز Office Hour
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FLOATING ASSISTANT */}
      <Fab onClick={() => setAssistantOpen(!assistantOpen)} sx={{ position: 'fixed', bottom: 90, left: 24, width: 64, height: 64, background: GRADIENTS.main, boxShadow: '0 8px 25px rgba(124,58,237,0.4)', animation: 'float 3s ease-in-out infinite', '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } }, zIndex: 1000 }}>
        <Badge badgeContent={3} color="error"><SmartToyRounded sx={{ fontSize: 28, color: 'white' }} /></Badge>
      </Fab>

      {assistantOpen && (
        <Box sx={{ position: 'fixed', bottom: 100, left: 24, width: 350, height: 450, bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 3, boxShadow: '0 20px 50px rgba(0,0,0,0.2)', border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', overflow: 'hidden', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ background: GRADIENTS.blue, color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><SmartToyRounded /><Typography fontWeight={700} fontFamily="Cairo, sans-serif">المساعد الذكي</Typography></Box>
            <IconButton size="small" onClick={() => setAssistantOpen(false)} sx={{ color: 'white' }}><CloseRounded /></IconButton>
          </Box>
          <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
            <Box sx={{ bgcolor: darkMode ? '#334155' : '#f1f5f9', p: 2, borderRadius: 2, maxWidth: '85%' }}>
              <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>مرحباً! 👋 كيف يمكنني مساعدتك في كورس {course.title}؟</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', display: 'flex', gap: 1 }}>
            <input placeholder="اكتب سؤالك..." style={{ flex: 1, padding: '10px 15px', borderRadius: 10, border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`, background: darkMode ? '#334155' : '#f8fafc', color: darkMode ? '#f1f5f9' : '#1e293b', fontFamily: 'Cairo, sans-serif', outline: 'none' }} />
            <IconButton sx={{ bgcolor: COLORS.primary, color: 'white', '&:hover': { bgcolor: '#1d4ed8' } }}><ArrowBackRounded /></IconButton>
          </Box>
        </Box>
      )}

    </Box>
  );
};

export default CourseDashboard;