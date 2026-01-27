// frontend/src/components/landing/TopStudents/TopStudentsSection.jsx
import { motion } from 'framer-motion';
import StudentRow from './StudentRow';
import styles from './topStudents.module.css';
import { TOP_STUDENTS } from '../../../data/landingData';

const TopStudentsSection = () => {
  return (
    <section className={styles.section} id="top-students" dir="rtl">
      <div className={styles.bgPattern} />
      <div className={styles.topFade} />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>أوائل قِمّة</h2>
          <p className={styles.subtitle}>طلاب أثبتوا تميزهم وحققوا أعلى النتائج معنا.</p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <div className={styles.groupHeader}>
              <div>
                <h3 className={styles.streamTitle}>علمي رياضة</h3>
                <div className={styles.streamMeta}>أفضل 10 طلاب</div>
              </div>
            </div>

            <div className={styles.list}>
              {TOP_STUDENTS.sciMath.slice(0, 10).map((student, index) => (
                <StudentRow key={`${student.name}-${index}`} student={student} rank={index + 1} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            <div className={styles.groupHeader}>
              <div>
                <h3 className={styles.streamTitle}>علمي علوم</h3>
                <div className={styles.streamMeta}>أفضل 10 طلاب</div>
              </div>
            </div>

            <div className={styles.list}>
              {TOP_STUDENTS.sciBio.slice(0, 10).map((student, index) => (
                <StudentRow key={`${student.name}-${index}`} student={student} rank={index + 1} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.19 }}
          >
            <div className={styles.groupHeader}>
              <div>
                <h3 className={styles.streamTitle}>أدبي</h3>
                <div className={styles.streamMeta}>أفضل 10 طلاب</div>
              </div>
            </div>

            <div className={styles.list}>
              {TOP_STUDENTS.arts.slice(0, 10).map((student, index) => (
                <StudentRow key={`${student.name}-${index}`} student={student} rank={index + 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TopStudentsSection;