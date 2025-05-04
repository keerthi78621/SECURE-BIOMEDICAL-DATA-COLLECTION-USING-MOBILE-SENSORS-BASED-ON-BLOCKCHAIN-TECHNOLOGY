import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PatientLogin from './components/PatientLogin';
import PatientRegister from './components/PatientRegister';
import PatientDashboard from './components/PatientDashboard';
import RegisterDoctor from './components/RegisterDoctor';
import DoctorDashboard from './components/DoctorDashboard';
import Doctors from './components/Doctors';
import Reports from './components/Reports';
import SendPayment from './components/SendPayment';
import NotFound from './components/NotFound';
import LoginDoctor from './components/LoginDoctor';
import UserDashboard from './components/UserDashboard';
import Pay from './components/Pay';
import Card from './components/Card';
import Table from './components/Table';
import HealthChart from './components/HealthChart';
import DoctorTable from './components/DoctorTable';
import DoctorForm from './components/DoctorForm';
import HealthForm from './components/HealthForm';
import './App.css'; // Custom styles
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
function App() {
  // For handling captured image state
  const [capturedImage, setCapturedImage] = useState(null);

  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with Logo Link and Navigation Buttons */}
        <nav
  className="navbar navbar-expand-lg navbar-dark bg-dark"
  style={{ backgroundColor: "#000" }} // Black background
>
  <div className="container-fluid">
    {/* Logo wrapped in a Link component */}
    <Link to="/" className="navbar-brand">
      <img
        src="https://t3.ftcdn.net/jpg/03/24/58/44/240_F_324584485_qtdluDzmBNkJvmntEPlNeG1htwPktgCa.jpg"
        alt="Logo"
        style={{ width: "40px", height: "40px" }}
      />
      <span className="ms-2" style={{ color: "#fff" }}>
        Secure Cloud Healthcare Management System
      </span>
    </Link>

    {/* Navbar Toggler Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar Links for Admin, Doctor, Patient */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        {/* Align to the right */}
        <li className="nav-item">
          <Link
            to="/admin"
            className="nav-link"
            style={{ color: "#fff", transition: "color 0.3s ease" }} // White text with transition
            onMouseEnter={(e) => (e.target.style.color = "#ffcc00")} // Yellow on hover
            onMouseLeave={(e) => (e.target.style.color = "#fff")} // White on mouse leave
          >
            Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/login_doctor"
            className="nav-link"
            style={{ color: "#fff", transition: "color 0.3s ease" }} // White text with transition
            onMouseEnter={(e) => (e.target.style.color = "#ffcc00")} // Yellow on hover
            onMouseLeave={(e) => (e.target.style.color = "#fff")} // White on mouse leave
          >
            Doctor
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/register"
            className="nav-link"
            style={{ color: "#fff", transition: "color 0.3s ease" }} // White text with transition
            onMouseEnter={(e) => (e.target.style.color = "#ffcc00")} // Yellow on hover
            onMouseLeave={(e) => (e.target.style.color = "#fff")} // White on mouse leave
          >
            Patient
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

        {/* Routes */}
        <Routes>
          {/* Face Recognition App Routes */}
          
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          
          <Route
            path="/register"
            element={<Register capturedImage={capturedImage} onImageCapture={handleImageCapture} />}
          />
          <Route
            path="/login"
            element={<Login capturedImage={capturedImage} onImageCapture={handleImageCapture} />}
          />
          {/* Healthcare Management System Routes */}
          <Route path="/register_doctor" element={<RegisterDoctor />} />
          <Route path="/login_doctor" element={<LoginDoctor />} />
          <Route path="/doctor_dashboard" element={<DoctorDashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/patient" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/sendPayment" element={<SendPayment />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/card" element={<Card />} />
          <Route path="/table" element={<Table />} />
          <Route path="/viewdoctor" element={<DoctorTable />} />
          <Route path="/adddoctor" element={<DoctorForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chart" element={<HealthChart />} />
          <Route path="/dr" element={<HealthForm />} />
          {/* For invalid routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
