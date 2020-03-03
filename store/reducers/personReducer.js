import { ADD_PERSON_HEART, REMOVE_PERSON_HEART } from "../actions/types";

const initialState = {
	personList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PERSON_HEART:
			return {
				...state,
				personList: [ ...state.personList, action.payload ]
			};
		case REMOVE_PERSON_HEART:
			return {
				...state,
				personList: state.personList.filter((cur) => cur !== action.payload)
			};
		default:
			return state;
	}
};
