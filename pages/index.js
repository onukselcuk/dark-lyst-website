import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import axios from "axios";
import MobileDetect from "mobile-detect";
import ShowContainer from "../components/ShowContainer";
import HeroMovieContainer from "../components/HeroMovieContainer";
import theme from "../src/theme";

const Home = (props) => {
	const [ shows, setShows ] = useState();
	const [ movies, setMovies ] = useState();
	const [ heroMovies, setHeroMovies ] = useState();

	const getLatest = () => {
		axios.get("/api/shows/latest").then((res) => {
			setShows(res.data.results);
		});
		axios.get("/api/movies/latest").then((res) => {
			setMovies(res.data.results);
		});
		axios.get("/api/movies/trending-hero").then((res) => {
			setHeroMovies(res.data.results);
		});
	};

	useEffect(getLatest, []);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 6,
			slidesToSlide: 6, // optional, default to 1.
			partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
			slidesToSlide: 3, // optional, default to 1.
			partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
		}
	};

	const responsiveHero = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
		}
	};

	const filterVideos = (videoArr) => {
		return videoArr.filter((cur) => {
			return (cur.maxres === true) & (cur.type === "Trailer" || cur.type === "Teaser") & (cur.site === "YouTube");
		});
	};

	return (
		<main className="root">
			<section className="tv-shows-section">
				{heroMovies && (
					<Carousel
						swipeable={true}
						draggable={false}
						showDots={false}
						responsive={responsiveHero}
						ssr={true} // means to render carousel on server-side.
						infinite={false}
						// autoPlay={props.deviceType !== "mobile" ? true : false}
						autoPlay={false}
						autoPlaySpeed={20000}
						keyBoardControl={true}
						customTransition="all 400ms ease-out"
						transitionDuration={400}
						containerClass="carousel-container"
						removeArrowOnDeviceType={[ "tablet", "mobile" ]}
						deviceType={props.deviceType}
						dotListClass="custom-dot-list-style"
						partialVisbile={false}
						itemClass="carousel-item-padding-40-px"
					>
						{heroMovies.map((cur) => {
							const filteredVideoArray = filterVideos(cur.videos);
							const chosenVideoObj = filteredVideoArray[filteredVideoArray.length - 1];
							const thumbnailUrl = `https://i.ytimg.com/vi/${chosenVideoObj.key}/maxresdefault.jpg`;
							return (
								<HeroMovieContainer
									key={`hero-movie-container ${cur.title}`}
									thumbnailUrl={thumbnailUrl}
									cur={cur}
									chosenVideo={chosenVideoObj}
								/>
							);
						})}
					</Carousel>
				)}
			</section>
			<section className="tv-shows-section">
				<h2 className="section-header">TV Shows On Air</h2>
				{shows && (
					<Carousel
						swipeable={true}
						draggable={false}
						showDots={false}
						responsive={responsive}
						ssr={true} // means to render carousel on server-side.
						infinite={false}
						// autoPlay={props.deviceType !== "mobile" ? true : false}
						autoPlay={false}
						autoPlaySpeed={20000}
						keyBoardControl={true}
						customTransition="all 400ms ease-out"
						transitionDuration={400}
						containerClass="carousel-container"
						removeArrowOnDeviceType={[ "tablet", "mobile" ]}
						deviceType={props.deviceType}
						dotListClass="custom-dot-list-style"
						partialVisbile={false}
						itemClass="carousel-item-padding-40-px"
					>
						{shows.map((cur) => <ShowContainer cur={cur} isShow={true} />)}
					</Carousel>
				)}
			</section>
			<section className="tv-shows-section">
				<h2 className="section-header">Now Playing In Theaters</h2>
				{movies && (
					<Carousel
						swipeable={true}
						draggable={false}
						showDots={false}
						responsive={responsive}
						ssr={true} // means to render carousel on server-side.
						infinite={false}
						// autoPlay={props.deviceType !== "mobile" ? true : false}
						autoPlay={false}
						autoPlaySpeed={20000}
						keyBoardControl={true}
						customTransition="all 400ms ease-out"
						transitionDuration={400}
						containerClass="carousel-container"
						removeArrowOnDeviceType={[ "tablet", "mobile" ]}
						deviceType={props.deviceType}
						dotListClass="custom-dot-list-style"
						partialVisbile={false}
						itemClass="carousel-item-padding-40-px"
					>
						{movies.map((cur) => <ShowContainer cur={cur} isShow={false} />)}
					</Carousel>
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
					color: ${theme.palette.sixth.main};
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
