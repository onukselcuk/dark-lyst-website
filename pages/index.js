import { useEffect, useState } from "react";
import axios from "axios";
import MobileDetect from "mobile-detect";
import ShowContainer from "../components/ShowContainer";
import HeroMovieContainer from "../components/HeroMovieContainer";
import CarouselContainer from "../components/CarouselContainer";

const Home = (props) => {
	const [ shows, setShows ] = useState();
	const [ movies, setMovies ] = useState();
	const [ heroMovies, setHeroMovies ] = useState();
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
				<h2 className="section-header">TV Shows On Air</h2>
				{shows && (
					<CarouselContainer deviceType={deviceType} isSmall={true}>
						{shows.map((cur) => <ShowContainer cur={cur} isShow={true} />)}
					</CarouselContainer>
				)}
			</section>
			<section className="tv-shows-section">
				<h2 className="section-header">Now Playing In Theaters</h2>
				{movies && (
					<CarouselContainer deviceType={deviceType} isSmall={true}>
						{movies.map((cur) => <ShowContainer cur={cur} isShow={false} />)}
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

				.section-header {
					margin: 2rem 0;
					font-size: 3rem;
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
