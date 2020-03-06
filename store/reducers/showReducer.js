import { ADD_SHOW_HEART, REMOVE_SHOW_HEART, SET_SHOWS } from "../actions/types";

const initialState = {
	showList: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ADD_SHOW_HEART:
			const showObj = {
				tmdbId: payload.id,
				name: payload.name,
				posterPath: payload.poster_path,
				voteAverage: payload.vote_average,
				overview: payload.overview,
				firstAirDate: payload.first_air_date,
				voteCount: payload.vote_count,
				backdropPath: payload.backdrop_path
			};
			return {
				...state,
				showList: [ showObj, ...state.showList ]
			};
		case REMOVE_SHOW_HEART:
			return {
				...state,
				showList: state.showList.filter((cur) => cur.tmdbId !== payload)
			};
		case SET_SHOWS:
			return {
				showList: payload
			};
		default:
			return state;
	}
};
