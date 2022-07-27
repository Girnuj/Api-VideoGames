import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { GetGenres, GetPlatforms, PostNewGame } from "../../Redux-Toolskit/Slices/VideoGames/VideoGames";
import "./NewGame.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name requerid";
  };

  if (!input.description) {
    errors.description = "Complete description";
  };

  if (!input.rating || input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating valid 0 - 5";
  };

  // if (!/[0-9]{2,2}-[0-9]{2,2}-[0-9]{4,4}/.test(input.released)) {
  //     errors.released = "Format error (dd-mm-yyyy)"
  // } else {
  //     errors.released = ""
  // }

  if (!input.released) {
    errors.released = "This field is required";
  } else {
    const { released } = input;
    if (
      parseInt(released.split("-")[0], 10) < 1995 ||
      parseInt(released.split("-")[0], 10) > 2022
    ) {
      errors.released = "The date is invalid";
    }
  };

  // if (!input.genre.length) {
  //     errors.genre = "Enter genres"
  // } else {
  //     if(input.genre.length > 6){
  //         errors.genre = 'The maximum is 6';
  //     }
  // }

  // if (input.platforms.length < 1) {
  //     errors.platforms = "Enter platforms"
  // } else {
  //     if(input.platforms.length>5){
  //         errors.platforms = 'The maximum is 5';
  //     }
  // }
  return errors;
}

export const NewGame = () => {
  const redir = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const dispatch = useDispatch();

  const { genres: allGenres} = useSelector( state => state.VideoGames);
  const { platforms: allPlats } = useSelector( state => state.VideoGames);
  // console.log(allPlats)

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    imagen: "",
    genre: [],
    platforms: [],
  });
  // console.log(input)

  useEffect(() => {
    dispatch(GetGenres());
    dispatch(GetPlatforms())
    .then((response) => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    })
    .catch((e) => console.error(e));
  }, [dispatch, input]);

  const handleCahnge = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenres = (el) => {
    if (el.target.value !== input.genre) {
      setInput({
        ...input,
        genre: [...input.genre, el.target.value],
      });
    } else {
      setInput({
        ...input,
      });
    };
  };

  const setError3 = (el) =>
    setError(
      validate({
        ...input,
        [el.target.genre]: el.target.value,
      })
    );

  const handleSelectPlats = (el) => {
    setInput({
      ...input,
      platforms: [...input.platforms, el.target.value],
    });
    setError(
      validate({
        ...input,
        [el.target.platforms]: el.target.value,
      })
    );
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      genre: input.genre.filter((genr) => genr !== el),
    });
  };

  const handleDeletePlats = (el) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.description ||
      !input.released ||
      input.rating > 5 ||
      input.rating < 0 ||
      !input.platforms ||
      !input.genre
    ) {
      alert("Complete the form correctly!!");
    } else {
      e.preventDefault();

      dispatch(PostNewGame(input));

      alert("Game created successfully");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        imagen: "",
        genre: [],
        platforms: [],
      });
      redir("/home");
    };
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
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

          {/* <form className="login"  onSubmit={(e) => handleSubmit(e)}> */}
          <div className="login">

            <input type="text" placeholder="Name" name="name" value={input.name} onChange={(e) => handleCahnge(e)} /> 
            {error.name && <p className="errorr">{error.name}</p>}
            <input type="textarea" placeholder="Description" name="description" value={input.description} onChange={(e) => handleCahnge(e)}/>
            {error.description && <p className="errorr">{error.description}</p>}
            <input type="date" placeholder="Released" name="released" value={input.released} onChange={(e) => handleCahnge(e)} />
            {error.released && <p className="errorr">{error.released}</p>}
            <input type="number" placeholder="Rating" name="rating" value={input.rating} onChange={(e) => handleCahnge(e)} />
            {error.rating && <p className="errorr">{error.rating}</p>}
            <input type="text" placeholder="Imagen" name="imagen" value={input.imagen} onChange={(e) => handleCahnge(e)} />
            
            <label className="genress"> Genres: </label>
            <select className="asdasd" onChange={(el) => { handleSelectGenres(el); setError3(el) }}>
              <option disabled selected> Select Genres </option>
              {allGenres[0].map((gen, index) => (
                <option key={index} value={gen.name}> {gen.name} </option>
              ))}
            </select>
            {/* {error.genre && <p className="errorr">{error.genre}</p>} */}
            
            <div className="liss">
              {input.genre.map((el) => (
                <>
                  <p className="ppp">{el}</p>
                  <button className="botonX" onClick={() => handleDelete(el)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </>
              ))}
            </div>

            <label className="platt"> Platforms: </label>
            <select className="asdasd" onChange={(el) => handleSelectPlats(el)}>
              <option disabled selected> Select Platforms </option>
              {allPlats[0].map((plat, index) => (
                <option key={index} value={plat.name}> {plat.name} </option>
              ))}
            </select>
            {error.platforms && <p className="errorr">{error.platforms}</p>}

            <div className="liss">
              {input.platforms.map((el) => (
                <>
                  <p className="ppp"> {el} </p>
                  <button className="botonX" onClick={() => handleDeletePlats(el)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </>
              ))}
            </div>
            <button type="submit" className="buttt" onClick={(e) => handleSubmit(e)} > Create Game </button>
          </div>

        {/* </form> */}
        </>
      )}
    </>
  );
};
