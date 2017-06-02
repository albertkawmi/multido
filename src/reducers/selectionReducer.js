export default function selectionReducer(state = {}, action) {
	if (action.type === 'SELECT_ITEM') {
		return {
			...state,
			[action.entity]: action.id
		};
	}
	return state;
}
