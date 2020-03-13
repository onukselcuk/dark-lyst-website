import { Fragment } from "react";
import theme from "../src/theme";
import { connect } from "react-redux";
import loaderStyles from "../styles/loader.module.css";
import cookies from "next-cookies";
import cookie from "react-cookies";
import Router from "next/router";
import ForgottenPasswordForm from "../components/forms/ForgottenPasswordForm";

const ForgotPassword = ({ isPasswordResetReqLoading }) => {
	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Forgotten Password</p>
				</div>
				{isPasswordResetReqLoading ? (
					<div className="loader-container">
						<div className={loaderStyles.loader}>Loading...</div>
					</div>
				) : (
					<Fragment>
						<div className="form-container">
							<ForgottenPasswordForm />
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
					margin: 0 auto;
				}

				.redirect-container {
					text-align: center;
				}

				.sub-button-note {
					font-size: 1.8rem;
				}
			`}</style>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		isPasswordResetReqLoading: state.auth.isPasswordResetReqLoading
	};
};

ForgotPassword.getInitialProps = (ctx) => {
	let token = null;
	let success = true;

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
	return { success };
};

export default connect(mapStateToProps)(ForgotPassword);
