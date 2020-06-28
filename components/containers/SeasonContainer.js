import { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import loaderStyles from "../../styles/loader.module.css";
const LazyModal = dynamic(() => import("../modals/SeasonModal"));
import VisibilitySensor from "react-visibility-sensor";

const SeasonContainer = ({ cur, showId, showDetails }) => {
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleShow = () => {
        setShow(true);
    };

    const handleLoad = (e) => {
        setIsVisible(false);
    };

    const [isVisibleState, setIsVisibleState] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisibleState !== true) {
            setIsVisibleState(isVisible);
        }
    };

    return (
        <Fragment>
            <VisibilitySensor
                onChange={onVisibilityChange}
                partialVisibility={true}
                active={!isVisibleState}
            >
                <div
                    onClick={handleShow}
                    className="season-container"
                    style={{
                        opacity: isVisibleState ? 1 : 0,
                        transition: "opacity 400ms ease-in"
                    }}
                >
                    <img
                        className="season-poster"
                        src={`https://image.tmdb.org/t/p/w200${cur.poster_path}`}
                        alt=""
                        onLoad={handleLoad}
                        onError={handleLoad}
                    />
                    {isVisible ? (
                        <div className="loader-container">
                            <div className={loaderStyles.loader}>
                                Loading...
                            </div>
                        </div>
                    ) : null}

                    <div className="season-number-container">
                        <span className="season-number">
                            Season {cur.season_number}
                        </span>
                        <span>{cur.episode_count} Episodes</span>
                    </div>
                </div>
            </VisibilitySensor>
            <LazyModal
                show={show}
                showDetails={showDetails}
                showId={showId}
                cur={cur}
                setShow={setShow}
            />
            <style jsx>{`
                .season-container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    margin: 0 1rem;
                    height: 100%;
                    cursor: pointer;
                }
                .season-poster {
                    width: 100%;
                    height: 80%;
                }

                .season-number-container {
                    margin-top: 1rem;
                    display: flex;
                    flex-direction: column;
                    height: 20%;
                }
            `}</style>
        </Fragment>
    );
};

export default SeasonContainer;
