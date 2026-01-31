// pages/CoursesPage.jsx
import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowForwardRounded,
  SearchRounded,
  SchoolRounded,
  PersonRounded,
  StarRounded,
  ArrowBackRounded,
  ChevronLeftRounded,
  ShoppingCartRounded,
  PlayCircleOutlineRounded,
  AccessTimeRounded,
  PeopleRounded,
} from "@mui/icons-material";
import ThemeContext from "../../contexts/ThemeContext";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const GRADIENTS = {
  main: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)",
  blue: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  purple: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
  green: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  orange: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  pink: "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
  cyan: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
};

// ═══════════════════════════════════════════════════════════════════
// بيانات الكورسات
// ═══════════════════════════════════════════════════════════════════

const COURSES = [
  {
    id: 1,
    title: "كورس التفاضل والتكامل الشامل",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    teacher: { id: "t1", name: "أ/ محمد أحمد", rating: 4.9, students: 2500 },
    description: "شرح شامل لكل أبواب التفاضل والتكامل مع حل تمارين وامتحانات",
    price: 299,
    oldPrice: 499,
    duration: "45 ساعة",
    lessonsCount: 60,
    studentsCount: 2500,
    rating: 4.8,
    level: "متوسط",
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    tags: ["تفاضل", "تكامل", "نهايات"],
    completionRate: 85,
  },
  {
    id: 2,
    title: "الجبر والهندسة الفراغية",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    teacher: { id: "t1", name: "أ/ محمد أحمد", rating: 4.9, students: 2500 },
    description: "كورس متكامل للجبر والمصفوفات والهندسة الفراغية",
    price: 249,
    oldPrice: 399,
    duration: "38 ساعة",
    lessonsCount: 52,
    studentsCount: 3200,
    rating: 4.9,
    level: "مبتدئ",
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["جبر", "مصفوفات", "هندسة فراغية"],
    completionRate: 92,
  },
  {
    id: 3,
    title: "الميكانيكا والحركة",
    subject: "الفيزياء",
    specialization: "علمي رياضة",
    teacher: { id: "t2", name: "أ/ أحمد علي", rating: 4.8, students: 1800 },
    description: "شرح تفصيلي لقوانين الحركة والميكانيكا مع تطبيقات عملية",
    price: 279,
    oldPrice: 449,
    duration: "42 ساعة",
    lessonsCount: 55,
    studentsCount: 1800,
    rating: 4.7,
    level: "متوسط",
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["ميكانيكا", "حركة", "قوى"],
    completionRate: 78,
  },
  {
    id: 4,
    title: "الكهربية والمغناطيسية الكاملة",
    subject: "الفيزياء",
    specialization: "علمي",
    teacher: { id: "t2", name: "أ/ أحمد علي", rating: 4.8, students: 1800 },
    description: "من الأساسيات للاحتراف في الكهربية والمغناطيسية",
    price: 269,
    oldPrice: 429,
    duration: "40 ساعة",
    lessonsCount: 58,
    studentsCount: 2100,
    rating: 4.8,
    level: "متقدم",
    color: "#f59e0b",
    gradient: GRADIENTS.orange,
    tags: ["كهربية", "مغناطيسية", "تيار"],
    completionRate: 81,
  },
  {
    id: 5,
    title: "الكيمياء العضوية من الصفر للاحتراف",
    subject: "الكيمياء",
    specialization: "علمي",
    teacher: { id: "t3", name: "أ/ سارة محمود", rating: 4.9, students: 3500 },
    description: "رحلة شاملة في عالم الكيمياء العضوية بأسلوب مبسط",
    price: 319,
    oldPrice: 529,
    duration: "50 ساعة",
    lessonsCount: 65,
    studentsCount: 3500,
    rating: 4.9,
    level: "مبتدئ",
    color: "#db2777",
    gradient: GRADIENTS.pink,
    tags: ["عضوية", "تفاعلات", "مركبات"],
    completionRate: 88,
  },
  {
    id: 6,
    title: "الكيمياء الكهربية والاتزان",
    subject: "الكيمياء",
    specialization: "علمي",
    teacher: { id: "t3", name: "أ/ سارة محمود", rating: 4.9, students: 3500 },
    description: "فهم عميق للاتزان الكيميائي والكيمياء الكهربية",
    price: 239,
    oldPrice: 389,
    duration: "35 ساعة",
    lessonsCount: 48,
    studentsCount: 2800,
    rating: 4.6,
    level: "متوسط",
    color: "#0891b2",
    gradient: GRADIENTS.cyan,
    tags: ["اتزان", "كهربية", "خلايا"],
    completionRate: 75,
  },
  {
    id: 7,
    title: "النحو الشامل - من الأساسيات للإتقان",
    subject: "اللغة العربية",
    specialization: "عام",
    teacher: { id: "t4", name: "أ/ فاطمة حسن", rating: 4.7, students: 4200 },
    description: "كل قواعد النحو بطريقة سهلة ومبسطة مع تدريبات عملية",
    price: 259,
    oldPrice: 399,
    duration: "48 ساعة",
    lessonsCount: 72,
    studentsCount: 4200,
    rating: 4.8,
    level: "مبتدئ",
    color: "#f59e0b",
    gradient: GRADIENTS.orange,
    tags: ["نحو", "إعراب", "قواعد"],
    completionRate: 90,
  },
  {
    id: 8,
    title: "البلاغة والأدب والنصوص",
    subject: "اللغة العربية",
    specialization: "عام",
    teacher: { id: "t4", name: "أ/ فاطمة حسن", rating: 4.7, students: 4200 },
    description: "شرح وافي لعلوم البلاغة وتحليل النصوص الأدبية",
    price: 229,
    oldPrice: 369,
    duration: "36 ساعة",
    lessonsCount: 54,
    studentsCount: 3100,
    rating: 4.5,
    level: "متوسط",
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["بلاغة", "أدب", "نصوص"],
    completionRate: 82,
  },
  {
    id: 9,
    title: "English Grammar Complete Course",
    subject: "اللغة الإنجليزية",
    specialization: "عام",
    teacher: { id: "t5", name: "Mr. Ahmed Hassan", rating: 4.8, students: 2900 },
    description: "Master English grammar from basics to advanced level",
    price: 289,
    oldPrice: 459,
    duration: "44 ساعة",
    lessonsCount: 68,
    studentsCount: 2900,
    rating: 4.7,
    level: "متوسط",
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    tags: ["Grammar", "Tenses", "Rules"],
    completionRate: 86,
  },
  {
    id: 10,
    title: "Vocabulary & Writing Mastery",
    subject: "اللغة الإنجليزية",
    specialization: "عام",
    teacher: { id: "t5", name: "Mr. Ahmed Hassan", rating: 4.8, students: 2900 },
    description: "Build your vocabulary and writing skills effectively",
    price: 219,
    oldPrice: 349,
    duration: "32 ساعة",
    lessonsCount: 46,
    studentsCount: 2400,
    rating: 4.6,
    level: "مبتدئ",
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["Vocabulary", "Writing", "Essays"],
    completionRate: 79,
  },
  {
    id: 11,
    title: "الوراثة الجزيئية والتطور",
    subject: "الأحياء",
    specialization: "علمي علوم",
    teacher: { id: "t6", name: "أ/ منى السيد", rating: 4.8, students: 2200 },
    description: "فهم شامل للوراثة والتطور مع أحدث الأبحاث",
    price: 299,
    oldPrice: 479,
    duration: "46 ساعة",
    lessonsCount: 62,
    studentsCount: 2200,
    rating: 4.8,
    level: "متقدم",
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["وراثة", "DNA", "تطور"],
    completionRate: 84,
  },
  {
    id: 12,
    title: "تاريخ مصر والعالم الحديث",
    subject: "التاريخ",
    specialization: "أدبي",
    teacher: { id: "t7", name: "أ/ محمود سالم", rating: 4.6, students: 1600 },
    description: "رحلة تاريخية شاملة في العصر الحديث",
    price: 249,
    oldPrice: 399,
    duration: "40 ساعة",
    lessonsCount: 58,
    studentsCount: 1600,
    rating: 4.5,
    level: "مبتدئ",
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["تاريخ", "مصر", "حديث"],
    completionRate: 77,
  },
];

