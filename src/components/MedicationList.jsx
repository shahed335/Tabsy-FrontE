import React, { useState, useEffect } from 'react';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const res = await fetch('http://localhost:3002/api/order');
        const data = await res.json();
        setMedications(data);

    
        const total = data.reduce((sum, medication) => sum + medication.amount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  const handleRemoveMedication = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/order/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMedications((prevMedications) =>
          prevMedications.filter((med) => med.orderId !== orderId)
        );
        const newTotal = medications
          .filter((med) => med.orderId !== orderId)
          .reduce((sum, medication) => sum + medication.amount, 0);
        setTotalAmount(newTotal);
      } else {
        console.error('Failed to remove medication');
      }
    } catch (error) {
      console.error('Error removing medication:', error);
    }
  };

  return (
    <div className="medication-list">
      <h3>Medication List</h3>
      <ul>
        {medications.map((medication) => (
          <li key={medication.orderId} className="medication-item">
            <span role="img" aria-label="medication">
              💊
            </span>
            {medication.productName} - Price: {medication.amount} JD
            <button
              className="remove-button"
              onClick={() => handleRemoveMedication(medication.orderId)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="total-amount">
        <h4>Total Price: {totalAmount} JD</h4>
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default MedicationList;
