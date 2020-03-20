import React, { useState, Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import theme from "../../src/theme";
import Link from "next/link";
import styles from "../../styles/navDropDownStyles.module.css";
import { v4 as uuidv4 } from "uuid";

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
					<Link href="/movies/[slug]" as="/movies/now-playing" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey={uuidv4()}>
							Movies Now Playing In Theaters
						</Dropdown.Item>
					</Link>
					<Link href="/movies/[slug]" as="/movies/popular" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey={uuidv4()}>
							Popular Movies
						</Dropdown.Item>
					</Link>
					<Link href="/movies/[slug]" as="/movies/top-rated" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey={uuidv4()}>
							Top Rated Movies
						</Dropdown.Item>
					</Link>
					<Link href="/movies/[slug]" as="/movies/upcoming" passHref={true}>
						<Dropdown.Item className={styles.dropdownItem} eventKey={uuidv4()}>
							Upcoming Movies
						</Dropdown.Item>
					</Link>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default MovieDropdown;
