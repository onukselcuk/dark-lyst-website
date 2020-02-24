import { useState } from "react";
import ShowContainer from "./ShowContainer";
import PlayIcon from "./icons/PlayIcon";
import VideoModal from "./VideoModal";

const HeroMovieContainer = ({ thumbnailUrl, cur, chosenVideo, isHero, isGallery }) => {
	const [ show, setShow ] = useState(false);

	const handleShow = () => {
		setShow(true);
	};

	return (
		<div className="hero-movie-container">
			{isHero && (
				<div className="hero-left-container">
					<ShowContainer cur={cur} isShow={false} />
				</div>
			)}
			<div className="video-thumbnail-container" onClick={handleShow}>
				<div className="top-backdrop" />
				<img className="video-thumbnail" src={thumbnailUrl} alt={`${cur.title} Youtube Video Thumbnail`} />
				{!isGallery && (
					<div className="play-icon-container">
						<PlayIcon />
					</div>
				)}

				<span className="video-title">{chosenVideo.name}</span>
				<div className="down-backdrop" />
			</div>
			<VideoModal
				show={show}
				setShow={setShow}
				title={cur.title}
				chosenVideo={chosenVideo}
				isGallery={isGallery}
			/>
			<style jsx>{`
				.hero-movie-container {
					display: flex;
					${isHero && "height: 30vmax;"};
					${!isHero && "width: 98%; margin:0 auto;"};
				}

				.hero-left-container {
					width: 29%;
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
					position: relative;
					cursor: pointer;
					${!isHero && "width: 100%;"};
					${isGallery && "border-radius:20px; overflow:hidden;"};
				}
				.video-thumbnail {
					width: 100%;
					height: 100%;
				}

				.play-icon-container {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%) scale(1);
					width: 100px;
					height: 100px;
					transition: all 400ms ease;
				}

				.play-icon-container:hover {
					transform: translate(-50%, -50%) scale(1.05);
				}

				.play-icon-container:active {
					transform: translate(-50%, -50%) scale(0.95);
				}

				.video-title {
					position: absolute;
					width: 50%;
					top: 2%;
					left: 2%;
					font-size: 2.2rem;
				}

				.down-backdrop {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 35%;
					background-image: linear-gradient(to top, rgba(0, 0, 0, .3), transparent);
					opacity: 0;
					transition: all 400ms ease;
				}
				.video-thumbnail-container:hover .down-backdrop {
					opacity: 1;
				}
			`}</style>
		</div>
	);
};

export default HeroMovieContainer;
