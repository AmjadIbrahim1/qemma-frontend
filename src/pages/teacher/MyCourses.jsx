// frontend/src/pages/teacher/MyCourses.jsx
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  Search,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  School,
  Assignment,
  People,
  TrendingUp,
  VideoLibrary,
  CalendarMonth,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const MyCourses = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // تخصص المدرس - يمكن جلبه من API أو من بيانات المستخدم
  const teacherSubject = "رياضيات";

  // Dummy data - كل الكورسات لنفس المادة (رياضيات) بس الفصل مختلف
  const courses = [
    {
      id: 1,
      title: "كورس الرياضيات - الصف الأول الثانوي",
      description: "كورس شامل لمنهج الرياضيات للصف الأول الثانوي",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      students: 245,
      lessons: 32,
      exams: 8,
      progress: 75,
      status: "published",
      price: 500,
      category: "رياضيات",
      level: "الصف الأول الثانوي",
      rating: 4.8,
      revenue: 122500,
    },
    {
      id: 2,
      title: "كورس الرياضيات - الصف الثاني الثانوي",
      description: "كورس متكامل لمنهج الرياضيات بشرح مبسط",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      students: 189,
      lessons: 28,
      exams: 6,
      progress: 60,
      status: "published",
      price: 600,
      category: "رياضيات",
      level: "الصف الثاني الثانوي",
      rating: 4.9,
      revenue: 113400,
    },
    {
      id: 3,
      title: "كورس الرياضيات - الصف الثالث الثانوي",
      description: "تحضير شامل للثانوية العامة في الرياضيات",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      students: 312,
      lessons: 40,
      exams: 10,
      progress: 90,
      status: "published",
      price: 700,
      category: "رياضيات",
      level: "الصف الثالث الثانوي",
      rating: 4.7,
      revenue: 218400,
    },
    {
      id: 4,
      title: "كورس الرياضيات المتقدمة - الصف الثالث الثانوي",
      description: "شرح مفصل للرياضيات المتقدمة مع حل نماذج امتحانات",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      students: 156,
      lessons: 24,
      exams: 5,
      progress: 45,
      status: "draft",
      price: 550,
      category: "رياضيات",
      level: "الصف الثالث الثانوي",
      rating: 4.6,
      revenue: 0,
    },
  ];

  const handleMenuClick = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
  };

  const handleEdit = (courseId) => {
  navigate(`/teacher/courses/edit/${courseId}`);
};

  const handleDelete = () => {
    toast.success(`تم حذف الكورس: ${selectedCourse.title}`);
    handleMenuClose();
  };

  const handleView = () => {
    navigate(`/teacher/course/${selectedCourse.id}`);
    handleMenuClose();
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      tabValue === 0
        ? true
        : tabValue === 1
          ? course.status === "published"
          : course.status === "draft";
    return matchesSearch && matchesTab;
  });

  const stats = [
    {
      label: "إجمالي الكورسات",
      value: courses.length,
      icon: <School />,
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    },
    {
      label: "إجمالي الطلاب",
      value: courses.reduce((acc, c) => acc + c.students, 0),
      icon: <People />,
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    },
    {
      label: "إجمالي الدروس",
      value: courses.reduce((acc, c) => acc + c.lessons, 0),
      icon: <VideoLibrary />,
      color: "#dc2626",
      gradient: "linear-gradient(135deg, #dc2626 0%, #db2777 100%)",
    },
    {
      label: "إجمالي الإيرادات",
      value: `${courses.reduce((acc, c) => acc + c.revenue, 0).toLocaleString()} جنيه`,
      icon: <TrendingUp />,
      color: "#ea580c",
      gradient: "linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/teacher/dashboard")}
                sx={{
                  mb: 2,
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 700,
                }}
              >
                العودة للوحة التحكم
              </Button>

              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "inherit", mb: 1 }}
              >
                كورسات {teacherSubject} 📚
              </Typography>

              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
              >
                إدارة ومتابعة جميع كورسات {teacherSubject} الخاصة بك
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/teacher/courses/new")}
              sx={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                px: 3,
                py: 1.5,
              }}
            >
              إنشاء كورس جديد
            </Button>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                    bgcolor: darkMode ? "#1e293b" : "white",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#94a3b8" : "text.secondary",
                            mb: 1,
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight={900}
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          background: stat.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        {stat.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Search and Filters */}
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
              mb: 3,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="ابحث عن كورس..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search
                          sx={{ color: darkMode ? "#94a3b8" : "inherit" }}
                        />
                      </InputAdornment>
                    ),
                    sx: { fontFamily: "Cairo, sans-serif" },
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
              </Box>

              {/* Tabs */}
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{
                  mt: 2,
                  "& .MuiTab-root": {
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 700,
                    color: darkMode ? "#94a3b8" : "inherit",
                  },
                  "& .Mui-selected": {
                    color: darkMode ? "#f1f5f9" : "#2563eb",
                  },
                }}
              >
                <Tab label="جميع الكورسات" />
                <Tab label="منشور" />
                <Tab label="مسودة" />
              </Tabs>
            </CardContent>
          </Card>
        </Box>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
              p: 8,
              textAlign: "center",
            }}
          >
            <School
              sx={{
                fontSize: 80,
                color: darkMode ? "#334155" : "#e5e7eb",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              fontFamily="Cairo, sans-serif"
              fontWeight={700}
              sx={{ color: darkMode ? "#94a3b8" : "text.secondary", mb: 1 }}
            >
              لا توجد كورسات
            </Typography>
            <Typography
              variant="body2"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? "#64748b" : "text.secondary", mb: 3 }}
            >
              ابدأ بإنشاء كورسك الأول الآن
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/teacher/create-course")}
              sx={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              }}
            >
              إنشاء كورس جديد
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} lg={4} key={course.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                    bgcolor: darkMode ? "#1e293b" : "white",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: darkMode
                        ? "0 10px 30px rgba(0,0,0,0.4)"
                        : "0 10px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {/* Course Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Chip
                        label={course.level}
                        size="small"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          bgcolor: "#2563eb",
                          color: "white",
                        }}
                      />
                      <Chip
                        label={
                          course.status === "published" ? "منشور" : "مسودة"
                        }
                        size="small"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          bgcolor:
                            course.status === "published"
                              ? "#059669"
                              : "#f59e0b",
                          color: "white",
                        }}
                      />
                    </Box>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, course)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <CardContent>
                    {/* Title */}
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{
                        color: darkMode ? "#f1f5f9" : "inherit",
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {course.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{
                        color: darkMode ? "#94a3b8" : "text.secondary",
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {course.description}
                    </Typography>

                    {/* Progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#94a3b8" : "text.secondary",
                          }}
                        >
                          نسبة الإنجاز
                        </Typography>
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          {course.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: darkMode ? "#334155" : "#e5e7eb",
                          "& .MuiLinearProgress-bar": {
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                          },
                        }}
                      />
                    </Box>

                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <People
                            sx={{
                              fontSize: 20,
                              color: darkMode ? "#94a3b8" : "text.secondary",
                            }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                          >
                            {course.students}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{
                              color: darkMode ? "#64748b" : "text.secondary",
                            }}
                          >
                            طالب
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <VideoLibrary
                            sx={{
                              fontSize: 20,
                              color: darkMode ? "#94a3b8" : "text.secondary",
                            }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                          >
                            {course.lessons}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{
                              color: darkMode ? "#64748b" : "text.secondary",
                            }}
                          >
                            درس
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <Assignment
                            sx={{
                              fontSize: 20,
                              color: darkMode ? "#94a3b8" : "text.secondary",
                            }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                          >
                            {course.exams}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{
                              color: darkMode ? "#64748b" : "text.secondary",
                            }}
                          >
                            اختبار
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Price & Revenue */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 2,
                        mb: 2,
                        borderTop: "1px solid",
                        borderColor: darkMode ? "#334155" : "#e5e7eb",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#94a3b8" : "text.secondary",
                          }}
                        >
                          السعر
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={900}
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          {course.price} جنيه
                        </Typography>
                      </Box>
                      {course.status === "published" && (
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{
                              color: darkMode ? "#94a3b8" : "text.secondary",
                            }}
                          >
                            الإيرادات
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: "#059669" }}
                          >
                            {course.revenue.toLocaleString()} ج
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Edit Course Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      // startIcon={<Edit />}
                      onClick={() => handleEdit(course.id)}
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                        },
                      }}
                    >
                      تعديل الكورس
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: darkMode ? "#1e293b" : "white",
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
            },
          }}
        >
          <MenuItem
            onClick={handleView}
            sx={{
              fontFamily: "Cairo, sans-serif",
              color: darkMode ? "#f1f5f9" : "inherit",
            }}
          >
            <Visibility sx={{ mr: 1 }} fontSize="small" />
            عرض التفاصيل
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEdit(selectedCourse.id);
              handleMenuClose();
            }}
            sx={{
              fontFamily: "Cairo, sans-serif",
              color: darkMode ? "#f1f5f9" : "inherit",
            }}
          >
            <Edit sx={{ mr: 1 }} fontSize="small" />
            تعديل
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{
              fontFamily: "Cairo, sans-serif",
              color: "#dc2626",
            }}
          >
            <Delete sx={{ mr: 1 }} fontSize="small" />
            حذف
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default MyCourses;