// pages/student/StudentDashboard.jsx - FIXED: Golden Contests for Grade 3
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  ListItemIcon,
  ListItemText,
  Button,
  Checkbox,
  LinearProgress,
  Fab,
} from "@mui/material";
import {
  NotificationsRounded,
  MoreVert,
  ExitToApp,
  Person,
  SettingsRounded,
  SchoolRounded,
  QuizRounded,
  ChatRounded,
  VideoCallRounded,
  HomeRounded,
  AssignmentTurnedInRounded,
  VideocamRounded,
  GradeRounded,
  AccessTimeRounded,
  TrendingUpRounded,
  TrendingDownRounded,
  WarningAmberRounded,
  AssignmentLateRounded,
  ArrowBackRounded,
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
  PlayCircleFilledRounded,
  PeopleRounded,
  ChevronRightRounded,
  ChevronLeftRounded,
  CloudUploadRounded,
  MenuBookRounded,
  AssessmentRounded,
  StarRounded,
  SmartToyRounded,
  CloseRounded,
  AutoAwesome,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  EmojiEvents as EmojiEventsIcon,
  AutoStoriesRounded
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ThemeContext from "../../contexts/ThemeContext";
import studentsService from '../../services/students.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTooltip,
  Legend,
  Filler,
);

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  primary: "#2563eb",
  secondary: "#7c3aed",
  accent: "#db2777",
  success: "#059669",
  warning: "#f59e0b",
  error: "#ef4444",
  contest: "#f59e0b",
};
const GRADIENTS = {
  main: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)",
  blue: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  purple: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
  green: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  contest: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
};
const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
const arabicDays = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];

const getInitials = (name) =>
  name
    ? name.split(" ").length >= 2
      ? name.split(" ")[0][0] + name.split(" ")[1][0]
      : name[0]
    : "U";

const HEADER_STATS_CONFIG = {
  avgGrade: { icon: StarIcon, color: "#f59e0b" },
  homework: { icon: CheckCircleIcon, color: "#059669" },
  attendance: { icon: SchoolIcon, color: "#2563eb" },
  studyTime: { icon: AccessTimeIcon, color: "#7c3aed" },
};

// ═══════════════════════════════════════════════════════════════════
// CONFIG DATA - FIXED: Golden Contests for Grade 3 with Specializations
// ═══════════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  {
    icon: <HomeRounded />,
    label: "الرئيسية",
    path: "/student",
    color: COLORS.primary,
  },
  {
    icon: <SchoolRounded />,
    label: "كورساتي",
    path: "/student/courses",
    color: COLORS.secondary,
  },
  {
    icon: <QuizRounded />,
    label: "الاختبارات",
    path: "/student/exams",
    color: COLORS.success,
  },
  {
    icon: <VideoCallRounded />,
    label: "الحصص المباشرة",
    path: "/student/live-class",
    color: COLORS.accent,
  },
  
  {
    icon: <EmojiEventsIcon />,
    label: "المسابقات الذهبية",
    path: "/student/contests/dashboard",
    color: COLORS.contest,
  },
  {
    icon: <AssignmentTurnedInRounded />,
    label: "المهام",
    path: "/student/tasks",
    color: '#0891b2',
  },
];

const QUICK_ACTIONS = [
  {
    id: 1,
    label: "ابدأ التمرين",
    icon: PlayCircleFilledRounded,
    color: COLORS.primary,
    path: "/student/exams",
  },
  {
    id: 2,
    label: "سلّم الواجب",
    icon: CloudUploadRounded,
    color: COLORS.secondary,
    path: "/student/submit-assignment",
  },
  {
    id: 3,
    label: "انضم للحصة",
    icon: VideoCallRounded,
    color: COLORS.accent,
    path: "/student/live-class",
  },
  {
    id: 4,
    label: "اسأل المساعد",
    icon: ChatRounded,
    color: COLORS.success,
    path: "/student/assistant",
    isAssistant: true,
  },
  {
    id: 5,
    label: "مكتبة المواد",
    icon: MenuBookRounded,
    color: COLORS.warning,
    path: "/student/courses",
  },
  {
    id: 6,
    label: "تقرير الأداء",
    icon: AssessmentRounded,
    color: COLORS.error,
    path: "/student/performance",
  },
  {
    id: 7,
    label: "المسابقات الذهبية",
    icon: EmojiEventsIcon,
    color: COLORS.contest,
    path: "/student/contests/dashboard",
  },
  {
    id: 8,
    label: "📚 الكتب الدراسية",
    icon: AutoStoriesRounded,
    color: "#0891b2",
    path: "/student/books",
  },
];

