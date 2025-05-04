import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from '../api/register_doctor';  // Correct the import path

const RegisterDoctor = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [experience, setExperience] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const validateForm = () => {
    if (!name || !specialization || !contact || !experience || !username || !password || !imageSrc) {
      setMessage('Please fill in all fields and capture an image.');
      return false;
    }
    if (isNaN(experience)) {
      setMessage('Experience must be a number.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const doctorData = {
      name,
      specialization,
      contact,
      experience,
      username,
      password,
    };

    setIsLoading(true);
    try {
      const response = await registerDoctor(doctorData, imageSrc);
      if (response.success) {
        setMessage('Doctor registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login_doctor');
        }, 2000);
      } else {
        setMessage(response.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Register as Doctor</h1>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        videoConstraints={{ facingMode: 'user' }}
      />
      <br />
      <button onClick={capture} disabled={isLoading}>
        Capture Photo
      </button>
      {imageSrc && <img src={imageSrc} alt="Captured" width="320" height="240" />}
      
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', margin: '5px' }}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          style={{ padding: '8px', margin: '5px' }}
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{ padding: '8px', margin: '5px' }}
        />
        <input
          type="text"
          placeholder="Experience (in years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ padding: '8px', margin: '5px' }}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px', margin: '5px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', margin: '5px' }}
        />
        <br />
        <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterDoctor;