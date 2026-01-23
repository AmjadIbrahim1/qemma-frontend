// frontend/src/utils/constants.js
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  ADMIN: 'admin'
};

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed'
};

export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const EXAM_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  GRADED: 'graded'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STUDENT_DASHBOARD: '/student/dashboard',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  PARENT_DASHBOARD: '/parent/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard'
};