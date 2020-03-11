import { Fragment } from "react";
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

const Navbar = ({ isAuthenticated, logout, user }) => {
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
			<nav className="navbar">
				<div className="logo-container">
					<Link href="/">
						<a>
							<Logo />
						</a>
					</Link>
				</div>
				<SearchBox />
				<ul className="navbar-list">
					<li className="navbar-link-item">
						<Link href="/">
							<a className="navbar-anchor-link">Home</a>
						</Link>
					</li>
					<TvDropdown />
					<MovieDropdown />
					<DiscoverDropdown />
				</ul>
				{isAuthenticated ? (
					<Dropdown className={dropDownStyles.dropdownButtonContainer}>
						<Dropdown.Toggle
							className={dropDownStyles.dropdownButton}
							variant="secondary"
							size="lg"
							id="user-dropdown-button"
						>
							{user && (
								<div className="dropdown-button-inner-container">
									<div className="dropdown-avatar-container">
										<img className="dropdown-button-avatar" src={`${user.avatar}&s=30`} alt="" />
									</div>
									<span className="dropdown-username">{getUserName(user)}</span>
								</div>
							)}
						</Dropdown.Toggle>
						<Dropdown.Menu className={dropDownStyles.dropdownMenu}>
							<Link href="/dashboard/[lid]" as="/dashboard/profile" passHref={true}>
								<Dropdown.Item className={dropDownStyles.dropdownItem}>Profile</Dropdown.Item>
							</Link>
							<Link href="/dashboard/[lid]" as="/dashboard/account" passHref={true}>
								<Dropdown.Item className={dropDownStyles.dropdownItem}>Account</Dropdown.Item>
							</Link>
							<Link href="/dashboard/[lid]" as="/dashboard/movies" passHref={true}>
								<Dropdown.Item className={dropDownStyles.dropdownItem}>Movie Watchlist</Dropdown.Item>
							</Link>
							<Link href="/dashboard/[lid]" as="/dashboard/shows" passHref={true}>
								<Dropdown.Item className={dropDownStyles.dropdownItem}>Show Watchlist</Dropdown.Item>
							</Link>
							<Link href="/dashboard/[lid]" as="/dashboard/stars" passHref={true}>
								<Dropdown.Item className={dropDownStyles.dropdownItem}>Star List</Dropdown.Item>
							</Link>
							<Dropdown.Item as="button" onClick={logout} className={dropDownStyles.dropdownItem}>
								Sign out
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				) : (
					<Fragment>
						<ul className="navbar-list">
							<li className="navbar-link-item">
								<Link href="/sign-up">
									<a className="navbar-anchor-link">Sign Up</a>
								</Link>
							</li>
							<li className="navbar-link-item">
								<Link href="/login">
									<a className="navbar-anchor-link">Login</a>
								</Link>
							</li>
						</ul>
					</Fragment>
				)}
			</nav>
			<style jsx>{`
				.header {
					width: 100%;
					background-color: rgba(0, 0, 0, .2);
				}

				.navbar {
					height: 90px;
					width: 75%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.navbar-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0;
					margin-bottom: 0;
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
					color: white;
					border-radius: 5px;
					padding: 10px 14px;
					margin: 0 1rem;
					cursor: pointer;
					font-size: 1.7rem;
				}

				.navbar-anchor-link:hover {
					background-color: ${theme.palette.primary.main};
				}

				.dropdown-button-inner-container {
					display: flex;
					align-items: center;
				}

				.dropdown-avatar-container {
					width: 20%;
					height: 100%;
					display: flex;
					align-items: center;
					margin-right: 2rem;
				}

				.dropdown-button-avatar {
					width: 100%;
					border-radius: 50%;
					flex-shrink: 0;
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

export default connect(mapStateToProps, { logout })(Navbar);
