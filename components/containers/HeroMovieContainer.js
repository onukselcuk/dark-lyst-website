import { useState } from "react";
import MovieShowCard from "../cards/MovieShowCard";
import PlayIcon from "../icons/PlayIcon";
import VideoImageModal from "../modals/VideoImageModal";
import breakpoints from "../../src/breakpoints";
import VisibilitySensor from "react-visibility-sensor";

const HeroMovieContainer = ({
    thumbnailUrl,
    cur,
    chosenVideo,
    isHero,
    isGallery,
    isShow,
    isProfile
}) => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const [isVisibleState, setIsVisibleState] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisibleState !== true) {
            setIsVisibleState(isVisible);
        }
    };

    return (
        <VisibilitySensor
            onChange={onVisibilityChange}
            active={!isVisibleState}
            partialVisibility={!isHero}
        >
            <div
                className="hero-movie-container"
                style={{
                    opacity: isVisibleState ? 1 : 0,
                    transition: "opacity 700ms linear"
                }}
            >
                {isHero && (
                    <div className="hero-left-container">
                        <MovieShowCard
                            cur={cur}
                            isShow={isShow}
                            isHero={isHero}
                        />
                    </div>
                )}
                <div className="video-thumbnail-container" onClick={handleShow}>
                    <div className="top-backdrop" />

                    <img
                        className="video-thumbnail"
                        src={thumbnailUrl}
                        alt={`${cur.title || cur.name} Youtube Video Thumbnail`}
                    />

                    {!isGallery && (
                        <div className="play-icon-container">
                            <PlayIcon />
                        </div>
                    )}
                    {(isProfile || !isGallery) && (
                        <span className="video-title">
                            {chosenVideo.name || cur.title || cur.name}
                        </span>
                    )}

                    <div className="down-backdrop" />
                </div>
                <VideoImageModal
                    show={show}
                    setShow={setShow}
                    title={cur.title || cur.name}
                    chosenVideo={chosenVideo}
                    isGallery={isGallery}
                />
                <style jsx>{`
                    .hero-movie-container {
                        display: flex;
                        ${isHero && "height: 30vmax;"};
                        ${!isHero && "width: 98%; margin:0 auto;"};
                    }

                    .hero-left-container {
                        width: 29%;
                    }

                    .top-backdrop {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 35%;
                        background-image: linear-gradient(
                            to bottom,
                            rgba(0, 0, 0, 0.7),
                            transparent
                        );
                    }

                    .video-thumbnail-container {
                        width: 80%;
                        position: relative;
                        cursor: pointer;
                        ${!isHero && "width: 100%;"};
                        ${isGallery && "border-radius:20px; overflow:hidden;"};
                    }
                    .video-thumbnail {
                        width: 100%;
                        height: 100%;
                    }

                    .play-icon-container {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(1);
                        width: 20%;
                        height: 20%;
                        max-width: 120px;
                        max-height: 120px;
                        transition: all 400ms ease;
                    }

                    .play-icon-container:hover {
                        transform: translate(-50%, -50%) scale(1.05);
                    }

                    .play-icon-container:active {
                        transform: translate(-50%, -50%) scale(0.95);
                    }

                    .video-title {
                        position: absolute;
                        width: 50%;
                        top: 2%;
                        left: 2%;
                        font-size: 2.2rem;
                    }

                    .down-backdrop {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 35%;
                        background-image: linear-gradient(
                            to top,
                            rgba(0, 0, 0, 0.3),
                            transparent
                        );
                        opacity: 0;
                        transition: all 400ms ease;
                    }
                    .video-thumbnail-container:hover .down-backdrop {
                        opacity: 1;
                    }

                    @media (max-width: ${breakpoints.sizes.sm}) {
                        .hero-left-container {
                            display: none;
                        }

                        .video-thumbnail-container {
                            width: 100%;
                        }
                    }
                `}</style>
            </div>
        </VisibilitySensor>
    );
};

export default HeroMovieContainer;
