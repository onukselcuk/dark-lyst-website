import theme from "../../src/theme";
import Button from "react-bootstrap/Button";
import styles from "../../styles/accountStyles.module.css";
import { logout } from "../../store/actions/authActions";
import { connect } from "react-redux";
import breakpoints from "../../src/breakpoints";

const AccountContainer = ({ logout, setIsChangingPassword }) => {
	const openPassword = () => {
		setIsChangingPassword(true);
	};

	return (
		<div className="profile-container">
			<div className="profile-header-container">
				<h2 className="profile-header-title">Account</h2>
				<p className="profile-header-sub-detail">Manage your account</p>
			</div>
			<div className="profile-header-container">
				<h3 className="profile-header-title">Logout</h3>
				<div className="button-container">
					<Button className={styles.Button} onClick={logout} variant="primary" size="lg">
						Log out
					</Button>
				</div>
			</div>

			<div className="profile-header-container">
				<h3 className="profile-header-title">Password</h3>
				<div className="button-container">
					<Button onClick={openPassword} className={styles.Button} variant="primary" size="lg">
						Change Password
					</Button>
				</div>
			</div>

			<div className="profile-header-container">
				<h3 className="profile-header-title">Delete Account</h3>
				<div className="button-container">
					<Button className={styles.Button} variant="danger" size="lg">
						Delete Account
					</Button>
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

				.profile-header-container:not(:last-of-type) {
					border-bottom: 2px solid ${theme.palette.primary.main};
					margin-bottom: 2rem;
					position: relative;
				}

				.profile-header-title {
					margin-bottom: 1rem;
				}

				.profile-header-sub-detail {
					font-size: 1.4rem;
					color: ${theme.palette.ninth.main};
				}

				.button-container {
					margin: 2rem 0;
				}

				@media (max-width: ${breakpoints.sizes.mdsm}) {
					.profile-container {
						width: 70%;
					}
				}
			`}</style>
		</div>
	);
};

export default connect(null, { logout })(AccountContainer);
