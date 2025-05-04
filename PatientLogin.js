import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const AppointmentScheduler = () => {
  const [appointment, setAppointment] = useState(null);
  const [step, setStep] = useState(1); // 1: Booking, 2: Confirmation, 3: Reminder, 4: Follow-Up
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const specialists = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedist",
    "Neurologist",
  ];

  const navigate = useNavigate(); // For navigation

  // Prevent pasting into date and time fields
  const handlePreventPaste = (e) => {
    e.preventDefault();
  };

  const handleBookAppointment = () => {
    if (!userName || !email || !phone || !specialist || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const newAppointment = {
      userName: userName,
      email: email,
      phone: phone,
      specialist: specialist,
      date: date,
      time: time,
    };

    // Save to localStorage
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    setAppointment(newAppointment);
    setStep(2); // Move to Confirmation step
  };

  const handleSendReminder = () => {
    setStep(3); // Move to Reminder step
  };

  const handleFollowUp = () => {
    setStep(4); // Move to Follow-Up step
  };

  const handleViewAppointments = () => {
    navigate("/patient/dashboard"); // Navigate to the View page
  };

  return (
    <div style={styles.container}>
     

      {step === 1 && (
        <div style={styles.card}>
          <h2>Book Your Appointment</h2>
          <div style={styles.formGroup}>
            <label>Your Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Specialist:</label>
            <select
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              style={styles.input}
            >
              <option value="">Select a specialist</option>
              {specialists.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Appointment Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onPaste={handlePreventPaste}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Appointment Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onPaste={handlePreventPaste}
              style={styles.input}
            />
          </div>
          <button onClick={handleBookAppointment} style={styles.button}>
            Book Now
          </button>
        </div>
      )}

      {step === 2 && appointment && (
        <div style={styles.card}>
          <h2>Confirmation Card</h2>
          <p>
            <strong>{appointment.userName}</strong>, your appointment with a{" "}
            <strong>{appointment.specialist}</strong> is confirmed for{" "}
            <strong>{appointment.date}</strong> at{" "}
            <strong>{appointment.time}</strong>.
          </p>
          <p>
            A confirmation email will be sent to <strong>{appointment.email}</strong>.
          </p>
          <button onClick={handleSendReminder} style={styles.button}>
            Send Reminder
          </button>
          <button
            onClick={handleViewAppointments}
            style={{ ...styles.button, backgroundColor: "#28a745", marginLeft: "10px" }}
          >
            View Appointments
          </button>
        </div>
      )}

      {step === 3 && appointment && (
        <div style={styles.card}>
          <h2>Reminder Card</h2>
          <p>
            Reminder: <strong>{appointment.userName}</strong>, your appointment with a{" "}
            <strong>{appointment.specialist}</strong> is on{" "}
            <strong>{appointment.date}</strong> at{" "}
            <strong>{appointment.time}</strong>.
          </p>
          <button onClick={handleFollowUp} style={styles.button}>
            Send Follow-Up
          </button>
        </div>
      )}

      {step === 4 && appointment && (
        <div style={styles.card}>
          <h2>Follow-Up Card</h2>
          <p>
            Thank you, <strong>{appointment.userName}</strong>, for visiting our{" "}
            <strong>{appointment.specialist}</strong>. We hope your visit was
            helpful. Please let us know if you need further assistance.
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
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

export default AppointmentScheduler;