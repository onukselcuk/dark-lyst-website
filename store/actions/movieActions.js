import { ADD_MOVIE_HEART, REMOVE_MOVIE_HEART } from "./types";

export const toggleMovieHeart = (id, status) => {
	if (status) {
		return {
			type: ADD_MOVIE_HEART,
			payload: id
		};
	} else {
		return {
			type: REMOVE_MOVIE_HEART,
			payload: id
		};
	}
};
