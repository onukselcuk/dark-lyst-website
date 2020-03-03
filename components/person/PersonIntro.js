import { Fragment } from "react";
import HeartIcon from "../icons/HeartIcon";
import format from "date-fns/format";
import { connect } from "react-redux";
import { togglePersonHeart } from "../../store/actions/personActions";

const PersonIntro = ({ personDetails, personImages, personCredits, togglePersonHeart, personList }) => {
	const getBackgroundUrlPath = (images, credits) => {
		let url = "";
		if (images) {
			for (let i = 0; i < images.length; i++) {
				if (images[i].media.backdrop_path !== (null || "")) {
					url = images[i].media.backdrop_path;
					break;
				}
			}
		}

		if (credits && url === "" && credits.cast && credits.cast.length > 0) {
			for (let i = 0; i < credits.cast.length; i++) {
				if (credits.cast[i].backdrop_path !== (null || "")) {
					url = credits.cast[i].backdrop_path;
					break;
				}
			}
		}

		if (credits && url === "" && credits.crew && credits.crew.length > 0) {
			for (let i = 0; i < credits.crew.length; i++) {
				if (credits.crew[i].backdrop_path !== (null || "")) {
					url = credits.crew[i].backdrop_path;
					break;
				}
			}
		}

		return url;
	};

	const getFormattedDate = (date) => {
		let dateArrange = date.split("-");
		let dateFormatted = format(new Date(dateArrange[0], dateArrange[1] - 1, dateArrange[2]), "MMMM do, yyyy");
		return dateFormatted;
	};

	let isLiked;

	if (personDetails) {
		isLiked = personList.includes(personDetails.id);
	}

	const handleHeart = (e) => {
		e.preventDefault();
		togglePersonHeart(personDetails.id, !isLiked);
	};

	return (
		<Fragment>
			<section className="person-hero-section" />
			<section className="person-detail-section">
				<div className="person-profile-picture-container">
					<img
						className="person-profile-picture"
						src={`https://image.tmdb.org/t/p/w342${personDetails.profile_path}`}
						alt={`${personDetails.name} Profile Image`}
					/>
				</div>
				<div className="person-detail-container">
					<h1 className="person-name">{personDetails.name}</h1>
					<div className="action-container">
						<div onClick={handleHeart} className="heart-container">
							<HeartIcon isLiked={isLiked} detail={true} />
						</div>
					</div>
					<div className="person-info-container">
						{personDetails.birthday && (
							<span className="person-small-info">
								{getFormattedDate(personDetails.birthday)}
								{personDetails.deathday && ` - ${getFormattedDate(personDetails.deathday)}`}
							</span>
						)}
						{personDetails.place_of_birth && (
							<span className="person-small-info">{personDetails.place_of_birth}</span>
						)}

						{personDetails.known_for_department && (
							<span className="person-small-info">{personDetails.known_for_department}</span>
						)}
					</div>
					<p className="person-biography">{personDetails.biography}</p>
				</div>
			</section>
			<style jsx>{`
				.person-hero-section {
					width: 100%;
					height: 70vh;
					${personImages && personCredits
						? `background-image: linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, .8) 10%, transparent 60%),  url("https://image.tmdb.org/t/p/original${getBackgroundUrlPath(
								personImages,
								personCredits
							)}") ;`
						: null};
					background-size: cover;
					background-repeat: no-repeat;
					background-position: 50% 25%;
				}

				.person-detail-section {
					width: 70%;
					margin: 0 auto;
					margin-top: -10rem;
					display: flex;
					justify-content: center;
				}

				.person-profile-picture-container {
					width: 25%;
					border-radius: 10px;
					overflow: hidden;
				}
				.person-profile-picture {
					width: 100%;
					border-radius: 10px;
				}

				.person-detail-container {
					width: 75%;
					padding: 4rem 3rem;
				}

				.person-name {
					font-size: 4rem;
				}

				.action-container {
					margin: 3rem 0;
					display: flex;
					align-items: center;
				}

				.heart-container {
					width: 50px;
					height: 50px;
					transition: all 400ms;
				}

				.person-info-container {
					display: flex;
					align-items: center;
					margin-top: 1.5rem;
				}

				.person-small-info {
					font-size: 1.8rem;
					margin-bottom: 0;
					margin-right: 1.5rem;
				}

				.person-biography {
					margin-top: 1rem;
					font-size: 1.9rem;
				}
			`}</style>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		personList: state.people.personList
	};
};

export default connect(mapStateToProps, { togglePersonHeart })(PersonIntro);
