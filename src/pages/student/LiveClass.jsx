// frontend/src/pages/student/LiveClass.jsx
import { useEffect, useState } from 'react';
import API from '../../services/api';

const LiveClass = () => {
  const [msg, setMsg] = useState('Loading...');

  useEffect(() => {
    API.get('/webrtc/test')
      .then(res => setMsg(res.data.status))
      .catch(() => setMsg('Backend not connected'));
  }, []);

  return <h2>{msg}</h2>;
};

export default LiveClass;
