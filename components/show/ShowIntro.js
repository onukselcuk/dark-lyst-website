import { Fragment } from "react";
import CircularRating from "../icons/CircularRating";
import HeartIcon from "../icons/HeartIcon";
import { toggleShowHeart } from "../../store/actions/showActions";
import { connect } from "react-redux";
import breakpoints from "../../src/breakpoints";

const ShowIntro = ({ showDetails, getGenres, showList, toggleShowHeart }) => {
    const filterProduction = (prodArr) => {
        return prodArr.filter((cur) => cur.logo_path !== null);
    };

    const filteredProduction = filterProduction(
        showDetails.networks || showDetails.production_companies
    ).slice(0, 4);

    const hour =
        Math.floor(showDetails.episode_run_time / 60) > 0
            ? Math.floor(showDetails.episode_run_time / 60)
            : false;
    const minutes =
        showDetails.episode_run_time % 60 > 0
            ? showDetails.episode_run_time % 60
            : false;

    const imageUrlPath = showDetails.backdrop_path
        ? showDetails.backdrop_path
        : showDetails.images.backdrops[0]
        ? showDetails.images.backdrops[0].file_path
        : null;

    const origin_countries = showDetails.origin_country.slice(0, 3);

    const seasonNum =
        showDetails.number_of_seasons > 0
            ? showDetails.number_of_seasons
            : null;
    const episodeNum =
        showDetails.number_of_episodes > 0
            ? showDetails.number_of_episodes
            : null;

    const genresList = getGenres(showDetails.genres);

    let isLiked;

    if (showDetails) {
        isLiked = showList.some((current) => current.tmdbId === showDetails.id);
    }

    const handleHeart = (e) => {
        e.preventDefault();
        toggleShowHeart(showDetails, !isLiked);
    };

    return (
        <Fragment>
            <section className="show-hero-section" />
            <section className="show-detail-section">
                <div className="show-poster-container">
                    <img
                        className="show-poster"
                        src={`https://image.tmdb.org/t/p/w342${showDetails.poster_path}`}
                        alt={`${showDetails.name} Poster Image`}
                    />
                </div>
                <div className="show-detail-container">
                    <h1 className="show-title">{showDetails.name}</h1>
                    <div className="rating-favorite-container">
                        <div className="rating-container">
                            <CircularRating rating={showDetails.vote_average} />
                        </div>
                        <div onClick={handleHeart} className="heart-container">
                            <HeartIcon detail={true} isLiked={isLiked} />
                        </div>
                    </div>
                    <div className="show-info-container">
                        <span className="show-small-info">TV Show</span>
                        <span className="show-small-info">
                            {showDetails.first_air_date.slice(0, 4)}
                            {!showDetails.in_production
                                ? ` - ${showDetails.last_air_date.slice(0, 4)}`
                                : " "}
                        </span>
                        <span className="show-small-info">
                            {seasonNum && `${seasonNum} Seasons`}
                        </span>
                        <span className="show-small-info">
                            {episodeNum && `${episodeNum} Episodes`}
                        </span>
                        <div className="genres-list">
                            {genresList.map((cur, index) => {
                                return (
                                    <span key={cur.id} className="genre-link">
                                        {cur.name}
                                        {index + 1 < genresList.length && ","}
                                    </span>
                                );
                            })}
                        </div>
                        {(hour || minutes) && (
                            <span className="show-small-info">
                                {hour && `${hour}h`} {minutes && `${minutes}m`}
                            </span>
                        )}

                        {showDetails.origin_country && (
                            <span className="show-small-info">
                                {origin_countries.map((cur, index) => {
                                    return (
                                        <span className="production-country-abbr">
                                            {cur}
                                            {index + 1 <
                                                origin_countries.length && ", "}
                                        </span>
                                    );
                                })}
                            </span>
                        )}
                    </div>
                    <p className="show-overview">{showDetails.overview}</p>
                    {filteredProduction && filteredProduction.length > 0 && (
                        <div className="production-companies-container">
                            {filteredProduction.map((cur) => {
                                return (
                                    <div className="production-company-container">
                                        <img
                                            className="production-company-logo"
                                            src={`https://image.tmdb.org/t/p/w200${cur.logo_path}`}
                                            alt={`${cur.name} Logo`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <style jsx>{`
                .show-hero-section {
                    width: 100%;
                    height: 70vh;
                    background-image: ${showDetails
                        ? `linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, .8) 10%, transparent 60%),  url("https://image.tmdb.org/t/p/original${imageUrlPath}")`
                        : null};
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: 50% 25%;
                }

                .show-detail-section {
                    width: 70%;
                    margin: 0 auto;
                    margin-top: -10rem;
                    display: flex;
                }

                .show-poster-container {
                    width: 25%;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .show-poster {
                    width: 100%;
                    border-radius: 10px;
                }

                .show-detail-container {
                    width: 75%;
                    padding: 4rem 3rem;
                }

                .show-title {
                    font-size: 4rem;
                }

                .rating-favorite-container {
                    margin: 3rem 0;
                    display: flex;
                    align-items: center;
                }

                .rating-container {
                    width: 70px;
                    height: 70px;
                    margin-right: 3rem;
                }

                .heart-container {
                    width: 50px;
                    height: 50px;
                    transition: all 400ms;
                }

                .show-info-container {
                    display: flex;
                    align-items: center;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }

                .show-small-info {
                    font-size: 1.8rem;
                    margin-bottom: 0;
                    margin-right: 1.5rem;
                }

                .genres-list {
                    display: flex;
                    margin-right: 1.8rem;
                }

                .genre-link {
                    color: white;
                    font-size: 1.8rem;
                }

                .genre-link:not(:last-of-type) {
                    margin-right: 4px;
                }

                .show-overview {
                    margin-top: 1rem;
                    font-size: 1.9rem;
                }
                .production-companies-container {
                    display: flex;
                    align-items: center;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                }

                .production-company-container {
                    margin-right: 1rem;
                    margin-bottom: 1.5rem;
                }

                .production-company-logo {
                    height: 40px;
                    transition: all ease-in-out 200ms;
                    filter: grayscale(30%) invert(40%);
                    max-width: 100%;
                }

                .production-company-logo:hover {
                    filter: none;
                }

                @media (max-width: ${breakpoints.sizes.xl}) {
                    .show-detail-section {
                        width: 75%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .show-detail-section {
                        width: 80%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.md}) {
                    .show-detail-section {
                        width: 85%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .show-detail-section {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.sm}) {
                    .show-hero-section {
                        display: none;
                    }
                    .show-detail-section {
                        flex-direction: column;
                        margin-top: 0;
                        align-items: center;
                        justify-content: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: 50% 25%;
                        width: 100%;
                        min-height: calc(100vh - 75px);
                        background-image: ${showDetails
                            ? `linear-gradient(to top, rgba(0, 0, 0, .8),rgba(0, 0, 0, .8)),  url("https://image.tmdb.org/t/p/original${imageUrlPath}")`
                            : null};
                    }

                    .show-poster-container {
                        width: 90%;
                        margin-top: 1rem;
                    }
                    .show-poster {
                        width: 45%;
                    }

                    .show-detail-container {
                        padding: 4rem 0;
                        width: 90%;
                    }

                    .show-title {
                        font-size: 3rem;
                    }

                    .rating-container {
                        width: 50px;
                        height: 50px;
                    }

                    .heart-container {
                        width: 40px;
                        height: 40px;
                    }
                }
                @media (max-width: ${breakpoints.sizes.xs}) {
                    .show-detail-container,
                    .show-poster-container {
                        width: 95%;
                    }
                }
            `}</style>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        showList: state.shows.showList
    };
};

export default connect(mapStateToProps, { toggleShowHeart })(ShowIntro);
