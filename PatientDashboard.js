import React from "react";

const View = () => {
  // Fetch appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Appointments</h1>
      {appointments.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Phone</th>
                <th style={styles.tableHeader}>Specialist</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  key={index}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td style={styles.tableCell}>{appointment.userName}</td>
                  <td style={styles.tableCell}>{appointment.email}</td>
                  <td style={styles.tableCell}>{appointment.phone}</td>
                  <td style={styles.tableCell}>{appointment.specialist}</td>
                  <td style={styles.tableCell}>{appointment.date}</td>
                  <td style={styles.tableCell}>{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.noDataMessage}>No appointments found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  tableContainer: {
    overflowX: "auto", // Makes the table scrollable on small screens
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "0 auto",
  },
  tableHeaderRow: {
    backgroundColor: "#007BFF",
  },
  tableHeader: {
    padding: "12px 15px",
    color: "#fff",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  tableRow: {
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
  tableCell: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  noDataMessage: {
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "20px",
  },
};

export default View;