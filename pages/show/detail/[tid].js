import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ShowIntro from "../../../components/show/ShowIntro";
import MovieShowCredits from "../../../components/MovieShowCredits";
import MovieShowCard from "../../../components/MovieShowCard";
import MobileDetect from "mobile-detect";
import HeroMovieContainer from "../../../components/HeroMovieContainer";
import CarouselContainer from "../../../components/CarouselContainer";

const ShowDetail = ({ tid, deviceType }) => {
	const [ showDetails, setShowDetails ] = useState();
	const [ showCredits, setShowCredits ] = useState();
	const [ recommendations, setRecommendations ] = useState();
	const [ genreState, setGenreState ] = useState();

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
			setRecommendations(res.data.results);
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
					const newObj = {
						name: showDetails.genres[i].name,
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
			getShowDetails();
			getCredits();
			getRecommendations();
		},
		[ tid ]
	);

	useEffect(
		() => {
			getGenreDetails();
		},
		[ showDetails ]
	);

	return (
		<main>
			{showDetails && (
				<Fragment>
					<ShowIntro showDetails={showDetails} getGenres={getGenres} />
					{showCredits && <MovieShowCredits getDirector={getDirector} movieCredits={showCredits} />}
					{showDetails.videos &&
					showDetails.videos.results.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Trailers, Teasers & Clips</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={false}>
								{showDetails.videos.results
									.filter((current) => current.site.toLowerCase() === "youtube")
									.map((cur) => {
										const thumbnailUrl = `https://i.ytimg.com/vi/${cur.key}/hqdefault.jpg`;
										return (
											<HeroMovieContainer
												thumbnailUrl={thumbnailUrl}
												chosenVideo={cur}
												cur={showDetails}
												isHero={false}
												isGallery={false}
											/>
										);
									})}
							</CarouselContainer>
						</section>
					)}
					{showDetails.images &&
					showDetails.images.backdrops.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Gallery</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={false}>
								{showDetails.images.backdrops.map((cur) => {
									const thumbnailUrl = `https://image.tmdb.org/t/p/w500${cur.file_path}`;
									return (
										<HeroMovieContainer
											thumbnailUrl={thumbnailUrl}
											chosenVideo={cur}
											cur={showDetails}
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
								<p className="carousel-top-bar-title">Recommended Shows For You</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={true}>
								{recommendations.map((cur) => (
									<MovieShowCard key={cur.title} cur={cur} isShow={true} />
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
										<p className="carousel-top-bar-title">{current.name} Shows</p>
									</div>
									<CarouselContainer deviceType={deviceType} isSmall={true}>
										{current.results.map((cur) => (
											<MovieShowCard key={cur.title} cur={cur} isShow={true} />
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
