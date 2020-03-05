import theme from "../../src/theme";
import Link from "next/link";
import CircularRating from "../icons/CircularRating";
import HeartIcon from "../icons/HeartIcon";
import { connect } from "react-redux";
import { toggleMovieHeart } from "../../store/actions/movieActions";
import { toggleShowHeart } from "../../store/actions/showActions";

const MovieLargeCard = ({ current, isShow, movieList, showList, toggleMovieHeart, toggleShowHeart }) => {
	let title = current.title || current.name || "";

	let year = current.release_date || current.first_air_date || "";
	year = year.slice(0, 4);

	let hrefUrl = "";
	let asUrl = "";

	if (isShow) {
		hrefUrl = `/show/detail/[tid]`;
		asUrl = `/show/detail/${current.id}`;
	} else {
		hrefUrl = `/movie/detail/[pid]`;
		asUrl = `/movie/detail/${current.id}`;
	}

	let overview = current.overview || false;

	if (overview && overview.length > 180) {
		overview = `${overview.slice(0, 180)}...`;
	}

	let numOfVotes = current.vote_count || false;

	let isLiked;
	if (current) {
		if (isShow) {
			isLiked = showList.includes(current.id);
		} else {
			isLiked = movieList.includes(current.id);
		}
	}

	const handleHeart = (e) => {
		e.preventDefault();
		if (isShow) {
			toggleShowHeart(current.id, !isLiked);
		} else {
			toggleMovieHeart(current.id, !isLiked);
		}
	};

	return (
		<Link href={hrefUrl} as={asUrl}>
			<a className="movie-link">
				<div className="movie-large-card-container">
					<div className="poster-image-container">
						<img
							className="poster-image"
							src={`http://image.tmdb.org/t/p/w300${current.poster_path}`}
							alt=""
						/>
					</div>
					<div className="movie-info-container">
						<h2 className="movie-title">{title}</h2>
						<p className="movie-year-votes">
							{year}
							{numOfVotes && ` - ${numOfVotes} Votes`}
						</p>
						<p className="movie-overview">{overview}</p>
						<div className="action-container">
							<div className="rating-container">
								<CircularRating rating={current.vote_average} />
							</div>
							<div onClick={handleHeart} className="heart-container">
								<HeartIcon isLiked={isLiked} detail={true} />
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
                .movie-link{
                    text-decoration: none;
                    color:white;
                }
				.movie-large-card-container {
					width: 100%;
					border-radius: 20px;
					display: flex;
                    height: 100%;
					overflow: hidden;
                    background-image: linear-gradient(rgba(0,0,0,.9),rgba(0,0,0,.9)) ,url("http://image.tmdb.org/t/p/w500${current.backdrop_path}");
                    background-repeat: no-repeat;
                    background-color: ${theme.palette.eight.main};
                    background-size: cover;
                    transition: all 300ms ease;
				}

                .movie-large-card-container:hover{
                   box-shadow: 10px 10px 5px -4px rgba(0,0,0,0.4);
                   transform: translateY(-1px);
                }


                .movie-large-card-container:hover .poster-image{
                    filter:brightness(.8)
                }

				.poster-image-container {
					width: 30%;
				}

				.poster-image {
					width: 100%;
                    transition: all 300ms ease;
				}
				.movie-info-container {
					width: 70%;
					padding: 2rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
				}

                .movie-title{
                    width: 70%;
                    margin-bottom: .7rem;
					font-weight: bold;
                }

                .movie-year-votes{
                    margin-bottom: 1rem;
                }

                .action-container{
                    position: absolute;
                    top:3%;
                    right: 3%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .rating-container{                    
                    width: 15%;
                    height: 15%;
                    margin:1rem;
                }

                .heart-container{
                    width: 8%;
                    height: 8%;
                    margin:1rem;        
                }

			`}</style>
			</a>
		</Link>
	);
};

const mapStateToProps = (state) => {
	return {
		movieList: state.movies.movieList,
		showList: state.shows.showList
	};
};

export default connect(mapStateToProps, { toggleMovieHeart, toggleShowHeart })(MovieLargeCard);
