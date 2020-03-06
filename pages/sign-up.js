import { Fragment } from "react";
import theme from "../src/theme";
import SignUpForm from "../components/forms/SignUpForm";
import Link from "next/link";
import { connect } from "react-redux";
import loaderStyles from "../styles/loader.module.css";

const SignUp = ({ isRegisterLoading }) => {
	return (
		<main>
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
		isRegisterLoading: state.auth.isRegisterLoading
	};
};
export default connect(mapStateToProps)(SignUp);