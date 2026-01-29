// frontend/src/pages/auth/RegisterPage.jsx - UPDATED: Automatic username generation for students and teachers
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SignUp, useClerk } from "@clerk/clerk-react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  ArrowBack,
  School,
  Person as PersonIcon,
  FamilyRestroom,
  SupervisorAccount,
  ContentCopy,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { generateUsername, getUsernameWarningMessage, shouldGenerateUsername } from "../../utils/usernameGenerator";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { signOut } = useClerk();

  const [step, setStep] = useState("choice");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    role: "student",
    division: "",
    subject: "",
    username: "", // Auto-generated username
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showClerkModal, setShowClerkModal] = useState(false);
  const [showUsername, setShowUsername] = useState(true); // Show username by default in registration

  // Available subjects for teachers - in exact order as specified
  const availableSubjects = [
    "اللغة العربية",
    "اللغة الإنجليزية",
    "الفيزياء",
    "الكيمياء",
    "الأحياء",
    "الفيزياء", // Repeated as per requirement
    "الرياضيات",
    "الجغرافيا",
    "التاريخ",
    "الإحصاء",
  ];

  useEffect(() => {
    const clearClerkSession = async () => {
      try {
        console.log('🧹 Clearing any existing Clerk session...');
        await signOut();
        
        if (window.indexedDB) {
          const databases = await window.indexedDB.databases();
          databases.forEach(db => {
            if (db.name.includes('clerk')) {
              window.indexedDB.deleteDatabase(db.name);
            }
          });
        }
        
        console.log('✅ Clerk session cleared');
      } catch (error) {
        console.log('ℹ️ No active Clerk session to clear');
      }
    };

    clearClerkSession();
  }, [signOut]);

  // Generate username when role changes
  useEffect(() => {
    if (shouldGenerateUsername(formData.role)) {
      const newUsername = generateUsername(formData.role);
      setFormData((prev) => ({ ...prev, username: newUsername }));
      console.log('🎯 Generated username:', newUsername);
    } else {
      setFormData((prev) => ({ ...prev, username: "" }));
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCopyUsername = () => {
    if (formData.username) {
      navigator.clipboard.writeText(formData.username);
      toast.success('تم نسخ اسم المستخدم!');
    }
  };

  const validateEmail = (email) => {
    if (!email.endsWith('@qemma.com')) {
      return "البريد الإلكتروني يجب أن ينتهي بـ @qemma.com";
    }

    const localPart = email.split('@')[0];

    if (localPart.length < 5) {
      return "يجب أن يكون البريد الإلكتروني 5 أحرف على الأقل قبل @";
    }

    if (!/\d/.test(localPart)) {
      return "البريد الإلكتروني يجب أن يحتوي على رقم واحد على الأقل";
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    if (step === "local") {
      if (!formData.password) {
        newErrors.password = "كلمة المرور مطلوبة";
      } else if (formData.password.length < 8) {
        newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
      }
    }

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "الاسم يجب أن يكون حرفين على الأقل";
    }

    if (formData.phone && !/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صالح (مثال: 01012345678)";
    }

    if (!formData.role) {
      newErrors.role = "يرجى اختيار نوع الحساب";
    }

    // Only validate division for students
    if (formData.role === 'student' && !formData.division) {
      newErrors.division = "يرجى اختيار القسم الدراسي";
    }

    // Validate subject for teachers - SINGLE SUBJECT REQUIRED
    if ((formData.role === 'teacher' || formData.role === 'assistant_teacher') && !formData.subject) {
      newErrors.subject = "يجب اختيار المادة الدراسية";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      
      // Only include division if role is student
      if (registerData.role !== 'student') {
        delete registerData.division;
      }

      // Only include subject if role is teacher or assistant_teacher
      if (registerData.role !== 'teacher' && registerData.role !== 'assistant_teacher') {
        delete registerData.subject;
      }

      // Only include username if role should have one
      if (!shouldGenerateUsername(registerData.role)) {
        delete registerData.username;
      }
      
      console.log('📝 Registering with data:', registerData);
      
      await register(registerData);

      // Navigate based on role
      let dashboardRoute;
      if (formData.role === "student") {
        dashboardRoute = "/student/dashboard";
      } else if (formData.role === "teacher") {
        dashboardRoute = "/teacher/dashboard";
      } else if (formData.role === "assistant_teacher") {
        dashboardRoute = "/assistant-teacher/dashboard";
      } else if (formData.role === "parent") {
        dashboardRoute = "/parent/dashboard";
      } else {
        dashboardRoute = "/student/dashboard";
      }

      console.log('✅ Registration successful, navigating to:', dashboardRoute);
      navigate(dashboardRoute);
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenClerkModal = async () => {
    try {
      console.log('🧹 Preparing Clerk registration...');
      
      await signOut();
      
      if (window.indexedDB) {
        const databases = await window.indexedDB.databases();
        for (const db of databases) {
          if (db.name.includes('clerk')) {
            await window.indexedDB.deleteDatabase(db.name);
          }
        }
      }
      
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('✅ Ready for new registration');
      setShowClerkModal(true);
    } catch (error) {
      console.log('ℹ️ Session cleanup:', error.message);
      setShowClerkModal(true);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <School />;
      case "teacher":
        return <PersonIcon />;
      case "assistant_teacher":
        return <SupervisorAccount />;
      case "parent":
        return <FamilyRestroom />;
      default:
        return <Person />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "student":
        return "#2563eb";
      case "teacher":
        return "#7c3aed";
      case "assistant_teacher":
        return "#059669";
      case "parent":
        return "#db2777";
      default:
        return "#6b7280";
    }
  };

  // Check if selected role is teacher or assistant_teacher
  const isTeacherRole = formData.role === 'teacher' || formData.role === 'assistant_teacher';
  const shouldShowUsername = shouldGenerateUsername(formData.role);

  // Choice Screen
  if (step === "choice") {
    return (
      <Container
        maxWidth="sm"
        sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        <Box sx={{ width: "100%", py: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{
              mb: 3,
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
            }}
          >
            العودة للرئيسية
          </Button>

          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{
                background:
                  "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              قِمّة
            </Typography>
            <Typography
              variant="h5"
              fontWeight={700}
              fontFamily="Cairo, sans-serif"
              sx={{ mt: 1 }}
            >
              إنشاء حساب جديد
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily="Cairo, sans-serif"
            >
              اختر طريقة التسجيل المناسبة لك
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleOpenClerkModal}
            sx={{
              mb: 2,
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              borderRadius: 2,
              py: 1.5,
              borderColor: "#E5E7EB",
              color: "text.primary",
              "&:hover": {
                borderColor: "#D1D5DB",
                bgcolor: "rgba(0,0,0,0.02)",
              },
            }}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            }
          >
            التسجيل بواسطة Google
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily="Cairo, sans-serif"
            >
              أو
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => setStep("local")}
            disableElevation
            sx={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 900,
              borderRadius: 2,
              py: 1.5,
              background:
                "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)",
              },
            }}
          >
            التسجيل بالبريد الإلكتروني
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" fontFamily="Cairo, sans-serif">
              لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                style={{
                  color: "#2563eb",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                سجل الدخول
              </Link>
            </Typography>
          </Box>

          {showClerkModal && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
              onClick={() => setShowClerkModal(false)}
            >
              <Box onClick={(e) => e.stopPropagation()}>
                <SignUp
                  routing="virtual"
                  afterSignUpUrl="/auth/clerk-register-callback"
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-xl",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    );
  }

  // Local Registration Form
  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box sx={{ width: "100%", py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => setStep("choice")}
          sx={{
            mb: 3,
            fontFamily: "Cairo, sans-serif",
            fontWeight: 700,
          }}
        >
          العودة
        </Button>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            fontFamily="Cairo, sans-serif"
            sx={{
              background:
                "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            قِمّة
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            fontFamily="Cairo, sans-serif"
            sx={{ mt: 1 }}
          >
            إنشاء حساب جديد
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            fontFamily="Cairo, sans-serif"
          >
            أكمل البيانات التالية للتسجيل
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              fontFamily="Cairo, sans-serif"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              نوع الحساب
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5,
              }}
            >
              {[
                { value: "student", label: "طالب", icon: <School /> },
                { value: "teacher", label: "مدرس", icon: <PersonIcon /> },
                { value: "assistant_teacher", label: "مدرس مساعد", icon: <SupervisorAccount /> },
                { value: "parent", label: "ولي أمر", icon: <FamilyRestroom /> },
              ].map((roleOption) => (
                <Card
                  key={roleOption.value}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: roleOption.value }))
                  }
                  sx={{
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor:
                      formData.role === roleOption.value
                        ? getRoleColor(roleOption.value)
                        : "transparent",
                    bgcolor:
                      formData.role === roleOption.value
                        ? `${getRoleColor(roleOption.value)}10`
                        : "background.paper",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: getRoleColor(roleOption.value),
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 2, px: 1 }}>
                    <Box
                      sx={{ color: getRoleColor(roleOption.value), mb: 0.5 }}
                    >
                      {roleOption.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={700}
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {roleOption.label}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            {errors.role && (
              <Typography
                variant="caption"
                color="error"
                fontFamily="Cairo, sans-serif"
              >
                {errors.role}
              </Typography>
            )}
          </Box>

          {/* Username Display - Auto-generated for students and teachers */}
          {shouldShowUsername && formData.username && (
            <Alert
              severity="warning"
              sx={{
                mb: 2,
                fontFamily: "Cairo, sans-serif",
                bgcolor: "rgba(255, 152, 0, 0.1)",
                border: "1px solid rgba(255, 152, 0, 0.3)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={700}
                  sx={{ flex: 1 }}
                >
                  {getUsernameWarningMessage('')}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Chip
                  label={showUsername ? formData.username : '••••••••••'}
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

          {/* Division selection - Only for students */}
          {formData.role === 'student' && (
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.division}>
              <InputLabel sx={{ fontFamily: 'Cairo, sans-serif' }}>
                القسم الدراسي *
              </InputLabel>
              <Select
                name="division"
                value={formData.division}
                onChange={handleChange}
                label="القسم الدراسي *"
                sx={{ fontFamily: 'Cairo, sans-serif' }}
              >
                <MenuItem value="science-math" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                  علمي رياضة
                </MenuItem>
                <MenuItem value="science-bio" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                  علمي علوم
                </MenuItem>
                <MenuItem value="arts" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                  أدبي
                </MenuItem>
              </Select>
              {errors.division && (
                <FormHelperText sx={{ fontFamily: 'Cairo, sans-serif' }}>
                  {errors.division}
                </FormHelperText>
              )}
            </FormControl>
          )}

          {/* SINGLE Subject selection - Only for teachers and assistant teachers */}
          {isTeacherRole && (
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.subject}>
              <InputLabel sx={{ fontFamily: 'Cairo, sans-serif' }}>
                المادة الدراسية *
              </InputLabel>
              <Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                label="المادة الدراسية *"
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
              {errors.subject ? (
                <FormHelperText sx={{ fontFamily: 'Cairo, sans-serif' }}>
                  {errors.subject}
                </FormHelperText>
              ) : (
                <FormHelperText sx={{ fontFamily: 'Cairo, sans-serif' }}>
                  اختر المادة التي ستقوم بتدريسها
                </FormHelperText>
              )}
            </FormControl>
          )}

          <TextField
            fullWidth
            name="name"
            label="الاسم الكامل"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="email"
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email || "مثال: ahmed123@qemma.com (5 أحرف على الأقل + رقم)"}
            placeholder="username@qemma.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="phone"
            label="رقم الهاتف (اختياري)"
            placeholder="01012345678"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="password"
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            disableElevation
            sx={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 900,
              borderRadius: 2,
              py: 1.5,
              background:
                "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "إنشاء حساب"
            )}
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" fontFamily="Cairo, sans-serif">
            لديك حساب بالفعل؟{" "}
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              سجل الدخول
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;