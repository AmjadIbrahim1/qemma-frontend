// frontend/src/pages/ProfilePage.jsx - UPDATED: Fixed assistant_teacher label
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
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
  Paper,
} from "@mui/material";
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
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateProfile, addPassword } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ TASK 2: Fixed role label mapping
  const getRoleLabel = (role) => {
    const roleMap = {
      student: "طالب",
      teacher: "مدرس",
      assistant_teacher: "مدرس مساعد", // ✅ Changed from 'مستخدم'
      parent: "ولي أمر",
      admin: "مسؤول",
    };
    return roleMap[role] || "مستخدم";
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async () => {
    if (!formData.password || formData.password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      toast.error("كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم");
      return;
    }

    setLoading(true);
    try {
      await addPassword(formData.password);
      setPasswordMode(false);
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Add password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      password: "",
    });
    setEditMode(false);
    setPasswordMode(false);
  };

  const isClerkUser =
    user?.authProvider === "clerk" || user?.authProvider === "hybrid";
  const hasPassword =
    user?.hasPassword ||
    user?.authProvider === "local" ||
    user?.authProvider === "hybrid";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f8fafc",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              color: darkMode ? "#f1f5f9" : "#1e293b",
              "&:hover": {
                bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
              },
            }}
          >
            العودة للرئيسية
          </Button>

          <IconButton
            onClick={toggleTheme}
            size="small"
            aria-label="toggle theme"
            sx={{
              color: darkMode ? "#f1f5f9" : "#1e293b",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              },
            }}
          >
            {darkMode ? (
              <LightMode fontSize="small" />
            ) : (
              <DarkMode fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: darkMode
                  ? "0 8px 32px rgba(0,0,0,0.3)"
                  : "0 8px 32px rgba(0,0,0,0.08)",
                bgcolor: darkMode ? "#1e293b" : "white",
                border: darkMode ? "1px solid #334155" : "none",
                overflow: "visible",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  height: 120,
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              <CardContent sx={{ px: 4, pb: 4, mt: -8 }}>
                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <Avatar
                    src={user?.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: "3rem",
                      fontWeight: 900,
                      border: "4px solid",
                      borderColor: darkMode ? "#1e293b" : "white",
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                  >
                    {getInitials(user?.name)}
                  </Avatar>

                  <Box sx={{ ml: 3, flex: 1 }}>
                    <Typography
                      variant="h4"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{
                        color: darkMode ? "#f1f5f9" : "#1e293b",
                        mb: 1,
                      }}
                    >
                      {user?.name || "مستخدم"}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        label={getRoleLabel(user?.role)}
                        sx={{
                          fontWeight: 800,
                          fontFamily: "Cairo, sans-serif",
                          background:
                            "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                          color: "white",
                          px: 1,
                        }}
                      />
                      {isClerkUser && (
                        <Chip
                          label={
                            user?.authProvider === "hybrid"
                              ? "Google + Email"
                              : "Google"
                          }
                          sx={{
                            fontWeight: 800,
                            fontFamily: "Cairo, sans-serif",
                            bgcolor: darkMode ? "#334155" : "#f1f5f9",
                            color: darkMode ? "#f1f5f9" : "#1e293b",
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {!editMode && !passwordMode && (
                    <IconButton
                      onClick={() => setEditMode(true)}
                      sx={{
                        bgcolor: darkMode ? "#334155" : "#f1f5f9",
                        color: darkMode ? "#f1f5f9" : "#2563eb",
                        "&:hover": {
                          bgcolor: darkMode ? "#475569" : "#e0e7ff",
                          transform: "scale(1.05)",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: darkMode
                  ? "0 8px 32px rgba(0,0,0,0.3)"
                  : "0 8px 32px rgba(0,0,0,0.08)",
                bgcolor: darkMode ? "#1e293b" : "white",
                border: darkMode ? "1px solid #334155" : "none",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{
                    mb: 3,
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                  }}
                >
                  المعلومات الشخصية
                </Typography>

                {isClerkUser && user?.authProvider === "hybrid" && (
                  <Alert
                    severity="info"
                    icon={<InfoOutlined />}
                    sx={{
                      mb: 3,
                      fontFamily: "Cairo, sans-serif",
                      bgcolor: darkMode ? "rgba(59, 130, 246, 0.1)" : "#eff6ff",
                      color: darkMode ? "#93c5fd" : "#1e40af",
                      border: "1px solid",
                      borderColor: darkMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "#bfdbfe",
                      borderRadius: 2,
                      "& .MuiAlert-icon": {
                        color: darkMode ? "#93c5fd" : "#2563eb",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={600}
                    >
                      🎉 تم إنشاء حسابك بنجاح! لديك الآن كلمة مرور تلقائية تمكنك
                      من تسجيل الدخول بالبريد الإلكتروني.
                    </Typography>
                  </Alert>
                )}

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
                            <Person
                              sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        sx: {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : "#e2e8f0",
                          },
                          "&:hover fieldset": {
                            borderColor: darkMode ? "#475569" : "#cbd5e1",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : "#1e293b",
                          fontFamily: "Cairo, sans-serif",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="البريد الإلكتروني"
                      value={user?.email}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email
                              sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        sx: {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : "#e2e8f0",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#94a3b8" : "#64748b",
                          fontFamily: "Cairo, sans-serif",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
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
                            <Phone
                              sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        sx: {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : "#e2e8f0",
                          },
                          "&:hover fieldset": {
                            borderColor: darkMode ? "#475569" : "#cbd5e1",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : "#1e293b",
                          fontFamily: "Cairo, sans-serif",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: darkMode
                  ? "0 8px 32px rgba(0,0,0,0.3)"
                  : "0 8px 32px rgba(0,0,0,0.08)",
                bgcolor: darkMode ? "#1e293b" : "white",
                border: darkMode ? "1px solid #334155" : "none",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: hasPassword
                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      mr: 2,
                    }}
                  >
                    <Lock sx={{ color: "white", fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      كلمة المرور
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {hasPassword
                        ? "محمية بكلمة مرور"
                        : "أضف كلمة مرور للحماية"}
                    </Typography>
                  </Box>
                </Box>

                {hasPassword ? (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: darkMode ? "rgba(16, 185, 129, 0.1)" : "#f0fdf4",
                      border: "1px solid",
                      borderColor: darkMode
                        ? "rgba(16, 185, 129, 0.2)"
                        : "#86efac",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={600}
                      sx={{ color: darkMode ? "#6ee7b7" : "#059669" }}
                    >
                      {user?.authProvider === "hybrid"
                        ? "✅ لديك كلمة مرور تلقائية. يمكنك الآن تسجيل الدخول بالبريد الإلكتروني أو Google."
                        : "✅ لديك كلمة مرور. يمكنك تسجيل الدخول بالبريد الإلكتروني."}
                    </Typography>
                  </Paper>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: darkMode ? "rgba(37, 99, 235, 0.1)" : "#eff6ff",
                      border: "1px solid",
                      borderColor: darkMode
                        ? "rgba(37, 99, 235, 0.2)"
                        : "#bfdbfe",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={600}
                      sx={{ mb: 2, color: darkMode ? "#93c5fd" : "#1e40af" }}
                    >
                      قمت بالتسجيل عبر Google. يمكنك إضافة كلمة مرور للدخول
                      بالبريد الإلكتروني أيضاً.
                    </Typography>
                    {!passwordMode ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setPasswordMode(true)}
                        disableElevation
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          background:
                            "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                          borderRadius: 2,
                          px: 3,
                        }}
                      >
                        إضافة كلمة مرور
                      </Button>
                    ) : (
                      <TextField
                        fullWidth
                        name="password"
                        label="كلمة المرور الجديدة"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="8 أحرف على الأقل"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock
                                sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          sx: {
                            fontFamily: "Cairo, sans-serif",
                            color: darkMode ? "#94a3b8" : undefined,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: darkMode ? "#334155" : "#e2e8f0",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: darkMode ? "#f1f5f9" : "#1e293b",
                            fontFamily: "Cairo, sans-serif",
                          },
                        }}
                      />
                    )}
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>

          {(editMode || passwordMode) && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={passwordMode ? handleAddPassword : handleSaveProfile}
                  disabled={loading}
                  startIcon={<Save />}
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
                  حفظ التغييرات
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCancel}
                  startIcon={<Cancel />}
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 900,
                    borderRadius: 2,
                    py: 1.5,
                    borderColor: darkMode ? "#334155" : "#e2e8f0",
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                    "&:hover": {
                      borderColor: darkMode ? "#475569" : "#cbd5e1",
                      bgcolor: darkMode ? "#1e293b" : "#f8fafc",
                    },
                  }}
                >
                  إلغاء
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
