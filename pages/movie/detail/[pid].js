import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MovieIntro from "../../../components/movie/MovieIntro";
import MovieShowCredits from "../../../components/credits/MovieShowCredits";
import MovieShowCard from "../../../components/cards/MovieShowCard";
import MobileDetect from "mobile-detect";
import HeroMovieContainer from "../../../components/containers/HeroMovieContainer";
import CarouselContainer from "../../../components/containers/CarouselContainer";
import theme from "../../../src/theme";
import breakpoints from "../../../src/breakpoints";
import { NextSeo } from "next-seo";
import { v4 as uuidv4 } from "uuid";

const MovieDetail = ({ pid, deviceType }) => {
    const [movieDetails, setMovieDetails] = useState();
    const [movieCredits, setMovieCredits] = useState();
    const [recommendations, setRecommendations] = useState();
    const [genreState, setGenreState] = useState();

    const getMovieDetails = () => {
        const url = `/api/movie/detail/${pid}`;
        axios.get(url).then((res) => {
            setMovieDetails(res.data);
        });
    };

    const getCredits = () => {
        const url = `/api/movie/credits/${pid}`;
        axios.get(url).then((res) => {
            setMovieCredits(res.data);
        });
    };

    const getRecommendations = () => {
        const url = `/api/movie/recommendations/${pid}`;
        axios.get(url).then((res) => {
            let filteredResults = res.data.results;
            filteredResults = filteredResults.filter(
                (cur) => cur.vote_average && cur.poster_path
            );
            setRecommendations(filteredResults);
        });
    };

    const genreAxios = async (index) => {
        try {
            const url = `/api/movie/discover/${movieDetails.genres[index].id}`;
            const res = await axios.get(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const getGenreDetails = async () => {
        if (typeof movieDetails !== "undefined") {
            if (typeof movieDetails.genres !== "undefined") {
                let numberOfGenres;
                if (movieDetails.genres.length > 3) {
                    numberOfGenres = 3;
                } else {
                    numberOfGenres = movieDetails.genres.length;
                }

                let data = [];

                for (let i = 0; i < numberOfGenres; i++) {
                    const returned = await genreAxios(i);
                    let filteredReturn = returned.data.results;
                    filteredReturn = filteredReturn.filter(
                        (cur) => cur.vote_average && cur.poster_path
                    );
                    const newObj = {
                        name: movieDetails.genres[i].name,
                        results: filteredReturn
                    };
                    data.push(newObj);
                }

                setGenreState(data);
            }
        }
    };

    const getGenres = (genresArr) => {
        let genres = [];
        genresArr.forEach((cur, index) => {
            if (index < 5) {
                genres.push(cur);
            }
        });
        return genres;
    };

    const getDirector = (crewArr) => {
        let director = [];
        crewArr.forEach((cur) => {
            if (cur.job === "Director") {
                director.push(cur);
            }
        });
        return director;
    };

    useEffect(() => {
        getMovieDetails();
        getCredits();
        getRecommendations();
    }, [pid]);

    useEffect(() => {
        getGenreDetails();
    }, [movieDetails]);

    return (
        <main>
            {movieDetails && (
                <Fragment>
                    <NextSeo
                        title={movieDetails.title}
                        description={movieDetails.overview.slice(0, 130)}
                        openGraph={{
                            url: `https://www.darklyst.com/movie/detail/${movieDetails.id}`,
                            title: `${movieDetails.title}`,
                            description: `${movieDetails.overview.slice(
                                0,
                                130
                            )}`
                        }}
                    />
                    <MovieIntro
                        movieDetails={movieDetails}
                        getGenres={getGenres}
                    />
                    {movieCredits && (
                        <MovieShowCredits
                            getDirector={getDirector}
                            movieCredits={movieCredits}
                            isShow={false}
                        />
                    )}
                    {movieDetails.videos &&
                        movieDetails.videos.results.length > 0 && (
                            <section className="carousel-section">
                                <div className="carousel-top-bar">
                                    <p className="carousel-top-bar-title">
                                        Trailers, Teasers & Clips
                                    </p>
                                </div>
                                <div className="carousel-container">
                                    <CarouselContainer
                                        deviceType={deviceType}
                                        isSmall={false}
                                    >
                                        {movieDetails.videos.results
                                            .filter(
                                                (current) =>
                                                    current.site.toLowerCase() ===
                                                    "youtube"
                                            )
                                            .map((cur) => {
                                                const thumbnailUrl = `https://i.ytimg.com/vi/${cur.key}/hqdefault.jpg`;
                                                return (
                                                    <HeroMovieContainer
                                                        thumbnailUrl={
                                                            thumbnailUrl
                                                        }
                                                        chosenVideo={cur}
                                                        cur={movieDetails}
                                                        isHero={false}
                                                        isGallery={false}
                                                        key={uuidv4()}
                                                    />
                                                );
                                            })}
                                    </CarouselContainer>
                                </div>
                            </section>
                        )}
                    {movieDetails.images &&
                        movieDetails.images.backdrops.length > 0 && (
                            <section className="carousel-section">
                                <div className="carousel-top-bar">
                                    <p className="carousel-top-bar-title">
                                        Gallery
                                    </p>
                                </div>
                                <div className="carousel-container">
                                    <CarouselContainer
                                        deviceType={deviceType}
                                        isSmall={false}
                                    >
                                        {movieDetails.images.backdrops.map(
                                            (cur) => {
                                                const thumbnailUrl = `https://image.tmdb.org/t/p/w780${cur.file_path}`;
                                                return (
                                                    <HeroMovieContainer
                                                        thumbnailUrl={
                                                            thumbnailUrl
                                                        }
                                                        chosenVideo={cur}
                                                        cur={movieDetails}
                                                        isHero={false}
                                                        isGallery={true}
                                                        key={uuidv4()}
                                                    />
                                                );
                                            }
                                        )}
                                    </CarouselContainer>
                                </div>
                            </section>
                        )}
                    {recommendations && recommendations.length > 0 && (
                        <section className="carousel-section">
                            <div className="carousel-top-bar">
                                <p className="carousel-top-bar-title">
                                    Recommended Movies For You
                                </p>
                            </div>
                            <div className="carousel-container">
                                <CarouselContainer
                                    deviceType={deviceType}
                                    isSmall={true}
                                >
                                    {recommendations.map((cur) => (
                                        <MovieShowCard
                                            key={uuidv4()}
                                            cur={cur}
                                            isShow={false}
                                        />
                                    ))}
                                </CarouselContainer>
                            </div>
                        </section>
                    )}

                    {genreState &&
                        genreState.length > 0 &&
                        genreState.map((current) => {
                            return (
                                <section
                                    className="carousel-section"
                                    key={uuidv4()}
                                >
                                    <div className="carousel-top-bar">
                                        <p className="carousel-top-bar-title">
                                            {current.name} Movies
                                        </p>
                                    </div>
                                    <div className="carousel-container">
                                        <CarouselContainer
                                            deviceType={deviceType}
                                            isSmall={true}
                                        >
                                            {current.results.map((cur) => (
                                                <MovieShowCard
                                                    key={uuidv4()}
                                                    cur={cur}
                                                    isShow={false}
                                                />
                                            ))}
                                        </CarouselContainer>
                                    </div>
                                </section>
                            );
                        })}
                </Fragment>
            )}
            <style jsx>{`
                .carousel-section {
                    width: 70%;
                    margin: 2rem auto;
                }

                .carousel-top-bar {
                    background-color: ${theme.palette.eight.main};
                    border-radius: 10px;
                }

                .carousel-top-bar-title {
                    font-size: 2.6rem;
                    padding: 2rem;
                }

                .carousel-container {
                    margin-top: 2rem;
                }

                @media (max-width: ${breakpoints.sizes.xl}) {
                    .carousel-section {
                        width: 75%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .carousel-section {
                        width: 80%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.md}) {
                    .carousel-section {
                        width: 85%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .carousel-section {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.xs}) {
                    .carousel-section {
                        width: 95%;
                    }
                }
            `}</style>
        </main>
    );
};

MovieDetail.getInitialProps = async ({ query, req }) => {
    const pid = query.pid;
    let userAgent;
    let deviceType;
    if (req) {
        userAgent = req.headers["user-agent"];
    } else {
        userAgent = navigator.userAgent;
    }

    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
        deviceType = "tablet";
    } else if (md.mobile()) {
        deviceType = "mobile";
    } else {
        deviceType = "desktop";
    }

    return { pid, deviceType };
};

export default MovieDetail;
