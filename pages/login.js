import { Fragment } from "react";
import theme from "../src/theme";
import LoginForm from "../components/forms/LoginForm";
import Link from "next/link";
import { connect } from "react-redux";
import loaderStyles from "../styles/loader.module.css";

const Login = ({ isLoginLoading }) => {
	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Login</p>
				</div>
				{isLoginLoading ? (
					<div className="loader-container">
						<div className={loaderStyles.loader}>Loading...</div>
					</div>
				) : (
					<Fragment>
						<div className="form-container">
							<LoginForm />
						</div>
						<div className="redirect-container">
							<p className="sub-button-note">
								If you don't have an account,&nbsp;
								<Link href="/sign-up">
									<a>Sign up</a>
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
		isLoginLoading: state.auth.isLoginLoading
	};
};
export default connect(mapStateToProps)(Login);
