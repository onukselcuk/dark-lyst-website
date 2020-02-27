import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import PersonIntro from "../../../components/person/PersonIntro";
import MovieShowCard from "../../../components/MovieShowCard";
import MobileDetect from "mobile-detect";
import HeroMovieContainer from "../../../components/HeroMovieContainer";
import CarouselContainer from "../../../components/CarouselContainer";
import theme from "../../../src/theme";

const PersonDetail = ({ sid, deviceType }) => {
	const [ personDetails, setPersonDetails ] = useState();
	const [ personTaggedImages, setPersonTaggedImages ] = useState();
	const [ personCombinedCredits, setPersonCombinedCredits ] = useState();

	const getPersonDetails = () => {
		const url = `/api/person/detail/${sid}`;
		axios.get(url).then((res) => {
			setPersonDetails(res.data);
		});
	};

	const getPersonTaggedImages = () => {
		const url = `/api/person/tagged-images/${sid}`;
		axios.get(url).then((res) => {
			setPersonTaggedImages(res.data.results);
		});
	};

	const getPersonCombinedCredits = () => {
		const url = `/api/person/combined-credits/${sid}`;
		axios.get(url).then((res) => {
			console.log(res.data);
			let filteredCast = res.data.cast;
			let filteredCrew = res.data.crew;
			filteredCast = filteredCast.filter((cur) => cur.poster_path && cur.vote_average);
			filteredCrew = filteredCrew.filter((cur) => cur.poster_path && cur.vote_average);

			if (filteredCast.length > 0) {
				filteredCast.sort((a, b) => {
					let first = a.release_date || a.first_air_date;
					let second = b.release_date || b.first_air_date;
					first = first.slice(0, 4);
					second = second.slice(0, 4);
					return second - first;
				});
			}

			if (filteredCrew.length > 0) {
				filteredCrew.sort((a, b) => {
					let first = a.release_date || a.first_air_date;
					let second = b.release_date || b.first_air_date;
					first = first.slice(0, 4);
					second = second.slice(0, 4);
					return second - first;
				});
			}

			const newObj = {
				cast: filteredCast,
				crew: filteredCrew,
				id: res.data.id
			};

			setPersonCombinedCredits(newObj);
		});
	};

	useEffect(
		() => {
			getPersonDetails();
			getPersonTaggedImages();
			getPersonCombinedCredits();
		},
		[ sid ]
	);

	return (
		<main>
			{personDetails && (
				<Fragment>
					<PersonIntro personDetails={personDetails} personImages={personTaggedImages} />
					{personTaggedImages &&
					personTaggedImages.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Gallery</p>
							</div>
							<CarouselContainer deviceType={deviceType} isSmall={false}>
								{personTaggedImages.map((cur) => {
									const thumbnailUrl = `https://image.tmdb.org/t/p/w780${cur.media.backdrop_path}`;
									return (
										<HeroMovieContainer
											thumbnailUrl={thumbnailUrl}
											chosenVideo={cur.media}
											cur={cur.media}
											isHero={false}
											isGallery={true}
											isProfile={true}
										/>
									);
								})}
							</CarouselContainer>
						</section>
					)}

					{personCombinedCredits &&
					personCombinedCredits.cast &&
					personCombinedCredits.cast.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Cast Credits</p>
							</div>
							<div className="credits-container">
								{personCombinedCredits.cast.map((cur) => (
									<div className="credit-container">
										<MovieShowCard
											key={cur.id}
											cur={cur}
											isProfile={true}
											isShow={cur.media_type === "tv"}
										/>
									</div>
								))}
							</div>
						</section>
					)}
					{personCombinedCredits &&
					personCombinedCredits.crew &&
					personCombinedCredits.crew.length > 0 && (
						<section className="carousel-section">
							<div className="carousel-top-bar">
								<p className="carousel-top-bar-title">Crew Credits</p>
							</div>
							<div className="credits-container">
								{personCombinedCredits.crew.map((cur) => (
									<div className="credit-container">
										<MovieShowCard
											key={cur.id}
											cur={cur}
											isProfile={true}
											isShow={cur.media_type === "tv"}
										/>
									</div>
								))}
							</div>
						</section>
					)}
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

				.credits-container {
					display: flex;
					flex-wrap: wrap;
				}

				.credit-container {
					width: 25%;
					margin: 1rem 0;
				}
			`}</style>
		</main>
	);
};

PersonDetail.getInitialProps = async ({ query, req }) => {
	const sid = query.sid;
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

	return { sid, deviceType };
};

export default PersonDetail;
