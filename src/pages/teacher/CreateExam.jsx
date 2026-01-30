// frontend/src/pages/teacher/CreateExam.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Chip,
  Radio,
  RadioGroup,
  Paper,
} from "@mui/material";
import { ArrowBack, Save, Add, Delete, Assignment } from "@mui/icons-material";
import toast from "react-hot-toast";

const CreateExam = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Exam Basic Info
  const [examData, setExamData] = useState({
    courseId: "",
    title: "",
    description: "",
    durationMinutes: 60,
    totalMarks: 100,
    passingMarks: 50,
    availableFrom: "",
    availableTo: "",
    proctored: false,
    isPublished: false,
  });

  // Questions
  const [questions, setQuestions] = useState([
    {
      type: "multiple-choice",
      questionText: "",
      marks: 5,
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const steps = ["معلومات الاختبار", "إضافة الأسئلة", "المراجعة والنشر"];

  // فقط اختيار من متعدد وصح/خطأ
  const questionTypes = [
    { value: "multiple-choice", label: "اختيار من متعدد" },
    { value: "true-false", label: "صح أو خطأ" },
  ];

  const handleExamChange = (e) => {
    const { name, value, checked, type } = e.target;
    setExamData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];

    // إذا تم تغيير نوع السؤال إلى صح/خطأ، نعيد تعيين الخيارات
    if (field === "type" && value === "true-false") {
      updatedQuestions[index].options = ["صح", "خطأ"];
      updatedQuestions[index].correctAnswer = "";
    }
    // إذا تم تغيير نوع السؤال إلى اختيار من متعدد، نعيد تعيين الخيارات
    else if (field === "type" && value === "multiple-choice") {
      updatedQuestions[index].options = ["", "", "", ""];
      updatedQuestions[index].correctAnswer = "";
    }

    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "multiple-choice",
        questionText: "",
        marks: 5,
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      toast.error("يجب أن يحتوي الاختبار على سؤال واحد على الأقل");
    }
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length > 2) {
      updatedQuestions[qIndex].options.splice(optIndex, 1);
      setQuestions(updatedQuestions);
    } else {
      toast.error("يجب أن يكون هناك خيارين على الأقل");
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate basic info
      if (!examData.title || !examData.courseId) {
        toast.error("يرجى ملء جميع الحقول المطلوبة");
        return;
      }
    } else if (activeStep === 1) {
      // Validate questions
      const hasEmptyQuestion = questions.some((q) => !q.questionText);
      if (hasEmptyQuestion) {
        toast.error("يرجى ملء جميع الأسئلة");
        return;
      }

      // Validate that all questions have correct answers
      const hasNoCorrectAnswer = questions.some((q) => !q.correctAnswer);
      if (hasNoCorrectAnswer) {
        toast.error("يرجى اختيار الإجابة الصحيحة لكل سؤال");
        return;
      }

      // Validate that all options are filled for multiple-choice
      const hasEmptyOptions = questions.some(
        (q) =>
          q.type === "multiple-choice" && q.options.some((opt) => !opt.trim()),
      );
      if (hasEmptyOptions) {
        toast.error("يرجى ملء جميع الخيارات في أسئلة الاختيار من متعدد");
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const examPayload = {
        ...examData,
        questions: questions.map((q, index) => ({
          ...q,
          order: index + 1,
        })),
      };

      console.log("Creating exam:", examPayload);

      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("تم إنشاء الاختبار بنجاح! 🎉");
      navigate("/teacher/dashboard");
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error("فشل إنشاء الاختبار. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f9fafb",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/teacher/dashboard")}
            sx={{
              mb: 2,
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              color: darkMode ? "#f1f5f9" : "inherit",
            }}
          >
            العودة للوحة التحكم
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                background: "linear-gradient(135deg, #dc2626 0%, #db2777 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Assignment />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
              >
                إنشاء اختبار جديد
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Cairo, sans-serif"
                sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
              >
                أنشئ اختبار تقييمي لطلابك
              </Typography>
            </Box>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 700,
                      color: darkMode ? "#94a3b8" : "inherit",
                    },
                    "& .MuiStepLabel-label.Mui-active": {
                      color: darkMode ? "#f1f5f9" : "inherit",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: darkMode ? "#334155" : "#e5e7eb",
            bgcolor: darkMode ? "#1e293b" : "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Step 1: Basic Info */}
            {activeStep === 0 && (
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  المعلومات الأساسية
                </Typography>

                <Grid container spacing={3}>
                  {/* Course Selection */}
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        }}
                      >
                        اختر الكورس
                      </InputLabel>
                      <Select
                        name="courseId"
                        value={examData.courseId}
                        onChange={handleExamChange}
                        label="اختر الكورس"
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                          "& .MuiSelect-select": {
                            color: darkMode ? "#f1f5f9" : undefined,
                          },
                        }}
                      >
                        <MenuItem
                          value="course1"
                          sx={{ fontFamily: "Cairo, sans-serif" }}
                        >
                          كورس الرياضيات - الصف الأول الثانوي
                        </MenuItem>
                        <MenuItem
                          value="course2"
                          sx={{ fontFamily: "Cairo, sans-serif" }}
                        >
                          كورس الرياضيات - الصف الثاني الثانوي
                        </MenuItem>
                        <MenuItem
                          value="course3"
                          sx={{ fontFamily: "Cairo, sans-serif" }}
                        >
                          كورس الرياضيات - الصف الثالث الثانوي
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Title */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="title"
                      label="عنوان الاختبار"
                      value={examData.title}
                      onChange={handleExamChange}
                      placeholder="مثال: اختبار الفصل الأول - الجبر"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      name="description"
                      label="وصف الاختبار (اختياري)"
                      value={examData.description}
                      onChange={handleExamChange}
                      placeholder="اكتب وصفاً مختصراً عن الاختبار..."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Duration */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="durationMinutes"
                      label="مدة الاختبار (بالدقائق)"
                      value={examData.durationMinutes}
                      onChange={handleExamChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Total Marks */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="totalMarks"
                      label="إجمالي الدرجات"
                      value={examData.totalMarks}
                      onChange={handleExamChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Passing Marks */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="passingMarks"
                      label="درجة النجاح"
                      value={examData.passingMarks}
                      onChange={handleExamChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Available From */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      name="availableFrom"
                      label="متاح من"
                      value={examData.availableFrom}
                      onChange={handleExamChange}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Available To */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      name="availableTo"
                      label="متاح حتى"
                      value={examData.availableTo}
                      onChange={handleExamChange}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          fontFamily: "Cairo, sans-serif",
                          color: darkMode ? "#94a3b8" : undefined,
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: darkMode ? "#334155" : undefined,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#f1f5f9" : undefined,
                        },
                      }}
                      InputProps={{
                        sx: { fontFamily: "Cairo, sans-serif" },
                      }}
                    />
                  </Grid>

                  {/* Proctored */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={examData.proctored}
                          onChange={handleExamChange}
                          name="proctored"
                        />
                      }
                      label={
                        <Typography
                          fontFamily="Cairo, sans-serif"
                          fontWeight={600}
                          sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                        >
                          اختبار مراقب (Proctored)
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 2: Questions */}
            {activeStep === 1 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    fontFamily="Cairo, sans-serif"
                    sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                  >
                    الأسئلة ({questions.length})
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={addQuestion}
                    sx={{
                      fontFamily: "Cairo, sans-serif",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    }}
                  >
                    إضافة سؤال
                  </Button>
                </Box>

                {questions.map((question, qIndex) => (
                  <Paper
                    key={qIndex}
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 3,
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label={`السؤال ${qIndex + 1}`}
                        sx={{
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 700,
                          bgcolor: darkMode ? "#1e293b" : "#e0e7ff",
                          color: darkMode ? "#f1f5f9" : "#3730a3",
                        }}
                      />
                      <IconButton
                        onClick={() => removeQuestion(qIndex)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    <Grid container spacing={2}>
                      {/* Question Type */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel
                            sx={{
                              fontFamily: "Cairo, sans-serif",
                              color: darkMode ? "#94a3b8" : undefined,
                            }}
                          >
                            نوع السؤال
                          </InputLabel>
                          <Select
                            value={question.type}
                            onChange={(e) =>
                              handleQuestionChange(
                                qIndex,
                                "type",
                                e.target.value,
                              )
                            }
                            label="نوع السؤال"
                            sx={{
                              fontFamily: "Cairo, sans-serif",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: darkMode ? "#334155" : undefined,
                              },
                              "& .MuiSelect-select": {
                                color: darkMode ? "#f1f5f9" : undefined,
                              },
                            }}
                          >
                            {questionTypes.map((type) => (
                              <MenuItem
                                key={type.value}
                                value={type.value}
                                sx={{ fontFamily: "Cairo, sans-serif" }}
                              >
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Marks */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="الدرجة"
                          value={question.marks}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "marks",
                              parseInt(e.target.value),
                            )
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: darkMode ? "#334155" : undefined,
                              },
                            },
                            "& .MuiInputBase-input": {
                              color: darkMode ? "#f1f5f9" : undefined,
                            },
                            "& .MuiInputLabel-root": {
                              fontFamily: "Cairo, sans-serif",
                              color: darkMode ? "#94a3b8" : undefined,
                            },
                          }}
                          InputProps={{
                            sx: { fontFamily: "Cairo, sans-serif" },
                          }}
                        />
                      </Grid>

                      {/* Question Text */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="نص السؤال"
                          value={question.questionText}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "questionText",
                              e.target.value,
                            )
                          }
                          placeholder="اكتب السؤال هنا..."
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: darkMode ? "#334155" : undefined,
                              },
                            },
                            "& .MuiInputBase-input": {
                              color: darkMode ? "#f1f5f9" : undefined,
                            },
                            "& .MuiInputLabel-root": {
                              fontFamily: "Cairo, sans-serif",
                              color: darkMode ? "#94a3b8" : undefined,
                            },
                          }}
                          InputProps={{
                            sx: { fontFamily: "Cairo, sans-serif" },
                          }}
                        />
                      </Grid>

                      {/* Options (for both types) */}
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          fontFamily="Cairo, sans-serif"
                          fontWeight={700}
                          sx={{
                            mb: 1,
                            color: darkMode ? "#f1f5f9" : "inherit",
                          }}
                        >
                          الخيارات:{" "}
                          {question.type === "true-false" &&
                            "(اختر الإجابة الصحيحة)"}
                        </Typography>

                        <RadioGroup
                          value={question.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "correctAnswer",
                              e.target.value,
                            )
                          }
                        >
                          {question.options.map((option, optIndex) => (
                            <Box
                              key={optIndex}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Radio value={option} />
                              <TextField
                                fullWidth
                                size="small"
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    qIndex,
                                    optIndex,
                                    e.target.value,
                                  )
                                }
                                placeholder={`الخيار ${optIndex + 1}`}
                                disabled={question.type === "true-false"}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: darkMode
                                        ? "#334155"
                                        : undefined,
                                    },
                                  },
                                  "& .MuiInputBase-input": {
                                    color: darkMode ? "#f1f5f9" : undefined,
                                  },
                                }}
                                InputProps={{
                                  sx: { fontFamily: "Cairo, sans-serif" },
                                }}
                              />
                              {question.type === "multiple-choice" &&
                                question.options.length > 2 && (
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      removeOption(qIndex, optIndex)
                                    }
                                    color="error"
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                )}
                            </Box>
                          ))}
                        </RadioGroup>

                        {question.type === "multiple-choice" && (
                          <Button
                            size="small"
                            startIcon={<Add />}
                            onClick={() => addOption(qIndex)}
                            sx={{
                              mt: 1,
                              fontFamily: "Cairo, sans-serif",
                              fontWeight: 700,
                              color: darkMode ? "#f1f5f9" : "inherit",
                            }}
                          >
                            إضافة خيار
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Step 3: Review */}
            {activeStep === 2 && (
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  fontFamily="Cairo, sans-serif"
                  sx={{ mb: 3, color: darkMode ? "#f1f5f9" : "inherit" }}
                >
                  مراجعة الاختبار
                </Typography>

                {/* Exam Info Summary */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    border: "1px solid",
                    borderColor: darkMode ? "#334155" : "#e5e7eb",
                    bgcolor: darkMode ? "#0f172a" : "#f9fafb",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    fontFamily="Cairo, sans-serif"
                    sx={{ mb: 2, color: darkMode ? "#f1f5f9" : "inherit" }}
                  >
                    معلومات الاختبار:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        <strong>العنوان:</strong> {examData.title}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        <strong>المدة:</strong> {examData.durationMinutes} دقيقة
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        <strong>إجمالي الدرجات:</strong> {examData.totalMarks}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        <strong>درجة النجاح:</strong> {examData.passingMarks}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        fontFamily="Cairo, sans-serif"
                        sx={{ color: darkMode ? "#f1f5f9" : "inherit" }}
                      >
                        <strong>عدد الأسئلة:</strong> {questions.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Questions Review */}
                {questions.map((q, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      border: "1px solid",
                      borderColor: darkMode ? "#334155" : "#e5e7eb",
                      bgcolor: darkMode ? "#020617" : "#ffffff",
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      fontFamily="Cairo, sans-serif"
                      sx={{ mb: 1, color: darkMode ? "#f1f5f9" : "inherit" }}
                    >
                      {index + 1}. {q.questionText}
                    </Typography>

                    <Box sx={{ pl: 2 }}>
                      {q.options.map((opt, i) => (
                        <Typography
                          key={i}
                          fontFamily="Cairo, sans-serif"
                          sx={{
                            color:
                              opt === q.correctAnswer
                                ? "#22c55e"
                                : darkMode
                                  ? "#94a3b8"
                                  : "text.secondary",
                            fontWeight: opt === q.correctAnswer ? 700 : 400,
                          }}
                        >
                          • {opt}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{
              fontFamily: "Cairo, sans-serif",
              fontWeight: 700,
              color: darkMode ? "#f1f5f9" : "inherit",
            }}
          >
            رجوع
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              }}
            >
              التالي
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
              }}
            >
              {loading ? "جاري الحفظ..." : "حفظ ونشر الاختبار"}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CreateExam;
