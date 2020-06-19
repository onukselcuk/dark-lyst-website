import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ShowIntro from "../../../components/show/ShowIntro";
import MovieShowCredits from "../../../components/credits/MovieShowCredits";
import MovieShowCard from "../../../components/cards/MovieShowCard";
import MobileDetect from "mobile-detect";
import HeroMovieContainer from "../../../components/containers/HeroMovieContainer";
import CarouselContainer from "../../../components/containers/CarouselContainer";
import theme from "../../../src/theme";
import breakpoints from "../../../src/breakpoints";
import { NextSeo } from "next-seo";

const ShowDetail = ({ tid, deviceType }) => {
    const [showDetails, setShowDetails] = useState();
    const [showCredits, setShowCredits] = useState();
    const [recommendations, setRecommendations] = useState();
    const [genreState, setGenreState] = useState();

    const getShowDetails = () => {
        const url = `/api/show/detail/${tid}`;
        axios.get(url).then((res) => {
            setShowDetails(res.data);
        });
    };

    const getCredits = () => {
        const url = `/api/show/credits/${tid}`;
        axios.get(url).then((res) => {
            setShowCredits(res.data);
        });
    };

    const getRecommendations = () => {
        const url = `/api/show/recommendations/${tid}`;
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
            const url = `/api/show/discover/${showDetails.genres[index].id}`;
            const res = await axios.get(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const getGenreDetails = async () => {
        if (typeof showDetails !== "undefined") {
            if (typeof showDetails.genres !== "undefined") {
                let numberOfGenres;
                if (showDetails.genres.length > 3) {
                    numberOfGenres = 3;
                } else {
                    numberOfGenres = showDetails.genres.length;
                }

                let data = [];

                for (let i = 0; i < numberOfGenres; i++) {
                    const returned = await genreAxios(i);
                    let filteredReturn = returned.data.results;
                    filteredReturn = filteredReturn.filter(
                        (cur) => cur.vote_average && cur.poster_path
                    );
                    const newObj = {
                        name: showDetails.genres[i].name,
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
        getShowDetails();
        getCredits();
        getRecommendations();
    }, [tid]);

    useEffect(() => {
        getGenreDetails();
    }, [showDetails]);

    return (
        <main>
            {showDetails && (
                <Fragment>
                    <NextSeo
                        title={showDetails.name}
                        description={showDetails?.overview.slice(0, 130)}
                        openGraph={{
                            url: `https://www.darklyst.com/show/detail/${showDetails.id}`,
                            title: `${showDetails.name}`,
                            description: `${showDetails?.overview.slice(
                                0,
                                130
                            )}`
                        }}
                    />
                    <ShowIntro
                        showDetails={showDetails}
                        getGenres={getGenres}
                    />
                    {showCredits && (
                        <MovieShowCredits
                            deviceType={deviceType}
                            getDirector={getDirector}
                            movieCredits={showCredits}
                            showDetails={showDetails}
                            isShow={true}
                        />
                    )}
                    {showDetails.videos &&
                        showDetails.videos.results.length > 0 && (
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
                                        {showDetails.videos.results
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
                                                        cur={showDetails}
                                                        isHero={false}
                                                        isGallery={false}
                                                        key={cur.key}
                                                    />
                                                );
                                            })}
                                    </CarouselContainer>
                                </div>
                            </section>
                        )}
                    {showDetails.images &&
                        showDetails.images.backdrops.length > 0 && (
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
                                        {showDetails.images.backdrops.map(
                                            (cur) => {
                                                const thumbnailUrl = `https://image.tmdb.org/t/p/w780${cur.file_path}`;
                                                return (
                                                    <HeroMovieContainer
                                                        thumbnailUrl={
                                                            thumbnailUrl
                                                        }
                                                        chosenVideo={cur}
                                                        cur={showDetails}
                                                        isHero={false}
                                                        isGallery={true}
                                                        key={cur.file_path}
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
                                    Recommended Shows For You
                                </p>
                            </div>
                            <div className="carousel-container">
                                <CarouselContainer
                                    deviceType={deviceType}
                                    isSmall={true}
                                >
                                    {recommendations.map((cur) => (
                                        <MovieShowCard
                                            key={cur.id}
                                            cur={cur}
                                            isShow={true}
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
                                <section className="carousel-section">
                                    <div className="carousel-top-bar">
                                        <p className="carousel-top-bar-title">
                                            {current.name} Shows
                                        </p>
                                    </div>
                                    <div className="carousel-container">
                                        <CarouselContainer
                                            deviceType={deviceType}
                                            isSmall={true}
                                        >
                                            {current.results.map((cur) => (
                                                <MovieShowCard
                                                    key={cur.title}
                                                    cur={cur}
                                                    isShow={true}
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

ShowDetail.getInitialProps = async ({ query, req }) => {
    const tid = query.tid;
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

    return { tid, deviceType };
};

export default ShowDetail;
