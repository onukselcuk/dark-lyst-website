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
	if (ctx.req) {
		token = cookies(ctx).token;
	} else {
		token = cookie.load("token");
		if (!token) {
			return Router.push("/login");
		}
	}

	try {
		const response = await axios.get("/api/auth/verify", {
			headers: {
				Authorization: token
			}
		});
	} catch (error) {
		if (ctx.res) {
			ctx.res.writeHead(302, {
				Location: "/login"
			});
			ctx.res.end();
		} else {
			Router.push("/login");
		}
	}

	return {};
};

export default connect(mapStateToProps)(dashboard);