const SUBJECTS = [
  "الكل",
  "الرياضيات",
  "الفيزياء",
  "الكيمياء",
  "الأحياء",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "التاريخ",
  "الجغرافيا",
  "الفلسفة",
];
const SPECIALIZATIONS = ["الكل", "علمي رياضة", "علمي علوم", "أدبي", "عام"];

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const CoursesPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("الكل");
  const [selectedSpecialization, setSelectedSpecialization] = useState("الكل");

  const filteredCourses = useMemo(() => {
    let filtered = [...COURSES];

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.includes(searchQuery) ||
          course.teacher.name.includes(searchQuery) ||
          course.subject.includes(searchQuery) ||
          course.description.includes(searchQuery),
      );
    }

    if (selectedSubject !== "الكل") {
      filtered = filtered.filter((course) => course.subject === selectedSubject);
    }

    if (selectedSpecialization !== "الكل") {
      filtered = filtered.filter(
        (course) =>
          course.specialization === selectedSpecialization ||
          course.specialization === "عام",
      );
    }

    return filtered;
  }, [searchQuery, selectedSubject, selectedSpecialization]);

  const handleBuy = (e, course) => {
  e.stopPropagation();
  navigate("/checkout", {
    state: {
      item: course,
      itemType: "course",
    },
  });
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f8fafc",
        pb: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{ background: GRADIENTS.main, color: "white", pt: 3, pb: 4, px: 2 }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={() => navigate("/start-journey")}
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
              }}
            >
              <ArrowForwardRounded />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
              >
                🎓 الكورسات التعليمية
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9 }}
              >
                دروس مشروحة بالفيديو مع أفضل المدرسين في كل المواد
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Filters */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            p: 3,
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            bgcolor: darkMode ? "#1e293b" : "white",
            borderRadius: 3,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="ابحث عن كورس أو مدرس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: darkMode ? "#334155" : "#f8fafc",
                    borderRadius: 2,
                    fontFamily: "Cairo, sans-serif",
                    "& fieldset": {
                      borderColor: darkMode ? "#475569" : "#e5e7eb",
                    },
                  },
                  "& input": { color: darkMode ? "#f1f5f9" : "#1e293b" },
                }}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    color: darkMode ? "#94a3b8" : "#64748b",
                  }}
                >
                  المادة
                </InputLabel>
                <Select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  label="المادة"
                  sx={{
                    bgcolor: darkMode ? "#334155" : "#f8fafc",
                    borderRadius: 2,
                    fontFamily: "Cairo, sans-serif",
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                  }}
                >
                  {SUBJECTS.map((subject) => (
                    <MenuItem
                      key={subject}
                      value={subject}
                      sx={{ fontFamily: "Cairo, sans-serif" }}
                    >
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel
                  sx={{
                    fontFamily: "Cairo, sans-serif",
                    color: darkMode ? "#94a3b8" : "#64748b",
                  }}
                >
                  الشعبة
                </InputLabel>
                <Select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  label="الشعبة"
                  sx={{
                    bgcolor: darkMode ? "#334155" : "#f8fafc",
                    borderRadius: 2,
                    fontFamily: "Cairo, sans-serif",
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                  }}
                >
                  {SPECIALIZATIONS.map((spec) => (
                    <MenuItem
                      key={spec}
                      value={spec}
                      sx={{ fontFamily: "Cairo, sans-serif" }}
                    >
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>

        {/* Results Count */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            fontFamily="Cairo, sans-serif"
            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
          >
            عرض {filteredCourses.length} كورس
          </Typography>
        </Box>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <Card
            elevation={0}
            sx={{
              p: 8,
              textAlign: "center",
              border: "1px solid",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              bgcolor: darkMode ? "#1e293b" : "white",
              borderRadius: 3,
            }}
          >
            <Typography variant="h1" sx={{ fontSize: 64, mb: 2, opacity: 0.5 }}>
              🎓
            </Typography>
            <Typography
              variant="h6"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
            >
              لا توجد كورسات تطابق البحث
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map((course, index) => (
              <Grid item xs={12} sm={6} lg={4} key={course.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      bgcolor: darkMode ? "#1e293b" : "white",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: course.color,
                        transform: "translateY(-8px)",
                        boxShadow: darkMode
                          ? `0 20px 40px rgba(0,0,0,0.5)`
                          : `0 20px 40px ${course.color}20`,
                        bgcolor: darkMode ? "#253449" : "white",
                      },
                    }}
                  >
                    {/* Course Header */}
                    <Box
                      sx={{
                        background: course.gradient,
                        p: 3,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: -20,
                          right: -20,
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />

                      {/* Price Badge */}
                      <Box sx={{ position: "absolute", top: 12, left: 12 }}>
                        <Typography
                          variant="h6"
                          fontWeight={900}
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.2)",
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          {course.price} جنيه
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "white",
                            textDecoration: "line-through",
                            opacity: 0.7,
                            fontFamily: "Cairo, sans-serif",
                            display: "block",
                            textAlign: "center",
                            mt: 0.5,
                          }}
                        >
                          {course.oldPrice} جنيه
                        </Typography>
                      </Box>

                      {/* Subject Badge */}
                      <Chip
                        label={course.subject}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 600,
                        }}
                      />

                      {/* Course Icon */}
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          bgcolor: "rgba(255,255,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                          mt: 5,
                        }}
                      >
                        <SchoolRounded sx={{ fontSize: 32, color: "white" }} />
                      </Box>

                      <Typography
                        variant="h6"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: "white", mb: 1 }}
                      >
                        {course.title}
                      </Typography>

                      {/* Level Badge */}
                      <Chip
                        label={course.level}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.15)",
                          color: "white",
                          fontFamily: "Cairo, sans-serif",
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 2.5 }}>
                      {/* Teacher - Clickable */}
                      <Box
                        onClick={() => navigate(`/teacher/${course.teacher.id}`)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: darkMode ? "#334155" : `${course.color}08`,
                          mb: 2,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: darkMode ? "#475569" : `${course.color}15`,
                            transform: "translateX(-5px)",
                          },
                        }}
                      >
                        <Avatar
                          sx={{ width: 40, height: 40, bgcolor: course.color }}
                        >
                          <PersonRounded />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                          >
                            {course.teacher.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <StarRounded
                              sx={{ fontSize: 14, color: "#fbbf24" }}
                            />
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                            >
                              {course.teacher.rating}
                            </Typography>
                          </Box>
                        </Box>
                        <ChevronLeftRounded
                          sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                        />
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{
                          color: darkMode ? "#94a3b8" : "#64748b",
                          mb: 2,
                          lineHeight: 1.6,
                          height: 48,
                          overflow: "hidden",
                        }}
                      >
                        {course.description}
                      </Typography>

                      {/* Stats */}
                      <Grid container spacing={1} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <PlayCircleOutlineRounded
                              sx={{
                                fontSize: 18,
                                color: darkMode ? "#64748b" : "#94a3b8",
                              }}
                            />
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={600}
                              sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                            >
                              {course.lessonsCount}
                            </Typography>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{
                                color: darkMode ? "#64748b" : "#94a3b8",
                                fontSize: "0.65rem",
                              }}
                            >
                              درس
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <AccessTimeRounded
                              sx={{
                                fontSize: 18,
                                color: darkMode ? "#64748b" : "#94a3b8",
                              }}
                            />
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={600}
                              sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                            >
                              {course.duration}
                            </Typography>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{
                                color: darkMode ? "#64748b" : "#94a3b8",
                                fontSize: "0.65rem",
                              }}
                            >
                              مدة
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <PeopleRounded
                              sx={{
                                fontSize: 18,
                                color: darkMode ? "#64748b" : "#94a3b8",
                              }}
                            />
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              fontWeight={600}
                              sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                            >
                              {(course.studentsCount / 1000).toFixed(1)}K
                            </Typography>
                            <Typography
                              variant="caption"
                              fontFamily="Cairo, sans-serif"
                              sx={{
                                color: darkMode ? "#64748b" : "#94a3b8",
                                fontSize: "0.65rem",
                              }}
                            >
                              طالب
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <StarRounded sx={{ fontSize: 18, color: "#fbbf24" }} />
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                          >
                            {course.rating}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                          >
                            ({course.studentsCount.toLocaleString()} تقييم)
                          </Typography>
                        </Box>
                      </Box>

                      {/* Tags */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        {course.tags.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 10,
                              bgcolor: darkMode ? "#334155" : "#f1f5f9",
                              color: darkMode ? "#94a3b8" : "#64748b",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          />
                        ))}
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          endIcon={<ArrowBackRounded />}
                          onClick={() => navigate(`/courses/${course.id}`)}
                          sx={{
                            flex: 1,
                            borderColor: course.color,
                            color: course.color,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            borderRadius: 2,
                            "&:hover": {
                              borderColor: course.color,
                              bgcolor: `${course.color}10`,
                            },
                          }}
                        >
                          التفاصيل
                        </Button>

                        <Button
                          variant="contained"
                          startIcon={<ShoppingCartRounded />}
                          onClick={(e) => handleBuy(e, course)}
                          
                          sx={{
                            flex: 1,
                            background: course.gradient,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            borderRadius: 2,
                            boxShadow: "none",
                            "&:hover": {
                              boxShadow: `0 8px 20px ${course.color}40`,
                            },
                            "&.Mui-disabled": {
                              background: darkMode ? "#334155" : "#e5e7eb",
                              color: darkMode ? "#64748b" : "#94a3b8",
                            },
                          }}
                        >
                        اشترك الأن
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CoursesPage;