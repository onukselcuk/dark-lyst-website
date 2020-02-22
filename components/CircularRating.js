import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularRating = ({ rating }) => {
	const getColor = (score) => {
		const colors = [
			"#f7fbfc",
			"#e7f2f5",
			"#d7e9f0",
			"#c7dfea",
			"#b9d6e5",
			"#aacce1",
			"#9dc3dc",
			"#90b9d8",
			"#85aed4",
			"#7ba4cf",
			"#719ac9",
			"#6790c2",
			"#5d86bb",
			"#537cb4",
			"#4a72ad",
			"#4168a5",
			"#385f9e",
			"#305596",
			"#274b8f",
			"#1f4287"
		];
		return colors[Math.round(score) * 2 - 1];
	};

	return (
		<CircularProgressbar
			styles={buildStyles({
				pathColor: getColor(rating),
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
