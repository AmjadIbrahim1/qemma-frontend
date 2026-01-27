import styles from './SectionTitle.module.css';

const SectionTitle = ({ title, subtitle, right }) => {
  return (
    <div className={styles.wrap} dir="rtl">
      <div>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {right ? <div className={styles.right}>{right}</div> : null}
    </div>
  );
};

export default SectionTitle;