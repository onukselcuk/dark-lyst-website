import Form from "react-bootstrap/Form";
import { Fragment, useState, useRef } from "react";
import styles from "../styles/searchBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Downshift from "downshift";
import axios from "axios";
import theme from "../src/theme";
import { useRouter } from "next/router";
import Link from "next/link";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import loaderStyles from "../styles/loader.module.css";
import CircularRating from "./icons/CircularRating";
import breakpoints from "../src/breakpoints";

const SearchBox = (props) => {
    const [movies, setMovies] = useState([]);
    const [emptyState, setEmptyState] = useState(true);
    const [loaderState, setLoaderState] = useState(false);
    const router = useRouter();

    const fetchMovies = async (movie) => {
        if (movie && movie.length > 1) {
            try {
                setLoaderState(true);

                const multiUrl = `/api/search/multi/${encodeURIComponent(
                    movie
                )}`;

                const response = await axios.get(multiUrl);
                setLoaderState(false);
                setMovies(response.data.results);
            } catch (error) {
                console.log(error);
            }
        }
    };

    //* Delayed call of search (500ms) using debounce function

    const fetchMoviesDebounced = AwesomeDebouncePromise(fetchMovies, 500);

    const inputOnChange = (e) => {
        if (!e.target.value || e.target.value.length < 1) {
            setLoaderState(false);
            setEmptyState(true);
            return;
        }

        setEmptyState(false);

        fetchMoviesDebounced(e.target.value);
    };

    const getLinkUrls = (current) => {
        let hrefUrl = "/";
        let asUrl = "/";
        switch (current.media_type) {
            case "tv":
                asUrl = `/show/detail/${current.id}`;
                hrefUrl = `/show/detail/[tid]`;
                break;
            case "movie":
                asUrl = `/movie/detail/${current.id}`;
                hrefUrl = `/movie/detail/[pid]`;
                break;
            case "person":
                asUrl = `/person/detail/${current.id}`;
                hrefUrl = `/person/detail/[sid]`;
                break;
            default:
                asUrl = `/`;
                hrefUrl = `/`;
        }

        return {
            hrefUrl,
            asUrl
        };
    };

    const getMediaType = (current) => {
        let mediaType = "";
        switch (current.media_type) {
            case "tv":
                mediaType = "TV Show";
                break;
            case "movie":
                mediaType = "Movie";
                break;
            default:
                mediaType = "";
        }

        return mediaType;
    };
    const inputRef = useRef(null);

    const onStateChange = (changes, stateAndHelpers) => {
        console.log(changes);
        if (changes.type === "__autocomplete_click_item__") {
            stateAndHelpers.clearSelection();
            inputRef.current.blur();
        }
        if (changes.type === "__autocomplete_keydown_enter__") {
            const urls = getLinkUrls(changes.selectedItem);
            console.log("Enter clicked");
            router.push(urls.hrefUrl, urls.asUrl);
            stateAndHelpers.clearSelection();
            inputRef.current.blur();
        }
    };

    return (
        <Fragment>
            <Downshift
                onStateChange={onStateChange}
                itemToString={(item) => (item ? item.title : "")}
            >
                {({
                    selectedItem,
                    getInputProps,
                    getItemProps,
                    highlightedIndex,
                    isOpen,
                    inputValue,
                    getLabelProps
                }) => (
                    <div className="search-container">
                        <Form className={styles.form}>
                            <Form.Group className={styles.searchForm}>
                                <Form.Control
                                    {...getInputProps({
                                        placeholder: "Search...",
                                        onChange: inputOnChange
                                    })}
                                    className={styles.searchInput}
                                    type="text"
                                    ref={inputRef}
                                    value={inputValue || ""}
                                />
                                <FontAwesomeIcon
                                    className={styles.searchIcon}
                                    icon={faSearch}
                                />
                            </Form.Group>
                        </Form>
                        {isOpen && !emptyState && !loaderState ? (
                            <div className="downshift-dropdown">
                                {movies
                                    .filter(
                                        (cur) =>
                                            cur.poster_path || cur.profile_path
                                    )
                                    .slice(0, 10)
                                    .map((item, index) => {
                                        const url = `https://image.tmdb.org/t/p/w45${
                                            item.profile_path ||
                                            item.poster_path
                                        }`;
                                        let year = null;
                                        if (
                                            item.media_type !== "person" &&
                                            (item.first_air_date ||
                                                item.release_date)
                                        ) {
                                            year =
                                                item.first_air_date ||
                                                item.release_date;
                                            year = year.slice(0, 4);
                                        }

                                        let links = {};

                                        links = getLinkUrls(item);

                                        let mediaType = getMediaType(item);

                                        return (
                                            <Link
                                                href={links.hrefUrl}
                                                as={links.asUrl}
                                            >
                                                <a className="dropdown-item-link">
                                                    <div
                                                        className="dropdown-item"
                                                        {...getItemProps({
                                                            key: index,
                                                            index,
                                                            item
                                                        })}
                                                        style={{
                                                            backgroundColor:
                                                                highlightedIndex ===
                                                                index
                                                                    ? theme
                                                                          .palette
                                                                          .eight
                                                                          .main
                                                                    : theme
                                                                          .palette
                                                                          .primary
                                                                          .main,
                                                            fontWeight:
                                                                selectedItem ===
                                                                item
                                                                    ? "bold"
                                                                    : "normal"
                                                        }}
                                                    >
                                                        <div className="media-image-container">
                                                            <img
                                                                className="media-image"
                                                                src={url}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-container">
                                                            <p>
                                                                <span className="media-name">
                                                                    {item.title ||
                                                                        item.name}
                                                                </span>
                                                                {year && (
                                                                    <span>
                                                                        {" "}
                                                                        - {
                                                                            year
                                                                        }{" "}
                                                                    </span>
                                                                )}
                                                            </p>
                                                            {mediaType && (
                                                                <p>
                                                                    {mediaType}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {item.vote_average &&
                                                        item.vote_average >
                                                            2 ? (
                                                            <div className="rating-container">
                                                                <CircularRating
                                                                    rating={
                                                                        item.vote_average
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </a>
                                            </Link>
                                        );
                                    })}
                            </div>
                        ) : loaderState ? (
                            <div className="loader-container">
                                <div className={loaderStyles.loader}>
                                    Loading...
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </Downshift>
            <style jsx>{`
                .search-container {
                    position: relative;
                    width: 35%;
                    margin: 0 1rem;
                }

                .downshift-dropdown {
                    position: absolute;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    overflow: hidden;
                    top: 40px;
                    left: 0;
                    z-index: 10;
                    background-color: ${theme.palette.primary.main};
                    width: 100%;
                }

                .dropdown-item-link {
                    text-decoration: none;
                }

                .dropdown-item {
                    color: white;
                    display: flex;
                    width: 100%;
                    height: 80px;
                    transition: all 300ms ease;
                    cursor: pointer;
                    border-bottom: 1px solid ${theme.palette.fourth.main};
                }

                .media-image-container {
                    display: flex;
                    align-items: center;
                }

                .info-container {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    padding: 1rem;
                    padding-left: 2rem;
                    margin-right: auto;
                }

                .media-name {
                    font-weight: bold;
                }

                .rating-container {
                    width: 10%;
                    display: flex;
                    align-items: center;
                }

                .loader-container {
                    position: absolute;
                    top: 50px;
                    left: 0;
                    z-index: 10;
                    width: 100%;
                    background-color: ${theme.palette.primary.main};
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .search-container {
                        width: 60%;
                    }
                }
            `}</style>
        </Fragment>
    );
};

export default SearchBox;
