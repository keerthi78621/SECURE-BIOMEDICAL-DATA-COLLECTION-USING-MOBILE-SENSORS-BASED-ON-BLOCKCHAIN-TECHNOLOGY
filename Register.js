import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Register = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  // Handle registration form submission
  const handleRegister = async () => {
    if (!username || !password || !email || !imageSrc) {
      setMessage('Please fill all fields and capture an image.');
      return;
    }

    try {
      // Send registration request to the backend
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
          face_image: imageSrc,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.success);
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '500px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#007bff', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
          <h2>Register</h2>
        </div>
        <div style={{ padding: '20px' }}>
          {/* Webcam for capturing face image */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="240px"
            videoConstraints={{
              facingMode: 'user',
            }}
            style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={capture}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Capture Photo
            </button>
          </div>

          {/* Display captured image */}
          {imageSrc && (
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src={imageSrc} alt="Captured" style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          )}

          {/* Registration form */}
          <form>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={handleRegister}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
              >
                Register
              </button>
            </div>
          </form>

          {/* Display success/error messages */}
          {message && <div style={{ marginTop: '20px', textAlign: 'center', color: '#dc3545', fontWeight: 'bold' }}>{message}</div>}

          {/* Login link */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
