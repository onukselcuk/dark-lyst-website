import { ADD_MOVIE_HEART, REMOVE_MOVIE_HEART } from "../actions/types";

const initialState = {
	movieList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_MOVIE_HEART:
			return {
				...state,
				movieList: [ ...state.movieList, action.payload ]
			};
		case REMOVE_MOVIE_HEART:
			return {
				...state,
				movieList: state.movieList.filter((cur) => cur !== action.payload)
			};
		default:
			return state;
	}
};
