// frontend/src/pages/teacher/Analytics.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
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
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  CheckCircle,
  Cancel,
  School,
  BarChart as BarChartIcon,
  Download,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock Data - استبدلها بـ API calls
  const stats = [
    {
      title: "إجمالي الطلاب",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#2563eb",
      bgColor: "#eff6ff",
    },
    {
      title: "الاختبارات المنشورة",
      value: "24",
      change: "+8",
      trend: "up",
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: "#7c3aed",
      bgColor: "#f5f3ff",
    },
    {
      title: "معدل النجاح",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: "#059669",
      bgColor: "#ecfdf5",
    },
    {
      title: "متوسط الدرجات",
      value: "78.5",
      change: "-2%",
      trend: "down",
      icon: <School sx={{ fontSize: 40 }} />,
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
  ];

  // Student Performance Data
  const studentPerformanceData = [
    { month: "يناير", average: 72 },
    { month: "فبراير", average: 75 },
    { month: "مارس", average: 78 },
    { month: "أبريل", average: 76 },
    { month: "مايو", average: 80 },
    { month: "يونيو", average: 82 },
  ];

  // التعديل هنا: تم تغيير البيانات لتصبح صفوف دراسية لنفس المادة
  const courseEnrollmentData = [
    { name: "الصف الأول", students: 45 },
    { name: "الصف الثاني", students: 58 },
    { name: "الصف الثالث", students: 53 },
  ];

  // Exam Results Distribution
  const examResultsData = [
    { name: "ممتاز (90-100)", value: 25, color: "#059669" },
    { name: "جيد جداً (80-89)", value: 35, color: "#2563eb" },
    { name: "جيد (70-79)", value: 28, color: "#f59e0b" },
    { name: "مقبول (60-69)", value: 10, color: "#dc2626" },
    { name: "راسب (<60)", value: 2, color: "#991b1b" },
  ];

  // Top Students
  const topStudents = [
    { name: "إسماعيل أحمد", score: 95, exams: 12, avatar: "إ" },
    { name: "أمجد إبراهيم", score: 93, exams: 12, avatar: "أ" },
    { name: "بلال سمير", score: 91, exams: 11, avatar: "ب" },
    { name: "سارة أحمد", score: 89, exams: 12, avatar: "س" },
    { name: "يوسف خالد", score: 87, exams: 10, avatar: "ي" },
  ];

  // Recent Exams
  const recentExams = [
    {
      title: "اختبار الجبر - الفصل 1",
      students: 42,
      avgScore: 78,
      date: "2025-01-20",
    },
    { title: "اختبار الهندسة", students: 45, avgScore: 82, date: "2025-01-18" },
    {
      title: "اختبار التفاضل والتكامل",
      students: 38,
      avgScore: 75,
      date: "2025-01-15",
    },
    { title: "اختبار الإحصاء", students: 40, avgScore: 80, date: "2025-01-12" },
  ];

  const courses = [
    { value: "all", label: "جميع الصفوف" },
    { value: "grade1", label: "الصف الأول الثانوي" },
    { value: "grade2", label: "الصف الثاني الثانوي" },
    { value: "grade3", label: "الصف الثالث الثانوي" },
  ];

  const periods = [
    { value: "week", label: "آخر أسبوع" },
    { value: "month", label: "آخر شهر" },
    { value: "quarter", label: "آخر 3 أشهر" },
    { value: "year", label: "آخر سنة" },
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <BarChartIcon />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  الإحصائيات والتحليلات
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  تابع أداء طلابك وتحليلات شاملة
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    color: darkMode ? "#94a3b8" : undefined,
                  }}
                >
                  الصف الدراسي
                </InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="الصف الدراسي"
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    bgcolor: darkMode ? "#1e293b" : "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#334155" : undefined,
                    },
                    "& .MuiSelect-select": {
                      color: darkMode ? "#f1f5f9" : undefined,
                    },
                  }}
                >
                  {courses.map((course) => (
                    <MenuItem
                      key={course.value}
                      value={course.value}
                      sx={{ fontFamily: "Cairo, sans-serif" }}
                    >
                      {course.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    color: darkMode ? "#94a3b8" : undefined,
                  }}
                >
                  الفترة
                </InputLabel>
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  label="الفترة"
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    bgcolor: darkMode ? "#1e293b" : "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#334155" : undefined,
                    },
                    "& .MuiSelect-select": {
                      color: darkMode ? "#f1f5f9" : undefined,
                    },
                  }}
                >
                  {periods.map((period) => (
                    <MenuItem
                      key={period.value}
                      value={period.value}
                      sx={{ fontFamily: "Cairo, sans-serif" }}
                    >
                      {period.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 700,
                  borderColor: darkMode ? "#334155" : undefined,
                  color: darkMode ? "#f1f5f9" : "inherit",
                }}
              >
                تصدير التقرير
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: darkMode ? "#334155" : "#e5e7eb",
                  bgcolor: darkMode ? "#1e293b" : "white",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: darkMode
                      ? "0 10px 20px rgba(0,0,0,0.3)"
                      : "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: darkMode ? stat.color + "20" : stat.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Chip
                      icon={
                        stat.trend === "up" ? <TrendingUp /> : <TrendingDown />
                      }
                      label={stat.change}
                      size="small"
                      sx={{
                        bgcolor: stat.trend === "up" ? "#ecfdf5" : "#fef2f2",
                        color: stat.trend === "up" ? "#059669" : "#dc2626",
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ mb: 0.5, color: darkMode ? "#f1f5f9" : "inherit" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Cairo, sans-serif"
                    fontWeight={600}
                    sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                  >
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Row 1 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Student Performance Trend */}
          <Grid item xs={12} lg={8}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  تطور أداء الطلاب
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentPerformanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={darkMode ? "#334155" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="month"
                      stroke={darkMode ? "#94a3b8" : "#6b7280"}
                      style={{ fontFamily: "Cairo, sans-serif" }}
                    />
                    <YAxis
                      stroke={darkMode ? "#94a3b8" : "#6b7280"}
                      style={{ fontFamily: "Cairo, sans-serif" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1e293b" : "white",
                        border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        fontFamily: "Cairo, sans-serif",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontFamily: "Cairo, sans-serif" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#2563eb"
                      strokeWidth={3}
                      name="متوسط الدرجات"
                      dot={{ fill: "#2563eb", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Exam Results Distribution */}
          <Grid item xs={12} lg={4}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  توزيع النتائج
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={examResultsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {examResultsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1e293b" : "white",
                        border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        fontFamily: "Cairo, sans-serif",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {examResultsData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: item.color,
                        }}
                      />
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Row 2 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Course Enrollment - التعديل هنا في العرض */}
          <Grid item xs={12} lg={6}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  توزيع الطلاب على الصفوف الدراسية
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseEnrollmentData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={darkMode ? "#334155" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={darkMode ? "#94a3b8" : "#6b7280"}
                      style={{ fontFamily: "Cairo, sans-serif" }}
                    />
                    <YAxis
                      stroke={darkMode ? "#94a3b8" : "#6b7280"}
                      style={{ fontFamily: "Cairo, sans-serif" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1e293b" : "white",
                        border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        fontFamily: "Cairo, sans-serif",
                      }}
                    />
                    <Bar
                      dataKey="students"
                      fill="#7c3aed"
                      radius={[8, 8, 0, 0]}
                      name="عدد الطلاب"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Students */}
          <Grid item xs={12} lg={6}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  أفضل الطلاب
                </Typography>
                <Box>
                  {topStudents.map((student, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                        border: "1px solid",
                        borderColor: darkMode ? "#334155" : "#e5e7eb",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Chip
                          label={index + 1}
                          size="small"
                          sx={{
                            bgcolor:
                              index === 0
                                ? "#fbbf24"
                                : index === 1
                                  ? "#94a3b8"
                                  : index === 2
                                    ? "#c2410c"
                                    : darkMode
                                      ? "#334155"
                                      : "#e5e7eb",
                            color: "white",
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 900,
                          }}
                        />
                        <Avatar
                          sx={{
                            bgcolor: "#2563eb",
                            width: 40,
                            height: 40,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 900,
                          }}
                        >
                          {student.avatar}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                          >
                            {student.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{
                              color: darkMode ? "#64748b" : "text.secondary",
                            }}
                          >
                            {student.exams} اختبار
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={`${student.score}%`}
                        sx={{
                          bgcolor: "#ecfdf5",
                          color: "#059669",
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 900,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Exams Table */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            bgcolor: darkMode ? "#1e293b" : "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
              sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
            >
              الاختبارات الأخيرة
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      الاختبار
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      عدد الطلاب
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      المتوسط
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      التاريخ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                        color: darkMode ? "#f1f5f9" : "inherit",
                      }}
                    >
                      الأداء
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentExams.map((exam, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {exam.title}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : "text.secondary",
                        }}
                      >
                        {exam.students}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {exam.avgScore}%
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#64748b" : "text.secondary",
                        }}
                      >
                        {exam.date}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ width: "100%", px: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={exam.avgScore}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: darkMode ? "#334155" : "#e5e7eb",
                              "& .MuiLinearProgress-bar": {
                                bgcolor:
                                  exam.avgScore >= 85
                                    ? "#059669"
                                    : exam.avgScore >= 70
                                      ? "#2563eb"
                                      : "#f59e0b",
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Analytics;