import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="html-container">
        <div className="html-section">
          <div className="html-project">
            <div className="navigation">
              <nav className='nav'>
                <ul className="nav-type" id='ul'>
                  
                  <li className='li'><NavLink to='/' className='active' id='a'>Landipage</NavLink></li>
                  <li className='li'><NavLink to='/home' className='active1' id='a'>Home</NavLink></li>
                  <li className='li'><NavLink to='/videogame' className='active2' id='a'>New Game</NavLink></li>
                  
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Navbar