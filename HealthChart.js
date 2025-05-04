import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HealthChart = ({ data }) => {
  const chartData = {
    labels: ['Age', 'Weight', 'Height', 'Blood Pressure', 'Cholesterol'],
    datasets: [
      {
        label: 'Health Metrics',
        data: [data.age, data.weight, data.height, data.bloodPressure, data.cholesterol],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category', // Explicitly set the scale type
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartContainerStyle = {
    margin: '20px auto',
    maxWidth: '800px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={chartContainerStyle}>
      {/* Add a key prop to force re-render */}
      <Line key={JSON.stringify(data)} data={chartData} options={options} />
    </div>
  );
};

export default HealthChart;