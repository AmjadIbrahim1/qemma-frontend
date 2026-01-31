// pages/TeachersBooksPage.jsx
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
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowForwardRounded,
  SearchRounded,
  MenuBookRounded,
  PersonRounded,
  DownloadRounded,
  StarRounded,
  DescriptionRounded,
  ArrowBackRounded,
  ChevronLeftRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import ThemeContext from "../../contexts/ThemeContext";

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
};

const GRADIENTS = {
  main: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)",
  blue: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  purple: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
  green: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  orange: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  pink: "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
};

// ═══════════════════════════════════════════════════════════════════
// بيانات كتب المدرسين
// ═══════════════════════════════════════════════════════════════════

const TEACHERS_BOOKS = [
  {
    id: 1,
    title: "ملخص التفاضل والتكامل",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    teacher: { id: "t1", name: "أ/ محمد أحمد", rating: 4.9 },
    description:
      "ملخص شامل لكل قوانين ونظريات التفاضل والتكامل مع أمثلة محلولة",
    pages: 120,
    downloads: 8500,
    rating: 4.8,
    price: 75,
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    tags: ["تفاضل", "تكامل", "نهايات"],
  },
  {
    id: 2,
    title: "المراجعة النهائية - الجبر",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    teacher: { id: "t1", name: "أ/ محمد أحمد", rating: 4.9 },
    description:
      "مراجعة نهائية شاملة للجبر والهندسة الفراغية مع حل نماذج الوزارة",
    pages: 85,
    downloads: 12000,
    rating: 4.9,
    price: 50,
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["جبر", "مصفوفات", "هندسة فراغية"],
  },
  {
    id: 3,
    title: "ملخص الميكانيكا الكاملة",
    subject: "الفيزياء",
    specialization: "علمي رياضة",
    teacher: { id: "t2", name: "أ/ أحمد علي", rating: 4.8 },
    description:
      "كل قوانين الميكانيكا مع شرح مبسط وأمثلة من امتحانات السنوات السابقة",
    pages: 95,
    downloads: 9800,
    rating: 4.7,
    price: 60,
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["ميكانيكا", "حركة", "قوى"],
  },
  {
    id: 4,
    title: "الكهربية والمغناطيسية",
    subject: "الفيزياء",
    specialization: "علمي",
    teacher: { id: "t2", name: "أ/ أحمد علي", rating: 4.8 },
    description: "شرح تفصيلي للكهربية الساكنة والتيار الكهربي والمغناطيسية",
    pages: 110,
    downloads: 7500,
    rating: 4.8,
    price: 40,
    color: "#f59e0b",
    gradient: GRADIENTS.orange,
    tags: ["كهربية", "مغناطيسية", "تيار"],
  },
  {
    id: 5,
    title: "الكيمياء العضوية من الصفر",
    subject: "الكيمياء",
    specialization: "علمي",
    teacher: { id: "t3", name: "أ/ سارة محمود", rating: 4.9 },
    description: "شرح مبسط للكيمياء العضوية مع كل التفاعلات والمعادلات",
    pages: 140,
    downloads: 15000,
    rating: 4.9,
    price: 80,
    color: "#db2777",
    gradient: GRADIENTS.pink,
    tags: ["عضوية", "تفاعلات", "مركبات"],
  },
  {
    id: 6,
    title: "الاتزان الكيميائي والكهربية",
    subject: "الكيمياء",
    specialization: "علمي",
    teacher: { id: "t3", name: "أ/ سارة محمود", rating: 4.9 },
    description:
      "ملخص شامل للاتزان الكيميائي والكيمياء الكهربية مع مسائل محلولة",
    pages: 75,
    downloads: 6800,
    rating: 4.6,
    price: 35,
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    tags: ["اتزان", "كهربية", "خلايا"],
  },
  {
    id: 7,
    title: "النحو الشامل للثانوية",
    subject: "اللغة العربية",
    specialization: "عام",
    teacher: { id: "t4", name: "أ/ فاطمة حسن", rating: 4.7 },
    description: "كل قواعد النحو للثانوية العامة مع إعراب نماذج وتدريبات",
    pages: 160,
    downloads: 22000,
    rating: 4.8,
    price: 55,
    color: "#f59e0b",
    gradient: GRADIENTS.orange,
    tags: ["نحو", "إعراب", "قواعد"],
  },
  {
    id: 8,
    title: "البلاغة والأدب",
    subject: "اللغة العربية",
    specialization: "عام",
    teacher: { id: "t4", name: "أ/ فاطمة حسن", rating: 4.7 },
    description: "شرح مفصل لعلوم البلاغة والأدب مع تحليل النصوص",
    pages: 90,
    downloads: 8900,
    rating: 4.5,
    price: 45,
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["بلاغة", "أدب", "نصوص"],
  },
  {
    id: 9,
    title: "Grammar Master Guide",
    subject: "اللغة الإنجليزية",
    specialization: "عام",
    teacher: { id: "t5", name: "Mr. Ahmed Hassan", rating: 4.8 },
    description: "Complete grammar guide for Thanawya Amma with exercises",
    pages: 100,
    downloads: 11000,
    rating: 4.7,
    price: 65,
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    tags: ["Grammar", "Tenses", "Rules"],
  },
  {
    id: 10,
    title: "Vocabulary & Translation",
    subject: "اللغة الإنجليزية",
    specialization: "عام",
    teacher: { id: "t5", name: "Mr. Ahmed Hassan", rating: 4.8 },
    description: "Essential vocabulary and translation techniques for exams",
    pages: 80,
    downloads: 7200,
    rating: 4.6,
    price: 30,
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["Vocabulary", "Translation", "Words"],
  },
  {
    id: 11,
    title: "الوراثة والتطور",
    subject: "الأحياء",
    specialization: "علمي علوم",
    teacher: { id: "t6", name: "أ/ منى السيد", rating: 4.8 },
    description: "شرح تفصيلي للوراثة الجزيئية والتطور مع رسومات توضيحية",
    pages: 130,
    downloads: 8500,
    rating: 4.8,
    price: 70,
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["وراثة", "DNA", "تطور"],
  },
  {
    id: 12,
    title: "تاريخ مصر الحديث",
    subject: "التاريخ",
    specialization: "أدبي",
    teacher: { id: "t7", name: "أ/ محمود سالم", rating: 4.6 },
    description: "ملخص شامل لتاريخ مصر والعالم الحديث مع خرائط ذهنية",
    pages: 150,
    downloads: 6500,
    rating: 4.5,
    price: 50,
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["تاريخ", "مصر", "حديث"],
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

const TeachersBooksPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("الكل");
  const [selectedSpecialization, setSelectedSpecialization] = useState("الكل");

  const filteredBooks = useMemo(() => {
    let filtered = [...TEACHERS_BOOKS];

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.includes(searchQuery) ||
          book.teacher.name.includes(searchQuery) ||
          book.subject.includes(searchQuery) ||
          book.description.includes(searchQuery),
      );
    }

    if (selectedSubject !== "الكل") {
      filtered = filtered.filter((book) => book.subject === selectedSubject);
    }

    if (selectedSpecialization !== "الكل") {
      filtered = filtered.filter(
        (book) =>
          book.specialization === selectedSpecialization ||
          book.specialization === "عام",
      );
    }

    return filtered;
  }, [searchQuery, selectedSubject, selectedSpecialization]);

  const handleBuy = (e, book) => {
  e.stopPropagation();
  navigate("/checkout", {
    state: {
      item: book,
      itemType: "book",
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
                📚 كتب المدرسين
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9 }}
              >
                ملخصات ومذكرات من أفضل مدرسي الثانوية العامة
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
                placeholder="ابحث عن كتاب أو مدرس..."
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
            عرض {filteredBooks.length} كتاب
          </Typography>
        </Box>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
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
              📚
            </Typography>
            <Typography
              variant="h6"
              fontFamily="Cairo, sans-serif"
              sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
            >
              لا توجد كتب تطابق البحث
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredBooks.map((book, index) => (
              <Grid item xs={12} sm={6} lg={4} key={book.id}>
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
                        borderColor: book.color,
                        transform: "translateY(-8px)",
                        boxShadow: darkMode
                          ? `0 20px 40px rgba(0,0,0,0.5)`
                          : `0 20px 40px ${book.color}20`,
                        bgcolor: darkMode ? "#253449" : "white",
                      },
                    }}
                  >
                    {/* Book Header */}
                    <Box
                      sx={{
                        background: book.gradient,
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

                      {/* Price Badge - في مكان زرار القلب */}
                      <Chip
                        label={`${book.price} جنيه`}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          bgcolor: "rgba(255,255,255,0.95)",
                          color: book.color,
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 800,
                          fontSize: 13,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      />

                      {/* Subject Badge */}
                      <Chip
                        label={book.subject}
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

                      {/* Book Icon */}
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
                          mt: 3,
                        }}
                      >
                        <MenuBookRounded
                          sx={{ fontSize: 32, color: "white" }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: "white" }}
                      >
                        {book.title}
                      </Typography>
                    </Box>

                    <CardContent sx={{ p: 2.5 }}>
                      {/* Teacher - Clickable */}
                      <Box
                        onClick={() => navigate(`/teacher/${book.teacher.id}`)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: darkMode ? "#334155" : `${book.color}08`,
                          mb: 2,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: darkMode ? "#475569" : `${book.color}15`,
                            transform: "translateX(-5px)",
                          },
                        }}
                      >
                        <Avatar
                          sx={{ width: 40, height: 40, bgcolor: book.color }}
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
                            {book.teacher.name}
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
                              {book.teacher.rating}
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
                        {book.description}
                      </Typography>

                      {/* Stats */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <DescriptionRounded
                            sx={{
                              fontSize: 16,
                              color: darkMode ? "#64748b" : "#94a3b8",
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                          >
                            {book.pages} صفحة
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <DownloadRounded
                            sx={{
                              fontSize: 16,
                              color: darkMode ? "#64748b" : "#94a3b8",
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                          >
                            {(book.downloads / 1000).toFixed(1)}K
                          </Typography>
                        </Box>
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
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                          >
                            {book.rating}
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
                        {book.tags.slice(0, 3).map((tag) => (
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
                          onClick={() => navigate(`/teachers-books/${book.id}`)}
                          sx={{
                            flex: 1,
                            borderColor: book.color,
                            color: book.color,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            borderRadius: 2,
                            "&:hover": {
                              borderColor: book.color,
                              bgcolor: `${book.color}10`,
                            },
                          }}
                        >
                          التفاصيل
                        </Button>

                        <Button
                          variant="contained"
                          startIcon={<ShoppingCartRounded />}
                          onClick={(e) => handleBuy(e, book)}
                          sx={{
                            flex: 1,
                            background: book.gradient,
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 700,
                            borderRadius: 2,
                            boxShadow: "none",
                            "&:hover": {
                              boxShadow: `0 8px 20px ${book.color}40`,
                            },
                          }}
                        >
                          اشتري
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

export default TeachersBooksPage;
