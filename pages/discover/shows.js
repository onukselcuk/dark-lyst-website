import { useState, useEffect, useRef } from "react";
import axios from "axios";
import theme from "../../src/theme";
import ShowDiscoverForm from "../../components/show/ShowDiscoverForm";
import MovieShowLargeCard from "../../components/cards/MovieShowLargeCard";
import Paginator from "../../components/Paginator";

const DiscoverShow = () => {
	const [ state, setState ] = useState({
		sortBy: { value: "popularity", label: "Popularity" },
		rating: { value: false, label: "All Ratings" },
		originalLang: { value: "en", label: "English" },
		yearFrom: { value: false, label: "Anytime" },
		yearTo: { value: false, label: "Anytime" },
		lastYearFrom: { value: false, label: "Anytime" },
		lastYearTo: { value: false, label: "Anytime" }
	});
	const [ genreState, setGenreState ] = useState([ { value: false, label: "All Genres", isFixed: true } ]);

	const [ networkState, setNetworkState ] = useState([ { value: false, label: "All Networks", isFixed: true } ]);

	const [ isDescending, setIsDescending ] = useState(true);

	const [ shows, setShows ] = useState();

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

	const onNetworkChange = (selection) => {
		let networkArray = selection;
		if (selection && selection.length > 1) {
			networkArray = networkArray.filter((cur) => cur.value !== false);
		} else if (selection === null || !selection || selection.length === 0) {
			networkArray = [ { value: false, label: "All Networks", isFixed: true } ];
		}

		if (JSON.stringify(networkArray) !== JSON.stringify(networkState)) {
			setCurrentPageNumber(1);
			setNetworkState(networkArray);
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
		let url = `/api/discover/show?`;
		url = `${url}sort_by=${state.sortBy.value}.${isDescending ? "desc" : "asc"}&page=${currentPageNumber}`;

		if (genreState) {
			const genreNotAll = genreState.every((cur) => cur.value !== false);
			if (genreNotAll) {
				const genreIdsArr = genreState.map((cur) => cur.value);
				const genreString = genreIdsArr.join(",");
				url = `${url}&with_genres=${genreString}`;
			}
		}

		if (networkState) {
			const networkNotAll = networkState.every((cur) => cur.value !== false);
			if (networkNotAll) {
				const networkIdsArr = networkState.map((cur) => cur.value);
				const networkString = networkIdsArr.join(",");
				url = `${url}&with_networks=${networkString}`;
			}
		}

		if (state.rating.value) {
			url = `${url}&vote_average.gte=${state.rating.value}`;
		}

		if (state.originalLang.value) {
			url = `${url}&with_original_language=${state.originalLang.value}`;
		}

		if (state.yearFrom.value) {
			url = `${url}&first_air_date.gte=${state.yearFrom.value}-01-01`;
		}

		if (state.yearTo.value) {
			url = `${url}&first_air_date.lte=${state.yearTo.value}-12-30`;
		}

		if (state.lastYearFrom.value) {
			url = `${url}&air_date.gte=${state.lastYearFrom.value}-01-01`;
		}

		if (state.lastYearTo.value) {
			url = `${url}&air_date.lte=${state.lastYearTo.value}-12-30`;
		}

		const response = await axios.get(url);

		setShows(response.data);
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
		[ state, isDescending, genreState, networkState, currentPageNumber ]
	);

	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Discover Shows</p>
				</div>
				<ShowDiscoverForm
					state={state}
					handleChange={handleChange}
					genreState={genreState}
					onGenreChange={onGenreChange}
					isDescending={isDescending}
					onAscChange={onAscChange}
					onDescChange={onDescChange}
					onNetworkChange={onNetworkChange}
					networkState={networkState}
				/>
			</section>
			<section className="carousel-section">
				<div className="carousel-top-bar" ref={containerRef}>
					<p className="carousel-top-bar-title">Discovered Shows</p>
				</div>
				{shows &&
				shows.results &&
				shows.results.length > 0 && (
					<div className="cards-container">
						{shows.results.map((cur) => {
							return (
								<div className="card-container">
									<MovieShowLargeCard current={cur} isShow={true} />
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
					<Paginator
						current={currentPageNumber}
						total={totalResultNumber}
						handlePageChange={handlePageChange}
					/>
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
			`}</style>
		</main>
	);
};

export default DiscoverShow;
