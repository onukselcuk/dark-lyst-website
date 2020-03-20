import { useState, useEffect, useRef } from "react";
import axios from "axios";
import theme from "../../src/theme";
import MovieShowLargeCard from "../../components/cards/MovieShowLargeCard";
import Paginator from "../../components/Paginator";
import breakpoints from "../../src/breakpoints";

const MoviesTemplate = ({ slug }) => {
	const [ movies, setMovies ] = useState();

	const [ currentPageNumber, setCurrentPageNumber ] = useState(1);

	const [ totalResultNumber, setTotalResultNumber ] = useState();

	const handleStateChange = async () => {
		let url = `/api/movies/${slug}?&page=${currentPageNumber}`;

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

	const getTitle = (inSlug) => {
		let subject = "";
		switch (inSlug) {
			case "top-rated":
				subject = "Top Rated Movies";
				break;
			case "popular":
				subject = "Popular Movies";
				break;
			case "now-playing":
				subject = "Movies Now Playing In Theaters";
				break;
			case "upcoming":
				subject = "Upcoming Movies";
				break;
			default:
				subject = "Movies";
		}

		return subject;
	};

	let title = getTitle(slug);

	useEffect(
		() => {
			handleStateChange();
		},
		[ currentPageNumber, slug ]
	);

	return (
		<main>
			<section className="carousel-section">
				<div className="carousel-top-bar" ref={containerRef}>
					<p className="carousel-top-bar-title">{title}</p>
				</div>
				{movies &&
				movies.results &&
				movies.results.length > 0 && (
					<div className="cards-container">
						{movies.results.map((cur) => {
							return (
								<div className="card-container">
									<MovieShowLargeCard current={cur} isShow={false} />
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

MoviesTemplate.getInitialProps = async ({ query }) => {
	const slug = query.slug;

	return { slug };
};

export default MoviesTemplate;
