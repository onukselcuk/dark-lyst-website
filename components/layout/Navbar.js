import { Fragment } from "react";
import Link from "next/link";
import theme from "../../src/theme";
import SearchBox from "../SearchBox";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Dropdown from "react-bootstrap/Dropdown";
import dropDownStyles from "../../styles/userDropDownStyles.module.css";

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
				<ul className="navbar-list navbar-first">
					<li className="navbar-link-item">
						<Link href="/">
							<a className="navbar-anchor-link">Home</a>
						</Link>
					</li>
				</ul>
				<SearchBox />
				<ul className="navbar-list">
					<li className="navbar-link-item">
						<Link href="/discover">
							<a className="navbar-anchor-link">Discover</a>
						</Link>
					</li>
					<li className="navbar-link-item">
						<Link href="/">
							<a className="navbar-anchor-link">Watchlist</a>
						</Link>
					</li>
					{isAuthenticated ? (
						<Dropdown className={dropDownStyles.dropdownButtonContainer}>
							<Dropdown.Toggle
								className={dropDownStyles.dropdownButton}
								variant="secondary"
								size="lg"
								id="user-dropdown-button"
							>
								{user ? getUserName(user) : "user"}
							</Dropdown.Toggle>
							<Dropdown.Menu className={dropDownStyles.dropdownMenu}>
								<Link href="/dashboard" passHref={true}>
									<Dropdown.Item className={dropDownStyles.dropdownItem}>Your Profile</Dropdown.Item>
								</Link>

								<Dropdown.Item as="button" onClick={logout} className={dropDownStyles.dropdownItem}>
									Sign out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						<Fragment>
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
						</Fragment>
					)}
				</ul>
			</nav>
			<style jsx>{`
				.header {
					width: 100%;
					background-color: rgba(0, 0, 0, .2);
				}

				.navbar {
					height: 80px;
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
					margin: 0 auto;
					padding: 0;
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
					background-color: ${theme.palette.sixth.main};
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
