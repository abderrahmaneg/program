import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProgramManagementPage.css' ;
import add_img from '../images/add.svg';
import sections_img from '../images/sections.svg';
//import ads_img from '../images/ads.svg';

const ProgramManagementPage = () => {
  const [divisions, setDivisions] = useState([]);
  
  useEffect(() => {
    
    const fetchDivisions = async () => {
    try {
     const response = await fetch('/api/divisions');
       const data = await response.json();
      setDivisions(data);
     } catch (error) {
        console.error('Error fetching divisions:', error);
     }
    };

    fetchDivisions();
  }, []);

  return (
    <div className='container'>
      <div className='add-button'>
        <Link to="/add-division">
          <button>Add New chapter<img src={add_img} /></button>
        </Link>
        <Link to="/add-ad">
          <button className='ads_btn'>Add Ad </button>
        </Link>
      </div>

      <ul>
        {divisions.map((division) => (
          <li key={division.id}>
            <span>{division.title}</span>
            <Link to={`/division/${division.id}/sections`}>
              <button><img src={sections_img} />View Articles</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramManagementPage;
