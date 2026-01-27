import { useState } from 'react';
import { Box, Typography, Chip, Checkbox } from '@mui/material';
import { CheckCircleRounded, RadioButtonUncheckedRounded } from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { upcomingTasksData } from '../../../../data/studentData';
import { coursesData } from '../../../../data/coursesData';

const UpcomingTasks = ({ darkMode }) => {
  const [tasks, setTasks] = useState(upcomingTasksData);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const getCourseColor = (courseId) => {
    const course = coursesData.find((c) => c.id === courseId);
    const colorMap = {
      1: '#2563eb',
      2: '#7c3aed',
      3: '#059669',
      4: '#db2777',
      5: '#0891b2',
      6: '#ca8a04',
    };
    return colorMap[courseId] || '#64748b';
  };

  return (
    <GlassCard
      title="📝 المهام القادمة"
      icon="✅"
      actionLabel="عرض الكل"
      onAction={() => {}}
      darkMode={darkMode}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tasks.map((task) => {
          const courseColor = getCourseColor(task.courseId);

          return (
            <Box
              key={task.id}
              onClick={() => toggleTask(task.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 1.5,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                cursor: 'pointer',
                opacity: task.completed ? 0.6 : 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: darkMode ? '#475569' : '#f1f5f9',
                  transform: 'translateX(-5px)',
                },
              }}
            >
              {/* Checkbox */}
              <Checkbox
                checked={task.completed}
                icon={<RadioButtonUncheckedRounded />}
                checkedIcon={<CheckCircleRounded />}
                sx={{
                  p: 0,
                  color: darkMode ? '#64748b' : '#cbd5e1',
                  '&.Mui-checked': { color: '#059669' },
                }}
              />

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  fontFamily="Cairo, sans-serif"
                  sx={{
                    color: darkMode ? '#f1f5f9' : '#1e293b',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    mb: 0.75,
                  }}
                >
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Chip
                    label={task.courseName}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: 'Cairo, sans-serif',
                      bgcolor: `${courseColor}15`,
                      color: courseColor,
                    }}
                  />
                  <Typography
                    variant="caption"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: '#f59e0b' }}
                  >
                    📅 {task.dueDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </GlassCard>
  );
};

export default UpcomingTasks;