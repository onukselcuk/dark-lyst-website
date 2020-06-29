import theme from "../../src/theme";
import Link from "next/link";
import { useState, useEffect } from "react";
import CircularRating from "../icons/CircularRating";
import HeartIcon from "../icons/HeartIcon";
import { connect } from "react-redux";
import { toggleMovieHeart } from "../../store/actions/movieActions";
import { toggleShowHeart } from "../../store/actions/showActions";
import breakpoints from "../../src/breakpoints";
import VisibilitySensor from "react-visibility-sensor";

const MovieLargeCard = ({
    current,
    isShow,
    movieList,
    showList,
    toggleMovieHeart,
    toggleShowHeart
}) => {
    let title = current.title || current.name || "";

    let year =
        current.release_date ||
        current.first_air_date ||
        current.releaseDate ||
        current.firstAirDate ||
        "";
    year = year.slice(0, 4);

    let hrefUrl = "";
    let asUrl = "";

    if (isShow) {
        hrefUrl = `/show/detail/[title]/[tid]`;
        asUrl = `/show/detail/${encodeURIComponent(
            title.toLowerCase().replace(/\W+/g, "-")
        )}/${current.id || current.tmdbId}`;
    } else {
        hrefUrl = `/movie/detail/[title]/[pid]`;
        asUrl = `/movie/detail/${encodeURIComponent(
            title.toLowerCase().replace(/\W+/g, "-")
        )}/${current.id || current.tmdbId}`;
    }

    let overview = current.overview || false;

    if (overview && overview.length > 180) {
        overview = `${overview.slice(0, 180)}...`;
    }

    let numOfVotes = current.vote_count || current.voteCount || false;

    let isLiked;
    if (current) {
        if (isShow) {
            isLiked = showList.some(
                (cur) => cur.tmdbId === (current.id || current.tmdbId)
            );
        } else {
            isLiked = movieList.some(
                (cur) => cur.tmdbId === (current.id || current.tmdbId)
            );
        }
    }

    let backdropPath = current.backdrop_path || current.backdropPath;

    const handleHeart = (e) => {
        e.preventDefault();
        if (isShow) {
            toggleShowHeart(current, !isLiked);
        } else {
            toggleMovieHeart(current, !isLiked);
        }
    };

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
    }, [current]);

    return (
        <Link href={hrefUrl} as={asUrl}>
            <a className="movie-link">
                <VisibilitySensor
                    onChange={onVisibilityChange}
                    partialVisibility={true}
                    active={!isVisibleState}
                >
                    <div
                        className="movie-large-card-container"
                        style={{
                            opacity: isVisibleState && imageLoadedState ? 1 : 0,
                            transition: "opacity 400ms ease-in"
                        }}
                    >
                        <div className="poster-image-container">
                            {isVisibleState && (
                                <img
                                    className="poster-image"
                                    src={`https://image.tmdb.org/t/p/w300${
                                        current.poster_path ||
                                        current.posterPath
                                    }`}
                                    alt=""
                                    onLoad={setImageLoaded}
                                    onLoadStart={setImageLoadStart}
                                />
                            )}
                        </div>
                        <div className="movie-info-container">
                            <h2 className="movie-title">{title}</h2>
                            <p className="movie-year-votes">
                                {year}
                                {numOfVotes && ` - ${numOfVotes} Votes`}
                            </p>
                            <p className="movie-overview">{overview}</p>
                            <div className="action-container">
                                <div className="rating-container">
                                    <CircularRating
                                        rating={
                                            current.vote_average ||
                                            current.voteAverage
                                        }
                                    />
                                </div>
                                <div
                                    onClick={handleHeart}
                                    className="heart-container"
                                >
                                    <HeartIcon
                                        isLiked={isLiked}
                                        detail={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </VisibilitySensor>
                <style jsx>{`
                .movie-link{
                    text-decoration: none;
                    color:white;
                }
				.movie-large-card-container {
					width: 100%;
					border-radius: 20px;
					display: flex;
                    height: 100%;
					overflow: hidden;
					align-items:center;
                    background-image: linear-gradient(rgba(0,0,0,.9),rgba(0,0,0,.9)) ,url("https://image.tmdb.org/t/p/w500${backdropPath}");
                    background-repeat: no-repeat;
                    background-color: ${theme.palette.eight.main};
                    background-size: cover;
                    transition: all 300ms ease;
					position: relative;
				}

                .movie-large-card-container:hover{
                   box-shadow: 10px 10px 5px -4px rgba(0,0,0,0.4);
                   transform: translateY(-1px);
                }


                .movie-large-card-container:hover .poster-image{
                    filter:brightness(.8)
                }

				.poster-image-container {
					width: 30%;
					min-width:140px;
				}

				.poster-image {
					width: 100%;
                    transition: all 300ms ease;
				}
				.movie-info-container {
					width: 70%;
					padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
				}

                .movie-title{
                    width: 70%;
                    margin-bottom: .7rem;
					font-weight: 700;
                }

                .movie-year-votes{
                    margin-bottom: 1rem;
                }

                .action-container{
                    position: absolute;
                    top:3%;
                    right: 3%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .rating-container{                    
                    width: 15%;
                    height: 15%;
                    margin:1rem;
                }

                .heart-container{
                    width: 8%;
                    height: 8%;
                    margin:1rem;        
                }

				@media (max-width:${breakpoints.sizes.mdsm}){
					.rating-container{                    
                    width: 10%;
                    height: 10%;
                    }
				}
				
				@media (max-width:${breakpoints.sizes.sm}){
					.rating-container{                    
                    width: 15%;
                    height: 15%;
                    }
				}
				
				@media (max-width:${breakpoints.sizes.xxs}){
					.rating-container{                    
                    width: 10%;
                    height: 10%;
                    }
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

export default connect(mapStateToProps, { toggleMovieHeart, toggleShowHeart })(
    MovieLargeCard
);
