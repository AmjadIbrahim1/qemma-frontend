import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import {
  PlayCircleFilledRounded,
  CloudUploadRounded,
  VideoCallRounded,
  ChatRounded,
  MenuBookRounded,
  AssessmentRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';

const QuickActions = ({ darkMode, onAssistantClick }) => {
  const navigate = useNavigate();

  const quickActionsData = [
    {
      id: 1,
      type: 'practice',
      label: 'ابدأ التمرين',
      icon: PlayCircleFilledRounded,
      color: '#2563eb',
      path: '/student/exams',
    },
    {
      id: 2,
      type: 'submit',
      label: 'سلّم الواجب',
      icon: CloudUploadRounded,
      color: '#7c3aed',
      path: '/student/submit-assignment', // ✅ تم التحديث
    },
    {
      id: 3,
      type: 'live',
      label: 'انضم للحصة',
      icon: VideoCallRounded,
      color: '#db2777',
      path: '/student/live-class',
    },
    {
      id: 4,
      type: 'assistant',
      label: 'اسأل المساعد',
      icon: ChatRounded,
      color: '#059669',
      path: '/student/chat',
    },
    {
      id: 5,
      type: 'library',
      label: 'مكتبة المواد',
      icon: MenuBookRounded,
      color: '#f59e0b',
      path: '/student/courses',
    },
    {
      id: 6,
      type: 'report',
      label: 'تقرير الأداء',
      icon: AssessmentRounded,
      color: '#ef4444',
      path: '/student/performance', // ✅ تم التحديث
    },
  ];

  const handleClick = (action) => {
    if (action.type === 'assistant' && onAssistantClick) {
      onAssistantClick();
    } else if (action.path) {
      navigate(action.path);
    }
  };

  return (
    <GlassCard title="⚡ إجراءات سريعة" icon="🚀" darkMode={darkMode}>
      <Grid container spacing={1.5}>
        {quickActionsData.map((action) => {
          const IconComponent = action.icon;

          return (
            <Grid item xs={6} key={action.id}>
              <Card
                elevation={0}
                onClick={() => handleClick(action)}
                sx={{
                  border: '1px solid',
                  borderColor: darkMode ? '#334155' : '#e5e7eb',
                  bgcolor: darkMode ? '#334155' : '#f8fafc',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: action.color,
                    transform: 'translateY(-3px)',
                    bgcolor: darkMode ? '#475569' : '#f1f5f9',
                    boxShadow: `0 8px 20px ${action.color}25`,
                  },
                }}
              >
                <CardContent sx={{ p: 2, textAlign: 'center', '&:last-child': { pb: 2 } }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${action.color}15`,
                      color: action.color,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    <IconComponent />
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', display: 'block' }}
                  >
                    {action.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </GlassCard>
  );
};

export default QuickActions;