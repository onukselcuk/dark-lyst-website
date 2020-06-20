import Link from "next/link";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const PeopleCard = ({ cur }) => {
    const [isVisibleState, setIsVisibleState] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisibleState !== true) {
            setIsVisibleState(isVisible);
        }
    };

    return (
        <Link href={`/person/detail/[sid]`} as={`/person/detail/${cur.id}`}>
            <a className="person-link">
                <VisibilitySensor
                    onChange={onVisibilityChange}
                    partialVisibility={true}
                    active={!isVisibleState}
                >
                    <div
                        className="person-container"
                        style={{
                            opacity: isVisibleState ? 1 : 0,
                            transition: "opacity 500ms linear"
                        }}
                    >
                        <img
                            className="person-img"
                            src={`https://image.tmdb.org/t/p/w300${cur.profile_path}`}
                            alt={`${cur.name} Profile Picture`}
                        />
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
