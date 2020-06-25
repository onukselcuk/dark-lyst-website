import React, { Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import theme from "../../src/theme";
import { useRouter } from "next/router";
import styles from "../../styles/navDropDownStyles.module.css";
import { v4 as uuidv4 } from "uuid";
import ActiveLink from "./ActiveLink";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    const router = useRouter();
    return (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`navbar-anchor-link ${
                /^\/discover/.test(router.pathname)
                    ? "navbar-link-item-active"
                    : null
            } `}
        >
            {children}
            <style jsx>{`
                .navbar-anchor-link {
                    text-decoration: none;
                    color: rgba(255, 255, 255, 0.7);
                    border-radius: 5px;
                    padding: 10px 14px;
                    cursor: pointer;
                    font-size: 1.7rem;
                    transition: all ease-in-out 200ms;
                    margin: 0 5px;
                }

                .navbar-anchor-link:hover,
                .navbar-link-item-active {
                    background-color: rgba(255, 255, 255, 0.5);
                    color: ${theme.palette.primary.main};
                }
            `}</style>
        </a>
    );
});

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
                    <ActiveLink
                        href="/discover/movies"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            Discover Movies
                        </Dropdown.Item>
                    </ActiveLink>
                    <ActiveLink
                        href="/discover/shows"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            Discover Shows
                        </Dropdown.Item>
                    </ActiveLink>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    );
};

export default DiscoverDropdown;
