import { Fragment, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import modalStyles from "../../styles/modalStyles.module.css";

const SeasonModal = ({ show, setShow, cur, showId, showDetails }) => {
	const [ seasonInfo, setSeasonInfo ] = useState();

	const getSeasonInfo = async () => {
		if (show) {
			const url = `/api/show/${showId}/season/${cur.season_number}`;
			const res = await axios.get(url);
			setSeasonInfo(res.data);
		}
	};

	useEffect(
		() => {
			getSeasonInfo();
		},
		[ show ]
	);

	return (
		<Fragment>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName={modalStyles.SeasonModal}
				aria-labelledby="example-custom-modal-styling-title"
				centered={true}
			>
				<Modal.Header className={modalStyles.ModalHeader} closeButton>
					<Modal.Title className={modalStyles.ModalTitle} id="example-custom-modal-styling-title">
						{showDetails.name} Season {cur.season_number}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className={modalStyles.ModalBody}>
					{seasonInfo && (
						<div className="all-season-container">
							<div className="season-poster-container">
								<img
									className="poster-img"
									src={`https://image.tmdb.org/t/p/w400${seasonInfo.poster_path}`}
									alt={`${showDetails.name} Season ${cur.season_number} Poster Image`}
								/>
							</div>
							<div className="season-general-container-right">
								<div className="season-info-container">
									<h3 className="season-info-name">{showDetails.name}</h3>
									<div className="season-info-header">
										<strong>
											<p className="season-info-piece">Season: {seasonInfo.season_number}</p>
										</strong>
										<strong>
											<p className="season-info-piece">Episodes: {seasonInfo.episodes.length}</p>
										</strong>
									</div>
									<p className="season-info-overview">{seasonInfo.overview}</p>
									<h3 className="episodes-header">Episodes</h3>
								</div>
								{seasonInfo.episodes.length > 0 && (
									<div className="episodes-container">
										{seasonInfo.episodes.map((current, index) => {
											return (
												<div
													className="episode-container"
													onClick={() => handleOpenEpisode(index)}
												>
													<div className="episode-left-container">
														<img
															className="episode-img"
															src={`https://image.tmdb.org/t/p/w200${current.still_path}`}
															alt={`Episode ${current.episode_number} Image`}
														/>
													</div>
													<div className="episode-right-container">
														<h4 className="episode-number">
															Episode&nbsp;{current.episode_number}
														</h4>
														<p>{current.name}</p>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					)}
				</Modal.Body>
			</Modal>
			<style jsx>{`
				.all-season-container {
					display: flex;
					width: 100%;
					justify-content: space-around;
					position: relative;
				}
				.season-poster-container {
					width: 30%;
					position: sticky;
					top: 10rem;
					align-self: flex-start;
				}

				.poster-img {
					width: 100%;
					border-radius: 20px;
				}

				.season-general-container-right {
					width: 60%;
				}

				.season-info-header {
					display: flex;
					align-items: baseline;
					margin-bottom: 2rem;
				}

				.season-info-name {
					margin-bottom: 1rem;
					margin-right: 1rem;
				}
				.season-info-piece {
					margin-bottom: 0;
					margin-right: 1rem;
				}

				.season-info-overview {
					margin-bottom: 2rem;
				}

				.episodes-header {
					margin-bottom: 2rem;
				}

				.episodes-container {
					display: flex;
					flex-wrap: wrap;
				}

				.episode-container {
					width: 45%;
					border: 1px solid rgba(255, 255, 255, .2);
					border-radius: 5px;
					margin: 0 1rem 1rem 0;
					display: flex;
					align-items: center;
					padding: 1rem;
				}

				.episode-left-container {
					width: 40%;
					margin-right: 2rem;
				}

				.episode-img {
					border-radius: 5px;
					width: 100%;
					height: 100%;
				}

				.episode-right-container {
					width: 55%;
				}
			`}</style>
		</Fragment>
	);
};

export default SeasonModal;
