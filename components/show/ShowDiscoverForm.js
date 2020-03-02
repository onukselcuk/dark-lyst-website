import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import networkIdsList from "../../src/networkIdsList";
import showGenresList from "../../src/showGenresList";
import languageList from "../../src/languageList";
import yearsList from "../../src/yearsList";
import theme from "../../src/theme";

const sortByOptions = [
	{ value: "popularity", label: "Popularity" },
	{ value: "first_air_date", label: "First Air Date" },
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

const ShowDiscoverForm = ({
	handleChange,
	genreState,
	onGenreChange,
	isDescending,
	onAscChange,
	onDescChange,
	onNetworkChange,
	networkState
}) => {
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
		}),
		multiValueRemove: (provided, state) => {
			return state.data.isFixed ? { ...provided, display: "none" } : provided;
		}
	};
	return (
		<div className="form-container">
			<div className="select-container network-select-container">
				<label htmlFor="network-select-id">Networks</label>
				<Select
					id="network-select-id"
					className="select"
					options={networkIdsList}
					//defaultValue={movieGenresList[0]}
					value={networkState}
					onChange={onNetworkChange}
					aria-label="Networks"
					isSearchable={true}
					styles={customStyles}
					isMulti={true}
					blurInputOnSelect={true}
					isClearable={networkState.some((v) => !v.isFixed)}
				/>
			</div>
			<div className="select-container genres-select-container">
				<label htmlFor="genres-select-id">Genres</label>
				<Select
					id="genres-select-id"
					className="select"
					options={showGenresList}
					//defaultValue={movieGenresList[0]}
					value={genreState}
					onChange={onGenreChange}
					aria-label="Genres"
					isSearchable={true}
					styles={customStyles}
					isMulti={true}
					blurInputOnSelect={true}
					isClearable={genreState.some((v) => !v.isFixed)}
				/>
			</div>
			<div className="select-container rating-select-container ">
				<label htmlFor="rating-select-id">Rating</label>
				<Select
					id="rating-select-id"
					className="select"
					options={ratingOptions}
					defaultValue={ratingOptions[0]}
					onChange={(selection) => handleChange(selection, "rating")}
					aria-label="Rating"
					isSearchable={false}
					styles={customStyles}
					blurInputOnSelect={true}
				/>
			</div>
			<div className="select-container years-select-container ">
				<div className="year-inner-container">
					<label htmlFor="year-from-select-id">First Air Year From (Jan 1st)</label>
					<Select
						id="year-from-select-id"
						className="select"
						options={yearsList}
						defaultValue={yearsList[0]}
						onChange={(selection) => handleChange(selection, "yearFrom")}
						aria-label="Year From"
						isSearchable={true}
						styles={customStyles}
						blurInputOnSelect={true}
					/>
				</div>
				<div className="year-inner-container">
					<label htmlFor="year-to-select-id">First Air Year To (Dec 31st)</label>
					<Select
						id="year-to-select-id"
						className="select"
						options={yearsList}
						defaultValue={yearsList[0]}
						onChange={(selection) => handleChange(selection, "yearTo")}
						aria-label="Year To"
						isSearchable={true}
						styles={customStyles}
						blurInputOnSelect={true}
					/>
				</div>
			</div>
			<div className="select-container years-select-container ">
				<div className="year-inner-container">
					<label htmlFor="year-from-select-id">Last Air Year From (Jan 1st)</label>
					<Select
						id="year-from-select-id"
						className="select"
						options={yearsList}
						defaultValue={yearsList[0]}
						onChange={(selection) => handleChange(selection, "lastYearFrom")}
						aria-label="Last Year From"
						isSearchable={true}
						styles={customStyles}
						blurInputOnSelect={true}
					/>
				</div>
				<div className="year-inner-container">
					<label htmlFor="year-to-select-id">Last Air Year To (Dec 31st)</label>
					<Select
						id="year-to-select-id"
						className="select"
						options={yearsList}
						defaultValue={yearsList[0]}
						onChange={(selection) => handleChange(selection, "lastYearTo")}
						aria-label="Last Year To"
						isSearchable={true}
						styles={customStyles}
						blurInputOnSelect={true}
					/>
				</div>
			</div>
			<div className="select-container language-select-container">
				<label htmlFor="language-select-id">Original Language</label>
				<Select
					id="language-select-id"
					className="select"
					options={languageList}
					defaultValue={languageList[0]}
					onChange={(selection) => handleChange(selection, "originalLang")}
					aria-label="Language"
					isSearchable={true}
					styles={customStyles}
					blurInputOnSelect={true}
				/>
			</div>
			<div className="select-container sort-by-select-container">
				<label htmlFor="sort-by-select-id">Sort By</label>
				<Select
					id="sort-by-select-id"
					className="select"
					options={sortByOptions}
					defaultValue={sortByOptions[0]}
					onChange={(selection) => handleChange(selection, "sortBy")}
					aria-label="Sort By"
					menuColor={`${theme.palette.eight.main}`}
					isSearchable={false}
					styles={customStyles}
					blurInputOnSelect={true}
				/>
			</div>
			<div className="asc-desc-arrows-container">
				<FontAwesomeIcon className="arrow arrow-up" onClick={onAscChange} icon={faArrowUp} />
				<FontAwesomeIcon className="arrow arrow-down" onClick={onDescChange} icon={faArrowDown} />
			</div>
			<style jsx>{`
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

				.network-select-container {
					width: 100%;
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

				.years-select-container {
					display: flex;
					width: 40%;
				}

				.year-inner-container {
					flex-grow: 1;
					margin-right: .5rem;
				}
			`}</style>
		</div>
	);
};

export default ShowDiscoverForm;
