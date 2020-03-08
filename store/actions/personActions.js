import { ADD_PERSON_HEART, REMOVE_PERSON_HEART, SET_PEOPLE, LOGOUT } from "./types";
import Router from "next/router";
import axios from "axios";

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
			dispatch({ type: LOGOUT });
			Router.push("/login");
		}
	} else {
		const response = await axios.delete("/api/heart/person", {
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				personId: current.id
			}
		});

		if (response.data.success) {
			dispatch({
				type: REMOVE_PERSON_HEART,
				payload: current.id
			});
		} else {
			dispatch({ type: LOGOUT });
			Router.push("/login");
		}
	}
};

export const setPeople = (personList) => {
	return {
		type: SET_PEOPLE,
		payload: personList
	};
};
