import { useState, useEffect } from "react";
import axios from "axios";
import MobileDetect from "mobile-detect";
import theme from "../src/theme";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import countryList from "../src/countryList";
import movieGenresList from "../src/movieGenresList";

const sortByOptions = [
	{ value: "popularity", label: "Popularity" },
	{ value: "release_date", label: "Release Date" },
	{ value: "vote_average", label: "Average Vote" },
	{ value: "vote_count", label: "Vote Count" }
];

const ratingOptions = [
	{ value: false, label: "All Ratings" },
	{ value: 9, label: "9 and up" },
	{ value: 8, label: "8 and up" },
	{ value: 7, label: "7 and up" },
	{ value: 6, label: "6 and up" }
];

const asdDescOptions = [ { value: "asc", label: "Ascending" }, { value: "desc", label: "Descending" } ];

const Discover = ({ deviceType }) => {
	const [ sortByState, setSortByState ] = useState();
	const [ isDescending, setIsDescending ] = useState(true);
	const [ countryState, setCountryState ] = useState();
	const [ ratingState, setRatingState ] = useState();
	const [ genreState, setGenreState ] = useState();

	const onSortByChange = (selection) => {
		setSortByState(selection);
	};

	const onAscChange = () => {
		setIsDescending(false);
	};

	const onDescChange = () => {
		setIsDescending(true);
	};

	const onCountryChange = (selection) => {
		setCountryState(selection);
	};

	const onRatingChange = (selection) => {
		setRatingState(selection);
	};

	const onGenreChange = (selection) => {
		setGenreState(selection);
	};

	const customStyles = {
		option: (provided, state) => {
			return {
				...provided,
				color: "#fff",
				padding: 10,
				fontSize: "1.8rem",
				backgroundColor: state.isSelected
					? `${theme.palette.eight.main}`
					: state.isFocused ? "rgba(255, 255, 255, .5)" : "transparent",
				":hover": {
					backgroundColor: "rgba(255, 255, 255, .5)"
				}
			};
		},
		menu: (provided, state) => ({
			...provided,
			backgroundColor: `${theme.palette.primary.main}`
		}),
		control: (provided, state) => ({
			...provided,
			backgroundColor: `${theme.palette.eight.main}`,
			padding: 10,
			fontSize: "1.8rem",
			color: "#fff"
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: "#fff"
		}),
		input: (provided, state) => ({
			color: "#fff"
		}),
		multiValue: (provided, state) => ({
			...provided,
			backgroundColor: `rgba(255, 255, 255, .5)`
		}),
		multiValueLabel: (provided, state) => ({
			...provided,
			color: `white`
		})
	};

	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar">
					<p className="carousel-top-bar-title">Discover Movies</p>
				</div>
				<div className="form-container">
					<div className="select-container genres-select-container">
						<label htmlFor="country-select-id">Genres</label>
						<Select
							id="country-select-id"
							className="select"
							options={movieGenresList}
							defaultValue={movieGenresList[0]}
							onChange={onGenreChange}
							aria-label="Rating"
							isSearchable={true}
							styles={customStyles}
							isMulti={true}
						/>
					</div>
					<div className="select-container rating-select-container ">
						<label htmlFor="country-select-id">Rating</label>
						<Select
							id="country-select-id"
							className="select"
							options={ratingOptions}
							defaultValue={ratingOptions[0]}
							onChange={onRatingChange}
							aria-label="Rating"
							isSearchable={false}
							styles={customStyles}
						/>
					</div>
					<div className="select-container country-select-container">
						<label htmlFor="country-select-id">Certification Country</label>
						<Select
							id="country-select-id"
							className="select"
							options={countryList}
							defaultValue={countryList[0]}
							onChange={onCountryChange}
							aria-label="Country"
							isSearchable={true}
							styles={customStyles}
						/>
					</div>
					<div className="select-container sort-by-select-container">
						<label htmlFor="sort-by-select-id">Sort By</label>
						<Select
							id="sort-by-select-id"
							className="select"
							options={sortByOptions}
							defaultValue={sortByOptions[0]}
							onChange={onSortByChange}
							aria-label="Sort By"
							menuColor={`${theme.palette.eight.main}`}
							isSearchable={false}
							styles={customStyles}
						/>
					</div>
					<div className="asc-desc-arrows-container">
						<FontAwesomeIcon className="arrow arrow-up" onClick={onAscChange} icon={faArrowUp} />
						<FontAwesomeIcon className="arrow arrow-down" onClick={onDescChange} icon={faArrowDown} />
					</div>
				</div>
			</section>

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

				.form-container {
					display: flex;
					flex-wrap: wrap;
					width: 90%;
					margin: 0 auto;
				}

				.select-container {
					width: 25%;
					flex-grow: 1;
					margin-top: 1rem;
					margin-bottom: 1rem;
					margin-right: 2rem;
				}

				.sort-by-select-container {
					width: 15%;
				}

				.genres-select-container {
					width: 50%;
				}

				.asc-desc-arrows-container {
					width: 10%;
					display: flex;
					align-items: center;
				}

				.asc-desc-arrows-container :glabal(svg) {
					height: 40%;
					width: 40%;
					color: rgba(255, 255, 255, .5);
					cursor: pointer;
					transition: all 300ms ease;
					position: relative;
					top: 10%;
				}

				.asc-desc-arrows-container :glabal(svg):hover {
					transform: scale(1.1);
				}

				.asc-desc-arrows-container :glabal(svg.arrow-down) {
					color: ${isDescending ? "#fff" : "rgba(255, 255, 255, .5)"};
					transform: ${isDescending ? "scale(1.1)" : "scale(1)"};
				}

				.asc-desc-arrows-container :glabal(svg.arrow-up) {
					color: ${!isDescending ? "#fff" : "rgba(255, 255, 255, .5)"};
					transform: ${!isDescending ? "scale(1.1)" : "scale(1)"};
				}
			`}</style>
		</main>
	);
};

Discover.getInitialProps = async ({ req }) => {
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

export default Discover;
