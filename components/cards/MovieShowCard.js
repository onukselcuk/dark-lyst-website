import { Fragment, useState, useEffect } from "react";
import HeartIcon from "../icons/HeartIcon";
import Link from "next/link";
import CircularRating from "../icons/CircularRating";
import { connect } from "react-redux";
import { toggleMovieHeart } from "../../store/actions/movieActions";
import { toggleShowHeart } from "../../store/actions/showActions";
import VisibilitySensor from "react-visibility-sensor";

const MovieShowCard = ({
    cur,
    isHero,
    isShow,
    isProfile,
    movieList,
    showList,
    toggleMovieHeart,
    toggleShowHeart,
    visibilityContainment
}) => {
    const url = `https://image.tmdb.org/t/p/${isHero ? "w342" : "w300"}${
        cur.poster_path
    }`;
    let title = cur.name || cur.title;
    if (title.length > 25) {
        title = `${title.slice(0, 25)}...`;
    }
    let link;
    if (isShow) {
        link = `/show/detail/[tid]`;
    } else if (!isShow) {
        link = `/movie/detail/[pid]`;
    }
    let asLink;
    if (isShow) {
        asLink = `/show/detail/${cur.id}`;
    } else if (!isShow) {
        asLink = `/movie/detail/${cur.id}`;
    }

    let isLiked;

    if (isShow) {
        isLiked = showList.some((current) => current.tmdbId === cur.id);
    } else if (!isShow) {
        isLiked = movieList.some((current) => current.tmdbId === cur.id);
    }

    const handleHeart = (e) => {
        e.preventDefault();
        if (isShow) {
            toggleShowHeart(cur, !isLiked);
        } else if (!isShow) {
            toggleMovieHeart(cur, !isLiked);
        }
    };

    let date;

    if (isProfile) {
        date = cur.release_date || cur.first_air_date;
        date = date ? date.slice(0, 4) : "";
    }

    const [isVisibleState, setIsVisibleState] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisibleState !== true) {
            setIsVisibleState(isVisible);
        }
    };

    const [imageLoadedState, setImageLoadedState] = useState(false);

    const setImageLoaded = () => {
        setImageLoadedState(true);
    };

    const setImageLoadStart = () => {
        setImageLoadedState(false);
    };

    useEffect(() => {
        return () => {
            setIsVisibleState(false);
        };
    }, [cur]);

    return (
        <Link key={url} href={link} as={asLink}>
            <a className="container-link">
                <VisibilitySensor
                    onChange={onVisibilityChange}
                    partialVisibility={!isHero}
                    active={!isVisibleState}
                    containment={visibilityContainment}
                >
                    <div
                        className="tv-show-container"
                        style={{
                            opacity:
                                (isVisibleState || isHero) && imageLoadedState
                                    ? 1
                                    : 0,
                            transition: "opacity 400ms ease-in"
                        }}
                    >
                        <div className="top-backdrop" />

                        {isVisibleState && (
                            <img
                                className="show-poster-image"
                                src={url}
                                alt={`${cur.name || cur.title} Poster Image`}
                                onLoad={setImageLoaded}
                                onLoadStart={setImageLoadStart}
                            />
                        )}

                        <div className="bottom-backdrop" />
                        <div className="bottom-info-container">
                            <div className="rating-container">
                                <CircularRating rating={cur.vote_average} />
                            </div>
                            <div className="bottom-detail-container">
                                <span className="show-name">{title}</span>
                                {isProfile && (
                                    <Fragment>
                                        <p>
                                            <span>{date}</span>{" "}
                                            <span>
                                                {isShow ? "TV Show" : "Movie"}
                                            </span>
                                        </p>
                                        {isShow ? (
                                            <Fragment>
                                                <p>
                                                    <span>
                                                        {cur.job ||
                                                            cur.character}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span>
                                                        {cur.episode_count}{" "}
                                                        Episode
                                                        {cur.episode_count >
                                                            1 && "s"}
                                                    </span>
                                                </p>
                                            </Fragment>
                                        ) : (
                                            <p>
                                                <span>
                                                    {cur.job || cur.character}
                                                </span>
                                            </p>
                                        )}
                                    </Fragment>
                                )}
                            </div>
                        </div>

                        <div onClick={handleHeart} className="heart-container">
                            <HeartIcon isLiked={isLiked} />
                        </div>
                    </div>
                </VisibilitySensor>
                <style jsx>{`
                    .container-link {
                        text-decoration: none;
                        color: #fff;
                    }

                    .container-link:active,
                    .container-link:focus,
                    .container-link:visited {
                        text-decoration: none;
                        color: #fff;
                    }

                    .tv-show-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: relative;
                        width: 95%;
                        height: 100%;
                        border-radius: 10px;
                        overflow: hidden;
                        margin: 0 auto;
                    }

                    .show-poster-image {
                        width: 100%;
                        height: 80%;
                    }

                    .top-backdrop {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 35%;
                        background-image: linear-gradient(
                            to bottom,
                            rgba(0, 0, 0, 0.7),
                            transparent
                        );
                        opacity: 0;
                        transition: all 400ms;
                    }
                    .tv-show-container:hover .top-backdrop {
                        opacity: 1;
                    }

                    .bottom-backdrop {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 35%;
                        background-image: linear-gradient(
                            to top,
                            rgba(0, 0, 0, 0.7),
                            transparent
                        );
                        opacity: 0;
                        transition: all 400ms;
                    }
                    .tv-show-container:hover .bottom-backdrop {
                        opacity: 1;
                    }

                    .bottom-info-container {
                        width: 100%;
                        height: 20%;
                        background-color: rgba(0, 0, 0, 0.2);
                        display: flex;
                        align-items: center;
                        padding: 0.5rem 0.5rem;
                        z-index: 10;
                    }

                    .rating-container {
                        width: 25%;
                        height: 80%;
                        z-index: 10;
                        opacity: 1;
                        margin: 0 1.5rem 0 1rem;
                        transition: all 400ms;
                        display: flex;
                        align-items: center;
                        ${isHero && "width:60px; height:60px;"};
                    }

                    .bottom-detail-container {
                        width: 75%;
                    }

                    .bottom-detail-container p {
                        margin-bottom: 0;
                    }

                    .show-name {
                        width: 70%;
                        color: #fff;
                        font-weight: bold;
                        transition: all 400ms;
                        font-size: 1.7rem;
                        z-index: 10;
                        ${isHero && "font-size:2rem;"};
                    }

                    .heart-container {
                        width: 35px;
                        height: 35px;
                        position: absolute;
                        top: 2%;
                        right: 7%;
                        z-index: 10;
                        opacity: 1;
                        transition: all 400ms;
                    }

                    .show-poster-image {
                        width: 100%;
                    }
                `}</style>
            </a>
        </Link>
    );
};

const mapStateToProps = (state) => {
    return {
        movieList: state.movies.movieList,
        showList: state.shows.showList
    };
};

export { MovieShowCard };

export default connect(mapStateToProps, { toggleMovieHeart, toggleShowHeart })(
    MovieShowCard
);
