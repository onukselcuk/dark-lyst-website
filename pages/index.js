import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MobileDetect from "mobile-detect";
import MovieShowCard from "../components/cards/MovieShowCard";
import HeroMovieContainer from "../components/containers/HeroMovieContainer";
import CarouselContainer from "../components/containers/CarouselContainer";
import theme from "../src/theme";
import PeopleCard from "../components/cards/PeopleCard";
import Link from "next/link";
import loaderStyles from "../styles/loader.module.css";
import breakpoints from "../src/breakpoints";
import { NextSeo } from "next-seo";

const Home = (props) => {
    const [shows, setShows] = useState();
    const [movies, setMovies] = useState();
    const [heroMovies, setHeroMovies] = useState();
    const [people, setPeople] = useState();
    const [netflix, setNetflix] = useState();
    const [apple, setApple] = useState();
    const { deviceType } = props;

    const getLatest = () => {
        axios.get("/api/movies/trending-hero").then((res) => {
            setHeroMovies(res.data.results);
        });

        axios.get("/api/shows/netflix").then((res) => {
            setNetflix(res.data.results);
        });

        axios.get("/api/shows/apple").then((res) => {
            setApple(res.data.results);
        });

        axios.get("/api/shows/latest").then((res) => {
            setShows(res.data.results);
        });
        axios.get("/api/movies/latest").then((res) => {
            setMovies(res.data.results);
        });
        axios.get("/api/person/trending").then((res) => {
            let result = res.data.results.filter((cur) => {
                return cur.profile_path !== null;
            });
            setPeople(result);
        });
    };

    let indexHeroSectionRef = useRef(null);
    // let netflixSectionRef = useRef(null);
    // let appleSectionRef = useRef(null);
    // let showsSectionRef = useRef(null);
    // let moviesSectionRef = useRef(null);
    // let peopleSectionRef = useRef(null);

    useEffect(() => {
        getLatest();
    }, []);

    const filterVideos = (videoArr) => {
        return videoArr.filter((cur) => {
            return cur.maxres === true;
        });
    };

    return (
        <main className="root">
            <NextSeo
                title="Dark Lyst | Track Latest Shows and Movies"
                description="Track and discover latest show and movies with darklyst"
                openGraph={{
                    url: "https://www.darklyst.com",
                    title: "Dark Lyst | Track Latest Shows and Movies",
                    description:
                        "Track and discover latest show and movies with darklyst"
                }}
            />
            <section className="tv-shows-section" ref={indexHeroSectionRef}>
                {heroMovies ? (
                    <CarouselContainer
                        deviceType={deviceType}
                        isSmall={false}
                        isHero={true}
                    >
                        {heroMovies.map((cur) => {
                            if (cur.videos.length > 0) {
                                // const filteredVideoArray = filterVideos(
                                //     cur.videos
                                // );
                                const filteredVideoArray = cur.videos;
                                const chosenVideoObj =
                                    filteredVideoArray[
                                        filteredVideoArray.length - 1
                                    ];
                                const thumbnailUrl = `https://i.ytimg.com/vi/${chosenVideoObj.key}/maxresdefault.jpg`;

                                return (
                                    <HeroMovieContainer
                                        key={`hero-movie-container ${cur.title}`}
                                        thumbnailUrl={thumbnailUrl}
                                        cur={cur}
                                        chosenVideo={chosenVideoObj}
                                        isHero={true}
                                        containment={
                                            indexHeroSectionRef.current
                                        }
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </CarouselContainer>
                ) : (
                    <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div>
                )}
            </section>
            <section className="tv-shows-section">
                <div className="section-header-container">
                    <Link href="/shows/[slug]" as="/shows/latest-on-netflix">
                        <a className="header-link">
                            <h2 className="section-header">
                                Latest Shows On Netflix
                            </h2>
                        </a>
                    </Link>
                </div>
                {netflix ? (
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {netflix.map((cur) => (
                            <MovieShowCard cur={cur} isShow={true} />
                        ))}
                    </CarouselContainer>
                ) : (
                    <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div>
                )}
            </section>
            <section className="tv-shows-section">
                <div className="section-header-container">
                    <Link
                        href="/shows/[slug]"
                        as="/shows/latest-on-apple-tv-plus"
                    >
                        <a className="header-link">
                            <h2 className="section-header">
                                Latest Shows On Apple TV+
                            </h2>
                        </a>
                    </Link>
                </div>
                {apple ? (
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {apple.map((cur) => (
                            <MovieShowCard cur={cur} isShow={true} />
                        ))}
                    </CarouselContainer>
                ) : (
                    <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div>
                )}
            </section>
            <section className="tv-shows-section">
                <div className="section-header-container">
                    <Link href="/shows/[slug]" as="/shows/on-the-air">
                        <a className="header-link">
                            <h2 className="section-header">TV Shows On Air</h2>
                        </a>
                    </Link>
                </div>
                {shows ? (
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {shows.map((cur) => (
                            <MovieShowCard cur={cur} isShow={true} />
                        ))}
                    </CarouselContainer>
                ) : (
                    <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div>
                )}
            </section>
            <section className="tv-shows-section">
                <div className="section-header-container">
                    <Link href="/movies/[slug]" as="/movies/now-playing">
                        <a className="header-link">
                            <h2 className="section-header">
                                Now Playing In Theaters
                            </h2>
                        </a>
                    </Link>
                </div>
                {movies ? (
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {movies.map((cur) => (
                            <MovieShowCard cur={cur} isShow={false} />
                        ))}
                    </CarouselContainer>
                ) : (
                    <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div>
                )}
            </section>
            <section className="tv-shows-section">
                <div className="section-header-container">
                    <h2 className="section-header">Trending People</h2>
                </div>
                {people ? (
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {people.map((cur) => (
                            <PeopleCard cur={cur} />
                        ))}
                    </CarouselContainer>
                ) : (
                    <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div>
                )}
            </section>
            <style jsx>{`
                .root {
                    width: 100%;
                }
                .tv-shows-section {
                    width: 70%;
                    margin: 1rem auto;
                }

                @media (max-width: ${breakpoints.sizes.xl}) {
                    .tv-shows-section {
                        width: 75%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.lg}) {
                    .tv-shows-section {
                        width: 80%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.md}) {
                    .tv-shows-section {
                        width: 85%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .tv-shows-section {
                        width: 90%;
                    }
                }

                @media (max-width: ${breakpoints.sizes.xs}) {
                    .tv-shows-section {
                        width: 95%;
                    }
                }

                .section-header-container {
                    background-color: ${theme.palette.eight.main};
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                }

                .section-header {
                    padding: 2rem;
                    font-size: 2.5rem;
                    color: #fff;
                }

                .header-link {
                    text-decoration: none;
                    color: #fff;
                }
            `}</style>
        </main>
    );
};

Home.getInitialProps = async ({ req }) => {
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

    return { deviceType };
};

export default Home;
