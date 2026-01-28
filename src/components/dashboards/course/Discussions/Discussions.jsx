import { Box, Typography, List, ListItem, Button, Chip, Avatar } from '@mui/material';
import {
  SendRounded,
  VisibilityRounded,
  ChatBubbleOutlineRounded,
  PushPinRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import GlassCard from '../../common/GlassCard';
import { getDiscussionsData } from '../../../../data/coursesData';

const Discussions = ({ courseId, darkMode }) => {
  const discussions = getDiscussionsData(courseId);

  return (
    <GlassCard title="💬 المناقشات" icon="🗣️" darkMode={darkMode}>
      {/* New Discussion Button */}
      <Button
        fullWidth
        startIcon={<SendRounded />}
        sx={{
          mb: 3,
          bgcolor: '#2563eb',
          color: 'white',
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 700,
          borderRadius: 2,
          py: 1.5,
          '&:hover': { bgcolor: '#1d4ed8' },
        }}
      >
        طرح سؤال جديد
      </Button>

      {/* Discussions List */}
      <List sx={{ p: 0 }}>
        {discussions.map((discussion) => (
          <ListItem
            key={discussion.id}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              bgcolor: darkMode ? '#334155' : '#f8fafc',
              border: '1px solid',
              borderColor: discussion.isPinned
                ? '#7c3aed'
                : darkMode
                ? '#475569'
                : '#e5e7eb',
              flexDirection: 'column',
              alignItems: 'stretch',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: darkMode ? '#475569' : '#f1f5f9',
                transform: 'translateX(-5px)',
              },
            }}
          >
            {/* Pinned Badge */}
            {discussion.isPinned && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <PushPinRounded sx={{ fontSize: 14, color: '#7c3aed' }} />
                <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: '#7c3aed', fontWeight: 600 }}>
                  مثبت
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: discussion.authorRole === 'teacher' ? '#7c3aed' : '#2563eb',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'Cairo, sans-serif',
                }}
              >
                {discussion.authorAvatar}
              </Avatar>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    {discussion.title}
                  </Typography>
                  {discussion.isResolved && (
                    <Chip
                      icon={<CheckCircleRounded sx={{ fontSize: 14 }} />}
                      label="تم الحل"
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: '#ecfdf5',
                        color: '#059669',
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{
                    color: darkMode ? '#94a3b8' : '#64748b',
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {discussion.content}
                </Typography>

                {/* Meta */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: discussion.authorRole === 'teacher' ? '#7c3aed' : darkMode ? '#94a3b8' : '#64748b', fontWeight: discussion.authorRole === 'teacher' ? 600 : 400 }}>
                    {discussion.author}
                    {discussion.authorRole === 'teacher' && ' (المدرس)'}
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                    {discussion.time}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ChatBubbleOutlineRounded sx={{ fontSize: 12, color: darkMode ? '#64748b' : '#94a3b8' }} />
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      {discussion.repliesCount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityRounded sx={{ fontSize: 12, color: darkMode ? '#64748b' : '#94a3b8' }} />
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      {discussion.viewsCount}
                    </Typography>
                  </Box>
                </Box>

                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
                  {discussion.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#475569' : '#e2e8f0',
                        color: darkMode ? '#e2e8f0' : '#64748b',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </GlassCard>
  );
};

export default Discussions;