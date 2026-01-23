// frontend/src/pages/auth/RegisterPage.jsx - COMPLETE FIX
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
} from "@mui/icons-material";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { signOut } = useClerk(); // ✅ ADD THIS

  const [step, setStep] = useState("choice");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showClerkModal, setShowClerkModal] = useState(false);

  // ✅ NEW: Clear Clerk session on mount
  useEffect(() => {
    const clearClerkSession = async () => {
      try {
        console.log('🧹 Clearing any existing Clerk session...');
        await signOut();
        
        // Clear IndexedDB
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);

      const dashboardRoute =
        formData.role === "student"
          ? "/student/dashboard"
          : formData.role === "teacher"
            ? "/teacher/dashboard"
            : formData.role === "parent"
              ? "/parent/dashboard"
              : "/student/dashboard";

      navigate(dashboardRoute);
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Clear Clerk session before opening modal
  const handleOpenClerkModal = async () => {
    try {
      console.log('🧹 Preparing Clerk registration...');
      
      // Sign out from any existing session
      await signOut();
      
      // Clear IndexedDB
      if (window.indexedDB) {
        const databases = await window.indexedDB.databases();
        for (const db of databases) {
          if (db.name.includes('clerk')) {
            await window.indexedDB.deleteDatabase(db.name);
          }
        }
      }
      
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Small delay to ensure cleanup is complete
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
      case "parent":
        return "#db2777";
      default:
        return "#6b7280";
    }
  };

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
            onClick={handleOpenClerkModal} // ✅ CHANGED
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
                  afterSignUpUrl="/auth/clerk-callback"
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

  // Local Registration Form (same as before)
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
          {/* Role Selection Cards */}
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
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1.5,
              }}
            >
              {[
                { value: "student", label: "طالب", icon: <School /> },
                { value: "teacher", label: "مدرس", icon: <PersonIcon /> },
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
            helperText={errors.email}
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