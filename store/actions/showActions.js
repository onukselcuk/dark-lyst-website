import { ADD_SHOW_HEART, REMOVE_SHOW_HEART } from "./types";

export const toggleShowHeart = (id, status) => {
	console.log(`id: ${id} status:${status}`);
	if (status) {
		return {
			type: ADD_SHOW_HEART,
			payload: id
		};
	} else {
		return {
			type: REMOVE_SHOW_HEART,
			payload: id
		};
	}
};
