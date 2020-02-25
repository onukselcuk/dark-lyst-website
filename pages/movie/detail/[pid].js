import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MovieIntro from "../../../components/movie/MovieIntro";
import MovieShowCredits from "../../../components/MovieShowCredits";
import MovieShowCard from "../../../components/MovieShowCard";
import MobileDetect from "mobile-detect";
import HeroMovieContainer from "../../../components/HeroMovieContainer";
import CarouselContainer from "../../../components/CarouselContainer";

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

	return (
		<main>
			{movieDetails && (
				<Fragment>
					<MovieIntro movieDetails={movieDetails} getGenres={getGenres} />
					{movieCredits && <MovieShowCredits getDirector={getDirector} movieCredits={movieCredits} />}
					{movieDetails.videos &&
					movieDetails.videos.results.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Trailers, Teasers & Clips</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={false}>
								{movieDetails.videos.results
									.filter((current) => current.site.toLowerCase() === "youtube")
									.map((cur) => {
										const thumbnailUrl = `https://i.ytimg.com/vi/${cur.key}/hqdefault.jpg`;
										return (
											<HeroMovieContainer
												thumbnailUrl={thumbnailUrl}
												chosenVideo={cur}
												cur={movieDetails}
												isHero={false}
												isGallery={false}
											/>
										);
									})}
							</CarouselContainer>
						</section>
					)}
					{movieDetails.images &&
					movieDetails.images.backdrops.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Gallery</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={false}>
								{movieDetails.images.backdrops.map((cur) => {
									const thumbnailUrl = `https://image.tmdb.org/t/p/w500${cur.file_path}`;
									return (
										<HeroMovieContainer
											thumbnailUrl={thumbnailUrl}
											chosenVideo={cur}
											cur={movieDetails}
											isHero={false}
											isGallery={true}
										/>
									);
								})}
							</CarouselContainer>
						</section>
					)}
					{recommendations &&
					recommendations.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Recommended Movies For You</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={true}>
								{recommendations.map((cur) => (
									<MovieShowCard key={cur.title} cur={cur} isShow={false} />
								))}
							</CarouselContainer>
						</section>
					)}

					{genreState &&
						genreState.length > 0 &&
						genreState.map((current) => {
							return (
								<section className="carousel-section">
									<div className="carousel-top-bar">
										<p className="carousel-top-bar-title">{current.name} Movies</p>
									</div>
									<CarouselContainer deviceType={deviceType} isSmall={true}>
										{current.results.map((cur) => (
											<MovieShowCard key={cur.title} cur={cur} isShow={false} />
										))}
									</CarouselContainer>
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
					background-color: rgba(0, 0, 0, .4);
					border-radius: 10px;
				}

				.carousel-top-bar-title {
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
