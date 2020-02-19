import Form from "react-bootstrap/Form";
import { Fragment } from "react";
import styles from "../styles/searchBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
	return (
		<Fragment>
			<Form className={styles.form}>
				<Form.Group className={styles.searchForm} controlId="exampleForm.ControlInput1">
					<Form.Control className={styles.searchInput} type="text" />
					<FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
				</Form.Group>
			</Form>
		</Fragment>
	);
};

export default SearchBox;
