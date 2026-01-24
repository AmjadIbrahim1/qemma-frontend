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
import LiveClass from "../pages/student/LiveClass";

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
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/live-class"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <LiveClass />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>صفحة الكورسات</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/exams"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>صفحة الاختبارات</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/chat"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>المساعد الذكي</h2>
              <p>قريباً...</p>
            </div>
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
      <Route
        path="/teacher/schedule"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>الجدول الزمني</h2>
              <p>قريباً...</p>
            </div>
          </ProtectedRoute>
        }
      />

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
