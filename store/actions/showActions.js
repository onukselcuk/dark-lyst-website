import { ADD_SHOW_HEART, REMOVE_SHOW_HEART, SET_SHOWS } from "./types";
import Router from "next/router";
import axios from "axios";
import { logout } from "./authActions";

export const toggleShowHeart = (current, status) => async (dispatch, getState) => {
	const state = getState();

	const { isAuthenticated } = state.auth;

	if (!isAuthenticated) {
		return Router.push("/login");
	}

	if (status) {
		const response = await axios.post("/api/heart/show", current, {
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.data.success) {
			dispatch({
				type: ADD_SHOW_HEART,
				payload: current
			});
		} else {
			dispatch(logout());
		}
	} else {
		const response = await axios.delete("/api/heart/show", {
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				showId: current.id || current.tmdbId
			}
		});

		if (response.data.success) {
			dispatch({
				type: REMOVE_SHOW_HEART,
				payload: current.id || current.tmdbId
			});
		} else {
			dispatch(logout());
		}
	}
};

export const setShows = (showList) => async (dispatch) => {
	dispatch({
		type: SET_SHOWS,
		payload: showList
	});
};
