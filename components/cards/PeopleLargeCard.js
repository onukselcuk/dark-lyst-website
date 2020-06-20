import theme from "../../src/theme";
import Link from "next/link";
import HeartIcon from "../icons/HeartIcon";
import { connect } from "react-redux";
import { togglePersonHeart } from "../../store/actions/personActions";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const PersonLargeCard = ({ current, togglePersonHeart, personList }) => {
    let name = current.name || "";

    let year = current.birthday || "";
    year = year.slice(0, 4);

    let hrefUrl = `/person/detail/[sid]`;
    let asUrl = `/person/detail/${current.tmdbId}`;

    let biography = current.biography || false;

    if (biography && biography.length > 180) {
        biography = `${biography.slice(0, 180)}...`;
    }

    let isLiked;

    if (current) {
        isLiked = personList.some((cur) => cur.tmdbId === current.tmdbId);
    }

    let backdropPath = current.backdrop_path || current.backdropPath;

    const handleHeart = (e) => {
        e.preventDefault();
        togglePersonHeart(current, current.backdropPath, !isLiked);
    };

    const [isVisibleState, setIsVisibleState] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisibleState !== true) {
            setIsVisibleState(isVisible);
        }
    };

    return (
        <Link href={hrefUrl} as={asUrl}>
            <a className="person-link">
                <VisibilitySensor
                    onChange={onVisibilityChange}
                    partialVisibility={true}
                    active={!isVisibleState}
                >
                    <div
                        className="person-large-card-container"
                        style={{
                            opacity: isVisibleState ? 1 : 0,
                            transition: "opacity 700ms linear"
                        }}
                    >
                        <div className="poster-image-container">
                            <img
                                className="poster-image"
                                src={`https://image.tmdb.org/t/p/w300${current.profilePath}`}
                                alt=""
                            />
                        </div>
                        <div className="person-info-container">
                            <h2 className="person-name">{name}</h2>
                            <p className="birthday-year">{year}</p>
                            <p className="biography">
                                {biography && biography}
                            </p>
                            <div className="action-container">
                                <div
                                    onClick={handleHeart}
                                    className="heart-container"
                                >
                                    <HeartIcon
                                        isLiked={isLiked}
                                        detail={true}
                                        isPerson={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </VisibilitySensor>
                <style jsx>{`
                .person-link{
                    text-decoration: none;
                    color:white;
                }
				.person-large-card-container {
					width: 100%;
					border-radius: 20px;
					display: flex;
                    height: 100%;
					overflow: hidden;
                    background-repeat: no-repeat;
                    background-color: ${theme.palette.eight.main};
                    background-size: cover;
                    transition: all 300ms ease;
                    background-image: linear-gradient(rgba(0,0,0,.9),rgba(0,0,0,.9)) ,url("https://image.tmdb.org/t/p/w500${backdropPath}");
				}

                .person-large-card-container:hover{
                   box-shadow: 10px 10px 5px -4px rgba(0,0,0,0.4);
                   transform: translateY(-1px);
                }


                .person-large-card-container:hover .poster-image{
                    filter:brightness(.8)
                }

				.poster-image-container {
					width: 30%;
				}

				.poster-image {
					width: 100%;
                    transition: all 300ms ease;
				}
				.person-info-container {
					width: 70%;
					padding: 2rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
				}

                .person-name{
                    width: 70%;
                    margin-bottom: .7rem;
					font-weight: bold;
                }

                .birthday-year{
                    margin-bottom: 1rem;
                }

                .action-container{
                    position: absolute;
                    top:3%;
                    right: 7%;                   
                    width:5vw;
                    height:5vw;
					max-height:40px;
					max-width:40px;
                }


                .heart-container{
                    width: 100%;
                    height: 100%;
                    margin:1rem;        
                }

			`}</style>
            </a>
        </Link>
    );
};

const mapStateToProps = (state) => {
    return {
        personList: state.people.personList
    };
};

export default connect(mapStateToProps, { togglePersonHeart })(PersonLargeCard);
