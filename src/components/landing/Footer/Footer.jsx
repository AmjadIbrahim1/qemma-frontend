// frontend/src/components/landing/Footer/Footer.jsx
import { Facebook, Telegram, WhatsApp, YouTube } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <motion.footer
      dir="rtl"
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.bgPattern} />
      <div className={styles.topFade} />

      <div className={styles.container}>
        {/* Brand + Social */}
        <div className={styles.brandRow}>
          <div>
            <Typography
              variant="h6"
              className={styles.logo}
              sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900 }}
            >
              قِمّة
            </Typography>

            <p className={styles.desc}>
              منصة تعليمية متميزة لطلاب الثانوية العامة، نقدم لك تجربة فريدة لفهم المواد
              والتفاعل مع التدريبات.
            </p>

            <div className={styles.socialIcons}>
              <motion.a
                href="https://facebook.com"
                className={`${styles.socialBtn} ${styles.facebook}`}
                whileHover={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-label="Facebook"
              >
                <Facebook fontSize="small" />
              </motion.a>

              <motion.a
                href="https://t.me/yourchannel"
                className={`${styles.socialBtn} ${styles.telegram}`}
                whileHover={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-label="Telegram"
              >
                <Telegram fontSize="small" />
              </motion.a>

              <motion.a
                href="https://wa.me/yourphonenumber"
                className={`${styles.socialBtn} ${styles.whatsapp}`}
                whileHover={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-label="WhatsApp"
              >
                <WhatsApp fontSize="small" />
              </motion.a>

              <motion.a
                href="https://youtube.com"
                className={`${styles.socialBtn} ${styles.youtube}`}
                whileHover={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-label="YouTube"
              >
                <YouTube fontSize="small" />
              </motion.a>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaBox}>
            <p className={styles.ctaText}>
              ابدأ دلوقتي… وخلي السنة دي مختلفة.
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

        {/* Links */}
        <div className={styles.linksGrid}>
          <div>
            <div className={styles.linkTitle}>المنصة</div>
            <ul className={styles.linkList}>
              <li><a href="/about-us" className={styles.link}>عن قِمّة</a></li>
              <li><a href="/courses" className={styles.link}>الكورسات</a></li>
              <li><a href="/teachers" className={styles.link}>المدرسين</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.linkTitle}>الدعم</div>
            <ul className={styles.linkList}>
              <li><a href="/contact-us" className={styles.link}>تواصل معنا</a></li>
              <li><a href="/privacy-policy" className={styles.link}>سياسة الخصوصية</a></li>
              <li><a href="/terms" className={styles.link}>الشروط والأحكام</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.linkTitle}>مميزاتنا</div>
            <ul className={styles.linkList}>
              <li><a href="/features#tracking" className={styles.link}>نظام التقييم والمتابعة</a></li>
              <li><a href="/features#gamification" className={styles.link}>نظام Gamification</a></li>
              <li><a href="/features#monthly-tests" className={styles.link}>الاختبارات الشهرية</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          © 2026 منصة قِمّة التعليمية - كل الحقوق محفوظة
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;