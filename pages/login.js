import { Fragment } from "react";
import theme from "../src/theme";
import LoginForm from "../components/forms/LoginForm";
import Link from "next/link";
import { connect } from "react-redux";
import loaderStyles from "../styles/loader.module.css";
import cookies from "next-cookies";
import cookie from "react-cookies";
import Router from "next/router";
import breakpoints from "../src/breakpoints";
import { NextSeo } from "next-seo";
import GoogleSignIn from "../components/google/GoogleSignIn";

const Login = ({ isLoginLoading }) => {
    return (
        <main>
            <NextSeo
                title="Login"
                noindex={true}
                openGraph={{
                    url: "https://www.darklyst.com/login",
                    title: "Login"
                }}
            />
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
                        <hr className="oauth-buttons-separator-line" />
                        <div className="oauth-buttons-container">
                            <GoogleSignIn />
                        </div>
                        <hr className="oauth-buttons-separator-line" />
                        <div className="redirect-container">
                            <p className="sub-button-note">
                                If you don't have an account,&nbsp;
                                <Link href="/sign-up">
                                    <a>Sign up</a>
                                </Link>
                            </p>
                            <p className="sub-button-note">
                                <Link href="/forgot-password">
                                    <a>Forgot your password?</a>
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
                    width: 90%;
                    margin: 2rem auto;
                }

                .redirect-container {
                    text-align: center;
                    margin-top: 2rem;
                }

                .sub-button-note {
                    font-size: 1.8rem;
                }
                .oauth-buttons-separator-line {
                    margin: 0 auto;
                    margin-top: 3rem;
                    width: 75%;
                    border: 0;
                    height: 1px;
                    background-image: linear-gradient(
                        to right,
                        ${theme.palette.primary.main},
                        rgba(255, 255, 255, 0.5),
                        ${theme.palette.primary.main}
                    );
                }

                .oauth-buttons-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
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
        isLoginLoading: state.auth.isLoginLoading
    };
};

Login.getInitialProps = (ctx) => {
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
    return { token };
};

export default connect(mapStateToProps)(Login);
