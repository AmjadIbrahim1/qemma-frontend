// frontend/src/pages/teacher/AddContestQuestions.jsx
// ✅ NEW (contests feature): Teacher adds MCQ questions to a contest.
// Reuses the question-card layout from CreateExam.jsx Step 2 (Paper + Chip + RadioGroup + add/remove option).
// Simplified: MCQ-only (no type selector, no essay), pointValue instead of marks, correct option stored
// as isCorrect per ContestOption row (normalized options, not JSON).

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Box, Typography, Card, CardContent, TextField, Button,
  Grid, IconButton, Chip, Radio, RadioGroup, Paper, CircularProgress, Alert, Divider,
} from '@mui/material';
import { ArrowBack, Save, Add, Delete, EmojiEvents } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useTheme } from '../../hooks/useTheme';
import contestsService from '../../services/contests.service';
import { STREAM_LABELS, CONTEST_DIFFICULTY } from '../../utils/constants';

// ✅ Default new question (MCQ with 4 blank options + a marked-correct index).
const newQuestion = () => ({ text: '', pointValue: 5, options: ['', '', '', ''], correctIndex: 0 });

const AddContestQuestions = ({ contestId: propContestId }) => {
  const { id: routeContestId } = useParams();
  const contestId = propContestId || routeContestId;   // ✅ prop for inline rendering, fallback to route param
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [contest, setContest] = useState(null);
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [questions, setQuestions] = useState([newQuestion()]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // ── Fetch contest detail (includes existing questions with correct options) ──
  useEffect(() => {
    const fetchContest = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await contestsService.getContest(contestId);
        const c = res.data?.data;
        setContest(c);
        setExistingQuestions(c?.questions ?? []);
      } catch (err) {
        setError(err.response?.data?.message || 'فشل تحميل المسابقة');
      } finally {
        setLoading(false);
      }
    };
    fetchContest();
  }, [contestId]);

  // ── Question handlers (adapted from CreateExam.jsx) ──
  const handleQuestionChange = (index, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex] };
      copy[qIndex].options = [...copy[qIndex].options];
      copy[qIndex].options[optIndex] = value;
      return copy;
    });
  };

  const addOption = (qIndex) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex], options: [...copy[qIndex].options, ''] };
      return copy;
    });
  };

  const removeOption = (qIndex, optIndex) => {
    setQuestions((prev) => {
      const copy = [...prev];
      if (copy[qIndex].options.length <= 2) {
        toast.error('يجب أن يكون هناك خيارين على الأقل');
        return prev;
      }
      const newOptions = copy[qIndex].options.filter((_, i) => i !== optIndex);
      // Fix correctIndex if removed option was the correct one or before it
      let newCorrect = copy[qIndex].correctIndex;
      if (optIndex === newCorrect) newCorrect = 0;
      else if (optIndex < newCorrect) newCorrect -= 1;
      copy[qIndex] = { ...copy[qIndex], options: newOptions, correctIndex: newCorrect };
      return copy;
    });
  };

  const addQuestion = () => setQuestions((prev) => [...prev, newQuestion()]);

  const removeQuestion = (index) => {
    setQuestions((prev) => {
      if (prev.length === 1) { toast.error('يجب أن يحتوي على سؤال واحد على الأقل'); return prev; }
      return prev.filter((_, i) => i !== index);
    });
  };

  // ── Submit: validate + post each question via addContestQuestion ──
  const handleSubmit = async () => {
    // Validate
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) { toast.error(`يرجى ملء نص السؤال ${i + 1}`); return; }
      if (!q.pointValue || q.pointValue < 1) { toast.error(`درجة السؤال ${i + 1} يجب أن تكون 1 على الأقل`); return; }
      if (q.options.length < 2) { toast.error(`السؤال ${i + 1} يجب أن يحتوي على خيارين على الأقل`); return; }
      if (q.options.some((o) => !o.trim())) { toast.error(`يرجى ملء جميع الخيارات في السؤال ${i + 1}`); return; }
    }

    setSaving(true);
    let added = 0;
    try {
      for (const q of questions) {
        await contestsService.addContestQuestion(contestId, {
          text:       q.text.trim(),
          pointValue: parseInt(q.pointValue),
          options:    q.options.map((text, idx) => ({ text: text.trim(), isCorrect: idx === q.correctIndex })),
        });
        added++;
      }
      toast.success(`تم إضافة ${added} سؤال بنجاح! 🎉`);
      // Refresh existing questions list
      const res = await contestsService.getContest(contestId);
      setContest(res.data?.data);
      setExistingQuestions(res.data?.data?.questions ?? []);
      setQuestions([newQuestion()]);
    } catch (err) {
      toast.error(err.response?.data?.message || `فشل إضافة السؤال (${added + 1})`);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete an existing question ──
  const handleDeleteExisting = async (questionId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;
    try {
      await contestsService.deleteContestQuestion(contestId, questionId);
      toast.success('تم حذف السؤال');
      const res = await contestsService.getContest(contestId);
      setContest(res.data?.data);
      setExistingQuestions(res.data?.data?.questions ?? []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'فشل حذف السؤال');
    }
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: darkMode ? '#334155' : undefined } },
    '& .MuiInputBase-input': { color: darkMode ? '#f1f5f9' : undefined },
    '& .MuiInputLabel-root': { fontFamily: 'Cairo, sans-serif', color: darkMode ? '#94a3b8' : undefined },
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={56} sx={{ color: '#7c3aed' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3, fontFamily: 'Cairo, sans-serif' }}>{error}</Alert>
          <Button variant="contained" onClick={() => navigate('/teacher/contests/available')}
            sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>العودة للقائمة</Button>
        </Container>
      </Box>
    );
  }

  const diff = CONTEST_DIFFICULTY[contest?.difficulty] || { label: contest?.difficulty, color: '#64748b' };
  // ✅ CHANGED: was `contest?.status === 'upcoming'` — now allows active contests too when isTest=true
  // const canEdit = contest?.status === 'upcoming';
  const canEdit = contest?.status !== 'ended' || contest?.isTest === true;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#0f172a' : '#f8fafc', py: 4 }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/teacher/contests/available')}
          sx={{ mb: 2, fontFamily: 'Cairo, sans-serif', fontWeight: 700, color: darkMode ? '#f1f5f9' : 'inherit' }}>
          العودة للقائمة
        </Button>

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 50, height: 50, borderRadius: 2, background: 'linear-gradient(135deg, #f59e0b 0%, #db2777 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <EmojiEvents />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}>
              {contest?.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
              <Chip label={STREAM_LABELS[contest?.stream] || contest?.stream} size="small" variant="outlined"
                sx={{ fontFamily: 'Cairo, sans-serif', borderColor: darkMode ? '#475569' : '#e5e7eb', color: darkMode ? '#94a3b8' : '#64748b' }} />
              <Chip label={diff.label} size="small" sx={{ bgcolor: diff.color, color: '#fff', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }} />
              <Chip label={`${contest?.duration} دقيقة`} size="small" variant="outlined"
                sx={{ fontFamily: 'Cairo, sans-serif', borderColor: darkMode ? '#475569' : '#e5e7eb', color: darkMode ? '#94a3b8' : '#64748b' }} />
            </Box>
          </Box>
        </Box>

        {!canEdit && (
          <Alert severity="warning" sx={{ mb: 3, fontFamily: 'Cairo, sans-serif' }}>
            ⚠️ المسابقة قد بدأت — لا يمكن إضافة أو حذف أسئلة بعد الآن.
          </Alert>
        )}

        {/* Existing questions */}
        {existingQuestions.length > 0 && (
          <Card elevation={0} sx={{ border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', bgcolor: darkMode ? '#1e293b' : 'white', mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ mb: 2, color: darkMode ? '#f1f5f9' : 'inherit' }}>
                الأسئلة الحالية ({existingQuestions.length})
              </Typography>
              {existingQuestions.map((q, i) => (
                <Paper key={q.id} elevation={0} sx={{ p: 2, mb: 2, border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', bgcolor: darkMode ? '#0f172a' : '#f9fafb' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography fontWeight={700} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : 'inherit', flex: 1 }}>
                      {i + 1}. {q.text}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip label={`${q.pointValue} درجة`} size="small" variant="outlined" sx={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.65rem' }} />
                      {canEdit && (
                        <IconButton size="small" color="error" onClick={() => handleDeleteExisting(q.id)}><Delete fontSize="small" /></IconButton>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    {q.options.map((opt, oi) => (
                      <Typography key={opt.id || oi} fontFamily="Cairo, sans-serif"
                        sx={{ color: opt.isCorrect ? '#22c55e' : (darkMode ? '#94a3b8' : 'text.secondary'), fontWeight: opt.isCorrect ? 700 : 400 }}>
                        {opt.isCorrect ? '✓' : '•'} {opt.text}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        )}

        {/* New questions builder (reuses CreateExam.jsx Step-2 pattern) */}
        {canEdit && (
          <Card elevation={0} sx={{ border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', bgcolor: darkMode ? '#1e293b' : 'white', mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={900} fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}>
                    إضافة أسئلة جديدة ({questions.length})
                  </Typography>
                  <Typography variant="caption" fontFamily="Cairo, sans-serif" sx={{ color: darkMode ? '#94a3b8' : 'text.secondary' }}>
                    اختيار من متعدد — حدد الإجابة الصحيحة بالضغط على الدائرة بجوار الخيار
                  </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={addQuestion}
                  sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' }}>
                  إضافة سؤال
                </Button>
              </Box>

              {questions.map((question, qIndex) => (
                <Paper key={qIndex} elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: darkMode ? '#334155' : '#e5e7eb', bgcolor: darkMode ? '#0f172a' : '#f9fafb' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip label={`السؤال ${qIndex + 1}`} sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, bgcolor: darkMode ? '#1e293b' : '#e0e7ff', color: darkMode ? '#f1f5f9' : '#3730a3' }} />
                    <IconButton onClick={() => removeQuestion(qIndex)} color="error"><Delete /></IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type="number" label="الدرجة (نقاط السؤال)" value={question.pointValue}
                        onChange={(e) => handleQuestionChange(qIndex, 'pointValue', parseInt(e.target.value))}
                        sx={fieldSx} InputProps={{ sx: { fontFamily: 'Cairo, sans-serif' } }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth multiline rows={2} label="نص السؤال" value={question.text}
                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                        placeholder="اكتب السؤال هنا..." sx={fieldSx} InputProps={{ sx: { fontFamily: 'Cairo, sans-serif' } }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" fontFamily="Cairo, sans-serif" fontWeight={700} sx={{ mb: 1, color: darkMode ? '#f1f5f9' : 'inherit' }}>
                        الخيارات: (اختر الإجابة الصحيحة)
                      </Typography>
                      <RadioGroup value={String(question.correctIndex)}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctIndex', parseInt(e.target.value))}>
                        {question.options.map((option, optIndex) => (
                          <Box key={optIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Radio value={String(optIndex)} />
                            <TextField fullWidth size="small" value={option}
                              onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                              placeholder={`الخيار ${optIndex + 1}`} sx={fieldSx} InputProps={{ sx: { fontFamily: 'Cairo, sans-serif' } }} />
                            {question.options.length > 2 && (
                              <IconButton size="small" onClick={() => removeOption(qIndex, optIndex)} color="error"><Delete fontSize="small" /></IconButton>
                            )}
                          </Box>
                        ))}
                      </RadioGroup>
                      <Button size="small" startIcon={<Add />} onClick={() => addOption(qIndex)}
                        sx={{ mt: 1, fontFamily: 'Cairo, sans-serif', fontWeight: 700, color: darkMode ? '#f1f5f9' : 'inherit' }}>
                        إضافة خيار
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              <Divider sx={{ my: 2, borderColor: darkMode ? '#334155' : '#e5e7eb' }} />
              <Button fullWidth variant="contained" size="large" startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                onClick={handleSubmit} disabled={saving || questions.length === 0}
                sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, py: 1.5, borderRadius: 2, background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}>
                {saving ? 'جاري الحفظ...' : `حفظ الأسئلة (${questions.length})`}
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default AddContestQuestions;
