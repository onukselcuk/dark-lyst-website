import { useState, useEffect, useRef } from "react";
import axios from "axios";
import theme from "../../src/theme";
import MovieDiscoverForm from "../../components/movie/MovieDiscoverForm";
import MovieShowLargeCard from "../../components/cards/MovieShowLargeCard";
import Paginator from "../../components/Paginator";
import breakpoints from "../../src/breakpoints";

const DiscoverMovie = () => {
	const [ state, setState ] = useState({
		sortBy: { value: "popularity", label: "Popularity" },
		country: { value: false, label: "All Countries" },
		rating: { value: false, label: "All Ratings" },
		originalLang: { value: "en", label: "English" },
		yearFrom: { value: false, label: "Anytime" },
		yearTo: { value: false, label: "Anytime" }
	});
	const [ genreState, setGenreState ] = useState([ { value: false, label: "All Genres", isFixed: true } ]);

	const [ isDescending, setIsDescending ] = useState(true);

	const [ movies, setMovies ] = useState();

	const [ currentPageNumber, setCurrentPageNumber ] = useState(1);

	const [ totalResultNumber, setTotalResultNumber ] = useState();

	const handleChange = (selection, key) => {
		setCurrentPageNumber(1);
		setState({
			...state,
			[key]: selection
		});
	};

	const onGenreChange = (selection) => {
		let genreArray = selection;
		if (selection && selection.length > 1) {
			genreArray = genreArray.filter((cur) => cur.value !== false);
		} else if (selection === null || !selection || selection.length === 0) {
			genreArray = [ { value: false, label: "All Genres", isFixed: true } ];
		}

		if (JSON.stringify(genreArray) !== JSON.stringify(genreState)) {
			setCurrentPageNumber(1);
			setGenreState(genreArray);
		}
	};

	const onAscChange = () => {
		setCurrentPageNumber(1);
		setIsDescending(false);
	};

	const onDescChange = () => {
		setCurrentPageNumber(1);
		setIsDescending(true);
	};

	const handleStateChange = async () => {
		let url = `/api/discover/movie?`;
		url = `${url}sort_by=${state.sortBy.value}.${isDescending ? "desc" : "asc"}&page=${currentPageNumber}`;

		if (genreState) {
			const genreNotAll = genreState.every((cur) => cur.value !== false);
			if (genreNotAll) {
				const genreIdsArr = genreState.map((cur) => cur.value);
				const genreString = genreIdsArr.join(",");
				url = `${url}&with_genres=${genreString}`;
			}
		}

		if (state.country.value) {
			url = `${url}&region=${state.country.value}`;
		}

		if (state.rating.value) {
			url = `${url}&vote_average.gte=${state.rating.value}`;
		}

		if (state.originalLang.value) {
			url = `${url}&with_original_language=${state.originalLang.value}`;
		}

		if (state.yearFrom.value) {
			url = `${url}&release_date.gte=${state.yearFrom.value}-01-01`;
		}

		if (state.yearTo.value) {
			url = `${url}&release_date.lte=${state.yearTo.value}-12-30`;
		}

		const response = await axios.get(url);

		setMovies(response.data);
		setCurrentPageNumber(response.data.page);
		setTotalResultNumber(response.data.total_results);
	};

	const containerRef = useRef(null);

	const handleScroll = () => {
		if (containerRef) {
			window.scrollTo(0, containerRef.current.offsetTop);
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPageNumber(pageNumber);
		handleScroll();
	};

	useEffect(
		() => {
			handleStateChange();
		},
		[ state, isDescending, genreState, currentPageNumber ]
	);

	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Discover Movies</p>
				</div>
				<MovieDiscoverForm
					state={state}
					handleChange={handleChange}
					genreState={genreState}
					onGenreChange={onGenreChange}
					isDescending={isDescending}
					onAscChange={onAscChange}
					onDescChange={onDescChange}
				/>
			</section>
			<section className="carousel-section">
				<div className="carousel-top-bar" ref={containerRef}>
					<p className="carousel-top-bar-title">Discovered Movies</p>
				</div>
				{movies &&
				movies.results &&
				movies.results.length > 0 && (
					<div className="cards-container">
						{movies.results.map((cur) => {
							return (
								<div className="card-container">
									<MovieShowLargeCard current={cur} />
								</div>
							);
						})}
					</div>
				)}
			</section>
			{currentPageNumber &&
			totalResultNumber &&
			totalResultNumber > 20 && (
				<section className="carousel-section">
					<div className="paginator-container">
						<Paginator
							current={currentPageNumber}
							total={totalResultNumber}
							handlePageChange={handlePageChange}
						/>
					</div>
				</section>
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

				.cards-container {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
				}

				.card-container {
					width: 49%;
					margin: 1rem 0;
				}

				.paginator-container {
					max-width: 100%;
				}

				@media (max-width: ${breakpoints.sizes.xl}) {
					.carousel-section {
						width: 75%;
					}
				}

				@media (max-width: ${breakpoints.sizes.lg}) {
					.carousel-section {
						width: 80%;
					}
				}

				@media (max-width: ${breakpoints.sizes.md}) {
					.carousel-section {
						width: 85%;
					}
				}

				@media (max-width: ${breakpoints.sizes.mdsm}) {
					.carousel-section {
						width: 90%;
					}
				}

				@media (max-width: ${breakpoints.sizes.sm}) {
					.card-container {
						width: 100%;
						margin: 1rem 0;
					}
				}

				@media (max-width: ${breakpoints.sizes.xs}) {
					.carousel-section {
						width: 95%;
					}

					.carousel-top-bar-title {
						font-size: 2rem;
					}
				}
			`}</style>
		</main>
	);
};

export default DiscoverMovie;
