import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DoctorDashboard = () => {
  const location = useLocation();
  const { doctor } = location.state || {}; // Get the logged-in doctor from location state
  const [users, setUsers] = useState([]); // List of users for the dropdown
  const [selectedUser, setSelectedUser] = useState(""); // Selected user from dropdown
  const [sentData, setSentData] = useState([]); // List of sent data for the selected user
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_users");
      if (response.data.users) {
        setUsers(response.data.users); // Set the list of users
      } else {
        setError("Failed to fetch users.");
      }
    } catch (error) {
      setError("Error fetching users.");
      console.error("Error fetching users:", error);
    }
  };

  // Fetch sent data for the selected user
  const fetchSentData = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/get_sent_data", {
        params: {
          doctor_username: doctor.username,
          user_username: selectedUser,
        },
      });
      if (response.data.success) {
        setSentData(response.data.data); // Set the list of sent data
      } else {
        setError("No data found.");
      }
    } catch (error) {
      setError("Error fetching sent data.");
      console.error("Error fetching sent data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a file associated with a message
  const handleDeleteFile = async (id) => {
    try {
      const response = await axios.delete("http://localhost:5000/delete_file", {
        params: { id },
      });
      if (response.data.success) {
        fetchSentData(); // Refresh the sent data list
      } else {
        setError("Failed to delete file.");
      }
    } catch (error) {
      setError("Error deleting file.");
      console.error("Error deleting file:", error);
    }
  };

  // Update a message
  const handleUpdateMessage = async (id, newMessage) => {
    try {
      const response = await axios.put("http://localhost:5000/update_message", null, {
        params: { id, message: newMessage },
      });
      if (response.data.success) {
        fetchSentData(); // Refresh the sent data list
      } else {
        setError("Failed to update message.");
      }
    } catch (error) {
      setError("Error updating message.");
      console.error("Error updating message:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch sent data when the selected user changes
  useEffect(() => {
    fetchSentData();
  }, [selectedUser]);

  if (!doctor) {
    return <div>No doctor data found. Please log in again.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Doctor Dashboard</h1>
      <div>
        <h2>Welcome, {doctor.name}!</h2>
        <p>Username: {doctor.username}</p>
        <p>Specialization: {doctor.specialization}</p>
      </div>

      {/* User Selection Dropdown */}
      <div style={{ marginTop: "40px" }}>
        <label htmlFor="user">Select User:</label>
        <select
          id="user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{ padding: "5px", marginLeft: "10px" }}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {/* Display Sent Data */}
      <div style={{ marginTop: "40px" }}>
        <h3>Sent Data</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : sentData.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>User</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Message</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Timestamp</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>File</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sentData.map((data) => (
                <tr key={data.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{data.user_username}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{data.message}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(data.timestamp).toLocaleString()}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {data.file_path ? (
                      <a href={`http://localhost:5000/${data.file_path}`} download>
                        Download File
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {data.file_path && (
                      <button
                        onClick={() => handleDeleteFile(data.id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Delete File
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const newMessage = prompt("Enter new message:", data.message);
                        if (newMessage) {
                          handleUpdateMessage(data.id, newMessage);
                        }
                      }}
                      style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Update Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;