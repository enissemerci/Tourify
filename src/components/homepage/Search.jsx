import React, { useState, useEffect } from 'react';
import './Search.css';
import SearchIcon from '@mui/icons-material/Search'; // Material UI Search icon

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // API araması için örnek fonksiyon
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await response.json();
      setResults(data); // Arama sonuçlarını güncelle
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // 3 harf yazıldığında arama başlat
  useEffect(() => {
    if (query.length >= 3) {
      fetchSearchResults(query);
    } else {
      setResults([]); // Arama yapılmazsa sonuçları temizle
    }
  }, [query]);

  return (
    <div className="search-container">
      <div className="search-box">
        <SearchIcon className="search-icon" /> {/* Material UI Search icon */}
        <input
          type="text"
          placeholder="Search for a city or place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="search-results">
        {results.length > 0 && (
          <ul>
            {results.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};