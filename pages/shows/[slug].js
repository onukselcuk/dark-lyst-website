import { useState, useEffect, useRef } from "react";
import axios from "axios";
import theme from "../../src/theme";
import MovieShowLargeCard from "../../components/cards/MovieShowLargeCard";
import Paginator from "../../components/Paginator";

const ShowsTemplate = ({ slug }) => {
	const [ shows, setShows ] = useState();

	const [ currentPageNumber, setCurrentPageNumber ] = useState(1);

	const [ totalResultNumber, setTotalResultNumber ] = useState();

	const handleStateChange = async () => {
		let url = `/api/shows/${slug}?&page=${currentPageNumber}`;

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

	const getTitle = (inSlug) => {
		let subject = "";
		switch (inSlug) {
			case "top-rated":
				subject = "Top Rated Shows";
				break;
			case "popular":
				subject = "Popular Shows";
				break;
			case "on-the-air":
				subject = "Shows On The Air";
				break;
			case "latest-on-netflix":
				subject = "Latest Shows On Netflix";
				break;
			case "latest-on-apple-tv-plus":
				subject = "Latest Show On Apple TV+";
				break;
			default:
				subject = "Shows";
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

ShowsTemplate.getInitialProps = async ({ query }) => {
	const slug = query.slug;

	return { slug };
};

export default ShowsTemplate;