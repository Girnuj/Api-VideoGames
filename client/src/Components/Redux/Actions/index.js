import axios from "axios";
export const GET_GAMES = 'getGames';
export const SET_LOADING = 'setLoading';
export const GET_GAMES_BY_NAME = 'getGamesByName';
export const GET_GAME_ID = 'getGameId';
export const GET_GENRES = 'getGenres';
export const FILTER_BY_GENRES = 'filterByGenres';
export const FILTER_CREATED = 'filterCreated';
export const ORDEN_BY_NAME = 'ordenByName';
export const ORDEN_BY_RATING = 'ordenByRating';
export const POST_NEW_GAME = 'postNewGame';
export const GET_PLATFORMS = 'getPlatforms'

export function getGames(){
    return async function (dispatch){
        try {
            let response = await axios.get('http://localhost:3001/videogames');
    
            return dispatch({
                type: GET_GAMES,
                payload: response.data
            })
        } catch (error) {
            console.log('error en getGames, Redux/Action',error);
        }
    }
  }

// export function getGames() {
//     return function(dispatch){
//          axios.get('http://localhost:3001/videogames')
//         .then((data) => {
//             dispatch({
//                 type: GET_GAMES,
//                 payload: data.data
//             })
//         })
//         .catch(e => {
//             console.log(e, 'Error en getGames')
//         })
//     }
    
// }

  export function setLoading(value) {
    return {
      type: SET_LOADING,
      payload: value,
    }
};

export function getGamesByName(name){
    return async function (dispatch){
        try {
            let response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: []
            })
        }
    }
};

export function getGameId(id){
    return async function (dispatch){
        try {
            let response = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: GET_GAME_ID,
                payload: response.data
            })
        } catch (error) {
            console.log('Error en la Accion getGameId',error)
        }
    }
};

export function getGenres(){
    return async function (dispatch){
        try {
            let response = await axios.get('http://localhost:3001/genres');
    
            return dispatch({
                type: GET_GENRES,
                payload: response.data
            })
            
        } catch (error) {
            console.log('Error en la Accion getGenres',error);
        }
    }
    
};

export function filterByGenres(payload){
    
    return {
        type: FILTER_BY_GENRES,
        payload
    }
};  

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
};

export function ordenByName (payload){
    return {
        type: ORDEN_BY_NAME,
        payload
    }
};

export function ordenByRating (payload){
    return {
        type: ORDEN_BY_RATING,
        payload
    }
};


export function postNewGame(data) {
    return  function (dispatch) {
      axios.post(`http://localhost:3001/videogame`, data)
      .then(e => {
          dispatch({
              type: POST_NEW_GAME,
              payload: e
          })
      })
      .catch(e => {
          console.log(e, 'Error en la creacion')
      })
     
    };
  }

// export const getPlatforms = () => dispatch => {
//     return fetch(`http://localhost:3001/platforms`)
//             .then(r => r.json())
//             .then(data => {
//                 dispatch({
//                     type: GET_PLATFORMS,
//                     payload: data,
//                 })
//             })
// };

  export function getPlatforms(){
    return async function (dispatch){
        try {
            let response = await axios.get('http://localhost:3001/platforms');
    
            return dispatch({
                type: GET_PLATFORMS,
                payload: response.data
            })
            
        } catch (error) {
            console.log('Error en la Accion getPlatforms',error);
        }
    }
    
};
