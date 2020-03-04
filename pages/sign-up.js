import { useState, useEffect, useRef } from "react";
import axios from "axios";
import theme from "../src/theme";
import SignUpForm from "../components/SignUpForm";
import Link from "next/link";

const SignUp = () => {
	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Sign Up</p>
				</div>
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

export default SignUp;
