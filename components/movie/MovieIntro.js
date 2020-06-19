import { Fragment } from "react";
import CircularRating from "../icons/CircularRating";
import HeartIcon from "../icons/HeartIcon";
import { connect } from "react-redux";
import { toggleMovieHeart } from "../../store/actions/movieActions";
import breakpoints from "../../src/breakpoints";

const MovieIntro = ({
    movieDetails,
    getGenres,
    toggleMovieHeart,
    movieList
}) => {
    const filterProduction = (prodArr) => {
        return prodArr.filter((cur) => cur.logo_path !== null);
    };

    const filteredProduction = filterProduction(
        movieDetails.production_companies
    ).slice(0, 4);

    const hour =
        Math.floor(movieDetails.runtime / 60) > 0
            ? Math.floor(movieDetails.runtime / 60)
            : false;
    const minutes =
        movieDetails.runtime % 60 > 0 ? movieDetails.runtime % 60 : false;

    const imageUrlPath = movieDetails.backdrop_path
        ? movieDetails.backdrop_path
        : movieDetails.images.backdrops[0]
        ? movieDetails.images.backdrops[0].file_path
        : null;

    const prod_countries = movieDetails.production_countries.slice(0, 3);

    const genresList = getGenres(movieDetails.genres);

    let isLiked;

    if (movieDetails) {
        isLiked = movieList.some(
            (current) => current.tmdbId === movieDetails.id
        );
    }

    const handleHeart = (e) => {
        e.preventDefault();
        toggleMovieHeart(movieDetails, !isLiked);
    };

    return (
        <Fragment>
            <section className="movie-hero-section" />
            <section className="movie-detail-section">
                <div className="movie-poster-container">
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
                        alt={`${movieDetails.title} Poster Image`}
                    />
                </div>
                <div className="movie-detail-container">
                    <h1 className="movie-title">{movieDetails.title}</h1>
                    <div className="rating-favorite-container">
                        <div className="rating-container">
                            <CircularRating
                                rating={movieDetails.vote_average}
                            />
                        </div>
                        <div onClick={handleHeart} className="heart-container">
                            <HeartIcon isLiked={isLiked} detail={true} />
                        </div>
                    </div>
                    <div className="movie-info-container">
                        <p className="movie-year">
                            {" "}
                            {movieDetails.release_date.slice(0, 4)}{" "}
                        </p>
                        <div className="genres-list">
                            {genresList.map((cur, index) => {
                                return (
                                    <span className="genre-link" key={cur.id}>
                                        {cur.name}
                                        {index + 1 < genresList.length && ","}
                                    </span>
                                );
                            })}
                        </div>
                        <p className="movie-runtime">
                            {hour && `${hour}h`} {minutes && `${minutes}m`}
                        </p>
                        {movieDetails.production_countries && (
                            <p className="production-countries">
                                {prod_countries.map((cur, index) => {
                                    return (
                                        <span className="production-country-abbr">
                                            {cur.iso_3166_1}
                                            {index + 1 <
                                                prod_countries.length && ", "}
                                        </span>
                                    );
                                })}
                            </p>
                        )}
                    </div>
                    <p className="movie-overview">{movieDetails.overview}</p>
                    {filteredProduction && filteredProduction.length > 0 && (
                        <div className="production-companies-container">
                            {filteredProduction.map((cur) => {
                                return (
                                    <div className="production-company-container">
                                        <img
                                            className="production-company-logo"
                                            src={`https://image.tmdb.org/t/p/w200${cur.logo_path}`}
                                            alt={`${cur.name} Company Logo`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <style jsx>{`
                .movie-hero-section {
                    width: 100%;
                    height: 70vh;
                    background-image: ${movieDetails
                        ? `linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, .8) 10%, transparent 60%),  url("https://image.tmdb.org/t/p/original${imageUrlPath}")`
                        : null};
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: 50% 25%;
                }

                .movie-detail-section {
                    width: 70%;
                    margin: 0 auto;
                    margin-top: -10rem;
                    display: flex;
                }

                .movie-poster-container {
                    width: 25%;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .movie-poster {
                    width: 100%;
                    border-radius: 10px;
                }

                .movie-detail-container {
                    width: 75%;
                    padding: 4rem 3rem;
                }

                .movie-title {
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

                .movie-info-container {
                    display: flex;
                    align-items: center;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }

                .movie-year {
                    font-size: 1.8rem;
                    margin-right: 1.5rem;
                    margin-bottom: 0;
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

                .movie-runtime {
                    font-size: 1.8rem;
                    margin-bottom: 0;
                    margin-right: 1.5rem;
                }

                .production-countries {
                    margin-bottom: 0;
                }

                .movie-overview {
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
                    margin-right: 1.5rem;
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
                    .movie-detail-section {
                        width: 75%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .movie-detail-section {
                        width: 80%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.md}) {
                    .movie-detail-section {
                        width: 85%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .movie-detail-section {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.sm}) {
                    .movie-hero-section {
                        display: none;
                    }
                    .movie-detail-section {
                        flex-direction: column;
                        margin-top: 0;
                        justify-content: center;
                        align-items: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: 50% 25%;
                        width: 100%;
                        min-height: calc(100vh - 75px);
                        background-image: ${movieDetails
                            ? `linear-gradient(to top, rgba(0, 0, 0, .8),rgba(0, 0, 0, .8)),  url("https://image.tmdb.org/t/p/original${imageUrlPath}")`
                            : null};
                    }
                    .movie-poster-container {
                        width: 90%;
                        margin-top: 1rem;
                    }

                    .movie-poster {
                        width: 45%;
                    }

                    .movie-detail-container {
                        padding: 4rem 0;
                        width: 90%;
                    }

                    .movie-title {
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
                    .movie-detail-container,
                    .movie-poster-container {
                        width: 95%;
                    }
                }
            `}</style>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        movieList: state.movies.movieList
    };
};

export default connect(mapStateToProps, { toggleMovieHeart })(MovieIntro);
