import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Chip, Collapse, IconButton } from '@mui/material';
import {
  PlayCircleFilledRounded,
  LockRounded,
  CheckCircleRounded,
  ExpandMoreRounded,
  ExpandLessRounded,
  OndemandVideoRounded,
  QuizRounded,
  DescriptionRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getCurriculumData } from '../../../../data/coursesData';

const Curriculum = ({ courseId, darkMode }) => {
  const navigate = useNavigate();
  const curriculum = getCurriculumData(courseId);
  const [expandedUnits, setExpandedUnits] = useState([1]);

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
    );
  };

  const handleStartLesson = (lesson) => {
    navigate(`/student/course/${courseId}/lesson/${lesson.id}`, {
      state: { lesson },
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleRounded sx={{ color: '#059669' }} />;
      case 'available':
        return <PlayCircleFilledRounded sx={{ color: '#2563eb' }} />;
      case 'locked':
        return <LockRounded sx={{ color: '#94a3b8' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'available':
        return '#2563eb';
      case 'locked':
        return '#94a3b8';
      default:
        return '#64748b';
    }
  };

  return (
    <GlassCard title="📚 المنهج والدروس" icon="📖" darkMode={darkMode}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {curriculum.map((unit) => (
          <Box
            key={unit.id}
            sx={{
              border: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Unit Header */}
            <Box
              onClick={() => toggleUnit(unit.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                cursor: 'pointer',
                '&:hover': { bgcolor: darkMode ? '#475569' : '#f1f5f9' },
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                  {unit.unitTitle}
                </Typography>
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  {unit.lessons.length} دروس • {unit.description}
                </Typography>
              </Box>
              <IconButton size="small">
                {expandedUnits.includes(unit.id) ? (
                  <ExpandLessRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                ) : (
                  <ExpandMoreRounded sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                )}
              </IconButton>
            </Box>

            {/* Lessons */}
            <Collapse in={expandedUnits.includes(unit.id)}>
              <List sx={{ p: 0 }}>
                {unit.lessons.map((lesson) => (
                  <ListItem
                    key={lesson.id}
                    sx={{
                      borderTop: '1px solid',
                      borderColor: darkMode ? '#334155' : '#e5e7eb',
                      opacity: lesson.status === 'locked' ? 0.6 : 1,
                      cursor: lesson.status !== 'locked' ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: lesson.status !== 'locked' ? (darkMode ? '#334155' : '#f8fafc') : undefined,
                      },
                    }}
                    onClick={() => lesson.status !== 'locked' && handleStartLesson(lesson)}
                  >
                    {/* Lesson Number */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: `${getStatusColor(lesson.status)}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      {getStatusIcon(lesson.status)}
                    </Box>

                    {/* ✅ الحل: استخدام disableTypography + عمل Typography يدوي */}
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          {lesson.title}
                        </Typography>
                      }
                      secondary={
                        <Typography component="div" variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                          <span style={{ fontFamily: 'Cairo, sans-serif', color: darkMode ? '#94a3b8' : '#64748b' }}>
                            ⏱️ {lesson.duration}
                          </span>
                          {lesson.hasVideo && <OndemandVideoRounded sx={{ fontSize: 14, color: '#7c3aed' }} />}
                          {lesson.hasQuiz && <QuizRounded sx={{ fontSize: 14, color: '#f59e0b' }} />}
                          {lesson.hasNotes && <DescriptionRounded sx={{ fontSize: 14, color: '#059669' }} />}
                        </Typography>
                      }
                    />

                    {lesson.status === 'available' && (
                      <Button
                        startIcon={<PlayCircleFilledRounded />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartLesson(lesson);
                        }}
                        sx={{
                          bgcolor: '#2563eb',
                          color: 'white',
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 600,
                          borderRadius: 2,
                          px: 2,
                          '&:hover': { bgcolor: '#1d4ed8' },
                        }}
                      >
                        ابدأ
                      </Button>
                    )}
                    {lesson.status === 'completed' && (
                      <Chip
                        label="✓ مكتمل"
                        size="small"
                        sx={{
                          bgcolor: '#ecfdf5',
                          color: '#059669',
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </Box>
    </GlassCard>
  );
};

export default Curriculum;