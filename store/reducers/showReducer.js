import { ADD_SHOW_HEART, REMOVE_SHOW_HEART } from "../actions/types";

const initialState = {
	showList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_SHOW_HEART:
			return {
				...state,
				showList: [ ...state.showList, action.payload ]
			};
		case REMOVE_SHOW_HEART:
			return {
				...state,
				showList: state.showList.filter((cur) => cur !== action.payload)
			};
		default:
			return state;
	}
};
