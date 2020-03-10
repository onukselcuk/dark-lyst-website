import { useState, Fragment } from "react";
import { connect } from "react-redux";
import cookie from "react-cookies";
import Router from "next/router";
import axios from "axios";
import cookies from "next-cookies";
import theme from "../src/theme";
import ProfileContainer from "../components/containers/ProfileContainer";
import AccountContainer from "../components/containers/AccountContainer";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import MovieWatchlistContainer from "../components/containers/MovieWatchlistContainer";
import ShowWatchlistContainer from "../components/containers/ShowWatchlistContainer";

const dashboard = ({ isAuthenticated, user, success }) => {
	const [ barState, setBarState ] = useState("account");
	const [ isChangingPassword, setIsChangingPassword ] = useState(false);

	const handleState = (state) => {
		setBarState(state);
	};

	return (
		<section className="dashboard-section">
			<div className="dashboard-top-bar">
				<p onClick={() => handleState("profile")} className="dashboard-top-bar-title">
					Profile
				</p>
				<p onClick={() => handleState("account")} className="dashboard-top-bar-title">
					Account
				</p>
				<p onClick={() => handleState("movies")} className="dashboard-top-bar-title dashboard-top-bar-seasons">
					Movies Watchlist
				</p>
				<p onClick={() => handleState("shows")} className="dashboard-top-bar-title dashboard-top-bar-seasons">
					Shows Watchlist
				</p>
				<p onClick={() => handleState("people")} className="dashboard-top-bar-title dashboard-top-bar-seasons">
					People List
				</p>
			</div>

			{barState === "profile" ? (
				<ProfileContainer user={user} />
			) : barState === "account" ? (
				<Fragment>
					{isChangingPassword ? (
						<ChangePasswordForm setIsChangingPassword={setIsChangingPassword} />
					) : (
						<AccountContainer setIsChangingPassword={setIsChangingPassword} />
					)}
				</Fragment>
			) : barState === "movies" ? (
				<MovieWatchlistContainer />
			) : barState === "shows" ? (
				<ShowWatchlistContainer />
			) : null}

			<style jsx>{`
				.dashboard-section {
					width: 70%;
					margin: 2rem auto;
				}

				.dashboard-top-bar {
					margin: 0 auto;
					background-color: rgba(0, 0, 0, .4);
					border-radius: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 1rem 3rem;
				}

				.dashboard-top-bar-title {
					font-size: 2.2rem;
					margin: 1rem;
					padding: 1rem;
					border-radius: 10px;
					cursor: pointer;
					background-color: ${theme.palette.primary.main};
					${barState && "background-color: transparent;"};
					${"cursor:default;"};
				}

				.dashboard-top-bar-title:hover {
					background-color: ${theme.palette.primary.main};
					${"background-color:transparent;"};
				}

				.dashboard-top-bar-seasons {
					background: none;
					${barState && "background-color: #1b262c;"};
				}
			`}</style>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	};
};

dashboard.getInitialProps = async (ctx) => {
	let token = null;
	let serverUrl = null;
	let success = false;
	// server-side
	if (ctx.req) {
		token = cookies(ctx).token;
		serverUrl = "http://localhost:3000";
	} else {
		//client side
		token = cookie.load("token");
		serverUrl = "";
		if (!token) {
			// if there is no token, don't even check return a redirect
			return Router.replace("/login");
		}
	}

	try {
		//this check happens on both client and server side
		const response = await axios.get(`${serverUrl}/api/auth/verify`, {
			headers: {
				Authorization: token
			}
		});
		success = true;
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

	return { success };
};

export default connect(mapStateToProps)(dashboard);
