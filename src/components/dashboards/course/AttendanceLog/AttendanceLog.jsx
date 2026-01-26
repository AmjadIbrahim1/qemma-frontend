import { Box, Typography, List, ListItem, Chip } from '@mui/material';
import { CheckRounded, CloseRounded, ScheduleRounded } from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getAttendanceData } from '../../../../data/coursesData';

const AttendanceLog = ({ courseId, darkMode }) => {
  const attendance = getAttendanceData(courseId);

  // Calculate stats
  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const lateCount = attendance.filter((a) => a.status === 'late').length;
  const attendanceRate = Math.round((presentCount / attendance.length) * 100);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'present':
        return { label: 'حاضر', color: '#059669', bgColor: '#ecfdf5', icon: <CheckRounded /> };
      case 'absent':
        return { label: 'غائب', color: '#ef4444', bgColor: '#fef2f2', icon: <CloseRounded /> };
      case 'late':
        return { label: 'متأخر', color: '#f59e0b', bgColor: '#fffbeb', icon: <ScheduleRounded /> };
      default:
        return { label: status, color: '#64748b', bgColor: '#f8fafc', icon: null };
    }
  };

  return (
    <GlassCard title="📅 سجل الحضور" icon="✅" darkMode={darkMode}>
      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box
          sx={{
            flex: 1,
            minWidth: 100,
            p: 2,
            borderRadius: 2,
            bgcolor: '#ecfdf5',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
            {attendanceRate}%
          </Typography>
          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
            نسبة الحضور
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 100,
            p: 2,
            borderRadius: 2,
            bgcolor: '#ecfdf5',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
            {presentCount}
          </Typography>
          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#059669' }}>
            حضور
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 100,
            p: 2,
            borderRadius: 2,
            bgcolor: '#fef2f2',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: '#ef4444' }}>
            {absentCount}
          </Typography>
          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#ef4444' }}>
            غياب
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 100,
            p: 2,
            borderRadius: 2,
            bgcolor: '#fffbeb',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: '#f59e0b' }}>
            {lateCount}
          </Typography>
          <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#f59e0b' }}>
            تأخير
          </Typography>
        </Box>
      </Box>

      {/* Attendance List */}
      <List sx={{ p: 0 }}>
        {attendance.map((record) => {
          const statusConfig = getStatusConfig(record.status);

          return (
            <ListItem
              key={record.id}
              sx={{
                mb: 1,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                border: '1px solid',
                borderColor: darkMode ? '#475569' : '#e5e7eb',
              }}
            >
              {/* Status Icon */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: darkMode ? '#475569' : statusConfig.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: statusConfig.color,
                  mr: 2,
                }}
              >
                {statusConfig.icon}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                  {record.session}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    📅 {record.date}
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    ⏱️ {record.duration}
                  </Typography>
                  {record.joinTime && (
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                      دخول: {record.joinTime}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Status Chip */}
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
            </ListItem>
          );
        })}
      </List>
    </GlassCard>
  );
};

export default AttendanceLog;