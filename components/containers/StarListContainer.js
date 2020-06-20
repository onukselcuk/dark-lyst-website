import { connect } from "react-redux";
import Paginator from "../Paginator";
import { useState, useEffect } from "react";
import PeopleLargeCard from "../cards/PeopleLargeCard";
import breakpoints from "../../src/breakpoints";

const StarListContainer = ({ personList }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const [totalResultNumber, setTotalResultNumber] = useState(
        personList.length
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPageNumber(pageNumber);
    };

    const numOfPageItems = 20;

    const handleScroll = () => {
        window.scrollTo(0, window);
    };

    const handleTotalResultNumber = () => {
        setTotalResultNumber(personList.length);
        if (currentPageNumber > 1 && personList.length % numOfPageItems === 0) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    };

    useEffect(() => {
        handleScroll();
    }, [currentPageNumber]);

    useEffect(() => {
        handleTotalResultNumber();
    }, [personList]);

    return (
        <div className="cards-container">
            {personList && personList.length > 0
                ? personList
                      .slice(
                          (currentPageNumber - 1) * numOfPageItems,
                          currentPageNumber * numOfPageItems
                      )
                      .map((cur) => {
                          return (
                              <div className="card-container">
                                  <PeopleLargeCard current={cur} />
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
        personList: state.people.personList
    };
};

export default connect(mapStateToProps)(StarListContainer);
