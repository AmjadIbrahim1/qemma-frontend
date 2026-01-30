// frontend/src/pages/teacher/TeacherSchedule.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack,
  CalendarToday,
  Schedule,
  VideoCall,
  People,
  Class,
  Save,
  Link as LinkIcon,
} from '@mui/icons-material';

const TeacherSchedule = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    course: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'online',
    meetingLink: '',
    description: '',
    maxStudents: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Dummy courses data - replace with actual API call
  const courses = [
    { id: 1, name: 'الرياضيات - الصف الأول الثانوي' },
    { id: 2, name: 'الفيزياء - الصف الثاني الثانوي' },
    { id: 3, name: 'الكيمياء - الصف الثالث الثانوي' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.course || !formData.date || !formData.startTime || !formData.endTime) {
      setSnackbar({
        open: true,
        message: 'الرجاء ملء جميع الحقول المطلوبة',
        severity: 'error',
      });
      return;
    }

    try {
      // Here you would make an API call to save the schedule
      // const response = await api.post('/teacher/schedule', formData);
      
      console.log('Schedule Data:', formData);

      setSnackbar({
        open: true,
        message: 'تم إضافة الحصة بنجاح!',
        severity: 'success',
      });

      // Reset form
      setTimeout(() => {
        navigate('/teacher/dashboard');
      }, 1500);

    } catch (error) {
      setSnackbar({
        open: true,
        message: 'حدث خطأ أثناء إضافة الحصة',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f9fafb', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton 
              onClick={() => navigate('/teacher/dashboard')}
              sx={{ 
                bgcolor: darkMode ? '#1e293b' : 'white',
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
            >
              إضافة حصة جديدة
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
          >
            قم بجدولة حصة جديدة لطلابك
          </Typography>
        </Box>

        {/* Form Card */}
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: darkMode ? '#334155' : '#e5e7eb',
            bgcolor: darkMode ? '#1e293b' : 'white',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Class Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="عنوان الحصة"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="مثال: مراجعة الوحدة الأولى"
                    InputProps={{
                      startAdornment: <Class sx={{ mr: 1, color: '#2563eb' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>

                {/* Course Selection */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="اختر الكورس"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: <People sx={{ mr: 1, color: '#7c3aed' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  >
                    {courses.map((course) => (
                      <MenuItem 
                        key={course.id} 
                        value={course.id}
                        sx={{ fontFamily: 'Cairo, sans-serif' }}
                      >
                        {course.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="التاريخ"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: '#db2777' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>

                {/* Class Type */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="نوع الحصة"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: <VideoCall sx={{ mr: 1, color: '#059669' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  >
                    <MenuItem value="online" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      حصة أونلاين
                    </MenuItem>
                    <MenuItem value="offline" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                      حصة حضورية
                    </MenuItem>
                  </TextField>
                </Grid>

                {/* Start Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label="وقت البداية"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <Schedule sx={{ mr: 1, color: '#f59e0b' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>

                {/* End Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label="وقت النهاية"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <Schedule sx={{ mr: 1, color: '#f59e0b' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>

                {/* Meeting Link (for online classes) */}
                {formData.type === 'online' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="رابط الحصة (Zoom, Google Meet, etc.)"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleInputChange}
                      placeholder="https://zoom.us/j/..."
                      InputProps={{
                        startAdornment: <LinkIcon sx={{ mr: 1, color: '#8b5cf6' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: 'Cairo, sans-serif',
                          bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Grid>
                )}

                {/* Max Students */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="الحد الأقصى للطلاب (اختياري)"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    placeholder="مثال: 30"
                    InputProps={{
                      startAdornment: <People sx={{ mr: 1, color: '#10b981' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="وصف الحصة (اختياري)"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="أضف تفاصيل إضافية عن الحصة..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'Cairo, sans-serif',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/teacher/dashboard')}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        borderColor: darkMode ? '#334155' : '#e5e7eb',
                        color: darkMode ? '#94a3b8' : 'inherit',
                        '&:hover': {
                          borderColor: darkMode ? '#475569' : '#d1d5db',
                        },
                      }}
                    >
                      إلغاء
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Save />}
                      sx={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        px: 4,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                        },
                      }}
                    >
                      حفظ الحصة
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherSchedule;