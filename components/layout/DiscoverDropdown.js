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
                background-color: ${theme.palette.primary.main};
                color: #fff;
            }
        `}</style>
    </a>
));

const DiscoverDropdown = () => {
    return (
        <Fragment>
            <Dropdown>
                <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                >
                    Discover
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                    <Link href="/discover/movies" passHref={true}>
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            Discover Movies
                        </Dropdown.Item>
                    </Link>
                    <Link href="/discover/shows" passHref={true}>
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                        >
                            Discover Shows
                        </Dropdown.Item>
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    );
};

export default DiscoverDropdown;
