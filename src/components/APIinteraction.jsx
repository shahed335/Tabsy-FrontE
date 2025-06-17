import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DrugInteraction = () => {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');

  const [interactionResult, setInteractionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkInteraction = async () => {
    if (!drug1 || !drug2) {
      alert("Please enter both drugs.");
      return;
    }

    setLoading(true);
    try {
      const response1 = await fetch(
        `https://api.fda.gov/drug/label.json?search=brand_name:"${drug1}"&limit=1`
      );
      const data1 = await response1.json();


      const response2 = await fetch(
        `https://api.fda.gov/drug/label.json?search=brand_name:"${drug2}"&limit=1`
      );
      const data2 = await response2.json();

      // check if interactions are listed in the labeling of both drugs
      const drug1Label = data1.results && data1.results[0] ? data1.results[0].drug_interactions : [];
      const drug2Label = data2.results && data2.results[0] ? data2.results[0].drug_interactions : [];

      const interactionsFound = drug1Label.some((interaction) => drug2Label.includes(interaction));

      if (interactionsFound) {
        setInteractionResult('Drug Interaction Found');
      } else {
        setInteractionResult('No Interaction Found');
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drug interactions:", error);
      setInteractionResult('Error occurred while fetching interaction data.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Check Drug Interaction</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="mb-3">
            <label htmlFor="drug1" className="form-label">Drug 1</label>
            <input
              type="text"
              className="form-control"
              id="drug1"
              placeholder="Enter Drug 1 (e.g., Amoxicillin)"
              value={drug1}
              onChange={(e) => setDrug1(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-5">
          <div className="mb-3">
            <label htmlFor="drug2" className="form-label">Drug 2</label>
            <input
              type="text"
              className="form-control"
              id="drug2"
              placeholder="Enter Drug 2 (e.g., Paracetamol)"
              value={drug2}
              onChange={(e) => setDrug2(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={checkInteraction}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Interaction'}
        </button>
      </div>

      {interactionResult && (
        <div className="text-center mt-4">
          {interactionResult === 'No Interaction Found' ? (
            <div className="alert alert-success">
              <span className="material-icons">check_circle</span> No Interaction Found
            </div>
          ) : (
            <div className="alert alert-danger">
              <span className="material-icons">error</span> {interactionResult}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrugInteraction;
