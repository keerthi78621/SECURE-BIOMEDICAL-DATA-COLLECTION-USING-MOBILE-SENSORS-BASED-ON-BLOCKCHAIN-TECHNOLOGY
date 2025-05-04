import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [specialistNumber, setSpecialistNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoctor = {
      name,
      address,
      specialistNumber,
    };

    // Save to localStorage
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctors.push(newDoctor);
    localStorage.setItem("doctors", JSON.stringify(doctors));

    // Reset form and navigate to view page
    setName("");
    setAddress("");
    setSpecialistNumber("");
    navigate("/viewdoctor");
  };

  return (
    <div style={styles.formContainer}>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Doctor Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter doctor's name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Specialist Number:</label>
          <input
            type="text"
            value={specialistNumber}
            onChange={(e) => setSpecialistNumber(e.target.value)}
            placeholder="Enter specialist number"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            Add Doctor
          </button>
          <button
            type="button"
            onClick={() => navigate("/viewdoctor")}
            style={{ ...styles.button, backgroundColor: "#dc3545" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
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
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
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
};

export default DoctorForm;