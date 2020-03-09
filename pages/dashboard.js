import { connect } from "react-redux";
import cookie from "react-cookies";
import Router from "next/router";
import axios from "axios";
import cookies from "next-cookies";

const dashboard = ({ isAuthenticated }) => {
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

dashboard.getInitialProps = async (ctx) => {
	let token = null;
	// server-side
	if (ctx.req) {
		token = cookies(ctx).token;
	} else {
		//client side
		token = cookie.load("token");
		if (!token) {
			// if there is no token, don't even check return a redirect
			return Router.replace("/login");
		}
	}

	try {
		//this check happens on both client and server side
		const response = await axios.get("/api/auth/verify", {
			headers: {
				Authorization: token
			}
		});
	} catch (error) {
		// if token is not valid, catch block runs
		// server side redirect
		if (ctx.res) {
			ctx.res.writeHead(302, {
				Location: "/login"
			});
			ctx.res.end();
		} else {
			// client side redirect
			Router.replace("/login");
		}
	}

	return {};
};

export default connect(mapStateToProps)(dashboard);
