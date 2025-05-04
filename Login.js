import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import Webcam from "react-webcam";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null); // Base64 encoded image
  const webcamRef = useRef(null); // Reference to the webcam component
  const navigate = useNavigate();

  // Capture image from webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc); // Set the base64 encoded image
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password || !image) {
      setError("Please fill in all fields and capture an image.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
        face_image: image, // Base64 encoded image
      });

      if (response.data.success) {
        // Redirect to the user dashboard with user data
        navigate("/user-dashboard", { state: { user: response.data.user } });
      } else {
        setError(response.data.error || "Login failed.");
      }
    } catch (error) {
      setError("Error logging in.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center bg-light"
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "400px",
          marginTop: "100px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="card-body" style={{ padding: "20px" }}>
          <h1 className="card-title text-center mb-4" style={{ fontSize: "1.5rem", color: "#343a40" }}>
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3" style={{ marginBottom: "20px" }}>
              <label htmlFor="username" className="form-label" style={{ fontSize: "1rem", color: "#495057" }}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                }}
              />
            </div>
            <div className="mb-3" style={{ marginBottom: "20px" }}>
              <label htmlFor="password" className="form-label" style={{ fontSize: "1rem", color: "#495057" }}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                }}
              />
            </div>
            <div className="mb-3" style={{ marginBottom: "20px" }}>
              <label className="form-label" style={{ fontSize: "1rem", color: "#495057" }}>
                Capture Face Image:
              </label>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                className="rounded mb-2"
              />
              <button
                type="button"
                onClick={captureImage}
                className="btn btn-primary w-100"
                style={{
                  backgroundColor: "#007bff",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  padding: "10px 15px",
                }}
              >
                Capture Image
              </button>
            </div>
            {image && (
              <div className="mb-3" style={{ marginBottom: "20px" }}>
                <h3 className="text-center" style={{ fontSize: "1rem", color: "#495057" }}>Captured Image</h3>
                <img
                  src={image}
                  alt="Captured"
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success w-100"
              style={{
                backgroundColor: "#28a745",
                border: "1px solid #28a745",
                borderRadius: "5px",
                padding: "10px 15px",
              }}
            >
              Login
            </button>
          </form>
          {error && <p className="text-danger mt-3 text-center" style={{ fontSize: "14px", color: "#dc3545" }}>{error}</p>}
          <p className="text-center mt-3" style={{ fontSize: "1rem", color: "#495057" }}>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary" style={{ color: "#007bff" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
