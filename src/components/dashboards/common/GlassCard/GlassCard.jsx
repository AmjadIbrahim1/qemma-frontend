import { Box, Typography, Button } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';

const GlassCard = ({
  title,
  icon,
  children,
  actionLabel,
  onAction,
  noPadding = false,
  darkMode = false,
}) => {
  return (
    <Box
      sx={{
        bgcolor: darkMode ? '#1e293b' : 'white',
        borderRadius: 3,
        border: '1px solid',
        borderColor: darkMode ? '#334155' : '#e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: darkMode
            ? '0 10px 30px rgba(0,0,0,0.3)'
            : '0 10px 30px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Gradient Top Bar */}
      <Box
        sx={{
          height: 4,
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
        }}
      />

      <Box sx={{ p: noPadding ? 0 : 3 }}>
        {title && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2.5,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
              <Typography
                variant="h6"
                fontWeight={800}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
              >
                {title}
              </Typography>
            </Box>

            {actionLabel && (
              <Button
                onClick={onAction}
                endIcon={<ArrowBackRounded />}
                sx={{
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  color: darkMode ? '#94a3b8' : '#64748b',
                  bgcolor: darkMode ? '#334155' : '#f1f5f9',
                  borderRadius: 2,
                  px: 2,
                  py: 0.75,
                  '&:hover': {
                    bgcolor: darkMode ? '#475569' : '#e2e8f0',
                    color: '#2563eb',
                  },
                }}
              >
                {actionLabel}
              </Button>
            )}
          </Box>
        )}

        {children}
      </Box>
    </Box>
  );
};

export default GlassCard;