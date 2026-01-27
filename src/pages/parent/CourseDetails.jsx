// frontend/src/pages/parent/CourseDetails.jsx
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
  Chip,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  Assignment,
  EventAvailable,
  BarChart,
  Warning,
  CheckCircle,
  Cancel,
  CalendarToday,
  AccessTime,
  TrendingUp,
  School,
  Person,
} from "@mui/icons-material";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { childId, courseId } = useParams();
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // Mock Data
  const courseData = {
    id: courseId,
    name: "الرياضيات - الجبر",
    teacher: "أ. محمد علي",
    childName: "أحمد محمد",
    grade: 88,
    attendance: 92,
    totalSessions: 24,
    attendedSessions: 22,
  };

  // Assignments
  const assignments = [
    {
      id: 1,
      title: "حل معادلات الدرجة الثانية",
      dueDate: "2025-01-26",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "تمارين على المصفوفات",
      dueDate: "2025-01-28",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      title: "واجب الدوال",
      dueDate: "2025-01-22",
      status: "late",
      priority: "high",
    },
    {
      id: 4,
      title: "أسئلة الباب الأول",
      dueDate: "2025-01-20",
      status: "completed",
      grade: 95,
      priority: "low",
    },
    {
      id: 5,
      title: "مسائل الهندسة",
      dueDate: "2025-01-18",
      status: "completed",
      grade: 88,
      priority: "medium",
    },
  ];

  // Live Sessions
  const liveSessions = [
    {
      id: 1,
      title: "شرح المعادلات التربيعية",
      date: "2025-01-28",
      time: "10:00 ص",
      attended: null,
      upcoming: true,
    },
    {
      id: 2,
      title: "مراجعة عامة",
      date: "2025-01-25",
      time: "02:00 م",
      attended: true,
      upcoming: false,
    },
    {
      id: 3,
      title: "شرح المصفوفات",
      date: "2025-01-23",
      time: "10:00 ص",
      attended: true,
      upcoming: false,
    },
    {
      id: 4,
      title: "حل تمارين",
      date: "2025-01-21",
      time: "11:00 ص",
      attended: false,
      upcoming: false,
    },
  ];

  // Exams
  const exams = [
    {
      id: 1,
      title: "اختبار شهري",
      date: "2025-01-30",
      time: "10:00 ص",
      status: "upcoming",
      totalMarks: 50,
    },
    {
      id: 2,
      title: "Quiz - الدوال",
      date: "2025-01-24",
      grade: 18,
      totalMarks: 20,
      status: "completed",
    },
    {
      id: 3,
      title: "اختبار الباب الأول",
      date: "2025-01-20",
      grade: 45,
      totalMarks: 50,
      status: "completed",
    },
    {
      id: 4,
      title: "Quiz سريع",
      date: "2025-01-15",
      grade: 9,
      totalMarks: 10,
      status: "completed",
    },
  ];

  // Behavior Alerts
  const behaviorAlerts = [
    {
      id: 1,
      type: "warning",
      message: "عدم الانتباه في الحصة",
      date: "2025-01-23",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      message: "مشاركة ممتازة في الحصة",
      date: "2025-01-20",
      severity: "positive",
    },
  ];

  // Grades Record
  const gradesRecord = [
    { week: "الأسبوع 1", assignment: 95, quiz: 90, participation: 85 },
    { week: "الأسبوع 2", assignment: 88, quiz: 85, participation: 90 },
    { week: "الأسبوع 3", assignment: 92, quiz: 88, participation: 88 },
    { week: "الأسبوع 4", assignment: 85, quiz: 90, participation: 92 },
  ];

  // Attendance Record
  const attendanceRecord = [
    { date: "2025-01-25", session: "مراجعة عامة", attended: true },
    { date: "2025-01-23", session: "شرح المصفوفات", attended: true },
    { date: "2025-01-21", session: "حل تمارين", attended: false },
    { date: "2025-01-18", session: "شرح الدوال", attended: true },
    { date: "2025-01-16", session: "تطبيقات عملية", attended: true },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return { bg: "#f0fdf4", color: "#059669" };
      case "pending":
        return { bg: "#eff6ff", color: "#2563eb" };
      case "late":
        return { bg: "#fef2f2", color: "#dc2626" };
      case "upcoming":
        return { bg: "#fffbeb", color: "#f59e0b" };
      default:
        return { bg: "#f9fafb", color: "#64748b" };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#dc2626";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#059669";
      default:
        return "#64748b";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: darkMode ? "#0f172a" : "#f9fafb" }}>
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
              onClick={() => navigate(`/parent/child/${childId}`)}
            >
              <ArrowBack />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
              >
                {courseData.name}
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9 }}
              >
                {courseData.teacher} • {courseData.childName}
              </Typography>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#2563eb" }}
                >
                  {courseData.grade}%
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "black" }}
                >
                  الدرجة
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#059669" }}
                >
                  {courseData.attendance}%
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "black" }}
                >
                  الحضور
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#7c3aed" }}
                >
                  {courseData.attendedSessions}/{courseData.totalSessions}
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "black" }}
                >
                  الحصص
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#f59e0b" }}
                >
                  {
                    assignments.filter(
                      (a) => a.status === "pending" || a.status === "late",
                    ).length
                  }
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "black" }}
                >
                  واجبات معلقة
                </Typography>
              </Paper>
            </Grid>
          </Grid>
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
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              "& .MuiTab-root": {
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
              },
            }}
          >
            <Tab icon={<Assignment />} label="الواجبات" iconPosition="start" />
            <Tab icon={<EventAvailable />} label="الحصص" iconPosition="start" />
            <Tab icon={<BarChart />} label="الاختبارات" iconPosition="start" />
            <Tab icon={<Warning />} label="التنبيهات" iconPosition="start" />
            <Tab
              icon={<TrendingUp />}
              label="سجل الدرجات"
              iconPosition="start"
            />
            <Tab
              icon={<CalendarToday />}
              label="سجل الحضور"
              iconPosition="start"
            />
          </Tabs>
        </Card>

        {/* Tab 0: Assignments */}
        {activeTab === 0 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <List>
              {assignments.map((assignment, idx) => (
                <ListItem
                  key={assignment.id}
                  sx={{
                    borderBottom:
                      idx < assignments.length - 1 ? "1px solid" : "none",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 40,
                      bgcolor: getPriorityColor(assignment.priority),
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
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
                            assignment.status === "completed"
                              ? "مكتمل"
                              : assignment.status === "late"
                                ? "متأخر"
                                : "معلق"
                          }
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(assignment.status).bg,
                            color: getStatusColor(assignment.status).color,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#64748b" : "text.secondary",
                          }}
                        >
                          📅 {assignment.dueDate}
                        </Typography>
                        {assignment.grade && (
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            fontWeight={700}
                            sx={{ color: "#059669" }}
                          >
                            ✓ {assignment.grade}%
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

        {/* Tab 1: Live Sessions */}
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
              {liveSessions.map((session, idx) => (
                <ListItem
                  key={session.id}
                  sx={{
                    borderBottom:
                      idx < liveSessions.length - 1 ? "1px solid" : "none",
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
                          {session.title}
                        </Typography>
                        {session.upcoming ? (
                          <Chip
                            label="قادمة"
                            size="small"
                            sx={{
                              bgcolor: "#fffbeb",
                              color: "#f59e0b",
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 700,
                            }}
                          />
                        ) : session.attended ? (
                          <CheckCircle
                            sx={{ color: "#059669", fontSize: 20 }}
                          />
                        ) : (
                          <Cancel sx={{ color: "#dc2626", fontSize: 20 }} />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#64748b" : "text.secondary" }}
                      >
                        📅 {session.date} • 🕐 {session.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        )}

        {/* Tab 2: Exams */}
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
              {exams.map((exam, idx) => (
                <ListItem
                  key={exam.id}
                  sx={{
                    borderBottom: idx < exams.length - 1 ? "1px solid" : "none",
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
                        {exam.status === "upcoming" && (
                          <Chip
                            label="قادم"
                            size="small"
                            sx={{
                              bgcolor: "#fffbeb",
                              color: "#f59e0b",
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 700,
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#64748b" : "text.secondary",
                          }}
                        >
                          📅 {exam.date} {exam.time && `• 🕐 ${exam.time}`}
                        </Typography>
                        {exam.grade !== undefined && (
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="body2"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={700}
                              sx={{ color: "#059669", mb: 0.5 }}
                            >
                              الدرجة: {exam.grade}/{exam.totalMarks} (
                              {Math.round((exam.grade / exam.totalMarks) * 100)}
                              %)
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(exam.grade / exam.totalMarks) * 100}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: darkMode ? "#334155" : "#e5e7eb",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor:
                                    (exam.grade / exam.totalMarks) * 100 >= 80
                                      ? "#059669"
                                      : "#f59e0b",
                                  borderRadius: 3,
                                },
                              }}
                            />
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

        {/* Tab 3: Behavior Alerts */}
        {activeTab === 3 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            {behaviorAlerts.length === 0 ? (
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <CheckCircle sx={{ fontSize: 60, color: "#059669", mb: 2 }} />
                <Typography
                  variant="h6"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={700}
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  لا توجد تنبيهات سلوكية
                </Typography>
              </CardContent>
            ) : (
              <List>
                {behaviorAlerts.map((alert, idx) => (
                  <ListItem
                    key={alert.id}
                    sx={{
                      borderBottom:
                        idx < behaviorAlerts.length - 1 ? "1px solid" : "none",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                    }}
                  >
                    <Box sx={{ mr: 2 }}>
                      {alert.severity === "positive" ? (
                        <CheckCircle sx={{ color: "#059669" }} />
                      ) : (
                        <Warning
                          sx={{
                            color:
                              alert.severity === "high" ? "#dc2626" : "#f59e0b",
                          }}
                        />
                      )}
                    </Box>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          {alert.message}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#64748b" : "text.secondary",
                          }}
                        >
                          {alert.date}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        )}

        {/* Tab 4: Grades Record */}
        {activeTab === 4 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: darkMode ? "#0f172a" : "#f9fafb" }}>
                    <TableCell
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      الأسبوع
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      الواجبات
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      الاختبارات
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      المشاركة
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gradesRecord.map((record, idx) => (
                    <TableRow key={idx}>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 600,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {record.week}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {record.assignment}%
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {record.quiz}%
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {record.participation}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {/* Tab 5: Attendance Record */}
        {activeTab === 5 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <List>
              {attendanceRecord.map((record, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    borderBottom:
                      idx < attendanceRecord.length - 1 ? "1px solid" : "none",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    {record.attended ? (
                      <CheckCircle sx={{ color: "#059669" }} />
                    ) : (
                      <Cancel sx={{ color: "#dc2626" }} />
                    )}
                  </Box>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontFamily="Cairo, sans-serif"
                        fontWeight={600}
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {record.session}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#64748b" : "text.secondary" }}
                      >
                        {record.date}
                      </Typography>
                    }
                  />
                  <Chip
                    label={record.attended ? "حاضر" : "غائب"}
                    size="small"
                    sx={{
                      bgcolor: record.attended ? "#f0fdf4" : "#fef2f2",
                      color: record.attended ? "#059669" : "#dc2626",
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 700,
                    }}
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

export default CourseDetails;
