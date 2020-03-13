import {
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	PASSWORD_CHANGE_START,
	PASSWORD_CHANGE_SUCCESS,
	PASSWORD_CHANGE_FAIL,
	PASSWORD_RESET_REQUEST_START,
	PASSWORD_RESET_REQUEST_SUCCESS,
	PASSWORD_RESET_REQUEST_FAIL,
	PASSWORD_RESET_START,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAIL
} from "../actions/types";

import cookie from "react-cookies";

const initialState = {
	token: typeof localStorage !== "undefined" ? localStorage.getItem("token") : null,
	isAuthenticated: typeof localStorage === "undefined" ? null : localStorage.getItem("token") ? true : null,
	loading: true,
	isRegisterLoading: false,
	isLoginLoading: false,
	user: null,
	isPasswordChangeLoading: false,
	isPasswordResetReqLoading: false,
	isPasswordResetLoading: false
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
			cookie.save("token", payload.token, { path: "/", maxAge: 360000 });
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
			cookie.save("token", payload.token, { path: "/", maxAge: 360000 });
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
			cookie.remove("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case PASSWORD_CHANGE_START:
			return {
				...state,
				isPasswordChangeLoading: true
			};
		case PASSWORD_CHANGE_SUCCESS:
			return {
				...state,
				isPasswordChangeLoading: false
			};
		case PASSWORD_CHANGE_FAIL:
			return {
				...state,
				isPasswordChangeLoading: false
			};
		case PASSWORD_RESET_REQUEST_START:
			return {
				...state,
				isPasswordResetReqLoading: true
			};
		case PASSWORD_RESET_REQUEST_SUCCESS:
			return {
				...state,
				isPasswordResetReqLoading: false
			};
		case PASSWORD_RESET_REQUEST_FAIL:
			return {
				...state,
				isPasswordResetReqLoading: false
			};
		case PASSWORD_RESET_START:
			return {
				...state,
				isPasswordResetLoading: true
			};
		case PASSWORD_RESET_SUCCESS:
			return {
				...state,
				isPasswordResetLoading: false
			};
		case PASSWORD_RESET_FAIL:
			return {
				...state,
				isPasswordResetLoading: false
			};
		default:
			return state;
	}
};
