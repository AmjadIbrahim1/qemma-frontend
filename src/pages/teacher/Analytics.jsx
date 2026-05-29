// frontend/src/pages/teacher/Analytics.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import api from "../../services/api";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  CheckCircle,
  School,
  BarChart as BarChartIcon,
  Download,
  Refresh,
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

  // ── Filter State ────────────────────────────────────────────────
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // ── Data State ──────────────────────────────────────────────────
  const [report, setReport]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  // ── Fetch teacher report ────────────────────────────────────────
  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/analytics/teacher");
      setReport(res.data?.data || null);
    } catch (err) {
      setError("تعذّر تحميل البيانات. يرجى المحاولة مرة أخرى.");
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  // ── Derived data from report ────────────────────────────────────
  const summary          = report?.summary          || {};
  const enrollmentTrend  = report?.enrollmentTrend  || [];
  const scoreDist        = report?.scoreDist        || [];
  const topStudents      = report?.topStudents      || [];
  const coursePerformance = report?.coursePerformance || [];

  // Summary cards config (built from real data)
  const statCards = [
    {
      title: "إجمالي الطلاب",
      value: summary.totalStudents ?? "—",
      change: null,
      trend: "up",
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#2563eb",
      bgColor: "#eff6ff",
    },
    {
      title: "الاختبارات المنشورة",
      value: summary.totalExams ?? "—",
      change: null,
      trend: "up",
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: "#7c3aed",
      bgColor: "#f5f3ff",
    },
    {
      title: "معدل النجاح",
      value: summary.passRate != null ? `${summary.passRate}%` : "—",
      change: null,
      trend: summary.passRate >= 70 ? "up" : "down",
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: "#059669",
      bgColor: "#ecfdf5",
    },
    {
      title: "متوسط الدرجات",
      value: summary.avgScore ?? "—",
      change: null,
      trend: summary.avgScore >= 70 ? "up" : "down",
      icon: <School sx={{ fontSize: 40 }} />,
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
  ];

  const periods = [
    { value: "week",    label: "آخر أسبوع" },
    { value: "month",   label: "آخر شهر" },
    { value: "quarter", label: "آخر 3 أشهر" },
    { value: "year",    label: "آخر سنة" },
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

        {/* ── Header ─────────────────────────────────────────────── */}
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
                  background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
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
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  تابع أداء طلابك وتحليلات شاملة
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
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
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: darkMode ? "#334155" : undefined },
                    "& .MuiSelect-select": { color: darkMode ? "#f1f5f9" : undefined },
                  }}
                >
                  {periods.map((p) => (
                    <MenuItem key={p.value} value={p.value} sx={{ fontFamily: "Cairo, sans-serif" }}>
                      {p.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchReport}
                sx={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 700,
                  borderColor: darkMode ? "#334155" : undefined,
                  color: darkMode ? "#f1f5f9" : "inherit",
                }}
              >
                تحديث
              </Button>

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

        {/* ── Error Banner ───────────────────────────────────────── */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* ── Loading Overlay ────────────────────────────────────── */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress size={48} />
          </Box>
        )}

        {!loading && (
          <>
            {/* ── Summary Cards ────────────────────────────────────── */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statCards.map((stat, index) => (
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
                          icon={stat.trend === "up" ? <TrendingUp /> : <TrendingDown />}
                          label={stat.trend === "up" ? "↑" : "↓"}
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

            {/* ── Charts Row 1 ─────────────────────────────────────── */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Enrollment Trend Line Chart */}
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
                      تطور التسجيلات (آخر 6 أشهر)
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={enrollmentTrend}>
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
                        <Legend wrapperStyle={{ fontFamily: "Cairo, sans-serif" }} />
                        <Line
                          type="monotone"
                          dataKey="students"
                          stroke="#2563eb"
                          strokeWidth={3}
                          name="الطلاب المسجلون"
                          dot={{ fill: "#2563eb", r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Score Distribution Pie Chart */}
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
                    {scoreDist.every((s) => s.value === 0) ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                        <Typography fontFamily="Cairo, sans-serif" color="text.secondary">
                          لا توجد بيانات كافية
                        </Typography>
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={scoreDist}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {scoreDist.map((entry, index) => (
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
                    )}
                    <Box sx={{ mt: 2 }}>
                      {scoreDist.map((item, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: item.color,
                              flexShrink: 0,
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

            {/* ── Charts Row 2 ─────────────────────────────────────── */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Course / Grade Performance Bar Chart */}
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
                      توزيع الطلاب على الكورسات
                    </Typography>
                    {coursePerformance.length === 0 ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                        <Typography fontFamily="Cairo, sans-serif" color="text.secondary">
                          لا توجد كورسات بعد
                        </Typography>
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={coursePerformance}>
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
                    )}
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
                    {topStudents.length === 0 ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
                        <Typography fontFamily="Cairo, sans-serif" color="text.secondary">
                          لا توجد بيانات بعد
                        </Typography>
                      </Box>
                    ) : (
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
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Chip
                                label={index + 1}
                                size="small"
                                sx={{
                                  bgcolor:
                                    index === 0 ? "#fbbf24"
                                    : index === 1 ? "#94a3b8"
                                    : index === 2 ? "#c2410c"
                                    : darkMode ? "#334155" : "#e5e7eb",
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
                                  sx={{ color: darkMode ? "#64748b" : "text.secondary" }}
                                >
                                  {student.examsCount} اختبار
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                              label={`${student.avgScore}`}
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
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* ── Course Performance Table ──────────────────────────── */}
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
                  أداء الكورسات
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {["الكورس", "عدد الطلاب", "عدد الاختبارات", "الدروس", "الأداء"].map((h) => (
                          <TableCell
                            key={h}
                            align={h === "الكورس" ? "left" : "center"}
                            sx={{
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 700,
                              color: darkMode ? "#f1f5f9" : "inherit",
                            }}
                          >
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {coursePerformance.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                            <Typography fontFamily="Cairo, sans-serif" color="text.secondary">
                              لا توجد بيانات لعرضها
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        coursePerformance.map((course, index) => (
                          <TableRow
                            key={index}
                            sx={{ "&:hover": { bgcolor: darkMode ? "#0f172a" : "#f9fafb" } }}
                          >
                            <TableCell
                              sx={{
                                fontFamily: "Cairo, sans-serif",
                                color: darkMode ? "#f1f5f9" : "inherit",
                              }}
                            >
                              {course.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Cairo, sans-serif",
                                color: darkMode ? "#94a3b8" : "text.secondary",
                              }}
                            >
                              {course.students}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Cairo, sans-serif",
                                color: darkMode ? "#94a3b8" : "text.secondary",
                              }}
                            >
                              {course.exams ?? "—"}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Cairo, sans-serif",
                                color: darkMode ? "#94a3b8" : "text.secondary",
                              }}
                            >
                              {course.lessons ?? "—"}
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ width: "100%", px: 2 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min(
                                    100,
                                    summary.totalStudents
                                      ? Math.round((course.students / summary.totalStudents) * 100)
                                      : 0
                                  )}
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: darkMode ? "#334155" : "#e5e7eb",
                                    "& .MuiLinearProgress-bar": {
                                      bgcolor: "#7c3aed",
                                      borderRadius: 4,
                                    },
                                  }}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Analytics;