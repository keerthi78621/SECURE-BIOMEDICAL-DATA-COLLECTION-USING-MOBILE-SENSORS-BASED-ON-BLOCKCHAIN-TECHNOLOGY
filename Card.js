import React, { useState } from 'react';

const Card = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paid, setPaid] = useState('');

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleHolderNameChange = (e) => setHolderName(e.target.value);
  const handleExpiryChange = (e) => setExpiry(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);
  const handlePaidChange = (e) => setPaid(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a payment object
    const newPayment = {
      cardNumber,
      holderName,
      expiry,
      cvv,
      paid,
    };

    // Retrieve existing payments from localStorage or initialize an empty array
    const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];

    // Add the new payment to the array
    storedPayments.push(newPayment);

    // Save the updated array back to localStorage as a JSON string
    localStorage.setItem('payments', JSON.stringify(storedPayments));

    // Clear the form fields
    setCardNumber('');
    setHolderName('');
    setExpiry('');
    setCvv('');
    setPaid('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Submit Payment Details</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
            placeholder="XXXX XXXX XXXX XXXX"
            style={{ marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Card Holder Name:
          <input
            type="text"
            value={holderName}
            onChange={handleHolderNameChange}
            required
            placeholder="Name on card"
            style={{ marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Expiry Date:
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            required
            placeholder="MM/YY"
            style={{ marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="password"
            value={cvv}
            onChange={handleCvvChange}
            required
            placeholder="***"
            style={{ marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Payment Status:
          <input
            type="text"
            value={paid}
            onChange={handlePaidChange}
            required
            placeholder="Paid / Not Paid"
            style={{ marginBottom: '10px' }}
          />
        </label>
        <br />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Card;
