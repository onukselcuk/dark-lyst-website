import { useState, useEffect } from "react";
import { connect } from "react-redux";
import MovieShowLargeCard from "../cards/MovieShowLargeCard";
import breakpoints from "../../src/breakpoints";

const ShowWatchlistContainer = ({ showList }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const [totalResultNumber, setTotalResultNumber] = useState(showList.length);

    const handlePageChange = (pageNumber) => {
        setCurrentPageNumber(pageNumber);
    };

    const numOfPageItems = 20;

    const handleScroll = () => {
        window.scrollTo(0, window);
    };

    const handleTotalResultNumber = () => {
        setTotalResultNumber(showList.length);
        if (currentPageNumber > 1 && showList.length % numOfPageItems === 0) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    };

    useEffect(() => {
        handleScroll();
    }, [currentPageNumber]);

    useEffect(() => {
        handleTotalResultNumber();
    }, [showList]);
    return (
        <div className="cards-container">
            {showList && showList.length > 0
                ? showList
                      .slice(
                          (currentPageNumber - 1) * numOfPageItems,
                          currentPageNumber * numOfPageItems
                      )
                      .map((cur) => {
                          return (
                              <div className="card-container">
                                  <MovieShowLargeCard
                                      current={cur}
                                      isShow={true}
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
        showList: state.shows.showList
    };
};

export default connect(mapStateToProps)(ShowWatchlistContainer);
