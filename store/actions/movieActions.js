import { ADD_MOVIE_HEART, REMOVE_MOVIE_HEART, SET_MOVIES } from "./types";
import axios from "axios";
import Router from "next/router";
import { logout } from "./authActions";

export const toggleMovieHeart = (current, status) => async (dispatch, getState) => {
	const state = getState();

	const { isAuthenticated } = state.auth;

	if (!isAuthenticated) {
		return Router.push("/login");
	}

	if (status) {
		const response = await axios.post("/api/heart/movie", current, {
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.data.success) {
			dispatch({
				type: ADD_MOVIE_HEART,
				payload: current
			});
		} else {
			dispatch(logout());
		}
	} else {
		const response = await axios.delete("/api/heart/movie", {
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				movieId: current.id || current.tmdbId
			}
		});

		if (response.data.success) {
			dispatch({
				type: REMOVE_MOVIE_HEART,
				payload: current.id || current.tmdbId
			});
		} else {
			dispatch(logout());
		}
	}
};

export const setMovies = (movieList) => async (dispatch) => {
	dispatch({
		type: SET_MOVIES,
		payload: movieList
	});
};
