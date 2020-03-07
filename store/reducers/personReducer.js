import { ADD_PERSON_HEART, REMOVE_PERSON_HEART, SET_PEOPLE } from "../actions/types";

const initialState = {
	personList: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_PERSON_HEART:
			const personObj = {
				tmdbId: payload.id,
				name: payload.name,
				profilePath: payload.profile_path,
				birthday: payload.birthday,
				knownForDepartment: payload.known_for_department,
				deathday: payload.deathday,
				gender: payload.gender,
				biography: payload.biography,
				placeOfBirth: payload.place_of_birth,
				popularity: payload.popularity,
				backdropPath: action.url
			};
			return {
				...state,
				personList: [ personObj, ...state.personList ]
			};
		case REMOVE_PERSON_HEART:
			return {
				...state,
				personList: state.personList.filter((cur) => cur.tmdbId !== payload)
			};
		case SET_PEOPLE:
			return {
				personList: payload
			};
		default:
			return state;
	}
};
