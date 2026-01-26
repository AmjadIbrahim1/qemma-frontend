// frontend/src/pages/ProfilePage.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  InfoOutlined,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile, addPassword } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRoleLabel = (role) => {
    const roleMap = {
      student: 'طالب',
      teacher: 'مدرس',
      parent: 'ولي أمر',
      admin: 'مسؤول',
    };
    return roleMap[role] || 'مستخدم';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Update profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async () => {
    if (!formData.password || formData.password.length < 8) {
      toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      toast.error('كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم');
      return;
    }

    setLoading(true);
    try {
      await addPassword(formData.password);
      setPasswordMode(false);
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (error) {
      console.error('Add password error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      password: '',
    });
    setEditMode(false);
    setPasswordMode(false);
  };

  // Check if user logged in with Clerk/Google
  const isClerkUser = user?.authProvider === 'clerk' || user?.authProvider === 'hybrid';
  const hasPassword = user?.hasPassword || user?.authProvider === 'local' || user?.authProvider === 'hybrid';

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{
          mb: 3,
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 700,
        }}
      >
        العودة للرئيسية
      </Button>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={user?.avatar}
              sx={{
                width: 80,
                height: 80,
                fontSize: '2rem',
                background:
                  'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
              }}
            >
              {getInitials(user?.name)}
            </Avatar>
            <Box sx={{ ml: 3, flex: 1 }}>
              <Typography
                variant="h5"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
              >
                {user?.name || 'مستخدم'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={getRoleLabel(user?.role)}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    background:
                      'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.15) 100%)',
                    color: 'rgb(30,64,175)',
                  }}
                />
                {isClerkUser && (
                  <Chip
                    label={user?.authProvider === 'hybrid' ? 'Google + Email' : 'Google'}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontFamily: 'Cairo, sans-serif',
                    }}
                  />
                )}
              </Box>
            </Box>
            {!editMode && !passwordMode && (
              <IconButton
                onClick={() => setEditMode(true)}
                sx={{
                  color: 'primary.main',
                }}
              >
                <Edit />
              </IconButton>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Info Alert for Clerk Users */}
          {isClerkUser && user?.authProvider === 'hybrid' && (
            <Alert 
              severity="info" 
              icon={<InfoOutlined />}
              sx={{ mb: 3, fontFamily: 'Cairo, sans-serif' }}
            >
              <Typography variant="body2" fontFamily="Cairo, sans-serif">
                🎉 تم إنشاء حسابك بنجاح! لديك الآن كلمة مرور تلقائية تمكنك من تسجيل الدخول بالبريد الإلكتروني.
                يمكنك تغييرها من إعدادات الحساب.
              </Typography>
            </Alert>
          )}

          {/* Profile Information */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="الاسم الكامل"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                value={user?.email}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="01012345678"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Password Section */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: hasPassword 
                    ? 'rgba(34, 197, 94, 0.05)' 
                    : 'rgba(37, 99, 235, 0.05)',
                  border: '1px solid',
                  borderColor: hasPassword 
                    ? 'rgba(34, 197, 94, 0.2)' 
                    : 'rgba(37, 99, 235, 0.2)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Lock sx={{ mr: 1, fontSize: '1.2rem' }} />
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    كلمة المرور
                  </Typography>
                </Box>

                {hasPassword ? (
                  <Typography
                    variant="body2"
                    fontFamily="Cairo, sans-serif"
                    sx={{ mb: 2 }}
                  >
                    {user?.authProvider === 'hybrid' 
                      ? '✅ لديك كلمة مرور تلقائية. يمكنك الآن تسجيل الدخول بالبريد الإلكتروني أو Google.'
                      : '✅ لديك كلمة مرور. يمكنك تسجيل الدخول بالبريد الإلكتروني.'}
                  </Typography>
                ) : (
                  <>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ mb: 2 }}
                    >
                      قمت بالتسجيل عبر Google. يمكنك إضافة كلمة مرور للدخول بالبريد
                      الإلكتروني أيضاً.
                    </Typography>
                    {!passwordMode ? (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setPasswordMode(true)}
                        sx={{
                          fontFamily: 'Cairo, sans-serif',
                          fontWeight: 700,
                        }}
                      >
                        إضافة كلمة مرور
                      </Button>
                    ) : (
                      <TextField
                        fullWidth
                        name="password"
                        label="كلمة المرور الجديدة"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="8 أحرف على الأقل"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          {(editMode || passwordMode) && (
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={passwordMode ? handleAddPassword : handleSaveProfile}
                disabled={loading}
                startIcon={<Save />}
                disableElevation
                sx={{
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 900,
                  borderRadius: 2,
                  py: 1.5,
                  background:
                    'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
                  },
                }}
              >
                حفظ التغييرات
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleCancel}
                startIcon={<Cancel />}
                sx={{
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 900,
                  borderRadius: 2,
                  py: 1.5,
                }}
              >
                إلغاء
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;