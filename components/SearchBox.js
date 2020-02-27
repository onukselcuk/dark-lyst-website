import Form from "react-bootstrap/Form";
import { Fragment, useState, useCallback } from "react";
import styles from "../styles/searchBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Downshift from "downshift";
import axios from "axios";
import theme from "../src/theme";
import Link from "next/link";
import AwesomeDebouncePromise from "awesome-debounce-promise";

const SearchBox = (props) => {
	const [ movies, setMovies ] = useState([]);

	const downshiftOnChange = (selectedMovie) => {
		if (selectedMovie) {
			alert(`your favorite movie is ${selectedMovie.title}`);
		}
	};

	const fetchMovies = async (movie) => {
		try {
			const multiUrl = `/api/search/multi/${encodeURIComponent(movie)}`;

			const response = await axios.get(multiUrl);

			setMovies(response.data.results);
		} catch (error) {
			console.log(error);
		}
	};

	//* Deferred call of search using debounce function

	const fetchMoviesDebounced = AwesomeDebouncePromise(fetchMovies, 500);

	const inputOnChange = (e) => {
		if (!e.target.value) {
			return;
		}

		fetchMoviesDebounced(e.target.value);
	};

	return (
		<Fragment>
			<Downshift onChange={downshiftOnChange} itemToString={(item) => (item ? item.title : "")}>
				{({
					selectedItem,
					getInputProps,
					getItemProps,
					highlightedIndex,
					isOpen,
					inputValue,
					getLabelProps
				}) => (
					<div className="search-container">
						<Form className={styles.form}>
							<Form.Group className={styles.searchForm}>
								<Form.Control
									{...getInputProps({
										placeholder: "Search...",
										onChange: inputOnChange
									})}
									className={styles.searchInput}
									type="text"
									id="exampleForm.ControlInput1"
									value={inputValue}
								/>
								<FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
							</Form.Group>
						</Form>
						{isOpen ? (
							<div className="downshift-dropdown">
								{movies.slice(0, 10).map((item, index) => {
									const url = `https://image.tmdb.org/t/p/w45${item.profile_path ||
										item.poster_path}`;
									return (
										<Link key={index} href="/">
											<a className="search-item-link">
												<div
													className="dropdown-item"
													{...getItemProps({ key: index, index, item })}
													style={{
														backgroundColor:
															highlightedIndex === index
																? theme.palette.eight.main
																: theme.palette.primary.main,
														fontWeight: selectedItem === item ? "bold" : "normal"
													}}
												>
													<div className="image-container">
														<img className="image" src={url} alt="" />
													</div>
													<div className="info-container">
														<p>{item.title || item.name}</p>
													</div>
												</div>
											</a>
										</Link>
									);
								})}
							</div>
						) : null}
					</div>
				)}
			</Downshift>
			<style jsx>{`
				.search-container {
					position: relative;
					width: 40%;
				}

				.downshift-dropdown {
					position: absolute;
					border-bottom-left-radius: 5px;
					border-bottom-right-radius: 5px;
					overflow: hidden;
					top: 50px;
					left: 0;
					z-index: 10;
					background-color: ${theme.palette.primary.main};
					width: 100%;
				}

				.search-item-link {
					text-decoration: none;
				}

				.dropdown-item {
					color: white;
					display: flex;
					width: 100%;
					height: 80px;
					border-bottom: 1px solid ${theme.palette.fourth.main};
					transition: all 400ms ease;
				}

				.image-container {
					display: flex;
					align-items: center;
				}

				.info-container {
					display: flex;
					align-items: center;
					padding: 1rem;
				}
			`}</style>
		</Fragment>
	);
};

export default SearchBox;
