// frontend/src/pages/teacher/LiveClass.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
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
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";
import {
  ArrowBack,
  VideoCall,
  ContentCopy,
  Settings,
  People,
  Schedule,
  Mic,
  Videocam,
  ScreenShare,
  Chat,
  School,
  CheckCircle,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const TeacherLiveClass = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);

  // Room Settings
  const [roomData, setRoomData] = useState({
    courseId: "",
    title: "",
    description: "",
    maxCapacity: 100,
    scheduledTime: "",
    enableChat: true,
    enableScreenShare: true,
    recordSession: false,
    waitingRoom: false,
  });

  // Generated Room Info
  const [roomInfo, setRoomInfo] = useState({
    roomId: "",
    roomLink: "",
    roomCode: "",
  });

  // Mock teacher's courses - مادة واحدة لكن فصول مختلفة
  const teacherCourses = [
    {
      id: "course-1",
      title: "الرياضيات - الصف الأول الثانوي",
      grade: "الصف الأول",
      studentsCount: 45,
      subject: "الرياضيات",
    },
    {
      id: "course-2",
      title: "الرياضيات - الصف الثاني الثانوي",
      grade: "الصف الثاني",
      studentsCount: 38,
      subject: "الرياضيات",
    },
    {
      id: "course-3",
      title: "الرياضيات - الصف الثالث الثانوي",
      grade: "الصف الثالث",
      studentsCount: 42,
      subject: "الرياضيات",
    },
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateRoomId = () => {
    return "room_" + Math.random().toString(36).substr(2, 9);
  };

  const generateRoomCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleCreateRoom = async () => {
    // Validation
    if (!roomData.courseId) {
      toast.error("يرجى اختيار الكورس");
      return;
    }
    if (!roomData.title) {
      toast.error("يرجى إدخال عنوان الحصة");
      return;
    }

    setLoading(true);
    try {
      const roomId = generateRoomId();
      const roomCode = generateRoomCode();
      const roomLink = `${window.location.origin}/live/${roomId}`;

      // TODO: Replace with actual API call
      const payload = {
        ...roomData,
        roomId,
        roomCode,
        hostId: "teacher-id", // من الـ auth
        roomType: "live_class",
        startedAt: new Date().toISOString(),
      };

      console.log("Creating room:", payload);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setRoomInfo({
        roomId,
        roomLink,
        roomCode,
      });

      setRoomCreated(true);
      toast.success("تم إنشاء الحصة بنجاح! 🎉");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("فشل إنشاء الحصة. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomInfo.roomLink);
    toast.success("تم نسخ الرابط!");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomInfo.roomCode);
    toast.success("تم نسخ الكود!");
  };

  const handleStartClass = () => {
    // Navigate to actual live class room
    navigate(`/teacher/live-room/${roomInfo.roomId}`);
  };

  const selectedCourse = teacherCourses.find((c) => c.id === roomData.courseId);

  if (roomCreated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: darkMode ? "#0f172a" : "#f9fafb",
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                mb: 3,
              }}
            >
              <CheckCircle sx={{ fontSize: 50 }} />
            </Box>
            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{ mb: 1, color: darkMode ? "#f1f5f9" : "inherit" }}
            >
              تم إنشاء الحصة بنجاح!
            </Typography>
            <Typography
              variant="body1"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
            >
              شارك الرابط أو الكود مع طلابك للانضمام
            </Typography>
          </Box>

          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Room Info */}
              <Typography
                variant="h6"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
              >
                معلومات الحصة
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={700}
                      sx={{
                        mb: 1,
                        color: darkMode ? "#94a3b8" : "text.secondary",
                      }}
                    >
                      عنوان الحصة
                    </Typography>
                    <Typography
                      variant="body1"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={700}
                      sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      {roomData.title}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={700}
                      sx={{
                        mb: 1,
                        color: darkMode ? "#94a3b8" : "text.secondary",
                      }}
                    >
                      الكورس
                    </Typography>
                    <Typography
                      variant="body1"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      {selectedCourse?.title}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={700}
                      sx={{
                        mb: 1,
                        color: darkMode ? "#94a3b8" : "text.secondary",
                      }}
                    >
                      عدد الطلاب المتوقع
                    </Typography>
                    <Typography
                      variant="body1"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      {selectedCourse?.studentsCount} طالب
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Room Link */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={700}
                  sx={{ mb: 1, color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  رابط الحصة
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    value={roomInfo.roomLink}
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "0.875rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: darkMode ? "#334155" : undefined,
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: darkMode ? "#f1f5f9" : undefined,
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleCopyLink}
                    startIcon={<ContentCopy />}
                    sx={{
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 700,
                      borderColor: darkMode ? "#334155" : undefined,
                      color: darkMode ? "#f1f5f9" : "inherit",
                      minWidth: "120px",
                    }}
                  >
                    نسخ
                  </Button>
                </Box>
              </Box>

              {/* Room Code */}
              <Box>
                <Typography
                  variant="subtitle2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={700}
                  sx={{ mb: 1, color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  كود الحصة
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Paper
                    elevation={0}
                    sx={{
                      px: 3,
                      py: 2,
                      bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                      border: "2px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={900}
                      sx={{
                        textAlign: "center",
                        letterSpacing: "0.2em",
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      {roomInfo.roomCode}
                    </Typography>
                  </Paper>
                  <Button
                    variant="outlined"
                    onClick={handleCopyCode}
                    startIcon={<ContentCopy />}
                    sx={{
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 700,
                      borderColor: darkMode ? "#334155" : undefined,
                      color: darkMode ? "#f1f5f9" : "inherit",
                      minWidth: "120px",
                    }}
                  >
                    نسخ
                  </Button>
                </Box>
              </Box>

              <Alert
                severity="info"
                sx={{
                  mt: 3,
                  fontFamily: "Cairo, sans-serif",
                  bgcolor: darkMode ? "#1e3a8a20" : undefined,
                  color: darkMode ? "#93c5fd" : undefined,
                  "& .MuiAlert-icon": {
                    color: darkMode ? "#93c5fd" : undefined,
                  },
                }}
              >
                يمكن للطلاب الانضمام باستخدام الرابط أو الكود
              </Alert>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setRoomCreated(false);
                  setRoomData({
                    courseId: "",
                    title: "",
                    description: "",
                    maxCapacity: 100,
                    scheduledTime: "",
                    enableChat: true,
                    enableScreenShare: true,
                    recordSession: false,
                    waitingRoom: false,
                  });
                }}
                sx={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 700,
                  py: 1.5,
                  borderColor: darkMode ? "#334155" : undefined,
                  color: darkMode ? "#f1f5f9" : "inherit",
                }}
              >
                إنشاء حصة جديدة
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleStartClass}
                startIcon={<VideoCall />}
                sx={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 900,
                  py: 1.5,
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                  },
                }}
              >
                بدء الحصة الآن
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/teacher/dashboard")}
            sx={{
              mb: 2,
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              color: darkMode ? "#f1f5f9" : "inherit",
            }}
          >
            العودة للوحة التحكم
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <VideoCall />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
              >
                بدء حصة مباشرة
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
              >
                أنشئ حصة أونلاين مباشرة لطلابك
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
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  إعدادات الحصة
                </Typography>

                <Grid container spacing={3}>
                  {/* Course Selection */}
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        }}
                      >
                        اختر الكورس (الفصل الدراسي)
                      </InputLabel>
                      <Select
                        name="courseId"
                        value={roomData.courseId}
                        onChange={handleChange}
                        label="اختر الكورس (الفصل الدراسي)"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                          "& .MuiSelect-select": {
                            color: darkMode ? "#f1f5f9" : undefined,
                          },
                        }}
                      >
                        {teacherCourses.map((course) => (
                          <MenuItem key={course.id} value={course.id}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <Box sx={{ fontFamily: "Cairo, sans-serif" }}>
                                <Typography variant="body1" fontWeight={700}>
                                  {course.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {course.subject}
                                </Typography>
                              </Box>
                              <Chip
                                label={`${course.studentsCount} طالب`}
                                size="small"
                                sx={{
                                  fontFamily: "Cairo, sans-serif",
                                  fontWeight: 700,
                                }}
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
                      label="عنوان الحصة"
                      value={roomData.title}
                      onChange={handleChange}
                      placeholder="مثال: شرح الجبر - الفصل الأول"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      name="description"
                      label="وصف الحصة (اختياري)"
                      value={roomData.description}
                      onChange={handleChange}
                      placeholder="اكتب وصفاً مختصراً عن الحصة..."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Max Capacity */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="maxCapacity"
                      label="الحد الأقصى للطلاب"
                      value={roomData.maxCapacity}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Scheduled Time */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      name="scheduledTime"
                      label="موعد الحصة (اختياري)"
                      value={roomData.scheduledTime}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Room Options */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ mb: 2, color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      خيارات الحصة
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={roomData.enableChat}
                              onChange={handleChange}
                              name="enableChat"
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Chat fontSize="small" />
                              <Typography
                                fontFamily="Cairo, sans-serif"
                                fontWeight={600}
                                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                              >
                                تفعيل الدردشة
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={roomData.enableScreenShare}
                              onChange={handleChange}
                              name="enableScreenShare"
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <ScreenShare fontSize="small" />
                              <Typography
                                fontFamily="Cairo, sans-serif"
                                fontWeight={600}
                                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                              >
                                مشاركة الشاشة
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={roomData.recordSession}
                              onChange={handleChange}
                              name="recordSession"
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Videocam fontSize="small" />
                              <Typography
                                fontFamily="Cairo, sans-serif"
                                fontWeight={600}
                                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                              >
                                تسجيل الحصة
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={roomData.waitingRoom}
                              onChange={handleChange}
                              name="waitingRoom"
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <People fontSize="small" />
                              <Typography
                                fontFamily="Cairo, sans-serif"
                                fontWeight={600}
                                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                              >
                                غرفة انتظار
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleCreateRoom}
                    disabled={loading}
                    startIcon={<VideoCall />}
                    sx={{
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 900,
                      py: 1.5,
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                      },
                    }}
                  >
                    {loading ? "جاري الإنشاء..." : "إنشاء الحصة"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Info Panel */}
          <Grid item xs={12} lg={4}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  مميزات الحصة المباشرة
                </Typography>

                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Videocam
                        sx={{ color: darkMode ? "#60a5fa" : "#2563eb" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="فيديو عالي الجودة"
                      secondary="بث مباشر واضح وسلس"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        sx: { color: darkMode ? "#f1f5f9" : "inherit" },
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        sx: { color: darkMode ? "#94a3b8" : "text.secondary" },
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Mic sx={{ color: darkMode ? "#60a5fa" : "#2563eb" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="صوت نقي"
                      secondary="تقنية إلغاء الضوضاء"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        sx: { color: darkMode ? "#f1f5f9" : "inherit" },
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        sx: { color: darkMode ? "#94a3b8" : "text.secondary" },
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <ScreenShare
                        sx={{ color: darkMode ? "#60a5fa" : "#2563eb" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="مشاركة الشاشة"
                      secondary="شارك العروض والشروحات"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        sx: { color: darkMode ? "#f1f5f9" : "inherit" },
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        sx: { color: darkMode ? "#94a3b8" : "text.secondary" },
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Chat sx={{ color: darkMode ? "#60a5fa" : "#2563eb" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="دردشة تفاعلية"
                      secondary="تواصل مع الطلاب فوراً"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        sx: { color: darkMode ? "#f1f5f9" : "inherit" },
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        sx: { color: darkMode ? "#94a3b8" : "text.secondary" },
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <School
                        sx={{ color: darkMode ? "#60a5fa" : "#2563eb" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="أدوات تعليمية"
                      secondary="سبورة ومشاركة ملفات"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        sx: { color: darkMode ? "#f1f5f9" : "inherit" },
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        sx: { color: darkMode ? "#94a3b8" : "text.secondary" },
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <People
                        sx={{ color: darkMode ? "#60a5fa" : "#2563eb" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="إدارة الحضور"
                      secondary="تتبع حضور الطلاب تلقائياً"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        sx: { color: darkMode ? "#f1f5f9" : "inherit" },
                      }}
                      secondaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        sx: { color: darkMode ? "#94a3b8" : "text.secondary" },
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 2, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  💡 نصائح مهمة
                </Typography>

                <List dense>
                  <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                    <ListItemText
                      primary="• تأكد من اتصال إنترنت قوي ومستقر"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "0.875rem",
                        sx: { color: darkMode ? "#cbd5e1" : "text.secondary" },
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                    <ListItemText
                      primary="• جهز المحتوى والعروض مسبقاً"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "0.875rem",
                        sx: { color: darkMode ? "#cbd5e1" : "text.secondary" },
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                    <ListItemText
                      primary="• اختبر الكاميرا والميكروفون قبل البدء"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "0.875rem",
                        sx: { color: darkMode ? "#cbd5e1" : "text.secondary" },
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                    <ListItemText
                      primary="• شارك الرابط مع الطلاب قبل موعد الحصة"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "0.875rem",
                        sx: { color: darkMode ? "#cbd5e1" : "text.secondary" },
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                    <ListItemText
                      primary="• استخدم غرفة الانتظار لتنظيم دخول الطلاب"
                      primaryTypographyProps={{
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "0.875rem",
                        sx: { color: darkMode ? "#cbd5e1" : "text.secondary" },
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherLiveClass;
