// frontend/src/pages/auth/ClerkCallbackPage.jsx - ENHANCED FIX
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
} from '@mui/material';
import { School, Person as PersonIcon, FamilyRestroom } from '@mui/icons-material';

const ClerkCallbackPage = () => {
  const navigate = useNavigate();
  const { loginWithClerk } = useAuth();
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  
  const [step, setStep] = useState('loading');
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Clear backend token on mount to ensure fresh start
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

        // ✅ Check metadata for existing role
        const existingRole = clerkUser.publicMetadata?.role;
        
        if (existingRole) {
          console.log('👤 Existing user with role:', existingRole);
          await handleLogin(clerkUser.id, existingRole);
        } else {
          // ✅ Check if this is truly a new account (less than 2 minutes old)
          const accountAge = Date.now() - clerkUser.createdAt;
          const isNewUser = accountAge < 120000; // 2 minutes

          if (isNewUser) {
            console.log('🆕 New user detected (account age:', accountAge, 'ms) - showing role selection');
            setStep('role-selection');
          } else {
            // Older account without metadata - try to get from backend or default to student
            console.log('👤 Existing user without metadata - checking backend...');
            
            try {
              // ✅ Try to login with student role first to check if user exists
              await handleLogin(clerkUser.id, 'student');
            } catch (loginError) {
              // If backend login fails, show role selection
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

  const handleLogin = async (clerkUserId, role = 'student') => {
    if (isProcessing) {
      console.log('⏳ Already processing...');
      return;
    }

    try {
      setIsProcessing(true);
      setStep('processing');
      console.log('📤 Sending user data to backend:', { clerkUserId, role });

      // ✅ Update Clerk metadata with role
      try {
        await clerkUser.update({
          publicMetadata: { role }
        });
        console.log('✅ Role saved to Clerk metadata');
      } catch (metadataError) {
        console.log('⚠️ Could not save role to metadata:', metadataError);
      }

      // Login to backend
      await loginWithClerk(clerkUserId, role);

      console.log('✅ Backend authentication successful');
      
      // Small delay before redirect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to landing page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // ✅ If error is "User already exists", try to login anyway
      if (error.response?.status === 409 || error.message?.includes('already exists')) {
        console.log('ℹ️ User exists in backend, attempting login...');
        
        try {
          // Clear any stale tokens
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Try login again
          await loginWithClerk(clerkUserId, role);
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
    await handleLogin(clerkUser.id, role);
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'student': return '#2563eb';
      case 'teacher': return '#7c3aed';
      case 'parent': return '#db2777';
      default: return '#6b7280';
    }
  };

  const handleCancel = async () => {
    try {
      console.log('🚫 User cancelled registration');
      
      // ✅ Sign out and clear everything
      await signOut();
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear IndexedDB
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