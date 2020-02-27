import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Fragment, useState } from "react";
import styles from "../styles/searchBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
	const [ searchTextState, setSearchTextState ] = useState();
	const [ show, setShow ] = useState(true);

	const handleChange = (e) => {
		console.log(e.target.value);
		setSearchTextState(e.target.value);
	};

	return (
		<Fragment>
			<Form className={styles.form}>
				<Form.Group className={styles.searchForm} controlId="exampleForm.ControlInput1">
					<Form.Control
						value={searchTextState}
						onChange={handleChange}
						className={styles.searchInput}
						type="text"
					/>
					<FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
				</Form.Group>
			</Form>
			<Dropdown>
				<Dropdown.Menu show={show}>
					<Dropdown.Item eventKey="1">Action</Dropdown.Item>
					<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
					<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default SearchBox;
