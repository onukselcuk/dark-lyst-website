import { Fragment, useState, Suspense } from "react";
import loadable from "@loadable/component";

const LazyModal = loadable(() => import("./SeasonModal"));

const SeasonContainer = ({ cur, showId, showDetails }) => {
	const [ show, setShow ] = useState(false);

	const handleShow = () => {
		setShow(true);
	};
	return (
		<Fragment>
			<div onClick={handleShow} className="season-container">
				<img className="season-poster" src={`https://image.tmdb.org/t/p/w200${cur.poster_path}`} alt="" />
				<div className="season-number-container">
					<span className="season-number">Season {cur.season_number}</span>
					<span>{cur.episode_count} Episodes</span>
				</div>
			</div>
			<LazyModal show={show} showDetails={showDetails} showId={showId} cur={cur} setShow={setShow} />
			<style jsx>{`
				.season-container {
					display: flex;
					flex-direction: column;
					text-align: center;
					margin: 2rem;
					height: 100%;
					cursor: pointer;
				}
				.season-poster {
					width: 100%;
					height: 80%;
				}

				.season-number-container {
					margin-top: 1rem;
					display: flex;
					flex-direction: column;
					height: 20%;
				}
			`}</style>
		</Fragment>
	);
};

export default SeasonContainer;
