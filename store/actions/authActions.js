import {
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import Router from "next/router";
import { setAlert } from "./alertActions";
import { setMovies } from "./movieActions";
import { setShows } from "./showActions";
import { setPeople } from "./personActions";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	} else {
		return;
	}

	try {
		const res = await axios.get("/api/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});

		dispatch(setMovies(res.data.movieList));

		dispatch(setShows(res.data.showList));

		dispatch(setPeople(res.data.personList));
	} catch (error) {
		dispatch({
			type: LOGOUT
		});
	}
};

//Register User
export const registerUser = (userData) => async (dispatch) => {
	dispatch({
		type: REGISTER_START
	});
	try {
		const response = await axios.post("/api/auth/register", userData, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.data.success) {
			Router.push("/");
			dispatch(loadUser());

			dispatch(setAlert(response.data.msg, "success", 5000));

			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data
			});
		}
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((cur) => {
				dispatch(setAlert(cur.msg, "danger", 3000));
			});
			dispatch({
				type: REGISTER_FAIL
			});
		}
	}
};

export const loginUser = (userData) => async (dispatch) => {
	dispatch({
		type: LOGIN_START
	});

	try {
		const response = await axios.post("/api/auth/login", userData, {
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.data.success) {
			Router.push("/");

			dispatch(loadUser());

			dispatch(setAlert(response.data.msg, "success", 5000));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data
			});
		}
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((cur) => {
				dispatch(setAlert(cur.msg, "danger", 3000));
			});
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
