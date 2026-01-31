// frontend/src/routes/AppRoutes.jsx - UPDATED WITH PAYMENT ROUTES
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Landing & Auth Pages
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ClerkCallbackPage from "../pages/auth/ClerkCallbackPage";
import ClerkRegisterCallbackPage from "../pages/auth/ClerkRegisterCallbackPage";
import ProfilePage from "../pages/ProfilePage";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import CourseDashboard from "../pages/student/CourseDashboard";
import NotificationsPage from "../pages/student/NotificationsPage";
import AskTeacherPage from "../pages/student/AskTeacherPage";
import BookOfficeHourPage from "../pages/student/BookOfficeHourPage";
import LessonPage from "../pages/student/LessonPage";
import MyCoursesPage from "../pages/student/MyCoursesPage";
import ExamsPage from "../pages/student/ExamsPage";
import SubmitAssignmentPage from "../pages/student/SubmitAssignmentPage";
import PerformanceReportPage from "../pages/student/PerformanceReportPage";
import LiveClassPage from "../pages/student/LiveClassPage";
import TasksPage from "../pages/student/TasksPage";
import BooksPage from "../pages/student/BooksPage";
import BookDetailsPage from "../pages/student/BookDetailsPage";
import AboutPage from "../pages/About/AboutPage";

// ✅ START JOURNEY PAGES
import StartJourneyPage from "../pages/StartJourney/StartJourneyPage";
import TeachersBooksPage from "../pages/StartJourney/TeachersBooksPage";
import TeacherBookDetailsPage from "../pages/StartJourney/TeacherBookDetailsPage";
import CoursesPage from "../pages/StartJourney/CoursesPage";
import CourseDetailsPage from "../pages/StartJourney/Coursedetailspage";
import ExamsPageOut from "../pages/StartJourney/ExamsPageOut";
import TeacherProfilePage from "../pages/StartJourney/TeacherProfilePage";

// ✅ PAYMENT PAGES
import CheckoutPage from "../pages/CheckoutPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";

// Student Contest Pages
import ContestsPage from "../pages/student/ContestsPage";
import StudentContestDashboard from "../pages/student/StudentContestDashboard";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import SendNotification from "../pages/teacher/SendNotification";
import CreateCourse from "../pages/teacher/CreateCourse";
import CreateExam from "../pages/teacher/CreateExam";
import MyCourses from "../pages/teacher/MyCourses";
import Analytics from "../pages/teacher/Analytics";
import TeacherLiveClass from "../pages/teacher/LiveClass";
import UploadLesson from "../pages/teacher/UploadLesson";
import EditCourse from "../pages/teacher/EditCourse";
import GradeExams from "../pages/teacher/GradeExams";
import TeacherSchedule from "../pages/teacher/TeacherSchedule";
import TeacherBooks from "../pages/teacher/TeacherBooks";

// Teacher Contest Pages
import TeacherContests from "../pages/teacher/TeacherContests";

// Assistant Teacher Pages
import AssistantTeacherDashboard from "../pages/assistant/AssistantTeacherDashboard";

// Parent Pages
import ParentDashboard from "../pages/parent/Dashboard";
import ChildProgress from "../pages/parent/ChildProgress";
import ChildDetails from "../pages/parent/ChildDetails";
import CourseDetails from "../pages/parent/CourseDetails";
import Reports from "../pages/parent/Reports";

// 404 Page
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================================
          PUBLIC ROUTES 
          ======================================== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ✅ SEPARATE CLERK CALLBACK ROUTES */}
      <Route
        path="/auth/clerk-login-callback"
        element={<ClerkCallbackPage />}
      />
      <Route
        path="/auth/clerk-register-callback"
        element={<ClerkRegisterCallbackPage />}
      />

      {/* ABOUT PAGES */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/teachers" element={<AboutPage />} />
      <Route path="/contact-us" element={<AboutPage />} />
      <Route path="/privacy-policy" element={<AboutPage />} />
      <Route path="/terms" element={<AboutPage />} />

      {/* ========================================
          START JOURNEY ROUTES (PUBLIC)
          ======================================== */}
      <Route path="/start-journey" element={<StartJourneyPage />} />
      
      {/* Teachers Books Routes */}
      <Route path="/teachers-books" element={<TeachersBooksPage />} />
      <Route
        path="/teachers-books/:bookId"
        element={<TeacherBookDetailsPage />}
      />

      {/* Exams Route */}
      <Route path="/exams" element={<ExamsPageOut />} />
      
      {/* Courses Routes */}
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

      {/* ✅ TEACHER PROFILE ROUTE - PUBLIC */}
      <Route path="/teacher/:teacherId" element={<TeacherProfilePage />} />

      {/* ✅ PAYMENT ROUTES - PUBLIC (يمكن جعلها Protected لاحقاً) */}
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />

      {/* PROFILE - PROTECTED */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          PROTECTED ROUTES - STUDENT 
          ======================================== */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CourseDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MyCoursesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/exams"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ExamsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/submit-assignment"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <SubmitAssignmentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/performance"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <PerformanceReportPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/live-class"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <LiveClassPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/notifications"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/student/tasks"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <TasksPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/books"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <BooksPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/student/books/:bookId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <BookDetailsPage />
          </ProtectedRoute>
        }
      />
      
      {/* ✅ CONTEST ROUTES */}
      <Route
        path="/student/contests"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ContestsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/contests/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentContestDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId/ask-teacher"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AskTeacherPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId/book-office-hour"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <BookOfficeHourPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId/lesson/:lessonId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <LessonPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId/recording/:sessionId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <div
              style={{
                padding: "4rem",
                textAlign: "center",
                minHeight: "60vh",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎬</div>
              <h2 style={{ fontFamily: "Cairo, sans-serif" }}>تسجيل الحصة</h2>
              <p style={{ fontFamily: "Cairo, sans-serif", color: "#64748b" }}>
                قريباً...
              </p>
            </div>
          </ProtectedRoute>
        }
      />

      {/* ========================================
          PROTECTED ROUTES - TEACHER 
          ======================================== */}

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/notifications/send"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <SendNotification />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/courses/new"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <CreateCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/my-courses"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <MyCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/courses"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>إدارة الكورسات</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/courses/edit/:courseId"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <EditCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/live-class/start"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLiveClass />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/exams/new"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <CreateExam />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/exams"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>إدارة الاختبارات</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/grade-exams"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <GradeExams />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/analytics"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/upload-lesson"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <UploadLesson />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/reports"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>التقارير والإحصائيات</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route path="/teacher/schedule" element={<TeacherSchedule />} />

      {/* ✅ TEACHER CONTESTS ROUTE */}
      <Route
        path="/teacher/contests"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherContests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/students"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>إدارة الطلاب</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

      {/* ✅ TEACHER BOOKS ROUTE */}
      <Route
        path="/teacher/books"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherBooks />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          PROTECTED ROUTES - ASSISTANT TEACHER 
          ======================================== */}

      <Route
        path="/assistant-teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={["assistant_teacher"]}>
            <AssistantTeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          PROTECTED ROUTES - PARENT 
          ======================================== */}

      <Route
        path="/parent/dashboard"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/children"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ChildProgress />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/child/:childId"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ChildDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/child/:childId/course/:courseId"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <CourseDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/reports"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* CATCH ALL - 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;