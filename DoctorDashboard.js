import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DoctorDashboard = () => {
  const location = useLocation();
  const { doctor } = location.state || {};
  const [users, setUsers] = useState([]); // List of users for the dropdown
  const [selectedUser, setSelectedUser] = useState(""); // Selected user from dropdown
  const [message, setMessage] = useState(""); // Message input
  const [file, setFile] = useState(null); // File input
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_users"); // Replace with your backend endpoint
      if (response.data.users) {
        setUsers(response.data.users); // Set the list of users
      } else {
        setErrorMessage("Failed to fetch users.");
      }
    } catch (error) {
      setErrorMessage("Error fetching users.");
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !message) {
      setErrorMessage("Please select a user and enter a message.");
      return;
    }

    const formData = new FormData();
    formData.append("doctor_username", doctor.username); // Add doctor's username
    formData.append("user_username", selectedUser); // Add selected user's username
    formData.append("message", message); // Add message
    if (file) {
      formData.append("file", file); // Add file if provided
    }

    try {
      const response = await axios.post("http://localhost:5000/send_data", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set content type for file upload
      });

      if (response.data.success) {
        setSuccessMessage("Data sent successfully!");
        setErrorMessage("");
        setSelectedUser(""); // Reset selected user
        setMessage(""); // Reset message
        setFile(null); // Reset file
      } else {
        setErrorMessage(response.data.error || "Failed to send data.");
      }
    } catch (error) {
      setErrorMessage("Error sending data.");
      console.error("Error sending data:", error);
    }
  };

  if (!doctor) {
    return <div>No doctor data found. Please log in again.</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Doctor Dashboard</h1>

      {/* Doctor Info Card */}
      <div style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Welcome, {doctor.name}!</h2>
        <p style={{ textAlign: 'center' }}>Username: {doctor.username}</p>
        <p style={{ textAlign: 'center' }}>Specialization: {doctor.specialization}</p>
      </div>

      {/* Send Data Form */}
      <div style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '30px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Send Data to User</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label htmlFor="user" style={{ display: 'block', marginBottom: '5px' }}>Select User:</label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
              style={{ width: '50%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ width: '50%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px', width: '100%' }}>
            <input
              type="file"
              id="file"
              style={{ display: "none" }} // Hide the default file input
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div
              onClick={() => document.getElementById('file').click()} // Trigger file input on button click
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '150px',
                height: '50px',
                borderRadius: '8px',
                background: 'linear-gradient(-35deg, rgb(238, 194, 47) 5%, rgb(255, 223, 118))',
                cursor: 'pointer',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                color: '#fff',
                textAlign: 'center',
                padding: '10px',
                marginBottom: '20px',
              }}
            >
              Upload File
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Send Data
          </button>
        </form>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
