import React from "react";

const MovieCredits = ({ getDirector, movieCredits }) => {
	return (
		<section className="credits-section">
			<div className="credits-top-bar">
				<p className="credits-top-bar-title">Cast & Crew</p>
			</div>
			<div className="credits-container">
				{getDirector(movieCredits.crew).map((cur) => {
					return (
						<div key={cur.id} className="credit-container">
							<img
								className="credit-img"
								src={
									cur.profile_path ? (
										`https://image.tmdb.org/t/p/w200${cur.profile_path}`
									) : cur.gender === 1 ? (
										"/empty-profile/empty-profile-picture-woman-arranged.jpg"
									) : (
										"/empty-profile/empty-profile-picture-man-arranged.jpg"
									)
								}
								alt={`${cur.name} Profile Image`}
							/>
							<span className="credit-name">{cur.name}</span>
							<span className="credit-character-name">({cur.job})</span>
						</div>
					);
				})}

				{movieCredits.cast.slice(0, 6).map((cur) => {
					return (
						<div key={cur.id} className="credit-container">
							<img
								className="credit-img"
								src={
									cur.profile_path ? (
										`https://image.tmdb.org/t/p/w200${cur.profile_path}`
									) : cur.gender === 1 ? (
										"/empty-profile/empty-profile-picture-woman-arranged.jpg"
									) : (
										"/empty-profile/empty-profile-picture-man-arranged.jpg"
									)
								}
								alt={`${cur.name} Profile Image`}
							/>
							<span className="credit-name">{cur.name}</span>
							<span className="credit-character-name">({cur.character})</span>
						</div>
					);
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

				.credit-container {
					width: 15%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 1rem 1rem;
					text-align: center;
				}

				.credit-img {
					width: 100%;
					border-radius: 60px;
				}

				.credit-name {
					margin-top: 1rem;
					font-size: 1.7rem;
				}

				.credit-character-name {
					font-size: 1.3rem;
				}
			`}</style>
		</section>
	);
};

export default MovieCredits;
