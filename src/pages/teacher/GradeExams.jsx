import { useState } from "react";
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
  TableRow,
  TableHead,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  ArrowBack,
  Assignment,
  CheckCircle,
  HourglassEmpty,
  People,
  BarChart as BarChartIcon,
  Close,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const GradeExams = () => {
  const { darkMode } = useTheme();
  const isDark = darkMode;

  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState(null);

  // Mock data - الصفوف الدراسية
  const grades = [
    { id: "all", title: "جميع الصفوف" },
    { id: "grade-1", title: "الصف الأول الثانوي" },
    { id: "grade-2", title: "الصف الثاني الثانوي" },
    { id: "grade-3", title: "الصف الثالث الثانوي" },
  ];

  // Mock data - الاختبارات
  const exams = [
    { id: "exam-1", title: "اختبار الجبر - الفصل الأول", gradeId: "grade-1", totalMarks: 50, questionsCount: 25, date: "2025-01-20" },
    { id: "exam-2", title: "اختبار الهندسة", gradeId: "grade-1", totalMarks: 40, questionsCount: 20, date: "2025-01-18" },
    { id: "exam-3", title: "اختبار التفاضل والتكامل", gradeId: "grade-2", totalMarks: 60, questionsCount: 30, date: "2025-01-15" },
    { id: "exam-4", title: "اختبار الإحصاء", gradeId: "grade-3", totalMarks: 50, questionsCount: 25, date: "2025-01-22" },
  ];

  // Mock data - محاولات الطلاب
  const examAttempts = [
    { id: "attempt-1", examId: "exam-1", student: { id: "student-1", name: "أحمد محمد", avatar: "أ" }, submittedAt: "2025-01-20 14:30", status: "graded", totalScore: 45, maxScore: 50, answers: [
        { questionId: "q1", questionText: "ما هو حل المعادلة: 2x + 5 = 15؟", type: "mcq", options: ["x = 3", "x = 5", "x = 7", "x = 10"], correctAnswer: "x = 5", studentAnswer: "x = 5", isCorrect: true, marks: 2 },
        { questionId: "q2", questionText: "هل مجموع زوايا المثلث = 180 درجة؟", type: "true-false", correctAnswer: "صح", studentAnswer: "صح", isCorrect: true, marks: 2 },
    ]},
    { id: "attempt-2", examId: "exam-1", student: { id: "student-2", name: "فاطمة علي", avatar: "ف" }, submittedAt: "2025-01-20 15:15", status: "pending", totalScore: 0, maxScore: 50, answers: [] },
    { id: "attempt-3", examId: "exam-1", student: { id: "student-3", name: "محمود حسن", avatar: "م" }, submittedAt: "2025-01-20 16:00", status: "graded", totalScore: 38, maxScore: 50, answers: [
        { questionId: "q1", questionText: "ما هو حل المعادلة: 2x + 5 = 15؟", type: "mcq", options: ["x = 3", "x = 5", "x = 7", "x = 10"], correctAnswer: "x = 5", studentAnswer: "x = 7", isCorrect: false, marks: 2 },
    ]},
    { id: "attempt-4", examId: "exam-3", student: { id: "student-4", name: "سارة أحمد", avatar: "س" }, submittedAt: "2025-01-15 10:30", status: "graded", totalScore: 55, maxScore: 60, answers: [] },
    { id: "attempt-5", examId: "exam-4", student: { id: "student-5", name: "يوسف خالد", avatar: "ي" }, submittedAt: "2025-01-22 11:00", status: "pending", totalScore: 0, maxScore: 50, answers: [] },
  ];

  const filteredExams = selectedGrade === "all" ? exams : exams.filter((exam) => exam.gradeId === selectedGrade);
  const filteredAttempts = examAttempts.filter((attempt) => selectedExam === "" || attempt.examId === selectedExam);
  const pendingAttempts = filteredAttempts.filter((attempt) => attempt.status === "pending");
  const gradedAttempts = filteredAttempts.filter((attempt) => attempt.status === "graded");

  // بيانات الرسم البياني
  const chartData = [
    { name: "قيد التصحيح", value: pendingAttempts.length, color: "#f59e0b" },
    { name: "تم التصحيح", value: gradedAttempts.length, color: "#10b981" },
  ];

  const handleOpenView = (attempt) => { setCurrentAttempt(attempt); setViewDialogOpen(true); };
  const handleCloseView = () => { setViewDialogOpen(false); setCurrentAttempt(null); };
  const getPercentage = (score, maxScore) => ((score / maxScore) * 100).toFixed(0);

  // سمات الألوان بناءً على الوضع
  const themeStyles = {
    bg: isDark ? "#111827" : "#f9fafb",
    paper: isDark ? "#1f2937" : "#ffffff",
    text: isDark ? "#f3f4f6" : "#111827",
    border: isDark ? "#374151" : "#e5e7eb"
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4, bgcolor: themeStyles.bg, color: themeStyles.text, direction: "rtl", fontFamily: "Cairo, sans-serif" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Button 
            startIcon={<ArrowBack sx={{ ml: 1 }} />} 
            onClick={() => window.history.back()}
            sx={{ color: themeStyles.text, fontWeight: "bold" }}
          >
            العودة للوحة التحكم
          </Button>
        </Box>

        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: "success.main", borderRadius: 2 }}>📝</Avatar>
            <Box>
              <Typography variant="h4" fontWeight={900}>مراجعة الاختبارات</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: isDark ? "gray" : "inherit" }}>عرض نتائج الطلاب في الاختبارات</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: "flex", gap: 2, justifyContent: { md: "flex-end" } }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: themeStyles.text }}>الصف الدراسي</InputLabel>
              <Select
                value={selectedGrade}
                label="الصف الدراسي"
                onChange={(e) => { setSelectedGrade(e.target.value); setSelectedExam(""); }}
                sx={{ bgcolor: themeStyles.paper, color: themeStyles.text }}
              >
                {grades.map((g) => <MenuItem key={g.id} value={g.id}>{g.title}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: themeStyles.text }}>الاختبار</InputLabel>
              <Select
                value={selectedExam}
                label="الاختبار"
                onChange={(e) => setSelectedExam(e.target.value)}
                sx={{ bgcolor: themeStyles.paper, color: themeStyles.text }}
              >
                <MenuItem value="">جميع الاختبارات</MenuItem>
                {filteredExams.map((e) => <MenuItem key={e.id} value={e.id}>{e.title}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Stats & Chart Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2}>
              {[
                { title: "قيد التصحيح", value: pendingAttempts.length, icon: <HourglassEmpty />, color: "#f59e0b", bg: isDark ? "rgba(245, 158, 11, 0.1)" : "#fffbeb" },
                { title: "تم التصحيح", value: gradedAttempts.length, icon: <CheckCircle />, color: "#10b981", bg: isDark ? "rgba(16, 185, 129, 0.1)" : "#ecfdf5" },
                { title: "الاختبارات", value: filteredExams.length, icon: <Assignment />, color: "#3b82f6", bg: isDark ? "rgba(59, 130, 246, 0.1)" : "#eff6ff" },
                { title: "إجمالي الطلاب", value: filteredAttempts.length, icon: <People />, color: "#8b5cf6", bg: isDark ? "rgba(139, 92, 246, 0.1)" : "#f5f3ff" },
              ].map((card, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Card sx={{ bgcolor: themeStyles.paper, border: `1px solid ${themeStyles.border}`, borderRadius: 3 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: card.bg, color: card.color, display: "flex" }}>{card.icon}</Box>
                      <Box>
                        <Typography variant="h5" fontWeight={900} color={themeStyles.text}>{card.value}</Typography>
                        <Typography variant="caption" color="text.secondary">{card.title}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Card sx={{ bgcolor: themeStyles.paper, border: `1px solid ${themeStyles.border}`, borderRadius: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: themeStyles.text }}>تحليل الحالة</Typography>
                <Box sx={{ height: 150 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs & Table */}
        <Paper sx={{ bgcolor: themeStyles.paper, border: `1px solid ${themeStyles.border}`, borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{ display: "flex", borderBottom: `1px solid ${themeStyles.border}` }}>
            <Button 
              fullWidth 
              onClick={() => setSelectedTab(0)}
              sx={{ py: 2, borderRadius: 0, fontWeight: "bold", borderBottom: selectedTab === 0 ? "3px solid #3b82f6" : "none", color: selectedTab === 0 ? "#3b82f6" : "text.secondary" }}
            >
              قيد التصحيح ({pendingAttempts.length})
            </Button>
            <Button 
              fullWidth 
              onClick={() => setSelectedTab(1)}
              sx={{ py: 2, borderRadius: 0, fontWeight: "bold", borderBottom: selectedTab === 1 ? "3px solid #3b82f6" : "none", color: selectedTab === 1 ? "#3b82f6" : "text.secondary" }}
            >
              تم التصحيح ({gradedAttempts.length})
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: isDark ? "#111827" : "#f9fafb" }}>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: "bold", color: themeStyles.text }}>الطالب</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", color: themeStyles.text }}>الاختبار</TableCell>
                  {selectedTab === 1 && <TableCell align="center" sx={{ fontWeight: "bold", color: themeStyles.text }}>الدرجة</TableCell>}
                  <TableCell align="center" sx={{ fontWeight: "bold", color: themeStyles.text }}>تاريخ التسليم</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: themeStyles.text }}>{selectedTab === 0 ? "الحالة" : "الإجراء"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(selectedTab === 0 ? pendingAttempts : gradedAttempts).map((attempt) => {
                  const exam = exams.find((e) => e.id === attempt.examId);
                  const percentage = getPercentage(attempt.totalScore, attempt.maxScore);
                  return (
                    <TableRow key={attempt.id} sx={{ '&:hover': { bgcolor: isDark ? "#2d3748" : "#f8fafc" } }}>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: selectedTab === 0 ? "primary.main" : "secondary.main", width: 32, height: 32, fontSize: 14 }}>{attempt.student.avatar}</Avatar>
                          <Typography variant="body2" fontWeight="bold" color={themeStyles.text}>{attempt.student.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ color: "text.secondary" }}>{exam?.title}</TableCell>
                      {selectedTab === 1 && (
                        <TableCell align="center">
                          <Chip 
                            label={`${attempt.totalScore}/${attempt.maxScore}`} 
                            size="small" 
                            color={percentage >= 70 ? "success" : "error"} 
                            variant="outlined"
                          />
                        </TableCell>
                      )}
                      <TableCell align="center" sx={{ fontSize: 12, color: "text.secondary" }}>{attempt.submittedAt}</TableCell>
                      <TableCell align="center">
                        {selectedTab === 0 ? (
                          <Chip label="جاري التصحيح..." size="small" sx={{ bgcolor: "warning.light", color: "warning.dark", fontWeight: "bold" }} />
                        ) : (
                          <Button size="small" variant="contained" onClick={() => handleOpenView(attempt)} sx={{ borderRadius: 2 }}>عرض</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {(selectedTab === 0 ? pendingAttempts : gradedAttempts).length === 0 && (
              <Box sx={{ p: 8, textAlign: "center" }}>
                <Typography color="text.secondary">لا توجد بيانات لعرضها حالياً</Typography>
              </Box>
            )}
          </TableContainer>
        </Paper>
      </Container>

      {/* View Dialog (Replaces View Dialog div) */}
      <Dialog open={viewDialogOpen} onClose={handleCloseView} fullWidth maxWidth="md" dir="rtl">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: themeStyles.paper, color: themeStyles.text }}>
          <Typography variant="h6" fontWeight="bold">
            {currentAttempt?.student.name} - {exams.find(e => e.id === currentAttempt?.examId)?.title}
          </Typography>
          <IconButton onClick={handleCloseView} sx={{ color: themeStyles.text }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: themeStyles.paper }}>
          {currentAttempt?.answers.length === 0 ? (
            <Typography color="text.secondary">لا توجد إجابات للعرض</Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {currentAttempt?.answers.map((ans, i) => (
                <Card key={i} variant="outlined" sx={{ bgcolor: isDark ? "#374151" : "#f8fafc", borderColor: themeStyles.border }}>
                  <CardContent>
                    <Typography fontWeight="bold" gutterBottom color={themeStyles.text}>سؤال {i + 1}: {ans.questionText}</Typography>
                    {ans.type === "mcq" && (
                      <Box sx={{ mb: 1 }}>
                        {ans.options.map((opt, idx) => (
                          <Typography key={idx} variant="body2" sx={{ 
                            color: opt === ans.correctAnswer ? "#10b981" : themeStyles.text,
                            fontWeight: opt === ans.studentAnswer ? "bold" : "normal",
                            textDecoration: opt === ans.studentAnswer ? "underline" : "none"
                          }}>
                            • {opt}
                          </Typography>
                        ))}
                      </Box>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">الدرجة: {ans.marks}</Typography>
                      <Chip 
                        label={ans.isCorrect ? "صح" : "خطأ"} 
                        size="small" 
                        color={ans.isCorrect ? "success" : "error"} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GradeExams;