import CarouselContainer from "./CarouselContainer";
import SeasonContainer from "./SeasonContainer";

const SeasonsContainer = ({ deviceType, showDetails }) => {
	const seasons = showDetails.seasons;
	const showId = showDetails.id;

	return (
		<CarouselContainer isSmall={true} deviceType={deviceType}>
			{seasons &&
				seasons.length > 0 &&
				seasons.map((cur) => {
					return <SeasonContainer showId={showId} cur={cur} showDetails={showDetails} />;
				})}
		</CarouselContainer>
	);
};

export default SeasonsContainer;
