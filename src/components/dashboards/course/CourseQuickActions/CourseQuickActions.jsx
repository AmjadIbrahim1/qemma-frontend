import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import {
  CloudUploadRounded,
  ChatRounded,
  CalendarTodayRounded,
} from '@mui/icons-material';

const CourseQuickActions = ({ darkMode }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const actions = [
    { 
      id: 1, 
      icon: <CloudUploadRounded />, 
      label: 'تسليم واجب', 
      color: '#7c3aed',
      path: '/student/submit-assignment',
    },
    { 
      id: 2, 
      icon: <ChatRounded />, 
      label: 'سؤال للمدرس', 
      color: '#2563eb',
      path: `/student/course/${courseId}/ask-teacher`,
    },
    { 
      id: 3, 
      icon: <CalendarTodayRounded />, 
      label: 'حجز Office Hour', 
      color: '#059669',
      path: `/student/course/${courseId}/book-office-hour`,
    },
  ];

  const handleClick = (action) => {
    navigate(action.path);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: darkMode ? '#1e293b' : 'white',
        borderTop: '1px solid',
        borderColor: darkMode ? '#334155' : '#e5e7eb',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
      }}
    >
      {actions.map((action) => (
        <Button
          key={action.id}
          startIcon={action.icon}
          onClick={() => handleClick(action)}
          sx={{
            bgcolor: `${action.color}15`,
            color: action.color,
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1,
            '&:hover': {
              bgcolor: action.color,
              color: 'white',
            },
          }}
        >
          {action.label}
        </Button>
      ))}
    </Box>
  );
};

export default CourseQuickActions;