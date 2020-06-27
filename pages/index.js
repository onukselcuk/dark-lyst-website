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
import { v4 as uuidv4 } from "uuid";

const Home = (props) => {
    const [shows, setShows] = useState();
    const [movies, setMovies] = useState();
    const [heroMovies, setHeroMovies] = useState();
    const [people, setPeople] = useState();
    const [netflix, setNetflix] = useState();
    const [apple, setApple] = useState();
    const [isHeroMoviesVisible, setHeroMoviesVisibility] = useState(false);
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

    useEffect(() => {
        getLatest();
    }, []);

    const filterHeroMovies = (heroMoviesArray) => {
        return heroMoviesArray.filter((cur) => {
            return cur.hasOwnProperty("id");
        });
    };

    return (
        <main className="root">
            <NextSeo
                title="DarkLyst | Track Latest Shows and Movies"
                description="Track and discover latest show and movies with Darklyst"
                openGraph={{
                    url: "https://www.darklyst.com",
                    title: "DarkLyst | Track Latest Shows and Movies",
                    description:
                        "Track and discover latest show and movies with Darklyst"
                }}
            />
            {heroMovies && (
                <section
                    className="tv-shows-section"
                    ref={indexHeroSectionRef}
                    style={{
                        opacity: isHeroMoviesVisible ? 1 : 0,
                        visibility: `${
                            isHeroMoviesVisible ? "visible" : "hidden"
                        }`
                    }}
                >
                    <CarouselContainer
                        deviceType={deviceType}
                        isSmall={false}
                        isHero={true}
                    >
                        {filterHeroMovies(heroMovies).map((cur, index) => {
                            if (cur.videos.length > 0) {
                                const chosenVideoObj =
                                    cur.videos[cur.videos.length - 1];
                                const thumbnailUrl = `https://i.ytimg.com/vi/${chosenVideoObj.key}/maxresdefault.jpg`;

                                return (
                                    <HeroMovieContainer
                                        key={uuidv4()}
                                        thumbnailUrl={thumbnailUrl}
                                        cur={cur}
                                        chosenVideo={chosenVideoObj}
                                        isHero={true}
                                        containment={
                                            indexHeroSectionRef.current
                                        }
                                        handleHeroMoviesVisibility={
                                            setHeroMoviesVisibility
                                        }
                                        isVisibilityController={
                                            index === 0 ? true : false
                                        }
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </CarouselContainer>
                </section>
            )}
            {netflix && (
                <section className="tv-shows-section">
                    <div className="section-header-container">
                        <Link
                            href="/shows/[slug]"
                            as="/shows/latest-on-netflix"
                        >
                            <a className="header-link">
                                <h2 className="section-header">
                                    Latest Shows On Netflix
                                </h2>
                            </a>
                        </Link>
                    </div>
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {netflix.map((cur) => (
                            <MovieShowCard
                                cur={cur}
                                isShow={true}
                                key={uuidv4()}
                            />
                        ))}
                    </CarouselContainer>
                </section>
            )}
            {apple && (
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
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {apple.map((cur) => (
                            <MovieShowCard
                                cur={cur}
                                isShow={true}
                                key={uuidv4()}
                            />
                        ))}
                    </CarouselContainer>

                    {/* <div className="loader-container">
                        <div className={loaderStyles.loader}>Loading...</div>
                    </div> */}
                </section>
            )}
            {shows && (
                <section className="tv-shows-section">
                    <div className="section-header-container">
                        <Link href="/shows/[slug]" as="/shows/on-the-air">
                            <a className="header-link">
                                <h2 className="section-header">
                                    TV Shows On Air
                                </h2>
                            </a>
                        </Link>
                    </div>
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {shows.map((cur) => (
                            <MovieShowCard
                                cur={cur}
                                isShow={true}
                                key={uuidv4()}
                            />
                        ))}
                    </CarouselContainer>
                </section>
            )}
            {movies && (
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
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {movies.map((cur) => (
                            <MovieShowCard
                                cur={cur}
                                isShow={false}
                                key={uuidv4()}
                            />
                        ))}
                    </CarouselContainer>
                </section>
            )}
            {people && (
                <section className="tv-shows-section">
                    <div className="section-header-container">
                        <h2 className="section-header">Trending People</h2>
                    </div>
                    <CarouselContainer deviceType={deviceType} isSmall={true}>
                        {people.map((cur) => (
                            <PeopleCard cur={cur} key={uuidv4()} />
                        ))}
                    </CarouselContainer>
                </section>
            )}
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
