import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import theme from "../src/theme";

const CircularRating = ({ rating }) => {
	return (
		<CircularProgressbar
			styles={buildStyles({
				pathColor: theme.palette.sixth.main,
				textSize: "35px",
				textColor: "#fff",
				trailColor: "transparent"
			})}
			value={rating}
			background={false}
			maxValue={10}
			text={rating}
		/>
	);
};

export default CircularRating;
