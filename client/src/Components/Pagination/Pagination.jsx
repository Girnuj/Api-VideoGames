import React from "react";
import "./Pagination.css";

const Pagination = ({ gamesXPage, AllGames, paginate }) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.floor(AllGames / gamesXPage); i++) {
    pageNumbers.push(i + 1);
  };

  return (
    <>   
      <div className="navigationn">
        <div className="nav">
          <ul className="nav-type" id='ulu'>
            {pageNumbers.map((number) => (
              <li key={number} className="li" id={number}>
                <a onClick={() => paginate(number)} href="#!" id="aa" className="asd" >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
