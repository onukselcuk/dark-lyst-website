import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import showReducer from "./showReducer";
import personReducer from "./personReducer";

export default combineReducers({
	movies: movieReducer,
	shows: showReducer,
	people: personReducer
});
