// frontend/src/pages/student/TakeContestPage.jsx
// ✅ NEW (contests feature): Student takes a contest — per-question submit + final submit + prev/next.
// Reuses TakeExamPage.jsx layout: sticky header with countdown timer, question-nav sidebar (numbered grid +
// legend), prev/next buttons per question. Key differences from exam:
//   - Per-question submit button ("تأكيد الإجابة") → calls submitQuestionAnswer; after submit the question
//     is LOCKED (radio disabled + "تم الإرسال" chip) with NO correct/incorrect feedback (planning requirement).
//   - Final whole-contest submit → calls submitContest (no score shown — scoring is a post-contest batch job).
//   - Timer is derived from contest.endTime (server-side authoritative), not a client-set duration.

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Container, Typography, Button, IconButton, Chip, Radio, RadioGroup,
  FormControlLabel, CircularProgress, Alert, LinearProgress, Card, CardContent, Divider,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon, AccessTime as AccessTimeIcon, EmojiEvents as EmojiEventsIcon,
  Error as ErrorIcon, Send as SendIcon, CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';
import contestsService from '../../services/contests.service';

const QUESTION_COLORS = ['#2563eb', '#7c3aed', '#059669', '#db2777', '#f59e0b', '#0891b2'];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const TakeContestPage = ({ contestId: propContestId, onBack }) => {
  const { id: routeContestId } = useParams();
  const contestId = propContestId || routeContestId;   // ✅ prop for inline rendering, fallback to route param
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);            // { participationId, contest, questions, answeredQuestionIds }
  const [selected, setSelected] = useState({});      // questionId → selectedOptionId (client state, pre-submit)
  const [submittedQids, setSubmittedQids] = useState(new Set());  // question ids already submitted (locked)
  const [submittingQ, setSubmittingQ] = useState(null);           // questionId currently being submitted
  const [submittingFinal, setSubmittingFinal] = useState(false);
  const [done, setDone] = useState(false);           // final submission complete
  const [activeQ, setActiveQ] = useState(0);
  const [confirmFinalOpen, setConfirmFinalOpen] = useState(false);
  const [successContestOpen, setSuccessContestOpen] = useState(false);

  // Timer — seconds remaining until contest.endTime
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  // ── Fetch / start the contest ────────────────────────────────
  const startOrResume = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      // Try to resume an existing participation first; if none, start a new one.
      let res;
      try {
        res = await contestsService.getMyParticipation(contestId);
      } catch (_) {
        res = await contestsService.startContest(contestId);
      }
      const payload = res.data?.data ?? res.data;
      setData(payload);
      setSubmittedQids(new Set(payload.answeredQuestionIds || []));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'فشل تحميل المسابقة');
    } finally {
      setLoading(false);
    }
  }, [contestId]);

  useEffect(() => { startOrResume(); }, [startOrResume]);

  // ── Timer countdown (derived from endTime) ───────────────────
  useEffect(() => {
    if (!data?.contest?.endTime || done || successContestOpen) return;
    const endMs = new Date(data.contest.endTime).getTime();
    const tick = () => {
      const remaining = Math.floor((endMs - Date.now()) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [data, done, successContestOpen]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && data && !successContestOpen && !submittingFinal) {
      handleFinalSubmit();
    }
  }, [timeLeft]);

  // ── Per-question submit ──────────────────────────────────────
  const handleQuestionSubmit = async (questionId) => {
    const optionId = selected[questionId];
    if (!optionId) { return; }
    setSubmittingQ(questionId);
    try {
      await contestsService.submitQuestionAnswer(contestId, questionId, optionId);
      setSubmittedQids((prev) => new Set(prev).add(questionId));
    } catch (err) {
      const msg = err.response?.data?.message || 'فشل تسجيل الإجابة';
      if (err.response?.status === 409) {
        // Already answered (e.g. race) — mark as submitted to keep UI consistent
        setSubmittedQids((prev) => new Set(prev).add(questionId));
      } else {
        setError(msg);
      }
    } finally {
      setSubmittingQ(null);
    }
  };

  // ── Final whole-contest submit ───────────────────────────────
  const handleFinalSubmit = async () => {
    if (submittingFinal || !data) return;
    setSubmittingFinal(true);
    try {
      await contestsService.submitContest(contestId);
      setSuccessContestOpen(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'فشل تقديم المسابقة';
      if (err.response?.status === 409) {
        setSuccessContestOpen(true);
      } else {
        setError(msg);
      }
    } finally {
      setSubmittingFinal(false);
    }
  };

  const handleConfirmFinal = () => {
    setConfirmFinalOpen(true);
  };

  // ── Derived ──────────────────────────────────────────────────
  const questions = data?.questions ?? [];
  const totalQ = questions.length;
  const confirmedCount = submittedQids.size;
  const progressPct = totalQ > 0 ? Math.round((confirmedCount / totalQ) * 100) : 0;
  const timerPct = data?.contest?.endTime
    ? Math.max(0, Math.min(100, Math.round((timeLeft / Math.max(1, (new Date(data.contest.endTime) - new Date(data.contest.startTime)) / 1000)) * 100)))
    : 100;
  const isTimerWarning = timeLeft !== null && timeLeft <= 300;
  const isTimerCritical = timeLeft !== null && timeLeft <= 60;

  // ── Done view (no score — scoring is post-contest) ───────────
  if (done) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Box sx={{ fontSize: 64, mb: 2 }}>🎉</Box>
          <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}>
            تم تقديم المسابقة بنجاح
          </Typography>
          <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 3 }}>
            ستظهر نتيجتك وترتيبك على لوحة المتصدرين بعد انتهاء المسابقة واحتساب الدرجات.
          </Typography>
          <Button variant="contained" onClick={() => onBack ? onBack() : navigate('/student/contests/available')}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, background: 'linear-gradient(135deg, #f59e0b 0%, #db2777 100%)' }}>
            العودة للمسابقات
          </Button>
        </Container>
      </Box>
    );
  }

  // ── Error / loading views (adapted from TakeExamPage) ────────
  if (!loading && error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <ErrorIcon sx={{ fontSize: 64, color: '#ef4444', mb: 2 }} />
          <Typography variant="h5" fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}>
            تعذر تحميل المسابقة
          </Typography>
          <Typography variant="body1" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 3 }}>{error}</Typography>
          <Button variant="contained" onClick={() => onBack ? onBack() : navigate('/student/contests/available')}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2 }}>العودة للمسابقات</Button>
        </Container>
      </Box>
    );
  }

  if (loading || !data) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={56} thickness={4} sx={{ color: '#db2777' }} />
          <Typography variant="h6" fontFamily="Cairo, sans-serif" sx={{ mt: 2, color: darkMode ? '#94a3b8' : '#64748b' }}>
            جاري تحميل المسابقة...
          </Typography>
        </Box>
      </Box>
    );
  }

  // ── Main contest view (reuses TakeExamPage layout) ───────────
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc' }}>
      {/* ═══ HEADER ════════════════════════════════════════════════ */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #db2777 100%)',
        color: 'white', py: 2, px: 2, position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <IconButton onClick={() => { if (window.confirm('هل تريد الخروج من المسابقة؟ سيتم حفظ إجاباتك المؤكدة.')) onBack ? onBack() : navigate('/student/contests/available'); }}
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
              <ArrowBackIcon />
            </IconButton>
            <EmojiEventsIcon sx={{ fontSize: 28 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={900} fontFamily="Cairo, sans-serif">{data.contest.title}</Typography>
              <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>
                {data.contest.stream} • {data.contest.difficulty}
              </Typography>
            </Box>
            {timeLeft !== null && (
              <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                <AccessTimeIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                <Typography variant="h5" fontWeight={900} fontFamily="monospace"
                  sx={{ color: isTimerCritical ? '#fca5a5' : isTimerWarning ? '#fbbf24' : 'white', display: 'inline' }}>
                  {formatTime(timeLeft)}
                </Typography>
                <Typography variant="caption" display="block" fontFamily="Cairo, sans-serif" sx={{ opacity: 0.8 }}>الوقت المتبقي</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress variant="determinate" value={timerPct} sx={{
              flex: 1, height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': { bgcolor: isTimerCritical ? '#ef4444' : isTimerWarning ? '#f59e0b' : '#34d399', borderRadius: 3 },
            }} />
            <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ whiteSpace: 'nowrap' }}>
              {confirmedCount} / {totalQ} تم التأكيد
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* ═══ Question Navigation Sidebar (reused from TakeExamPage) ═══ */}
          <Box sx={{ width: { xs: '100%', md: 240 }, flexShrink: 0 }}>
            <Card elevation={0} sx={{
              border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb',
              bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 3,
              position: { md: 'sticky' }, top: { md: 100 },
            }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight={700} fontFamily="Cairo, sans-serif"
                  sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>قائمة الأسئلة</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {questions.map((q, i) => {
                    const isConfirmed = submittedQids.has(q.id);
                    const isActive = i === activeQ;
                    return (
                      <Box key={q.id} onClick={() => setActiveQ(i)} sx={{
                        width: 40, height: 40, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'Cairo, sans-serif',
                        bgcolor: isActive ? '#db2777' : isConfirmed ? '#059669' : (darkMode ? '#334155' : '#f1f5f9'),
                        color: isActive || isConfirmed ? 'white' : (darkMode ? '#94a3b8' : '#64748b'),
                        transition: 'all 0.2s', '&:hover': { transform: 'scale(1.1)', boxShadow: 1 },
                      }}>{i + 1}</Box>
                    );
                  })}
                </Box>
                <Divider sx={{ my: 2, borderColor: darkMode ? '#334155' : '#e5e7eb' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: '#059669' }} />
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>تم التأكيد</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: '#db2777' }} />
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>السؤال الحالي</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: darkMode ? '#334155' : '#f1f5f9' }} />
                    <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>لم يُؤكد</Typography>
                  </Box>
                </Box>
                {/* Final submit button */}
                <Button fullWidth variant="contained" startIcon={<SendIcon />} onClick={handleConfirmFinal} disabled={submittingFinal}
                  sx={{
                    mt: 3, background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, py: 1.5,
                    '&:hover': { background: 'linear-gradient(135deg, #047857 0%, #059669 100%)' },
                  }}>
                  {submittingFinal ? <CircularProgress size={22} color="inherit" /> : 'تقديم المسابقة'}
                </Button>
              </CardContent>
            </Card>
          </Box>

          {/* ═══ Questions Area (reused from TakeExamPage + per-question submit) ═══ */}
          <Box sx={{ flex: 1 }}>
            {questions.map((q, i) => {
              const color = QUESTION_COLORS[i % QUESTION_COLORS.length];
              const isCurrent = i === activeQ;
              const isConfirmed = submittedQids.has(q.id);
              const isSubmittingThis = submittingQ === q.id;
              const hasSelected = !!selected[q.id];

              return (
                <Box key={q.id} sx={{ display: isCurrent ? 'block' : 'none' }}>
                  <Card elevation={0} sx={{
                    border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb',
                    bgcolor: darkMode ? '#1e293b' : 'white', borderRadius: 3, borderTop: `4px solid ${color}`,
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      {/* Question header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip label={`سؤال ${i + 1} من ${totalQ}`} size="small"
                          sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, bgcolor: `${color}15`, color }} />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip label="اختيار من متعدد" size="small" variant="outlined"
                              sx={{ fontFamily: 'Cairo, sans-serif', borderColor: darkMode ? '#475569' : '#e5e7eb', color: darkMode ? '#94a3b8' : '#64748b' }} />
                            <Chip label={`${q.pointValue} نقطة`} size="small"
                              sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, bgcolor: '#fef3c7', color: '#f59e0b' }} />
                            {isConfirmed && (
                              <Chip icon={<CheckCircleIcon sx={{ fontSize: 16 }} />} label="تم الإرسال" size="small"
                                sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, bgcolor: '#dcfce7', color: '#059669' }} />
                            )}
                        </Box>
                      </Box>

                      <Typography variant="h6" fontWeight={700} fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 3, lineHeight: 1.8 }}>
                        {q.text}
                      </Typography>

                      {/* Options — disabled after per-question submit (locked, no feedback) */}
                      <RadioGroup
                        value={selected[q.id] ?? ''}
                        onChange={(e) => { if (!isConfirmed) setSelected((prev) => ({ ...prev, [q.id]: e.target.value })); }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          {q.options.map((opt) => {
                            const isSelected = selected[q.id] === opt.id;
                            return (
                              <Card key={opt.id} elevation={0}
                                onClick={() => { if (!isConfirmed) setSelected((prev) => ({ ...prev, [q.id]: opt.id })); }}
                                sx={{
                                  border: '2px solid',
                                  borderColor: isConfirmed ? (darkMode ? '#334155' : '#e5e7eb') : (isSelected ? color : (darkMode ? '#334155' : '#e5e7eb')),
                                  bgcolor: isConfirmed ? 'transparent' : (isSelected ? `${color}08` : 'transparent'),
                                  borderRadius: 2, cursor: isConfirmed ? 'default' : 'pointer', transition: 'all 0.2s',
                                  '&:hover': isConfirmed ? {} : { borderColor: color, bgcolor: `${color}05` },
                                }}>
                                <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                                  <FormControlLabel value={opt.id} disabled={isConfirmed}
                                    control={<Radio sx={{ color, '&.Mui-checked': { color } }} />}
                                    label={<Typography fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#e2e8f0' : '#334155' }}>{opt.text}</Typography>}
                                    sx={{ width: '100%', m: 0 }} />
                                </CardContent>
                              </Card>
                            );
                          })}
                        </Box>
                      </RadioGroup>

                      {/* Per-question submit button — locked after submit, no feedback */}
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={() => handleQuestionSubmit(q.id)}
                          disabled={isConfirmed || !hasSelected || isSubmittingThis}
                          startIcon={isSubmittingThis ? <CircularProgress size={18} color="inherit" /> : (isConfirmed ? <CheckCircleIcon /> : <SendIcon />)}
                          sx={{
                            fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2,
                            background: isConfirmed ? (darkMode ? '#334155' : '#e5e7eb') : color,
                            color: isConfirmed ? (darkMode ? '#94a3b8' : '#64748b') : '#fff',
                          }}>
                          {isConfirmed ? 'تم الإرسال' : isSubmittingThis ? 'جاري الإرسال...' : 'تأكيد الإجابة'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Navigation buttons — prev/next for every question (reused from TakeExamPage) */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="outlined" disabled={i === 0} onClick={() => setActiveQ(i - 1)} startIcon={<ArrowBackIcon />}
                      sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2, borderColor: darkMode ? '#475569' : '#e5e7eb', color: darkMode ? '#94a3b8' : '#64748b' }}>
                      السابق
                    </Button>
                    {i < totalQ - 1 ? (
                      <Button variant="contained" onClick={() => setActiveQ(i + 1)}
                        sx={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`, fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 2 }}>
                        التالي
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={handleConfirmFinal} disabled={submittingFinal} startIcon={<SendIcon />}
                        sx={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2 }}>
                        {submittingFinal ? <CircularProgress size={20} color="inherit" /> : 'تقديم المسابقة'}
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>

      <Dialog open={confirmFinalOpen} onClose={() => setConfirmFinalOpen(false)}>
        <DialogTitle sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
          تأكيد التقديم
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Cairo, sans-serif' }}>
            {questions.length - submittedQids.size > 0
              ? `لم تؤكد إجابة ${questions.length - submittedQids.size} سؤال بعد. هل أنت متأكد من تقديم المسابقة؟ لا يمكنك العودة بعد التقديم.`
              : 'هل أنت متأكد من تقديم المسابقة؟ لا يمكنك العودة بعد التقديم.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmFinalOpen(false)} sx={{ fontFamily: 'Cairo, sans-serif' }}>
            إلغاء
          </Button>
          <Button
            onClick={() => { setConfirmFinalOpen(false); handleFinalSubmit(); }}
            variant="contained"
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2 }}
          >
            تقديم
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successContestOpen} onClose={() => {}}>
        <DialogTitle sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, textAlign: 'center' }}>
          تم التقديم بنجاح
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Cairo, sans-serif', textAlign: 'center' }}>
            تم تقديم المسابقة بنجاح! سيتم الإعلان عن النتائج قريباً
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={() => navigate('/student/dashboard')}
            variant="contained"
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, borderRadius: 2, px: 4 }}
          >
            حسناً
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TakeContestPage;
