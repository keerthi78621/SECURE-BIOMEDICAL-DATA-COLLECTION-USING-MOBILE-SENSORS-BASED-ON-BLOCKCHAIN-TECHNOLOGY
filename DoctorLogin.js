import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirecting after login

const LoginDoctor = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to handle success/error messages
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the Flask backend
      const response = await axios.post(
        "http://localhost:5000/login_doctor",
        formData
      );

      // Handle success
      setMessage(response.data.success || "Login successful!");
      setIsError(false);

      // Save doctor details to local storage (optional)
      localStorage.setItem("doctor", JSON.stringify(response.data.doctor));

      // Redirect to the doctor's dashboard or home page
      navigate("/doctor-dashboard");
    } catch (error) {
      // Handle error
      setMessage(
        error.response?.data?.error || "An error occurred during login."
      );
      setIsError(true);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Doctor Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {/* Display success/error message */}
      {message && (
        <p style={{ color: isError ? "red" : "green", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginDoctor;