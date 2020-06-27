import Logo from "../icons/Logo";
import Link from "next/link";
import TmdbLogo from "../icons/TmdbLogo";
import breakpoints from "../../src/breakpoints";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="top-footer">
                <div className="footer-inner-container-top">
                    <div className="top-container">
                        <div className="logo-container">
                            <Link href="/">
                                <a>
                                    <Logo />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="top-container">
                        <div className="tmdb-logo-container">
                            <TmdbLogo />
                        </div>
                    </div>
                    <div className="top-container">
                        <div className="top-footer-link-container">
                            <a
                                className="footer-link"
                                href="mailto:contact@darklyst.com"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-footer">
                <div className="footer-inner-container-bottom">
                    <div className="copyright-container">
                        &copy; 2020 DarkLyst
                    </div>
                    <div className="developer-container">
                        <a
                            className="footer-link"
                            href="https://www.upwork.com/o/profiles/users/~0132c2a668c2858146/"
                            target="_blank"
                            rel="noopener"
                        >
                            Developed and Designed by Selcuk Onuk
                        </a>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .footer {
                    width: 100%;
                    margin-top: 2rem;
                    color: rgba(255, 255, 255, 0.4);
                }

                .top-footer,
                .bottom-footer {
                    width: 100%;
                }

                .top-footer {
                    background-color: rgba(0, 0, 0, 0.6);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .bottom-footer {
                    background-color: rgba(0, 0, 0, 0.6);
                }

                .footer-inner-container-top,
                .footer-inner-container-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 70%;
                    margin: 0 auto;
                }

                .footer-inner-container-top {
                    padding: 2rem 0;
                }

                .footer-inner-container-bottom {
                    padding: 1rem 0;
                }

                .top-container {
                    width: 30%;
                }

                .logo-container {
                    width: 40%;
                    min-width: 80px;
                }

                .tmdb-logo-container {
                    width: 60%;
                    min-width: 60px;
                    margin: 0 auto;
                }

                .top-footer-link-container {
                    text-align: right;
                }

                .footer-link {
                    text-decoration: none;
                    color: rgba(255, 255, 255, 0.4);
                    transition: all 300ms ease-in-out;
                }

                .footer-link:hover {
                    color: #fff;
                }

                @media (max-width: ${breakpoints.sizes.xl}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        width: 75%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        width: 80%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.md}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        width: 85%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.sm}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.xs}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        width: 95%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.xxs}) {
                    .footer-inner-container-top,
                    .footer-inner-container-bottom {
                        flex-direction: column;
                        align-items: center;
                    }

                    .top-container {
                        width: 100%;
                    }

                    .logo-container,
                    .tmdb-logo-container,
                    .top-footer-link-container {
                        margin: 0.7rem auto;
                        text-align: center;
                    }

                    .top-footer-link-container {
                        width: 50%;
                    }

                    .logo-container,
                    .tmdb-logo-container {
                        width: 30%;
                    }

                    .copyright-container,
                    .developer-container {
                        text-align: center;
                        margin: 0.5rem auto;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
