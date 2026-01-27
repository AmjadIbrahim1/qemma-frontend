import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import GlassCard from '../../common/GlassCard';
import { progressChartData } from '../../../../data/studentData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const ProgressChart = ({ darkMode }) => {
  const data = {
    labels: progressChartData.labels,
    datasets: [
      {
        label: 'الدرجات',
        data: progressChartData.grades,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'ساعات الدراسة',
        data: progressChartData.studyHours,
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        rtl: true,
        labels: {
          font: { family: 'Cairo', size: 12 },
          color: darkMode ? '#94a3b8' : '#64748b',
          padding: 15,
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
        ticks: { font: { family: 'Cairo', size: 11 }, color: darkMode ? '#94a3b8' : '#64748b' },
      },
      y: {
        grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
        ticks: { font: { family: 'Cairo', size: 11 }, color: darkMode ? '#94a3b8' : '#64748b' },
      },
    },
  };

  return (
    <GlassCard title="📈 تقدم الأداء الأسبوعي" icon="📊" darkMode={darkMode}>
      <Box sx={{ height: 280 }}>
        <Line data={data} options={options} />
      </Box>
    </GlassCard>
  );
};

export default ProgressChart;