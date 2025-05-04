import React, { useState, useEffect } from 'react';

const Table = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Retrieve payment data from localStorage, or initialize as an empty array if no data exists
    const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
    setPayments(storedPayments);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Payment Records</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Card Holder</th>
            <th>Expiry Date</th>
            <th>CVV</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="5">No payment records found.</td>
            </tr>
          ) : (
            payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.cardNumber}</td>
                <td>{payment.holderName}</td>
                <td>{payment.expiry}</td>
                <td>{payment.cvv}</td>
                <td>{payment.paid}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
