// frontend/src/pages/student/StudentDashboard.jsx
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import { LogoutOutlined, VideoCallOutlined } from "@mui/icons-material";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontFamily="Cairo, sans-serif"
        >
          لوحة التحكم
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* زر الصفحة الرئيسية */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ fontFamily: "Cairo, sans-serif", fontWeight: 700 }}
          >
            الصفحة الرئيسية
          </Button>

          {/* زر تسجيل الخروج */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutOutlined />}
            onClick={handleLogout}
            sx={{ fontFamily: "Cairo, sans-serif", fontWeight: 700 }}
          >
            تسجيل الخروج
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          fontFamily="Cairo, sans-serif"
          gutterBottom
        >
          مرحباً، {user?.name || "الطالب"}! 👋
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          fontFamily="Cairo, sans-serif"
          sx={{ mb: 3 }}
        >
          البريد الإلكتروني: {user?.email}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          fontFamily="Cairo, sans-serif"
          sx={{ mb: 3 }}
        >
          نوع الحساب: {user?.role === "student" ? "طالب" : user?.role}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="Cairo, sans-serif"
        >
          هذه صفحة مؤقتة للـ Dashboard. سيتم إضافة المزيد من المحتوى قريباً.
        </Typography>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          fontFamily="Cairo, sans-serif"
          gutterBottom
        >
          الميزات المتاحة
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<VideoCallOutlined />}
            onClick={() => navigate("/student/live-class")}
            sx={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)",
              },
            }}
          >
            انضم للفصل الافتراضي
          </Button>

          {/* Add more buttons for other features */}
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentDashboard;
