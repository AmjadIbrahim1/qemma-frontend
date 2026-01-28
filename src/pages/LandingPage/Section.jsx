// frontend/src/pages/LandingPage/Section.jsx
const Section = ({ children, gray }) => {
  return (
    <section className={`${gray ? 'bg-gray-50 dark:bg-gray-800' : ''} w-full`}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        {children}
      </div>
    </section>
  );
};

export default Section;
