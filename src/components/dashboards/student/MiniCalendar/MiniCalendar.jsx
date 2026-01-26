import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronRightRounded, ChevronLeftRounded } from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { calendarEventsData } from '../../../../data/studentData';

const arabicMonths = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];
const arabicDays = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];

const MiniCalendar = ({ darkMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const hasEvent = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEventsData.some((e) => e.date === dateStr);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <GlassCard title="📅 التقويم" icon="🗓️" darkMode={darkMode}>
      <Box sx={{ bgcolor: darkMode ? '#334155' : '#f8fafc', borderRadius: 2, p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton size="small" onClick={nextMonth}>
            <ChevronRightRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
          </IconButton>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
          >
            {arabicMonths[month]} {year}
          </Typography>
          <IconButton size="small" onClick={prevMonth}>
            <ChevronLeftRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
          </IconButton>
        </Box>

        {/* Days Header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
          {arabicDays.map((d) => (
            <Typography
              key={d}
              variant="caption"
              fontWeight={600}
              fontFamily="Cairo, sans-serif"
              sx={{ textAlign: 'center', color: darkMode ? '#94a3b8' : '#64748b', py: 0.5 }}
            >
              {d}
            </Typography>
          ))}
        </Box>

        {/* Days Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {/* Empty cells */}
          {[...Array(firstDayOfMonth)].map((_, i) => (
            <Box key={`empty-${i}`} />
          ))}

          {/* Days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            return (
              <Box
                key={day}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'Cairo, sans-serif',
                  position: 'relative',
                  background: isToday(day)
                    ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                    : 'transparent',
                  color: isToday(day) ? 'white' : darkMode ? '#e2e8f0' : '#1e293b',
                  '&:hover': {
                    bgcolor: isToday(day) ? undefined : darkMode ? '#475569' : '#f1f5f9',
                  },
                }}
              >
                {day}
                {hasEvent(day) && (
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      bgcolor: isToday(day) ? 'white' : '#f59e0b',
                      position: 'absolute',
                      bottom: 3,
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </GlassCard>
  );
};

export default MiniCalendar;