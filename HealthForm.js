import React, { useState } from 'react';

const HealthForm = ({ onSubmit }) => {
  const [input, setInput] = useState({
    age: '',
    weight: '',
    height: '',
    bloodPressure: '',
    cholesterol: '',
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debugging line
    if (typeof onSubmit === 'function') {
      onSubmit(input); // Call the onSubmit function passed as a prop
    } else {
      console.error('onSubmit is not a function');
    }
  };

  // Inline CSS styles
  const formStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputGroupStyle = {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const labelStyle = {
    marginRight: '10px',
    width: '120px',
    textAlign: 'right',
  };

  const inputStyle = {
    padding: '5px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Age:</label>
        <input
          type="number"
          name="age"
          value={input.age}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Weight (kg):</label>
        <input
          type="number"
          name="weight"
          value={input.weight}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Height (cm):</label>
        <input
          type="number"
          name="height"
          value={input.height}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Blood Pressure:</label>
        <input
          type="number"
          name="bloodPressure"
          value={input.bloodPressure}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Cholesterol:</label>
        <input
          type="number"
          name="cholesterol"
          value={input.cholesterol}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Check Health
      </button>
    </form>
  );
};

export default HealthForm;