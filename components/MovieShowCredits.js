import CreditContainer from "./CreditContainer";

const MovieShowCredits = ({ getDirector, movieCredits }) => {
	return (
		<section className="credits-section">
			<div className="credits-top-bar">
				<p className="credits-top-bar-title">Cast & Crew</p>
			</div>
			<div className="credits-container">
				{getDirector(movieCredits.crew).map((cur) => {
					return <CreditContainer cur={cur} />;
				})}

				{movieCredits.cast.slice(0, 6).map((cur) => {
					return <CreditContainer cur={cur} />;
				})}
			</div>
			<style jsx>{`
				.credits-section {
					width: 70%;
					margin: 2rem auto;
				}

				.credits-top-bar {
					background-color: rgba(0, 0, 0, .4);
					border-radius: 10px;
				}

				.credits-top-bar-title {
					font-size: 2.6rem;
					padding: 2rem;
				}

				.credits-container {
					display: flex;
					justify-content: center;
				}
			`}</style>
		</section>
	);
};

export default MovieShowCredits;
