import Pagination from "react-js-pagination";

const Paginator = ({ current, total, handlePageChange }) => {
	return (
		<div>
			<Pagination
				activePage={current}
				itemsCountPerPage={20}
				totalItemsCount={total}
				pageRangeDisplayed={10}
				onChange={handlePageChange}
				itemClass="page-item"
				linkClass="page-link"
			/>
		</div>
	);
};

export default Paginator;
