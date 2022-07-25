import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const GameSlice = createSlice({
    name: 'VideoGames',
    initialState: {
        VideoGames: [],
        allGames: [],
        detail: [],
        genres: [],
        platforms: [],
        loading: true,
    },
    reducers: {
        getGames:(state, action) => {
            return{
                ...state,
                VideoGames: action.payload,
                allGames: action.payload
            };
        },
        getGameId: (state, action) => {
            state.detail = action.payload;
        },
        getGamesByName: (state, action) => {
            return {
                ...state,
                VideoGames: action.payload
            };
        },
        getGenres: (state, action) => {
            state.genres.push(action.payload);
        },
        getPlatforms: (state, action) => {
            state.platforms.push(action.payload);
        },
        setLoading(state, action){
            state.loading = action.payload;
        },
        filterByGenres(state, action){
            state.VideoGames = action.payload === "all" ? state.allGames :
            state.allGames.filter(e => {
                for (let i = 0; i < e.genres.length; i++) {
                    if (e.genres[i].name === action.payload) {
                        return true
                    }
                };
                return undefined;
            });
        },
        filterCreated: (state, action) => {
            const createdFilter = action.payload ==='created' ? state.allGames.filter(el => el.created) : state.allGames.filter(el => !el.created)
            return{
                ...state,
                VideoGames: action.payload === 'all' ? state.allGames : createdFilter
            };
        },
        ordenByName: (state, action) => {
            state.VideoGames = action.payload === 'asc' ? state.allGames.sort(function(a,b){
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) : state.allGames.sort(function(a,b){
                if(a.name > b.name) return  -1;
                if(b.name > a.name) return 1;
                return 0;
            });
        },
        ordenByRating(state, action){
            state.VideoGames = action.payload === 'asce' ? state.allGames.sort(function(a,b){
                if(a.rating > b.rating) return 1;
                if(b.rating > a.rating) return -1;
                return 0;
            }) : state.allGames.sort(function(a,b){
                if(a.rating > b.rating) return  -1;
                if(b.rating > a.rating) return 1;
                return 0;
            });
        },
        postNewGame(state, action){
            return {
                ...state,
                VideoGames: [...state.VideoGames, action.payload]
            };
        },
    }
});

export const  {postNewGame, ordenByRating, ordenByName, getPlatforms, getGenres ,getGames, filterByGenres, filterCreated, getGameId, getGamesByName } = GameSlice.actions;

export default GameSlice.reducer;

export const GetAllGames = () => async (dispatch) => {
    await axios.get('http://localhost:3001/videogames')
    .then( response => dispatch(getGames(response.data)))
    .catch( e => console.error(`error GetGames '${e}'`))  
}

export const GetGameId = (id) => async (dispatch) => {
    await axios.get(`http://localhost:3001/videogames/${id}`)
    .then((response) => {
        dispatch(getGameId(response.data))
    }).catch( e => console.error(`error getGameId '${e}'`))  
}

export const GetGamesByName = (name) => async (dispatch) => {
    await axios.get(`http://localhost:3001/videogames?name=${name}`)
    .then( response =>  dispatch(getGamesByName(response.data)))
    .catch(e => console.error(`error GetGamesByName ${e}`))
};

export const GetGenres = () => async (dispatch) => {
    await axios.get('http://localhost:3001/genres')
    .then( response => dispatch(getGenres(response.data)))
    .catch( e => console.error(`error getGenres '${e}'`))                 
};

export const GetPlatforms = () => async (dispatch) => {
    await axios.get('http://localhost:3001/platforms')
    .then( response => dispatch(getPlatforms(response.data)))
    .catch( e => console.error(`error GetPlatforms '${e}'`))    
};

export const PostNewGame = (data) => (dispatch) => {
    axios.post(`http://localhost:3001/videogame`, data)
    .then( response => dispatch(postNewGame(response.data)))
    .catch( e => console.error(`error postNewGame '${e}'`)) 
};