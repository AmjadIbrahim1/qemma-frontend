// frontend/src/services/exams.service.js

import API from './api';

const examsService = {
  // ── Student ────────────────────────────────────────────────────

  // Get all published exams for the student's enrolled courses
  getStudentExams: () =>
    API.get('/exams/student'),

  // Get single exam details (with questions)
  getExam: (examId) =>
    API.get(`/exams/${examId}`),

  // ── Teacher ────────────────────────────────────────────────────

  // Get all exams created by the logged-in teacher
  getMyExams: () =>
    API.get('/exams/my'),

  // Create a new exam
  createExam: (data) =>
    API.post('/exams', data),

  // Update an existing exam
  updateExam: (examId, data) =>
    API.put(`/exams/${examId}`, data),

  // Delete an exam
  deleteExam: (examId) =>
    API.delete(`/exams/${examId}`),

  // Toggle published state
  togglePublish: (examId) =>
    API.patch(`/exams/${examId}/publish`),

  // Get all student attempts for a specific exam
  getExamAttempts: (examId) =>
    API.get(`/exams/${examId}/attempts`),

  // ── Student exam taking ──────────────────────────────────────────

  // Start an exam — returns questions (without correct answers) and creates an attempt
  startExam: (examId) =>
    API.post(`/attempts/exam/${examId}/start`),

  // Submit answers for auto-grading
  submitExamAttempt: (examId, answers) =>
    API.post(`/attempts/exam/${examId}/submit`, { answers }),

  // Get exam review data (attempt + questions with correct answers)
  getExamReview: (examId) =>
    API.get(`/attempts/exam/${examId}/review`),
};

export default examsService;