// frontend/src/components/landing/FinalCTA/FinalCTA.jsx
import styles from './FinalCTA.module.css';
import { Button } from '@mui/material';

const FinalCTA = () => {
  return (
    <section className={styles.section} dir="rtl" id="final-cta">
      <div className={styles.bgPattern} />
      <div className={styles.topFade} />

      <div className={styles.container}>
        <div className={styles.box}>
          <h2 className={styles.title}>جاهز تبدأ؟</h2>

          <p className={styles.subtitle}>
            ابدأ دلوقتي وخلي السنة دي مختلفة
          </p>

          <Button
            variant="contained"
            size="large"
            disableElevation
            sx={{
              borderRadius: '999px',
              padding: '12px 36px',
              fontWeight: 900,
              fontSize: '1.05rem',
              fontFamily: 'Cairo, sans-serif',
              background:
                'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)',
              '&:hover': {
                background:
                  'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 55%, #be185d 100%)',
              },
            }}
          >
            أنشئ حسابك الآن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;