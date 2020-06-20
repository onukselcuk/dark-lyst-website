import Link from "next/link";
import theme from "../../src/theme";
import SearchBox from "../SearchBox";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Dropdown from "react-bootstrap/Dropdown";
import dropDownStyles from "../../styles/userDropDownStyles.module.css";
import Logo from "../icons/Logo";
import TvDropdown from "./TvDropdown";
import MovieDropdown from "./MovieDropdown";
import DiscoverDropdown from "./DiscoverDropdown";
import loaderStyles from "../../styles/smallLoader.module.css";
import breakpoints from "../../src/breakpoints";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";

const NavbarComponent = ({ isAuthenticated, logout, user }) => {
    const getUserName = (userData) => {
        let userName;
        userName = userData.name.split(" ")[0];
        if (userName.length > 10) {
            userName = `${userName.slice(0, 10)}..`;
        }
        return userName;
    };

    return (
        <header className="header">
            <Navbar
                className="navbar"
                expand="lg"
                variant="dark"
                collapseOnSelect={true}
            >
                <div className="logo-container">
                    <Link href="/">
                        <a>
                            <Logo />
                        </a>
                    </Link>
                </div>
                <SearchBox />

                <Navbar.Collapse className="navbar-collapse-container">
                    <Nav className="navbar-list navbar-list-nav">
                        <li className="navbar-link-item">
                            <Link href="/">
                                <a className="navbar-anchor-link">Home</a>
                            </Link>
                        </li>
                        <TvDropdown />
                        <MovieDropdown />
                        <DiscoverDropdown />
                        {isAuthenticated && user ? (
                            <Dropdown
                                className={
                                    dropDownStyles.dropdownButtonContainer
                                }
                            >
                                <Dropdown.Toggle
                                    className={dropDownStyles.dropdownButton}
                                    variant="secondary"
                                    size="lg"
                                    id="user-dropdown-button"
                                >
                                    <div className="dropdown-button-inner-container">
                                        <div className="dropdown-avatar-container">
                                            <img
                                                className="dropdown-button-avatar"
                                                src={`${user.avatar}&s=30`}
                                                alt=""
                                            />
                                        </div>
                                        <span className="dropdown-username">
                                            {getUserName(user)}
                                        </span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className={dropDownStyles.dropdownMenu}
                                >
                                    <Link
                                        href="/dashboard/[lid]"
                                        as="/dashboard/profile"
                                        passHref={true}
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                        >
                                            Profile
                                        </Dropdown.Item>
                                    </Link>
                                    <Link
                                        href="/dashboard/[lid]"
                                        as="/dashboard/account"
                                        passHref={true}
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                        >
                                            Account
                                        </Dropdown.Item>
                                    </Link>
                                    <Link
                                        href="/dashboard/[lid]"
                                        as="/dashboard/movies"
                                        passHref={true}
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                        >
                                            Movies Watchlist
                                        </Dropdown.Item>
                                    </Link>
                                    <Link
                                        href="/dashboard/[lid]"
                                        as="/dashboard/shows"
                                        passHref={true}
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                        >
                                            Shows Watchlist
                                        </Dropdown.Item>
                                    </Link>
                                    <Link
                                        href="/dashboard/[lid]"
                                        as="/dashboard/stars"
                                        passHref={true}
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                        >
                                            Stars List
                                        </Dropdown.Item>
                                    </Link>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={logout}
                                        className={dropDownStyles.dropdownItem}
                                    >
                                        Sign out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : isAuthenticated && !user ? (
                            <div>
                                <div className={loaderStyles.loader}>
                                    Loading...
                                </div>
                            </div>
                        ) : (
                            <div className="navbar-list-login">
                                <ul className="navbar-list">
                                    <li className="navbar-link-item">
                                        <Link href="/sign-up">
                                            <a className="navbar-anchor-link">
                                                Sign&nbsp;Up
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="navbar-link-item">
                                        <Link href="/login">
                                            <a className="navbar-anchor-link">
                                                Login
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
            <style jsx>{`
                .header {
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.2);
                }

                .header :global(.navbar) {
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                    width: 70%;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                :global(.navbar .navbar-collapse .navbar-list),
                :global(.navbar .navbar-list) {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    margin-bottom: 0;
                }

                :global(.navbar .navbar-collapse-container.navbar-collapse) {
                    flex-grow: 0;
                }

                .logo-container {
                    width: 20%;
                    max-width: 150px;
                }

                .navbar-link-item {
                    list-style: none;
                }

                .navbar-anchor-link {
                    text-decoration: none;
                    color: rgba(255, 255, 255, 0.7);
                    border-radius: 5px;
                    padding: 10px 14px;
                    cursor: pointer;
                    font-size: 1.7rem;
                }

                .navbar-anchor-link:hover {
                    background-color: ${theme.palette.primary.main};
                    color: #fff;
                }

                .dropdown-button-inner-container {
                    display: flex;
                    align-items: center;
                }

                .dropdown-avatar-container {
                    width: 25px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                }

                .dropdown-button-avatar {
                    width: 100%;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                :global(.dropdown-toggle.btn.btn-secondary.btn-lg::after) {
                    border-top-color: rgba(255, 255, 255, 0.7);
                }

                .dropdown-username {
                    width: 70px;
                    color: rgba(255, 255, 255, 0.7);
                }

                :global(.dropdown-toggle.btn.btn-secondary.btn-lg:hover)
                    .dropdown-username {
                    color: #fff;
                }

                :global(.navbar .navbar-toggler) {
                    font-size: 1.8rem;
                }

                @media (max-width: ${breakpoints.sizes.xl}) {
                    .header :global(.navbar) {
                        width: 75%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .header :global(.navbar) {
                        width: 80%;
                    }

                    :global(.navbar
                            .navbar-collapse-container.navbar-collapse) {
                        order: 3;
                    }
                }

                @media (max-width: ${breakpoints.sizes.md}) {
                    .header :global(.navbar) {
                        width: 85%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .header :global(.navbar) {
                        width: 90%;
                    }

                    :global(.navbar-list.navbar-list-nav) .navbar-link-item,
                    :global(.navbar-list.navbar-list-nav .dropdown) {
                        margin: 1rem 0;
                    }

                    :global(.navbar
                            .navbar-collapse-container.navbar-collapse
                            .navbar-list) {
                        align-items: flex-start;
                        padding-top: 3rem;
                    }
                }

                @media (max-width: ${breakpoints.sizes.sm}) {
                    .header :global(.navbar) {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.xs}) {
                    .header :global(.navbar) {
                        width: 95%;
                    }
                }
            `}</style>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
};

export default connect(mapStateToProps, { logout })(NavbarComponent);
