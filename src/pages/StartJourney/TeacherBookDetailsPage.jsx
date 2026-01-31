// pages/TeacherBookDetailsPage.jsx
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import {
  ArrowForwardRounded,
  MenuBookRounded,
  PersonRounded,
  DownloadRounded,
  StarRounded,
  DescriptionRounded,
  ChevronLeftRounded,
  ShoppingCartRounded,
  CheckCircleRounded,
  AccessTimeRounded,
  UpdateRounded,
  FolderRounded,
  PictureAsPdfRounded,
  LockRounded,
  VisibilityRounded,
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
// بيانات الكتب الكاملة
// ═══════════════════════════════════════════════════════════════════

const ALL_BOOKS = {
  1: {
    id: 1,
    title: "ملخص التفاضل والتكامل",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    description: "ملخص شامل لكل قوانين ونظريات التفاضل والتكامل مع أمثلة محلولة وتدريبات متنوعة على نمط امتحانات الثانوية العامة.",
    fullDescription: `
      هذا الكتاب هو دليلك الشامل لإتقان التفاضل والتكامل في الرياضيات البحتة للصف الثالث الثانوي.
      
      يتميز الكتاب بـ:
      • شرح مبسط ومتدرج لكل المفاهيم
      • أمثلة محلولة خطوة بخطوة
      • تدريبات متنوعة على نمط الامتحانات
      • خرائط ذهنية لتسهيل الحفظ
      • ملخصات في نهاية كل فصل
      • نماذج امتحانات محلولة
    `,
    teacher: {
      id: "t1",
      name: "أ/ محمد أحمد",
      title: "خبير الرياضيات",
      bio: "مدرس رياضيات بخبرة 15 سنة في تدريس الثانوية العامة. حاصل على ماجستير في الرياضيات البحتة.",
      rating: 4.9,
      studentsCount: 15000,
      booksCount: 8,
      coursesCount: 12,
    },
    pages: 120,
    chapters: 6,
    downloads: 8500,
    rating: 4.8,
    price: 75,
    originalPrice: 100,
    oldPrice: 100,
    discount: 25,
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    tags: ["تفاضل", "تكامل", "نهايات", "مشتقات"],
    lastUpdated: "يناير 2025",
    fileSize: "15 MB",
    language: "العربية",
    level: "الثالث الثانوي",
    chaptersData: [
      { id: 1, title: "الفصل الأول: النهايات", description: "مفهوم النهاية، نظريات النهايات، النهايات المثلثية", pages: 22, isFree: true },
      { id: 2, title: "الفصل الثاني: الاتصال", description: "تعريف الاتصال، أنواع عدم الاتصال، نظريات الاتصال", pages: 18, isFree: true },
      { id: 3, title: "الفصل الثالث: المشتقة الأولى", description: "مفهوم المشتقة، قواعد الاشتقاق، مشتقات الدوال المثلثية", pages: 25, isFree: false },
      { id: 4, title: "الفصل الرابع: تطبيقات المشتقة", description: "معدل التغير، القيم العظمى والصغرى، رسم المنحنيات", pages: 20, isFree: false },
      { id: 5, title: "الفصل الخامس: التكامل غير المحدد", description: "مفهوم التكامل، طرق التكامل المختلفة", pages: 22, isFree: false },
      { id: 6, title: "الفصل السادس: التكامل المحدد", description: "التكامل المحدد، حساب المساحات، تطبيقات التكامل", pages: 18, isFree: false },
    ],
    features: ["شرح مبسط ومتدرج", "أمثلة محلولة خطوة بخطوة", "تدريبات على نمط الامتحانات", "خرائط ذهنية للمراجعة", "نماذج امتحانات محلولة", "تحديثات مجانية"],
  },
  2: {
    id: 2,
    title: "المراجعة النهائية - الجبر",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    description: "مراجعة نهائية شاملة للجبر والهندسة الفراغية مع حل نماذج الوزارة",
    fullDescription: "مراجعة نهائية شاملة تغطي كل موضوعات الجبر والهندسة الفراغية للصف الثالث الثانوي.",
    teacher: {
      id: "t1",
      name: "أ/ محمد أحمد",
      title: "خبير الرياضيات",
      bio: "مدرس رياضيات بخبرة 15 سنة في تدريس الثانوية العامة.",
      rating: 4.9,
      studentsCount: 15000,
      booksCount: 8,
      coursesCount: 12,
    },
    pages: 85,
    chapters: 5,
    downloads: 12000,
    rating: 4.9,
    price: 50,
    originalPrice: 70,
    oldPrice: 70,
    discount: 29,
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    tags: ["جبر", "مصفوفات", "هندسة فراغية"],
    lastUpdated: "يناير 2025",
    fileSize: "22 MB",
    language: "العربية",
    level: "الثالث الثانوي",
    chaptersData: [
      { id: 1, title: "الفصل الأول: المصفوفات", description: "أنواع المصفوفات والعمليات عليها", pages: 18, isFree: true },
      { id: 2, title: "الفصل الثاني: المحددات", description: "حساب المحددات وتطبيقاتها", pages: 15, isFree: true },
      { id: 3, title: "الفصل الثالث: المتجهات", description: "المتجهات في المستوى والفراغ", pages: 20, isFree: false },
      { id: 4, title: "الفصل الرابع: الخط المستقيم", description: "معادلات الخط في الفراغ", pages: 16, isFree: false },
      { id: 5, title: "الفصل الخامس: المستوى", description: "معادلة المستوى وتطبيقاتها", pages: 16, isFree: false },
    ],
    features: ["ملخص شامل", "حل نماذج الوزارة", "أسئلة متوقعة", "نصائح للحل السريع"],
  },
  3: {
    id: 3,
    title: "ملخص الميكانيكا الكاملة",
    subject: "الفيزياء",
    specialization: "علمي رياضة",
    description: "كل قوانين الميكانيكا مع شرح مبسط وأمثلة من امتحانات السنوات السابقة",
    fullDescription: "دليلك الشامل لإتقان الميكانيكا في الفيزياء.",
    teacher: {
      id: "t2",
      name: "أ/ أحمد علي",
      title: "دكتور فيزياء",
      bio: "دكتوراه في الفيزياء النظرية وخبرة 12 سنة في التدريس",
      rating: 4.8,
      studentsCount: 12000,
      booksCount: 6,
      coursesCount: 10,
    },
    pages: 95,
    chapters: 6,
    downloads: 9800,
    rating: 4.7,
    price: 60,
    originalPrice: 80,
    oldPrice: 80,
    discount: 25,
    color: "#059669",
    gradient: GRADIENTS.green,
    tags: ["ميكانيكا", "حركة", "قوى"],
    lastUpdated: "ديسمبر 2024",
    fileSize: "18 MB",
    language: "العربية",
    level: "الثالث الثانوي",
    chaptersData: [
      { id: 1, title: "الفصل الأول: الحركة الخطية", description: "قوانين الحركة في خط مستقيم", pages: 16, isFree: true },
      { id: 2, title: "الفصل الثاني: قوانين نيوتن", description: "القوة والحركة", pages: 18, isFree: true },
      { id: 3, title: "الفصل الثالث: الشغل والطاقة", description: "الشغل والقدرة والطاقة", pages: 15, isFree: false },
    ],
    features: ["شرح مبسط", "رسومات توضيحية", "أمثلة محلولة"],
  },
  4: {
    id: 4,
    title: "الكهربية والمغناطيسية",
    subject: "الفيزياء",
    specialization: "علمي",
    description: "شرح تفصيلي للكهربية الساكنة والتيار الكهربي والمغناطيسية",
    fullDescription: "كتاب شامل يغطي كل موضوعات الكهربية والمغناطيسية.",
    teacher: {
      id: "t2",
      name: "أ/ أحمد علي",
      title: "دكتور فيزياء",
      bio: "دكتوراه في الفيزياء النظرية",
      rating: 4.8,
      studentsCount: 12000,
      booksCount: 6,
      coursesCount: 10,
    },
    pages: 110,
    chapters: 7,
    downloads: 7500,
    rating: 4.8,
    price: 40,
    originalPrice: 55,
    oldPrice: 55,
    discount: 27,
    color: "#f59e0b",
    gradient: GRADIENTS.orange,
    tags: ["كهربية", "مغناطيسية", "تيار"],
    lastUpdated: "يناير 2025",
    fileSize: "25 MB",
    language: "العربية",
    level: "الثالث الثانوي",
    chaptersData: [
      { id: 1, title: "الفصل الأول: الكهربية الساكنة", description: "الشحنات والمجال الكهربي", pages: 18, isFree: true },
      { id: 2, title: "الفصل الثاني: الجهد الكهربي", description: "فرق الجهد والسعة", pages: 16, isFree: false },
    ],
    features: ["شرح تفصيلي", "رسومات وصور", "تجارب عملية"],
  },
  5: {
    id: 5,
    title: "الكيمياء العضوية من الصفر",
    subject: "الكيمياء",
    specialization: "علمي",
    description: "شرح مبسط للكيمياء العضوية مع كل التفاعلات والمعادلات",
    fullDescription: "دليلك الشامل لفهم الكيمياء العضوية من البداية.",
    teacher: {
      id: "t3",
      name: "أ/ سارة محمود",
      title: "خبيرة الكيمياء",
      bio: "ماجستير في الكيمياء العضوية وخبرة 10 سنوات",
      rating: 4.9,
      studentsCount: 18000,
      booksCount: 5,
      coursesCount: 8,
    },
    pages: 140,
    chapters: 8,
    downloads: 15000,
    rating: 4.9,
    price: 80,
    originalPrice: 100,
    oldPrice: 100,
    discount: 20,
    color: "#db2777",
    gradient: GRADIENTS.pink,
    tags: ["عضوية", "تفاعلات", "مركبات"],
    lastUpdated: "يناير 2025",
    fileSize: "30 MB",
    language: "العربية",
    level: "الثالث الثانوي",
    chaptersData: [
      { id: 1, title: "الفصل الأول: مقدمة في الكيمياء العضوية", description: "أساسيات الكيمياء العضوية", pages: 15, isFree: true },
      { id: 2, title: "الفصل الثاني: الهيدروكربونات", description: "الألكانات والألكينات", pages: 20, isFree: true },
      { id: 3, title: "الفصل الثالث: المشتقات الهيدروكربونية", description: "الكحولات والإيثرات", pages: 22, isFree: false },
    ],
    features: ["شرح من الصفر", "معادلات مرتبة", "ألوان توضيحية"],
  },
  6: {
    id: 6,
    title: "الاتزان الكيميائي والكهربية",
    subject: "الكيمياء",
    specialization: "علمي",
    description: "ملخص شامل للاتزان الكيميائي والكيمياء الكهربية مع مسائل محلولة",
    fullDescription: "كتاب متخصص في الاتزان الكيميائي والكيمياء الكهربية.",
    teacher: {
      id: "t3",
      name: "أ/ سارة محمود",
      title: "خبيرة الكيمياء",
      bio: "ماجستير في الكيمياء العضوية",
      rating: 4.9,
      studentsCount: 18000,
      booksCount: 5,
      coursesCount: 8,
    },
    pages: 75,
    chapters: 4,
    downloads: 6800,
    rating: 4.6,
    price: 35,
    originalPrice: 45,
    oldPrice: 45,
    discount: 22,
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    tags: ["اتزان", "كهربية", "خلايا"],
    lastUpdated: "ديسمبر 2024",
    fileSize: "12 MB",
    language: "العربية",
    level: "الثالث الثانوي",
    chaptersData: [
      { id: 1, title: "الفصل الأول: الاتزان الكيميائي", description: "مفهوم الاتزان وثوابته", pages: 20, isFree: true },
      { id: 2, title: "الفصل الثاني: الخلايا الجلفانية", description: "تفاعلات الأكسدة والاختزال", pages: 18, isFree: false },
    ],
    features: ["مسائل محلولة", "ملخصات سريعة"],
  },
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const TeacherBookDetailsPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { bookId } = useParams();

  const book = ALL_BOOKS[bookId];

  if (!book) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: darkMode ? "#0f172a" : "#f8fafc",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" sx={{ fontSize: 80, mb: 2 }}>📚</Typography>
          <Typography variant="h5" fontFamily="Cairo, sans-serif" fontWeight={700} sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}>
            الكتاب غير موجود
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/teachers-books")}
            sx={{ background: GRADIENTS.main, fontFamily: "Cairo, sans-serif", fontWeight: 700, borderRadius: 2 }}
          >
            العودة للكتب
          </Button>
        </Box>
      </Box>
    );
  }

  const handlePurchase = () => {
    console.log("Navigating to checkout for book:", book.title);
    navigate("/checkout", {
      state: {
        item: book,
        itemType: "book",
      },
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: darkMode ? "#0f172a" : "#f8fafc", pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: book.gradient,
          color: "white",
          pt: 3,
          pb: 8,
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" }} />
        <Box sx={{ position: "absolute", bottom: -80, left: -80, width: 250, height: 250, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Back Button */}
          <Box sx={{ mb: 4 }}>
            <IconButton
              onClick={() => navigate("/teachers-books")}
              sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" } }}
            >
              <ArrowForwardRounded />
            </IconButton>
          </Box>

          {/* Book Info */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
            <Box
              sx={{
                width: 140,
                height: 180,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <MenuBookRounded sx={{ fontSize: 70, color: "white" }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Chip label={book.subject} size="small" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontFamily: "Cairo, sans-serif", fontWeight: 600, mb: 1 }} />
              <Typography variant="h3" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 1 }}>{book.title}</Typography>
              <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.9, mb: 2, maxWidth: 600 }}>{book.description}</Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <StarRounded sx={{ fontSize: 20, color: "#fbbf24" }} />
                  <Typography fontWeight={700} fontFamily="Cairo, sans-serif">{book.rating}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <DownloadRounded sx={{ fontSize: 20 }} />
                  <Typography fontFamily="Cairo, sans-serif">{(book.downloads / 1000).toFixed(1)}K تحميل</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <DescriptionRounded sx={{ fontSize: 20 }} />
                  <Typography fontFamily="Cairo, sans-serif">{book.pages} صفحة</Typography>
                </Box>
              </Box>

              <Box
                onClick={() => navigate(`/teacher/${book.teacher.id}`)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.25)", transform: "translateX(-5px)" },
                }}
              >
                <Avatar sx={{ width: 40, height: 40, bgcolor: "rgba(255,255,255,0.3)" }}><PersonRounded /></Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={700} fontFamily="Cairo, sans-serif">{book.teacher.name}</Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.85 }}>{book.teacher.title}</Typography>
                </Box>
                <ChevronLeftRounded sx={{ opacity: 0.7 }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: -5 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            {/* Price Card - Mobile */}
            <Card
              elevation={0}
              sx={{
                display: { xs: "block", lg: "none" },
                mb: 3,
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box sx={{ height: 4, background: book.gradient }} />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography variant="h3" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>{book.price} جنيه</Typography>
                  {book.discount > 0 && (
                    <>
                      <Typography variant="h6" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#64748b" : "#94a3b8", textDecoration: "line-through" }}>{book.originalPrice} جنيه</Typography>
                      <Chip label={`خصم ${book.discount}%`} size="small" sx={{ bgcolor: "#dcfce7", color: "#059669", fontFamily: "Cairo, sans-serif", fontWeight: 700 }} />
                    </>
                  )}
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartRounded />}
                  onClick={handlePurchase}
                  sx={{ background: book.gradient, fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 18, borderRadius: 2, py: 1.5, boxShadow: "none", "&:hover": { boxShadow: `0 10px 30px ${book.color}40` } }}
                >
                  اشتري الآن
                </Button>
              </CardContent>
            </Card>

            {/* About Book */}
            <Card elevation={0} sx={{ mb: 3, border: "1px solid", borderColor: darkMode ? "#334155" : "#e5e7eb", bgcolor: darkMode ? "#1e293b" : "white", borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}>📖 عن الكتاب</Typography>
                <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b", lineHeight: 2, whiteSpace: "pre-line" }}>{book.fullDescription}</Typography>
              </CardContent>
            </Card>

            {/* Features */}
            <Card elevation={0} sx={{ mb: 3, border: "1px solid", borderColor: darkMode ? "#334155" : "#e5e7eb", bgcolor: darkMode ? "#1e293b" : "white", borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}>✨ مميزات الكتاب</Typography>
                <Grid container spacing={2}>
                  {book.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: darkMode ? "#334155" : `${book.color}08` }}>
                        <CheckCircleRounded sx={{ color: book.color }} />
                        <Typography fontFamily="Cairo, sans-serif" fontWeight={600} sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>{feature}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Chapters */}
            <Card elevation={0} sx={{ mb: 3, border: "1px solid", borderColor: darkMode ? "#334155" : "#e5e7eb", bgcolor: darkMode ? "#1e293b" : "white", borderRadius: 3, overflow: "hidden" }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: darkMode ? "#334155" : "#e5e7eb" }}>
                  <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>📚 محتويات الكتاب</Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b", mt: 0.5 }}>{book.chapters} فصول • {book.pages} صفحة</Typography>
                </Box>

                {book.chaptersData.map((chapter, index) => (
                  <Box
                    key={chapter.id}
                    sx={{
                      p: 3,
                      borderBottom: index < book.chaptersData.length - 1 ? "1px solid" : "none",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      transition: "all 0.2s ease",
                      "&:hover": { bgcolor: darkMode ? "#334155" : "#f8fafc" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: chapter.isFree ? book.gradient : darkMode ? "#475569" : "#e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: chapter.isFree ? "white" : darkMode ? "#94a3b8" : "#64748b",
                        fontWeight: 800,
                        fontFamily: "Cairo, sans-serif",
                        fontSize: 18,
                        flexShrink: 0,
                      }}
                    >
                      {chapter.isFree ? chapter.id : <LockRounded sx={{ fontSize: 20 }} />}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>{chapter.title}</Typography>
                        {chapter.isFree && (
                          <Chip label="مجاني" size="small" sx={{ height: 20, fontSize: 10, bgcolor: "#dcfce7", color: "#059669", fontFamily: "Cairo, sans-serif", fontWeight: 700 }} />
                        )}
                      </Box>
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b", mb: 1 }}>{chapter.description}</Typography>
                      <Chip size="small" label={`${chapter.pages} صفحة`} sx={{ height: 22, fontSize: 11, bgcolor: darkMode ? "#334155" : "#f1f5f9", color: darkMode ? "#94a3b8" : "#64748b", fontFamily: "Cairo, sans-serif" }} />
                    </Box>

                    {chapter.isFree && (
                      <Button size="small" startIcon={<VisibilityRounded />} sx={{ color: book.color, fontFamily: "Cairo, sans-serif", fontWeight: 600 }}>معاينة</Button>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Sticky */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              {/* Price Card - Desktop */}
              <Card
                elevation={0}
                sx={{
                  display: { xs: "none", lg: "block" },
                  mb: 3,
                  border: "1px solid",
                  borderColor: darkMode ? "#334155" : "#e5e7eb",
                  bgcolor: darkMode ? "#1e293b" : "white",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Box sx={{ height: 4, background: book.gradient }} />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                      <Typography variant="h3" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>{book.price}</Typography>
                      <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>جنيه</Typography>
                    </Box>
                    {book.discount > 0 && (
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#64748b" : "#94a3b8", textDecoration: "line-through" }}>{book.originalPrice} جنيه</Typography>
                        <Chip label={`خصم ${book.discount}%`} size="small" sx={{ bgcolor: "#dcfce7", color: "#059669", fontFamily: "Cairo, sans-serif", fontWeight: 700 }} />
                      </Box>
                    )}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartRounded />}
                    onClick={handlePurchase}
                    sx={{ background: book.gradient, fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 18, borderRadius: 2, py: 1.5, boxShadow: "none", "&:hover": { boxShadow: `0 10px 30px ${book.color}40` } }}
                  >
                    اشتري الآن
                  </Button>
                </CardContent>
              </Card>

              {/* Book Info Card */}
              <Card elevation={0} sx={{ mb: 3, border: "1px solid", borderColor: darkMode ? "#334155" : "#e5e7eb", bgcolor: darkMode ? "#1e293b" : "white", borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}>📋 معلومات الكتاب</Typography>

                  {[
                    { icon: <FolderRounded />, label: "المادة", value: book.subject },
                    { icon: <DescriptionRounded />, label: "عدد الصفحات", value: `${book.pages} صفحة` },
                    { icon: <MenuBookRounded />, label: "عدد الفصول", value: `${book.chapters} فصل` },
                    { icon: <PictureAsPdfRounded />, label: "حجم الملف", value: book.fileSize },
                    { icon: <UpdateRounded />, label: "آخر تحديث", value: book.lastUpdated },
                    { icon: <AccessTimeRounded />, label: "المستوى", value: book.level },
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.5, borderBottom: index < 5 ? `1px solid ${darkMode ? "#334155" : "#e5e7eb"}` : "none" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}>{item.icon}</Box>
                        <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>{item.label}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>{item.value}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Teacher Card */}
              <Card
                elevation={0}
                onClick={() => navigate(`/teacher/${book.teacher.id}`)}
                sx={{
                  border: "1px solid",
                  borderColor: darkMode ? "#334155" : "#e5e7eb",
                  bgcolor: darkMode ? "#1e293b" : "white",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: book.color, transform: "translateY(-4px)", boxShadow: `0 10px 30px ${book.color}20` },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>👨‍🏫 المدرس</Typography>
                    <ChevronLeftRounded sx={{ color: darkMode ? "#64748b" : "#94a3b8" }} />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 60, height: 60, bgcolor: book.color }}><PersonRounded sx={{ fontSize: 30 }} /></Avatar>
                    <Box>
                      <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>{book.teacher.name}</Typography>
                      <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>{book.teacher.title}</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                        <StarRounded sx={{ fontSize: 16, color: "#fbbf24" }} />
                        <Typography variant="caption" fontWeight={600} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>{book.teacher.rating}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b", lineHeight: 1.7, mb: 2 }}>{book.teacher.bio}</Typography>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>{(book.teacher.studentsCount / 1000).toFixed(0)}K</Typography>
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>طالب</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>{book.teacher.booksCount}</Typography>
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>كتاب</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      <Typography variant="h6" fontWeight={800} fontFamily="Cairo, sans-serif" sx={{ color: book.color }}>{book.teacher.coursesCount}</Typography>
                      <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>كورس</Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={<ChevronLeftRounded />}
                    sx={{ mt: 2, borderColor: book.color, color: book.color, fontFamily: "Cairo, sans-serif", fontWeight: 600, borderRadius: 2, "&:hover": { borderColor: book.color, bgcolor: `${book.color}10` } }}
                  >
                    عرض صفحة المدرس
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherBookDetailsPage;