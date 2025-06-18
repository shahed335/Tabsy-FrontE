import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style5.css'; 

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
    <div className="container text-center">
      <h1 className="text-primary mb-4">Medication List</h1> 
      <div className="row justify-content-center">
        
        <div className="col-12 col-md-4">
          <ul className="list-group">
            {medications.map((medication) => (
              <li key={medication.orderId} className="list-group-item d-flex justify-content-center">
                <div className="item-left d-flex align-items-center">
                  <span role="img" aria-label="medication">
                    💊
                  </span>
                  {medication.productName}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
       
        <div className="col-12 col-md-4">
          <ul className="list-group">
            {medications.map((medication) => (
              <li key={medication.orderId} className="list-group-item d-flex justify-content-center">
                Price: {medication.amount} JD
              </li>
            ))}
          </ul>
        </div>
        
        
        <div className="col-12 col-md-4">
          <ul className="list-group">
            {medications.map((medication) => (
              <li key={medication.orderId} className="list-group-item d-flex justify-content-center">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveMedication(medication.orderId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="total-amount mt-4">
        <h4>Total Price: {totalAmount} JD</h4>
      </div>
      <button className="btn btn-primary mt-3">Checkout</button>
    </div>
  );
};

export default MedicationList;
