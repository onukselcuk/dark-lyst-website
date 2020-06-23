import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_MOVIES,
    CLEAR_SHOWS,
    CLEAR_PEOPLE,
    PASSWORD_CHANGE_START,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAIL,
    PASSWORD_RESET_REQUEST_START,
    PASSWORD_RESET_REQUEST_SUCCESS,
    PASSWORD_RESET_REQUEST_FAIL,
    PASSWORD_RESET_START,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS
} from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import Router from "next/router";
import { setAlert } from "./alertActions";
import { setMovies } from "./movieActions";
import { setShows } from "./showActions";
import { setPeople } from "./personActions";
import { batch } from "react-redux";

export const logout = () => (dispatch) => {
    batch(() => {
        dispatch({ type: LOGOUT });
        dispatch({ type: CLEAR_MOVIES });
        dispatch({ type: CLEAR_SHOWS });
        dispatch({ type: CLEAR_PEOPLE });
    });
    Router.push("/login");
};

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    } else {
        return;
    }

    try {
        const res = await axios.get("/api/auth");

        batch(() => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

            dispatch(setMovies(res.data.movieList));

            dispatch(setShows(res.data.showList));

            dispatch(setPeople(res.data.personList));
        });
    } catch (error) {
        dispatch(logout());
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
            batch(() => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.data
                });
                dispatch(setAlert(response.data.msg, "success", 3000));
                dispatch(loadUser());
            });
            Router.push("/");
        } else {
            dispatch(logout());
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
        console.log("response from backend google check");
        console.log(response.data);

        if (response.data.success) {
            batch(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                });
                dispatch(setAlert(response.data.msg, "success", 3000));
                dispatch(loadUser());
            });
            Router.push("/");
        } else {
            dispatch(logout());
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

export const loginUserWithGoogle = (response, isSignUp) => async (dispatch) => {
    const loginType = "google";

    if (isSignUp) {
        dispatch({
            type: REGISTER_START,
            loginType
        });
    } else {
        dispatch({
            type: LOGIN_START,
            loginType
        });
    }

    try {
        const googleCheckToken = await axios.post(
            "/api/auth/login-with-google",
            { googleResponse: response },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (googleCheckToken.data.success) {
            batch(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: googleCheckToken.data,
                    loginType
                });
                dispatch(setAlert(googleCheckToken.data.msg, "success", 3000));
                dispatch(loadUser());
            });
            Router.push("/");
        } else {
            dispatch(logout(loginType));
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((cur) => {
                if (cur.statusCode === 409) {
                    const auth2 = window.gapi.auth2.getAuthInstance();
                    if (auth2 != null) {
                        auth2.disconnect();
                    }
                }
                dispatch(setAlert(cur.msg, "danger", 3000));
            });
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const changePassword = (userData) => async (dispatch) => {
    dispatch({
        type: PASSWORD_CHANGE_START
    });

    try {
        const response = await axios.post(
            "/api/auth/change-password",
            userData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data.success) {
            batch(() => {
                dispatch({
                    type: PASSWORD_CHANGE_SUCCESS
                });
                dispatch(setAlert(response.data.msg, "success", 8000));
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((cur) => {
                dispatch(setAlert(cur.msg, "danger", 5000));
            });
        }
        dispatch({
            type: PASSWORD_CHANGE_FAIL
        });
    }
};

export const passwordResetRequest = (userData) => async (dispatch) => {
    dispatch({
        type: PASSWORD_RESET_REQUEST_START
    });

    try {
        const response = await axios.post(
            "/api/auth/password-reset-request",
            userData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data.success) {
            batch(() => {
                dispatch({
                    type: PASSWORD_RESET_REQUEST_SUCCESS
                });

                dispatch(setAlert(response.data.msg, "success", 5000));
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((cur) => {
                dispatch(setAlert(cur.msg, "danger", 5000));
            });
        }

        dispatch({
            type: PASSWORD_RESET_REQUEST_FAIL
        });
    }
};

export const resetPassword = (userData) => async (dispatch) => {
    dispatch({
        type: PASSWORD_RESET_START
    });

    try {
        const response = await axios.post(
            "/api/auth/reset-password",
            userData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data.success) {
            batch(() => {
                dispatch({
                    type: PASSWORD_RESET_SUCCESS
                });

                dispatch(setAlert(response.data.msg, "success", 5000));
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((cur) => {
                dispatch(setAlert(cur.msg, "danger", 5000));
            });
        }

        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};
