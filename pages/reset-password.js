import { Fragment, useEffect } from "react";
import theme from "../src/theme";
import { connect } from "react-redux";
import loaderStyles from "../styles/loader.module.css";
import Router from "next/router";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";
import axios from "axios";

const ResetPassword = ({ isPasswordResetLoading, resetToken, email, errors }) => {
	useEffect(() => {
		if (errors) {
			Router.replace("/");
		}
	}, []);

	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Reset Password</p>
				</div>
				{isPasswordResetLoading ? (
					<div className="loader-container">
						<div className={loaderStyles.loader}>Loading...</div>
					</div>
				) : (
					<Fragment>
						<div className="form-container">
							<ResetPasswordForm resetToken={resetToken} email={email} />
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
		isPasswordResetLoading: state.auth.isPasswordResetLoading
	};
};

ResetPassword.getInitialProps = async ({ query, res, req }) => {
	let resetToken = query.reset_token;

	let email = query.email;

	if (!resetToken || !email) {
		if (res) {
			res.writeHead(302, {
				Location: "/"
			});
			return res.end();
		} else {
			return Router.replace("/");
		}
	}

	const serverUrl = req ? "http://localhost:3000" : "";

	const tokenObj = {
		resetToken,
		email
	};

	let errors;

	try {
		const tokenResponse = await axios.post(`${serverUrl}/api/auth/reset-token-verify`, tokenObj, {
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error) {
		errors = error.response.data.errors;
		if (res) {
			res.writeHead(302, {
				Location: "/"
			});
			res.end();
		} else {
			// client side redirect
			Router.replace("/");
		}
	}

	return { resetToken, email, errors };
};

export default connect(mapStateToProps)(ResetPassword);
