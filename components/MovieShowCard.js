import HeartIcon from "./icons/HeartIcon";
import Link from "next/link";
import CircularRating from "./CircularRating";

const MovieShowCard = ({ cur, isHero, isShow }) => {
	const url = `https://image.tmdb.org/t/p/w400${cur.poster_path}`;
	let title = cur.original_name || cur.title;
	if (title.length > 30) {
		title = `${title.slice(0, 30)}...`;
	}
	let link;
	if (isShow) {
		link = `/show/detail/[tid]`;
	} else if (!isShow) {
		link = `/movie/detail/[pid]`;
	}
	let asLink;
	if (isShow) {
		asLink = `/show/detail/${cur.id}`;
	} else if (!isShow) {
		asLink = `/movie/detail/${cur.id}`;
	}

	const handleHeart = (e) => {
		e.preventDefault();
		alert("clicked");
	};

	return (
		<Link key={url} href={link} as={asLink}>
			<a className="container-link">
				<div className="tv-show-container">
					<div className="top-backdrop" />
					<img className="show-poster-image" src={url} alt={`${cur.name || cur.title} Poster Image`} />
					<div className="bottom-backdrop" />
					<div className="bottom-info-container">
						<div className="rating-container">
							<CircularRating rating={cur.vote_average} />
						</div>
						<span className="show-name">{title}</span>
					</div>
					<div onClick={handleHeart} className="heart-container">
						<HeartIcon />
					</div>
				</div>
				<style jsx>{`
					.container-link {
						text-decoration: none;
						color: #fff;
					}

					.container-link:active,
					.container-link:focus,
					.container-link:visited {
						text-decoration: none;
						color: #fff;
					}

					.tv-show-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						width: 95%;
						height: 100%;
						border-radius: 10px;
						overflow: hidden;
						margin: 0 auto;
					}

					.show-poster-image {
						width: 100%;
						height: 80%;
					}

					.top-backdrop {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 35%;
						background-image: linear-gradient(to bottom, rgba(0, 0, 0, .7), transparent);
						opacity: 0;
						transition: all 400ms;
					}
					.tv-show-container:hover .top-backdrop {
						opacity: 1;
					}

					.bottom-backdrop {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 35%;
						background-image: linear-gradient(to top, rgba(0, 0, 0, .7), transparent);
						opacity: 0;
						transition: all 400ms;
					}
					.tv-show-container:hover .bottom-backdrop {
						opacity: 1;
					}

					.bottom-info-container {
						width: 100%;
						height: 20%;
						background-color: rgba(0, 0, 0, .2);
						display: flex;
						align-items: center;
						padding: .5rem .5rem;
					}

					.rating-container {
						width: 50px;
						height: 45px;
						z-index: 10;
						opacity: 1;
						margin: 0 1.5rem 0 1rem;
						transition: all 400ms;
						${isHero && "width:70px; height:70px;"};
					}

					.show-name {
						width: 70%;
						color: #fff;
						font-weight: bold;
						transition: all 400ms;
						font-size: 1.7rem;
						${isHero && "font-size:2rem;"};
					}

					.heart-container {
						width: 35px;
						height: 35px;
						position: absolute;
						top: 2%;
						right: 7%;
						z-index: 10;
						opacity: 1;
						transition: all 400ms;
					}
				`}</style>
			</a>
		</Link>
	);
};

export default MovieShowCard;
