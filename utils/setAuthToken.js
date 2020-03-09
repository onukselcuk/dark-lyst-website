import axios from "axios";
import { logout } from "../store/actions/authActions";
import cookie from "react-cookies";

const setAuthToken = (token) => {
	const cookieToken = cookie.load("token");

	if (token && cookieToken) {
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
		cookie.remove("token");
		logout();
	}
};

export default setAuthToken;
