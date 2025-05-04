import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorTable = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState(
    JSON.parse(localStorage.getItem("doctors")) || []
  );

  const handleDeleteDoctor = (doctorToDelete) => {
    const updatedDoctors = doctors.filter(
      (doctor) => doctor !== doctorToDelete
    );
    setDoctors(updatedDoctors);
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Doctor Management</h1>
      <button
        onClick={() => navigate("/adddoctor")}
        style={{ ...styles.button, marginBottom: "20px" }}
      >
        Add Doctor
      </button>
      {doctors.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Address</th>
                <th style={styles.tableHeader}>Specialist Number</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr
                  key={index}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td style={styles.tableCell}>{doctor.name}</td>
                  <td style={styles.tableCell}>{doctor.address}</td>
                  <td style={styles.tableCell}>{doctor.specialistNumber}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => navigate(`/adddoctor`)} // Navigate to edit form (optional)
                      style={{ ...styles.button, backgroundColor: "#28a745" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor)}
                      style={{ ...styles.button, backgroundColor: "#dc3545" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.noDataMessage}>No doctors found.</p>
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
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  tableContainer: {
    overflowX: "auto",
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

export default DoctorTable;