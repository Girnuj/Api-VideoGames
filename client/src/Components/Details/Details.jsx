import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { getGameId } from "../Redux/Actions";
import "./Details.css";

const Details = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const detail = useSelector((state) => state.detail[0]);

  useEffect(() => {
    dispatch(getGameId(id))
      .then((response) => {
        setTimeout(() => {
          setLoading(false);

        }, 3000)
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);
  // console.log(id);

  return (
    <>
      {loading ? (
        <>
          <Loader />{" "}
        </>
      ) : (
        <>
          <div className="movie_card" id="bright">
            <div className="info_section">
              <div className="movie_header">
                <img className="locandina" src={detail.imagen} alt="asd" />
                <h1>{detail.name}</h1>
                <h4>Released: {detail.released}</h4>
                <span className="minutes">
                  {detail.rating}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                  </svg>
                </span>

                <p className="type">
                  <b>Genres:</b>
                  {detail.genres.map((e) => (
                    <span key={e.name}> {e.name}</span>
                  ))}
                </p>
                <p className="type">
                  <b>Plataforms: </b>
                  {detail.platforms?.map((e) => (
                    <span key={e.name}> {e.name}</span>
                  ))}
                </p>
              </div>
              <div className="movie_desc">
                <p className="text">{detail.description}</p>
              </div>

              <div className="movie_social">
                <ul>
                  <Link to={`/home`}>
                    <li>
                      <i>Back To Home</i>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <img
              className="blur_back bright_back"
              src={detail.imagen2 ? detail.imagen2 : detail.imagen}
              alt="1234"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Details;
