import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserMd, FaFileAlt, FaUserPlus, FaDollarSign } from 'react-icons/fa'; // Import icons

const AdminDashboard = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handle button click for navigation or actions
  const handleButtonClick = (action) => {
    if (action === 'sendPayment') {
      // Navigate to Send Payment page
      navigate('/sendPayment');
    } else {
      // For navigation to other pages
      navigate(action);
    }
  };

  // Inline styles for main content
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
    },
    heading: {
      color: '#007bff',
      marginBottom: '30px',
    },
    button: {
      fontSize: '18px',
      padding: '12px 20px',
      borderRadius: '8px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      width: '200px',
      margin: '10px',
      display: 'flex',
      alignItems: 'center', // Align icon and text horizontally
      justifyContent: 'center', // Center text and icon
    },
    icon: {
      marginRight: '10px', // Add space between the icon and text
    },
    optionsContainer: {
      display: 'flex',
      flexWrap: 'wrap', // Allow wrapping to next row if space is insufficient
      justifyContent: 'center', // Center the buttons
      gap: '20px', // Space between the buttons
    },
  };

  return (
    <div className="container" style={styles.container}>
      <h2 style={styles.heading}>Welcome to the Admin Dashboard</h2>
      <p>Here you can manage the hospital system.</p>

      <div className="dashboard-options" style={styles.optionsContainer}>
        <button
          style={styles.button}
          onClick={() => handleButtonClick('/patient/dashboard')}
        >
          <FaUsers style={styles.icon} /> View Patients
        </button>
        <button
          style={styles.button}
          onClick={() => handleButtonClick('/viewdoctor')}
        >
          <FaUserMd style={styles.icon} /> View Doctors
        </button>
        <button
          style={styles.button}
          onClick={() => handleButtonClick('/register_doctor')}
        >
          <FaUserPlus style={styles.icon} /> Register Doctor
        </button>
        <button
          style={styles.button}
          onClick={() => handleButtonClick('sendPayment')}
        >
          <FaDollarSign style={styles.icon} /> Send Payment
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
