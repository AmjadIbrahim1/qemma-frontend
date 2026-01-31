// pages/CourseDetailsPage.jsx
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
  Chip,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowForwardRounded,
  ArrowBackRounded,
  SchoolRounded,
  PersonRounded,
  StarRounded,
  ShoppingCartRounded,
  PlayCircleOutlineRounded,
  AccessTimeRounded,
  PeopleRounded,
  CheckCircleRounded,
  ExpandMoreRounded,
  PlayArrowRounded,
  LockRounded,
  EmojiEventsRounded,
  TrendingUpRounded,
  ChevronLeftRounded,
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

// بيانات الكورس (في الواقع ستأتي من API)
const COURSE_DATA = {
  1: {
    id: 1,
    title: "كورس التفاضل والتكامل الشامل",
    subject: "الرياضيات",
    specialization: "علمي رياضة",
    teacher: {
      id: "t1",
      name: "أ/ محمد أحمد",
      rating: 4.9,
      students: 2500,
      bio: "مدرس رياضيات بخبرة 15 سنة في تدريس الثانوية العامة",
      qualifications: ["بكالوريوس الرياضيات", "ماجستير في التربية"],
    },
    description:
      "كورس شامل ومتكامل يغطي كل أبواب التفاضل والتكامل من الأساسيات حتى الاحتراف، مع شرح تفصيلي لكل القوانين والنظريات وحل أمثلة متنوعة وامتحانات السنوات السابقة",
    price: 299,
    oldPrice: 499,
    duration: "45 ساعة",
    lessonsCount: 60,
    studentsCount: 2500,
    rating: 4.8,
    reviewsCount: 850,
    level: "متوسط",
    color: "#2563eb",
    gradient: GRADIENTS.blue,
    tags: ["تفاضل", "تكامل", "نهايات"],
    completionRate: 85,
    features: [
      "60 درس فيديو عالي الجودة",
      "أمثلة محلولة على كل درس",
      "امتحانات تجريبية",
      "مذكرة PDF شاملة",
      "دعم فني مباشر",
      "شهادة إتمام الكورس",
    ],
    requirements: [
      "فهم أساسيات الجبر",
      "معرفة الدوال والمتباينات",
      "جهاز كمبيوتر أو موبايل",
      "اتصال بالإنترنت",
    ],
    targetAudience: [
      "طلاب الصف الثالث الثانوي علمي رياضة",
      "من يريد تقوية مستواه في الرياضيات",
      "المستعدين لامتحانات الثانوية العامة",
    ],
    curriculum: [
      {
        section: "الباب الأول: النهايات",
        lessons: [
          { id: 1, title: "مقدمة عن النهايات", duration: "15:30", isFree: true },
          { id: 2, title: "نهاية الدالة عند نقطة", duration: "22:45", isFree: true },
          { id: 3, title: "النهايات عند اللانهاية", duration: "28:15", isFree: false },
          { id: 4, title: "حل تمارين على النهايات", duration: "35:20", isFree: false },
        ],
      },
      {
        section: "الباب الثاني: التفاضل",
        lessons: [
          { id: 5, title: "تعريف المشتقة", duration: "18:30", isFree: false },
          { id: 6, title: "قواعد الاشتقاق", duration: "25:40", isFree: false },
          { id: 7, title: "مشتقة الدوال المثلثية", duration: "30:15", isFree: false },
          { id: 8, title: "مشتقة الدوال الأسية واللوغاريتمية", duration: "27:50", isFree: false },
          { id: 9, title: "تطبيقات على المشتقة", duration: "32:20", isFree: false },
        ],
      },
      {
        section: "الباب الثالث: التكامل",
        lessons: [
          { id: 10, title: "التكامل غير المحدود", duration: "20:15", isFree: false },
          { id: 11, title: "التكامل المحدود", duration: "24:30", isFree: false },
          { id: 12, title: "طرق التكامل", duration: "28:45", isFree: false },
          { id: 13, title: "تطبيقات على التكامل", duration: "31:20", isFree: false },
        ],
      },
      {
        section: "المراجعة النهائية",
        lessons: [
          { id: 14, title: "مراجعة شاملة", duration: "45:00", isFree: false },
          { id: 15, title: "حل امتحانات السنوات السابقة", duration: "50:30", isFree: false },
        ],
      },
    ],
  },
  // يمكن إضافة بيانات الكورسات الأخرى هنا
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const CourseDetailsPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { courseId } = useParams();

  const [expandedSection, setExpandedSection] = useState(0);

  // في الواقع، ستأتي البيانات من API
  const course = COURSE_DATA[courseId] || COURSE_DATA[1];

  const handleExpandSection = (sectionIndex) => {
    setExpandedSection(expandedSection === sectionIndex ? -1 : sectionIndex);
  };

  const handleBuy = () => {
    console.log("Buying course:", course.title);
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
        sx={{
          background: course.gradient,
          color: "white",
          pt: 3,
          pb: 8,
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Circles */}
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

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Back Button */}
          <IconButton
            onClick={() => navigate("/courses")}
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              mb: 3,
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            <ArrowForwardRounded />
          </IconButton>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              {/* Subject Badge */}
              <Chip
                label={course.subject}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 600,
                  mb: 2,
                }}
              />

              {/* Title */}
              <Typography
                variant="h3"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ mb: 2 }}
              >
                {course.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                fontFamily="Cairo, sans-serif"
                sx={{ opacity: 0.95, mb: 3, lineHeight: 1.8 }}
              >
                {course.description}
              </Typography>

              {/* Stats */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StarRounded sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    {course.rating} ({course.reviewsCount} تقييم)
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PeopleRounded sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    {course.studentsCount.toLocaleString()} طالب
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeRounded sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    {course.duration}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PlayCircleOutlineRounded sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontFamily="Cairo, sans-serif">
                    {course.lessonsCount} درس
                  </Typography>
                </Box>
              </Box>

              {/* Teacher Info - Clickable */}
              <Box
                onClick={() => navigate(`/teacher/${course.teacher.id}`)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.25)",
                    transform: "translateX(-5px)",
                  },
                }}
              >
                <Avatar sx={{ width: 50, height: 50, bgcolor: "rgba(255,255,255,0.3)" }}>
                  <PersonRounded />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    fontFamily="Cairo, sans-serif"
                    sx={{ opacity: 0.8 }}
                  >
                    المدرس
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                  >
                    {course.teacher.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <StarRounded sx={{ fontSize: 14 }} />
                    <Typography variant="caption" fontFamily="Cairo, sans-serif">
                      {course.teacher.rating} • {course.teacher.students} طالب
                    </Typography>
                  </Box>
                </Box>
                <ChevronLeftRounded />
              </Box>
            </Grid>

            {/* Price Card */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={3}
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Price */}
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: course.color }}
                    >
                      {course.price} جنيه
                    </Typography>
                    <Typography
                      variant="h6"
                      fontFamily="Cairo, sans-serif"
                      sx={{
                        color: "#94a3b8",
                        textDecoration: "line-through",
                        mt: 0.5,
                      }}
                    >
                      {course.oldPrice} جنيه
                    </Typography>
                    <Chip
                      label={`وفر ${course.oldPrice - course.price} جنيه`}
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: "#dcfce7",
                        color: "#059669",
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  {/* Buy Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartRounded />}
                    onClick={handleBuy}
                    sx={{
                      background: course.gradient,
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      py: 1.5,
                      borderRadius: 2,
                      mb: 2,
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: `0 8px 20px ${course.color}40`,
                      },
                    }}
                  >
                    اشتري الآن
                  </Button>

                  <Typography
                    variant="caption"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: "#64748b", textAlign: "center", display: "block" }}
                  >
                    ضمان استرجاع المال خلال 30 يوم
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2 }}>
        <Grid container spacing={3}>
          {/* Right Column */}
          <Grid item xs={12} md={8}>
            {/* What You'll Learn */}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      background: course.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmojiEventsRounded sx={{ color: "white", fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                  >
                    ماذا ستتعلم؟
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {course.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: "flex", alignItems: "start", gap: 1.5 }}>
                        <CheckCircleRounded
                          sx={{ fontSize: 20, color: "#059669", mt: 0.3 }}
                        />
                        <Typography
                          variant="body2"
                          fontFamily="Cairo, sans-serif"
                          sx={{ color: darkMode ? "#e2e8f0" : "#475569" }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Curriculum */}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      background: course.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PlayCircleOutlineRounded sx={{ color: "white", fontSize: 28 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h5"
                      fontWeight={900}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      محتوى الكورس
                    </Typography>
                    <Typography
                      variant="caption"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {course.curriculum.length} أبواب • {course.lessonsCount} درس •{" "}
                      {course.duration}
                    </Typography>
                  </Box>
                </Box>

                {course.curriculum.map((section, index) => (
                  <Accordion
                    key={index}
                    expanded={expandedSection === index}
                    onChange={() => handleExpandSection(index)}
                    elevation={0}
                    sx={{
                      mb: 1,
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      bgcolor: darkMode ? "#0f172a" : "#f8fafc",
                      borderRadius: "12px !important",
                      "&:before": { display: "none" },
                      "&.Mui-expanded": {
                        borderColor: course.color,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreRounded
                          sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                        />
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            bgcolor: darkMode ? "#334155" : "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: course.color }}
                          >
                            {index + 1}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                          >
                            {section.section}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                          >
                            {section.lessons.length} دروس
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List sx={{ p: 0 }}>
                        {section.lessons.map((lesson, lessonIndex) => (
                          <ListItem
                            key={lesson.id}
                            sx={{
                              py: 1.5,
                              px: 2,
                              borderRadius: 2,
                              mb: 0.5,
                              "&:hover": {
                                bgcolor: darkMode ? "#1e293b" : "white",
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              {lesson.isFree ? (
                                <PlayArrowRounded
                                  sx={{ fontSize: 20, color: "#059669" }}
                                />
                              ) : (
                                <LockRounded
                                  sx={{ fontSize: 20, color: "#94a3b8" }}
                                />
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  fontFamily="Cairo, sans-serif"
                                  sx={{ color: darkMode ? "#e2e8f0" : "#475569" }}
                                >
                                  {lesson.title}
                                </Typography>
                              }
                            />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              {lesson.isFree && (
                                <Chip
                                  label="مجاني"
                                  size="small"
                                  sx={{
                                    bgcolor: "#dcfce7",
                                    color: "#059669",
                                    fontFamily: "Cairo, sans-serif",
                                    fontSize: "0.65rem",
                                    height: 20,
                                  }}
                                />
                              )}
                              <Typography
                                variant="caption"
                                fontFamily="Cairo, sans-serif"
                                sx={{ color: darkMode ? "#64748b" : "#94a3b8" }}
                              >
                                {lesson.duration}
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            {/* Requirements */}
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
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", mb: 2 }}
                >
                  المتطلبات
                </Typography>
                <List sx={{ p: 0 }}>
                  {course.requirements.map((req, index) => (
                    <ListItem key={index} sx={{ py: 1, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: course.color,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontFamily="Cairo, sans-serif"
                            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                          >
                            {req}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Left Column */}
          <Grid item xs={12} md={4}>
            {/* Teacher Card */}
            <Card
              elevation={0}
              sx={{
                mb: 3,
                border: "1px solid",
                borderColor: darkMode ? "#334155" : "#e5e7eb",
                bgcolor: darkMode ? "#1e293b" : "white",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* Header with gradient */}
              <Box
                sx={{
                  background: course.gradient,
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "rgba(255,255,255,0.2)",
                    border: "3px solid white",
                  }}
                >
                  <PersonRounded sx={{ fontSize: 40, color: "white" }} />
                </Avatar>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "white", mb: 0.5 }}
                >
                  {course.teacher.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <StarRounded sx={{ fontSize: 18, color: "white" }} />
                  <Typography
                    variant="body2"
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: "white" }}
                  >
                    {course.teacher.rating}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {course.teacher.students.toLocaleString()} طالب
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="body2"
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#94a3b8" : "#64748b", mb: 2, lineHeight: 1.7 }}
                >
                  {course.teacher.bio}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="caption"
                  fontWeight={700}
                  fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? "#f1f5f9" : "#1e293b", display: "block", mb: 1 }}
                >
                  المؤهلات
                </Typography>
                {course.teacher.qualifications.map((qual, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <CheckCircleRounded sx={{ fontSize: 16, color: "#059669" }} />
                    <Typography
                      variant="caption"
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {qual}
                    </Typography>
                  </Box>
                ))}

                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<ArrowBackRounded />}
                  onClick={() => navigate(`/teacher/${course.teacher.id}`)}
                  disabled
                  sx={{
                    mt: 2,
                    borderColor: course.color,
                    color: course.color,
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 700,
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: course.color,
                      bgcolor: `${course.color}10`,
                    },
                    "&.Mui-disabled": {
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      color: darkMode ? "#64748b" : "#94a3b8",
                    },
                  }}
                >
                  الملف الشخصي
                </Button>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card
              elevation={0}
              sx={{
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
                  إحصائيات الكورس
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                      {course.completionRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={course.completionRate}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: darkMode ? "#334155" : "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        background: course.gradient,
                        borderRadius: 1,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                      <TrendingUpRounded sx={{ fontSize: 20, color: course.color }} />
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      >
                        المستوى
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {course.level}
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
                      <SchoolRounded sx={{ fontSize: 20, color: course.color }} />
                      <Typography
                        variant="body2"
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                      >
                        التخصص
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
                    >
                      {course.specialization}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetailsPage;