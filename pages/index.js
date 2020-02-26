import { useEffect, useState } from "react";
import axios from "axios";
import MobileDetect from "mobile-detect";
import MovieShowCard from "../components/MovieShowCard";
import HeroMovieContainer from "../components/HeroMovieContainer";
import CarouselContainer from "../components/CarouselContainer";
import theme from "../src/theme";
import PeopleCard from "../components/PeopleCard";

const Home = (props) => {
	const [ shows, setShows ] = useState();
	const [ movies, setMovies ] = useState();
	const [ heroMovies, setHeroMovies ] = useState();
	const [ people, setPeople ] = useState();
	const { deviceType } = props;

	const getLatest = () => {
		axios.get("/api/movies/trending-hero").then((res) => {
			setHeroMovies(res.data.results);
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

	useEffect(getLatest, []);

	const filterVideos = (videoArr) => {
		return videoArr.filter((cur) => {
			return cur.maxres === true;
		});
	};

	return (
		<main className="root">
			<section className="tv-shows-section">
				{heroMovies && (
					<CarouselContainer deviceType={deviceType} isSmall={false} isHero={true}>
						{heroMovies.map((cur) => {
							if (cur.videos.length > 0) {
								const filteredVideoArray = filterVideos(cur.videos);
								const chosenVideoObj = filteredVideoArray[filteredVideoArray.length - 1];
								const thumbnailUrl = `https://i.ytimg.com/vi/${chosenVideoObj.key}/maxresdefault.jpg`;
								return (
									<HeroMovieContainer
										key={`hero-movie-container ${cur.title}`}
										thumbnailUrl={thumbnailUrl}
										cur={cur}
										chosenVideo={chosenVideoObj}
										isHero={true}
									/>
								);
							} else {
								return null;
							}
						})}
					</CarouselContainer>
				)}
			</section>
			<section className="tv-shows-section">
				<div className="section-header-container">
					<h2 className="section-header">TV Shows On Air</h2>
				</div>
				{shows && (
					<CarouselContainer deviceType={deviceType} isSmall={true}>
						{shows.map((cur) => <MovieShowCard cur={cur} isShow={true} />)}
					</CarouselContainer>
				)}
			</section>
			<section className="tv-shows-section">
				<div className="section-header-container">
					<h2 className="section-header">Now Playing In Theaters</h2>
				</div>
				{movies && (
					<CarouselContainer deviceType={deviceType} isSmall={true}>
						{movies.map((cur) => <MovieShowCard cur={cur} isShow={false} />)}
					</CarouselContainer>
				)}
			</section>
			<section className="tv-shows-section">
				<div className="section-header-container">
					<h2 className="section-header">Trending People</h2>
				</div>
				{people && (
					<CarouselContainer deviceType={deviceType} isSmall={true}>
						{people.map((cur) => <PeopleCard cur={cur} />)}
					</CarouselContainer>
				)}
			</section>
			<style jsx>{`
				.root {
					width: 100%;
				}
				.tv-shows-section {
					width: 75%;
					margin: 1rem auto;
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
