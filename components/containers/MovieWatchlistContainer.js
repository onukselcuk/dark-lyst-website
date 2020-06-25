import { connect } from "react-redux";
import MovieShowLargeCard from "../cards/MovieShowLargeCard";
import Paginator from "../Paginator";
import { useState, useEffect } from "react";
import breakpoints from "../../src/breakpoints";
import { v4 as uuidv4 } from "uuid";

const MovieWatchlistContainer = ({ movieList }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const [totalResultNumber, setTotalResultNumber] = useState(
        movieList.length
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPageNumber(pageNumber);
    };

    const numOfPageItems = 20;

    const handleScroll = () => {
        window.scrollTo(0, window);
    };

    const handleTotalResultNumber = () => {
        setTotalResultNumber(movieList.length);
        if (currentPageNumber > 1 && movieList.length % numOfPageItems === 0) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    };

    useEffect(() => {
        handleScroll();
    }, [currentPageNumber]);

    useEffect(() => {
        handleTotalResultNumber();
    }, [movieList]);

    return (
        <div className="cards-container">
            {movieList && movieList.length > 0
                ? movieList
                      .slice(
                          (currentPageNumber - 1) * numOfPageItems,
                          currentPageNumber * numOfPageItems
                      )
                      .map((cur) => {
                          return (
                              <div className="card-container" key={uuidv4()}>
                                  <MovieShowLargeCard
                                      current={cur}
                                      isShow={false}
                                  />
                              </div>
                          );
                      })
                : null}
            {currentPageNumber &&
            totalResultNumber &&
            totalResultNumber > numOfPageItems ? (
                <div className="paginator-container">
                    <Paginator
                        current={currentPageNumber}
                        total={totalResultNumber}
                        handlePageChange={handlePageChange}
                    />
                </div>
            ) : null}
            <style jsx>{`
                .cards-container {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .card-container {
                    width: 49%;
                    margin: 1rem 0;
                }
                .paginator-container {
                    width: 70%;
                    margin: 2rem auto;
                }

                @media (max-width: ${breakpoints.sizes.sm}) {
                    .card-container {
                        width: 100%;
                        margin: 0.6rem 0;
                    }
                }
            `}</style>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        movieList: state.movies.movieList
    };
};

export default connect(mapStateToProps)(MovieWatchlistContainer);
