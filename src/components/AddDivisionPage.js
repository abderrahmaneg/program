import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDivisionPage.css';
import back_img from '../images/back.svg';

const AddDivisionPage = () => {
  const navigate = useNavigate();
  const [divisionName, setDivisionName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [description, setDescription] = useState('');

  const handleDivisionNameChange = (e) => {
    setDivisionName(e.target.value);
  };

  const handleSectionNameChange = (e) => {
    setSectionName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API to save the division and sections
      const response = await fetch('/api/divisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          divisionName,
          sectionName,
          description,
        }),
      });

      if (response.ok) {
        // Data saved successfully
        navigate('/program-management');
      } else {
        // Handle error case
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="add-division-page-container">
      <div className="add-division-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={back_img} alt="Back" />
        </button>
        <h2>Add New Division</h2>
      </div>

      <div className="division-sections">
        <h3>Division Name</h3>
        <input
          type="text"
          value={divisionName}
          onChange={handleDivisionNameChange}
        />

        <h3>Section Name</h3>
        <input
          type="text"
          value={sectionName}
          onChange={handleSectionNameChange}
        />

        <h3>Description</h3>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      <div className="division-buttons">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="validate-button" onClick={handleSubmit}>
          Validate
        </button>
      </div>
    </div>
  );
};

export default AddDivisionPage;
