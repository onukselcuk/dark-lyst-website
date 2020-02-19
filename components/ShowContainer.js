import StarIcon from "./icons/StarIcon";
import HeartIcon from "./icons/HeartIcon";

const ShowContainer = (props) => {
	const url = `https://image.tmdb.org/t/p/w400${props.cur.poster_path}`;
	return (
		<div key={props.cur.original_name} className="tv-show-container">
			<div className="top-backdrop" />

			<img className="show-poster-image" src={url} alt={`${props.cur.name} Poster Image`} />
			<div className="star-container">
				<StarIcon />
				<span className="star-rating">{props.cur.vote_average}</span>
			</div>
			<div className="bottom-backdrop" />
			<div className="bottom-info-container">
				<span className="show-name">{props.cur.original_name || props.cur.original_title}</span>
			</div>
			<div className="heart-container">
				<HeartIcon />
			</div>
			<style jsx>{`
				.tv-show-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
				}

				.show-poster-image {
					width: 95%;
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

				.star-container {
					width: 60px;
					height: 60px;
					position: absolute;
					bottom: 2%;
					left: 7%;
					z-index: 10;
					opacity: 1;
					transition: all 400ms;
				}

				.star-rating {
					position: absolute;
					top: 55%;
					left: 50%;
					transform: translate(-50%, -55%);
					font-size: 1.5rem;
					font-weight: bold;
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
					width: 95%;
					height: 80px;
					background-color: rgba(0, 0, 0, .2);
					position: relative;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}

				.show-name {
					width: 70%;
					color: #fff;
					font-weight: bold;
					transition: all 400ms;
					font-size: 1.8rem;
				}

				.heart-container {
					width: 40px;
					height: 40px;
					position: absolute;
					top: 2%;
					right: 7%;
					z-index: 10;
					opacity: 1;
					transition: all 400ms;
				}
			`}</style>
		</div>
	);
};

export default ShowContainer;
