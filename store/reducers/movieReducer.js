import {
    ADD_MOVIE_HEART,
    REMOVE_MOVIE_HEART,
    SET_MOVIES,
    CLEAR_MOVIES
} from "../actions/types";

const initialState = {
    movieList: []
};

const movieReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_MOVIE_HEART:
            const movieObj = {
                tmdbId: payload.id,
                title: payload.title,
                posterPath: payload.poster_path,
                voteAverage: payload.vote_average,
                overview: payload.overview,
                releaseDate: payload.release_date,
                voteCount: payload.vote_count,
                backdropPath: payload.backdrop_path
            };
            return {
                ...state,
                movieList: [movieObj, ...state.movieList]
            };
        case REMOVE_MOVIE_HEART:
            return {
                ...state,
                movieList: state.movieList.filter(
                    (cur) => cur.tmdbId !== payload
                )
            };
        case SET_MOVIES:
            return {
                movieList: payload
            };
        case CLEAR_MOVIES:
            return {
                movieList: []
            };
        default:
            return state;
    }
};

export default movieReducer;
