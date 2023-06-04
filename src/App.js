import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import ProgramManagementPage from './components/ProgramManagement';
import SectionPage from './components/SectionPage';
import AddDivisionPage from './components/AddSectionPage';

function App() {
  return (
     <div  >
<BrowserRouter>

      <Routes>
       
        <Route path='/' element={<ProgramManagementPage />} ></Route>
        <Route path="/division/:divisionId/sections" element={<SectionPage />} ></Route>
        <Route path="/division/AddDivisionPage" element={<AddDivisionPage />} ></Route>

      </Routes>
</BrowserRouter>
    </div>



   
  );
}

export default App;
