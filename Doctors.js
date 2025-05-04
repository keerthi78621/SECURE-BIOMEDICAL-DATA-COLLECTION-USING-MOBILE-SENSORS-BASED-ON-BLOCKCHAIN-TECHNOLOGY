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
  const [sentData, setSentData] = useState([]); // List of sent data

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

  // Fetch sent data from the backend
  const fetchSentData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_sent_data", {
        params: { doctor_username: doctor.username },
      });
      if (response.data.sent_data) {
        setSentData(response.data.sent_data); // Set the list of sent data
      } else {
        setErrorMessage("Failed to fetch sent data.");
      }
    } catch (error) {
      setErrorMessage("Error fetching sent data.");
      console.error("Error fetching sent data:", error);
    }
  };

  // Fetch users and sent data when the component mounts
  useEffect(() => {
    fetchUsers();
    fetchSentData();
  }, [doctor]);

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
        fetchSentData(); // Refresh the sent data list
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
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      

      {/* Send Data Form */}
      <div style={{ marginTop: "40px" }}>
        <h3>Send Data to User</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user">Select User:</label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="file">Upload File (optional):</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button type="submit">Send Data</button>
        </form>
      </div>

      {/* Success and Error Messages */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Display Sent Data in a Table */}
    </div>
  );
};

export default DoctorDashboard;