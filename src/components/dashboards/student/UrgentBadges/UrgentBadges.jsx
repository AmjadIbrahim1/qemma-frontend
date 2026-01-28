import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import {
  WarningAmberRounded,
  AssignmentLateRounded,
  VideoCallRounded,
  ArrowBackRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { urgentAlertsData } from '../../../../data/studentData';

const iconMap = {
  exam: WarningAmberRounded,
  assignment: AssignmentLateRounded,
  live: VideoCallRounded,
};

const colorMap = {
  exam: { color: '#ef4444', bgColor: '#fef2f2' },
  assignment: { color: '#f59e0b', bgColor: '#fffbeb' },
  live: { color: '#7c3aed', bgColor: '#f5f3ff' },
};

// ✅ تحديث الـ paths
const pathMap = {
  exam: '/student/exams',
  assignment: '/student/submit-assignment',
  live: '/student/live-class',
};

const UrgentBadges = ({ darkMode }) => {
  const navigate = useNavigate();

  if (!urgentAlertsData?.length) return null;

  const handleAction = (alert) => {
    const path = pathMap[alert.type] || '/student/dashboard';
    
    // لو حصة مباشرة، نبعت بيانات الحصة مع الـ navigation
    if (alert.type === 'live') {
      navigate(path, { 
        state: { 
          session: {
            id: alert.id,
            title: alert.title,
            isLive: true,
          },
          joinDirectly: true 
        } 
      });
    } else {
      navigate(path);
    }
  };

  return (
    <GlassCard title="⚡ تنبيهات عاجلة" icon="🔔" darkMode={darkMode}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {urgentAlertsData.map((alert) => {
          const IconComponent = iconMap[alert.type];
          const colors = colorMap[alert.type];

          return (
            <Box
              key={alert.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : colors.bgColor,
                borderRight: `4px solid ${colors.color}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-5px)',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: colors.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                  animation: alert.type === 'live' ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                  },
                }}
              >
                <IconComponent />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                >
                  {alert.title}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ color: colors.color }}
                >
                  {alert.message}
                </Typography>
              </Box>

              {/* Action Button */}
              <Button
                size="small"
                endIcon={<ArrowBackRounded sx={{ fontSize: 16 }} />}
                onClick={() => handleAction(alert)}
                sx={{
                  bgcolor: colors.color,
                  color: 'white',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    bgcolor: colors.color,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {alert.actionLabel}
              </Button>
            </Box>
          );
        })}
      </Box>
    </GlassCard>
  );
};

export default UrgentBadges;