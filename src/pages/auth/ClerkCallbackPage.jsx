// frontend/src/pages/auth/ClerkCallbackPage.jsx - ENHANCED WITH INPUT FIELDS
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

const ClerkCallbackPage = () => {
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

  // Clear backend token on mount
  useEffect(() => {
    console.log('🔄 Callback page mounted - clearing backend token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        console.log('🔄 Clerk callback started');
        
        if (!isLoaded) {
          console.log('⏳ Waiting for Clerk to load...');
          return;
        }

        if (!clerkUser) {
          console.error('❌ No Clerk user found');
          throw new Error('No Clerk user found. Please sign in again.');
        }

        console.log('✅ Clerk user found:', {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          createdAt: clerkUser.createdAt,
          metadata: clerkUser.publicMetadata,
        });

        // Check metadata for existing role and division
        const existingRole = clerkUser.publicMetadata?.role;
        const existingDivision = clerkUser.publicMetadata?.division;
        
        if (existingRole) {
          console.log('👤 Existing user with role:', existingRole);
          await handleLogin(clerkUser.id, existingRole, existingDivision);
        } else {
          // Check if new user
          const accountAge = Date.now() - clerkUser.createdAt;
          const isNewUser = accountAge < 120000; // 2 minutes

          if (isNewUser) {
            console.log('🆕 New user detected - showing role selection');
            setStep('role-selection');
          } else {
            console.log('👤 Existing user without metadata - checking backend...');
            
            try {
              await handleLogin(clerkUser.id, 'student');
            } catch (loginError) {
              console.log('⚠️ Backend user not found - showing role selection');
              setStep('role-selection');
            }
          }
        }
      } catch (error) {
        console.error('❌ Clerk callback error:', error);
        setError(error.message || 'فشل تسجيل الدخول');
        setStep('error');
      }
    };

    checkUserStatus();
  }, [clerkUser, isLoaded]);

  const handleLogin = async (clerkUserId, role = 'student', division = null) => {
    if (isProcessing) {
      console.log('⏳ Already processing...');
      return;
    }

    try {
      setIsProcessing(true);
      setStep('processing');
      console.log('📤 Sending user data to backend:', { clerkUserId, role, division });

      // Update Clerk metadata
      try {
        const metadata = { role };
        if (division) {
          metadata.division = division;
        }
        
        await clerkUser.update({
          publicMetadata: metadata
        });
        console.log('✅ Metadata saved to Clerk');
      } catch (metadataError) {
        console.log('⚠️ Could not save metadata:', metadataError);
      }

      // Login to backend
      await loginWithClerk(clerkUserId, role, division);

      console.log('✅ Backend authentication successful');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect based on role
      if (role === 'assistant_teacher') {
        navigate('/assistant-teacher/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      if (error.response?.status === 409 || error.message?.includes('already exists')) {
        console.log('ℹ️ User exists in backend, attempting login...');
        
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          await loginWithClerk(clerkUserId, role, division);
          navigate('/', { replace: true });
          return;
        } catch (retryError) {
          console.error('❌ Retry failed:', retryError);
        }
      }
      
      setError(error.response?.data?.message || error.message || 'فشل تسجيل الدخول');
      setStep('error');
      setIsProcessing(false);
    }
  };

  const handleRoleSelect = async (role) => {
    if (isProcessing) return;
    
    setSelectedRole(role);
    
    // Show different screens based on role
    if (role === 'student') {
      setStep('division-selection');
    } else if (role === 'assistant_teacher') {
      setStep('teacher-name-input');
    } else if (role === 'parent') {
      setStep('student-name-input');
    } else {
      // For regular teacher, proceed directly
      await handleLogin(clerkUser.id, role);
    }
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
    // TODO: In future, validate teacher exists and link them
    await handleLogin(clerkUser.id, selectedRole);
  };

  const handleStudentNameConfirm = async () => {
    if (!studentName.trim()) {
      setInputError('يرجى إدخال اسم الطالب');
      return;
    }
    
    setInputError('');
    // TODO: In future, validate student exists and link them
    await handleLogin(clerkUser.id, selectedRole);
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'student': return '#2563eb';
      case 'teacher': return '#7c3aed';
      case 'assistant_teacher': return '#059669';
      case 'parent': return '#db2777';
      default: return '#6b7280';
    }
  };

  const handleCancel = async () => {
    try {
      console.log('🚫 User cancelled registration');
      
      await signOut();
      
      localStorage.clear();
      sessionStorage.clear();
      
      if (window.indexedDB) {
        const databases = await window.indexedDB.databases();
        for (const db of databases) {
          await window.indexedDB.deleteDatabase(db.name);
        }
      }
      
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Cancel error:', error);
      window.location.href = '/login';
    }
  };

  const handleBack = () => {
    setInputError('');
    setDivisionError('');
    setStep('role-selection');
  };

  // Error State
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
            onClick={async () => {
              await signOut();
              localStorage.clear();
              sessionStorage.clear();
              navigate('/register', { replace: true });
            }}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
            }}
          >
            المحاولة مرة أخرى
          </Button>
        </Box>
      </Container>
    );
  }

  // ✅ DIVISION SELECTION STATE
  if (step === 'division-selection') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              اختر قسمك الدراسي 📚
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
              {clerkUser?.emailAddresses[0]?.emailAddress}
            </Typography>
          </Box>

          <FormControl fullWidth error={!!divisionError} sx={{ mb: 3 }}>
            <InputLabel sx={{ fontFamily: 'Cairo, sans-serif' }}>
              القسم الدراسي
            </InputLabel>
            <Select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setDivisionError('');
              }}
              label="القسم الدراسي"
              sx={{ fontFamily: 'Cairo, sans-serif' }}
              disabled={isProcessing}
            >
              <MenuItem value="science-math" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                علمي رياضة 🔢
              </MenuItem>
              <MenuItem value="science-bio" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                علمي علوم 🧬
              </MenuItem>
              <MenuItem value="arts" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                أدبي 📖
              </MenuItem>
            </Select>
            {divisionError && (
              <FormHelperText sx={{ fontFamily: 'Cairo, sans-serif' }}>
                {divisionError}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={handleDivisionConfirm}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              mb: 2,
              py: 1.5,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
              },
            }}
          >
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleBack}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
            }}
          >
            رجوع
          </Button>
        </Box>
      </Container>
    );
  }

  // ✅ TEACHER NAME INPUT STATE
  if (step === 'teacher-name-input') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              اسم المدرس الأساسي 👨‍🏫
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
              {clerkUser?.emailAddresses[0]?.emailAddress}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="اسم المدرس"
            placeholder="أدخل اسم المدرس الذي تساعده"
            value={teacherName}
            onChange={(e) => {
              setTeacherName(e.target.value);
              setInputError('');
            }}
            error={!!inputError}
            helperText={inputError || 'سيتم ربطك بالمدرس لاحقاً'}
            disabled={isProcessing}
            sx={{ 
              mb: 3,
              '& .MuiInputBase-input': {
                fontFamily: 'Cairo, sans-serif',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Cairo, sans-serif',
              },
              '& .MuiFormHelperText-root': {
                fontFamily: 'Cairo, sans-serif',
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleTeacherNameConfirm}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              mb: 2,
              py: 1.5,
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
              },
            }}
          >
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleBack}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
            }}
          >
            رجوع
          </Button>
        </Box>
      </Container>
    );
  }

  // ✅ STUDENT NAME INPUT STATE
  if (step === 'student-name-input') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{
                background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              اسم الطالب 👨‍🎓
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
              {clerkUser?.emailAddresses[0]?.emailAddress}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="اسم الطالب"
            placeholder="أدخل اسم الطالب الذي تتابعه"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
              setInputError('');
            }}
            error={!!inputError}
            helperText={inputError || 'سيتم ربطك بالطالب لاحقاً'}
            disabled={isProcessing}
            sx={{ 
              mb: 3,
              '& .MuiInputBase-input': {
                fontFamily: 'Cairo, sans-serif',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Cairo, sans-serif',
              },
              '& .MuiFormHelperText-root': {
                fontFamily: 'Cairo, sans-serif',
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleStudentNameConfirm}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              mb: 2,
              py: 1.5,
              background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #be185d 0%, #db2777 100%)',
              },
            }}
          >
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleBack}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
            }}
          >
            رجوع
          </Button>
        </Box>
      </Container>
    );
  }

  // Role Selection State
  if (step === 'role-selection') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
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
                sx={{
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  border: '2px solid',
                  borderColor: selectedRole === roleOption.value 
                    ? getRoleColor(roleOption.value)
                    : 'transparent',
                  opacity: isProcessing ? 0.6 : 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: getRoleColor(roleOption.value),
                    transform: isProcessing ? 'none' : 'scale(1.02)',
                    boxShadow: `0 4px 20px ${getRoleColor(roleOption.value)}40`,
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3 }}>
                  <Box sx={{ color: getRoleColor(roleOption.value) }}>
                    {roleOption.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      fontFamily="Cairo, sans-serif"
                      fontWeight={900}
                    >
                      {roleOption.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      fontFamily="Cairo, sans-serif"
                    >
                      {roleOption.desc}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleCancel}
            disabled={isProcessing}
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              mt: 2,
            }}
          >
            إلغاء
          </Button>
        </Box>
      </Container>
    );
  }

  // Loading/Processing State
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6" fontFamily="Cairo, sans-serif">
          {step === 'loading' ? 'جاري التحميل...' : 'جاري تسجيل الدخول...'}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
          يرجى الانتظار لحظة
        </Typography>
      </Box>
    </Container>
  );
};

export default ClerkCallbackPage;