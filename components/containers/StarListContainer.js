import { connect } from "react-redux";
import Paginator from "../Paginator";
import { useState, useEffect, useRef } from "react";
import PeopleLargeCard from "../cards/PeopleLargeCard";

const StarListContainer = ({ personList }) => {
	const [ currentPageNumber, setCurrentPageNumber ] = useState(1);

	const [ totalResultNumber, setTotalResultNumber ] = useState(personList.length);

	const handlePageChange = (pageNumber) => {
		setCurrentPageNumber(pageNumber);
	};

	const numOfPageItems = 20;

	const containerRef = useRef(null);

	const handleScroll = () => {
		if (containerRef) {
			window.scrollTo(0, containerRef.current.offsetTop);
		}
	};

	const handleTotalResultNumber = () => {
		setTotalResultNumber(personList.length);
		if (currentPageNumber > 1 && personList.length % numOfPageItems === 0) {
			setCurrentPageNumber(currentPageNumber - 1);
		}
	};

	useEffect(
		() => {
			handleScroll();
		},
		[ currentPageNumber ]
	);

	useEffect(
		() => {
			handleTotalResultNumber();
		},
		[ personList ]
	);

	return (
		<div className="cards-container" ref={containerRef}>
			{personList && personList.length > 0 ? (
				personList
					.slice((currentPageNumber - 1) * numOfPageItems, currentPageNumber * numOfPageItems)
					.map((cur) => {
						return (
							<div className="card-container">
								<PeopleLargeCard current={cur} />
							</div>
						);
					})
			) : null}
			{currentPageNumber && totalResultNumber && totalResultNumber > numOfPageItems ? (
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
