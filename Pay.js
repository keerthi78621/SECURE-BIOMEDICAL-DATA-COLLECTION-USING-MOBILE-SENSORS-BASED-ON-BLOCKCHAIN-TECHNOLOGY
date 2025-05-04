import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Table = () => {
  // Load payment data from localStorage on component mount
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments = localStorage.getItem('payments');
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    }
  }, []);

  // Inline styles
  const tableStyles = {
    width: '100%',
    textAlign: 'center',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif',
  };

  const thStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 15px',
    border: '1px solid #ddd',
    textTransform: 'uppercase',
  };

  const tdStyles = {
    padding: '10px',
    border: '1px solid #ddd',
    color: '#333',
  };

  const buttonStyles = {
    padding: '8px 16px',
    backgroundColor: '#28a745', // Green button color
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyles = {
    backgroundColor: '#218838', // Darker green on hover
  };

  const rowEvenStyles = {
    backgroundColor: '#f9f9f9', // Light gray for even rows
  };

  const rowOddStyles = {
    backgroundColor: '#fff', // White for odd rows
  };

  const noRecordsStyles = {
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
    color: '#888',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Payment Records</h2>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>User ID</th>
            <th style={thStyles}>Payment</th>
            <th style={thStyles}>Message</th>
            <th style={thStyles}>Pay</th>
            <th style={thStyles}>View Payment</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="6" style={noRecordsStyles}>
                No payment records found.
              </td>
            </tr>
          ) : (
            payments.map((payment, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? rowEvenStyles : rowOddStyles} // Alternating row colors
              >
                <td style={tdStyles}>{payment.name}</td>
                <td style={tdStyles}>{payment.userId}</td>
                <td style={tdStyles}>{payment.payment}</td>
                <td style={tdStyles}>{payment.message}</td>
                <td style={tdStyles}>
                  <div style={{ marginBottom: '10px' }}>
                    <Link to="/card" style={{ textDecoration: 'none' }}>
                      <button
                        style={buttonStyles}
                        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </td>
                <td style={tdStyles}>
                  <div style={{ marginBottom: '10px' }}>
                    <Link to="/table" style={{ textDecoration: 'none' }}>
                      <button
                        style={buttonStyles}
                        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
