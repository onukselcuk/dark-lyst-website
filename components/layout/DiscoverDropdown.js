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

const DiscoverDropdown = () => {
	return (
		<Fragment>
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
					Discover
				</Dropdown.Toggle>

				<Dropdown.Menu className={styles.dropdownMenu}>
					<Dropdown.Item as="div" className={styles.dropdownItem} eventKey="1">
						<Link href="/discover/movies">
							<a className="dropdown-link">Discover Movies</a>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item as="div" className={styles.dropdownItem} eventKey="2">
						<Link href="/discover/shows">
							<a className="dropdown-link">Discover Shows</a>
						</Link>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default DiscoverDropdown;
