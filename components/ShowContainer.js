import HeartIcon from "./icons/HeartIcon";
import Link from "next/link";
import CircularRating from "./CircularRating";

const ShowContainer = (props) => {
	const url = `https://image.tmdb.org/t/p/w400${props.cur.poster_path}`;
	let title = props.cur.original_name || props.cur.title;
	if (title.length > 30) {
		title = `${title.slice(0, 30)}...`;
	}
	let link;
	if (props.isShow) {
		link = `/show/detail/[pid]`;
	} else if (!props.isShow) {
		link = `/movie/detail/[pid]`;
	}
	let asLink;
	if (props.isShow) {
		asLink = `/show/detail/${props.cur.id}`;
	} else if (!props.isShow) {
		asLink = `/movie/detail/${props.cur.id}`;
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
					<img
						className="show-poster-image"
						src={url}
						alt={`${props.cur.name || props.cur.title} Poster Image`}
					/>
					<div className="bottom-backdrop" />
					<div className="bottom-info-container">
						<div className="rating-container">
							<CircularRating rating={props.cur.vote_average} />
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
						border-radius: 10px;
						overflow: hidden;
						margin: 0 auto;
					}

					.show-poster-image {
						width: 100%;
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
						height: 80px;
						background-color: rgba(0, 0, 0, .2);
						position: relative;
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
					}

					.show-name {
						width: 70%;
						color: #fff;
						font-weight: bold;
						transition: all 400ms;
						font-size: 1.7rem;
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

export default ShowContainer;
