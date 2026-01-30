// frontend/src/components/landing/CoursesSection/CoursesSection.jsx
import styles from './CoursesSection.module.css';
import { COURSES } from '../../../data/landingData';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  return (
    <section className={styles.section} id="courses" dir="rtl">
      <div className={styles.bgPattern} />
      <div className={styles.topFade} />

      <div className={styles.coursesContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>المواد الدراسية</h2>

          <span className={styles.link}>
            عرض كل الكورسات <span aria-hidden>←</span>
          </span>
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