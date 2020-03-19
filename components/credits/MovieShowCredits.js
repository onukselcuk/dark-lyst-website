import { useState, useEffect } from "react";
import CreditContainer from "./CreditContainer";
import theme from "../../src/theme";
import SeasonsContainer from "../containers/SeasonsContainer";
import CarouselContainer from "../containers/CarouselContainer";
import breakpoints from "../../src/breakpoints";

const MovieShowCredits = ({ getDirector, movieCredits, deviceType, showDetails, isShow }) => {
	const [ seasonBarState, setSeasonBarState ] = useState(false);

	const handleCredits = () => {
		setSeasonBarState(false);
	};

	const handleSeasons = () => {
		setSeasonBarState(true);
	};

	useEffect(
		() => {
			setSeasonBarState(false);
		},
		[ showDetails ]
	);

	return (
		<section className="credits-section">
			<div className="credits-top-bar">
				<p onClick={handleCredits} className="credits-top-bar-title">
					Cast & Crew
				</p>
				{isShow && (
					<p onClick={handleSeasons} className="credits-top-bar-title credits-top-bar-seasons">
						Seasons
					</p>
				)}
			</div>
			{seasonBarState && isShow ? (
				<div className="carousel-container">
					<SeasonsContainer deviceType={deviceType} showDetails={showDetails} />
				</div>
			) : (
				<div className="carousel-container">
					<CarouselContainer isSmall={true} deviceType={deviceType}>
						{getDirector(movieCredits.crew).slice(0, 2).map((cur) => {
							return <CreditContainer cur={cur} />;
						})}

						{movieCredits.cast.slice(0, 10).map((cur) => {
							if (cur) {
								return <CreditContainer cur={cur} />;
							} else {
								return null;
							}
						})}
					</CarouselContainer>
				</div>
			)}

			<style jsx>{`
				.credits-section {
					width: 70%;
					margin: 2rem auto;
				}

				.credits-top-bar {
					background-color: rgba(0, 0, 0, .4);
					border-radius: 10px;
					display: flex;
					align-items: center;
				}

				.credits-top-bar-title {
					font-size: 2.6rem;
					margin: 1rem;
					padding: 1rem;
					border-radius: 10px;
					cursor: pointer;
					background-color: ${theme.palette.primary.main};
					${(seasonBarState || !isShow) && "background-color: transparent;"};
					${!isShow && "cursor:default;"};
				}

				.credits-top-bar-title:hover {
					background-color: ${theme.palette.primary.main};
					${!isShow && "background-color:transparent;"};
				}

				.credits-top-bar-seasons {
					background: none;
					${seasonBarState && "background-color: #1b262c;"};
				}

				.carousel-container {
					margin-top: 1.5rem;
				}

				@media (max-width: ${breakpoints.sizes.xl}) {
					.credits-section {
						width: 75%;
					}
				}

				@media (max-width: ${breakpoints.sizes.lg}) {
					.credits-section {
						width: 80%;
					}
				}

				@media (max-width: ${breakpoints.sizes.md}) {
					.credits-section {
						width: 85%;
					}
				}

				@media (max-width: ${breakpoints.sizes.mdsm}) {
					.credits-section {
						width: 90%;
					}
				}

				@media (max-width: ${breakpoints.sizes.xs}) {
					.credits-section {
						width: 95%;
					}
				}
			`}</style>
		</section>
	);
};

export default MovieShowCredits;
