import Link from "next/link";
import { useState, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";

const PeopleCard = ({ cur }) => {
    const [isVisibleState, setIsVisibleState] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisibleState !== true) {
            setIsVisibleState(isVisible);
        }
    };

    const [imageLoadedState, setImageLoadedState] = useState(false);

    const setImageLoaded = () => {
        setImageLoadedState(true);
    };

    const setImageLoadStart = () => {
        setImageLoadedState(false);
    };

    useEffect(() => {
        return () => {
            setIsVisibleState(false);
        };
    }, [cur]);

    const link = `/person/detail/[name]/[sid]`;

    const asLink = `/person/detail/${encodeURIComponent(
        cur.name.toLowerCase().replace(/\W+/g, "-")
    )}/${cur.id}`;

    return (
        <Link href={link} as={asLink}>
            <a className="person-link">
                <VisibilitySensor
                    onChange={onVisibilityChange}
                    partialVisibility={true}
                    active={!isVisibleState}
                >
                    <div
                        className="person-container"
                        style={{
                            opacity: isVisibleState && imageLoadedState ? 1 : 0,
                            transition: "opacity 500ms linear"
                        }}
                    >
                        {isVisibleState && (
                            <img
                                className="person-img"
                                src={`https://image.tmdb.org/t/p/w300${cur.profile_path}`}
                                alt={`${cur.name} Profile Picture`}
                                onLoad={setImageLoaded}
                                onLoadStart={setImageLoadStart}
                            />
                        )}
                        <span className="person-name">{cur.name}</span>
                    </div>
                </VisibilitySensor>
                <style jsx>{`
                    .person-link {
                        text-decoration: none;
                        color: white;
                    }

                    .person-container {
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        margin: 1rem;
                    }

                    .person-img {
                        width: 100%;
                        height: 90%;
                        border-radius: 100px;
                        margin-bottom: 1rem;
                        transition: all 400ms ease;
                    }

                    .person-container:hover .person-img {
                        filter: brightness(0.8);
                    }

                    .person-name {
                    }
                `}</style>
            </a>
        </Link>
    );
};

export default PeopleCard;
