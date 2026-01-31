// pages/student/BookDetailsPage.jsx
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
  Divider,
} from "@mui/material";
import {
  ArrowForwardRounded,
  MenuBookRounded,
  BookmarkRounded,
  BookmarkBorderRounded,
  PersonRounded,
  DownloadRounded,
  DescriptionRounded,
  StarRounded,
  CalculateRounded,
  FunctionsRounded,
  ScienceRounded,
  BiotechRounded,
  AutoStoriesRounded,
  TranslateRounded,
  HistoryEduRounded,
  PublicRounded,
  PsychologyRounded,
  ChevronLeftRounded,
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
    title: "الرياضيات البحتة",
    subtitle: "التفاضل والتكامل",
    subject: "الرياضيات",
    teacherId: "teacher_1",
    teacher: "أ/ محمد أحمد",
    teacherBio: "مدرس رياضيات بخبرة 15 سنة في تدريس الثانوية العامة",
    icon: CalculateRounded,
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    chapters: 8,
    pages: 320,
    isFavorite: true,
    description:
      "كتاب التفاضل والتكامل للصف الثالث الثانوي يشمل جميع موضوعات التفاضل والتكامل المقررة على طلاب الثانوية العامة شعبة علمي رياضة. يتناول الكتاب مفاهيم النهايات والاتصال والاشتقاق والتكامل بأسلوب مبسط مع أمثلة تطبيقية متنوعة.",
    lastUpdated: "سبتمبر 2024",
    downloadSize: "45 MB",
    rating: 4.8,
    reviewsCount: 1250,
    chaptersData: [
      {
        id: 1,
        title: "الفصل الأول: النهايات",
        description:
          "يتناول هذا الفصل مفهوم النهاية وكيفية حسابها، ونظريات النهايات الأساسية، والنهايات المثلثية وخواصها.",
        lessonsCount: 8,
        pagesCount: 42,
      },
      {
        id: 2,
        title: "الفصل الثاني: الاتصال",
        description:
          "يشرح هذا الفصل تعريف الاتصال عند نقطة وعلى فترة، وأنواع عدم الاتصال المختلفة، ونظريات الاتصال.",
        lessonsCount: 6,
        pagesCount: 35,
      },
      {
        id: 3,
        title: "الفصل الثالث: التفاضل",
        description:
          "يتضمن مفهوم المشتقة وقواعد الاشتقاق الأساسية، ومشتقات الدوال المثلثية واللوغاريتمية والأسية.",
        lessonsCount: 10,
        pagesCount: 55,
      },
      {
        id: 4,
        title: "الفصل الرابع: تطبيقات التفاضل",
        description:
          "يركز على تطبيقات المشتقة مثل معدل التغير، والقيم العظمى والصغرى، ورسم المنحنيات.",
        lessonsCount: 8,
        pagesCount: 48,
      },
      {
        id: 5,
        title: "الفصل الخامس: التكامل غير المحدد",
        description:
          "يشمل مفهوم التكامل غير المحدد وطرق التكامل المختلفة مثل التعويض والتجزئة.",
        lessonsCount: 9,
        pagesCount: 52,
      },
      {
        id: 6,
        title: "الفصل السادس: التكامل المحدد",
        description:
          "يتناول التكامل المحدد وخواصه ونظرية التفاضل والتكامل الأساسية وتطبيقاتها.",
        lessonsCount: 7,
        pagesCount: 40,
      },
      {
        id: 7,
        title: "الفصل السابع: تطبيقات التكامل",
        description:
          "يشرح تطبيقات التكامل في حساب المساحات والحجوم الدورانية وطول المنحنى.",
        lessonsCount: 8,
        pagesCount: 45,
      },
      {
        id: 8,
        title: "الفصل الثامن: المعادلات التفاضلية",
        description:
          "مقدمة في المعادلات التفاضلية من الدرجة الأولى وطرق حلها وتطبيقاتها.",
        lessonsCount: 6,
        pagesCount: 38,
      },
    ],
  },
  2: {
    id: 2,
    title: "الرياضيات البحتة",
    subtitle: "الجبر والهندسة الفراغية",
    subject: "الرياضيات",
    teacherId: "teacher_1",
    teacher: "أ/ محمد أحمد",
    teacherBio: "مدرس رياضيات بخبرة 15 سنة في تدريس الثانوية العامة",
    icon: FunctionsRounded,
    color: "#7c3aed",
    gradient: GRADIENTS.purple,
    chapters: 6,
    pages: 280,
    isFavorite: false,
    description:
      "كتاب الجبر والهندسة الفراغية للصف الثالث الثانوي يشمل المصفوفات والمحددات والمتجهات والهندسة الفراغية بأسلوب شامل ومتدرج.",
    lastUpdated: "سبتمبر 2024",
    downloadSize: "38 MB",
    rating: 4.7,
    reviewsCount: 980,
    chaptersData: [
      {
        id: 1,
        title: "الفصل الأول: المصفوفات",
        description:
          "يتناول تعريف المصفوفة وأنواعها والعمليات عليها من جمع وطرح وضرب ومعكوس المصفوفة.",
        lessonsCount: 7,
        pagesCount: 45,
      },
      {
        id: 2,
        title: "الفصل الثاني: المحددات",
        description:
          "يشرح حساب المحددات وخواصها وتطبيقاتها في حل المعادلات الخطية بقاعدة كرامر.",
        lessonsCount: 6,
        pagesCount: 38,
      },
      {
        id: 3,
        title: "الفصل الثالث: المتجهات في المستوى",
        description:
          "يتضمن مفهوم المتجه والعمليات على المتجهات والضرب القياسي والضرب الاتجاهي.",
        lessonsCount: 8,
        pagesCount: 50,
      },
      {
        id: 4,
        title: "الفصل الرابع: المتجهات في الفراغ",
        description:
          "يشرح المتجهات في الفضاء ثلاثي الأبعاد وتطبيقاتها الهندسية.",
        lessonsCount: 7,
        pagesCount: 42,
      },
      {
        id: 5,
        title: "الفصل الخامس: الخط المستقيم في الفراغ",
        description:
          "يتناول معادلات الخط المستقيم في الفراغ وأوضاع الخطوط والمستويات.",
        lessonsCount: 6,
        pagesCount: 40,
      },
      {
        id: 6,
        title: "الفصل السادس: المستوى",
        description:
          "يشمل معادلة المستوى وأوضاع المستويات والمسافات والزوايا في الفراغ.",
        lessonsCount: 8,
        pagesCount: 48,
      },
    ],
  },
  3: {
    id: 3,
    title: "الفيزياء",
    subtitle: "الميكانيكا والكهربية",
    subject: "الفيزياء",
    teacherId: "teacher_2",
    teacher: "أ/ أحمد علي",
    teacherBio: "دكتوراه في الفيزياء النظرية وخبرة 12 سنة في التدريس",
    icon: ScienceRounded,
    color: "#059669",
    gradient: GRADIENTS.green,
    chapters: 10,
    pages: 400,
    isFavorite: true,
    description:
      "كتاب الفيزياء للصف الثالث الثانوي يشمل الميكانيكا الكلاسيكية والموائع والحرارة والكهربية والمغناطيسية مع تجارب عملية وتطبيقات حياتية.",
    lastUpdated: "سبتمبر 2024",
    downloadSize: "52 MB",
    rating: 4.9,
    reviewsCount: 1500,
    chaptersData: [
      {
        id: 1,
        title: "الفصل الأول: الحركة الدورانية",
        description:
          "يتناول العزم والاتزان والحركة الدائرية والعزوم والقوى في الحركة الدورانية.",
        lessonsCount: 8,
        pagesCount: 45,
      },
      {
        id: 2,
        title: "الفصل الثاني: الموائع",
        description:
          "يشرح ضغط الموائع وقاعدة باسكال وأرشميدس ومعادلة الاستمرارية وبرنولي.",
        lessonsCount: 7,
        pagesCount: 40,
      },
      {
        id: 3,
        title: "الفصل الثالث: الغازات",
        description:
          "يتضمن قوانين الغازات والنظرية الحركية للغازات والطاقة الحركية الجزيئية.",
        lessonsCount: 6,
        pagesCount: 35,
      },
      {
        id: 4,
        title: "الفصل الرابع: الحرارة",
        description:
          "يشمل انتقال الحرارة والتمدد الحراري والسعة الحرارية والحرارة الكامنة.",
        lessonsCount: 7,
        pagesCount: 38,
      },
      {
        id: 5,
        title: "الفصل الخامس: الكهربية الساكنة",
        description:
          "يتناول الشحنة الكهربية وقانون كولوم والمجال الكهربي والجهد الكهربي.",
        lessonsCount: 9,
        pagesCount: 48,
      },
      {
        id: 6,
        title: "الفصل السادس: المكثفات",
        description: "يشرح المكثفات وسعتها وتوصيلها والطاقة المختزنة فيها.",
        lessonsCount: 6,
        pagesCount: 35,
      },
      {
        id: 7,
        title: "الفصل السابع: التيار الكهربي",
        description:
          "يتضمن شدة التيار وقانون أوم والمقاومة الكهربية والقدرة الكهربية.",
        lessonsCount: 8,
        pagesCount: 42,
      },
      {
        id: 8,
        title: "الفصل الثامن: دوائر التيار المستمر",
        description: "يشمل قانونا كيرشوف وتحليل الدوائر الكهربية المعقدة.",
        lessonsCount: 7,
        pagesCount: 40,
      },
      {
        id: 9,
        title: "الفصل التاسع: التأثير المغناطيسي للتيار",
        description:
          "يتناول المجال المغناطيسي للتيار الكهربي وقوانينه وتطبيقاته.",
        lessonsCount: 8,
        pagesCount: 45,
      },
      {
        id: 10,
        title: "الفصل العاشر: الحث الكهرومغناطيسي",
        description: "يشرح قانون فاراداي ولنز والمحولات والمولدات الكهربية.",
        lessonsCount: 9,
        pagesCount: 50,
      },
    ],
  },
  4: {
    id: 4,
    title: "الكيمياء",
    subtitle: "الكيمياء العضوية وغير العضوية",
    subject: "الكيمياء",
    teacherId: "teacher_3",
    teacher: "أ/ سارة محمود",
    teacherBio: "ماجستير في الكيمياء العضوية وخبرة 10 سنوات",
    icon: BiotechRounded,
    color: "#db2777",
    gradient: GRADIENTS.pink,
    chapters: 7,
    pages: 350,
    isFavorite: false,
    description:
      "كتاب الكيمياء للصف الثالث الثانوي يشمل الكيمياء العضوية والكيمياء الكهربية والاتزان الكيميائي مع معادلات وتفاعلات متنوعة.",
    lastUpdated: "سبتمبر 2024",
    downloadSize: "48 MB",
    rating: 4.6,
    reviewsCount: 890,
    chaptersData: [
      {
        id: 1,
        title: "الفصل الأول: الكيمياء العضوية - مقدمة",
        description:
          "يتناول خصائص المركبات العضوية والروابط الكيميائية فيها والتسمية النظامية.",
        lessonsCount: 7,
        pagesCount: 45,
      },
      {
        id: 2,
        title: "الفصل الثاني: الهيدروكربونات",
        description:
          "يشرح الألكانات والألكينات والألكاينات وخواصها وتفاعلاتها.",
        lessonsCount: 9,
        pagesCount: 55,
      },
      {
        id: 3,
        title: "الفصل الثالث: المشتقات الهيدروكربونية",
        description:
          "يتضمن الكحولات والإيثرات والألدهيدات والكيتونات والأحماض الكربوكسيلية.",
        lessonsCount: 10,
        pagesCount: 60,
      },
      {
        id: 4,
        title: "الفصل الرابع: الاتزان الكيميائي",
        description:
          "يشمل مفهوم الاتزان وثابت الاتزان والعوامل المؤثرة عليه ومبدأ لوشاتلييه.",
        lessonsCount: 8,
        pagesCount: 48,
      },
      {
        id: 5,
        title: "الفصل الخامس: الاتزان الأيوني",
        description:
          "يتناول الأحماض والقواعد والرقم الهيدروجيني والمحاليل المنظمة.",
        lessonsCount: 7,
        pagesCount: 42,
      },
      {
        id: 6,
        title: "الفصل السادس: الكيمياء الكهربية",
        description:
          "يشرح الخلايا الجلفانية والتحليل الكهربي وقوانين فاراداي.",
        lessonsCount: 8,
        pagesCount: 50,
      },
      {
        id: 7,
        title: "الفصل السابع: الكيمياء العضوية التطبيقية",
        description:
          "يتضمن البوليمرات والبروتينات والكربوهيدرات وتطبيقاتها الحياتية.",
        lessonsCount: 6,
        pagesCount: 38,
      },
    ],
  },
  5: {
    id: 5,
    title: "اللغة العربية",
    subtitle: "النحو والبلاغة والأدب",
    subject: "اللغة العربية",
    teacherId: "teacher_4",
    teacher: "أ/ فاطمة حسن",
    teacherBio: "دكتوراه في اللغة العربية وآدابها",
    icon: AutoStoriesRounded,
    color: "#f59e0b",
    gradient: GRADIENTS.orange,
    chapters: 12,
    pages: 380,
    isFavorite: false,
    description:
      "كتاب اللغة العربية للصف الثالث الثانوي يشمل النحو والصرف والبلاغة والأدب والنصوص والقراءة مع تدريبات شاملة.",
    lastUpdated: "سبتمبر 2024",
    downloadSize: "35 MB",
    rating: 4.7,
    reviewsCount: 1100,
    chaptersData: [
      {
        id: 1,
        title: "الفصل الأول: الإعراب والبناء",
        description:
          "يتناول قواعد الإعراب والبناء في الأسماء والأفعال والحروف.",
        lessonsCount: 6,
        pagesCount: 32,
      },
      {
        id: 2,
        title: "الفصل الثاني: المنصوبات",
        description:
          "يشرح المفاعيل والحال والتمييز والاستثناء وأحكامها الإعرابية.",
        lessonsCount: 7,
        pagesCount: 35,
      },
      {
        id: 3,
        title: "الفصل الثالث: المجرورات",
        description: "يتضمن حروف الجر والإضافة والتوابع وإعرابها.",
        lessonsCount: 5,
        pagesCount: 28,
      },
      {
        id: 4,
        title: "الفصل الرابع: الأساليب النحوية",
        description:
          "يشمل أساليب الاستفهام والشرط والتعجب والمدح والذم والإغراء والتحذير.",
        lessonsCount: 8,
        pagesCount: 40,
      },
      {
        id: 5,
        title: "الفصل الخامس: علم البلاغة - البيان",
        description:
          "يتناول التشبيه والاستعارة والكناية والمجاز المرسل وأثرها البلاغي.",
        lessonsCount: 6,
        pagesCount: 32,
      },
      {
        id: 6,
        title: "الفصل السادس: علم البلاغة - المعاني",
        description:
          "يشرح الخبر والإنشاء والقصر والوصل والفصل والإيجاز والإطناب.",
        lessonsCount: 7,
        pagesCount: 35,
      },
      {
        id: 7,
        title: "الفصل السابع: علم البلاغة - البديع",
        description:
          "يتضمن المحسنات البديعية اللفظية والمعنوية وأثرها في النص.",
        lessonsCount: 5,
        pagesCount: 28,
      },
      {
        id: 8,
        title: "الفصل الثامن: الأدب في العصر الحديث",
        description: "يشمل مدارس الشعر الحديث والرومانسية والواقعية والرمزية.",
        lessonsCount: 6,
        pagesCount: 32,
      },
      {
        id: 9,
        title: "الفصل التاسع: النصوص الشعرية",
        description: "يتناول قصائد مختارة من الشعر العربي الحديث مع التحليل.",
        lessonsCount: 8,
        pagesCount: 40,
      },
      {
        id: 10,
        title: "الفصل العاشر: النصوص النثرية",
        description: "يشرح مقالات وقصص قصيرة ومسرحيات مختارة مع التحليل.",
        lessonsCount: 7,
        pagesCount: 35,
      },
      {
        id: 11,
        title: "الفصل الحادي عشر: القراءة",
        description: "يتضمن موضوعات قرائية متنوعة مع أسئلة الفهم والاستيعاب.",
        lessonsCount: 6,
        pagesCount: 30,
      },
      {
        id: 12,
        title: "الفصل الثاني عشر: التعبير",
        description: "يشمل فنون التعبير الإبداعي والوظيفي ومهاراته.",
        lessonsCount: 5,
        pagesCount: 25,
      },
    ],
  },
  6: {
    id: 6,
    title: "اللغة الإنجليزية",
    subtitle: "Grammar & Vocabulary",
    subject: "اللغة الإنجليزية",
    teacherId: "teacher_5",
    teacher: "Mr. Ahmed Hassan",
    teacherBio: "TEFL certified with 8 years of teaching experience",
    icon: TranslateRounded,
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    chapters: 8,
    pages: 250,
    isFavorite: true,
    description:
      "English language textbook for Grade 12 covering advanced grammar, vocabulary, reading comprehension, and writing skills with practice exercises.",
    lastUpdated: "September 2024",
    downloadSize: "28 MB",
    rating: 4.8,
    reviewsCount: 1050,
    chaptersData: [
      {
        id: 1,
        title: "Unit 1: Advanced Grammar",
        description:
          "Covers conditional sentences, passive voice, reported speech, and complex sentence structures.",
        lessonsCount: 8,
        pagesCount: 32,
      },
      {
        id: 2,
        title: "Unit 2: Vocabulary Building",
        description:
          "Advanced vocabulary related to science, technology, environment, and global issues.",
        lessonsCount: 7,
        pagesCount: 30,
      },
      {
        id: 3,
        title: "Unit 3: Reading Comprehension",
        description:
          "Strategies for understanding complex texts, inference, and critical analysis.",
        lessonsCount: 6,
        pagesCount: 28,
      },
      {
        id: 4,
        title: "Unit 4: Writing Skills",
        description:
          "Essay writing, formal letters, reports, and academic writing conventions.",
        lessonsCount: 8,
        pagesCount: 35,
      },
      {
        id: 5,
        title: "Unit 5: Listening & Speaking",
        description:
          "Conversation skills, presentations, and listening comprehension strategies.",
        lessonsCount: 6,
        pagesCount: 25,
      },
      {
        id: 6,
        title: "Unit 6: Literature",
        description:
          "Selected literary texts including short stories, poems, and drama extracts.",
        lessonsCount: 7,
        pagesCount: 32,
      },
      {
        id: 7,
        title: "Unit 7: Translation",
        description:
          "Translation techniques and practice between Arabic and English.",
        lessonsCount: 5,
        pagesCount: 22,
      },
      {
        id: 8,
        title: "Unit 8: Exam Practice",
        description:
          "Comprehensive revision and practice tests for the final examination.",
        lessonsCount: 6,
        pagesCount: 28,
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const BookDetailsPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { bookId } = useParams();

  // Get book data
  const book = ALL_BOOKS[bookId];

  // State
  const [isFavorite, setIsFavorite] = useState(book?.isFavorite || false);

  // If book not found
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
          <Typography variant="h1" sx={{ fontSize: 80, mb: 2 }}>
            📚
          </Typography>
          <Typography
            variant="h5"
            fontFamily="Cairo, sans-serif"
            fontWeight={700}
            sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
          >
            الكتاب غير موجود
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/student/books")}
            sx={{
              background: GRADIENTS.main,
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              borderRadius: 2,
            }}
          >
            العودة للكتب
          </Button>
        </Box>
      </Box>
    );
  }

  const BookIcon = book.icon;

  // Calculate total lessons
  const totalLessons = book.chaptersData.reduce(
    (acc, ch) => acc + ch.lessonsCount,
    0
  );

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
        sx={{
          background: book.gradient,
          color: "white",
          pt: 3,
          pb: 6,
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 250,
            height: 250,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.08)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Back Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <IconButton
              onClick={() => navigate("/student/books")}
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
              }}
            >
              <ArrowForwardRounded />
            </IconButton>

            
          </Box>

          {/* Book Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Book Icon */}
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BookIcon sx={{ fontSize: 60, color: "white" }} />
            </Box>

            {/* Book Details */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ mb: 0.5 }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="h6"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.9, mb: 2 }}
              >
                {book.subtitle}
              </Typography>

              {/* Quick Stats */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Chip
                  icon={<MenuBookRounded sx={{ fontSize: 18 }} />}
                  label={`${book.chapters} فصول`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<DescriptionRounded sx={{ fontSize: 18 }} />}
                  label={`${book.pages} صفحة`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<StarRounded sx={{ fontSize: 18 }} />}
                  label={`${book.rating} (${book.reviewsCount} تقييم)`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 600,
                  }}
                />
              </Box>

              {/* Teacher - Clickable */}
              <Box
                onClick={() => navigate(`/student/teacher/${book.teacherId}`)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.15)",
                  width: "fit-content",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.25)",
                    transform: "translateX(-5px)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <PersonRounded />
                </Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {book.teacher}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontFamily="Cairo, sans-serif"
                    sx={{ opacity: 0.85 }}
                  >
                    اضغط لعرض صفحة المدرس
                  </Typography>
                </Box>
                <ChevronLeftRounded sx={{ opacity: 0.7 }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: -3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Chapters */}
          <Grid item xs={12} lg={8}>
            {/* Description Card */}
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
                  fontWeight={800}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                >
                  📖 عن الكتاب
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily="Cairo, sans-serif"
                  sx={{
                    color: darkMode ? "#94a3b8" : "#64748b",
                    lineHeight: 1.8,
                  }}
                >
                  {book.description}
                </Typography>
              </CardContent>
            </Card>

            {/* Chapters */}
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
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    p: 3,
                    borderBottom: "1px solid",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                  >
                    📚 فصول الكتاب
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? "#94a3b8" : "#64748b", mt: 0.5 }}
                  >
                    {book.chapters} فصل • {totalLessons} درس
                  </Typography>
                </Box>

                {/* Chapters List */}
                {book.chaptersData.map((chapter, index) => (
                  <Box
                    key={chapter.id}
                    sx={{
                      p: 3,
                      borderBottom:
                        index < book.chaptersData.length - 1
                          ? "1px solid"
                          : "none",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: darkMode ? "#334155" : "#f8fafc",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      {/* Chapter Number */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: book.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 800,
                          fontFamily: "Cairo, sans-serif",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {chapter.id}
                      </Box>

                      {/* Chapter Info */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#f1f5f9" : "#1e293b",
                            mb: 1,
                          }}
                        >
                          {chapter.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color: darkMode ? "#94a3b8" : "#64748b",
                            lineHeight: 1.7,
                            mb: 1.5,
                          }}
                        >
                          {chapter.description}
                        </Typography>

                        {/* Chapter Stats */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Chip
                            size="small"
                            label={`${chapter.lessonsCount} درس`}
                            sx={{
                              bgcolor: darkMode
                                ? "#334155"
                                : `${book.color}15`,
                              color: book.color,
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            size="small"
                            label={`${chapter.pagesCount} صفحة`}
                            sx={{
                              bgcolor: darkMode ? "#334155" : "#f1f5f9",
                              color: darkMode ? "#94a3b8" : "#64748b",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Info */}
          <Grid item xs={12} lg={4}>
            {/* Teacher Card - Clickable */}
            <Card
              elevation={0}
              onClick={() => navigate(`/student/teacher/${book.teacherId}`)}
              sx={{
                mb: 3,
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: book.color,
                  transform: "translateY(-4px)",
                  boxShadow: darkMode
                    ? "0 10px 30px rgba(0,0,0,0.3)"
                    : "0 10px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                  >
                    👨‍🏫 المدرس
                  </Typography>
                  <ChevronLeftRounded
                    sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: book.color,
                    }}
                  >
                    <PersonRounded sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {book.teacher}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: book.color }}
                    >
                      {book.subject}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{
                    color: darkMode ? "#94a3b8" : "#64748b",
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  {book.teacherBio}
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<ChevronLeftRounded />}
                  sx={{
                    borderColor: book.color,
                    color: book.color,
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: `${book.color}10`,
                      borderColor: book.color,
                    },
                  }}
                >
                  عرض صفحة المدرس
                </Button>
              </CardContent>
            </Card>

            {/* Book Info Card */}
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
                  fontWeight={800}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                >
                  📋 معلومات الكتاب
                </Typography>

                {[
                  { label: "المادة", value: book.subject },
                  { label: "عدد الفصول", value: `${book.chapters} فصل` },
                  { label: "عدد الدروس", value: `${totalLessons} درس` },
                  { label: "عدد الصفحات", value: `${book.pages} صفحة` },
                  { label: "حجم التحميل", value: book.downloadSize },
                  { label: "آخر تحديث", value: book.lastUpdated },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1.5,
                      borderBottom:
                        index < 5
                          ? `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`
                          : "none",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Download Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<DownloadRounded />}
              sx={{
                background: book.gradient,
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                borderRadius: 2,
                py: 1.5,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: `0 8px 25px ${book.color}40`,
                },
              }}
            >
              تحميل الكتاب ({book.downloadSize})
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookDetailsPage;