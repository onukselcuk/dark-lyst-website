import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import showReducer from "./showReducer";
import personReducer from "./personReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
	movies: movieReducer,
	shows: showReducer,
	people: personReducer,
	auth: authReducer,
	alerts: alertReducer
});
