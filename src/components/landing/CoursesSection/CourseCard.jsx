// frontend/src/components/landing/CoursesSection/CourseCard.jsx
import styles from './CoursesSection.module.css';

import { Button } from '@mui/material';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
// import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { motion } from 'framer-motion';

const CourseCard = ({ course, index }) => {
  if (!course) return null;

  return (
    <motion.article
      dir="rtl"
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <div className={styles.media}>
        <img
          src={course.image}
          alt={course.title}
          className={styles.image}
          loading="lazy"
        />

        <div className={styles.priceBadge}>{course.price || 'مجاني'}</div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.courseTitle} title={course.title}>
          {course.title}
        </h3>

        <div className={styles.teacherRow}>
          <PersonOutlineRoundedIcon fontSize="small" className={styles.iconMuted} />
          <span className={styles.teacherText}>{course.teacher}</span>
        </div>

        <div className={styles.stream}>{course.stream}</div>

        <div className={styles.metaRow}>
          <Groups2RoundedIcon fontSize="small" className={styles.iconMuted} />
          <span>{course.students} طالب</span>

          <span className={styles.dot} />

          <span className={styles.levelPill}>ثانوية عامة</span>
        </div>

        <div className={styles.actions}>
          <Button
            variant="contained"
            fullWidth
            // endIcon={<ArrowBackIosNewRoundedIcon />}
            disableElevation
            sx={{
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 900,
              borderRadius: 2,
              py: 1.15,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
              },
            }}
          >
             اشترك الآن  
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default CourseCard;