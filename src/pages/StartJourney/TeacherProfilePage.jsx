// pages/StartJourney/TeacherProfilePage.jsx
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  IconButton,
  Chip,
  Divider,
  Tab,
  Tabs,
  Rating,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowForwardRounded,
  PersonRounded,
  StarRounded,
  SchoolRounded,
  MenuBookRounded,
  PlayCircleOutlineRounded,
  PeopleRounded,
  EmojiEventsRounded,
  CheckCircleRounded,
  FacebookRounded,
  YouTube,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  TrendingUpRounded,
  VerifiedRounded,
  WorkspacePremiumRounded,
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
};

// بيانات المدرس (في الواقع ستأتي من API)
const TEACHERS_DATA = {
  t1: {
    id: "t1",
    name: "أ/ محمد أحمد",
    title: "مدرس الرياضيات",
    specialization: "الرياضيات - علمي رياضة",
    rating: 4.9,
    reviewsCount: 1250,
    studentsCount: 2500,
    coursesCount: 8,
    booksCount: 5,
    yearsOfExperience: 15,
    bio: "مدرس رياضيات بخبرة 15 سنة في تدريس الثانوية العامة. حاصل على الماجستير في التربية وطرق تدريس الرياضيات. ساعدت أكثر من 2500 طالب في تحقيق التفوق والحصول على الدرجات النهائية. أسلوبي في التدريس يعتمد على الشرح المبسط والتطبيق العملي مع التركيز على فهم المفاهيم بدلاً من الحفظ.",
    qualifications: [
      "بكالوريوس الرياضيات - جامعة القاهرة",
      "ماجستير في التربية - جامعة عين شمس",
      "دبلومة في طرق التدريس الحديثة",
      "شهادة في التعليم الإلكتروني",
    ],
    achievements: [
      "أفضل مدرس في الثانوية العامة 2023",
      "حصل طلابي على 95% نسبة نجاح",
      "مؤلف 3 كتب في الرياضيات",
      "أكثر من 50000 مشاهدة على يوتيوب",
    ],
    subjects: ["التفاضل والتكامل", "الجبر", "الهندسة الفراغية", "المثلثات"],
    contact: {
      email: "mohamed.ahmed@qemma.com",
      phone: "+20 100 123 4567",
      location: "القاهرة، مصر",
      facebook: "https://facebook.com/mohamed.ahmed",
      youtube: "https://youtube.com/@mohamed.ahmed",
    },
    stats: {
      totalHours: 450,
      completionRate: 92,
      responseTime: "أقل من ساعة",
      satisfaction: 98,
    },
    courses: [
      {
        id: 1,
        title: "كورس التفاضل والتكامل الشامل",
        price: 299,
        students: 2500,
        rating: 4.8,
      },
      {
        id: 2,
        title: "الجبر والهندسة الفراغية",
        price: 249,
        students: 3200,
        rating: 4.9,
      },
    ],
    books: [
      {
        id: 1,
        title: "ملخص التفاضل والتكامل",
        price: 75,
        downloads: 8500,
        rating: 4.8,
      },
      {
        id: 2,
        title: "المراجعة النهائية - الجبر",
        price: 50,
        downloads: 12000,
        rating: 4.9,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "أحمد محمود",
        rating: 5,
        date: "2024-01-15",
        comment: "أفضل مدرس رياضيات! شرحه واضح جداً وبسيط",
      },
      {
        id: 2,
        studentName: "فاطمة حسن",
        rating: 5,
        date: "2024-01-10",
        comment: "بفضل أستاذ محمد حصلت على 98% في الرياضيات",
      },
      {
        id: 3,
        studentName: "عمر خالد",
        rating: 4,
        date: "2024-01-05",
        comment: "ممتاز في التوضيح ومتابعة الطلاب باستمرار",
      },
    ],
  },
  t2: {
    id: "t2",
    name: "أ/ أحمد علي",
    title: "مدرس الفيزياء",
    specialization: "الفيزياء - علمي رياضة وعلوم",
    rating: 4.8,
    reviewsCount: 980,
    studentsCount: 1800,
    coursesCount: 6,
    booksCount: 4,
    yearsOfExperience: 12,
    bio: "مدرس فيزياء متخصص في تبسيط المفاهيم المعقدة وجعلها سهلة الفهم. خبرة 12 سنة في تدريس الثانوية العامة مع التركيز على الجانب العملي والتطبيقي.",
    qualifications: [
      "بكالوريوس الفيزياء",
      "دبلومة في التربية",
      "شهادة ICDL",
    ],
    achievements: [
      "أكثر من 1800 طالب متفوق",
      "مؤلف كتابين في الفيزياء",
      "حاصل على جائزة التميز التعليمي",
    ],
    subjects: ["الميكانيكا", "الكهربية", "المغناطيسية", "الضوء"],
    contact: {
      email: "ahmed.ali@qemma.com",
      phone: "+20 100 234 5678",
      location: "الجيزة، مصر",
    },
    stats: {
      totalHours: 380,
      completionRate: 89,
      responseTime: "أقل من ساعتين",
      satisfaction: 96,
    },
    courses: [
      {
        id: 3,
        title: "الميكانيكا والحركة",
        price: 279,
        students: 1800,
        rating: 4.7,
      },
      {
        id: 4,
        title: "الكهربية والمغناطيسية الكاملة",
        price: 269,
        students: 2100,
        rating: 4.8,
      },
    ],
    books: [
      {
        id: 3,
        title: "ملخص الميكانيكا الكاملة",
        price: 60,
        downloads: 9800,
        rating: 4.7,
      },
      {
        id: 4,
        title: "الكهربية والمغناطيسية",
        price: 40,
        downloads: 7500,
        rating: 4.8,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "سارة أحمد",
        rating: 5,
        date: "2024-01-20",
        comment: "شرح ممتاز والأمثلة واضحة جداً",
      },
      {
        id: 2,
        studentName: "محمد يوسف",
        rating: 4,
        date: "2024-01-18",
        comment: "استفدت كثيراً من الكورسات",
      },
    ],
  },
  t3: {
    id: "t3",
    name: "أ/ سارة محمود",
    title: "مدرسة الكيمياء",
    specialization: "الكيمياء - علمي",
    rating: 4.9,
    reviewsCount: 1450,
    studentsCount: 3500,
    coursesCount: 7,
    booksCount: 6,
    yearsOfExperience: 18,
    bio: "مدرسة كيمياء متميزة بخبرة 18 سنة. متخصصة في الكيمياء العضوية وغير العضوية. أسلوبي يعتمد على الربط بين النظرية والتطبيق العملي.",
    qualifications: [
      "بكالوريوس الكيمياء",
      "ماجستير في الكيمياء العضوية",
      "دبلومة في طرق التدريس",
    ],
    achievements: [
      "أكثر من 3500 طالب متفوق",
      "مؤلفة 4 كتب في الكيمياء",
      "نسبة نجاح 97%",
    ],
    subjects: ["الكيمياء العضوية", "الكيمياء غير العضوية", "الاتزان الكيميائي"],
    contact: {
      email: "sara.mahmoud@qemma.com",
      phone: "+20 100 345 6789",
      location: "القاهرة، مصر",
    },
    stats: {
      totalHours: 520,
      completionRate: 94,
      responseTime: "أقل من ساعة",
      satisfaction: 99,
    },
    courses: [
      {
        id: 5,
        title: "الكيمياء العضوية من الصفر للاحتراف",
        price: 319,
        students: 3500,
        rating: 4.9,
      },
      {
        id: 6,
        title: "الكيمياء الكهربية والاتزان",
        price: 239,
        students: 2800,
        rating: 4.6,
      },
    ],
    books: [
      {
        id: 5,
        title: "الكيمياء العضوية من الصفر",
        price: 80,
        downloads: 15000,
        rating: 4.9,
      },
      {
        id: 6,
        title: "الاتزان الكيميائي والكهربية",
        price: 35,
        downloads: 6800,
        rating: 4.6,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "منى خالد",
        rating: 5,
        date: "2024-01-22",
        comment: "أفضل مدرسة كيمياء! أسلوبها رائع",
      },
      {
        id: 2,
        studentName: "علي حسن",
        rating: 5,
        date: "2024-01-19",
        comment: "شرح مبسط وواضح جداً",
      },
    ],
  },
  t4: {
    id: "t4",
    name: "أ/ فاطمة حسن",
    title: "مدرسة اللغة العربية",
    specialization: "اللغة العربية",
    rating: 4.7,
    reviewsCount: 1680,
    studentsCount: 4200,
    coursesCount: 9,
    booksCount: 7,
    yearsOfExperience: 20,
    bio: "مدرسة لغة عربية بخبرة 20 سنة. متخصصة في النحو والبلاغة والأدب. أساعد الطلاب على فهم قواعد اللغة بطريقة سهلة ومبسطة.",
    qualifications: [
      "بكالوريوس اللغة العربية",
      "ماجستير في النحو والصرف",
      "دكتوراه في الأدب العربي",
    ],
    achievements: [
      "أكثر من 4200 طالب متفوق",
      "مؤلفة 5 كتب في اللغة العربية",
      "نسبة نجاح 96%",
    ],
    subjects: ["النحو", "البلاغة", "الأدب", "النصوص"],
    contact: {
      email: "fatma.hassan@qemma.com",
      phone: "+20 100 456 7890",
      location: "الإسكندرية، مصر",
    },
    stats: {
      totalHours: 600,
      completionRate: 91,
      responseTime: "أقل من ساعتين",
      satisfaction: 97,
    },
    courses: [
      {
        id: 7,
        title: "النحو الشامل - من الأساسيات للإتقان",
        price: 259,
        students: 4200,
        rating: 4.8,
      },
      {
        id: 8,
        title: "البلاغة والأدب والنصوص",
        price: 229,
        students: 3100,
        rating: 4.5,
      },
    ],
    books: [
      {
        id: 7,
        title: "النحو الشامل للثانوية",
        price: 55,
        downloads: 22000,
        rating: 4.8,
      },
      {
        id: 8,
        title: "البلاغة والأدب",
        price: 45,
        downloads: 8900,
        rating: 4.5,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "نور محمد",
        rating: 5,
        date: "2024-01-21",
        comment: "طريقة شرح ممتازة ومبسطة",
      },
    ],
  },
  t5: {
    id: "t5",
    name: "Mr. Ahmed Hassan",
    title: "English Language Teacher",
    specialization: "English Language",
    rating: 4.8,
    reviewsCount: 1120,
    studentsCount: 2900,
    coursesCount: 6,
    booksCount: 4,
    yearsOfExperience: 14,
    bio: "Experienced English teacher with 14 years of teaching secondary education. Specialized in grammar, vocabulary, and exam preparation.",
    qualifications: [
      "Bachelor of English Literature",
      "Teaching Diploma",
      "TESOL Certificate",
    ],
    achievements: [
      "More than 2900 successful students",
      "Author of 4 English books",
      "95% pass rate",
    ],
    subjects: ["Grammar", "Vocabulary", "Reading", "Writing"],
    contact: {
      email: "ahmed.hassan@qemma.com",
      phone: "+20 100 567 8901",
      location: "Cairo, Egypt",
    },
    stats: {
      totalHours: 420,
      completionRate: 90,
      responseTime: "Less than 2 hours",
      satisfaction: 96,
    },
    courses: [
      {
        id: 9,
        title: "English Grammar Complete Course",
        price: 289,
        students: 2900,
        rating: 4.7,
      },
      {
        id: 10,
        title: "Vocabulary & Writing Mastery",
        price: 219,
        students: 2400,
        rating: 4.6,
      },
    ],
    books: [
      {
        id: 9,
        title: "Grammar Master Guide",
        price: 65,
        downloads: 11000,
        rating: 4.7,
      },
      {
        id: 10,
        title: "Vocabulary & Translation",
        price: 30,
        downloads: 7200,
        rating: 4.6,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "Mona Ali",
        rating: 5,
        date: "2024-01-23",
        comment: "Excellent teacher! Very helpful",
      },
    ],
  },
  t6: {
    id: "t6",
    name: "أ/ منى السيد",
    title: "مدرسة الأحياء",
    specialization: "الأحياء - علمي علوم",
    rating: 4.8,
    reviewsCount: 890,
    studentsCount: 2200,
    coursesCount: 5,
    booksCount: 3,
    yearsOfExperience: 13,
    bio: "مدرسة أحياء متخصصة في الوراثة والتطور. خبرة 13 سنة في تدريس الثانوية العامة مع التركيز على الفهم العميق للمفاهيم البيولوجية.",
    qualifications: [
      "بكالوريوس علوم - قسم الأحياء",
      "ماجستير في الوراثة الجزيئية",
      "دبلومة في التعليم الإلكتروني",
    ],
    achievements: [
      "أكثر من 2200 طالب متفوق",
      "مؤلفة كتابين في الأحياء",
      "نسبة نجاح 94%",
    ],
    subjects: ["الوراثة", "التطور", "علم النبات", "علم الحيوان"],
    contact: {
      email: "mona.elsayed@qemma.com",
      phone: "+20 100 678 9012",
      location: "القاهرة، مصر",
    },
    stats: {
      totalHours: 350,
      completionRate: 88,
      responseTime: "أقل من ساعتين",
      satisfaction: 95,
    },
    courses: [
      {
        id: 11,
        title: "الوراثة الجزيئية والتطور",
        price: 299,
        students: 2200,
        rating: 4.8,
      },
    ],
    books: [
      {
        id: 11,
        title: "الوراثة والتطور",
        price: 70,
        downloads: 8500,
        rating: 4.8,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "ياسمين أحمد",
        rating: 5,
        date: "2024-01-24",
        comment: "شرح ممتاز ومفصل جداً",
      },
    ],
  },
  t7: {
    id: "t7",
    name: "أ/ محمود سالم",
    title: "مدرس التاريخ",
    specialization: "التاريخ - أدبي",
    rating: 4.6,
    reviewsCount: 720,
    studentsCount: 1600,
    coursesCount: 4,
    booksCount: 3,
    yearsOfExperience: 16,
    bio: "مدرس تاريخ بخبرة 16 سنة. متخصص في تاريخ مصر والعالم الحديث. أحب جعل التاريخ ممتع وسهل الفهم للطلاب.",
    qualifications: [
      "بكالوريوس التاريخ",
      "ماجستير في التاريخ الحديث",
      "دبلومة في التربية",
    ],
    achievements: [
      "أكثر من 1600 طالب متفوق",
      "مؤلف 3 كتب في التاريخ",
      "نسبة نجاح 93%",
    ],
    subjects: ["التاريخ الحديث", "تاريخ مصر", "التاريخ الإسلامي"],
    contact: {
      email: "mahmoud.salem@qemma.com",
      phone: "+20 100 789 0123",
      location: "الإسكندرية، مصر",
    },
    stats: {
      totalHours: 320,
      completionRate: 87,
      responseTime: "أقل من 3 ساعات",
      satisfaction: 94,
    },
    courses: [
      {
        id: 12,
        title: "تاريخ مصر والعالم الحديث",
        price: 249,
        students: 1600,
        rating: 4.5,
      },
    ],
    books: [
      {
        id: 12,
        title: "تاريخ مصر الحديث",
        price: 50,
        downloads: 6500,
        rating: 4.5,
      },
    ],
    reviews: [
      {
        id: 1,
        studentName: "أحمد فتحي",
        rating: 5,
        date: "2024-01-25",
        comment: "طريقة شرح جميلة وممتعة",
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const TeacherProfilePage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { teacherId } = useParams();

  const [activeTab, setActiveTab] = useState(0);

  // في الواقع، ستأتي البيانات من API
  const teacher = TEACHERS_DATA[teacherId] || TEACHERS_DATA["t1"];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f8fafc",
        pb: 4,
      }}
    >
      {/* Header with Cover */}
      <Box
        sx={{
          background: GRADIENTS.main,
          color: "white",
          pt: 3,
          pb: 12,
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Back Button */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              mb: 3,
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            <ArrowForwardRounded />
          </IconButton>

          {/* Teacher Basic Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <PersonRounded sx={{ fontSize: 60 }} />
              </Avatar>
            </motion.div>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                >
                  {teacher.name}
                </Typography>
                <VerifiedRounded sx={{ fontSize: 32, color: "#fbbf24" }} />
              </Box>

              <Typography
                variant="h6"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.95, mb: 2 }}
              >
                {teacher.title} • {teacher.specialization}
              </Typography>

              {/* Stats */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StarRounded sx={{ fontSize: 24, color: "#fbbf24" }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {teacher.rating}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    ({teacher.reviewsCount.toLocaleString()} تقييم)
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PeopleRounded sx={{ fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {teacher.studentsCount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    طالب
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SchoolRounded sx={{ fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {teacher.coursesCount}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    كورسات
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MenuBookRounded sx={{ fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {teacher.booksCount}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    كتب
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday sx={{ fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {teacher.yearsOfExperience}
                  </Typography>
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    سنة خبرة
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: -6, position: "relative", zIndex: 2 }}>
        <Grid container spacing={3}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} md={8}>
            {/* Tabs */}
            <Card
              elevation={0}
              sx={{
                mb: 3,
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  borderBottom: 1,
                  borderColor: darkMode ? "#334155" : "#e5e7eb",
                  "& .MuiTab-root": {
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 700,
                    color: darkMode ? "#94a3b8" : "#64748b",
                    "&.Mui-selected": {
                      color: "#2563eb",
                    },
                  },
                }}
              >
                <Tab label="نبذة عني" />
                <Tab label="الكورسات" />
                <Tab label="الكتب" />
                <Tab label="التقييمات" />
              </Tabs>

              <CardContent sx={{ p: 3 }}>
                {/* Tab 0: About */}
                {activeTab === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                    >
                      عن المدرس
                    </Typography>
                    <Typography
                      variant="body1"
                      fontFamily="Cairo, sans-serif"
                      sx={{
                        color: darkMode ? "#94a3b8" : "#64748b",
                        lineHeight: 2,
                        mb: 3,
                      }}
                    >
                      {teacher.bio}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                    >
                      المؤهلات
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {teacher.qualifications.map((qual, index) => (
                        <ListItem key={index} sx={{ py: 1, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleRounded
                              sx={{ fontSize: 20, color: "#059669" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? "#e2e8f0" : "#475569" }}
                              >
                                {qual}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                    >
                      الإنجازات
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {teacher.achievements.map((achievement, index) => (
                        <ListItem key={index} sx={{ py: 1, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <EmojiEventsRounded
                              sx={{ fontSize: 20, color: "#f59e0b" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? "#e2e8f0" : "#475569" }}
                              >
                                {achievement}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                    >
                      المواد التي أدرسها
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {teacher.subjects.map((subject) => (
                        <Chip
                          key={subject}
                          label={subject}
                          sx={{
                            bgcolor: darkMode ? "#334155" : "#f1f5f9",
                            color: darkMode ? "#e2e8f0" : "#475569",
                            fontFamily: "Cairo, sans-serif",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>
                  </motion.div>
                )}

                {/* Tab 1: Courses */}
                {activeTab === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 3 }}
                    >
                      كورسات المدرس ({teacher.courses.length})
                    </Typography>
                    <Grid container spacing={2}>
                      {teacher.courses.map((course) => (
                        <Grid item xs={12} key={course.id}>
                          <Paper
                            onClick={() => navigate(`/courses/${course.id}`)}
                            sx={{
                              p: 2.5,
                              cursor: "pointer",
                              border: "1px solid",
                              borderColor: darkMode ? "#334155" : "#e5e7eb",
                              bgcolor: darkMode ? "#0f172a" : "white",
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#2563eb",
                                transform: "translateX(-5px)",
                                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body1"
                                  fontWeight={700}
                                  fontFamily="Cairo, sans-serif"
                                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 1 }}
                                >
                                  {course.title}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <StarRounded sx={{ fontSize: 16, color: "#fbbf24" }} />
                                    <Typography
                                      variant="caption"
                                      fontFamily="Cairo, sans-serif"
                                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                                    >
                                      {course.rating}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <PeopleRounded
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
                                      {course.students.toLocaleString()} طالب
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Typography
                                variant="h6"
                                fontWeight={900}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: "#2563eb" }}
                              >
                                {course.price} جنيه
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </motion.div>
                )}

                {/* Tab 2: Books */}
                {activeTab === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 3 }}
                    >
                      كتب المدرس ({teacher.books.length})
                    </Typography>
                    <Grid container spacing={2}>
                      {teacher.books.map((book) => (
                        <Grid item xs={12} key={book.id}>
                          <Paper
                            onClick={() => navigate(`/teachers-books/${book.id}`)}
                            sx={{
                              p: 2.5,
                              cursor: "pointer",
                              border: "1px solid",
                              borderColor: darkMode ? "#334155" : "#e5e7eb",
                              bgcolor: darkMode ? "#0f172a" : "white",
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#7c3aed",
                                transform: "translateX(-5px)",
                                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.15)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body1"
                                  fontWeight={700}
                                  fontFamily="Cairo, sans-serif"
                                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 1 }}
                                >
                                  {book.title}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <StarRounded sx={{ fontSize: 16, color: "#fbbf24" }} />
                                    <Typography
                                      variant="caption"
                                      fontFamily="Cairo, sans-serif"
                                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                                    >
                                      {book.rating}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <PlayCircleOutlineRounded
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
                                      {book.downloads.toLocaleString()} تحميل
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Typography
                                variant="h6"
                                fontWeight={900}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: "#7c3aed" }}
                              >
                                {book.price} جنيه
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </motion.div>
                )}

                {/* Tab 3: Reviews */}
                {activeTab === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 3 }}
                    >
                      تقييمات الطلاب ({teacher.reviews.length})
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {teacher.reviews.map((review) => (
                        <Paper
                          key={review.id}
                          sx={{
                            p: 2.5,
                            border: "1px solid",
                            borderColor: darkMode ? "#334155" : "#e5e7eb",
                            bgcolor: darkMode ? "#0f172a" : "white",
                            borderRadius: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "start",
                              mb: 1,
                            }}
                          >
                            <Box>
                              <Typography
                                variant="body1"
                                fontWeight={700}
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                              >
                                {review.studentName}
                              </Typography>
                              <Typography
                                variant="caption"
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                              >
                                {review.date}
                              </Typography>
                            </Box>
                            <Rating value={review.rating} readOnly size="small" />
                          </Box>
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                          >
                            {review.comment}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Contact Card */}
            <Card
              elevation={0}
              sx={{
                mb: 3,
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 3 }}
                >
                  معلومات التواصل
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Email sx={{ fontSize: 20, color: darkMode ? "#64748b" : "#94a3b8" }} />
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {teacher.contact.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Phone sx={{ fontSize: 20, color: darkMode ? "#64748b" : "#94a3b8" }} />
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {teacher.contact.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LocationOn
                      sx={{ fontSize: 20, color: darkMode ? "#64748b" : "#94a3b8" }}
                    />
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {teacher.contact.location}
                    </Typography>
                  </Box>
                </Box>

                {teacher.contact.facebook && (
                  <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                    <IconButton
                      sx={{
                        bgcolor: darkMode ? "#334155" : "#f1f5f9",
                        "&:hover": { bgcolor: "#1877f2" },
                      }}
                    >
                      <FacebookRounded />
                    </IconButton>
                    {teacher.contact.youtube && (
                      <IconButton
                        sx={{
                          bgcolor: darkMode ? "#334155" : "#f1f5f9",
                          "&:hover": { bgcolor: "#ff0000" },
                        }}
                      >
                        <YouTube />
                      </IconButton>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card
              elevation={0}
              sx={{
                mb: 3,
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 3 }}
                >
                  إحصائيات المدرس
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
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
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      >
                        معدل الإتمام
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                      >
                        {teacher.stats.completionRate}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={teacher.stats.completionRate}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: darkMode ? "#334155" : "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          background: GRADIENTS.blue,
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>

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
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      >
                        رضا الطلاب
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                      >
                        {teacher.stats.satisfaction}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={teacher.stats.satisfaction}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: darkMode ? "#334155" : "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          background: GRADIENTS.green,
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: darkMode ? "#0f172a" : "#f8fafc",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <PlayCircleOutlineRounded
                        sx={{ fontSize: 20, color: "#2563eb" }}
                      />
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      >
                        إجمالي الساعات
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {teacher.stats.totalHours} ساعة
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: darkMode ? "#0f172a" : "#f8fafc",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <TrendingUpRounded sx={{ fontSize: 20, color: "#059669" }} />
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      >
                        وقت الرد
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {teacher.stats.responseTime}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Badge Card */}
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  background: GRADIENTS.orange,
                  p: 3,
                  textAlign: "center",
                }}
              >
                <WorkspacePremiumRounded sx={{ fontSize: 48, color: "white", mb: 1 }} />
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "white" }}
                >
                  مدرس معتمد
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                >
                  هذا المدرس معتمد من منصة قِمّة ويتمتع بسجل حافل من النجاحات مع
                  الطلاب
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherProfilePage;