import { Fragment } from "react";
import Link from "next/link";
import CircularRating from "../CircularRating";
import HeartIcon from "../icons/HeartIcon";

const MovieIntro = ({ movieDetails, getGenres }) => {
	const filterProduction = (prodArr) => {
		return prodArr.filter((cur) => cur.logo_path !== null);
	};

	const filteredProduction = filterProduction(movieDetails.production_companies).slice(0, 4);

	const hour = Math.floor(movieDetails.runtime / 60) > 0 ? Math.floor(movieDetails.runtime / 60) : false;
	const minutes = movieDetails.runtime % 60 > 0 ? movieDetails.runtime % 60 : false;

	const imageUrlPath = movieDetails.backdrop_path
		? movieDetails.backdrop_path
		: movieDetails.images.backdrops[0] ? movieDetails.images.backdrops[0].file_path : null;

	const prod_countries = movieDetails.production_countries.slice(0, 3);

	return (
		<Fragment>
			<section className="movie-hero-section" />
			<section className="movie-detail-section">
				<div className="movie-poster-container">
					<img
						className="movie-poster"
						src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
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
							{hour && `${hour}h`} {minutes && `${minutes}m`}
						</p>
						{movieDetails.production_countries && (
							<p className="production-countries">
								{prod_countries.map((cur, index) => {
									return (
										<span className="production-country-abbr">
											{cur.iso_3166_1}
											{index + 1 < prod_countries.length && ", "}
										</span>
									);
								})}
							</p>
						)}
					</div>
					<p className="movie-overview">{movieDetails.overview}</p>
					{filteredProduction &&
					filteredProduction.length > 0 && (
						<div className="production-companies-container">
							{filteredProduction.map((cur) => {
								return (
									<div className="production-company-container">
										<img
											className="production-company-logo"
											src={`https://image.tmdb.org/t/p/w200${cur.logo_path}`}
											alt={`${cur.name} Company Logo`}
										/>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</section>
			<style jsx>{`
				.movie-hero-section {
					width: 100%;
					height: 70vh;
					${movieDetails
						? `background-image: linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, .8) 10%, transparent 60%),  url("https://image.tmdb.org/t/p/original${imageUrlPath}") ;`
						: null};
					background-size: cover;
					background-repeat: no-repeat;
					background-position: 50% 30%;
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
					margin-right: 1.5rem;
				}

				.production-countries {
					margin-bottom: 0;
				}

				.movie-overview {
					margin-top: 1rem;
					font-size: 1.9rem;
				}
				.production-companies-container {
					display: flex;
					align-items: center;
					margin-top: 2rem;
				}

				.production-company-container {
					margin-right: 1rem;
				}

				.production-company-logo {
					height: 40px;
					filter: grayscale(30%) invert(40%);
				}
			`}</style>
		</Fragment>
	);
};

export default MovieIntro;
