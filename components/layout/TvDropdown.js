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
					<Link as="/shows/on-the-air" href="/shows/[slug]" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey="1">
							TV Shows On Air
						</Dropdown.Item>
					</Link>
					<Link as="/shows/popular" href="/shows/[slug]" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey="2">
							Popular Shows
						</Dropdown.Item>
					</Link>
					<Link as="/shows/top-rated" href="/shows/[slug]" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey="3">
							Top Rated Shows
						</Dropdown.Item>
					</Link>
					<Link as="/shows/latest-on-netflix" href="/shows/[slug]" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey="4">
							Latest Shows On Netflix
						</Dropdown.Item>
					</Link>
					<Link as="/shows/latest-on-apple-tv-plus" href="/shows/[slug]" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey="5">
							Latest Shows On Apple TV+
						</Dropdown.Item>
					</Link>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default TvDropdown;
