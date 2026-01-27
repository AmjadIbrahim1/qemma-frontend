import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  IconButton,
  Chip,
  List,
  ListItem,
  LinearProgress,
  TextField,
  Alert,
} from '@mui/material';
import {
  ArrowBackRounded,
  CloudUploadRounded,
  AttachFileRounded,
  DeleteRounded,
  CheckCircleRounded,
  AccessTimeRounded,
  DescriptionRounded,
  SendRounded,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';

const SubmitAssignmentPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const pendingAssignments = [
    { id: 1, title: 'حل تمارين الباب الثالث', course: 'الرياضيات', dueDate: 'غداً، 11:59 م', isUrgent: true, points: 100, color: '#2563eb' },
    { id: 2, title: 'تقرير تجربة الكهرباء', course: 'الفيزياء', dueDate: 'بعد يومين', isUrgent: false, points: 50, color: '#7c3aed' },
    { id: 3, title: 'كتابة Essay عن التكنولوجيا', course: 'اللغة الإنجليزية', dueDate: 'بعد 3 أيام', isUrgent: false, points: 75, color: '#db2777' },
  ];

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedAssignment || selectedFiles.length === 0) return;
    setUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedAssignment(null);
      setSelectedFiles([]);
      setNotes('');
    }, 3000);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', pb: 4 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
          color: 'white',
          py: 4,
          px: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigate('/student/dashboard')}
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}
            >
              <ArrowBackRounded />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif">
                📤 تسليم الواجبات
              </Typography>
              <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9 }}>
                لديك {pendingAssignments.length} واجبات منتظرة
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {submitted && (
          <Alert icon={<CheckCircleRounded />} severity="success" sx={{ mb: 3, borderRadius: 2, fontFamily: 'Cairo, sans-serif' }}>
            تم تسليم الواجب بنجاح! 🎉
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>
              📋 الواجبات المنتظرة
            </Typography>

            <List sx={{ p: 0 }}>
              {pendingAssignments.map((assignment) => (
                <ListItem
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment)}
                  sx={{
                    mb: 1.5,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: selectedAssignment?.id === assignment.id
                      ? darkMode ? '#334155' : `${assignment.color}10`
                      : darkMode ? '#1e293b' : 'white',
                    border: '2px solid',
                    borderColor: selectedAssignment?.id === assignment.id ? assignment.color : darkMode ? '#334155' : '#e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: assignment.color },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                        {assignment.title}
                      </Typography>
                      {assignment.isUrgent && (
                        <Chip label="عاجل" size="small" sx={{ bgcolor: '#ef4444', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 600, height: 20 }} />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip label={assignment.course} size="small" sx={{ bgcolor: `${assignment.color}15`, color: assignment.color, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeRounded sx={{ fontSize: 14, color: assignment.isUrgent ? '#ef4444' : darkMode ? '#94a3b8' : '#64748b' }} />
                        <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: assignment.isUrgent ? '#ef4444' : darkMode ? '#94a3b8' : '#64748b', fontWeight: 600 }}>
                          {assignment.dueDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          <Card
            elevation={0}
            sx={{
              flex: 1,
              border: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              bgcolor: darkMode ? '#1e293b' : 'white',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 3 }}>
              📎 رفع الملفات
            </Typography>

            {selectedAssignment ? (
              <>
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontFamily: 'Cairo, sans-serif' }}>
                  تسليم: <strong>{selectedAssignment.title}</strong>
                </Alert>

                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: darkMode ? '#475569' : '#cbd5e1',
                    borderRadius: 3,
                    p: 4,
                    textAlign: 'center',
                    mb: 3,
                    cursor: 'pointer',
                    '&:hover': { borderColor: '#7c3aed', bgcolor: darkMode ? '#334155' : '#f8fafc' },
                  }}
                  component="label"
                >
                  <input type="file" hidden multiple onChange={handleFileSelect} />
                  <CloudUploadRounded sx={{ fontSize: 48, color: '#7c3aed', mb: 2 }} />
                  <Typography variant="body1" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    اسحب الملفات هنا أو اضغط للرفع
                  </Typography>
                </Box>

                {selectedFiles.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    {selectedFiles.map((file, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 2, bgcolor: darkMode ? '#334155' : '#f8fafc', mb: 1 }}>
                        <DescriptionRounded sx={{ color: '#7c3aed' }} />
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ flex: 1, color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          {file.name}
                        </Typography>
                        <IconButton size="small" onClick={() => handleRemoveFile(index)} sx={{ color: '#ef4444' }}>
                          <DeleteRounded fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="ملاحظات إضافية..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={{ mb: 3, '& .MuiOutlinedInput-root': { fontFamily: 'Cairo, sans-serif', bgcolor: darkMode ? '#334155' : '#f8fafc' } }}
                />

                <Button
                  fullWidth
                  size="large"
                  startIcon={uploading ? null : <SendRounded />}
                  onClick={handleSubmit}
                  disabled={selectedFiles.length === 0 || uploading}
                  sx={{
                    bgcolor: '#7c3aed',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#6d28d9' },
                  }}
                >
                  {uploading ? 'جاري الرفع...' : 'تسليم الواجب'}
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <AttachFileRounded sx={{ fontSize: 48, color: darkMode ? '#475569' : '#cbd5e1', mb: 2 }} />
                <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  اختر واجباً من القائمة
                </Typography>
              </Box>
            )}
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default SubmitAssignmentPage;