import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";
import modalStyles from "../../styles/modalStyles.module.css";

const VideoModal = ({ show, setShow, chosenVideo, title, isGallery }) => {
	const modalClassName = isGallery ? modalStyles.GalleryModal : modalStyles.VideoModal;

	return (
		<Fragment>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName={modalClassName}
				aria-labelledby="example-custom-modal-styling-title"
				centered={true}
			>
				<Modal.Header className={modalStyles.ModalHeader} closeButton>
					<Modal.Title className={modalStyles.ModalTitle} id="example-custom-modal-styling-title">
						{title}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className={modalStyles.ModalBody}>
					{isGallery ? (
						<img
							className="gallery-img"
							src={`https://image.tmdb.org/t/p/original${chosenVideo.file_path ||
								chosenVideo.backdrop_path}`}
							alt={`${title} Gallery Image`}
						/>
					) : (
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${chosenVideo.key}`}
							className={modalStyles.ReactPlayer}
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
