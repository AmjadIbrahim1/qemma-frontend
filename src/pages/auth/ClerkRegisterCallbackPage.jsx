// frontend/src/pages/auth/ClerkRegisterCallbackPage.jsx
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
  Alert,
  AlertTitle,
  Chip,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  School,
  Person as PersonIcon,
  FamilyRestroom,
  SupervisorAccount,
  WarningAmber,
  Visibility,
  VisibilityOff,
  ContentCopy,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { generateUsername, getUsernameWarningMessage } from '../../utils/usernameGenerator';

const ClerkRegisterCallbackPage = () => {
  const navigate = useNavigate();
  const { loginWithClerk } = useAuth();
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [step, setStep] = useState('loading');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [showUsername, setShowUsername] = useState(true);
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [divisionError, setDivisionError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [teacherNameError, setTeacherNameError] = useState('');
  const [inputError, setInputError] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [existingAccountDetected, setExistingAccountDetected] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  // Available subjects for teachers - in exact order as specified
  const availableSubjects = [
    "اللغة العربية",
    "اللغة الإنجليزية",
    "الفيزياء",
    "الكيمياء",
    "الأحياء",
    "الفيزياء",
    "الرياضيات",
    "الجغرافيا",
    "التاريخ",
    "الإحصاء",
  ];

  useEffect(() => {
    console.log('🔵 ClerkRegisterCallbackPage mounted');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        console.log('🔍 Checking user status...');
        console.log('isLoaded:', isLoaded);
        console.log('clerkUser:', clerkUser);
        
        if (!isLoaded) {
          console.log('⏳ Clerk not loaded yet...');
          setDebugInfo('جاري تحميل بيانات Clerk...');
          return;
        }
        
        if (!clerkUser) {
          console.error('❌ No Clerk user found');
          setDebugInfo('لم يتم العثور على مستخدم Clerk');
          throw new Error('No Clerk user found');
        }

        console.log('👤 Clerk user found:', {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          createdAt: clerkUser.createdAt,
          metadata: clerkUser.publicMetadata,
        });

        const existingRole = clerkUser.publicMetadata?.role;
        const existingDivision = clerkUser.publicMetadata?.division;
        const existingSubject = clerkUser.publicMetadata?.subject;
        const existingUsername = clerkUser.publicMetadata?.username;
        const existingTeacherName = clerkUser.publicMetadata?.teacherName;

        console.log('🔍 Existing metadata:', { existingRole, existingDivision, existingSubject, existingUsername, existingTeacherName });

        if (existingRole) {
          console.log('⚠️ EXISTING ACCOUNT DETECTED with role:', existingRole);
          setDebugInfo(`حساب موجود بدور: ${existingRole}`);
          setExistingAccountDetected(true);
          
          toast.error('⚠️ هذا الحساب مسجل بالفعل!', {
            duration: 4000,
          });
          
          console.log('🔄 Will redirect to landing page in 3 seconds...');
          
          setTimeout(async () => {
            console.log('🔄 Redirecting to landing page...');
            await handleLogin(clerkUser.id, existingRole, existingDivision, existingSubject, existingUsername, existingTeacherName);
          }, 3000);
          
          return;
        }

        const accountAge = Date.now() - clerkUser.createdAt;
        const isNewUser = accountAge < 120000;

        console.log('📅 Account age:', accountAge, 'ms');
        console.log('🆕 Is new user:', isNewUser);
        setDebugInfo(`حساب جديد - العمر: ${Math.floor(accountAge / 1000)} ثانية`);

        if (isNewUser) {
          console.log('✅ Showing role selection for new user');
          setStep('role-selection');
        } else {
          console.log('⚠️ Old account without role - trying default login');
          setDebugInfo('حساب قديم بدون دور - محاولة تسجيل دخول افتراضي');
          try {
            await handleLogin(clerkUser.id, 'student');
          } catch (loginError) {
            console.log('❌ Default login failed, showing role selection');
            setStep('role-selection');
          }
        }
      } catch (err) {
        console.error('❌ Clerk callback (register) error:', err);
        setDebugInfo(`خطأ: ${err.message}`);
        setError(err.message || 'فشل تسجيل الدخول');
        setStep('error');
      }
    };

    checkUserStatus();
  }, [clerkUser, isLoaded]);

  const handleLogin = async (clerkUserId, role = 'student', division = null, subject = null, username = null, teacherName = null) => {
    if (isProcessing) {
      console.log('⏸️ Already processing, ignoring...');
      return;
    }
    
    try {
      console.log('🔐 Starting login process...', { clerkUserId, role, division, subject, username, teacherName });
      setIsProcessing(true);
      setStep('processing');
      setDebugInfo(`جاري تسجيل الدخول كـ ${role}...`);

      try {
        const metadata = { role };
        if (division) metadata.division = division;
        if (subject) metadata.subject = subject;
        if (username) metadata.username = username;
        if (teacherName) metadata.teacherName = teacherName;
        
        console.log('💾 Saving metadata to Clerk:', metadata);
        await clerkUser.update({ publicMetadata: metadata });
        console.log('✅ Metadata saved successfully');
      } catch (metaErr) {
        console.warn('⚠️ Could not save metadata to Clerk:', metaErr);
      }

      console.log('📡 Calling backend loginWithClerk...');
      await loginWithClerk(clerkUserId, role, division, subject, username, teacherName);
      console.log('✅ Backend login successful');

      console.log('✅ Registration successful, navigating to landing page');
      toast.success('تم إنشاء الحساب بنجاح! 🎉');
      navigate('/', { replace: true });
      
    } catch (err) {
      console.error('❌ Login error (register flow):', err);
      setDebugInfo(`خطأ في تسجيل الدخول: ${err.message}`);
      
      const isAlreadyExists = 
        err.response?.status === 409 || 
        err.message?.includes('already exists') || 
        err.message?.includes('موجود') ||
        err.message?.includes('duplicate');
        
      if (isAlreadyExists) {
        console.log('⚠️ User already exists - showing notification');
        
        toast.error('⚠️ الحساب مسجل بالفعل! جاري التحويل...', {
          duration: 4000,
        });
        
        try {
          console.log('🔄 Attempting retry login...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          await loginWithClerk(clerkUserId, role, division, subject, username, teacherName);
          
          console.log('✅ Retry successful, redirecting to landing page...');
          navigate('/', { replace: true });
          return;
        } catch (retryErr) {
          console.error('❌ Retry failed:', retryErr);
          toast.error('يرجى تسجيل الدخول', { duration: 3000 });
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 2000);
          return;
        }
      }

      setError(err.response?.data?.message || err.message || 'فشل تسجيل الدخول');
      setStep('error');
      setIsProcessing(false);
    }
  };

  const handleRoleSelect = (role) => {
    if (isProcessing) return;
    console.log('👉 Role selected:', role);
    setSelectedRole(role);
    setDebugInfo(`تم اختيار الدور: ${role}`);
    
    // Generate username only for students and teachers
    if (role === 'student' || role === 'teacher') {
      const username = generateUsername(role);
      setGeneratedUsername(username);
      console.log('🎯 Generated username:', username);
    } else {
      setGeneratedUsername('');
    }
    
    if (role === 'student') {
      setStep('division-selection');
    } else if (role === 'teacher' || role === 'assistant_teacher') {
      setStep('subject-selection');
    } else if (role === 'parent') {
      setStep('student-name-input');
    } else {
      handleLogin(clerkUser.id, role);
    }
  };

  const handleDivisionConfirm = async () => {
    if (!selectedDivision) {
      setDivisionError('يرجى اختيار القسم الدراسي');
      return;
    }
    console.log('✅ Division confirmed:', selectedDivision);
    console.log('✅ Username:', generatedUsername);
    setDivisionError('');
    await handleLogin(clerkUser.id, selectedRole, selectedDivision, null, generatedUsername);
  };

  const handleSubjectConfirm = async () => {
    if (!selectedSubject) {
      setSubjectError('يجب اختيار المادة الدراسية');
      return;
    }
    
    // For assistant_teacher, validate teacherName
    if (selectedRole === 'assistant_teacher') {
      if (!teacherName.trim()) {
        setTeacherNameError('يجب إدخال اسم المدرس');
        return;
      }
      console.log('✅ Subject confirmed:', selectedSubject);
      console.log('✅ Teacher name:', teacherName);
      setSubjectError('');
      setTeacherNameError('');
      await handleLogin(clerkUser.id, selectedRole, null, selectedSubject, null, teacherName);
    } else {
      // For regular teachers
      console.log('✅ Subject confirmed:', selectedSubject);
      console.log('✅ Username:', generatedUsername);
      setSubjectError('');
      await handleLogin(clerkUser.id, selectedRole, null, selectedSubject, generatedUsername);
    }
  };

  const handleStudentNameConfirm = async () => {
    if (!studentName.trim()) {
      setInputError('يرجى إدخال اسم الطالب');
      return;
    }
    console.log('✅ Student name confirmed:', studentName);
    setInputError('');
    await handleLogin(clerkUser.id, selectedRole);
  };

  const handleCopyUsername = () => {
    if (generatedUsername) {
      navigator.clipboard.writeText(generatedUsername);
      toast.success('تم نسخ اسم المستخدم!');
    }
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
      console.log('❌ User cancelled, signing out...');
      await signOut();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('❌ Cancel error:', err);
      window.location.href = '/login';
    }
  };

  const handleBack = () => {
    console.log('⬅️ Going back to role selection');
    setInputError('');
    setDivisionError('');
    setSubjectError('');
    setTeacherNameError('');
    setTeacherName('');
    setStep('role-selection');
  };

  if (existingAccountDetected) {
    console.log('📺 Rendering existing account screen');
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Alert 
            severity="warning" 
            icon={<WarningAmber sx={{ fontSize: 40 }} />}
            sx={{ 
              mb: 3,
              fontFamily: 'Cairo, sans-serif',
              '& .MuiAlert-message': {
                width: '100%',
              }
            }}
          >
            <AlertTitle sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: '1.5rem', mb: 2 }}>
              ⚠️ الحساب مسجل بالفعل
            </AlertTitle>
            <Typography sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
              هذا الحساب ({clerkUser?.emailAddresses[0]?.emailAddress}) مسجل بالفعل في المنصة.
            </Typography>
            <Typography sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, color: 'text.secondary' }}>
              سيتم تحويلك للصفحة الرئيسية تلقائياً بعد 3 ثواني...
            </Typography>
          </Alert>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <CircularProgress size={50} sx={{ mb: 2 }} />
            <Typography variant="h6" fontFamily="Cairo, sans-serif" fontWeight={700}>
              جاري التحويل...
            </Typography>
            {debugInfo && (
              <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif" sx={{ mt: 1 }}>
                {debugInfo}
              </Typography>
            )}
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              console.log('🔄 Manual redirect to landing page');
              navigate('/', { replace: true });
            }}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mb: 1 }}
          >
            الانتقال للصفحة الرئيسية الآن
          </Button>
          
          <Button
            fullWidth
            variant="text"
            onClick={handleCancel}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}
          >
            إلغاء
          </Button>
        </Box>
      </Container>
    );
  }

  if (step === 'error') {
    console.log('📺 Rendering error screen');
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography variant="h6" color="error" fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
            ❌ {error}
          </Typography>
          {debugInfo && (
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
              Debug: {debugInfo}
            </Typography>
          )}
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

  if (step === 'role-selection') {
    console.log('📺 Rendering role selection screen');
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
            {debugInfo && (
              <Typography variant="caption" color="text.secondary" fontFamily="Cairo, sans-serif" sx={{ display: 'block', mt: 1 }}>
                Debug: {debugInfo}
              </Typography>
            )}
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
                  borderColor: selectedRole === roleOption.value ? getRoleColor(roleOption.value) : 'transparent', 
                  opacity: isProcessing ? 0.6 : 1, 
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: getRoleColor(roleOption.value),
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  }
                }}
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
    console.log('📺 Rendering division selection screen');
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              اختر قسمك الدراسي 📚
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">{clerkUser?.emailAddresses[0]?.emailAddress}</Typography>
          </Box>

          {/* Username Display - Only for students */}
          {generatedUsername && (
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                fontFamily: "Cairo, sans-serif",
                bgcolor: "rgba(255, 152, 0, 0.1)",
                border: "1px solid rgba(255, 152, 0, 0.3)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                {getUsernameWarningMessage('')}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={showUsername ? generatedUsername : '••••••••••'}
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 700,
                    bgcolor: "rgba(255, 152, 0, 0.2)",
                    color: "#e65100",
                    flex: 1,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setShowUsername(!showUsername)}
                  sx={{
                    color: "#e65100",
                    "&:hover": {
                      bgcolor: "rgba(255, 152, 0, 0.1)",
                    },
                  }}
                >
                  {showUsername ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleCopyUsername}
                  sx={{
                    color: "#e65100",
                    "&:hover": {
                      bgcolor: "rgba(255, 152, 0, 0.1)",
                    },
                  }}
                >
                  <ContentCopy />
                </IconButton>
              </Box>
            </Alert>
          )}

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

  if (step === 'subject-selection') {
    console.log('📺 Rendering subject selection screen');
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              اختر المادة الدراسية 📚
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>
              {clerkUser?.emailAddresses[0]?.emailAddress}
            </Typography>
            <Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: selectedRole === 'assistant_teacher' ? '#059669' : '#7c3aed' }}>
              {selectedRole === 'assistant_teacher' ? 'أدخل بيانات المدرس الذي تساعده' : 'اختر المادة التي ستقوم بتدريسها'}
            </Typography>
          </Box>

          {/* Username Display - Only for regular teachers */}
          {selectedRole === 'teacher' && generatedUsername && (
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                fontFamily: "Cairo, sans-serif",
                bgcolor: "rgba(255, 152, 0, 0.1)",
                border: "1px solid rgba(255, 152, 0, 0.3)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                {getUsernameWarningMessage('')}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={showUsername ? generatedUsername : '••••••••••'}
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 700,
                    bgcolor: "rgba(255, 152, 0, 0.2)",
                    color: "#e65100",
                    flex: 1,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setShowUsername(!showUsername)}
                  sx={{
                    color: "#e65100",
                    "&:hover": {
                      bgcolor: "rgba(255, 152, 0, 0.1)",
                    },
                  }}
                >
                  {showUsername ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleCopyUsername}
                  sx={{
                    color: "#e65100",
                    "&:hover": {
                      bgcolor: "rgba(255, 152, 0, 0.1)",
                    },
                  }}
                >
                  <ContentCopy />
                </IconButton>
              </Box>
            </Alert>
          )}

          <FormControl fullWidth error={!!subjectError} sx={{ mb: 3 }}>
            <InputLabel sx={{ fontFamily: 'Cairo, sans-serif' }}>المادة الدراسية *</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => { setSelectedSubject(e.target.value); setSubjectError(''); }}
              label="المادة الدراسية *"
              disabled={isProcessing}
              sx={{ 
                fontFamily: 'Cairo, sans-serif',
                '& .MuiSelect-select': {
                  fontFamily: 'Cairo, sans-serif',
                }
              }}
            >
              {availableSubjects.map((subject, index) => (
                <MenuItem 
                  key={`${subject}-${index}`} 
                  value={subject}
                  sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}
                >
                  {subject}
                </MenuItem>
              ))}
            </Select>
            {subjectError && <FormHelperText sx={{ fontFamily: 'Cairo, sans-serif' }}>{subjectError}</FormHelperText>}
          </FormControl>

          {/* Teacher Name Input - Only for assistant_teacher */}
          {selectedRole === 'assistant_teacher' && (
            <TextField
              fullWidth
              label="اسم المدرس *"
              value={teacherName}
              onChange={(e) => { setTeacherName(e.target.value); setTeacherNameError(''); }}
              error={!!teacherNameError}
              helperText={teacherNameError || "أدخل اسم المدرس الذي تساعده"}
              placeholder="مثال: أ/ محمد أحمد"
              disabled={isProcessing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
          )}

          <Button fullWidth variant="contained" onClick={handleSubjectConfirm} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, mb: 2, py: 1.5 }}>
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'تأكيد'}
          </Button>

          <Button fullWidth variant="outlined" onClick={handleBack} disabled={isProcessing} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>رجوع</Button>
        </Box>
      </Container>
    );
  }

  if (step === 'student-name-input') {
    console.log('📺 Rendering student name input screen');
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

  console.log('📺 Rendering loading screen, step:', step);
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6" fontFamily="Cairo, sans-serif" sx={{ mb: 2 }}>
          {step === 'loading' ? 'جاري التحميل...' : 'جاري المعالجة...'}
        </Typography>
        {debugInfo && (
          <Typography variant="body2" color="text.secondary" fontFamily="Cairo, sans-serif">
            Debug: {debugInfo}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ClerkRegisterCallbackPage;