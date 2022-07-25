import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetGamesByName } from '../../Redux-Toolskit/Slices/VideoGames/VideoGames';
import './Searchbar.css'; 

const Searchbar = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleImputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(GetGamesByName(name));
    setName("");
  };

  return (
    <div className="wrap">
      <div className="search">
        <input type="text" className="searchTerm" placeholder="What Game are you looking for?" onChange={(e) => handleImputChange(e)}/>
        <button type="submit" className="searchButton" onClick={(e) => handleSubmit(e)}> Search </button>
      </div>
    </div>
  );
}

export default Searchbar