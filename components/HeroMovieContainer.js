import { useState } from "react";
import ShowContainer from "./ShowContainer";
import PlayIcon from "./icons/PlayIcon";
import VideoModal from "./VideoModal";

const HeroMovieContainer = ({ thumbnailUrl, cur, chosenVideo }) => {
	const [ show, setShow ] = useState(false);

	const handleShow = () => {
		setShow(true);
	};

	return (
		<div className="hero-movie-container">
			<div className="hero-left-container">
				<ShowContainer cur={cur} isShow={false} />
			</div>
			<div className="video-thumbnail-container" onClick={handleShow}>
				<div className="top-backdrop" />
				<img className="video-thumbnail" src={thumbnailUrl} alt={`${cur.title} Youtube Video Thumbnail`} />
				<div className="play-icon-container">
					<PlayIcon />
				</div>
				<span className="video-title">{chosenVideo.name}</span>
			</div>
			<VideoModal show={show} setShow={setShow} chosenVideo={chosenVideo} />
			<style jsx>{`
				.hero-movie-container {
					display: flex;
					height: 31vmax;
				}

				.hero-left-container {
					width: 28%;
				}

				.top-backdrop {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 35%;
					background-image: linear-gradient(to bottom, rgba(0, 0, 0, .7), transparent);
				}

				.video-thumbnail-container {
					width: 82%;
					position: relative;
					cursor: pointer;
				}
				.video-thumbnail {
					width: 100%;
					height: 100%;
				}

				.play-icon-container {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 100px;
					height: 100px;
				}

				.video-title {
					position: absolute;
					width: 50%;
					top: 2%;
					left: 2%;
					font-size: 2.2rem;
				}
			`}</style>
		</div>
	);
};

export default HeroMovieContainer;
