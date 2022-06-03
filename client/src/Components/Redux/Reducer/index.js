import { FILTER_BY_GENRES, FILTER_CREATED, GET_GAMES, GET_GAMES_BY_NAME, GET_GAME_ID, GET_GENRES, GET_PLATFORMS, ORDEN_BY_NAME, ORDEN_BY_RATING, POST_NEW_GAME, SET_LOADING } from "../Actions";

const initialState = {
    VideoGames: [],
    allGames: [],
    loading: true,
    detail: [],
    genres: [],
    platforms: []
  
}

export default function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_GAMES:
           return{
               ...state,
               VideoGames: action.payload,
               allGames: action.payload,


           };
            
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };   

        case GET_GAMES_BY_NAME:
            return {
                ...state,
                VideoGames: action.payload
            };
    
        case GET_GAME_ID:
            return {
                ...state,
                detail: action.payload,
                    
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,

            };
        case POST_NEW_GAME: 
            return {
                ...state,
                VideoGames: [...state.VideoGames, action.payload]
        }
        case FILTER_BY_GENRES:
            const filteGenres = action.payload === "all" ? state.allGames :
                state.allGames.filter(e => {
                    console.log(e)
                    for (let i = 0; i < e.genres.length; i++) {
                        if (e.genres[i].name === action.payload) {
                            return true
                        }
                    }
                    return undefined
                })
            return {
                ...state,
                VideoGames: filteGenres
            }

        case ORDEN_BY_NAME:
                let sortedArr = action.payload === 'asc' ? state.allGames.sort(function(a,b){
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0;
                }) : state.allGames.sort(function(a,b){
                    if(a.name > b.name) return  -1;
                    if(b.name > a.name) return 1;
                    return 0;
                }) 
            return{
                ...state,
                allGames: sortedArr
                }

        case ORDEN_BY_RATING:
            let GamesByRating = action.payload === 'asce' ? state.allGames.sort(function(a,b){
                if(a.rating > b.rating) return 1;
                if(b.rating > a.rating) return -1;
                return 0;
            }) : state.allGames.sort(function(a,b){
                if(a.rating > b.rating) return  -1;
                if(b.rating > a.rating) return 1;
                return 0;
            }) 
        return{
            ...state,
            allGames: GamesByRating
            }

        case FILTER_CREATED:
                const createdFilter = action.payload ==='created' ? state.allGames.filter(el => el.created) : state.allGames.filter(el => !el.created)
                return{
                    ...state,
                    VideoGames: action.payload === 'all' ? state.allGames : createdFilter
                };

        case GET_PLATFORMS:
            return {
                ...state,
               platforms: action.payload,

               };
        default:
            return state;
    }
}