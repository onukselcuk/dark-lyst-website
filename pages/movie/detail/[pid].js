import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MovieIntro from "../../../components/movie/MovieIntro";
import MovieCredits from "../../../components/movie/MovieCredits";
import Carousel from "react-multi-carousel";
import ShowContainer from "../../../components/ShowContainer";
import MobileDetect from "mobile-detect";

const MovieDetail = ({ pid, deviceType }) => {
	const [ movieDetails, setMovieDetails ] = useState();
	const [ movieCredits, setMovieCredits ] = useState();
	const [ recommendations, setRecommendations ] = useState();
	const [ genreState, setGenreState ] = useState();

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
			setRecommendations(res.data.results);
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
					const newObj = {
						name: movieDetails.genres[i].name,
						results: returned.data.results
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

	const getHour = (time) => {
		return Math.floor(time / 60);
	};

	useEffect(
		() => {
			getMovieDetails();
			getCredits();
			getRecommendations();
		},
		[ pid ]
	);

	useEffect(
		() => {
			getGenreDetails();
		},
		[ movieDetails ]
	);

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

	return (
		<main>
			{movieDetails && (
				<Fragment>
					<MovieIntro movieDetails={movieDetails} getHour={getHour} getGenres={getGenres} />
					{movieCredits && <MovieCredits getDirector={getDirector} movieCredits={movieCredits} />}
					{recommendations &&
					recommendations.length > 0 && (
						<section className="recommendations-section">
							<div className="recommendations-top-bar">
								<p className="recommendations-top-bar-title">Recommended For You</p>
							</div>
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
								deviceType={deviceType}
								dotListClass="custom-dot-list-style"
								partialVisbile={false}
								itemClass="carousel-item-padding-40-px"
							>
								{recommendations.map((cur) => (
									<ShowContainer key={cur.title} cur={cur} isShow={false} />
								))}
							</Carousel>
						</section>
					)}

					{genreState &&
						genreState.length > 0 &&
						genreState.map((current) => {
							return (
								<section className="recommendations-section">
									<div className="recommendations-top-bar">
										<p className="recommendations-top-bar-title">{current.name} Movies</p>
									</div>
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
										deviceType={deviceType}
										dotListClass="custom-dot-list-style"
										partialVisbile={false}
										itemClass="carousel-item-padding-40-px"
									>
										{current.results.map((cur) => (
											<ShowContainer key={cur.title} cur={cur} isShow={false} />
										))}
									</Carousel>
								</section>
							);
						})}
				</Fragment>
			)}
			<style jsx>{`
				.recommendations-section {
					width: 70%;
					margin: 2rem auto;
				}

				.recommendations-top-bar {
					background-color: rgba(0, 0, 0, .4);
					border-radius: 10px;
				}

				.recommendations-top-bar-title {
					font-size: 2.6rem;
					padding: 2rem;
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
