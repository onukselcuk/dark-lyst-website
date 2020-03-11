import React, { useState, Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import theme from "../../src/theme";
import Link from "next/link";
import styles from "../../styles/navDropDownStyles.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		className="navbar-anchor-link"
	>
		{children}
		<style jsx>{`
			.navbar-anchor-link {
				text-decoration: none;
				color: #fff;
				font-size: 1.7rem;
				padding: 10px 14px;
				border-radius: 3px;
				cursor: pointer;
			}

			.navbar-anchor-link:hover {
				background-color: ${theme.palette.primary.main};
			}
		`}</style>
	</a>
));

const MovieDropdown = () => {
	return (
		<Fragment>
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
					Movie
				</Dropdown.Toggle>

				<Dropdown.Menu className={styles.dropdownMenu}>
					<Dropdown.Item className={styles.dropdownItem} eventKey="1">
						<Link href="/movies/now-playing">
							<a className="dropdown-link">Movies Now Playing In Theaters</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="2">
						<Link href="/movies/popular">
							<a className="dropdown-link">Popular Movies</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="3">
						<Link href="/movies/top-rated">
							<a className="dropdown-link">Top Rated Movies</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="4">
						<Link href="/movies/upcoming">
							<a className="dropdown-link">Upcoming Movies</a>
						</Link>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default MovieDropdown;
