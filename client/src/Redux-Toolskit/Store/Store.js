import { configureStore } from "@reduxjs/toolkit";
// reducer
import VideoGamesReducer from "../Slices/VideoGames/VideoGames";

const store = configureStore({
    reducer: {     
        VideoGames: VideoGamesReducer 
    }
});

export default store