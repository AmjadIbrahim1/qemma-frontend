// frontend/src/pages/parent/ChildDetails.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Cancel,
  School,
  Assignment,
  BarChart,
  CalendarToday,
  Person,
} from "@mui/icons-material";

const ChildDetails = () => {
  const navigate = useNavigate();
  const { childId } = useParams();
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // Mock Data - استبدلها بـ API call
  const childData = {
    id: childId,
    name: "أحمد محمد",
    grade: "الصف الأول الثانوي",
    avatar: "أ",
    email: "ahmed@example.com",
    phone: "01012345678",
    averageGrade: 85,
    attendance: 92,
    behaviorAlerts: 0,
  };

  // Courses Data
  const courses = [
    {
      id: 1,
      name: "الرياضيات - الجبر",
      teacher: "أ. محمد علي",
      grade: 88,
      progress: 75,
    },
    {
      id: 2,
      name: "الفيزياء",
      teacher: "أ. سارة أحمد",
      grade: 82,
      progress: 60,
    },
    {
      id: 3,
      name: "الكيمياء",
      teacher: "د. خالد محمود",
      grade: 90,
      progress: 80,
    },
    {
      id: 4,
      name: "اللغة الإنجليزية",
      teacher: "مس. نورا حسن",
      grade: 80,
      progress: 70,
    },
  ];

  // Assignments
  const assignments = [
    {
      id: 1,
      course: "الرياضيات",
      title: "حل معادلات الدرجة الثانية",
      dueDate: "2025-01-26",
      status: "pending",
    },
    {
      id: 2,
      course: "الفيزياء",
      title: "تقرير عن الحركة",
      dueDate: "2025-01-28",
      status: "pending",
    },
    {
      id: 3,
      course: "الكيمياء",
      title: "تجارب المعمل",
      dueDate: "2025-01-24",
      status: "completed",
      grade: 95,
    },
    {
      id: 4,
      course: "اللغة الإنجليزية",
      title: "Writing Essay",
      dueDate: "2025-01-23",
      status: "completed",
      grade: 88,
    },
  ];

  // Exams
  const exams = [
    {
      id: 1,
      course: "الهندسة",
      title: "اختبار شهري",
      date: "2025-01-28",
      time: "10:00 ص",
      status: "upcoming",
    },
    {
      id: 2,
      course: "الكيمياء",
      title: "اختبار الباب الأول",
      date: "2025-01-20",
      grade: 90,
      status: "completed",
    },
    {
      id: 3,
      course: "الفيزياء",
      title: "Quiz",
      date: "2025-01-18",
      grade: 85,
      status: "completed",
    },
  ];

  // Activities
  const activities = [
    {
      id: 1,
      type: "success",
      text: "حصل على 95% في اختبار الكيمياء",
      time: "منذ ساعتين",
    },
    {
      id: 2,
      type: "info",
      text: "حضر حصة مباشرة - الرياضيات",
      time: "منذ 4 ساعات",
    },
    { id: 3, type: "success", text: "سلم واجب اللغة الإنجليزية", time: "أمس" },
    {
      id: 4,
      type: "warning",
      text: "تأخر 10 دقائق عن الحصة",
      time: "منذ يومين",
    },
  ];

  const chipStyle = {
    bgcolor: darkMode ? "#334155" : "#2563eb",
    color: "#ffffff",
    fontFamily: "Cairo, sans-serif",
    fontWeight: 700,
    "& .MuiChip-icon": {
      color: "#ffffff",
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return { bg: "#f0fdf4", color: "#059669" };
      case "pending":
        return { bg: "#fffbeb", color: "#f59e0b" };
      case "upcoming":
        return { bg: "#eff6ff", color: "#2563eb" };
      default:
        return { bg: "#f9fafb", color: "#64748b" };
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle sx={{ color: "#059669" }} />;
      case "warning":
        return <Warning sx={{ color: "#f59e0b" }} />;
      case "error":
        return <Cancel sx={{ color: "#dc2626" }} />;
      default:
        return <CheckCircle sx={{ color: "#2563eb" }} />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: darkMode ? "#0f172a" : "#f8fafc" }}>
      {/* Header */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
          color: "white",
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => navigate("/parent/children")}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h5"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
            >
              تفاصيل الطالب
            </Typography>
          </Box>

          {/* Student Info Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#2563eb",
                  fontSize: "2rem",
                  fontWeight: 900,
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                {childData.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 0.5, color: darkMode ? "#f1f5f9" : "#1e293b" }}
                >
                  {childData.name}
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#64748b", mb: 1 }}
                >
                  {childData.grade}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Chip
                    icon={<Person />}
                    label={childData.email}
                    size="small"
                  />
                  <Chip label={childData.phone} size="small" />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: "#2563eb" }}
                  >
                    {childData.averageGrade}%
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif">
                    المتوسط
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: "#059669" }}
                  >
                    {childData.attendance}%
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif">
                    الحضور
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Tabs */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            bgcolor: darkMode ? "#1e293b" : "white",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            sx={{
              borderBottom: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              "& .MuiTab-root": {
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                color: darkMode ? "#94a3b8" : "text.secondary",
              },
            }}
          >
            <Tab icon={<School />} label="الكورسات" iconPosition="start" />
            <Tab icon={<Assignment />} label="الواجبات" iconPosition="start" />
            <Tab icon={<BarChart />} label="الاختبارات" iconPosition="start" />
            <Tab icon={<CalendarToday />} label="النشاط" iconPosition="start" />
          </Tabs>
        </Card>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} md={6} key={course.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                    bgcolor: darkMode ? "#1e293b" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#2563eb",
                      transform: "translateY(-4px)",
                      boxShadow: darkMode
                        ? "0 8px 16px rgba(0,0,0,0.3)"
                        : "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() =>
                    navigate(`/parent/child/${childId}/course/${course.id}`)
                  }
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ mb: 1, color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      {course.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{
                        mb: 2,
                        color: darkMode ? "#64748b" : "text.secondary",
                      }}
                    >
                      {course.teacher}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        fontWeight={600}
                      >
                        الدرجة: {course.grade}%
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        fontWeight={600}
                      >
                        التقدم: {course.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: darkMode ? "#334155" : "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: course.grade >= 80 ? "#059669" : "#f59e0b",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <List>
              {assignments.map((assignment, index) => (
                <ListItem
                  key={assignment.id}
                  sx={{
                    borderBottom:
                      index < assignments.length - 1 ? "1px solid" : "none",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          {assignment.title}
                        </Typography>
                        <Chip
                          label={
                            assignment.status === "completed" ? "مكتمل" : "معلق"
                          }
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(assignment.status).bg,
                            color: getStatusColor(assignment.status).color,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#64748b" : "text.secondary",
                          }}
                        >
                          {assignment.course} • التسليم: {assignment.dueDate}
                        </Typography>
                        {assignment.grade && (
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            fontWeight={700}
                            sx={{ color: "#059669", mt: 0.5 }}
                          >
                            الدرجة: {assignment.grade}%
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        )}

        {activeTab === 2 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <List>
              {exams.map((exam, index) => (
                <ListItem
                  key={exam.id}
                  sx={{
                    borderBottom:
                      index < exams.length - 1 ? "1px solid" : "none",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          {exam.title}
                        </Typography>
                        <Chip
                          label={exam.status === "upcoming" ? "قادم" : "مكتمل"}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(exam.status).bg,
                            color: getStatusColor(exam.status).color,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#64748b" : "text.secondary",
                          }}
                        >
                          {exam.course} • {exam.date}{" "}
                          {exam.time && `• ${exam.time}`}
                        </Typography>
                        {exam.grade && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={700}
                              sx={{ color: "#059669" }}
                            >
                              الدرجة: {exam.grade}%
                            </Typography>
                            {exam.grade >= 80 ? (
                              <TrendingUp
                                sx={{ fontSize: 18, color: "#059669" }}
                              />
                            ) : (
                              <TrendingDown
                                sx={{ fontSize: 18, color: "#dc2626" }}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        )}

        {activeTab === 3 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <List>
              {activities.map((activity, index) => (
                <ListItem
                  key={activity.id}
                  sx={{
                    borderBottom:
                      index < activities.length - 1 ? "1px solid" : "none",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                  }}
                >
                  <Box sx={{ mr: 2 }}>{getActivityIcon(activity.type)}</Box>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        fontWeight={600}
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {activity.text}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#64748b" : "text.secondary" }}
                      >
                        {activity.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default ChildDetails;
