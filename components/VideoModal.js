import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";

const VideoModal = ({ show, setShow, chosenVideo, title }) => {
	return (
		<Fragment>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName="video-modal"
				aria-labelledby="example-custom-modal-styling-title"
				centered={true}
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-custom-modal-styling-title">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${chosenVideo.key}`}
						className="react-player"
						playing
						width="100%"
						height="100%"
						controls={true}
					/>
				</Modal.Body>
			</Modal>
			<style jsx>{``}</style>
		</Fragment>
	);
};

export default VideoModal;
