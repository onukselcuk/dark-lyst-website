import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import CircularRating from "../../../components/CircularRating";
import HeartIcon from "../../../components/icons/HeartIcon";

const MovieDetail = ({ pid }) => {
	const [ movieDetails, setMovieDetails ] = useState();

	const getMovieDetails = () => {
		const url = `/api/movie/detail/${pid}`;
		axios.get(url).then((res) => {
			setMovieDetails(res.data);
		});
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

	const getHour = (time) => {
		return Math.floor(time / 60);
	};

	useEffect(getMovieDetails, []);

	return (
		<main>
			{movieDetails && (
				<Fragment>
					<section className="movie-hero-section" />
					<section className="movie-detail-section">
						<div className="movie-poster-container">
							<img
								className="movie-poster"
								src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`}
								alt={`${movieDetails.title} Poster Image`}
							/>
						</div>
						<div className="movie-detail-container">
							<h1 className="movie-title">{movieDetails.title}</h1>
							<div className="rating-favorite-container">
								<div className="rating-container">
									<CircularRating rating={movieDetails.vote_average} />
								</div>
								<div className="heart-container">
									<HeartIcon detail={true} />
								</div>
							</div>
							<div className="movie-info-container">
								<p className="movie-year"> {movieDetails.release_date.slice(0, 4)} </p>
								<div className="genres-list">
									{getGenres(movieDetails.genres).map((cur) => {
										return (
											<Link key={`/movie/discover/${cur.id}`} href={`/movie/discover/${cur.id}`}>
												<a className="genre-link">{cur.name} </a>
											</Link>
										);
									})}
								</div>
								<p className="movie-runtime">
									{`${getHour(movieDetails.runtime) > 0
										? getHour(movieDetails.runtime)
										: ""}${getHour(movieDetails.runtime) > 0 && "h"}
										${movieDetails.runtime % 60 > 0 ? movieDetails.runtime % 60 : ""}${movieDetails.runtime % 60 > 0 && "m"}`}
								</p>
							</div>
							<p className="movie-overview">{movieDetails.overview}</p>
						</div>
					</section>
				</Fragment>
			)}
			<section className="temp">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</section>
			<style jsx>{`
				.movie-hero-section {
					width: 100%;
					height: 70vh;
					${movieDetails
						? `background-image: linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, .8) 10%, transparent 60%),  url("https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}") ;`
						: null};
					background-size: cover;
					background-repeat: no-repeat;
				}

				.movie-detail-section {
					width: 70%;
					margin: 0 auto;
					margin-top: -10rem;
					display: flex;
					justify-content: center;
				}

				.movie-poster-container {
					width: 25%;
					border-radius: 10px;
					overflow: hidden;
				}
				.movie-poster {
					width: 100%;
				}

				.movie-detail-container {
					width: 60%;
					padding: 4rem 3rem;
				}

				.movie-title {
					font-size: 4rem;
				}

				.rating-favorite-container {
					margin: 3rem 0;
					display: flex;
					align-items: center;
				}

				.rating-container {
					width: 70px;
					height: 70px;
					margin-right: 3rem;
				}

				.heart-container {
					width: 50px;
					height: 50px;
					transition: all 400ms;
				}

				.movie-info-container {
					display: flex;
					align-items: center;
					margin-top: 1.5rem;
				}

				.movie-year {
					font-size: 1.8rem;
					margin-right: 1.5rem;
					margin-bottom: 0;
				}

				.genres-list {
					display: flex;
				}

				.genre-link {
					color: white;
					font-size: 1.8rem;
					margin: 0 4px;
				}

				.movie-runtime {
					font-size: 1.8rem;
					margin-bottom: 0;
					padding-left: 1.8rem;
				}

				.movie-overview {
					margin-top: 1rem;
					font-size: 1.8rem;
				}

				.temp {
					padding-top: 100rem;
				}
			`}</style>
		</main>
	);
};

MovieDetail.getInitialProps = async ({ query }) => {
	const pid = query.pid;

	return { pid };
};

export default MovieDetail;
