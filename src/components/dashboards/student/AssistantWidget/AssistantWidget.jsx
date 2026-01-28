import { useState } from 'react';
import { Box, Fab, Badge, Typography, IconButton } from '@mui/material';
import { SmartToyRounded, ArrowBackRounded, CloseRounded } from '@mui/icons-material';

const AssistantWidget = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages] = useState([
    { id: 1, type: 'bot', text: 'مرحباً أحمد! 👋 كيف يمكنني مساعدتك اليوم؟' },
  ]);

  return (
    <>
      {/* Floating Button */}
      <Fab
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          width: 64,
          height: 64,
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
          boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-8px)' },
          },
          '&:hover': {
            transform: 'scale(1.1)',
          },
          zIndex: 1000,
        }}
      >
        <Badge badgeContent={3} color="error">
          <SmartToyRounded sx={{ fontSize: 28, color: 'white' }} />
        </Badge>
      </Fab>

      {/* Chat Panel */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            left: 24,
            width: 350,
            height: 450,
            bgcolor: darkMode ? '#1e293b' : 'white',
            borderRadius: 3,
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            border: '1px solid',
            borderColor: darkMode ? '#334155' : '#e5e7eb',
            overflow: 'hidden',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SmartToyRounded />
              <Typography fontWeight={700} fontFamily="Cairo, sans-serif">
                المساعد الذكي
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseRounded />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  bgcolor: darkMode ? '#334155' : '#f1f5f9',
                  p: 2,
                  borderRadius: 2,
                  maxWidth: '85%',
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              display: 'flex',
              gap: 1,
            }}
          >
            <input
              placeholder="اكتب سؤالك هنا..."
              style={{
                flex: 1,
                padding: '10px 15px',
                borderRadius: 10,
                border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
                background: darkMode ? '#334155' : '#f8fafc',
                color: darkMode ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Cairo, sans-serif',
                outline: 'none',
              }}
            />
            <IconButton
              sx={{
                bgcolor: '#2563eb',
                color: 'white',
                '&:hover': { bgcolor: '#1d4ed8' },
              }}
            >
              <ArrowBackRounded />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AssistantWidget;