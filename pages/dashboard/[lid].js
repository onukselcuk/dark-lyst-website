import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import cookie from "react-cookies";
import Router from "next/router";
import axios from "axios";
import cookies from "next-cookies";
import theme from "../../src/theme";
import Link from "next/link";
import ProfileContainer from "../../components/containers/ProfileContainer";
import AccountContainer from "../../components/containers/AccountContainer";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import MovieWatchlistContainer from "../../components/containers/MovieWatchlistContainer";
import ShowWatchlistContainer from "../../components/containers/ShowWatchlistContainer";
import StarListContainer from "../../components/containers/StarListContainer";
import breakpoints from "../../src/breakpoints";
import { NextSeo } from "next-seo";

const dashboardTemplate = ({ user, lid }) => {
	const [ barState, setBarState ] = useState("profile");
	const [ isChangingPassword, setIsChangingPassword ] = useState(false);

	const acceptedRoutes = [ "profile", "account", "movies", "shows", "stars" ];

	useEffect(
		() => {
			if (acceptedRoutes.includes(lid)) {
				setBarState(lid);
			} else {
				Router.replace("/");
			}
		},
		[ lid ]
	);

	return (
		<Fragment>
			{user && (
				<section className="dashboard-section">
					<NextSeo
						title={`${user.name}'s ${lid.slice(0, 1).toUpperCase()}${lid.slice(1)}`}
						noindex={true}
						openGraph={{
							url: `https://www.darklyst.com/dashboard/${lid}`,
							title: `${user.name}'s ${lid.slice(0, 1).toUpperCase()}${lid.slice(1)}`
						}}
					/>
					<div className="dashboard-top-bar">
						<Link href={`/dashboard/[lid]`} as={`/dashboard/profile`}>
							<a className={`dashboard-top-bar-title ${barState === "profile" ? "active" : ""}`}>
								Profile
							</a>
						</Link>
						<Link href={`/dashboard/[lid]`} as={`/dashboard/account`}>
							<a className={`dashboard-top-bar-title ${barState === "account" ? "active" : ""}`}>
								Account
							</a>
						</Link>
						<Link href={`/dashboard/[lid]`} as={`/dashboard/movies`}>
							<a className={`dashboard-top-bar-title ${barState === "movies" ? "active" : ""}`}>
								Movies&nbsp;Watchlist
							</a>
						</Link>
						<Link href={`/dashboard/[lid]`} as={`/dashboard/shows`}>
							<a className={`dashboard-top-bar-title ${barState === "shows" ? "active" : ""}`}>
								Shows&nbsp;Watchlist
							</a>
						</Link>
						<Link href={`/dashboard/[lid]`} as={`/dashboard/stars`}>
							<a className={`dashboard-top-bar-title ${barState === "stars" ? "active" : ""}`}>
								Star&nbsp;List
							</a>
						</Link>
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
					) : barState === "stars" ? (
						<StarListContainer />
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
							text-decoration: none;
							color: #fff;
						}

						.dashboard-top-bar-title:hover,
						.dashboard-top-bar-title.active {
							background-color: ${theme.palette.primary.main};
						}

						@media (max-width: ${breakpoints.sizes.xl}) {
							.dashboard-section {
								width: 55%;
							}
						}

						@media (max-width: ${breakpoints.sizes.lg}) {
							.dashboard-section {
								width: 70%;
							}
						}

						@media (max-width: ${breakpoints.sizes.md}) {
							.dashboard-section {
								width: 80%;
							}
						}

						@media (max-width: ${breakpoints.sizes.mdsm}) {
							.dashboard-section {
								width: 90%;
							}
						}

						@media (max-width: ${breakpoints.sizes.sm}) {
							.dashboard-top-bar-title {
								font-size: 1.8rem;
								margin: .5rem;
								padding: .5rem;
							}
						}

						@media (max-width: ${breakpoints.sizes.xs}) {
							.dashboard-section {
								width: 95%;
							}
						}

						@media (max-width: ${breakpoints.sizes.xxs}) {
							.dashboard-top-bar-title {
								font-size: 1.6rem;
							}
						}
					`}</style>
				</section>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

dashboardTemplate.getInitialProps = async (ctx) => {
	let token = null;
	let serverUrl = null;
	let lid = ctx.query.lid;
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

	return { lid };
};

export default connect(mapStateToProps)(dashboardTemplate);
