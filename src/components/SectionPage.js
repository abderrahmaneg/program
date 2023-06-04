import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SectionPage.css';
import back_img from '../images/back.svg';
import sections_img from '../images/sections.svg';
import add_img from '../images/add.svg';

const SectionPage = () => {
  const { divisionId } = useParams();
  const [sections, setSections] = useState([]);
  const [divisionName, setDivisionName] = useState('');

  useEffect(() => {
    // Fetch division details and sections from the database
    const fetchData = async () => {
      try {
        const divisionResponse = await fetch(`/api/divisions/${divisionId}`);
        const divisionData = await divisionResponse.json();
        setDivisionName(divisionData.name);

        const sectionsResponse = await fetch(`/api/divisions/${divisionId}/sections`);
        const sectionsData = await sectionsResponse.json();
        setSections(sectionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [divisionId]);

  return (
    <div className="section-page-container">
      <div className="section-header">
        <Link to="/program-management" className="back-button">
        <img src={back_img} alt="Back" />
        </Link>
        <h2>{divisionName}</h2>
        <Link to={`/division/${divisionId}/add-section`} className="add-section-button">
          Add New Article
          <img src={add_img} alt="Add" />
        </Link>
      </div>

      <ul className="section-list">
        {sections.map((section) => (
          <li key={section.id}>
            <Link to={`/division/${divisionId}/sections/${section.id}`} className="section-link">
            <img src={sections_img} alt="Sections" />
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionPage;
