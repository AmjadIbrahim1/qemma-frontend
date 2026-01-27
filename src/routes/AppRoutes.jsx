// frontend/src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Landing & Auth Pages
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ClerkCallbackPage from "../pages/auth/ClerkCallbackPage";
import ProfilePage from "../pages/ProfilePage";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import CourseDashboard from "../pages/student/CourseDashboard";
// import LiveClass from "../pages/student/LiveClass";
import NotificationsPage from '../pages/student/NotificationsPage';
import AskTeacherPage from '../pages/student/AskTeacherPage';
import BookOfficeHourPage from '../pages/student/BookOfficeHourPage';
import LessonPage from '../pages/student/LessonPage';
import MyCoursesPage from '../pages/student/MyCoursesPage';
import ExamsPage from '../pages/student/ExamsPage';
import SubmitAssignmentPage from '../pages/student/SubmitAssignmentPage';
import PerformanceReportPage from '../pages/student/PerformanceReportPage';
import LiveClassPage from '../pages/student/LiveClassPage';

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
import TeacherSchedule from '../pages/teacher/TeacherSchedule';


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
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/clerk-callback" element={<ClerkCallbackPage />} />

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
      
      {/* Student Dashboard */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Course Dashboard */}
      <Route
        path="/student/course/:courseId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CourseDashboard />
          </ProtectedRoute>
        }
      />

      {/* My Courses Page */}
      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MyCoursesPage />
          </ProtectedRoute>
        }
      />

      {/* Exams Page */}
      <Route
        path="/student/exams"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ExamsPage />
          </ProtectedRoute>
        }
      />

      {/* Submit Assignment Page */}
      <Route
        path="/student/submit-assignment"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <SubmitAssignmentPage />
          </ProtectedRoute>
        }
      />

      {/* Performance Report Page */}
      <Route
        path="/student/performance"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <PerformanceReportPage />
          </ProtectedRoute>
        }
      />

      {/* Live Class Page */}
      <Route
        path="/student/live-class"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <LiveClassPage />
          </ProtectedRoute>
        }
      />

      {/* AI Chat Assistant - قريباً */}
      <Route
        path="/student/chat"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <div style={{ 
              padding: "4rem 2rem", 
              textAlign: "center",
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🤖</div>
              <h2 style={{ fontFamily: "Cairo, sans-serif", marginBottom: "0.5rem" }}>المساعد الذكي</h2>
              <p style={{ fontFamily: "Cairo, sans-serif", color: "#64748b" }}>قريباً... نعمل على تطوير مساعد ذكي لمساعدتك في دراستك</p>
            </div>
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
{/* Ask Teacher */}
<Route
  path="/student/course/:courseId/ask-teacher"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <AskTeacherPage />
    </ProtectedRoute>
  }
/>

{/* Book Office Hour */}
<Route
  path="/student/course/:courseId/book-office-hour"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <BookOfficeHourPage />
    </ProtectedRoute>
  }
/>

{/* Lesson Page */}
<Route
  path="/student/course/:courseId/lesson/:lessonId"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <LessonPage />
    </ProtectedRoute>
  }
/>

{/* Recording Page - Placeholder */}
<Route
  path="/student/course/:courseId/recording/:sessionId"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif' }}>تسجيل الحصة</h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', color: '#64748b' }}>قريباً...</p>
      </div>
    </ProtectedRoute>
  }
/>


{/* ========================================
          PROTECTED ROUTES - PARENT 
          ======================================== */}

      {/* Dashboard */}
      <Route
        path="/parent/dashboard"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Children Progress */}
      <Route
        path="/parent/children"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ChildProgress />
          </ProtectedRoute>
        }
      />

      {/* Child Details */}
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

      {/* Reports */}
      <Route
        path="/parent/reports"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          PROTECTED ROUTES - TEACHER 
          ======================================== */}

      {/* Dashboard */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* Notifications */}
      <Route
        path="/teacher/notifications/send"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <SendNotification />
          </ProtectedRoute>
        }
      />

      {/* ========== COURSES ========== */}

      {/* Create Course */}
      <Route
        path="/teacher/courses/new"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <CreateCourse />
          </ProtectedRoute>
        }
      />

      {/* My Courses */}
      <Route
        path="/teacher/my-courses"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <MyCourses />
          </ProtectedRoute>
        }
      />

      {/* All Courses */}
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

      {/* Edit Course */}
      <Route
        path="/teacher/courses/edit/:courseId"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <EditCourse />
          </ProtectedRoute>
        }
      />

      {/* ========== LIVE CLASSES ========== */}

      {/* Start Live Class */}
      <Route
        path="/teacher/live-class/start"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLiveClass />
          </ProtectedRoute>
        }
      />

      {/* ========== EXAMS ========== */}

      {/* Create Exam */}
      {/* ========== EXAMS ========== */}
      <Route
        path="/teacher/exams/new"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <CreateExam />
          </ProtectedRoute>
        }
      />

      {/* All Exams */}
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

      {/* Grade Exams */}
      <Route
        path="/teacher/grade-exams"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <GradeExams />
          </ProtectedRoute>
        }
      />

      {/* ========== ANALYTICS ========== */}

      {/* Analytics Dashboard */}
      <Route
        path="/teacher/analytics"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <Analytics />
          </ProtectedRoute>
        }
      />

      {/* ========== LESSONS ========== */}

      {/* Upload Lesson */}
      <Route
        path="/teacher/upload-lesson"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <UploadLesson />
          </ProtectedRoute>
        }
      />

      {/* ========== OTHER ========== */}

      {/* Reports */}
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

      {/* Schedule */}
      <Route path="/teacher/schedule" element={<TeacherSchedule />} />

      {/* Students Management */}
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

      {/* CATCH ALL - 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
