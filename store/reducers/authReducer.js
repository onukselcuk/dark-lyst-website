import {
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from "../actions/types";

const initialState = {
	token: typeof localStorage !== "undefined" ? localStorage.getItem("token") : null,
	isAuthenticated: typeof localStorage === "undefined" ? null : localStorage.getItem("token") ? true : null,
	loading: true,
	isRegisterLoading: false,
	isLoginLoading: false,
	user: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: {
					id: payload._id,
					name: payload.name,
					email: payload.email,
					avatar: payload.avatar,
					date: payload.date
				}
			};

		case REGISTER_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
				isRegisterLoading: false
			};
		case REGISTER_START:
			return {
				...state,
				isRegisterLoading: true
			};
		case REGISTER_FAIL:
			return {
				...state,
				isRegisterLoading: false
			};

		case LOGIN_START:
			return {
				...state,
				isLoginLoading: true
			};

		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				isLoginLoading: false
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoginLoading: false
			};
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			};
		default:
			return state;
	}
};
