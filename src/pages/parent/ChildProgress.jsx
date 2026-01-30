// frontend/src/pages/parent/ChildProgress.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
  Button,
} from "@mui/material";
import {
  ArrowBack,
  TrendingUp,
  TrendingDown,
  Warning,
  School,
  Assignment,
  EventAvailable,
} from "@mui/icons-material";

const ChildProgress = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  // Mock Data - استبدلها بـ API calls
  const children = [
    {
      id: "child-1",
      name: "أحمد محمد",
      grade: "الصف الأول الثانوي",
      avatar: "أ",
      totalCourses: 4,
      averageGrade: 85,
      attendance: 92,
      pendingAssignments: 2,
      upcomingExams: 1,
      behaviorAlerts: 0,
    },
    {
      id: "child-2",
      name: "فاطمة محمد",
      grade: "الصف الثالث الثانوي",
      avatar: "ف",
      totalCourses: 5,
      averageGrade: 78,
      attendance: 88,
      pendingAssignments: 4,
      upcomingExams: 2,
      behaviorAlerts: 1,
    },
    {
      id: "child-3",
      name: "محمد علي",
      grade: "الصف الثاني الثانوي",
      avatar: "م",
      totalCourses: 4,
      averageGrade: 92,
      attendance: 95,
      pendingAssignments: 1,
      upcomingExams: 1,
      behaviorAlerts: 0,
    },
  ];

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => navigate("/parent/dashboard")}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h5"
              fontWeight={900}
              fontFamily="Cairo, sans-serif"
            >
              متابعة الأبناء
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Summary Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#2563eb", mb: 1 }}
                >
                  {children.length}
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  إجمالي الأبناء
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "#059669", mb: 1 }}
                >
                  {Math.round(
                    children.reduce(
                      (sum, child) => sum + child.averageGrade,
                      0,
                    ) / children.length,
                  )}
                  %
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  متوسط الدرجات
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{
                    color:
                      children.reduce(
                        (sum, child) => sum + child.behaviorAlerts,
                        0,
                      ) > 0
                        ? "#dc2626"
                        : "#059669",
                    mb: 1,
                  }}
                >
                  {children.reduce(
                    (sum, child) => sum + child.behaviorAlerts,
                    0,
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  fontWeight={600}
                  sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                >
                  التنبيهات السلوكية
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Children Cards */}
        <Grid container spacing={3}>
          {children.map((child) => (
            <Grid item xs={12} lg={6} key={child.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: darkMode ? "#334155" : "#e5e7eb",
                  bgcolor: darkMode ? "#1e293b" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#2563eb",
                    transform: "translateY(-4px)",
                    boxShadow: darkMode
                      ? "0 10px 20px rgba(0,0,0,0.3)"
                      : "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => navigate(`/parent/child/${child.id}`)}
              >
                {/* Child Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "#2563eb",
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 900,
                        fontSize: "1.5rem",
                      }}
                    >
                      {child.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {child.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#64748b" : "text.secondary" }}
                      >
                        {child.grade}
                      </Typography>
                    </Box>
                  </Box>

                  {child.behaviorAlerts > 0 && (
                    <Chip
                      icon={<Warning />}
                      label={`${child.behaviorAlerts} تنبيه`}
                      size="small"
                      sx={{
                        bgcolor: "#fef2f2",
                        color: "#dc2626",
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Box>

                {/* Stats Grid */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1.5,
                        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                        borderRadius: 2,
                      }}
                    >
                      <School
                        sx={{ fontSize: 28, color: "#7c3aed", mb: 0.5 }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {child.totalCourses}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                      >
                        كورسات
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1.5,
                        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                        borderRadius: 2,
                      }}
                    >
                      <Assignment
                        sx={{ fontSize: 28, color: "#f59e0b", mb: 0.5 }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {child.pendingAssignments}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                      >
                        واجبات
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1.5,
                        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                        borderRadius: 2,
                      }}
                    >
                      <EventAvailable
                        sx={{ fontSize: 28, color: "#2563eb", mb: 0.5 }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {child.upcomingExams}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                      >
                        اختبارات
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1.5,
                        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                        borderRadius: 2,
                      }}
                    >
                      {child.averageGrade >= 80 ? (
                        <TrendingUp
                          sx={{ fontSize: 28, color: "#059669", mb: 0.5 }}
                        />
                      ) : (
                        <TrendingDown
                          sx={{ fontSize: 28, color: "#dc2626", mb: 0.5 }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        {child.attendance}%
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                      >
                        حضور
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Progress Bar */}
                <Box>
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
                      sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                    >
                      متوسط الدرجات
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      fontWeight={900}
                      sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      {child.averageGrade}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={child.averageGrade}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: darkMode ? "#334155" : "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor:
                          child.averageGrade >= 80
                            ? "#059669"
                            : child.averageGrade >= 60
                              ? "#f59e0b"
                              : "#dc2626",
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ChildProgress;
