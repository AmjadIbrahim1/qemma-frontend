import { Box, Tabs, Tab } from '@mui/material';
import {
  MenuBookRounded,
  AssignmentRounded,
  QuizRounded,
  VideoCallRounded,
  FolderRounded,
  GradeRounded,
  EventNoteRounded,
  ForumRounded,
} from '@mui/icons-material';

const tabs = [
  { label: 'المنهج والدروس', icon: <MenuBookRounded /> },
  { label: 'الواجبات', icon: <AssignmentRounded /> },
  { label: 'الاختبارات', icon: <QuizRounded /> },
  { label: 'الحصص المباشرة', icon: <VideoCallRounded /> },
  { label: 'الموارد', icon: <FolderRounded /> },
  { label: 'سجل الدرجات', icon: <GradeRounded /> },
  { label: 'سجل الحضور', icon: <EventNoteRounded /> },
  { label: 'المناقشات', icon: <ForumRounded /> },
];

const CourseTabs = ({ activeTab, onTabChange, darkMode }) => {
  return (
    <Box
      sx={{
        bgcolor: darkMode ? '#1e293b' : 'white',
        borderRadius: 3,
        border: '1px solid',
        borderColor: darkMode ? '#334155' : '#e5e7eb',
        mb: 3,
        overflow: 'hidden',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, v) => onTabChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 600,
            minHeight: 60,
            color: darkMode ? '#94a3b8' : '#64748b',
            '&.Mui-selected': { color: '#2563eb' },
          },
          '& .MuiTabs-indicator': {
            bgcolor: '#2563eb',
            height: 3,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} icon={tab.icon} iconPosition="start" />
        ))}
      </Tabs>
    </Box>
  );
};

export default CourseTabs;