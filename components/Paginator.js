import Pagination from "react-js-pagination";
import paginationStyles from "../styles/paginationStyles.module.css";
import clsx from "clsx";

const Paginator = ({ current, total, handlePageChange }) => {
	return (
		<Pagination
			innerClass={clsx("pagination", paginationStyles.Pagination)}
			activePage={current}
			itemsCountPerPage={20}
			totalItemsCount={total}
			pageRangeDisplayed={8}
			onChange={handlePageChange}
			itemClass={clsx("page-item", paginationStyles.PageItem)}
			linkClass={clsx("page-link", paginationStyles.PageLink)}
		/>
	);
};

export default Paginator;
