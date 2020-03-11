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

const TvDropdown = () => {
	return (
		<Fragment>
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
					TV
				</Dropdown.Toggle>

				<Dropdown.Menu className={styles.dropdownMenu}>
					<Dropdown.Item className={styles.dropdownItem} eventKey="1">
						<Link href="/shows/on-the-air">
							<a className="dropdown-link">TV Shows On Air</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="2">
						<Link href="/shows/popular">
							<a className="dropdown-link">Popular Shows</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="3">
						<Link href="/shows/top-rated">
							<a className="dropdown-link">Top Rated Shows</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="4">
						<Link href="/shows/latest-on-netflix">
							<a className="dropdown-link">Latest Shows On Netflix</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className={styles.dropdownItem} eventKey="5">
						<Link href="/shows/latest-on-apple-tv-plus">
							<a className="dropdown-link">Latest Shows On Apple TV+</a>
						</Link>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default TvDropdown;
