// frontend/src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import LiveClass from '../pages/student/LiveClass';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/student/live-class" element={<LiveClass />} />
    </Routes>
  );
};

export default AppRoutes;
