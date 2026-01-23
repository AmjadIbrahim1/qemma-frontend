// frontend/src/pages/student/LiveClass.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Videocam, People, Schedule, ArrowBack } from '@mui/icons-material';

const LiveClass = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  const fetchAvailableRooms = async () => {
    setLoading(true);
    // TODO: Fetch from API
    // Simulating API call
    setTimeout(() => {
      setAvailableRooms([
        {
          id: 1,
          name: 'رياضيات - الدرس الأول',
          teacher: 'د. أحمد حسن',
          participants: 45,
          maxCapacity: 50,
          startTime: '2025-01-25T10:00:00',
          isLive: true,
        },
        {
          id: 2,
          name: 'فيزياء - المراجعة النهائية',
          teacher: 'د. فاطمة محمد',
          participants: 32,
          maxCapacity: 50,
          startTime: '2025-01-25T14:00:00',
          isLive: false,
        },
        {
          id: 3,
          name: 'كيمياء - الباب الثالث',
          teacher: 'أ. خالد سعيد',
          participants: 28,
          maxCapacity: 40,
          startTime: '2025-01-25T16:00:00',
          isLive: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleJoinRoom = (roomCode) => {
    navigate(`/student/room/${roomCode}`);
  };

  const handleJoinWithCode = () => {
    if (roomCode.trim()) {
      navigate(`/student/room/${roomCode.trim()}`);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* BACK BUTTON */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/student/dashboard')}
          sx={{
            mb: 3,
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
          }}
        >
          العودة للوحة التحكم
        </Button>

        {/* HEADER */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            fontFamily="Cairo, sans-serif"
            sx={{ mb: 1 }}
          >
            الحصص المباشرة
          </Typography>
          <Typography variant="body1" color="text.secondary" fontFamily="Cairo, sans-serif">
            انضم إلى الحصص المباشرة وتفاعل مع المدرس وزملائك
          </Typography>
        </Box>

        {/* JOIN WITH CODE */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
            الانضمام بكود الغرفة
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="أدخل كود الغرفة"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinWithCode()}
              sx={{ fontFamily: 'Cairo, sans-serif' }}
            />
            <Button
              variant="contained"
              disableElevation
              onClick={handleJoinWithCode}
              sx={{
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 900,
                px: 4,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
                },
              }}
            >
              انضم
            </Button>
          </Box>
        </Card>

        {/* AVAILABLE ROOMS */}
        <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
          الحصص المتاحة
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {availableRooms.map((room) => (
              <Grid item xs={12} md={6} key={room.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif">
                        {room.name}
                      </Typography>
                      {room.isLive && (
                        <Chip
                          label="مباشر"
                          color="error"
                          size="small"
                          sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Videocam fontSize="small" color="action" />
                      <Typography variant="body2" fontFamily="Cairo, sans-serif">
                        {room.teacher}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <People fontSize="small" color="action" />
                      <Typography variant="body2" fontFamily="Cairo, sans-serif">
                        {room.participants}/{room.maxCapacity} مشارك
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" fontFamily="Cairo, sans-serif">
                        {new Date(room.startTime).toLocaleString('ar-EG')}
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      disableElevation
                      onClick={() => handleJoinRoom(room.id)}
                      disabled={!room.isLive}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 900,
                        background: room.isLive
                          ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)'
                          : undefined,
                        '&:hover': room.isLive
                          ? {
                              background:
                                'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
                            }
                          : undefined,
                      }}
                    >
                      {room.isLive ? 'انضم الآن' : 'قريباً'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {availableRooms.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" fontFamily="Cairo, sans-serif">
              لا توجد حصص متاحة حالياً
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LiveClass;