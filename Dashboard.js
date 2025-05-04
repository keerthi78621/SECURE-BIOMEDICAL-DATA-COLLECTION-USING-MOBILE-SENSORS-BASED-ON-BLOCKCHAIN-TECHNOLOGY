import React, { useState } from 'react';
import HealthForm from './HealthForm';
import HealthChart from './HealthChart';

const Dashboard = () => {
  const [healthData, setHealthData] = useState(null);

  const handleFormSubmit = (data) => {
    setHealthData(data);
  };

  // Inline CSS styles
  const dashboardStyle = {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={headingStyle}>Health Checkup Dashboard</h1>
      <HealthForm onSubmit={handleFormSubmit} />
      {healthData && <HealthChart data={healthData} />}
    </div>
  );
};

export default Dashboard;