import Navbar from "./Navbar";
import { Fragment } from "react";
import theme from "../../src/theme";
import Footer from "./Footer";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import alertStyles from "../../styles/alertStyles.module.css";

const Layout = ({ children, alerts }) => {
	// const alerts = [
	// 	{ id: 1, msg: "test", alertType: "danger" },
	// 	{ id: 2, msg: "test", alertType: "primary" },
	// 	{ id: 3, msg: "test", alertType: "secondary" },
	// 	{ id: 4, msg: "test", alertType: "warning" },
	// 	{ id: 5, msg: "Lorem asdfasdfasdf asdfasdfasdfasfasdf asdfasdfasdfasdfasdf asdfasdf", alertType: "success" }
	// ];

	return (
		<Fragment>
			<Navbar />
			{alerts !== null &&
			alerts.length > 0 && (
				<div className={alertStyles.AlertContainer}>
					{alerts.map((cur) => (
						<Alert className={alertStyles.Alert} key={cur.id} variant={cur.alertType}>
							<p>{cur.msg}</p>
						</Alert>
					))}
				</div>
			)}
			<div className="root">{children}</div>
			<Footer />
			<style jsx>{`
				:global(html) {
					font-size: 62.5%;
					scroll-behavior: smooth;
					box-sizing: border-box;
				}

				:global(html) *,
				:global(html) *::before,
				:global(html) *::after {
					box-sizing: inherit;
					margin: 0;
					padding: 0;
					font-family: Lato, -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
				}

				:global(body) {
					color: white;
					background-color: ${theme.palette.primary.main};
					font-size: 1.6rem;
				}

				:global(body::-webkit-scrollbar) {
					width: 2rem;
				}

				:global(body::-webkit-scrollbar-thumb) {
					background-color: ${theme.palette.eight.main};
					border-radius: 5px;
				}

				:global(body::-webkit-scrollbar-track) {
					background-color: ${theme.palette.primary.main};
				}

				:global(#__next) {
					width: 100%;
				}

				.root {
					min-height: calc(100vh - 180px);
				}
			`}</style>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		alerts: state.alerts
	};
};

export default connect(mapStateToProps)(Layout);
