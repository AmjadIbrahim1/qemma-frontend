import { useState } from 'react';

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    duration: '',
    maxStudents: '',
    startDate: '',
    endDate: '',
    prerequisites: [],
    thumbnail: null,
  });

  const [prerequisite, setPrerequisite] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Categories & Levels
  const categories = [
    'رياضيات',
    'فيزياء',
    'كيمياء',
    'أحياء',
    'لغة عربية',
    'لغة إنجليزية',
    'لغة فرنسية',
    'تاريخ',
    'جغرافيا',
    'علوم الحاسب',
  ];

  const levels = [
    'الصف الأول الثانوي',
    'الصف الثاني الثانوي',
    'الصف الثالث الثانوي',
    'مبتدئ',
    'متوسط',
    'متقدم',
  ];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle Thumbnail Upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          open: true,
          message: 'يرجى اختيار صورة فقط',
          severity: 'error',
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت',
          severity: 'error',
        });
        return;
      }

      setFormData(prev => ({ ...prev, thumbnail: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Prerequisite
  const handleAddPrerequisite = () => {
    if (prerequisite.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, prerequisite.trim()],
      }));
      setPrerequisite('');
    }
  };

  // Remove Prerequisite
  const handleRemovePrerequisite = (index) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index),
    }));
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'عنوان الكورس مطلوب';
    if (!formData.description.trim()) newErrors.description = 'وصف الكورس مطلوب';
    if (!formData.category) newErrors.category = 'التصنيف مطلوب';
    if (!formData.level) newErrors.level = 'المستوى مطلوب';
    if (!formData.price) newErrors.price = 'السعر مطلوب';
    if (formData.price && isNaN(formData.price)) newErrors.price = 'السعر يجب أن يكون رقماً';
    if (!formData.duration) newErrors.duration = 'المدة مطلوبة';
    if (!formData.startDate) newErrors.startDate = 'تاريخ البداية مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'يرجى ملء جميع الحقول المطلوبة',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'prerequisites') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'thumbnail' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log('Form Data:', Object.fromEntries(formDataToSend));

      setSnackbar({
        open: true,
        message: 'تم إنشاء الكورس بنجاح! 🎉',
        severity: 'success',
      });

    } catch (error) {
      console.error('Error creating course:', error);
      setSnackbar({
        open: true,
        message: 'حدث خطأ أثناء إنشاء الكورس',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
        color: 'white',
        padding: '30px 20px',
        borderRadius: '12px',
        marginBottom: '30px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => window.history.back()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            ←
          </button>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'Cairo, sans-serif', fontSize: '28px', fontWeight: 900 }}>
              إنشاء كورس جديد
            </h1>
            <p style={{ margin: '5px 0 0', opacity: 0.9, fontFamily: 'Cairo, sans-serif' }}>
              أضف كورساً جديداً لطلابك
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>
        {/* Main Form */}
        <div>
          {/* Basic Info Card */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '20px',
          }}>
            <h2 style={{ margin: '0 0 25px', fontFamily: 'Cairo, sans-serif', fontSize: '22px', fontWeight: 900, color: '#f1f5f9' }}>
              المعلومات الأساسية
            </h2>

            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                عنوان الكورس *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="مثال: دورة الفيزياء الشاملة"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: errors.title ? '2px solid #ef4444' : '1px solid #475569',
                  background: '#0f172a',
                  color: '#f1f5f9',
                  fontFamily: 'Cairo, sans-serif',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.title && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.title}</p>}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                وصف الكورس *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="اكتب وصفاً تفصيلياً للكورس..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: errors.description ? '2px solid #ef4444' : '1px solid #475569',
                  background: '#0f172a',
                  color: '#f1f5f9',
                  fontFamily: 'Cairo, sans-serif',
                  fontSize: '16px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              {errors.description && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.description}</p>}
            </div>

            {/* Category & Level */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  التصنيف *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: errors.category ? '2px solid #ef4444' : '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.category}</p>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  المستوى *
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: errors.level ? '2px solid #ef4444' : '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">اختر المستوى</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.level && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.level}</p>}
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                المتطلبات السابقة (اختياري)
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input
                  type="text"
                  value={prerequisite}
                  onChange={(e) => setPrerequisite(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPrerequisite();
                    }
                  }}
                  placeholder="أضف متطلب..."
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                  }}
                />
                <button
                  onClick={handleAddPrerequisite}
                  style={{
                    padding: '10px 20px',
                    background: '#2563eb',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  إضافة
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.prerequisites.map((prereq, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 15px',
                      background: '#334155',
                      color: '#f1f5f9',
                      borderRadius: '20px',
                      fontFamily: 'Cairo, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    {prereq}
                    <button
                      onClick={() => handleRemovePrerequisite(index)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#f87171',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Course Details Card */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '30px',
          }}>
            <h2 style={{ margin: '0 0 25px', fontFamily: 'Cairo, sans-serif', fontSize: '22px', fontWeight: 900, color: '#f1f5f9' }}>
              تفاصيل الكورس
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {/* Price */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  السعر (جنيه) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="مثال: 500"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: errors.price ? '2px solid #ef4444' : '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.price && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.price}</p>}
              </div>

              {/* Duration */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  المدة (بالأسابيع) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="مثال: 8"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: errors.duration ? '2px solid #ef4444' : '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.duration && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.duration}</p>}
              </div>

              {/* Max Students */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  الحد الأقصى للطلاب (اختياري)
                </label>
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  placeholder="مثال: 30"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Start Date */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  تاريخ البداية *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: errors.startDate ? '2px solid #ef4444' : '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.startDate && <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0', fontFamily: 'Cairo, sans-serif' }}>{errors.startDate}</p>}
              </div>

              {/* End Date */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Cairo, sans-serif', color: '#f1f5f9', fontWeight: 600 }}>
                  تاريخ النهاية (اختياري)
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Thumbnail Card */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '25px',
            marginBottom: '20px',
          }}>
            <h3 style={{ margin: '0 0 20px', fontFamily: 'Cairo, sans-serif', fontSize: '20px', fontWeight: 900, color: '#f1f5f9' }}>
              صورة الكورس
            </h3>

            {thumbnailPreview ? (
              <div style={{ position: 'relative', marginBottom: '15px' }}>
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <button
                  onClick={() => {
                    setThumbnailPreview(null);
                    setFormData(prev => ({ ...prev, thumbnail: null }));
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    border: 'none',
                    color: 'white',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '20px',
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div
                onClick={() => document.getElementById('thumbnail-upload').click()}
                style={{
                  padding: '40px 20px',
                  marginBottom: '15px',
                  textAlign: 'center',
                  border: '2px dashed #475569',
                  borderRadius: '8px',
                  background: '#0f172a',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>🖼️</div>
                <p style={{ color: '#94a3b8', fontFamily: 'Cairo, sans-serif', margin: 0 }}>
                  اضغط لرفع صورة
                </p>
              </div>
            )}

            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              style={{ display: 'none' }}
            />

            <button
              onClick={() => document.getElementById('thumbnail-upload').click()}
              style={{
                width: '100%',
                padding: '12px',
                background: 'transparent',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              📤 اختر صورة
            </button>

            <p style={{ fontSize: '12px', textAlign: 'center', color: '#64748b', fontFamily: 'Cairo, sans-serif', margin: 0 }}>
              الحد الأقصى: 5 ميجابايت
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading ? '#475569' : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              fontSize: '18px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {loading ? '⏳ جاري الإنشاء...' : '✨ إنشاء الكورس'}
          </button>
        </div>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 25px',
            background: snackbar.severity === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '8px',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>{snackbar.message}</span>
          <button
            onClick={() => setSnackbar({ ...snackbar, open: false })}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;