const ALERT_CONFIG = {
  exam: {
    icon: WarningAmberRounded,
    color: COLORS.error,
    bgColor: "#fef2f2",
    path: "/student/exams",
  },
  assignment: {
    icon: AssignmentLateRounded,
    color: COLORS.warning,
    bgColor: "#fffbeb",
    path: "/student/submit-assignment",
  },
  live: {
    icon: VideoCallRounded,
    color: COLORS.secondary,
    bgColor: "#f5f3ff",
    path: "/student/live-class",
  },
};

// Static mock data replaced by API — STRENGTHS & WEAKNESSES now from dashboard

// ═══════════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════════

const GlassCard = ({
  title,
  icon,
  children,
  actionLabel,
  onAction,
  darkMode,
}) => (
  <Box
    sx={{
      bgcolor: darkMode ? "#1e293b" : "white",
      borderRadius: 3,
      border: "1px solid",
      borderColor: darkMode ? "#334155" : "#e5e7eb",
      overflow: "hidden",
      transition: "all 0.3s",
      height: "100%",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: darkMode
          ? "0 10px 30px rgba(0,0,0,0.3)"
          : "0 10px 30px rgba(0,0,0,0.1)",
      },
    }}
  >
    <Box sx={{ height: 4, background: GRADIENTS.main }} />
    <Box sx={{ p: 3 }}>
      {title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
            pb: 2,
            borderBottom: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
            <Typography
              variant="h6"
              fontWeight={800}
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
            >
              {title}
            </Typography>
          </Box>
          {actionLabel && (
            <Button
              onClick={onAction}
              endIcon={<ArrowBackRounded />}
              sx={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: darkMode ? "#94a3b8" : "#64748b",
                bgcolor: darkMode ? "#334155" : "#f1f5f9",
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  bgcolor: darkMode ? "#475569" : "#e2e8f0",
                  color: COLORS.primary,
                },
              }}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      )}
      {children}
    </Box>
  </Box>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // ── Fetch full dashboard data from API ──────────────────────────
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await studentsService.getDashboard();
        const data = response?.data?.data || response?.data || response;
        setDashboardData(data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Extract all data from dashboard response with safe defaults
  const studentInfo     = dashboardData?.student || {};
  const headerStats     = (dashboardData?.kpis || []).map((stat) => ({
    ...stat,
    icon: HEADER_STATS_CONFIG[stat.type]?.icon || StarIcon,
    color: HEADER_STATS_CONFIG[stat.type]?.color || '#64748b',
  }));
  const badges          = dashboardData?.badges || [];
  const enrolledCourses = dashboardData?.enrolledCourses || [];
  const recentExams     = dashboardData?.recentExams || [];
  const liveSessions    = dashboardData?.liveSessions || [];
  const alerts          = dashboardData?.alerts || [];
  const tasks           = dashboardData?.tasks || [];
  const notifications   = dashboardData?.notifications || [];
  const chartApi        = dashboardData?.chart || {};
  const calendarEvents  = dashboardData?.calendarEvents || [];
  const strengths       = dashboardData?.strengths || [];
  const weaknesses      = dashboardData?.weaknesses || [];

  // Calendar
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isToday = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  const hasEvent = (d) =>
    calendarEvents.some(
      (e) =>
        e.date ===
        `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    );

  // Chart
  const chartData = {
    labels: chartApi.labels || [],
    datasets: [
      {
        label: "الدرجات",
        data: chartApi.grades || [],
        borderColor: COLORS.primary,
        backgroundColor: "rgba(37,99,235,0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: COLORS.primary,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: "ساعات الدراسة",
        data: chartApi.studyHours || [],
        borderColor: COLORS.success,
        backgroundColor: "rgba(5,150,105,0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: COLORS.success,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: { family: "Cairo, sans-serif", size: 12 },
          color: darkMode ? "#94a3b8" : "#64748b",
          padding: 15,
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        },
        ticks: {
          font: { family: "Cairo, sans-serif", size: 11 },
          color: darkMode ? "#94a3b8" : "#64748b",
        },
      },
      y: {
        grid: {
          color: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        },
        ticks: {
          font: { family: "Cairo, sans-serif", size: 11 },
          color: darkMode ? "#94a3b8" : "#64748b",
        },
      },
    },
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  const toggleTask = (id) => {
    setDashboardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      };
    });
  };
  const getGradeColor = (g) =>
    g >= 90
      ? COLORS.success
      : g >= 80
        ? COLORS.primary
        : g >= 70
          ? COLORS.secondary
          : COLORS.warning;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f8fafc",
        pb: 4,
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HEADER - Golden Contests Button */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Box
        sx={{ background: GRADIENTS.main, color: "white", py: 4, px: 2, mb: 3 }}
      >
        <Container maxWidth="xl">
          {/* User Info Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={studentInfo.avatar}
                  onClick={() => navigate("/profile")}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "white",
                    color: COLORS.secondary,
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    border: "4px solid rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  {getInitials(studentInfo.name)}
                </Avatar>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "white",
                    color: COLORS.secondary,
                    fontSize: 11,
                    fontWeight: 800,
                    px: 1.5,
                    py: 0.25,
                    borderRadius: 10,
                  }}
                >
                  {studentInfo.overallProgress}%
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                >
                  مرحباً، {studentInfo.firstName} 👋
                </Typography>
                <Typography
                  fontFamily="Cairo, sans-serif"
                  sx={{ opacity: 0.9, mb: 1 }}
                >
                  {studentInfo.gradeLevel || studentInfo.stream || ''}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {badges.slice(0, 3).map((b) => (
                    <Chip
                      key={b.id}
                      label={b.label}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
              <Tooltip title="المسابقات الذهبية">
                <IconButton
                  onClick={() => navigate("/student/contests/dashboard")}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(245,158,11,0.2)",
                    border: "2px solid rgba(245,158,11,0.3)",
                    "&:hover": {
                      bgcolor: "rgba(245,158,11,0.35)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <EmojiEventsIcon />
                </IconButton>
              </Tooltip>
              {NAV_ITEMS.slice(1, 4).map((item) => (
                <Tooltip key={item.path} title={item.label}>
                  <IconButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="الإشعارات">
                <IconButton
                  onClick={(e) => setNotifAnchor(e.currentTarget)}
                  sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
                >
                  <Badge
                    badgeContent={notifications.filter((n) => n.unread).length}
                    color="error"
                  >
                    <NotificationsRounded />
                  </Badge>
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
              >
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            {headerStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Grid item xs={6} sm={3} key={stat.id}>
                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 3,
                      p: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        bgcolor: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Icon sx={{ fontSize: 24 }} />
                      <Chip
                        icon={<TrendingUpRounded sx={{ fontSize: 14 }} />}
                        label={stat.change}
                        size="small"
                        sx={{
                          bgcolor: "#dcfce7",
                          color: "#059669",
                          fontWeight: 700,
                          fontFamily: "Cairo, sans-serif",
                          height: 22,
                          fontSize: 11,
                          "& .MuiChip-icon": { color: "#059669" },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ opacity: 0.9 }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* MAIN MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 240,
            borderRadius: 3,
            bgcolor: darkMode ? "#1e293b" : "#fff",
            border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 48, height: 48, bgcolor: COLORS.secondary }}>
              {getInitials(studentInfo.name)}
            </Avatar>
            <Box>
              <Typography
                fontWeight={700}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
              >
                {studentInfo.name}
              </Typography>
              <Typography
                variant="caption"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
              >
                {studentInfo.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        {NAV_ITEMS.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setAnchorEl(null);
            }}
            sx={{ py: 1.5 }}
          >
            <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 600,
                color: darkMode ? "#f1f5f9" : "#1e293b",
              }}
            />
          </MenuItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <MenuItem
          onClick={() => {
            navigate("/profile");
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <Person sx={{ color: COLORS.secondary }} />
          </ListItemIcon>
          <ListItemText
            primary="الملف الشخصي"
            primaryTypographyProps={{ fontFamily: "Cairo, sans-serif" }}
          />
        </MenuItem>

        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ color: COLORS.error }}>
          <ListItemIcon>
            <ExitToApp sx={{ color: COLORS.error }} />
          </ListItemIcon>
          <ListItemText
            primary="تسجيل الخروج"
            primaryTypographyProps={{ fontFamily: "Cairo, sans-serif" }}
          />
        </MenuItem>
      </Menu>

      {/* NOTIFICATIONS MENU */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={() => setNotifAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            borderRadius: 3,
            bgcolor: darkMode ? "#1e293b" : "#fff",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
          }}
        >
          <Typography
            fontWeight={700}
            fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
          >
            🔔 الإشعارات
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {[
            {
              text: "📝 تم رفع درجات الرياضيات",
              time: "منذ 5 دقائق",
              color: COLORS.primary,
              path: "/student/exams",
            },
            {
              text: "📚 واجب جديد في الفيزياء",
              time: "منذ ساعة",
              color: COLORS.warning,
              path: "/student/courses",
            },
            {
              text: "🎥 حصة الكيمياء بعد ساعتين",
              time: "منذ ساعتين",
              color: COLORS.accent,
              path: "/student/live-class",
            },
          ].map((n, i) => (
            <Box
              key={i}
              onClick={() => {
                setNotifAnchor(null);
                navigate(n.path);
              }}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: darkMode ? "#334155" : `${n.color}10`,
                borderRight: `3px solid ${n.color}`,
                mb: 1.5,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: darkMode ? "#475569" : `${n.color}20` },
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
              >
                {n.text}
              </Typography>
              <Typography
                variant="caption"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
              >
                {n.time}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            fontFamily="Cairo, sans-serif"
            sx={{ color: COLORS.primary, cursor: "pointer" }}
            onClick={() => {
              setNotifAnchor(null);
              navigate("/student/notifications");
            }}
          >
            عرض الكل
          </Typography>
        </Box>
      </Menu>

      {/* MAIN CONTENT */}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Golden Contest Dashboard Card with Grade 3 Specializations */}
              <GlassCard
                title="🏆 المسابقات الذهبية"
                icon="🥇"
                actionLabel="لوحة المسابقات"
                onAction={() => navigate("/student/contests/dashboard")}
                darkMode={darkMode}
              >
                <Box
                  onClick={() => navigate("/student/contests/dashboard")}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: GRADIENTS.contest,
                    color: "white",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(245, 158, 11, 0.4)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      left: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -30,
                      right: -30,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.08)",
                    }}
                  />

                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: "rgba(255,255,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EmojiEventsIcon sx={{ fontSize: 32 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            fontWeight={900}
                            fontFamily="Cairo, sans-serif"
                          >
                            تابع تقدمك في المسابقات الذهبية
                          </Typography>
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            sx={{ opacity: 0.9 }}
                          >
                            الصف الثالث الثانوي • جميع الشعب
                          </Typography>
                        </Box>
                      </Box>
                      <ArrowBackRounded sx={{ fontSize: 28 }} />
                    </Box>

                    {/* Grade 3 Specializations */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        mb: 3,
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip
                        label="علمي رياضة"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.25)",
                          color: "white",
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          px: 2,
                          py: 2.5,
                        }}
                      />
                      <Chip
                        label="علمي علوم"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.25)",
                          color: "white",
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          px: 2,
                          py: 2.5,
                        }}
                      />
                      <Chip
                        label="أدبي"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.25)",
                          color: "white",
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          px: 2,
                          py: 2.5,
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            textAlign: "center",
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(255,255,255,0.15)",
                          }}
                        >
                          <Typography
                            variant="h4"
                            fontWeight={900}
                            fontFamily="Cairo, sans-serif"
                          >
                            5
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                          >
                            مسابقات
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            textAlign: "center",
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(255,255,255,0.15)",
                          }}
                        >
                          <Typography
                            variant="h4"
                            fontWeight={900}
                            fontFamily="Cairo, sans-serif"
                          >
                            1547
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                          >
                            التقييم
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            textAlign: "center",
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(255,255,255,0.15)",
                          }}
                        >
                          <Typography
                            variant="h4"
                            fontWeight={900}
                            fontFamily="Cairo, sans-serif"
                          >
                            #12
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                          >
                            أفضل ترتيب
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </GlassCard>

              {/* Rest of the content remains the same... */}
              {/* Alerts */}
              {alerts?.length > 0 && loading === false && (
                <GlassCard
                  title="⚡ تنبيهات عاجلة"
                  icon="🔔"
                  darkMode={darkMode}
                >
                  {alerts.map((a) => {
                    const cfg = ALERT_CONFIG[a.type];
                    const Icon = cfg.icon;
                    return (
                      <Box
                        key={a.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: darkMode ? "#334155" : cfg.bgColor,
                          borderRight: `4px solid ${cfg.color}`,
                          mb: 1.5,
                          transition: "all 0.2s ease",
                          "&:hover": { transform: "translateX(-5px)" },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: cfg.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <Icon />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                          >
                            {a.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: cfg.color }}
                          >
                            {a.message}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          endIcon={<ArrowBackRounded />}
                          onClick={() => navigate(cfg.path)}
                          sx={{
                            bgcolor: cfg.color,
                            color: "white",
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            borderRadius: 2,
                            "&:hover": { bgcolor: cfg.color },
                          }}
                        >
                          {a.actionLabel}
                        </Button>
                      </Box>
                    );
                  })}
                </GlassCard>
              )}

              {/* Courses - Real data from API */}
              <GlassCard
                title="📚 كورساتي"
                icon="🎓"
                actionLabel="عرض الكل"
                onAction={() => navigate("/student/courses")}
                darkMode={darkMode}
              >
                {loading ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      جاري تحميل الكورسات...
                    </Typography>
                  </Box>
                ) : enrolledCourses.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
                      لم يتم التسجيل في أي كورس بعد
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/courses')}
                      sx={{
                        mt: 2,
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 700,
                        borderRadius: 2,
                        background: GRADIENTS.main,
                      }}
                    >
                      تصفح الكورسات
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {enrolledCourses.slice(0, 4).map((c, i) => {
                      const rating = c.rating || 4.5;
                      const completedLessons = c.completedLessons || Math.round((c.progress / 100) * (c.totalLessons || 10));
                      const color = [
                        COLORS.primary,
                        COLORS.secondary,
                        COLORS.success,
                        COLORS.accent,
                      ][i % 4];
                      return (
                        <Grid item xs={12} sm={6} key={c.id}>
                          <Card
                            elevation={0}
                            onClick={() => navigate(`/student/course/${c.id}`)}
                            sx={{
                              cursor: "pointer",
                              border: "1px solid",
                              borderColor: darkMode ? "#334155" : "#e5e7eb",
                              bgcolor: darkMode ? "#334155" : "#f8fafc",
                              borderRadius: 2,
                              overflow: "hidden",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: color,
                                transform: "translateY(-4px)",
                              },
                            }}
                          >
                            <Box sx={{ height: 6, bgcolor: color }} />
                            <CardContent sx={{ p: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 1.5,
                                  mb: 2,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: `${color}15`,
                                    color,
                                  }}
                                >
                                  <SchoolRounded />
                                </Avatar>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight={700}
                                    fontFamily="Cairo, sans-serif"
                                    noWrap
                                    sx={{
                                      color: darkMode ? "#f1f5f9" : "#1e293b",
                                    }}
                                  >
                                    {c.title}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    fontFamily="Cairo, sans-serif"
                                    sx={{
                                      color: darkMode ? "#94a3b8" : "#64748b",
                                    }}
                                  >
                                    {c.teacher}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ mb: 1.5 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 0.5,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    fontFamily="Cairo, sans-serif"
                                    sx={{
                                      color: darkMode ? "#94a3b8" : "#64748b",
                                    }}
                                  >
                                    التقدم
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    fontWeight={700}
                                    fontFamily="Cairo, sans-serif"
                                    sx={{ color }}
                                  >
                                    {c.progress}%
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={c.progress}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: darkMode ? "#475569" : "#e2e8f0",
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: 3,
                                      bgcolor: color,
                                    },
                                  }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <StarRounded
                                    sx={{ fontSize: 16, color: "#fbbf24" }}
                                  />
                                  <Typography
                                    variant="caption"
                                    fontWeight={600}
                                    fontFamily="Cairo, sans-serif"
                                    sx={{
                                      color: darkMode ? "#f1f5f9" : "#1e293b",
                                    }}
                                  >
                                    {rating}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="caption"
                                  fontFamily="Cairo, sans-serif"
                                  sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                                >
                                  {completedLessons}/{c.totalLessons} درس
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </GlassCard>


                  {/* Books Section */}
<GlassCard
  title="📖 الكتب الدراسية"
  icon="📚"
  actionLabel="عرض الكل"
  onAction={() => navigate("/student/books")}
  darkMode={darkMode}
>
  <Grid container spacing={2}>
    {[
      {
        id: 1,
        title: "الرياضيات البحتة",
        subtitle: "التفاضل والتكامل",
        teacher: "أ/ محمد أحمد",
        chapters: 8,
        pages: 320,
        color: "#2563eb",
        gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      },
      {
        id: 2,
        title: "الفيزياء",
        subtitle: "الميكانيكا والكهربية",
        teacher: "أ/ أحمد علي",
        chapters: 10,
        pages: 400,
        color: "#059669",
        gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      },
      {
        id: 3,
        title: "الكيمياء",
        subtitle: "الكيمياء العضوية",
        teacher: "أ/ سارة محمود",
        chapters: 7,
        pages: 350,
        color: "#db2777",
        gradient: "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
      },
      {
        id: 4,
        title: "اللغة العربية",
        subtitle: "النحو والبلاغة",
        teacher: "أ/ فاطمة حسن",
        chapters: 12,
        pages: 380,
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      },
    ].map((book) => (
      <Grid item xs={12} sm={6} key={book.id}>
        <Card
          elevation={0}
          onClick={() => navigate(`/student/books/${book.id}`)}
          sx={{
            cursor: "pointer",
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            bgcolor: darkMode ? "#334155" : "#f8fafc",
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: book.color,
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? "0 10px 30px rgba(0,0,0,0.3)"
                : "0 10px 30px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* Book Header Gradient */}
          <Box
            sx={{
              background: book.gradient,
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoStoriesRounded sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                fontFamily="Cairo, sans-serif"
                noWrap
                sx={{ color: "white" }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="caption"
                fontFamily="Cairo, sans-serif"
                sx={{ color: "rgba(255,255,255,0.85)" }}
              >
                {book.subtitle}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: 2 }}>
            {/* Teacher */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: `${book.color}20`,
                  color: book.color,
                }}
              >
                <SchoolRounded sx={{ fontSize: 16 }} />
              </Avatar>
              <Typography
                variant="caption"
                fontWeight={600}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
              >
                {book.teacher}
              </Typography>
            </Box>

            {/* Book Stats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Chip
                size="small"
                label={`${book.chapters} فصل`}
                sx={{
                  bgcolor: `${book.color}15`,
                  color: book.color,
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  height: 24,
                }}
              />
              <Chip
                size="small"
                label={`${book.pages} صفحة`}
                sx={{
                  bgcolor: darkMode ? "#475569" : "#f1f5f9",
                  color: darkMode ? "#94a3b8" : "#64748b",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 11,
                  height: 24,
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</GlassCard>


              {/* Tasks */}
              <GlassCard
                title="📝 المهام القادمة"
                icon="✅"
                actionLabel="عرض الكل"
                onAction={() => navigate("/student/tasks")}
                darkMode={darkMode}
              >
                {tasks.slice(0, 5).map((t) => {
                  const color = [
                    COLORS.primary,
                    COLORS.secondary,
                    COLORS.success,
                    COLORS.accent,
                  ][(t.courseId - 1) % 4];
                  return (
                    <Box
                      key={t.id}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: darkMode ? "#334155" : "#f8fafc",
                        opacity: t.completed ? 0.6 : 1,
                        mb: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: darkMode ? "#475569" : "#f1f5f9",
                          transform: "translateX(-5px)",
                        },
                      }}
                    >
                      <Checkbox
                        checked={t.completed}
                        onChange={() => toggleTask(t.id)}
                        icon={<RadioButtonUncheckedRounded />}
                        checkedIcon={<CheckCircleRounded />}
                        sx={{
                          p: 0,
                          color: darkMode ? "#64748b" : "#cbd5e1",
                          "&.Mui-checked": { color: COLORS.success },
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#f1f5f9" : "#1e293b",
                            textDecoration: t.completed
                              ? "line-through"
                              : "none",
                            mb: 0.75,
                          }}
                        >
                          {t.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            onClick={() =>
                              navigate(`/student/course/${t.courseId}`)
                            }
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              height: 22,
                              px: 1,
                              fontSize: 11,
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 600,
                              bgcolor: `${color}15`,
                              color,
                              borderRadius: "11px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: `${color}30`,
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            {t.courseName}
                          </Box>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: COLORS.warning }}
                          >
                            📅 {t.dueDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </GlassCard>

             

              {/* Chart */}
              <GlassCard title="📈 تقدم الأداء" icon="📊" darkMode={darkMode}>
                <Box sx={{ height: 280 }}>
                  <Line data={chartData} options={chartOptions} />
                </Box>
              </GlassCard>

              {/* Strength/Weakness */}
              <GlassCard title="تحليل الأداء" icon="🧠" darkMode={darkMode}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: darkMode ? "#334155" : "#f8fafc",
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 18, color: COLORS.secondary }} />
                  <Typography
                    variant="caption"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                  >
                    تحليل مبني على 437 سؤال • آخر تحديث: اليوم
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {[
                    {
                      title: "💪 نقاط القوة",
                      data: strengths,
                      color: COLORS.success,
                      bg: "#f0fdf4",
                      chipBg: "#dcfce7",
                    },
                    {
                      title: "🎯 يحتاج تحسين",
                      data: weaknesses,
                      color: COLORS.warning,
                      bg: "#fffbeb",
                      chipBg: "#fef3c7",
                    },
                  ].map((section) => (
                    <Grid item xs={12} md={6} key={section.title}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: section.color, mb: 2 }}
                      >
                        {section.title}
                      </Typography>
                      {section.data.map((item, idx) => (
                        <Box
                          key={item.id || idx}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: darkMode ? "#334155" : section.bg,
                            borderRight: `4px solid ${section.color}`,
                            mb: 1.5,
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "translateX(-4px)" },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Box>
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                              >
                                {item.subject}
                              </Typography>
                              {item.topic && (
                                <Typography
                                  variant="caption"
                                  fontFamily="Cairo, sans-serif"
                                  sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                                >
                                  {item.topic}
                                </Typography>
                              )}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Chip
                                icon={
                                  item.trend === "up" ? (
                                    <TrendingUpRounded sx={{ fontSize: 14 }} />
                                  ) : (
                                    <TrendingDownRounded
                                      sx={{ fontSize: 14 }}
                                    />
                                  )
                                }
                                label={item.trendValue}
                                size="small"
                                sx={{
                                  height: 24,
                                  fontSize: 11,
                                  bgcolor:
                                    item.trend === "up" ? "#dcfce7" : "#fee2e2",
                                  color:
                                    item.trend === "up"
                                      ? COLORS.success
                                      : COLORS.error,
                                  fontFamily: "Cairo, sans-serif",
                                  fontWeight: 700,
                                }}
                              />
                              <Typography
                                variant="h6"
                                fontWeight={800}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: section.color }}
                              >
                                {item.score}%
                              </Typography>
                            </Box>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={item.score}
                            sx={{
                              height: 6,
                              borderRadius: 10,
                              bgcolor: darkMode ? "#475569" : section.chipBg,
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 10,
                                bgcolor: section.color,
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </GlassCard>
            </Box>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Live Sessions */}
              <GlassCard
                title="🎥 الحصص المباشرة"
                icon="📺"
                actionLabel="الجدول"
                onAction={() => navigate("/student/live-class")}
                darkMode={darkMode}
              >
                {liveSessions.map((s) => {
                  const gradient = [
                    GRADIENTS.blue,
                    GRADIENTS.purple,
                    GRADIENTS.green,
                  ][(s.courseId - 1) % 3];
                  return (
                    <Box
                      key={s.id}
                      sx={{
                        background: gradient,
                        borderRadius: 3,
                        p: 2.5,
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                        mb: 2,
                        transition: "all 0.2s ease",
                        "&:hover": { transform: "translateY(-4px)" },
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                        }}
                      />
                      <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          {s.isLive && (
                            <Chip
                              icon={
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: COLORS.error,
                                    animation: "blink 1s infinite",
                                    "@keyframes blink": {
                                      "0%,100%": { opacity: 1 },
                                      "50%": { opacity: 0.3 },
                                    },
                                  }}
                                />
                              }
                              label="مباشر"
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "white",
                                fontFamily: "Cairo, sans-serif",
                              }}
                            />
                          )}
                          {s.participants && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <PeopleRounded sx={{ fontSize: 16 }} />
                              <Typography
                                variant="caption"
                                fontWeight={600}
                                fontFamily="Cairo, sans-serif"
                              >
                                {s.participants}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          fontFamily="Cairo, sans-serif"
                          sx={{ mb: 0.5 }}
                        >
                          {s.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{ opacity: 0.9, mb: 0.5 }}
                        >
                          {s.teacher}
                        </Typography>
                        <Typography
                          variant="caption"
                          fontFamily="Cairo, sans-serif"
                          sx={{ opacity: 0.85, display: "block", mb: 2 }}
                        >
                          {s.isLive ? "🔴" : "⏰"} {s.time}
                        </Typography>

                        <Button
                          fullWidth
                          startIcon={<PlayCircleFilledRounded />}
                          onClick={() =>
                            navigate("/student/live-class", {
                              state: { session: s, joinDirectly: true },
                            })
                          }
                          sx={{
                            bgcolor: "rgba(255,255,255,0.95)",
                            color: "#1e293b",
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            borderRadius: 2,
                            "&:hover": { bgcolor: "white" },
                          }}
                        >
                          🚀 انضم الآن
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </GlassCard>

              {/* Calendar */}
              <GlassCard title="📅 التقويم" icon="🗓️" darkMode={darkMode}>
                <Box
                  sx={{
                    bgcolor: darkMode ? "#334155" : "#f8fafc",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        setCurrentDate(new Date(year, month + 1, 1))
                      }
                    >
                      <ChevronRightRounded
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      />
                    </IconButton>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {arabicMonths[month]} {year}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setCurrentDate(new Date(year, month - 1, 1))
                      }
                    >
                      <ChevronLeftRounded
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7,1fr)",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    {arabicDays.map((d) => (
                      <Typography
                        key={d}
                        variant="caption"
                        fontWeight={600}
                        fontFamily="Cairo, sans-serif"
                        sx={{
                          textAlign: "center",
                          color: darkMode ? "#94a3b8" : "#64748b",
                        }}
                      >
                        {d}
                      </Typography>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7,1fr)",
                      gap: 0.5,
                    }}
                  >
                    {[...Array(firstDay)].map((_, i) => (
                      <Box key={`e${i}`} />
                    ))}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const d = i + 1;
                      return (
                        <Box
                          key={d}
                          sx={{
                            aspectRatio: "1",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1.5,
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 600,
                            fontFamily: "Cairo, sans-serif",
                            position: "relative",
                            background: isToday(d)
                              ? GRADIENTS.main
                              : "transparent",
                            color: isToday(d)
                              ? "white"
                              : darkMode
                                ? "#e2e8f0"
                                : "#1e293b",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: isToday(d)
                                ? undefined
                                : darkMode
                                  ? "#475569"
                                  : "#f1f5f9",
                            },
                          }}
                        >
                          {d}
                          {hasEvent(d) && (
                            <Box
                              sx={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                bgcolor: isToday(d) ? "white" : COLORS.warning,
                                position: "absolute",
                                bottom: 3,
                              }}
                            />
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </GlassCard>

              {/* Quick Actions */}
              <GlassCard title="⚡ إجراءات سريعة" icon="🚀" darkMode={darkMode}>
                <Grid container spacing={1.5}>
                  {QUICK_ACTIONS.map((a) => {
                    const Icon = a.icon;
                    return (
                      <Grid item xs={6} key={a.id}>
                        <Card
                          elevation={0}
                          onClick={() =>
                            a.isAssistant
                              ? setAssistantOpen(true)
                              : navigate(a.path)
                          }
                          sx={{
                            border: "1px solid",
                            borderColor: darkMode ? "#334155" : "#e5e7eb",
                            bgcolor: darkMode ? "#334155" : "#f8fafc",
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: a.color,
                              transform: "translateY(-3px)",
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 2,
                              textAlign: "center",
                              "&:last-child": { pb: 2 },
                            }}
                          >
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                bgcolor: `${a.color}15`,
                                color: a.color,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 1,
                              }}
                            >
                              <Icon />
                            </Box>
                            <Typography
                              variant="caption"
                              fontWeight={700}
                              fontFamily="Cairo, sans-serif"
                              sx={{
                                color: darkMode ? "#f1f5f9" : "#1e293b",
                                display: "block",
                              }}
                            >
                              {a.label}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </GlassCard>
              

                   {/* Exams Results */}
    <GlassCard
      title="📊 نتائج الاختبارات"
      icon="🎯"
      actionLabel="جميع النتائج"
      onAction={() => navigate("/student/exams")}
      darkMode={darkMode}
    >
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
            جاري تحميل النتائج...
          </Typography>
        </Box>
      ) : recentExams.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
            لم تقم بأداء أي اختبار بعد
          </Typography>
        </Box>
      ) : (
        recentExams.slice(0, 4).map((e) => {
          const score = e.score ?? 0;
          const gradeColor = getGradeColor(score);
          return (
            <Box
              key={e.id}
              onClick={() => navigate("/student/exams")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: darkMode ? "#334155" : "#f8fafc",
                mb: 1.5,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: darkMode ? "#475569" : "#f1f5f9",
                  transform: "translateX(-3px)",
                },
                "&:last-child": {
                  mb: 0,
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: GRADIENTS.blue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <QuizRounded sx={{ fontSize: 20 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  fontFamily="Cairo, sans-serif"
                  noWrap
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                >
                  {e.title}
                </Typography>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                >
                  {e.courseTitle}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: darkMode
                    ? "#475569"
                    : `${gradeColor}15`,
                  color: gradeColor,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  minWidth: 50,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  fontFamily="Cairo, sans-serif"
                >
                  {Math.round(score)}%
                </Typography>
              </Box>
            </Box>
          );
        })
      )}
    </GlassCard>

              {/* Notifications */}
              <GlassCard
                title="🔔 الإشعارات"
                icon="📬"
                actionLabel="الكل"
                onAction={() => navigate("/student/notifications")}
                darkMode={darkMode}
              >
                <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                  {notifications.slice(0, 5).map((n) => (
                    <Box
                      key={n.id}
                      onClick={() => navigate("/student/notifications")}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        borderRight: "3px solid",
                        borderColor: n.unread ? COLORS.primary : "transparent",
                        bgcolor: n.unread
                          ? darkMode
                            ? "#334155"
                            : "#eff6ff"
                          : "transparent",
                        mb: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: darkMode ? "#475569" : "#f1f5f9",
                          transform: "translateX(-3px)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        fontWeight={n.unread ? 600 : 400}
                        sx={{
                          color: darkMode ? "#f1f5f9" : "#1e293b",
                          mb: 0.5,
                        }}
                      >
                        {n.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                      >
                        {n.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  fullWidth
                  onClick={() => navigate("/student/notifications")}
                  sx={{
                    mt: 2,
                    color: COLORS.primary,
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  عرض الكل
                </Button>
              </GlassCard>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FLOATING ASSISTANT */}
      <Fab
        onClick={() => setAssistantOpen(!assistantOpen)}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: 64,
          height: 64,
          background: GRADIENTS.main,
          boxShadow: "0 8px 25px rgba(124,58,237,0.4)",
          animation: "float 3s ease-in-out infinite",
          "@keyframes float": {
            "0%,100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-8px)" },
          },
          zIndex: 1000,
        }}
      >
        <Badge badgeContent={3} color="error">
          <SmartToyRounded sx={{ fontSize: 28, color: "white" }} />
        </Badge>
      </Fab>

      {assistantOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            left: 24,
            width: 350,
            height: 450,
            bgcolor: darkMode ? "#1e293b" : "white",
            borderRadius: 3,
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            overflow: "hidden",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              background: GRADIENTS.blue,
              color: "white",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SmartToyRounded />
              <Typography fontWeight={700} fontFamily="Cairo, sans-serif">
                المساعد الذكي
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setAssistantOpen(false)}
              sx={{ color: "white" }}
            >
              <CloseRounded />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
            <Box
              sx={{
                bgcolor: darkMode ? "#334155" : "#f1f5f9",
                p: 2,
                borderRadius: 2,
                maxWidth: "85%",
              }}
            >
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
              >
                مرحباً {studentInfo.firstName}! 👋 كيف يمكنني مساعدتك؟
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              display: "flex",
              gap: 1,
            }}
          >
            <input
              placeholder="اكتب سؤالك..."
              style={{
                flex: 1,
                padding: "10px 15px",
                borderRadius: 10,
                border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
                background: darkMode ? "#334155" : "#f8fafc",
                color: darkMode ? "#f1f5f9" : "#1e293b",
                fontFamily: "Cairo, sans-serif",
                outline: "none",
              }}
            />
            <IconButton
              sx={{
                bgcolor: COLORS.primary,
                color: "white",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              <ArrowBackRounded />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentDashboard;
