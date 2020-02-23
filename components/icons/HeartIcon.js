import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import theme from "../../src/theme";

const HeartIcon = ({ detail }) => {
	return (
		<OverlayTrigger
			placement={`${detail ? "top" : "left"}`}
			overlay={
				<Tooltip className="watchlist-tooltip" style={{ fontSize: "1.8rem" }} id="watchlist-tooltip">
					Add to watchlist
				</Tooltip>
			}
		>
			<svg className="heart-icon-svg" x="0px" y="0px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
				<path
					className="outer-heart"
					fill="#fff"
					d="M470.9,67.9c-54.8-55.4-143.6-55.4-198.4,0L256,84.6l-0.7-0.7l-15.8-16c-54.8-55.4-143.6-55.4-198.4,0
	c-54.8,55.4-54.8,145.1,0,200.5l214.2,216.5l0.7,0.7l214.9-217.2C525.7,213.1,525.7,123.3,470.9,67.9z M436.4,238.5l-180,180.4
	l-1.1-1.1L75.6,238.5c-35.4-35.8-35.4-93.7,0-129.5l4-4.9c34.6-35,90.7-37.8,125.3-2.9l10.4,10.5l0,0l40,44.7l0.7,0.8l40.7-45.5
	l10.4-10.5c34.6-34.9,90.7-32.1,125.3,2.9l4,4.9C471.8,144.8,471.8,202.8,436.4,238.5z"
				/>
				<path
					className="inner-heart"
					fill="rgba(0,0,0,.2)"
					d="M453.9,95.6l-4.4-5.3c-37.9-38.3-99.5-41.5-137.4-3.1l-11.4,11.5L256,148.6l-0.8-0.9l-43.9-49l0,0
	l-11.4-11.5C162,48.8,100.5,51.9,62.5,90.3l-4.4,5.3c-38.8,39.2-38.8,102.8,0,142l197.1,196.6l1.2,1.2l197.4-197.9
	C492.7,198.4,492.7,134.8,453.9,95.6z"
				/>
				<style jsx>{`
					.inner-heart {
						transition: fill 300ms;
					}
					.heart-icon-svg:hover .inner-heart,
					.heart-icon-svg:hover .outer-heart {
						fill: ${theme.palette.third.tertiary};
					}
				`}</style>
			</svg>
		</OverlayTrigger>
	);
};

export default HeartIcon;
