// File: frontend/src/pages/auth/ClerkRegisterCallbackPage.jsx
// Purpose: Registration callback — SHOWS role-selection (original behavior) and allows division/name inputs

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from '@mui/material';
import {
  School,
  Person as PersonIcon,
  FamilyRestroom,
  SupervisorAccount,
} from '@mui/icons-material';

const ClerkRegisterCallbackPage = () => {
  const navigate = useNavigate();
  const { loginWithClerk } = useAuth();
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [step, setStep] = useState('loading');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [divisionError, setDivisionError] = useState('');
  const [inputError, setInputError] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        if (!isLoaded) return;
        if (!clerkUser) throw new Error('No Clerk user found');

        const existingRole = clerkUser.publicMetadata?.role;
        const existingDivision = clerkUser.publicMetadata?.division;

        if (existingRole) {
          await handleLogin(clerkUser.id, existingRole, existingDivision);
        } else {
          const accountAge = Date.now() - clerkUser.createdAt;
          const isNewUser = accountAge < 120000; // 2 minutes

          if (isNewUser) {
            setStep('role-selection');
          } else {
            try {
              await handleLogin(clerkUser.id, 'student');
            } catch (loginError) {
              setStep('role-selection');
            }
          }
        }
      } catch (err) {
        console.error('Clerk callback (register) error:', err);
        setError(err.message || 'فشل تسجيل الدخول');
        setStep('error');
      }
    };

    checkUserStatus();
  }, [clerkUser, isLoaded]);

  const handleLogin = async (clerkUserId, role = 'student', division = null) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      setStep('processing');

      // save metadata to Clerk
      try {
        const metadata = { role };
        if (division) metadata.division = division;
        await clerkUser.update({ publicMetadata: metadata });
      } catch (metaErr) {
        console.warn('Could not save metadata to Clerk:', metaErr);
      }

      await loginWithClerk(clerkUserId, role, division);

      if (role === 'assistant_teacher') {
        navigate('/assistant-teacher/dashboard', { replace: true });
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard', { replace: true });
      } else if (role === 'parent') {
        navigate('/parent/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Login error (register flow):', err);
      if (err.response?.status === 409 || err.message?.includes('already exists')) {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          await loginWithClerk(clerkUserId, role, division);
          navigate('/', { replace: true });
          return;
        } catch (retryErr) {
          console.error('Retry failed:', retryErr);
        }
      }

      setError(err.response?.data?.message || err.message || 'فشل تسجيل الدخول');
      setStep('error');
      setIsProcessing(false);
    }
  };

  const handleRoleSelect = (role) => {
    if (isProcessing) return;
    setSelectedRole(role);
    if (role === 'student') setStep('division-selection');
    else if (role === 'assistant_teacher') setStep('teacher-name-input');
    else if (role === 'parent') setStep('student-name-input');
    else handleLogin(clerkUser.id, role);
  };

  const handleDivisionConfirm = async () => {
    if (!selectedDivision) {
      setDivisionError('يرجى اختيار القسم الدراسي');
      return;
    }
    setDivisionError('');
    await handleLogin(clerkUser.id, selectedRole, selectedDivision);
  };

  const handleTeacherNameConfirm = async () => {
    if (!teacherName.trim()) {
      setInputError('يرجى إدخال اسم المدرس');
      return;
    }
    setInputError('');
    await handleLogin(clerkUser.id, selectedRole);
  };

  const handleStudentNameConfirm = async () => {
    if (!studentName.trim()) {
      setInputError('يرجى إدخال اسم الطالب');
      return;
    }
    setInputError('');
    await handleLogin(clerkUser.id, selectedRole);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student': return '#2563eb';
      case 'teacher': return '#7c3aed';
      case 'assistant_teacher': return '#059669';
      case 'parent': return '#db2777';
      default: return '#6b7280';
    }
  };

  const handleCancel = async () => {
    try {
      await signOut();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Cancel error:', err);
      window.location.href = '/login';
    }
  };

  const handleBack = () => {
    setInputError('');
    setDivisionError('');
    setStep('role-selection');
  };

  if (step === 'error') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography variant="h6" color="error" fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
            ❌ {error}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif" sx={{ mb: 3 }}>
            يرجى المحاولة مرة أخرى
          </Typography>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
          >
            المحاولة مرة أخرى
          </Button>
        </Box>
      </Container>
    );
  }

  // Role selection UI and subsidiary screens
  if (step === 'role-selection') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              مرحباً بك! 👋
            </Typography>
            <Typography variant="h6" fontFamily="Cairo, sans-serif" fontWeight={700}>
              اختر نوع حسابك
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
              {clerkUser?.emailAddresses[0]?.emailAddress}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {[
              { value: 'student', label: 'طالب', icon: <School sx={{ fontSize: 40 }} />, desc: 'أريد التعلم والتطور' },
              { value: 'teacher', label: 'مدرس', icon: <PersonIcon sx={{ fontSize: 40 }} />, desc: 'أريد تدريس الطلاب' },
              { value: 'assistant_teacher', label: 'مدرس مساعد', icon: <SupervisorAccount sx={{ fontSize: 40 }} />, desc: 'مساعد لمدرس آخر' },
              { value: 'parent', label: 'ولي أمر', icon: <FamilyRestroom sx={{ fontSize: 40 }} />, desc: 'أريد متابعة أبنائي' },
            ].map((roleOption) => (
              <Card
                key={roleOption.value}
                onClick={() => handleRoleSelect(roleOption.value)}
                sx={{ cursor: isProcessing ? 'not-allowed' : 'pointer', border: '2px solid', borderColor: selectedRole === roleOption.value ? getRoleColor(roleOption.value) : 'transparent', opacity: isProcessing ? 0.6 : 1, transition: 'all 0.2s' }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3 }}>
                  <Box sx={{ color: getRoleColor(roleOption.value) }}>{roleOption.icon}</Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontFamily="Cairo, sans-serif" fontWeight={900}>{roleOption.label}</Typography>
                    <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">{roleOption.desc}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Button fullWidth variant="outlined" onClick={handleCancel} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mt: 2 }}>
            إلغاء
          </Button>
        </Box>
      </Container>
    );
  }

  if (step === 'division-selection') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              اختر قسمك الدراسي 📚
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">{clerkUser?.emailAddresses[0]?.emailAddress}</Typography>
          </Box>

          <FormControl fullWidth error={!!divisionError} sx={{ mb: 3 }}>
            <InputLabel sx={{ fontFamily: 'Cairo, sans-serif' }}>القسم الدراسي</InputLabel>
            <Select value={selectedDivision} onChange={(e) => { setSelectedDivision(e.target.value); setDivisionError(''); }} label="القسم الدراسي" sx={{ fontFamily: 'Cairo, sans-serif' }} disabled={isProcessing}>
              <MenuItem value="science-math">علمي رياضة 🔢</MenuItem>
              <MenuItem value="science-bio">علمي علوم 🧬</MenuItem>
              <MenuItem value="arts">أدبي 📖</MenuItem>
            </Select>
            {divisionError && <FormHelperText sx={{ fontFamily: 'Cairo, sans-serif' }}>{divisionError}</FormHelperText>}
          </FormControl>

          <Button fullWidth variant="contained" onClick={handleDivisionConfirm} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mb: 2, py: 1.5 }}>
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button fullWidth variant="outlined" onClick={handleBack} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>رجوع</Button>
        </Box>
      </Container>
    );
  }

  if (step === 'teacher-name-input') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              اسم المدرس الأساسي 👨‍🏫
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">{clerkUser?.emailAddresses[0]?.emailAddress}</Typography>
          </Box>

          <TextField fullWidth label="اسم المدرس" placeholder="أدخل اسم المدرس الذي تساعده" value={teacherName} onChange={(e) => { setTeacherName(e.target.value); setInputError(''); }} error={!!inputError} helperText={inputError || 'سيتم ربطك بالمدرس لاحقاً'} disabled={isProcessing} sx={{ mb: 3 }} />

          <Button fullWidth variant="contained" onClick={handleTeacherNameConfirm} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mb: 2, py: 1.5 }}>
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button fullWidth variant="outlined" onClick={handleBack} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>رجوع</Button>
        </Box>
      </Container>
    );
  }

  if (step === 'student-name-input') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              اسم الطالب 👨‍🎓
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">{clerkUser?.emailAddresses[0]?.emailAddress}</Typography>
          </Box>

          <TextField fullWidth label="اسم الطالب" placeholder="أدخل اسم الطالب الذي تتابعه" value={studentName} onChange={(e) => { setStudentName(e.target.value); setInputError(''); }} error={!!inputError} helperText={inputError || 'سيتم ربطك بالطالب لاحقاً'} disabled={isProcessing} sx={{ mb: 3 }} />

          <Button fullWidth variant="contained" onClick={handleStudentNameConfirm} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mb: 2, py: 1.5 }}>
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button fullWidth variant="outlined" onClick={handleBack} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>رجوع</Button>
        </Box>
      </Container>
    );
  }

  // default loading state
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6" fontFamily="Cairo, sans-serif">{step === 'loading' ? 'جاري التحميل...' : 'جاري المعالجة...'}</Typography>
      </Box>
    </Container>
  );
};

export default ClerkRegisterCallbackPage;
