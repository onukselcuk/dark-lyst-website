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
import ActiveLink from "./ActiveLink";
import { v4 as uuidv4 } from "uuid";

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
                        <ul>
                            <li className="navbar-link-item">
                                <ActiveLink
                                    href="/"
                                    activeClassName="navbar-link-item-active"
                                >
                                    <a className="navbar-anchor-link">Home</a>
                                </ActiveLink>
                            </li>
                        </ul>
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
                                    <ActiveLink
                                        href="/dashboard/[lid]"
                                        as="/dashboard/profile"
                                        activeLinkSlug="/dashboard/profile"
                                        passHref={true}
                                        activeClassName="navbar-link-item-active"
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                            active={false}
                                            key={uuidv4()}
                                        >
                                            Profile
                                        </Dropdown.Item>
                                    </ActiveLink>
                                    <ActiveLink
                                        href="/dashboard/[lid]"
                                        as="/dashboard/account"
                                        activeLinkSlug="/dashboard/account"
                                        passHref={true}
                                        activeClassName="navbar-link-item-active"
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                            active={false}
                                            key={uuidv4()}
                                        >
                                            Account
                                        </Dropdown.Item>
                                    </ActiveLink>
                                    <ActiveLink
                                        href="/dashboard/[lid]"
                                        as="/dashboard/movies"
                                        activeLinkSlug="/dashboard/movies"
                                        passHref={true}
                                        activeClassName="navbar-link-item-active"
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                            active={false}
                                            key={uuidv4()}
                                        >
                                            Movies Watchlist
                                        </Dropdown.Item>
                                    </ActiveLink>
                                    <ActiveLink
                                        href="/dashboard/[lid]"
                                        as="/dashboard/shows"
                                        activeLinkSlug="/dashboard/shows"
                                        passHref={true}
                                        activeClassName="navbar-link-item-active"
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                            active={false}
                                            key={uuidv4()}
                                        >
                                            Shows Watchlist
                                        </Dropdown.Item>
                                    </ActiveLink>
                                    <ActiveLink
                                        href="/dashboard/[lid]"
                                        as="/dashboard/stars"
                                        activeLinkSlug="/dashboard/stars"
                                        passHref={true}
                                        activeClassName="navbar-link-item-active"
                                    >
                                        <Dropdown.Item
                                            className={
                                                dropDownStyles.dropdownItem
                                            }
                                            active={false}
                                            key={uuidv4()}
                                        >
                                            Stars List
                                        </Dropdown.Item>
                                    </ActiveLink>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={logout}
                                        className={dropDownStyles.dropdownItem}
                                        key={uuidv4()}
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
                                        <ActiveLink
                                            href="/login"
                                            activeClassName="navbar-link-item-active"
                                        >
                                            <a className="navbar-anchor-link">
                                                Login
                                            </a>
                                        </ActiveLink>
                                    </li>
                                    <li className="navbar-link-item">
                                        <ActiveLink
                                            href="/sign-up"
                                            activeClassName="navbar-link-item-active"
                                        >
                                            <a className="navbar-anchor-link navbar-anchor-link-signup">
                                                Sign&nbsp;Up
                                            </a>
                                        </ActiveLink>
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
                    padding: 3rem 0;
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
                    transition: all ease-in-out 200ms;
                    margin: 0 5px;
                }

                .navbar-anchor-link:hover,
                .navbar-link-item-active {
                    background-color: rgba(255, 255, 255, 0.6);
                    color: ${theme.palette.primary.main};
                }

                .navbar-anchor-link-signup {
                    margin-right: 0;
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
