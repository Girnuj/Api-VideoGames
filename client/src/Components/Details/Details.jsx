import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { GetGameId } from "../../Redux-Toolskit/Slices/VideoGames/VideoGames";
import "./Details.css";

const Details = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const { detail: detailOne} = useSelector(state => state.VideoGames);

  useEffect(() => {
    dispatch(GetGameId(id))
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((e) => console.error(e));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <>
          <Loader />{" "}
        </>
      ) : (
        <>
          <Link to="/home">
            <button data-text="Awesome" className="button">
              <span className="actual-text">&nbsp;Home&nbsp;</span>
              <span className="hover-text" aria-hidden="true">
                &nbsp;Home&nbsp;
              </span>
            </button>
          </Link>

          <div className="movie_card" id="bright">
            <div className="info_section">
              <div className="movie_header">
                <img className="locandina" src={detailOne[0].imagen} alt="asd" />
                <h1>{detailOne[0].name}</h1>
                <h4>Released: {detailOne[0].released}</h4>
                <span className="minutes">
                  {detailOne[0].rating}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                  </svg>
                </span>

                <p className="type">
                  <b>Genres:</b>
                  {detailOne[0].genres.map((e) => (
                    <span className="genresspan" key={e.name}> {e.name}</span>
                  ))}
                </p>

                <p className="type">
                  <b>Plataforms: </b>
                  {detailOne[0].platforms?.map((e) => (
                    <span className="plataformasspan" key={e.name}> {e.name}</span>
                  ))}
                </p>

              </div>

              <div className="movie_desc">
                <p className="text">{detailOne[0].description}</p>
              </div>
              
            </div>
            <img
              className="blur_back bright_back"
              src={detailOne[0].imagen2 ? detailOne[0].imagen2 : detailOne[0].imagen}
              alt="1234"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Details;
