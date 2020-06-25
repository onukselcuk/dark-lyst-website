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
                router.pathname === "/shows/[slug]"
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
                    <ActiveLink
                        as="/shows/on-the-air"
                        activeLinkSlug="/shows/on-the-air"
                        href="/shows/[slug]"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            TV Shows On Air
                        </Dropdown.Item>
                    </ActiveLink>
                    <ActiveLink
                        as="/shows/popular"
                        activeLinkSlug="/shows/popular"
                        href="/shows/[slug]"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            Popular Shows
                        </Dropdown.Item>
                    </ActiveLink>
                    <ActiveLink
                        as="/shows/top-rated"
                        activeLinkSlug="/shows/top-rated"
                        href="/shows/[slug]"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            Top Rated Shows
                        </Dropdown.Item>
                    </ActiveLink>
                    <ActiveLink
                        as="/shows/latest-on-netflix"
                        activeLinkSlug="/shows/latest-on-netflix"
                        href="/shows/[slug]"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            Latest Shows On Netflix
                        </Dropdown.Item>
                    </ActiveLink>
                    <ActiveLink
                        as="/shows/latest-on-apple-tv-plus"
                        activeLinkSlug="/shows/latest-on-apple-tv-plus"
                        href="/shows/[slug]"
                        passHref={true}
                        activeClassName="navbar-link-item-active"
                    >
                        <Dropdown.Item
                            className={styles.dropdownItem}
                            eventKey={uuidv4()}
                            active={false}
                        >
                            Latest Shows On Apple TV+
                        </Dropdown.Item>
                    </ActiveLink>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    );
};

export default TvDropdown;
