import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Background from "../Background/Background";
import Cards from "../Cards/Cards";
import { Loader } from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import Pagination from "../Pagination/Pagination";
import { filterByGenres, filterCreated, getGames, ordenByName, ordenByRating } from "../Redux/Actions";
import Searchbar from "../Searchbar/Searchbar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const AllGames = useSelector((state) => state.VideoGames);

  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [gamesXPage] = useState(15);

  const [orden, setOrden] = useState("");

  const IndexOfLast = pageNumber * gamesXPage;
  const IndexOfFirst = IndexOfLast - gamesXPage;
  const currentPages = AllGames.slice(IndexOfFirst, IndexOfLast);
  console.log(currentPages)

  const paginate = (pageNumber) => setPageNumber(pageNumber);

  useEffect(() => {
    dispatch(getGames())
    .then((response) => setLoading(false));
  }, [dispatch]);

  function handleFilterGenres(e){
    e.preventDefault();
    dispatch(filterByGenres(e.target.value)) 
    setPageNumber(1)
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
    setPageNumber(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleOrdenByName(e){
    e.preventDefault();
    dispatch(ordenByName(e.target.value))
    setPageNumber(1)
    setOrden(`Ordenado ${e.target.value}`)

  };

  function handleRating(e){
    e.preventDefault();
    dispatch(ordenByRating(e.target.value))
    setPageNumber(1)
    setOrden(`Ordenado ${e.target.value}`)
}

  return (
    <>
      {loading ? (
        <div className="Loadingg">
          <Loader />
        </div>
      ) : (
        <>
          {/* <Background /> */}
          <div>
            <Navbar />
          </div>
          <div className="pagination">
            <Pagination
              gamesXPage={gamesXPage}
              AllGames={AllGames.length}
              paginate={paginate}
              
            />
          </div>
        
        <div className="searchbar">
         <Searchbar />
        </div>


    <div className="ALL">
          
      <select onChange={e => handleFilterGenres(e)} className='select1'>
        <option disabled selected>Genres</option> 
        <option value="all">All Genres</option>
        <option value='Action'>Action</option>
        <option value='Indie'>Indie</option>
        <option value='Adventure'>Adventure</option>
        <option value='RPG'>RPG</option>
        <option value='Strategy'>Strategy</option>
        <option value='Shooter'>Shooter</option>
        <option value='Casual'>Casual</option>
        <option value='Simulation'>Simulation</option>
        <option value='Puzzle'>Puzzle</option>
        <option value='Arcade'>Arcade</option>
        <option value='Platformer'>Platformer</option>
        <option value='Racing'>Racing</option>
        <option value='Massively Multiplayer'>Massively Multiplayer</option>
        <option value='Sports'>Sports</option>
        <option value='Fighting'>Fighting</option>
        <option value='Family'>Family</option>
        <option value='Board Games'>Board Games</option>
        <option value='Educational'>Educational</option>
        <option value='Card'>Card</option>
      
      </select>

      <select onChange={e => handleFilterCreated(e)} className='select2'>
        <option disabled selected>Games</option> 
        <option value="all">All Games</option>
        <option value="created">Created</option>
        <option value="api">Api</option>
      </select>

      <select onChange={e => handleOrdenByName(e)} className='select3'>
        <option disabled selected>Name</option> 
        <option value='asc'>A - Z</option>
        <option value='desc'>Z - A</option>
      </select>

      <select onChange={(e) => handleRating(e)} className='select4'>
        <option disabled selected>Rating</option>
        <option value='desce'>Upward</option>
        <option value='asce'>Falling</option>
      </select>
    
    </div>

          <div className="card_container">
            {currentPages.length ? currentPages?.map((el) => {
              return (
                <Cards
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  imagen={el.imagen}
                  genres={el.genres ? el.genres : el.genre.map(e => e.name)}
                  rating={el.rating}
                  imagen2={el.imagen2 ? el.imagen2 : el.imagen}
                  description={el.description}
                  released={el.released}
                  platforms={el.platforms ? el.platforms : el.platforms.map(e => e.name)}
                />
              );
            }) : <div className="diverror"><p className="Error"><b><i>Not a Videogame was found Sorry</i></b></p></div>}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
