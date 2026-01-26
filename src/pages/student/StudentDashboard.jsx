import { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';

// Components
import StudentHeader from '../../components/dashboards/student/StudentHeader';
import KPIs from '../../components/dashboards/student/KPIs';
import UrgentBadges from '../../components/dashboards/student/UrgentBadges';
import UpcomingTasks from '../../components/dashboards/student/UpcomingTasks';
import ExamsSummary from '../../components/dashboards/student/ExamsSummary';
import LiveSessions from '../../components/dashboards/student/LiveSessions';
import MiniCalendar from '../../components/dashboards/student/MiniCalendar';
import ProgressChart from '../../components/dashboards/student/ProgressChart';
import StrengthWeakness from '../../components/dashboards/student/StrengthWeakness';
import QuickActions from '../../components/dashboards/student/QuickActions';
import Notifications from '../../components/dashboards/student/Notifications';
import CoursesList from '../../components/dashboards/student/CoursesList';
import AssistantWidget from '../../components/dashboards/student/AssistantWidget';

const StudentDashboard = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: darkMode ? '#0f172a' : '#f8fafc',
        pb: 4,
      }}
    >
      {/* Header */}
      <StudentHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Container maxWidth="xl">
        {/* KPIs */}
        <KPIs darkMode={darkMode} />

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - 2/3 */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Urgent Alerts */}
              <UrgentBadges darkMode={darkMode} />

              {/* Courses List - NEW */}
              <CoursesList darkMode={darkMode} />

              {/* Upcoming Tasks */}
              <UpcomingTasks darkMode={darkMode} />

              {/* Exams Summary */}
              <ExamsSummary darkMode={darkMode} />

              {/* Progress Chart */}
              <ProgressChart darkMode={darkMode} />

              {/* Strength & Weakness */}
              <StrengthWeakness darkMode={darkMode} />
            </Box>
          </Grid>

          {/* Right Column - 1/3 */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Live Sessions */}
              <LiveSessions darkMode={darkMode} />

              {/* Mini Calendar */}
              <MiniCalendar darkMode={darkMode} />

              {/* Quick Actions */}
              <QuickActions 
                darkMode={darkMode} 
                onAssistantClick={() => setAssistantOpen(true)} 
              />

              {/* Notifications */}
              <Notifications darkMode={darkMode} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Assistant Widget */}
      <AssistantWidget darkMode={darkMode} />
    </Box>
  );
};

export default StudentDashboard;