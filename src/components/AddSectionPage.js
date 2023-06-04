import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './AddSectionPage.css';
import back_img from '../images/back.svg';

const AddSectionPage = () => {
  const { divisionId } = useParams();
  const navigate = useNavigate();

  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');

  const handleSectionNameChange = (event) => {
    setSectionName(event.target.value);
  };

  const handleSectionDescriptionChange = (event) => {
    setSectionDescription(event.target.value);
  };

  const handleCancel = () => {
    navigate(`/division/${divisionId}/sections`);
  };

  const handleValidate = async () => {
    // Save section data to the database
    try {
      const response = await fetch(`/api/divisions/${divisionId}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sectionName,
          description: sectionDescription,
        }),
      });

      if (response.ok) {
        navigate(`/division/${divisionId}/sections`);
      } else {
        console.error('Error saving section data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving section data:', error);
    }
  };

  return (
    <div className="add-section-page-container">
      <div className="add-section-header">
        <Link to={`/division/${divisionId}/sections`} className="back-button">
          <img src={back_img} alt="Back" />
        </Link>
        <h2>{/* Division Name */}</h2>
        <h3>Add New Section</h3>
      </div>

      <div className="section-details">
        <label htmlFor="section-name">Section Name:</label>
        <input
          type="text"
          id="section-name"
          value={sectionName}
          onChange={handleSectionNameChange}
        />

        <label htmlFor="section-description">Section Description:</label>
        <textarea
          id="section-description"
          value={sectionDescription}
          onChange={handleSectionDescriptionChange}
        ></textarea>
      </div>

      <div className="section-buttons">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="validate-button" onClick={handleValidate}>
          Validate
        </button>
      </div>
    </div>
  );
};

export default AddSectionPage;
