// frontend/src/pages/teacher/TeacherBooks.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  MenuBook,
  Delete,
  Edit,
  CloudUpload,
  Visibility,
  GetApp,
  Close,
  Warning,
} from '@mui/icons-material';

const TeacherBooks = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  // States
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'كتاب الرياضيات - الصف الثالث الثانوي',
      subject: 'الرياضيات',
      grade: 'الصف الثالث الثانوي',
      description: 'الجبر والهندسة الفراغية',
      coverImage: null,
      uploadDate: '2024-01-15',
      fileSize: '12.5 MB',
      downloads: 45,
    },
    {
      id: 2,
      title: 'كتاب الفيزياء - الجزء الأول',
      subject: 'الفيزياء',
      grade: 'الصف الثالث الثانوي',
      description: 'الميكانيكا والحركة الدورانية',
      coverImage: null,
      uploadDate: '2024-01-20',
      fileSize: '15.8 MB',
      downloads: 38,
    },
  ]);
  
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // New Book Form Data
  const [newBook, setNewBook] = useState({
    title: '',
    subject: '',
    grade: '',
    description: '',
    file: null,
    coverImage: null,
  });

  // Handlers
  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
    setNewBook({
      title: '',
      subject: '',
      grade: '',
      description: '',
      file: null,
      coverImage: null,
    });
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  const handleOpenEditDialog = (book) => {
    setSelectedBook(book);
    setNewBook({
      title: book.title,
      subject: book.subject,
      grade: book.grade,
      description: book.description,
      file: null,
      coverImage: book.coverImage,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedBook(null);
    setNewBook({
      title: '',
      subject: '',
      grade: '',
      description: '',
      file: null,
      coverImage: null,
    });
  };

  const handleUpdateBook = () => {
    if (!newBook.title || !newBook.subject || !newBook.grade) {
      setSnackbar({
        open: true,
        message: 'برجاء ملء جميع الحقول المطلوبة',
        severity: 'error',
      });
      return;
    }

    const updatedBooks = books.map(book => 
      book.id === selectedBook.id 
        ? {
            ...book,
            title: newBook.title,
            subject: newBook.subject,
            grade: newBook.grade,
            description: newBook.description,
            coverImage: newBook.coverImage,
          }
        : book
    );

    setBooks(updatedBooks);
    setSnackbar({
      open: true,
      message: 'تم تحديث الكتاب بنجاح',
      severity: 'success',
    });
    handleCloseEditDialog();
  };

  const handleOpenViewDialog = (book) => {
    setSelectedBook(book);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedBook(null);
  };

  const handleOpenDeleteDialog = (book) => {
    setSelectedBook(book);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedBook(null);
  };

  const handleConfirmDelete = () => {
    setBooks(books.filter(book => book.id !== selectedBook.id));
    setSnackbar({
      open: true,
      message: 'تم حذف الكتاب بنجاح',
      severity: 'success',
    });
    handleCloseDeleteDialog();
  };

  const handleUploadBook = () => {
    if (!newBook.title || !newBook.subject || !newBook.grade) {
      setSnackbar({
        open: true,
        message: 'برجاء ملء جميع الحقول المطلوبة',
        severity: 'error',
      });
      return;
    }

    const book = {
      id: books.length + 1,
      title: newBook.title,
      subject: newBook.subject,
      grade: newBook.grade,
      description: newBook.description,
      coverImage: newBook.coverImage,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '0 MB',
      downloads: 0,
    };

    setBooks([...books, book]);
    setSnackbar({
      open: true,
      message: 'تم رفع الكتاب بنجاح',
      severity: 'success',
    });
    handleCloseUploadDialog();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewBook({ ...newBook, file });
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBook({ ...newBook, coverImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f9fafb', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
          color: 'white',
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigate('/teacher/dashboard')}
              sx={{ color: 'white' }}
            >
              <ArrowBack />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <MenuBook sx={{ fontSize: 40 }} />
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                >
                  مكتبة الكتب
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9 }}
                  fontFamily="Cairo, sans-serif"
                >
                  إدارة كتبك الدراسية
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenUploadDialog}
              sx={{
                bgcolor: 'white',
                color: '#7c3aed',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 900,
                '&:hover': {
                  bgcolor: '#f3f4f6',
                },
              }}
            >
              رفع كتاب جديد
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563eb',
                    }}
                  >
                    <MenuBook />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                    >
                      {books.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                    >
                      إجمالي الكتب
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: '#f5f3ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7c3aed',
                    }}
                  >
                    <GetApp />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
                    >
                      {books.reduce((sum, book) => sum + book.downloads, 0)}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                    >
                      إجمالي التحميلات
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: darkMode ? '#334155' : '#e5e7eb',
                bgcolor: darkMode ? '#1e293b' : 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: '#fdf2f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#db2777',
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
                      {books.length > 0 ? books[books.length - 1].uploadDate : '-'}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.75rem' }}
                    >
                      آخر تحديث
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Books Grid */}
        {books.length === 0 ? (
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: darkMode ? '#334155' : '#e5e7eb',
              bgcolor: darkMode ? '#1e293b' : 'white',
            }}
          >
            <CardContent>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <MenuBook sx={{ fontSize: 80, color: darkMode ? '#475569' : '#d1d5db', mb: 2 }} />
                <Typography
                  variant="h6"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={700}
                  sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}
                >
                  لا توجد كتب حالياً
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#64748b' : '#9ca3af', mb: 3 }}
                >
                  ابدأ برفع كتابك الأول
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleOpenUploadDialog}
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  }}
                >
                  رفع كتاب جديد
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: darkMode
                        ? '0 10px 20px rgba(0,0,0,0.3)'
                        : '0 10px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {book.coverImage ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={book.coverImage}
                      alt={book.title}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 200,
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MenuBook sx={{ fontSize: 80, color: 'white', opacity: 0.5 }} />
                    </Box>
                  )}
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#f1f5f9' : 'inherit', flex: 1 }}
                      >
                        {book.title}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        label={book.subject}
                        size="small"
                        sx={{
                          bgcolor: darkMode ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff',
                          color: '#2563eb',
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        label={book.grade}
                        size="small"
                        sx={{
                          bgcolor: darkMode ? 'rgba(124, 58, 237, 0.2)' : '#f5f3ff',
                          color: '#7c3aed',
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                    
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 2 }}
                      fontFamily="Cairo, sans-serif"
                    >
                      {book.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: darkMode ? '#64748b' : '#9ca3af' }}
                        fontFamily="Cairo, sans-serif"
                      >
                        {book.downloads} تحميل • {book.fileSize}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: darkMode ? '#64748b' : '#9ca3af' }}
                        fontFamily="Cairo, sans-serif"
                      >
                        {book.uploadDate}
                      </Typography>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, pt: 2, borderTop: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Visibility />}
                        onClick={() => handleOpenViewDialog(book)}
                        sx={{
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                          },
                        }}
                      >
                        عرض
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleOpenEditDialog(book)}
                        sx={{
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                          borderColor: darkMode ? '#475569' : '#e2e8f0',
                          color: darkMode ? '#f1f5f9' : '#1e293b',
                          '&:hover': {
                            borderColor: '#7c3aed',
                            bgcolor: darkMode ? 'rgba(124, 58, 237, 0.1)' : '#f5f3ff',
                          },
                        }}
                      >
                        تعديل
                      </Button>
                      <IconButton
                        onClick={() => handleOpenDeleteDialog(book)}
                        sx={{
                          color: 'error.main',
                          border: '1px solid',
                          borderColor: 'error.main',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Upload Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={handleCloseUploadDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900 }}>
          رفع كتاب جديد
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="عنوان الكتاب"
              fullWidth
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <TextField
              label="المادة"
              fullWidth
              value={newBook.subject}
              onChange={(e) => setNewBook({ ...newBook, subject: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <TextField
              label="الصف الدراسي"
              fullWidth
              value={newBook.grade}
              onChange={(e) => setNewBook({ ...newBook, grade: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <TextField
              label="الوصف"
              fullWidth
              multiline
              rows={3}
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
              >
                رفع ملف الكتاب (PDF)
                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </Button>
              {newBook.file && (
                <Typography
                  variant="caption"
                  sx={{ mt: 1, display: 'block', fontFamily: 'Cairo, sans-serif' }}
                >
                  الملف: {newBook.file.name}
                </Typography>
              )}
            </Box>
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
              >
                رفع صورة الغلاف (اختياري)
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleCoverImageChange}
                />
              </Button>
              {newBook.coverImage && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={newBook.coverImage}
                    alt="Cover preview"
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseUploadDialog}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleUploadBook}
            variant="contained"
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            }}
          >
            رفع الكتاب
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900 }}>
          تعديل الكتاب
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="عنوان الكتاب"
              fullWidth
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <TextField
              label="المادة"
              fullWidth
              value={newBook.subject}
              onChange={(e) => setNewBook({ ...newBook, subject: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <TextField
              label="الصف الدراسي"
              fullWidth
              value={newBook.grade}
              onChange={(e) => setNewBook({ ...newBook, grade: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <TextField
              label="الوصف"
              fullWidth
              multiline
              rows={3}
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              InputProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
              InputLabelProps={{
                style: { fontFamily: 'Cairo, sans-serif' },
              }}
            />
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
              >
                تغيير صورة الغلاف (اختياري)
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleCoverImageChange}
                />
              </Button>
              {newBook.coverImage && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={newBook.coverImage}
                    alt="Cover preview"
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseEditDialog}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleUpdateBook}
            variant="contained"
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            }}
          >
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Book Details Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MenuBook sx={{ fontSize: 30, color: '#7c3aed' }} />
            <span>تفاصيل الكتاب</span>
          </Box>
          <IconButton onClick={handleCloseViewDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {selectedBook && (
            <Box sx={{ py: 2 }}>
              {/* Cover Image */}
              {selectedBook.coverImage ? (
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <img
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 300,
                      borderRadius: 12,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 300,
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                    mb: 3,
                  }}
                >
                  <MenuBook sx={{ fontSize: 120, color: 'white', opacity: 0.5 }} />
                </Box>
              )}

              {/* Book Details */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Title */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: '#64748b', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
                  >
                    عنوان الكتاب
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ mt: 0.5 }}
                  >
                    {selectedBook.title}
                  </Typography>
                </Box>

                <Divider />

                {/* Subject and Grade */}
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography
                      variant="caption"
                      sx={{ color: '#64748b', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
                    >
                      المادة الدراسية
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={selectedBook.subject}
                        sx={{
                          bgcolor: '#eff6ff',
                          color: '#2563eb',
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                          fontSize: '1rem',
                          py: 2,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="caption"
                      sx={{ color: '#64748b', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
                    >
                      الصف الدراسي
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={selectedBook.grade}
                        sx={{
                          bgcolor: '#f5f3ff',
                          color: '#7c3aed',
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                          fontSize: '1rem',
                          py: 2,
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider />

                {/* Description */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: '#64748b', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
                  >
                    الوصف
                  </Typography>
                  <Typography
                    variant="body1"
                    fontFamily="Cairo, sans-serif"
                    sx={{ mt: 1, lineHeight: 1.8 }}
                  >
                    {selectedBook.description || 'لا يوجد وصف متاح'}
                  </Typography>
                </Box>

                <Divider />

                {/* Statistics */}
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        bgcolor: '#eff6ff',
                        p: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <GetApp sx={{ fontSize: 30, color: '#2563eb', mb: 1 }} />
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: '#2563eb' }}
                      >
                        {selectedBook.downloads}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: '#64748b' }}
                      >
                        تحميل
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        bgcolor: '#f5f3ff',
                        p: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <CloudUpload sx={{ fontSize: 30, color: '#7c3aed', mb: 1 }} />
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: '#7c3aed' }}
                      >
                        {selectedBook.fileSize}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: '#64748b' }}
                      >
                        حجم الملف
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        bgcolor: '#fdf2f8',
                        p: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <MenuBook sx={{ fontSize: 30, color: '#db2777', mb: 1 }} />
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: '#db2777' }}
                      >
                        {selectedBook.uploadDate}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: '#64748b' }}
                      >
                        تاريخ الرفع
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseViewDialog}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
          >
            إغلاق
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => {
              handleCloseViewDialog();
              handleOpenEditDialog(selectedBook);
            }}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              borderColor: '#7c3aed',
              color: '#7c3aed',
              '&:hover': {
                borderColor: '#6d28d9',
                bgcolor: '#f5f3ff',
              },
            }}
          >
            تعديل الكتاب
          </Button>
          <Button
            variant="contained"
            startIcon={<GetApp />}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            }}
          >
            تحميل الكتاب
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Warning sx={{ fontSize: 30, color: '#ef4444' }} />
          تأكيد الحذف
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            fontFamily="Cairo, sans-serif"
            sx={{ mb: 2 }}
          >
            هل أنت متأكد من حذف هذا الكتاب؟
          </Typography>
          {selectedBook && (
            <Box
              sx={{
                bgcolor: '#fef2f2',
                p: 2,
                borderRadius: 2,
                border: '1px solid #fecaca',
              }}
            >
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                fontWeight={700}
                sx={{ color: '#991b1b', mb: 1 }}
              >
                {selectedBook.title}
              </Typography>
              <Typography
                variant="caption"
                fontFamily="Cairo, sans-serif"
                sx={{ color: '#dc2626' }}
              >
                لن تتمكن من استرجاع هذا الكتاب بعد الحذف
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="outlined"
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              borderColor: '#e5e7eb',
              color: '#64748b',
            }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            startIcon={<Delete />}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              bgcolor: '#ef4444',
              '&:hover': {
                bgcolor: '#dc2626',
              },
            }}
          >
            حذف الكتاب
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ fontFamily: 'Cairo, sans-serif' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherBooks;