import { Box, Typography, List, ListItem, ListItemText, Button, Chip } from '@mui/material';
import {
  AssignmentRounded,
  CloudUploadRounded,
  CheckCircleRounded,
  ScheduleRounded,
  AttachFileRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getAssignmentsData } from '../../../../data/coursesData';

const CourseAssignments = ({ courseId, darkMode }) => {
  const assignments = getAssignmentsData(courseId);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'قيد الانتظار', color: '#f59e0b', bgColor: '#fffbeb' };
      case 'submitted':
        return { label: 'تم التسليم', color: '#2563eb', bgColor: '#eff6ff' };
      case 'graded':
        return { label: 'تم التصحيح', color: '#059669', bgColor: '#ecfdf5' };
      default:
        return { label: status, color: '#64748b', bgColor: '#f8fafc' };
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'homework':
        return 'واجب منزلي';
      case 'report':
        return 'تقرير';
      case 'project':
        return 'مشروع';
      default:
        return type;
    }
  };

  return (
    <GlassCard title="📝 الواجبات" icon="✏️" darkMode={darkMode}>
      <List sx={{ p: 0 }}>
        {assignments.map((assignment) => {
          const statusConfig = getStatusConfig(assignment.status);

          return (
            <ListItem
              key={assignment.id}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                border: '1px solid',
                borderColor: darkMode ? '#475569' : '#e5e7eb',
                borderRight: `4px solid ${statusConfig.color}`,
                flexDirection: 'column',
                alignItems: 'stretch',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: darkMode ? '#475569' : '#f1f5f9',
                  transform: 'translateX(-5px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: `${statusConfig.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: statusConfig.color,
                    flexShrink: 0,
                  }}
                >
                  <AssignmentRounded />
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                      {assignment.title}
                    </Typography>
                    <Chip
                      label={getTypeLabel(assignment.type)}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#475569' : '#e2e8f0',
                        color: darkMode ? '#e2e8f0' : '#64748b',
                      }}
                    />
                  </Box>

                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}>
                    {assignment.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ScheduleRounded sx={{ fontSize: 14, color: '#f59e0b' }} />
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                        {assignment.dueDate}
                      </Typography>
                    </Box>
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                      {assignment.points} نقطة
                    </Typography>
                    {assignment.attachmentsCount > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AttachFileRounded sx={{ fontSize: 14, color: darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {assignment.attachmentsCount} مرفق
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Status & Actions */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <Chip
                    label={statusConfig.label}
                    size="small"
                    sx={{
                      bgcolor: darkMode ? '#475569' : statusConfig.bgColor,
                      color: statusConfig.color,
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 600,
                    }}
                  />

                  {assignment.status === 'pending' && (
                    <Button
                      startIcon={<CloudUploadRounded />}
                      size="small"
                      sx={{
                        bgcolor: statusConfig.color,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': { bgcolor: statusConfig.color, opacity: 0.9 },
                      }}
                    >
                      تسليم
                    </Button>
                  )}

                  {assignment.status === 'graded' && (
                    <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
                      {assignment.grade}%
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Feedback */}
              {assignment.feedback && (
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: darkMode ? '#1e293b' : '#f0fdf4',
                    borderRight: '3px solid #059669',
                  }}
                >
                  <Typography variant="caption" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: '#059669', display: 'block', mb: 0.5 }}>
                    ملاحظات المدرس:
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                    {assignment.feedback}
                  </Typography>
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>
    </GlassCard>
  );
};

export default CourseAssignments;