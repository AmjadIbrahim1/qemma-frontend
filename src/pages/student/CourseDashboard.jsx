import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';

// Data
import { getCourseById } from '../../data/coursesData';

// Course Components
import CourseHeader from '../../components/dashboards/course/CourseHeader';
import CourseTabs from '../../components/dashboards/course/CourseTabs';
import Curriculum from '../../components/dashboards/course/Curriculum';
import CourseAssignments from '../../components/dashboards/course/CourseAssignments';
import CourseExams from '../../components/dashboards/course/CourseExams';
import CourseLiveSessions from '../../components/dashboards/course/CourseLiveSessions';
import CourseResources from '../../components/dashboards/course/CourseResources';
import Gradebook from '../../components/dashboards/course/Gradebook';
import AttendanceLog from '../../components/dashboards/course/AttendanceLog';
import Discussions from '../../components/dashboards/course/Discussions';
import CourseQuickActions from '../../components/dashboards/course/CourseQuickActions';
import InRoomPanel from '../../components/dashboards/course/InRoomPanel';
import CourseSidebar from '../../components/dashboards/course/CourseSidebar';

const CourseDashboard = () => {
  const { courseId } = useParams();
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [inLiveSession, setInLiveSession] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  // Get course data
  const course = getCourseById(courseId);

  // Handle joining live session
  const handleJoinSession = (session) => {
    setCurrentSession(session);
    setInLiveSession(true);
  };

  // Handle leaving live session
  const handleLeaveSession = () => {
    setInLiveSession(false);
    setCurrentSession(null);
  };

  // If in live session, show the InRoomPanel
  if (inLiveSession && currentSession) {
    return (
      <InRoomPanel
        session={currentSession}
        onLeave={handleLeaveSession}
        darkMode={darkMode}
      />
    );
  }

  // If course not found
  if (!course) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: darkMode ? '#0f172a' : '#f8fafc',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}
          >
            😕 الكورس غير موجود
          </Typography>
          <Typography
            variant="body1"
            fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 3 }}
          >
            عذراً، لم نتمكن من العثور على الكورس المطلوب
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.history.back()}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
              py: 1,
            }}
          >
            العودة للخلف
          </Button>
        </Box>
      </Box>
    );
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Curriculum courseId={courseId} darkMode={darkMode} />;
      case 1:
        return <CourseAssignments courseId={courseId} darkMode={darkMode} />;
      case 2:
        return <CourseExams courseId={courseId} darkMode={darkMode} />;
      case 3:
        return (
          <CourseLiveSessions
            courseId={courseId}
            darkMode={darkMode}
            onJoinSession={handleJoinSession}
          />
        );
      case 4:
        return <CourseResources courseId={courseId} darkMode={darkMode} />;
      case 5:
        return <Gradebook courseId={courseId} darkMode={darkMode} />;
      case 6:
        return <AttendanceLog courseId={courseId} darkMode={darkMode} />;
      case 7:
        return <Discussions courseId={courseId} darkMode={darkMode} />;
      default:
        return <Curriculum courseId={courseId} darkMode={darkMode} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: darkMode ? '#0f172a' : '#f8fafc',
        pb: 12,
      }}
    >
      {/* Course Header */}
      <CourseHeader course={course} darkMode={darkMode} />

      <Container maxWidth="xl">
        {/* Tabs Navigation */}
        <CourseTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          darkMode={darkMode}
        />

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Main Content - Left Column */}
          <Grid item xs={12} lg={8}>
            {renderTabContent()}
          </Grid>

          {/* Sidebar - Right Column */}
          <Grid item xs={12} lg={4}>
            <CourseSidebar course={course} darkMode={darkMode} />
          </Grid>
        </Grid>
      </Container>

      {/* Fixed Quick Actions Bar */}
      <CourseQuickActions darkMode={darkMode} />
    </Box>
  );
};

export default CourseDashboard;