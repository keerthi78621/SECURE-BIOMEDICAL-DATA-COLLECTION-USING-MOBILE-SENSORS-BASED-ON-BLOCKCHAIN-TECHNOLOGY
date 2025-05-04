import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Get the logged-in user from location state
  const [messages, setMessages] = useState([]); // List of messages
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch messages for the user
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_data", {
        params: { username: user.username }, // Fetch messages for the logged-in user
      });
      if (response.data.success) {
        setMessages(response.data.data); // Set the list of messages
      } else {
        setError("No messages found.");
      }
      setLoading(false);
    } catch (error) {
      setError("Error fetching messages.");
      setLoading(false);
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  // Handle file download
  const handleDownload = async (filePath, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/download_file`, {
        params: { file_path: filePath },
        responseType: "blob", // Ensure the response is treated as a file
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file");
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  if (!user) {
    return <div>No user data found. Please log in again.</div>;
  }

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div
        style={{
          width: "80%",
          maxWidth: "900px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            textAlign: "center",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <h1>User Dashboard</h1>
        </div>

        <div style={{ padding: "20px" }}>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <div style={{ marginTop: "40px" }}>
            <h3>Messages</h3>
            {messages.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              <table
                style={{
                  width: "100%",
                  marginTop: "20px",
                  borderCollapse: "collapse",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                      }}
                    >
                      Doctor
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                      }}
                    >
                      Message
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                      }}
                    >
                      Timestamp
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                      }}
                    >
                      File
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {msg.doctor_username}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {msg.message}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {new Date(msg.timestamp).toLocaleString()}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {msg.file_path ? (
                          <button
                            onClick={() => handleDownload(msg.file_path, `file_${index}.dat`)}
                            style={{
                              backgroundColor: "#007bff",
                              color: "#fff",
                              border: "none",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Download File
                          </button>
                        ) : (
                          "No file"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
