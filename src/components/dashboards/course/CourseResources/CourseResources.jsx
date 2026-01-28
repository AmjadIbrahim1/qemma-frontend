import { Box, Typography, List, ListItem, IconButton, Chip } from '@mui/material';
import {
  PictureAsPdfRounded,
  VideoLibraryRounded,
  DescriptionRounded,
  LinkRounded,
  OndemandVideoRounded,
  DownloadRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getResourcesData } from '../../../../data/coursesData';

const CourseResources = ({ courseId, darkMode }) => {
  const resources = getResourcesData(courseId);

  const getTypeConfig = (type) => {
    switch (type) {
      case 'pdf':
        return { icon: <PictureAsPdfRounded />, color: '#ef4444', label: 'PDF' };
      case 'video':
        return { icon: <VideoLibraryRounded />, color: '#7c3aed', label: 'فيديو' };
      case 'doc':
        return { icon: <DescriptionRounded />, color: '#2563eb', label: 'مستند' };
      case 'link':
        return { icon: <LinkRounded />, color: '#059669', label: 'رابط' };
      case 'recording':
        return { icon: <OndemandVideoRounded />, color: '#db2777', label: 'تسجيل' };
      default:
        return { icon: <DescriptionRounded />, color: '#64748b', label: type };
    }
  };

  return (
    <GlassCard title="📁 الموارد والملفات" icon="📚" darkMode={darkMode}>
      <List sx={{ p: 0 }}>
        {resources.map((resource) => {
          const typeConfig = getTypeConfig(resource.type);

          return (
            <ListItem
              key={resource.id}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                bgcolor: darkMode ? '#334155' : '#f8fafc',
                border: '1px solid',
                borderColor: darkMode ? '#475569' : '#e5e7eb',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: darkMode ? '#475569' : '#f1f5f9',
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
                  bgcolor: `${typeConfig.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: typeConfig.color,
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                {typeConfig.icon}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>
                  {resource.title}
                </Typography>
                <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 0.5 }}>
                  {resource.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={typeConfig.label}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontFamily: 'Cairo, sans-serif',
                      bgcolor: `${typeConfig.color}15`,
                      color: typeConfig.color,
                    }}
                  />
                  {resource.size && (
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      {resource.size}
                    </Typography>
                  )}
                  {resource.duration && (
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      ⏱️ {resource.duration}
                    </Typography>
                  )}
                  {resource.downloadCount && (
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      📥 {resource.downloadCount} تحميل
                    </Typography>
                  )}
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                    📅 {resource.date}
                  </Typography>
                </Box>

                {/* Links for link type */}
                {resource.type === 'link' && resource.links && (
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {resource.links.map((link, index) => (
                      <Chip
                        key={index}
                        label={link.title}
                        size="small"
                        component="a"
                        href={link.url}
                        target="_blank"
                        clickable
                        sx={{
                          height: 24,
                          fontSize: 11,
                          fontFamily: 'Cairo, sans-serif',
                          bgcolor: '#05966915',
                          color: '#059669',
                          '&:hover': { bgcolor: '#059669', color: 'white' },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {resource.type !== 'link' && (
                  <>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: '#2563eb15',
                        color: '#2563eb',
                        '&:hover': { bgcolor: '#2563eb', color: 'white' },
                      }}
                    >
                      <VisibilityRounded fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: '#05966915',
                        color: '#059669',
                        '&:hover': { bgcolor: '#059669', color: 'white' },
                      }}
                    >
                      <DownloadRounded fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            </ListItem>
          );
        })}
      </List>
    </GlassCard>
  );
};

export default CourseResources;