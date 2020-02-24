import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";

const VideoModal = ({ show, setShow, chosenVideo, title, isGallery }) => {
	const modalClassName = isGallery ? "gallery-modal" : "video-modal";

	return (
		<Fragment>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName={modalClassName}
				aria-labelledby="example-custom-modal-styling-title"
				centered={true}
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-custom-modal-styling-title">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isGallery ? (
						<img
							className="gallery-img"
							src={`https://image.tmdb.org/t/p/original${chosenVideo.file_path}`}
							alt={`${title} Gallery Image`}
						/>
					) : (
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${chosenVideo.key}`}
							className="react-player"
							playing
							width="100%"
							height="100%"
							controls={true}
						/>
					)}
				</Modal.Body>
			</Modal>
			<style jsx>{`
				.gallery-img {
					width: 100%;
					height: 100%;
				}
			`}</style>
		</Fragment>
	);
};

export default VideoModal;
