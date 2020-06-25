import CarouselContainer from "./CarouselContainer";
import SeasonContainer from "./SeasonContainer";
import { v4 as uuidv4 } from "uuid";

const SeasonsContainer = ({ deviceType, showDetails }) => {
    const seasons = showDetails.seasons;
    const showId = showDetails.id;

    return (
        <CarouselContainer
            isSmall={true}
            deviceType={deviceType}
            key={uuidv4()}
        >
            {seasons &&
                seasons.length > 0 &&
                seasons.map((cur) => {
                    return (
                        <SeasonContainer
                            showId={showId}
                            cur={cur}
                            showDetails={showDetails}
                        />
                    );
                })}
        </CarouselContainer>
    );
};

export default SeasonsContainer;
