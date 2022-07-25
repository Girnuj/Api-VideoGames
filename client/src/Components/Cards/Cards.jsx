import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

const Cards = ({id, name, imagen, description, released, genres, platforms, rating, imagen2, genre}) => {
  return (
    <div className="contendor">
      <div className="card">
        <img src={imagen} alt="" />
        
        <div className="info">

          <h2 className='title'>
              {name} 
          </h2>

          <Link className="cardLink" to={`/videogames/${id}`}>
              <button className="learn-more" id='button'>
                <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text">Learn More</span>
              </button>
          </Link>

          <p><b>Rating:</b> <span className="">{rating}</span>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
            </svg>
          </p>

          <p><b>Genres:</b> {genres?.map((e) => <span key={e.name}> {e.name}</span> ) }</p>
       
        </div>
      </div>
    </div>
  );
}

export default Cards