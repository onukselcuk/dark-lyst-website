import Pagination from "react-js-pagination";
import paginationStyles from "../styles/paginationStyles.module.css";
import clsx from "clsx";

const Paginator = ({ current, total, handlePageChange }) => {
	return (
		<div>
			<Pagination
				innerClass={clsx("pagination", paginationStyles.Pagination)}
				activePage={current}
				itemsCountPerPage={20}
				totalItemsCount={total}
				pageRangeDisplayed={10}
				onChange={handlePageChange}
				itemClass={clsx("page-item", paginationStyles.PageItem)}
				linkClass={clsx("page-link", paginationStyles.PageLink)}
			/>
		</div>
	);
};

export default Paginator;
