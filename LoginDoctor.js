import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginDoctor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login_doctor', {
        username,
        password,
      });

      if (response.data.success) {
        setMessage('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/doctor_dashboard', { state: { doctor: response.data.doctor } });
        }, 2000);
      } else {
        setMessage(response.data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
      console.error('Error:', error);
    }
  };

  // Inline styles
  const outerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Full viewport height to center vertically
    background: 'url(https://images.unsplash.com/photo-1609632305661-e9734f4da1a0) no-repeat center center fixed', // Internet image link here
    backgroundSize: 'cover',
  };

  const formStyle = {
    position: 'relative',
    display: 'block',
    padding: '2.2rem',
    maxWidth: '350px',
    background: 'linear-gradient(14deg, rgba(2,0,36, 0.8) 0%, rgba(24, 24, 65, 0.7) 66%, rgb(20, 76, 99) 100%), radial-gradient(circle, rgba(2,0,36, 0.5) 0%, rgba(32, 15, 53, 0.2) 65%, rgba(14, 29, 28, 0.9) 100%)',
    border: '2px solid #fff',
    boxShadow: 'rgba(0, 212, 255) 0px 0px 50px -15px',
    overflow: 'hidden',
    zIndex: 1,
  };

  const titleStyle = {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontFamily: 'monospace',
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.7)',
    animationDuration: '1.5s',
  };

  const inputStyle = {
    outline: 'none',
    border: '2px solid #ffffff',
    margin: '8px 0',
    fontFamily: 'monospace',
  };

  const inputContainerStyle = {
    position: 'relative',
  };

  const inputFieldStyle = {
    backgroundColor: '#fff',
    padding: '6px',
    fontSize: '0.875rem',
    width: '250px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  };

  const submitStyle = {
    position: 'relative',
    display: 'block',
    padding: '8px',
    backgroundColor: '#c0c0c0',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '500',
    width: '100%',
    textTransform: 'uppercase',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '10px',
  };

  return (
    <div style={outerStyle}>
      <div style={formStyle}>
        <h1 style={titleStyle}>Login as Doctor</h1>
        <form onSubmit={handleLogin}>
          <div style={inputContainerStyle}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ ...inputStyle, ...inputFieldStyle }}
            />
          </div>
          <div style={inputContainerStyle}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, ...inputFieldStyle }}
            />
          </div>
          <button type="submit" style={submitStyle}>
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default LoginDoctor;
