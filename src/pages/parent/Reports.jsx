// frontend/src/pages/parent/Reports.jsx
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
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Chip,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  Download,
  TrendingUp,
  TrendingDown,
  CompareArrows,
  Assessment,
  School,
  Assignment,
  EmojiEvents,
} from "@mui/icons-material";

const Reports = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [reportType, setReportType] = useState("overall");
  const [selectedChild, setSelectedChild] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  // Mock Data - All Children
  const allChildrenData = [
    {
      id: "child-1",
      name: "أحمد محمد",
      avatar: "أ",
      averageGrade: 85,
      attendance: 92,
      completedAssignments: 28,
      totalAssignments: 32,
      rank: 2,
      trend: "up",
    },
    {
      id: "child-2",
      name: "فاطمة محمد",
      avatar: "ف",
      averageGrade: 78,
      attendance: 88,
      completedAssignments: 24,
      totalAssignments: 30,
      rank: 3,
      trend: "down",
    },
    {
      id: "child-3",
      name: "محمد علي",
      avatar: "م",
      averageGrade: 92,
      attendance: 95,
      completedAssignments: 30,
      totalAssignments: 32,
      rank: 1,
      trend: "up",
    },
  ];

  // Filter Children based on selection
  const children =
    selectedChild === "all"
      ? allChildrenData
      : allChildrenData.filter((child) => child.id === selectedChild);

  // Performance Comparison Data
  const allPerformanceData = [
    { subject: "الرياضيات", "child-1": 88, "child-2": 82, "child-3": 95 },
    { subject: "الفيزياء", "child-1": 85, "child-2": 75, "child-3": 90 },
    { subject: "الكيمياء", "child-1": 82, "child-2": 80, "child-3": 88 },
    {
      subject: "اللغة الإنجليزية",
      "child-1": 86,
      "child-2": 76,
      "child-3": 94,
    },
  ];

  // Filter performance data based on selected children
  const performanceData = allPerformanceData.map((subject) => {
    const filtered = { subject: subject.subject };
    children.forEach((child) => {
      filtered[child.id] = subject[child.id];
    });
    return filtered;
  });

  // Stats Summary - Calculated from filtered children
  const statsData = {
    totalCourses: children.reduce((sum, child) => sum + 4, 0),
    avgGrade:
      children.length > 0
        ? Math.round(
            children.reduce((sum, child) => sum + child.averageGrade, 0) /
              children.length,
          )
        : 0,
    avgAttendance:
      children.length > 0
        ? Math.round(
            children.reduce((sum, child) => sum + child.attendance, 0) /
              children.length,
          )
        : 0,
    totalAssignments: children.reduce(
      (sum, child) => sum + child.completedAssignments,
      0,
    ),
  };

  const handleExportPDF = () => {
    alert("سيتم تصدير التقرير كـ PDF قريباً...");
  };

  const getChildColor = (index) => {
    const colors = ["#2563eb", "#7c3aed", "#059669", "#f59e0b", "#dc2626"];
    return colors[index % colors.length];
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => navigate("/parent/dashboard")}
              >
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                >
                  التقارير والإحصائيات
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{ opacity: 0.9 }}
                >
                  تقارير شاملة عن أداء الأبناء
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExportPDF}
              sx={{
                bgcolor: "white",
                color: "#2563eb",
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#f1f5f9",
                },
              }}
            >
              تصدير PDF
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontFamily: "Cairo, sans-serif" }}>
                نوع التقرير
              </InputLabel>
              <Select
                value={reportType}
                label="نوع التقرير"
                onChange={(e) => setReportType(e.target.value)}
                sx={{ fontFamily: "Cairo, sans-serif" }}
              >
                <MenuItem
                  value="overall"
                  sx={{ fontFamily: "Cairo, sans-serif" }}
                >
                  شامل
                </MenuItem>
                <MenuItem
                  value="academic"
                  sx={{ fontFamily: "Cairo, sans-serif" }}
                >
                  أكاديمي
                </MenuItem>
                <MenuItem
                  value="attendance"
                  sx={{ fontFamily: "Cairo, sans-serif" }}
                >
                  الحضور
                </MenuItem>
                <MenuItem
                  value="comparison"
                  sx={{ fontFamily: "Cairo, sans-serif" }}
                >
                  مقارنة
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontFamily: "Cairo, sans-serif" }}>
                الطالب
              </InputLabel>
              <Select
                value={selectedChild}
                label="الطالب"
                onChange={(e) => setSelectedChild(e.target.value)}
                sx={{ fontFamily: "Cairo, sans-serif" }}
              >
                <MenuItem value="all" sx={{ fontFamily: "Cairo, sans-serif" }}>
                  الكل
                </MenuItem>
                {allChildrenData.map((child) => (
                  <MenuItem
                    key={child.id}
                    value={child.id}
                    sx={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    {child.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontFamily: "Cairo, sans-serif" }}>
                الفترة الزمنية
              </InputLabel>
              <Select
                value={timeRange}
                label="الفترة الزمنية"
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{ fontFamily: "Cairo, sans-serif" }}
              >
                <MenuItem value="week" sx={{ fontFamily: "Cairo, sans-serif" }}>
                  هذا الأسبوع
                </MenuItem>
                <MenuItem
                  value="month"
                  sx={{ fontFamily: "Cairo, sans-serif" }}
                >
                  هذا الشهر
                </MenuItem>
                <MenuItem
                  value="semester"
                  sx={{ fontFamily: "Cairo, sans-serif" }}
                >
                  الفصل الدراسي
                </MenuItem>
                <MenuItem value="year" sx={{ fontFamily: "Cairo, sans-serif" }}>
                  السنة الدراسية
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <School sx={{ fontSize: 40, color: "#7c3aed", mb: 1 }} />
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  {statsData.totalCourses}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  إجمالي الكورسات
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Assessment sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  {statsData.avgGrade}%
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  متوسط الدرجات
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <TrendingUp sx={{ fontSize: 40, color: "#059669", mb: 1 }} />
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  {statsData.avgAttendance}%
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  متوسط الحضور
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Assignment sx={{ fontSize: 40, color: "#f59e0b", mb: 1 }} />
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  {statsData.totalAssignments}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  واجبات مكتملة
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Children Comparison */}
        {children.length > 0 ? (
          <Card
            elevation={0}
            sx={{
              mb: 4,
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <CompareArrows sx={{ color: "#2563eb" }} />
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  {selectedChild === "all"
                    ? "مقارنة بين الأبناء"
                    : "تفاصيل الطالب"}
                </Typography>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{ bgcolor: darkMode ? "#0f172a" : "#f9fafb" }}
                    >
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        الطالب
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        المتوسط
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        الحضور
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
                        الترتيب
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        الاتجاه
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {children.map((child, index) => (
                      <TableRow key={child.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: getChildColor(index),
                                fontFamily: "Cairo, sans-serif",
                                fontWeight: 900,
                              }}
                            >
                              {child.avatar}
                            </Avatar>
                            <Typography
                              variant="body2"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={600}
                              sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                            >
                              {child.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="body2"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={700}
                              sx={{
                                mb: 0.5,
                                color: darkMode ? "#f1f5f9" : "inherit",
                              }}
                            >
                              {child.averageGrade}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={child.averageGrade}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: darkMode ? "#334155" : "#e5e7eb",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor:
                                    child.averageGrade >= 80
                                      ? "#059669"
                                      : "#f59e0b",
                                  borderRadius: 3,
                                },
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            fontWeight={600}
                            sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                          >
                            {child.attendance}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                          >
                            {child.completedAssignments}/
                            {child.totalAssignments}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<EmojiEvents />}
                            label={`#${child.rank}`}
                            size="small"
                            sx={{
                              bgcolor: child.rank === 1 ? "#fef3c7" : "#f3f4f6",
                              color: child.rank === 1 ? "#f59e0b" : "#6b7280",
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 700,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {child.trend === "up" ? (
                            <TrendingUp sx={{ color: "#059669" }} />
                          ) : (
                            <TrendingDown sx={{ color: "#dc2626" }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ):null}
        
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            bgcolor: darkMode ? "#1e293b" : "white",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Assessment sx={{ color: "#7c3aed" }} />
              <Typography
                variant="h6"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
              >
                الأداء حسب المادة
              </Typography>
            </Box>

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
                      المادة
                    </TableCell>
                    {children.map((child, idx) => (
                      <TableCell
                        key={child.id}
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {child.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {performanceData.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 600,
                          color: darkMode ? "#f1f5f9" : "inherit",
                        }}
                      >
                        {subject.subject}
                      </TableCell>
                      {children.map((child) => (
                        <TableCell key={child.id}>
                          <Chip
                            label={`${subject[child.id]}%`}
                            size="small"
                            sx={{
                              bgcolor:
                                subject[child.id] >= 80 ? "#f0fdf4" : "#fffbeb",
                              color:
                                subject[child.id] >= 80 ? "#059669" : "#f59e0b",
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 700,
                            }}
                          />
                        </TableCell>
                      ))}
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

export default Reports;
