import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  // Inline functions to save and retrieve data from localStorage
  const savePaymentData = (newPayment) => {
    const storedPayments = localStorage.getItem('payments');
    const payments = storedPayments ? JSON.parse(storedPayments) : [];
    payments.push(newPayment);
    localStorage.setItem('payments', JSON.stringify(payments));
  };

  const getPaymentData = () => {
    const storedPayments = localStorage.getItem('payments');
    return storedPayments ? JSON.parse(storedPayments) : [];
  };

  // Inline PayTable.js - Displays payments in a table
  const PayTable = ({ payments }) => {
    return (
      <div className="mt-4" style={styles.cardContainer}>
        <h2 style={styles.cardTitle}>Payment Records</h2>
        <div className="card" style={styles.card}>
          <div className="card-body" style={styles.cardBody}>
            <table className="table table-bordered" style={styles.table}>
              <thead className="thead-dark">
                <tr>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>User ID</th>
                  <th style={styles.tableHeader}>Payment</th>
                  <th style={styles.tableHeader}>Message</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={styles.noDataCell}>No payments found.</td>
                  </tr>
                ) : (
                  payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.name}</td>
                      <td>{payment.userId}</td>
                      <td>{payment.payment}</td>
                      <td>{payment.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Initialize state with data from localStorage (or an empty array if no data is stored)
  const [payments, setPayments] = useState(() => {
    const storedPayments = getPaymentData();
    return storedPayments;
  });

  // Handle form submission
  const handleFormSubmit = (formData) => {
    savePaymentData(formData);
    setPayments((prevPayments) => [...prevPayments, formData]);
  };

  // Inline PaymentForm.js - Form component to collect user input
  const PaymentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
      name: '',
      userId: '',
      payment: '',
      message: '',
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      setFormData({
        name: '',
        userId: '',
        payment: '',
        message: '',
      });
    };

    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="card" style={styles.card}>
          <div className="card-body" style={styles.cardBody}>
            <h5 className="card-title" style={styles.cardFormTitle}>Submit Payment</h5>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.inputField}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userId" className="form-label">User ID: </label>
              <input
                type="text"
                name="userId"
                id="userId"
                className="form-control"
                value={formData.userId}
                onChange={handleChange}
                required
                style={styles.inputField}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="payment" className="form-label">Payment: </label>
              <input
                type="text"
                name="payment"
                id="payment"
                className="form-control"
                value={formData.payment}
                onChange={handleChange}
                required
                style={styles.inputField}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message: </label>
              <textarea
                name="message"
                id="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
                required
                style={styles.inputField}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={styles.submitButton}>Submit Payment</button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center" style={styles.header}>Payment System</h1>
      <PaymentForm onSubmit={handleFormSubmit} />
      <PayTable payments={payments} />
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '40px',
  },
  cardContainer: {
    marginBottom: '20px',
  },
  card: {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  cardBody: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#007bff',
  },
  cardFormTitle: {
    fontSize: '1.2rem',
    color: '#007bff',
    marginBottom: '15px',
  },
  table: {
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  noDataCell: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
  inputField: {
    borderRadius: '5px',
    padding: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    marginTop: '10px',
  },
};

export default App;
