import { Fragment } from "react";
import theme from "../src/theme";
import SignUpForm from "../components/forms/SignUpForm";
import Link from "next/link";
import { connect } from "react-redux";
import loaderStyles from "../styles/loader.module.css";
import Router from "next/router";
import cookies from "next-cookies";
import cookie from "react-cookies";
import breakpoints from "../src/breakpoints";
import { NextSeo } from "next-seo";

const SignUp = ({ isRegisterLoading }) => {
	return (
		<main>
			<NextSeo
				title="Sign Up"
				noindex={true}
				openGraph={{
					url: "https://www.darklyst.com/sign-up",
					title: "Sign Up"
				}}
			/>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Sign Up</p>
				</div>
				{isRegisterLoading ? (
					<div className="loader-container">
						<div className={loaderStyles.loader}>Loading...</div>
					</div>
				) : (
					<Fragment>
						<div className="form-container">
							<SignUpForm />
						</div>
						<div className="redirect-container">
							<p className="sub-button-note">
								If you already have an account,&nbsp;
								<Link href="/login">
									<a>Login</a>
								</Link>
							</p>
						</div>
					</Fragment>
				)}
			</section>

			<style jsx>{`
				.carousel-section {
					width: 40%;
					margin: 2rem auto;
				}

				.carousel-top-bar {
					background-color: ${theme.palette.eight.main};
					border-radius: 10px;
					text-align: center;
				}

				.carousel-top-bar-title {
					font-size: 2.6rem;
					padding: 2rem;
				}
				.loader-container {
					z-index: 10;
					width: 100%;
					background-color: ${theme.palette.primary.main};
					border-bottom-left-radius: 5px;
					border-bottom-right-radius: 5px;
				}

				.form-container {
					width: 80%;
					margin: 2rem auto;
				}

				.redirect-container {
					text-align: center;
				}

				.sub-button-note {
					font-size: 1.8rem;
				}

				@media (max-width: ${breakpoints.sizes.xl}) {
					.carousel-section {
						width: 55%;
					}
				}

				@media (max-width: ${breakpoints.sizes.lg}) {
					.carousel-section {
						width: 70%;
					}
				}

				@media (max-width: ${breakpoints.sizes.md}) {
					.carousel-section {
						width: 80%;
					}
				}

				@media (max-width: ${breakpoints.sizes.mdsm}) {
					.carousel-section {
						width: 90%;
					}
				}

				@media (max-width: ${breakpoints.sizes.xs}) {
					.carousel-section {
						width: 95%;
					}
				}
			`}</style>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		isRegisterLoading: state.auth.isRegisterLoading
	};
};

SignUp.getInitialProps = (ctx) => {
	let token = null;

	if (ctx.req) {
		token = cookies(ctx).token;
		if (token) {
			ctx.res.writeHead(302, {
				Location: "/"
			});
			ctx.res.end();
		}
	} else {
		token = cookie.load("token");
		if (token) {
			Router.replace("/");
		}
	}
	return {};
};

export default connect(mapStateToProps)(SignUp);
