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
                font-size: 1.7rem;
                padding: 10px 14px;
                border-radius: 3px;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.7);
            }

            .navbar-anchor-link:hover {
                color: #fff;
                background-color: ${theme.palette.primary.main};
            }
        `}</style>
    </a>
));

const TvDropdown = () => {
    return (
        <Fragment>
            <Dropdown>
                <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                >
                    TV
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                    <Link
                        as="/shows/on-the-air"
                        href="/shows/[slug]"
                        passHref={true}
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            TV Shows On Air
                        </Dropdown.Item>
                    </Link>
                    <Link
                        as="/shows/popular"
                        href="/shows/[slug]"
                        passHref={true}
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            Popular Shows
                        </Dropdown.Item>
                    </Link>
                    <Link
                        as="/shows/top-rated"
                        href="/shows/[slug]"
                        passHref={true}
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            Top Rated Shows
                        </Dropdown.Item>
                    </Link>
                    <Link
                        as="/shows/latest-on-netflix"
                        href="/shows/[slug]"
                        passHref={true}
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            Latest Shows On Netflix
                        </Dropdown.Item>
                    </Link>
                    <Link
                        as="/shows/latest-on-apple-tv-plus"
                        href="/shows/[slug]"
                        passHref={true}
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            Latest Shows On Apple TV+
                        </Dropdown.Item>
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    );
};

export default TvDropdown;
