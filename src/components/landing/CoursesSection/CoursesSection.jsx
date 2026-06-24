// frontend/src/components/landing/CoursesSection/CoursesSection.jsx
import { useNavigate } from 'react-router-dom';
import styles from './CoursesSection.module.css';
import { COURSES } from '../../../data/landingData';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const navigate = useNavigate();

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  return (
    <section className={styles.section} id="courses" dir="rtl">
      <div className={styles.bgPattern} />
      <div className={styles.topFade} />

      <div className={styles.coursesContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>المواد الدراسية</h2>

          <button 
            onClick={handleViewAllCourses}
            className={styles.link}
            style={{ cursor: 'pointer' }}
          >
            عرض كل الكورسات <span aria-hidden>←</span>
          </button>
        </div>

        <div className={styles.grid}>
          {COURSES.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;