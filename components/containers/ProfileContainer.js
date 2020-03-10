import theme from "../../src/theme";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import styles from "../../styles/profileContainerStyles.module.css";

const ProfileContainer = ({ user }) => {
	const [ isEditing, setIsEditing ] = useState(false);

	const handleEdit = (status) => {
		setIsEditing(status);
	};

	return (
		<div className="profile-container">
			<div className="profile-header-container">
				<h2 className="profile-header-title">Profile</h2>
				<p className="profile-header-sub-detail">Add details about yourself</p>
				<FontAwesomeIcon onClick={() => handleEdit(true)} className={styles.EditIcon} icon={faEdit} />
			</div>
			<div className="profile-middle-container">
				<div className="profile-details-container">
					<div className="profile-detail-field">
						<p className="profile-detail profile-detail-name">Name</p>
						<p className="profile-detail profile-detail-value">{user.name}</p>
					</div>

					<div className="profile-detail-field">
						<p className="profile-detail profile-detail-name">Email</p>
						<p className="profile-detail profile-detail-value">{user.email}</p>
					</div>
				</div>
				<div className="profile-image-container">
					<img className="profile-image" src={`${user.avatar}&s=100`} alt="user avatar" />
				</div>
			</div>
			<style jsx>{`
				.profile-container {
					width: 50%;
					margin: 2rem auto;
					border-radius: 10px;
					padding: 2rem;
					background-color: ${theme.palette.eight.main};
				}

				.profile-header-container {
					border-bottom: 2px solid ${theme.palette.primary.main};
					margin-bottom: 2rem;
					position: relative;
				}

				.profile-header-title {
				}

				.profile-header-sub-detail {
					font-size: 1.4rem;
					color: ${theme.palette.ninth.main};
				}

				.profile-middle-container {
					display: flex;
					justify-content: space-between;
				}

				.profile-details-container {
					width: 50%;
				}

				.profile-detail-field {
					display: flex;
				}

				.profile-detail {
					width: 10%;
					margin: 1rem 2rem 1rem 0;
				}

				.profile-detail-name {
					color: ${theme.palette.ninth.main};
				}

				.profile-image-container {
					width: 15%;
					margin-right: 2rem;
				}

				.profile-image {
					width: 100%;
					border-radius: 50%;
				}
			`}</style>
		</div>
	);
};

export default ProfileContainer;
