// frontend/src/pages/teacher/UploadLesson.jsx
import { useState, useRef } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  LinearProgress,
  Chip,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ArrowBack,
  CloudUpload,
  VideoLibrary,
  PictureAsPdf,
  Delete,
  CheckCircle,
  Description,
  AttachFile,
  Close,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const UploadLesson = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Lesson Data
  const [lessonData, setLessonData] = useState({
    courseId: '',
    title: '',
    content: '',
    summary: '',
    order: 1,
    isPublished: false,
  });

  // Files
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Mock teacher's courses
  const teacherCourses = [
    {
      id: 'course-1',
      title: 'الرياضيات - الصف الأول الثانوي',
      lessonsCount: 12,
    },
    {
      id: 'course-2',
      title: 'الرياضيات - الصف الثاني الثانوي',
      lessonsCount: 15,
    },
    {
      id: 'course-3',
      title: 'الرياضيات - الصف الثالث الثانوي',
      lessonsCount: 18,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast.error('يرجى اختيار ملف فيديو صالح');
        return;
      }

      // Validate file size (max 500MB)
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        toast.error('حجم الفيديو يجب أن يكون أقل من 500 ميجابايت');
        return;
      }

      setVideoFile(file);
      
      // Create preview
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      
      toast.success('تم اختيار الفيديو بنجاح');
    }
  };

  const handlePdfSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        toast.error('يرجى اختيار ملف PDF صالح');
        return;
      }

      // Validate file size (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        toast.error('حجم ملف PDF يجب أن يكون أقل من 50 ميجابايت');
        return;
      }

      setPdfFile(file);
      toast.success('تم اختيار ملف PDF بنجاح');
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
    toast.success('تم حذف الفيديو');
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
    toast.success('تم حذف ملف PDF');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!lessonData.courseId) {
      toast.error('يرجى اختيار الكورس');
      return;
    }
    if (!lessonData.title) {
      toast.error('يرجى إدخال عنوان الدرس');
      return;
    }
    if (!videoFile && !pdfFile) {
      toast.error('يرجى رفع فيديو أو ملف PDF على الأقل');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);

      // TODO: Replace with actual API call
      const formData = new FormData();
      formData.append('courseId', lessonData.courseId);
      formData.append('title', lessonData.title);
      formData.append('content', lessonData.content);
      formData.append('summary', lessonData.summary);
      formData.append('order', lessonData.order);
      formData.append('isPublished', lessonData.isPublished);
      
      if (videoFile) {
        formData.append('video', videoFile);
      }
      if (pdfFile) {
        formData.append('pdf', pdfFile);
      }

      console.log('Uploading lesson:', lessonData);
      console.log('Video file:', videoFile);
      console.log('PDF file:', pdfFile);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success('تم رفع الدرس بنجاح! 🎉');
      
      setTimeout(() => {
        navigate('/teacher/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error uploading lesson:', error);
      toast.error('فشل رفع الدرس. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/teacher/dashboard')}
            sx={{
              mb: 2,
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              color: darkMode ? '#f1f5f9' : 'inherit',
            }}
          >
            العودة للوحة التحكم
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <CloudUpload />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
              >
                رفع درس جديد
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
              >
                أضف محتوى تعليمي جديد لطلابك
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Main Form */}
          <Grid item xs={12} lg={8}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ mb: 3, color: darkMode ? '#f1f5f9' : 'inherit' }}
                  >
                    معلومات الدرس
                  </Typography>

                  <Grid container spacing={3}>
                    {/* Course Selection */}
                    <Grid item xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            color: darkMode ? '#94a3b8' : undefined,
                          }}
                        >
                          اختر الكورس
                        </InputLabel>
                        <Select
                          name="courseId"
                          value={lessonData.courseId}
                          onChange={handleChange}
                          label="اختر الكورس"
                          sx={{
                            fontFamily: 'Cairo, sans-serif',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: darkMode ? '#334155' : undefined,
                            },
                            '& .MuiSelect-select': {
                              color: darkMode ? '#f1f5f9' : undefined,
                            },
                          }}
                        >
                          {teacherCourses.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: '100%',
                                }}
                              >
                                <Typography fontFamily="Cairo, sans-serif" fontWeight={700}>
                                  {course.title}
                                </Typography>
                                <Chip
                                  label={`${course.lessonsCount} درس`}
                                  size="small"
                                  sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
                                />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Title */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        name="title"
                        label="عنوان الدرس"
                        value={lessonData.title}
                        onChange={handleChange}
                        placeholder="مثال: المعادلات من الدرجة الأولى"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: darkMode ? '#334155' : undefined,
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: darkMode ? '#f1f5f9' : undefined,
                          },
                          '& .MuiInputLabel-root': {
                            fontFamily: 'Cairo, sans-serif',
                            color: darkMode ? '#94a3b8' : undefined,
                          },
                        }}
                        InputProps={{
                          sx: { fontFamily: 'Cairo, sans-serif' },
                        }}
                      />
                    </Grid>

                    {/* Summary */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        name="summary"
                        label="ملخص الدرس"
                        value={lessonData.summary}
                        onChange={handleChange}
                        placeholder="ملخص مختصر عن محتوى الدرس..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: darkMode ? '#334155' : undefined,
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: darkMode ? '#f1f5f9' : undefined,
                          },
                          '& .MuiInputLabel-root': {
                            fontFamily: 'Cairo, sans-serif',
                            color: darkMode ? '#94a3b8' : undefined,
                          },
                        }}
                        InputProps={{
                          sx: { fontFamily: 'Cairo, sans-serif' },
                        }}
                      />
                    </Grid>

                    {/* Content */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="content"
                        label="محتوى الدرس (اختياري)"
                        value={lessonData.content}
                        onChange={handleChange}
                        placeholder="اكتب شرح تفصيلي أو ملاحظات عن الدرس..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: darkMode ? '#334155' : undefined,
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: darkMode ? '#f1f5f9' : undefined,
                          },
                          '& .MuiInputLabel-root': {
                            fontFamily: 'Cairo, sans-serif',
                            color: darkMode ? '#94a3b8' : undefined,
                          },
                        }}
                        InputProps={{
                          sx: { fontFamily: 'Cairo, sans-serif' },
                        }}
                      />
                    </Grid>

                    {/* Order */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="number"
                        name="order"
                        label="ترتيب الدرس"
                        value={lessonData.order}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: darkMode ? '#334155' : undefined,
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: darkMode ? '#f1f5f9' : undefined,
                          },
                          '& .MuiInputLabel-root': {
                            fontFamily: 'Cairo, sans-serif',
                            color: darkMode ? '#94a3b8' : undefined,
                          },
                        }}
                        InputProps={{
                          sx: { fontFamily: 'Cairo, sans-serif' },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* File Uploads */}
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ mb: 3, color: darkMode ? '#f1f5f9' : 'inherit' }}
                    >
                      الملفات
                    </Typography>

                    {/* Video Upload */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        mb: 3,
                        border: '2px dashed',
                        borderColor: darkMode ? '#334155' : '#e5e7eb',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                        textAlign: 'center',
                      }}
                    >
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoSelect}
                        style={{ display: 'none' }}
                      />
                      
                      {!videoFile ? (
                        <Box>
                          <VideoLibrary
                            sx={{
                              fontSize: 60,
                              color: darkMode ? '#475569' : '#d1d5db',
                              mb: 2,
                            }}
                          />
                          <Typography
                            variant="body1"
                            fontFamily="Cairo, sans-serif"
                            fontWeight={700}
                            sx={{ mb: 1, color: darkMode ? '#f1f5f9' : 'inherit' }}
                          >
                            رفع فيديو الدرس
                          </Typography>
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            sx={{ mb: 2, color: darkMode ? '#94a3b8' : 'text.secondary' }}
                          >
                            الحد الأقصى: 500 ميجابايت
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => videoInputRef.current?.click()}
                            startIcon={<CloudUpload />}
                            sx={{
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 700,
                              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                            }}
                          >
                            اختيار فيديو
                          </Button>
                        </Box>
                      ) : (
                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              p: 2,
                              bgcolor: darkMode ? '#1e293b' : 'white',
                              borderRadius: 2,
                              mb: 2,
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <VideoLibrary sx={{ color: '#8b5cf6', fontSize: 30 }} />
                              <Box sx={{ textAlign: 'left' }}>
                                <Typography
                                  variant="body1"
                                  fontFamily="Cairo, sans-serif"
                                  fontWeight={700}
                                  sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                                >
                                  {videoFile.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  fontFamily="Cairo, sans-serif"
                                  sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                                >
                                  {formatFileSize(videoFile.size)}
                                </Typography>
                              </Box>
                            </Box>
                            <IconButton onClick={handleRemoveVideo} color="error">
                              <Close />
                            </IconButton>
                          </Box>
                          {videoPreview && (
                            <video
                              src={videoPreview}
                              controls
                              style={{
                                width: '100%',
                                maxHeight: '300px',
                                borderRadius: '8px',
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </Paper>

                    {/* PDF Upload */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        border: '2px dashed',
                        borderColor: darkMode ? '#334155' : '#e5e7eb',
                        bgcolor: darkMode ? '#0f172a' : '#f9fafb',
                        textAlign: 'center',
                      }}
                    >
                      <input
                        ref={pdfInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfSelect}
                        style={{ display: 'none' }}
                      />
                      
                      {!pdfFile ? (
                        <Box>
                          <PictureAsPdf
                            sx={{
                              fontSize: 60,
                              color: darkMode ? '#475569' : '#d1d5db',
                              mb: 2,
                            }}
                          />
                          <Typography
                            variant="body1"
                            fontFamily="Cairo, sans-serif"
                            fontWeight={700}
                            sx={{ mb: 1, color: darkMode ? '#f1f5f9' : 'inherit' }}
                          >
                            رفع ملف PDF (اختياري)
                          </Typography>
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            sx={{ mb: 2, color: darkMode ? '#94a3b8' : 'text.secondary' }}
                          >
                            ملاحظات، تمارين، أو مواد إضافية (الحد الأقصى: 50 ميجابايت)
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => pdfInputRef.current?.click()}
                            startIcon={<AttachFile />}
                            sx={{
                              fontFamily: 'Cairo, sans-serif',
                              fontWeight: 700,
                              borderColor: darkMode ? '#334155' : undefined,
                              color: darkMode ? '#f1f5f9' : 'inherit',
                            }}
                          >
                            اختيار PDF
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                            bgcolor: darkMode ? '#1e293b' : 'white',
                            borderRadius: 2,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PictureAsPdf sx={{ color: '#dc2626', fontSize: 30 }} />
                            <Box sx={{ textAlign: 'left' }}>
                              <Typography
                                variant="body1"
                                fontFamily="Cairo, sans-serif"
                                fontWeight={700}
                                sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                              >
                                {pdfFile.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? '#64748b' : 'text.secondary' }}
                              >
                                {formatFileSize(pdfFile.size)}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton onClick={handleRemovePdf} color="error">
                            <Close />
                          </IconButton>
                        </Box>
                      )}
                    </Paper>
                  </Box>

                  {/* Upload Progress */}
                  {loading && (
                    <Box sx={{ mt: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                        >
                          جاري الرفع...
                        </Typography>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                        >
                          {uploadProgress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: darkMode ? '#334155' : '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#8b5cf6',
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  )}

                  {/* Submit Button */}
                  <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/teacher/dashboard')}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        borderColor: darkMode ? '#334155' : undefined,
                        color: darkMode ? '#f1f5f9' : 'inherit',
                      }}
                    >
                      إلغاء
                    </Button>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={<CloudUpload />}
                      sx={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 900,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
                        },
                      }}
                    >
                      {loading ? 'جاري الرفع...' : 'رفع الدرس'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tips Panel */}
          <Grid item xs={12} lg={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 2, color: darkMode ? '#f1f5f9' : 'inherit' }}
                >
                  نصائح لرفع الدروس
                </Typography>
                <List>
                  <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                        >
                          استخدم عناوين واضحة ووصفية للدروس
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                        >
                          تأكد من جودة الفيديو والصوت قبل الرفع
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                        >
                          أضف ملف PDF للملاحظات والتمارين
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}
                        >
                          رتّب الدروس بشكل منطقي ومتسلسل
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
             {/* File Format Info */}
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 2, color: darkMode ? '#f1f5f9' : 'inherit' }}
                >
                  صيغ الملفات المدعومة
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={700}
                    sx={{ mb: 1, color: darkMode ? '#f1f5f9' : 'inherit' }}
                  >
                    الفيديو:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="MP4" size="small" sx={{ fontFamily: 'Cairo, sans-serif' }} />
                    <Chip label="AVI" size="small" sx={{ fontFamily: 'Cairo, sans-serif' }} />
                    <Chip label="MOV" size="small" sx={{ fontFamily: 'Cairo, sans-serif' }} />
                    <Chip label="WMV" size="small" sx={{ fontFamily: 'Cairo, sans-serif' }} />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={700}
                    sx={{ mb: 1, color: darkMode ? '#f1f5f9' : 'inherit' }}
                  >
                    المستندات:
                  </Typography>
                  <Chip label="PDF" size="small" sx={{ fontFamily: 'Cairo, sans-serif' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UploadLesson;