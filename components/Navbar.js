import React from "react";
import Link from "next/link";
import theme from "../src/theme";
import SearchBox from "./SearchBox";

const Navbar = () => (
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

export default Navbar;
