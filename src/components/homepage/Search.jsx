import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import SearchIcon from '@mui/icons-material/Search'; // Material UI Search icon

export const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim().length >= 3) {
      navigate('/cities', { state: { city: query } }); // Şehri Cities sayfasına yönlendir
    }
  };

  return (
    <div className="search-container">
      <h1>Tourify ile Dünyayı Keşfedin!</h1>
      <div className="search-box">
        <SearchIcon 
          className="search-icon" 
          onClick={handleSearch} // İkona tıklandığında arama
          style={{ cursor: 'pointer' }} // Tıklanabilir işaretçi
        />
        <input
          type="text"
          placeholder="Search for a city or place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Enter tuşuna basıldığında arama
        />
      </div>
    </div>
  );
};