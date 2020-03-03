import { ADD_PERSON_HEART, REMOVE_PERSON_HEART } from "./types";

export const togglePersonHeart = (id, status) => {
	if (status) {
		return {
			type: ADD_PERSON_HEART,
			payload: id
		};
	} else {
		return {
			type: REMOVE_PERSON_HEART,
			payload: id
		};
	}
};
