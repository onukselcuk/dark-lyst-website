import { ADD_PERSON_HEART, REMOVE_PERSON_HEART, SET_PEOPLE } from "./types";
import Router from "next/router";
import axios from "axios";
import { logout } from "./authActions";

export const togglePersonHeart = (current, backgroundUrl, status) => async (dispatch, getState) => {
	const state = getState();

	const { isAuthenticated } = state.auth;

	if (!isAuthenticated) {
		return Router.push("/login");
	}

	if (status) {
		const personObj = {
			details: current,
			backgroundPath: backgroundUrl
		};

		const response = await axios.post("/api/heart/person", personObj, {
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.data.success) {
			dispatch({
				type: ADD_PERSON_HEART,
				payload: current,
				url: backgroundUrl
			});
		} else {
			dispatch(logout());
		}
	} else {
		const response = await axios.delete("/api/heart/person", {
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				personId: current.id || current.tmdbId
			}
		});

		if (response.data.success) {
			dispatch({
				type: REMOVE_PERSON_HEART,
				payload: current.id || current.tmdbId
			});
		} else {
			dispatch(logout());
		}
	}
};

export const setPeople = (personList) => {
	return {
		type: SET_PEOPLE,
		payload: personList
	};
};
